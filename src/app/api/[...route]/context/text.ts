import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { textContextSchema } from "@/lib/app-schema";
import { createChatTitle } from "@/utils/generate-chat-title";
import { getDrizzleDb } from "@/db/drizzle";
import { chat, context } from "@/db/schema";
import { GenerateUUID } from "@/utils/generate-uuid";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const CONTEXT_TYPE_TEXT = "text";

const app = new Hono<{ Bindings: CloudflareEnv }>().post(
    "/",
    zValidator("json", textContextSchema),
    async (c) => {
        try {
            const session = await auth.api.getSession({
                headers: await headers(),
            });

            if (!session) {
                return c.json({ error: "Not authenticated" }, 401);
            }

            // 1. Get context
            const { content } = c.req.valid("json");
            const first15Words = content.split(" ").slice(0, 15).join(" ");

            // 2. Create chat title
            const title = createChatTitle(first15Words);

            const db = getDrizzleDb();
            const chatId = GenerateUUID();

            // 3. Create a new chat
            await db.insert(chat).values({
                id: chatId,
                title,
                userId: session.user.id,
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            // 4. Add content to the context table
            const contextId = GenerateUUID();
            await db.insert(context).values({
                id: contextId,
                chatId,
                type: CONTEXT_TYPE_TEXT,
                content,
                filePath: null,
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            // 5. Create embeddings for the context
            if (c.env) {
                const { AI, VECTORIZE } = c.env;

                // Debugging
                console.log("Environment Bindings: ", c.env);
                console.log("AI Binding: ", AI);
                console.log("VECTORIZE Binding: ", VECTORIZE);

                const embeddingResult = await c.env.AI.run(
                    "@cf/baai/bge-base-en-v1.5",
                    {
                        text: content,
                    },
                );

                const embedding = embeddingResult.data[0];

                // 6. Save the embeddings into Vectorize
                if (embedding && embedding.length > 0) {
                    await c.env.VECTORIZE.insert([
                        {
                            id: GenerateUUID(),
                            values: embedding,
                            metadata: { text: content, context_id: contextId },
                        },
                    ]);
                } else {
                    console.error("Invalid embedding:", embedding);
                }
            } else {
                console.error("Environment not found");
                return c.json(
                    { error: "Environment bindings inaccessible" },
                    500,
                );
            }

            return c.json({
                success: true,
                chatId: chatId,
                title: title,
            });
        } catch (error) {
            console.error("Error creating context: ", error);
            return c.json({ error: "Failed to create context" }, 500);
        }
    },
);

export default app;
