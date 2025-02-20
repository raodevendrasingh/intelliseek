import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { querySchema } from "@/lib/app-schema";
import { getDrizzleDb } from "@/db/drizzle";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { chat, messages } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { GenerateUUID } from "@/utils/generate-uuid";
import OpenAI from "openai";
import { Pinecone } from "@pinecone-database/pinecone";
import { streamText } from "hono/streaming";

const OPENAI_MODEL = "text-embedding-3-small";

if (!process.env.OPENAI_API_KEY) {
    throw new Error("Missing OPENAI_API_KEY");
}

if (!process.env.PINECONE_API_KEY || !process.env.PINECONE_INDEX_NAME) {
    throw new Error("Missing Pinecone configuration");
}

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
});

const index = pinecone.Index(process.env.PINECONE_INDEX_NAME);

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

            await index.upsert([
                {
                    id: GenerateUUID(),
                    values: embedding,
                    metadata: {
                        text: content,
                        chat_id: chatId,
                        user_id: session.user.id,
                    },
                },
            ]);

            const similarDocs = await index.query({
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
                        content:
                            "You are an AI assistant. Answer the following question using the provided context.\n\nContext:\n" +
                            retrievedContext,
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
