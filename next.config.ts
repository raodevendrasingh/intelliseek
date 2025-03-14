import type { NextConfig } from "next";
import { env } from "@/env";

const nextConfig: NextConfig = {
    env: {
        ...env,
    },
};

export default nextConfig;
