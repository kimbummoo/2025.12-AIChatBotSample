import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // output: 'export', // Enables static HTML export
  images: {
    unoptimized: true,
  },
};

export default nextConfig;