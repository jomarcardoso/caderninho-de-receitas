import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  experimental: {
    externalDir: true,
  },
  webpack: (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = config.resolve.alias || {};
    config.resolve.alias["@common"] = path.resolve(__dirname, "../common/src");
    config.resolve.alias["services"] = path.resolve(
      __dirname,
      "../common/src/services",
    );
    return config;
  },
};

export default nextConfig;

