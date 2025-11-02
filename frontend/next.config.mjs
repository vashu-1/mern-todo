/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  
  // Optimize CSS handling
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Optimize image loading
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.aceternity.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Optimize headers for caching
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
        ],
      },
      {
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Production optimizations
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  
  // Enable experimental optimizations
  experimental: {
    optimizeCss: true,
    optimizePackageImports: [
      'framer-motion',
      'react-icons',
      '@tabler/icons-react',
      'react-redux',
      'react-toastify'
    ],
  },

  turbopack: {},
};

export default nextConfig;
