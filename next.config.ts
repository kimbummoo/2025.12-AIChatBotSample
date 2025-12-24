import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // 1. 정적 HTML 배포 설정
  output: 'export',

  // 2. GitHub Pages 경로 설정
  // 'your-repo-name'을 실제 GitHub 저장소 이름으로 바꾸세요.
  // 로컬 개발(npm run dev) 시에는 빈 문자열('')이 되어야 경로 에러가 나지 않습니다.
  basePath: process.env.NODE_ENV === 'production' ? '/2025.12-AIChatBotPage' : '',
  
  // 3. 이미지 최적화 비활성화 (정적 배포 필수 설정)
  images: {
    unoptimized: true,
  },

  // 4. 트레일링 슬래시 설정 (선택 사항: GitHub Pages 경로 호환성 향상)
  trailingSlash: true,
};

export default nextConfig;