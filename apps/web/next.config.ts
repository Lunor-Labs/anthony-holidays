import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname, '../..'),
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  compress: true,
  poweredByHeader: false,
  images: {
    dangerouslyAllowLocalIP: true,
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    deviceSizes: [390, 640, 828, 1080, 1280, 1440, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    localPatterns: [
      { pathname: '/media/**' },
      { pathname: '/images/**' },
      { pathname: '/api/media/**' },
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cms.anthonyholidays.com',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '3001',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
      },
    ],
  },
  env: {
    FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
    BACKEND_URL: process.env.BACKEND_URL || 'http://localhost:3001',
    PUBLIC_WHATSAPP_NUMBER: process.env.PUBLIC_WHATSAPP_NUMBER || '94703247929',
    PUBLIC_PHONE_NUMBER: process.env.PUBLIC_PHONE_NUMBER || '+94 70 324 7929',
  },
  async redirects() {
    const payloadUrl =
      process.env.BACKEND_URL || 'http://localhost:3001'
    return [
      {
        source: '/admin',
        destination: `${payloadUrl}/admin`,
        permanent: false,
      },
      {
        source: '/admin/:path*',
        destination: `${payloadUrl}/admin/:path*`,
        permanent: false,
      },
    ]
  },
  async rewrites() {
    const payloadUrl =
      process.env.BACKEND_URL || 'http://localhost:3001'
    return [
      {
        source: '/api/media/:path*',
        destination: `${payloadUrl}/api/media/:path*`,
      },
      {
        source: '/media/:path*',
        destination: `${payloadUrl}/api/media/file/:path*`,
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin-allow-popups',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
      {
        source: '/videos/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}

export default nextConfig
