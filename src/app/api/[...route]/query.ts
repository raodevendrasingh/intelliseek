import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { querySchema } from "@/lib/app-schema";
import { getDrizzleDb } from "@/db/drizzle";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { chat, messages } from "@/db/schema";
import { eq } from "drizzle-orm";
import { GenerateUUID } from "@/utils/generate-uuid";
import OpenAI from "openai";
import { AppContext } from "@/data/app-context";
import { createChatTitle } from "@/utils/generate-chat-title";

if (!process.env.OPENAI_API_KEY) {
    throw new Error("Missing OPENAI_API_KEY");
}

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const app = new Hono().post("/", zValidator("json", querySchema), async (c) => {
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

        const first15Words = content.split(" ").slice(0, 15).join(" ");
        const title = createChatTitle(first15Words);

        const db = getDrizzleDb();
        const messageId = GenerateUUID();

        await db
            .insert(chat)
            .values({
                id: chatId,
                title,
                userId: session.user.id,
                createdAt: new Date(),
                updatedAt: new Date(),
            })
            .returning();

        await db.insert(messages).values({
            id: messageId,
            chatId,
            query: content,
            response: "",
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const aiResponse = await openai.chat.completions.create({
            model: "gpt-4o-mini-2024-07-18",
            messages: [
                {
                    role: "system",
                    content: AppContext,
                },
                { role: "user", content: content },
            ],
        });

        const generatedResponse =
            aiResponse.choices[0]?.message?.content ||
            "Sorry, I couldn't generate a response.";

        await db
            .update(messages)
            .set({
                response: generatedResponse,
                updatedAt: new Date(),
            })
            .where(eq(messages.id, messageId));

        return c.json({
            content,
            chatId,
            response: generatedResponse,
        });
    } catch (error) {
        console.error("Error handling request:", error);
        return c.json({ error: "Internal Server Error" }, 500);
    }
});

export default app;
