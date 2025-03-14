import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import type { NextConfig } from "next";

initOpenNextCloudflareForDev();

const nextConfig: NextConfig = {
    experimental: {
        serverActions: {
            bodySizeLimit: "2mb",
        },
        nodeMiddleware: true,
    },
    reactStrictMode: true,
    env: {
        CLOUDFLARE_DATABASE_ID: process.env.CLOUDFLARE_DATABASE_ID || "",
    },
};

export default nextConfig;
