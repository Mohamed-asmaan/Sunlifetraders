import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  agentRules: false,
  images: {
    // Accept images from the legacy WordPress site so any hosted images work too
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sunlifetraders.com",
        pathname: "/wp-content/uploads/**",
      },
    ],
    // Serve modern formats automatically — avif first, then webp, then original
    formats: ["image/avif", "image/webp"],
    // Two quality breakpoints: regular and high-DPI
    qualities: [75, 90],
    // Device sizes that match our layout breakpoints
    deviceSizes: [390, 640, 768, 1024, 1280, 1536],
    // Image sizes used in <Image> with `sizes` prop for thumbnails / cards
    imageSizes: [64, 128, 256, 384, 512],
    // Minimise re-generation on CDN — 1-year TTL
    minimumCacheTTL: 31536000,
  },
  // Compress all responses
  compress: true,
  // Power-user: strip X-Powered-By
  poweredByHeader: false,
};

export default withPayload(nextConfig);
