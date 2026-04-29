import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    viewTransition: true,
  },
  images: {
    qualities: [50, 70, 75, 100],
  },
};

export default nextConfig;
