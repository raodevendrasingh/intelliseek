import { auth } from "@/lib/auth";
import { Hono } from "hono";
import { messages } from "@/db/schema";
import { eq } from "drizzle-orm";
import { db } from "@/db/drizzle";

const app = new Hono().get("/:id", async (c) => {
    try {
        const session = await auth.api.getSession({
            headers: c.req.raw.headers,
        });

        if (!session) {
            return c.json({ error: "Not Authenticated" }, 401);
        }

        const chatId = c.req.param("id");

        const messageThread = await db
            .select()
            .from(messages)
            .where(eq(messages.chatId, chatId));

        if (!messageThread) {
            return c.json({ error: "Message thread not found" }, 404);
        }

        return c.json({ messageThread }, 200);
    } catch (error) {
        console.log("Error fetching message thread: ", error);
        return c.json({ error: "Error fetching message thread" }, 500);
    }
});

export default app;
