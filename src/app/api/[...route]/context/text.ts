import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { textContextSchema } from "@/lib/app-schema";
import { createChatTitle } from "@/utils/generate-chat-title";
import { getDrizzleDb } from "@/db/drizzle";
import { chat, context, messages } from "@/db/schema";
import { GenerateUUID } from "@/utils/generate-uuid";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Pinecone } from "@pinecone-database/pinecone";
import OpenAI from "openai";

const CONTEXT_TYPE_TEXT = "text";
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

const app = new Hono().post(
    "/",
    zValidator("json", textContextSchema),
    async (c) => {
        try {
            const session = await auth.api.getSession({
                headers: await headers(),
            });

            if (!session?.user?.id) {
                return c.json(
                    { success: false, error: "Not authenticated" },
                    401,
                );
            }

            // 1. Get context
            const { content } = c.req.valid("json");
            if (!content?.trim()) {
                return c.json(
                    { success: false, error: "Content is required" },
                    400,
                );
            }

            const first15Words = content.split(" ").slice(0, 15).join(" ");
            const title = createChatTitle(first15Words);
            const chatId = GenerateUUID();
            const contextId = GenerateUUID();
            const messageId = GenerateUUID();
            const db = getDrizzleDb();

            await db.insert(chat).values({
                id: chatId,
                title,
                userId: session.user.id,
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            await db.insert(context).values({
                id: contextId,
                chatId,
                type: CONTEXT_TYPE_TEXT,
                content,
                filePath: null,
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            // 3. Create embeddings using OpenAI
            const embeddingResponse = await openai.embeddings.create({
                model: OPENAI_MODEL,
                input: content,
            });

            const embedding = embeddingResponse.data[0]?.embedding;

            if (!Array.isArray(embedding) || embedding.length === 0) {
                throw new Error("Failed to generate valid embedding");
            }

            // 4. Save the embeddings into Pinecone
            await index.upsert([
                {
                    id: GenerateUUID(),
                    values: embedding,
                    metadata: {
                        text: content,
                        context_id: contextId,
                        chat_id: chatId,
                        user_id: session.user.id,
                    },
                },
            ]);

            await db.insert(messages).values({
                id: messageId,
                chatId,
                query: "Context Added to Chat",
                response: "",
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            return c.json({
                success: true,
                chatId,
                contextId,
                title,
            });
        } catch (error) {
            console.error(
                "Error creating context:",
                error instanceof Error ? error.message : error,
            );
            return c.json(
                {
                    success: false,
                    error: "Failed to create context",
                    details:
                        process.env.NODE_ENV === "development"
                            ? String(error)
                            : undefined,
                },
                500,
            );
        }
    },
);

export default app;
