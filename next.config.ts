import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
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
