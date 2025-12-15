/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['pump.fun', 'dexscreener.com'],
    unoptimized: false,
  },
  // Exclude the 'web' folder from the build
  webpack: (config) => {
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ['**/web/**', '**/node_modules/**'],
    };
    return config;
  },
};

export default nextConfig;

