import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // 'output: export'도 지워보세요. Vercel은 알아서 빌드해줍니다.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;