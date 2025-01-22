import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { getDrizzleDb } from "@/db/drizzle";
import { openAPI } from "better-auth/plugins";
import { user, session, account, verification } from "@/db/schema";

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
    plugins: [openAPI()],
    emailAndPassword: {
        enabled: true,
    },
});
