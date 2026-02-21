import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // External packages for server-side only modules
  serverExternalPackages: ['@datadog/datadog-api-client'],
};

export default nextConfig;
