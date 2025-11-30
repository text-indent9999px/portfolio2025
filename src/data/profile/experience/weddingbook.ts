import type {
  ExperienceItem,
  ProjectItem,
} from '../../../components/pages/Profile/types';

export const weddingbookExperience: ExperienceItem = {
  id: '1',
  period: '2024.04 - 2025.06 (1년 3개월)',
  title: '웨딩북',
  company: '웨딩북',
  position: '프론트엔드 개발자',
  companyType: 'self-service',
  description: `웨딩북 앱의 프론트엔드 개발을 담당하며 
  네이티브 앱에서 웹뷰로의 전환과 사용자 경험 개선에 기여했습니다.
  성능 최적화와 모듈화를 통한 개발 효율성 향상을 담당했습니다.`,
  skills: ['React', 'Next.js', 'Webview', 'WebApp'],
  type: 'work',
  projects: [
    {
      id: '1-1',
      period: '2025.01 - 2025.06',
      title: '시스템 안정화 및 개선 작업',
      description: `기존 시스템의 안정화를 담당하며 사용자 피드백을 반영한 신규 기능 개발과 개선을 진행했습니다. 
      코드 리팩토링 및 문서화를 통해 전반적인 개발 효율성과 품질을 향상시켰습니다. 
      Next.js 서버 컴포넌트와 React Query를 활용해 로그인 및 토큰 갱신 로직을 개선했습니다.`,
      tags: ['코드리팩토링', '문서화', '서버컴포넌트', 'ReactQuery'],
    },
    {
      id: '1-2',
      period: '2024.08 - 2025.05',
      title: '공통 컴포넌트 개발',
      description: `Git Submodule 기반 컴포넌트 모듈화를 통해 UI 성능과 유지보수 효율성을 높였습니다.
      유지보수를 담당하며 코드 리팩토링과 문서화를 통해 개발 효율성과 품질을 향상시켰습니다.`,
      tags: ['공통컴포넌트', '개발', 'Git Submodule'],
    },
    {
      id: '1-3',
      period: '2024.11 - 2025.01',
      title: '스토어/레지스트리(청첩장) 개편',
      description: `신규 서비스인 레지스트리(청첩장) 서비스를 제작하고, 이에 따른 스토어 페이지를 개편하였습니다. 
      이용자가 직접 온라인 청첩장을 제작할 수 있는 서비스를 제공하고, 위시리스트를 카톡으로 공유하는 기능을 추가하였습니다.`,
      tags: ['카카오톡 공유', '위시리스트', '청첩장', '레지스트리'],
    },
    {
      id: '1-4',
      period: '2024.09 - 2024.11',
      title: '마이페이지 리뉴얼 작업',
      description: `마이페이지 및 회원 활동 관련 페이지를 전면 리뉴얼하고, 
      Canvas를 활용해 이미지 업로드 속도를 50~70% 개선했습니다. 
      프론트엔드에서 리사이징을 선행해 서버 부하를 줄이고 사용자 경험을 개선했습니다.`,
      tags: ['마이페이지리뉴얼', '이미지리사이징', '업로드최적화', 'Canvas'],
    },
    {
      id: '1-5',
      period: '2024.06 - 2024.09',
      title: '업체 페이지 리뉴얼 작업',
      description: `업체 리뷰 및 포토 영역을 웹뷰로 전환하고, 블로그 리뷰 작성 기능을 추가했습니다. 
      Broadcast API를 활용해 불필요한 API 호출을 제거하고 응답 속도를 개선했으며, 
      lazy load와 이미지 프록시로 리소스 처리를 최적화했습니다.`,
      tags: ['BroadcastAPI', 'LazyLoad', '이미지프록시', '성능최적화'],
    },
    {
      id: '1-6',
      period: '2024.04 - 2024.06',
      title: '로그인/회원가입 리뉴얼 작업',
      description: `기존 네이티브 기반의 로그인·회원가입 기능을 웹뷰로 전환하고, 
      네이버·카카오·애플 소셜 로그인 연동을 추가했습니다. 
      로그인 프로세스 개선을 통해 접근성과 사용자 편의성을 높였습니다.`,
      tags: ['소셜 로그인', 'OAuth', '웹뷰 전환'],
    },
  ] as ProjectItem[],
};
