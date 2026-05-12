import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static export — writes to ./out at build time.
  // Required for shared static hosts (Hostinger, Cloudflare Pages, GitHub Pages).
  // Works on Vercel too: Vercel will serve the prerendered HTML directly.
  output: "export",

  // /registro/ABC needs to resolve to /registro/ABC/index.html on a static host
  // (Apache/nginx). Trailing slashes guarantee that.
  trailingSlash: true,

  images: {
    // next/image's optimizer requires a Node runtime — not available on static
    // hosts. We use plain <img> for the war.gov hot-linked photos, but flip
    // this just in case any next/image slips in.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.war.gov",
        pathname: "/medialink/ufo/**",
      },
    ],
  },
};

export default nextConfig;
