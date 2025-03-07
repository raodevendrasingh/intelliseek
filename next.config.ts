import type { NextConfig } from "next";
import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";
import "@/env";

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
