import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Sanity Studio manages its own component lifecycle and does not tolerate
  // React Strict Mode's dev-only double-mount: it orphans an in-flight image
  // upload whose progress patch then targets an undefined `_upload` value
  // ("Cannot apply deep operations on primitive values"). See sanity-io/sanity#9764.
  reactStrictMode: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
  // Sanity Studio bundles some packages that ship their own source maps.
  typescript: { ignoreBuildErrors: false },
  eslint: { ignoreDuringBuilds: false },
};

export default nextConfig;
