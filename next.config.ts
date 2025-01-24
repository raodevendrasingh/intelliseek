import type { NextConfig } from "next";
import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";
import { fileURLToPath } from "node:url";
import createJiti from "jiti";

const jiti = createJiti(fileURLToPath(import.meta.url));
jiti("./src/env.ts");

const nextConfig: NextConfig = {
    experimental: {
        serverActions: {
            bodySizeLimit: "2mb",
        },
    },
};

if (process.env.NODE_ENV === "development") {
    (async () => {
        await setupDevPlatform({
            persist: true,
        });
    })();
}

export default nextConfig;
