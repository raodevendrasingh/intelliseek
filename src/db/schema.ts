import { sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const files = sqliteTable("files", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    url: text("url").notNull(),
    vectorIndex: text("vectorIndex").notNull(),
    timestamp: text().default(sql`(CURRENT_TIMESTAMP)`),
});
