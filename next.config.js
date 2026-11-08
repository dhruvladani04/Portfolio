import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
};

// In production /api/jarvis/* are Netlify Functions on the same domain. In
// development `npm run dev` serves them from scripts/jarvis-dev-api.mjs, and
// this rewrite (dev server only — static export has no rewrites) forwards to it.
export default function config(phase) {
  if (phase !== PHASE_DEVELOPMENT_SERVER) return nextConfig;
  const port = process.env.JARVIS_DEV_API_PORT || 8787;
  return {
    ...nextConfig,
    async rewrites() {
      return [{ source: '/api/jarvis/:path*', destination: `http://localhost:${port}/api/jarvis/:path*` }];
    },
  };
}
