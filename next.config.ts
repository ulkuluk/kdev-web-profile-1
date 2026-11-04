import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Deploy-agnostic: no runtime image optimisation service required.
  images: { unoptimized: true },
};

export default nextConfig;
