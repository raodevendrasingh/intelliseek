import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { openAPI } from "better-auth/plugins";
import { user, session, account, verification } from "@/db/schema";
import { env } from "@/env";
import { db } from "@/db/drizzle";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
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
    secret: env.BETTER_AUTH_SECRET,
});

export type Session = typeof auth.$Infer.Session;
