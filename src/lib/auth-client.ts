import { createAuthClient } from "better-auth/react";

if (!process.env.NEXT_PUBLIC_BASE_URL) {
    throw new Error("Missing NEXT_PUBLIC_BASE_URL environment variable");
}

export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});
