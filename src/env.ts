import { createEnv } from "@t3-oss/env-nextjs";
import { loadEnvConfig } from "@next/env";
import { z } from "zod";

const dir = process.cwd();
loadEnvConfig(dir);

export const env = createEnv({
	server: {
		OPEN_AI_API_KEY: z.string().min(1),
		CLOUDFLARE_ACCOUNT_ID: z.string().min(1),
		CLOUDFLARE_DATABASE_ID: z.string().min(1),
		CLOUDFLARE_D1_TOKEN: z.string().min(1),
	},
	client: {
		NEXT_PUBLIC_BASE_URL: z.string().min(1),
	},
	shared: {
		NODE_ENV: z.enum(["development", "production"]),
	},
	runtimeEnv: {
		NODE_ENV: process.env.NODE_ENV,
		NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
		CLOUDFLARE_ACCOUNT_ID: process.env.CLOUDFLARE_ACCOUNT_ID,
		CLOUDFLARE_DATABASE_ID: process.env.CLOUDFLARE_DATABASE_ID,
		CLOUDFLARE_D1_TOKEN: process.env.CLOUDFLARE_D1_TOKEN,
		OPEN_AI_API_KEY: process.env.OPEN_AI_API_KEY,
	},
});
