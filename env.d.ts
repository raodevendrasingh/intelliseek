interface CloudflareEnv {
    NODE_ENV: string;
    NEXT_PUBLIC_BASE_URL: string;
    CLOUDFLARE_API_TOKEN: string;
    CLOUDFLARE_ACCOUNT_ID: string;
    CLOUDFLARE_DATABASE_ID: string;
    CLOUDFLARE_D1_TOKEN: string;
    ragstore: R2Bucket;
    DB: D1Database;
    VECTORIZE: VectorizeIndex;
    AI: Ai;
}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DB: D1Database;
            BETTER_AUTH_URL: string;
        }
    }
}
