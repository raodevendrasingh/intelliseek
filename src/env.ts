import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        DATABASE_URL: z.string().min(1),
        BETTER_AUTH_SECRET: z.string().min(1),
        OPENAI_API_KEY: z.string().min(1),
        GEMINI_API_KEY: z.string().min(1),
        XAI_API_KEY: z.string().min(1),
        DEEPSEEK_API_KEY: z.string().min(1),
        PINECONE_INDEX_NAME: z.string().min(1),
        PINECONE_INDEX_HOST: z.string().min(1),
        PINECONE_API_KEY: z.string().min(1),
    },
    client: {
        NEXT_PUBLIC_BASE_URL: z.string().min(1),
    },
    runtimeEnv: {
        DATABASE_URL: process.env.DATABASE_URL,
        NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
        OPENAI_API_KEY: process.env.OPENAI_API_KEY,
        BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
        GEMINI_API_KEY: process.env.GEMINI_API_KEY,
        XAI_API_KEY: process.env.XAI_API_KEY,
        DEEPSEEK_API_KEY: process.env.DEEPSEEK_API_KEY,
        PINECONE_INDEX_NAME: process.env.PINECONE_INDEX_NAME,
        PINECONE_INDEX_HOST: process.env.PINECONE_INDEX_HOST,
        PINECONE_API_KEY: process.env.PINECONE_API_KEY,
    },
});
