// Static export is opt-in via STATIC_EXPORT=true. Default = server build
// (.next/), which is what Vercel and Hostinger's managed Next.js pipeline both
// expect. To produce a fully static ./out folder for plain Apache/nginx hosts:
//
//   STATIC_EXPORT=true npm run build
//
// Hostinger NOTE: their CI wraps next.config.mjs (see
// 6a03626ede2ed.next.config.mjs in their build env) and runs Next as a Node
// server. Keep `output` unset; "Diretório de saída" in the Hostinger panel
// should be `.next` (not `out`).
const staticExport = process.env.STATIC_EXPORT === "true";

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(staticExport ? { output: "export", trailingSlash: true } : {}),

  images: {
    // next/image's optimizer needs a Node runtime. We use plain <img> for
    // the war.gov hot-linked photos anyway, so unoptimized=true is safe on
    // both server and static modes.
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
