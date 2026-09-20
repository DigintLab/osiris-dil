import type { NextConfig } from "next";

const frameAncestors = (process.env.IFRAME_ALLOWED_ORIGINS || 'https://*.digintlab.com,https://*.doubleextortion.com')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)
  .join(' ');

const nextConfig: NextConfig = {
  serverExternalPackages: ['ws'],
  transpilePackages: ['react-map-gl', 'mapbox-gl', 'maplibre-gl'],
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
  async rewrites() {
    return [
      { source: '/dashboard', destination: '/' },
      { source: '/dashboard/:path*', destination: '/' },
      { source: '/embed', destination: '/' },
      { source: '/embed/:path*', destination: '/' },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Content-Security-Policy', value: `default-src 'self' 'unsafe-inline' 'unsafe-eval' https: wss: data: blob:; frame-ancestors ${frameAncestors};` },
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
        ],
      },
    ];
  },
};

export default nextConfig;
