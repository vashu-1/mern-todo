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

  // Add image optimization config for deployment
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.aceternity.com',
      },
    ],
    unoptimized: true,
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
};

export default nextConfig;
