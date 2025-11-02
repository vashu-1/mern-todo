/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactStrictMode: true,

  // Optimize performance and reduce forced reflows
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Experimental features for better performance
  experimental: {
    // Optimize package imports to reduce bundle size and improve load time
    optimizePackageImports: ['framer-motion', '@tabler/icons-react', 'react-icons'],
    
    // Enable optimistic client cache for faster navigation
    optimisticClientCache: true,
  },

  // Compression and optimization
  compress: true, // Enable gzip compression
  
  // Output configuration for better caching
  generateEtags: true,
  
  // HTTP headers for performance
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
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
        ],
      },
      {
        // Cache static assets aggressively
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Add image optimization config for deployment
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.aceternity.com',
      },
    ],
    unoptimized: true,
    formats: ['image/avif', 'image/webp'], // Use modern formats
  },

  // Webpack optimizations to reduce reflows
  webpack: (config, { dev, isServer }) => {
    // Only apply in development for faster rebuilds
    if (dev && !isServer) {
      config.cache = {
        type: 'filesystem',
        buildDependencies: {
          config: [import.meta.url],
        },
      };
    }

    // Optimize module resolution
    config.resolve.alias = {
      ...config.resolve.alias,
      // Ensure framer-motion uses optimized builds
      'framer-motion': 'framer-motion/dist/es',
    };

    return config;
  },

  // Enable SWC minification for better performance
  swcMinify: true,

  // Reduce chunk size to improve initial load
  productionBrowserSourceMaps: false,
  
  // Optimize output
  poweredByHeader: false, // Remove X-Powered-By header
};

export default nextConfig;
