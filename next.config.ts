import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // 정적 내보내기 설정 (Vercel에서 필요 시 유지, 일반적으론 생략 가능하나 안전을 위해 유지)
  output: 'export',

  // ⚠️ GitHub Pages용 basePath 설정 삭제 (Vercel에서는 빈 값이어야 합니다)
  basePath: '',

  // 정적 배포 시 이미지 최적화 비활성화
  images: {
    unoptimized: true,
  },

  // 트레일링 슬래시 설정 (Vercel에서는 선택 사항이지만, 유지해도 무방합니다)
  trailingSlash: true,
};

export default nextConfig;