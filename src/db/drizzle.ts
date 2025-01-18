import { drizzle } from "drizzle-orm/d1";

export interface Env {
	DB: D1Database;
}

declare const env: Env;

export const db = drizzle(env.DB);
