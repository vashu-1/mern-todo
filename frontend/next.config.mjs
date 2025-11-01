/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactStrictMode: true,
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
};

export default nextConfig;
