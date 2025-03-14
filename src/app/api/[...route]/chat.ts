import { Hono } from "hono";
import { auth } from "@/lib/auth";
import { chat } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { db } from "@/db/drizzle";

const app = new Hono()
    .get("/", async (c) => {
        // fetch all chats
        try {
            const session = await auth.api.getSession({
                headers: c.req.raw.headers,
            });

            if (!session) {
                return c.json({ error: "Not authenticated" }, 401);
            }

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
                headers: c.req.raw.headers,
            });

            if (!session) {
                return c.json({ error: "Not authenticated" }, 401);
            }

            const chatId = c.req.param("id");

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
                headers: c.req.raw.headers,
            });

            if (!session) {
                return c.json({ error: "Not authenticated" }, 401);
            }

            const chatId = c.req.param("id");

            const [currentChat] = await db
                .select()
                .from(chat)
                .where(eq(chat.id, chatId));

            // await index
            //     .namespace(`user_${session.user.id}_${chatId}`)
            //     .deleteAll();

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
