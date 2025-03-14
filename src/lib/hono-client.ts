import { hc } from "hono/client";
import type { AppType } from "@/app/api/[...route]/route";

if (!process.env.NEXT_PUBLIC_BASE_URL) {
    throw new Error("Missing NEXT_PUBLIC_BASE_URL environment variable");
}

export const client = hc<AppType>(process.env.NEXT_PUBLIC_BASE_URL);
