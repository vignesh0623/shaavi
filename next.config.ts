import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Pin the project root: an empty package-lock.json in the parent
    // folder would otherwise be picked as the workspace root.
    root: path.join(__dirname),
  },
};

export default nextConfig;
