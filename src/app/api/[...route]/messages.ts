import { getDrizzleDb } from "@/db/drizzle";
import { auth } from "@/lib/auth";
import { Hono } from "hono";
import { headers } from "next/headers";
import { messages } from "@/db/schema";
import { eq } from "drizzle-orm";

const app = new Hono().get("/:id", async (c) => {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session) {
            return c.json({ error: "Not Authenticated" }, 401);
        }

        const chatId = c.req.param("id");

        const db = getDrizzleDb();

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
