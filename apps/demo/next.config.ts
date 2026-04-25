import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/natural-language-gui",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
