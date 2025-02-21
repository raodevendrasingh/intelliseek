import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { querySchema } from "@/lib/app-schema";
import { getDrizzleDb } from "@/db/drizzle";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { chat, messages } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { GenerateUUID } from "@/utils/generate-uuid";
import { streamText } from "hono/streaming";
import { index, openai, OPENAI_MODEL } from "@/lib/ai-config";

const app = new Hono()
    .post("/", zValidator("json", querySchema), async (c) => {
        try {
            const session = await auth.api.getSession({
                headers: await headers(),
            });

            if (!session) {
                return c.json({ error: "Not authenticated" }, 401);
            }

            const { content, chatId } = c.req.valid("json");

            if (!content?.trim()) {
                return c.json(
                    { success: false, error: "Content is required" },
                    400,
                );
            }

            if (!chatId) {
                return c.json({ error: "Chat ID is missing" }, 400);
            }

            const db = getDrizzleDb();
            const messageId = GenerateUUID();

            await db.insert(messages).values({
                id: messageId,
                chatId,
                query: content,
                response: "",
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            const embeddingResponse = await openai.embeddings.create({
                model: OPENAI_MODEL,
                input: content,
            });

            const embedding = embeddingResponse.data[0]?.embedding;

            if (!Array.isArray(embedding) || embedding.length === 0) {
                throw new Error("Failed to generate valid embedding");
            }

            await index.namespace(`user_${session.user.id}_${chatId}`).upsert([
                {
                    id: GenerateUUID(),
                    values: embedding,
                    metadata: {
                        chat_id: chatId,
                        user_id: session.user.id,
                    },
                },
            ]);

            const similarDocs = await index
                .namespace(`user_${session.user.id}_${chatId}`)
                .query({
                    vector: embedding,
                    topK: 5,
                    includeMetadata: true,
                });

            const retrievedContext = similarDocs.matches
                .map((doc) => doc.metadata?.text ?? "")
                .join("\n");

            const aiStream = await openai.chat.completions.create({
                model: "gpt-4o-mini-2024-07-18",
                messages: [
                    {
                        role: "system",
                        content: `
                            You are an AI assistant. **Answer on the basis of this context only, if the context is not enough to answer the question, say "I need more context to assist you properly."**
                            ${retrievedContext}

                            Format your response using **proper markdown**. Follow these rules **exactly**:

                            ### **🔹 Headings**
                            - Use **# Title** for main sections.
                            - Use **## Subtitle** for subsections.
                            - Use **### Subheadings** for smaller sections.
                            - **Ensure 2 blank lines before every heading** for readability.

                            ### **🔹 Lists**
                            - Use **numbered lists (1., 2., 3.)** when order matters.
                            - Use **unordered bullet points (-, *, +) where needed.**
                            - **Insert a blank line before and after every list**.

                            ### **🔹 Spacing & Separators**
                            - **Separate major sections with \`---\` (horizontal lines).**
                            - **Ensure a blank line between all paragraphs.**

                            ### **🔹 Code Blocks & Tables**
                            - Use **triple backticks \` + \`\`\` + \`** for multi-line code.
                            - Properly **align tables**.
                            - Wrap inline code using **single backticks (\`like this\`)**.
                        `,
                    },
                    { role: "user", content: content },
                ],
                stream: true,
            });

            let generatedResponse = "";

            return streamText(c, async (stream) => {
                try {
                    for await (const chunk of aiStream) {
                        const content = chunk.choices[0]?.delta?.content || "";
                        generatedResponse += content;
                        await stream.write(content);
                    }

                    await db
                        .update(messages)
                        .set({
                            response: generatedResponse,
                            updatedAt: new Date(),
                        })
                        .where(eq(messages.id, messageId));
                } catch (error) {
                    console.error("Stream error:", error);
                    await stream.write(`\n[ERROR: Stream interrupted]`);
                }
            });
        } catch (error) {
            console.error("Error handling request:", error);
            return c.json({ error: "Internal Server Error" }, 500);
        }
    })
    .get("/", async (c) => {
        // fetch all chats
        try {
            const session = await auth.api.getSession({
                headers: await headers(),
            });

            if (!session) {
                return c.json({ error: "Not authenticated" }, 401);
            }
            const db = getDrizzleDb();

            const chats = await db
                .select()
                .from(chat)
                .where(eq(chat.userId, session.user.id))
                .orderBy(desc(chat.createdAt));

            return c.json(
                {
                    chats,
                },
                200,
            );
        } catch (error) {
            console.error("Error fetching chats: ", error);
            return c.json({ error: "Failed to fetch chats" }, 500);
        }
    })
    .get("/:id", async (c) => {
        // fetch particular chat by id params
        try {
            const session = await auth.api.getSession({
                headers: await headers(),
            });

            if (!session) {
                return c.json({ error: "Not authenticated" }, 401);
            }

            const chatId = c.req.param("id");
            const db = getDrizzleDb();

            const [currentChat] = await db
                .select()
                .from(chat)
                .where(eq(chat.id, chatId));

            if (!currentChat) {
                return c.json({ error: "Chat not found" }, 404);
            }

            return c.json(
                {
                    currentChat,
                },
                200,
            );
        } catch (error) {
            console.error("Error fetching chat: ", error);
            return c.json({ error: "Failed to fetch chat" }, 500);
        }
    })
    .delete("/:id", async (c) => {
        try {
            const session = await auth.api.getSession({
                headers: await headers(),
            });

            if (!session) {
                return c.json({ error: "Not authenticated" }, 401);
            }

            const chatId = c.req.param("id");
            const db = getDrizzleDb();

            const [currentChat] = await db
                .select()
                .from(chat)
                .where(eq(chat.id, chatId));

            await index
                .namespace(`user_${session.user.id}_${chatId}`)
                .deleteAll();

            if (!currentChat) {
                return c.json({ error: "Chat not found" }, 404);
            }

            await db.delete(chat).where(eq(chat.id, chatId));

            return c.json(
                {
                    success: true,
                    message: "Chat deleted successfully",
                },
                200,
            );
        } catch (error) {
            console.error("Error deleting chat: ", error);
            return c.json({ error: "Failed to delete chat" }, 500);
        }
    });

export default app;
