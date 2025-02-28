import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm/sql";

export const user = sqliteTable("user", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    emailVerified: integer("email_verified", { mode: "boolean" }).notNull(),
    image: text("image"),
    createdAt: integer("created_at", { mode: "timestamp" })
        .notNull()
        .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: integer("updated_at", { mode: "timestamp" })
        .notNull()
        .default(sql`CURRENT_TIMESTAMP`),
});

export const session = sqliteTable("session", {
    id: text("id").primaryKey(),
    expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
    token: text("token").notNull().unique(),
    createdAt: integer("created_at", { mode: "timestamp" })
        .notNull()
        .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: integer("updated_at", { mode: "timestamp" })
        .notNull()
        .default(sql`CURRENT_TIMESTAMP`),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
        .notNull()
        .references(() => user.id),
});

export const account = sqliteTable("account", {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
        .notNull()
        .references(() => user.id),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: integer("access_token_expires_at", {
        mode: "timestamp",
    }),
    refreshTokenExpiresAt: integer("refresh_token_expires_at", {
        mode: "timestamp",
    }),
    scope: text("scope"),
    password: text("password"),
    createdAt: integer("created_at", { mode: "timestamp" })
        .notNull()
        .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: integer("updated_at", { mode: "timestamp" })
        .notNull()
        .default(sql`CURRENT_TIMESTAMP`),
});

export const verification = sqliteTable("verification", {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: integer("expires_at", { mode: "timestamp" })
        .notNull()
        .default(sql`CURRENT_TIMESTAMP`),
    createdAt: integer("created_at", { mode: "timestamp" })
        .notNull()
        .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: integer("updated_at", { mode: "timestamp" })
        .notNull()
        .default(sql`CURRENT_TIMESTAMP`),
});

export const chat = sqliteTable("chat", {
    id: text("id").primaryKey(),
    title: text("title").notNull(),
    userId: text("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
    createdAt: integer("created_at", { mode: "timestamp" })
        .notNull()
        .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: integer("updated_at", { mode: "timestamp" })
        .notNull()
        .default(sql`CURRENT_TIMESTAMP`),
});

export const resources = sqliteTable("resources", {
    id: text("id").primaryKey(),
    chatId: text("chat_id")
        .notNull()
        .references(() => chat.id, { onDelete: "cascade" }),
    type: text("type", { enum: ["text", "file", "image"] })
        .notNull()
        .default("text"),
    content: text("content"),
    filePath: text("file_path"),
    metadata: text("metadata", { mode: "json" }),
    createdAt: integer("created_at", { mode: "timestamp" })
        .notNull()
        .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: integer("updated_at", { mode: "timestamp" })
        .notNull()
        .default(sql`CURRENT_TIMESTAMP`),
});

export const embeddings = sqliteTable("embeddings", {
    id: text("id").primaryKey(),
    resourceId: text("resource_id")
        .notNull()
        .references(() => resources.id, { onDelete: "cascade" }),
    chatId: text("chat_id")
        .notNull()
        .references(() => chat.id, { onDelete: "cascade" }),
    content: text("content").notNull(),
    pineconeId: text("pinecone_id").notNull(),
    chunkIndex: integer("chunk_index").notNull(),
    createdAt: integer("created_at", { mode: "timestamp" })
        .notNull()
        .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: integer("updated_at", { mode: "timestamp" })
        .notNull()
        .default(sql`CURRENT_TIMESTAMP`),
});

export const messages = sqliteTable("messages", {
    id: text("id").primaryKey(),
    chatId: text("chat_id")
        .notNull()
        .references(() => chat.id, { onDelete: "cascade" }),
    role: text("role", { enum: ["user", "assistant"] }).notNull(),
    content: text("content").notNull(),
    metadata: text("metadata", { mode: "json" }),
    createdAt: integer("created_at", { mode: "timestamp" })
        .notNull()
        .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: integer("updated_at", { mode: "timestamp" })
        .notNull()
        .default(sql`CURRENT_TIMESTAMP`),
});
