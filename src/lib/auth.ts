import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { getDrizzleDb } from "@/db/drizzle";
import { openAPI } from "better-auth/plugins";
import { user, session, account, verification } from "@/db/schema";

if (!process.env.BETTER_AUTH_SECRET) {
    throw new Error("Missing BETTER_AUTH_SECRET environment variable");
}

export const auth = betterAuth({
    database: drizzleAdapter(getDrizzleDb(), {
        provider: "sqlite",
        schema: {
            user,
            session,
            account,
            verification,
        },
    }),
    user: {
        deleteUser: {
            enabled: true,
        },
    },
    plugins: [openAPI()],
    emailAndPassword: {
        enabled: true,
    },
    secret: process.env.BETTER_AUTH_SECRET,
    trustedOrigins: ["http://localhost:3000", "http://localhost:3001"],
});

export type Session = typeof auth.$Infer.Session;
