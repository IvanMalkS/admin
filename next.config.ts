import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbo: false,
  },
  devIndicators: {
    appIsrStatus: false,
  },
};

export default nextConfig;
