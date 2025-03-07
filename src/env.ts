import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        CLOUDFLARE_API_TOKEN: z.string().min(1),
        CLOUDFLARE_ACCOUNT_ID: z.string().min(1),
        CLOUDFLARE_DATABASE_ID: z.string().min(1),
        CLOUDFLARE_D1_TOKEN: z.string().min(1),
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
    shared: {
        NODE_ENV: z.enum(["development", "production"]),
    },
    runtimeEnv: {
        NODE_ENV: process.env.NODE_ENV,
        NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
        CLOUDFLARE_API_TOKEN: process.env.CLOUDFLARE_API_TOKEN,
        CLOUDFLARE_ACCOUNT_ID: process.env.CLOUDFLARE_ACCOUNT_ID,
        CLOUDFLARE_DATABASE_ID: process.env.CLOUDFLARE_DATABASE_ID,
        CLOUDFLARE_D1_TOKEN: process.env.CLOUDFLARE_D1_TOKEN,
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
