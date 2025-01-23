import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { querySchema } from "@/lib/app-schema";

const app = new Hono();

app.post("/", zValidator("json", querySchema), async (c) => {
    const { content, chatId } = c.req.valid("json");
    return c.json({
        content,
        chatId,
    });
});
export default app;
