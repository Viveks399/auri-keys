import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [25, 50, 75, 85, 90, 95, 100],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
