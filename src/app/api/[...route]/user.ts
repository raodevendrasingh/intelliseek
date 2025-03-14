import { db } from "@/db/drizzle";
import { chat, user } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { Hono } from "hono";

const app = new Hono();

app.delete("/", async (c) => {
    try {
        const session = await auth.api.getSession({
            headers: c.req.raw.headers,
        });

        if (!session) {
            return c.json({ error: "Not authenticated" }, 401);
        }

        const [currentUser] = await db
            .select()
            .from(user)
            .where(eq(user.id, session.user.id));

        if (!currentUser) {
            return c.json({ error: "User not found" }, 404);
        }

        const chatIds = await db
            .select({ id: chat.id })
            .from(chat)
            .where(eq(chat.userId, session.user.id));

        console.log("chatIds: ", chatIds);

        // if (chatIds.length > 0) {
        //     for (const chat of chatIds) {
        //         try {
        //             await index
        //                 .namespace(`user_${session.user.id}_${chat.id}`)
        //                 .deleteAll();
        //         } catch (e) {
        //             console.error(
        //                 `Failed to delete namespace for chat ${chat.id}:`,
        //                 e,
        //             );
        //             throw e;
        //         }
        //     }
        // }

        return c.json(
            {
                success: true,
                message: "User deleted successfully",
            },
            200,
        );
    } catch (error) {
        console.error("Error deleting user: ", error);
        return c.json({ error: "Failed to delete user" }, 500);
    }
});

export default app;
