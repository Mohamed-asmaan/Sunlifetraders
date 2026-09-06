import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  agentRules: false,
  images: {
    qualities: [75, 90],
  },
};

export default withPayload(nextConfig);
