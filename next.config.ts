import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Unique deployment identifier for Vercel Skew Protection.
  // Set NEXT_DEPLOYMENT_ID to a git SHA (or any unique string) at build time.
  deploymentId: process.env.NEXT_DEPLOYMENT_ID || undefined,
};

export default nextConfig;
