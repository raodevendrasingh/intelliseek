import { z } from "zod";

export const querySchema = z.object({
    textContext: z
        .string()
        .max(1000, { message: "Name must be less than 1024 characters" })
        .optional(),
    query: z
        .string()
        .max(1000, { message: "Name must be less than 512 characters" })
        .optional(),
});
