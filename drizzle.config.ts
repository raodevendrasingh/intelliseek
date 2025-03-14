import { defineConfig } from "drizzle-kit";

if (
    !process.env.CLOUDFLARE_D1_TOKEN ||
    !process.env.CLOUDFLARE_ACCOUNT_ID ||
    !process.env.CLOUDFLARE_DATABASE_ID
) {
    throw new Error("Missing Cloudflare D1 credentials");
}

export default defineConfig({
    schema: "./src/db/schema.ts",
    out: "./src/db/migrations",
    dialect: "sqlite",
    driver: "d1-http",
    dbCredentials: {
        accountId: process.env.CLOUDFLARE_ACCOUNT_ID,
        databaseId: process.env.CLOUDFLARE_DATABASE_ID,
        token: process.env.CLOUDFLARE_D1_TOKEN,
    },
    verbose: true,
    strict: true,
    tablesFilter: ["/^(?!.*_cf_KV).*$/"],
});
