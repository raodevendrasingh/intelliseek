import { drizzle } from "drizzle-orm/d1";
import { getCloudflareContext } from "@opennextjs/cloudflare";

let db: ReturnType<typeof drizzle>;

async function initDb() {
    if (db) return db;

    try {
        if (process.env.NODE_ENV === "production") {
            db = drizzle(process.env.DB as unknown as D1Database);
        } else {
            const { env } = getCloudflareContext();
            db = drizzle(env.DB);
        }
        return db;
    } catch (error) {
        console.error("Failed to initialize database:", error);
        throw error;
    }
}

initDb();

export const getDrizzleDb = () => {
    if (!db) {
        throw new Error("Database not initialized");
    }
    return db;
};
