import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // External packages for server-side only modules
  serverExternalPackages: ['dd-trace'],
};

export default nextConfig;
