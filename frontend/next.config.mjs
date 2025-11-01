/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactStrictMode: true,
  swcMinify: true,
  // Ensure proper handling of environment variables
  env: {
    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL ||
      'https://mern-todo-1-krwi.onrender.com',
  },
  // Add image optimization config for deployment
  images: {
    domains: ['assets.aceternity.com'],
    unoptimized: true,
  },
  // Ensure proper output for deployment
  output: 'standalone',
};

export default nextConfig;
