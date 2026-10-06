import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Emits .next/standalone with a self-contained server.js and only the
  // node_modules actually traced as needed. Without this a Docker image has
  // to carry the full dependency tree, which is roughly an order of
  // magnitude larger.
  output: 'standalone',
};

export default nextConfig;
