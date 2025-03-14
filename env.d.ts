interface CloudflareEnv {
    NODE_ENV: string;
    NEXTJS_ENV: string;
    NEXT_PUBLIC_BASE_URL: string;
    BETTER_AUTH_SECRET: string;
    CLOUDFLARE_API_TOKEN: string;
    CLOUDFLARE_ACCOUNT_ID: string;
    CLOUDFLARE_DATABASE_ID: string;
    CLOUDFLARE_D1_TOKEN: string;
    PINECONE_INDEX_NAME: string;
    PINECONE_INDEX_HOST: string;
    PINECONE_API_KEY: string;
    OPENAI_API_KEY: string;
    GEMINI_API_KEY: string;
    XAI_API_KEY: string;
    DEEPSEEK_API_KEY: string;
    intellistore: R2Bucket;
    DB: D1Database;
    ASSETS: Fetcher;
}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DB: D1Database;
            BETTER_AUTH_URL: string;
        }
    }
}
