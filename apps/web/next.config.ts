import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname, '../..'),
  },
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
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
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    const payloadUrl =
      process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3001'
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
      process.env.PAYLOAD_API_URL ||
      process.env.NEXT_PUBLIC_PAYLOAD_URL ||
      'http://localhost:3001'
    return [
      {
        source: '/api/media/:path*',
        destination: `${payloadUrl}/api/media/:path*`,
      },
      {
        source: '/media/:path*',
        destination: `${payloadUrl}/media/:path*`,
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
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ]
  },
}

export default nextConfig
