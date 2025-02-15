import { z } from "zod";

export const querySchema = z.object({
    content: z
        .string()
        .max(1024, { message: "Query cannot exceed 1024 characters." }),
    chatId: z.string().optional(),
});

export const textContextSchema = z.object({
    content: z
        .string()
        .min(32, "Context must be at least 32 characters long.")
        .max(4096, "Context cannot exceed 4096 characters."),
});

export const webLinkSchema = z.object({
    link: z.string().url(),
});
