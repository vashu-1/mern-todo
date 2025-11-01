/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactStrictMode: true,

  // Enable static export for deployment
  output: 'export',
  distDir: 'dist',

  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Faster builds and hot reload with package import optimizations
  experimental: {
    optimizePackageImports: [
      'framer-motion',
      'react-icons',
      '@tabler/icons-react',
    ],
  },

  // Empty turbopack config to silence warning (using webpack instead)
  turbopack: {},

  // Webpack optimizations for faster builds
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      // Enable filesystem caching for faster rebuilds
      config.cache = {
        type: 'filesystem',
      };
      // Optimize module resolution
      config.snapshot = {
        managedPaths: [/^(.+?[\\/]node_modules[\\/])/],
      };
    }
    return config;
  },

  // Ensure proper handling of environment variables
  env: {
    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL ||
      'https://mern-todo-1-krwi.onrender.com',
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

  // Reduce build time
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
