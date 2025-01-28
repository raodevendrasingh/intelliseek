import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { querySchema } from "@/lib/app-schema";
import { getDrizzleDb } from "@/db/drizzle";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { chat } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

const app = new Hono()
    .post("/", zValidator("json", querySchema), async (c) => {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session) {
            return c.json({ error: "Not authenticated" }, 401);
        }

        const { content, chatId } = c.req.valid("json");
        return c.json({
            content,
            chatId,
        });
    })
    .get("/", async (c) => {
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
    });

export default app;
