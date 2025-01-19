import type { NextConfig } from "next";
import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";
import { fileURLToPath } from "node:url";
import createJiti from "jiti";
const jiti = createJiti(fileURLToPath(import.meta.url));

jiti("./src/env.ts");

const nextConfig: NextConfig = {};

if (process.env.NODE_ENV === "development") {
    (async () => {
        await setupDevPlatform();
    })();
}

export default nextConfig;
