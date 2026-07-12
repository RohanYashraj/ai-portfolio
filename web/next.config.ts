import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Monorepo: the shared GROQ definitions live in ../studio (AD-11) */
  turbopack: {
    root: path.join(__dirname, ".."),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },
  /* AD-6: legacy rohanyashraj.github.io URLs get 301s here at cutover */
  redirects: async () => [],
};

export default nextConfig;
