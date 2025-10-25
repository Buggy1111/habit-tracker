import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'], // Use modern formats
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 60, // 60 days cache
  },

  // Turbopack optimizations (already enabled by default in dev)
  experimental: {
    // Enable optimistic client cache
    optimisticClientCache: true,
  },

  // Compiler optimizations
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },

  // Production optimizations
  swcMinify: true, // Use SWC for minification (faster than Terser)
  reactStrictMode: true,
  poweredByHeader: false, // Remove X-Powered-By header
};

export default nextConfig;
