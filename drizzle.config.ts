import { env } from "@/env";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
    schema: "./src/db/schema.ts",
    out: "./src/db/migrations",
    dialect: "sqlite",
    driver: "d1-http",
    dbCredentials: {
        accountId: env.CLOUDFLARE_ACCOUNT_ID!,
        databaseId: env.CLOUDFLARE_DATABASE_ID!,
        token: env.CLOUDFLARE_D1_TOKEN!,
    },
    verbose: true,
    strict: true,
    tablesFilter: ["/^(?!.*_cf_KV).*$/"],
});
