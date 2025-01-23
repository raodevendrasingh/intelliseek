import { z } from "zod";

export const querySchema = z.object({
    content: z
        .string()
        .max(1024, { message: "Name must be less than 1024 characters" }),
    chatId: z.string().optional(),
});
