export interface Skill {
  name: string;
  icon: string;
  hasBackground?: boolean;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: Skill[];
}

export interface SkillTabItem {
  label: string;
  value: string;
  id: string;
}

export const skillTabItems: SkillTabItem[] = [
  {
    label: '언어/기본',
    value: 'language',
    id: 'language',
  },
  {
    label: '프레임워크/라이브러리',
    value: 'framework',
    id: 'framework',
  },
  {
    label: '스타일링',
    value: 'styling',
    id: 'styling',
  },
  {
    label: '상태관리/데이터처리',
    value: 'dataProcessing',
    id: 'dataProcessing',
  },
  {
    label: '협업/배포/워크플로우',
    value: 'workflow',
    id: 'workflow',
  },
];

export const skillCategories: Record<string, SkillCategory> = {
  language: {
    title: '언어/기본',
    description: `TypeScript : 
      - 타입 안정성 확보로 런타임 오류 최소화 
      - 협업 시 코드 가독성 및 유지보수성 향상`,
    skills: [
      {
        name: 'JavaScript',
        icon: '/assets/skills/js.svg',
      },
      {
        name: 'TypeScript',
        icon: '/assets/skills/ts.svg',
      },
    ],
  },
  framework: {
    title: '프레임워크/라이브러리',
    description: `React : 
      - 컴포넌트 기반 아키텍처를 통한 UI 재사용/유지보수성/확장성 
      - 유연한 데이터 흐름 관리

      Next.js : 
      - SEO 최적화
      - 서버사이드 렌더링(SSR)과 정적 페이지 생성(SSG) 지원`,
    skills: [
      {
        name: 'React',
        icon: '/assets/skills/react.svg',
      },
      {
        name: 'Next.js',
        icon: '/assets/skills/next.svg',
        hasBackground: true,
      },
    ],
  },
  styling: {
    title: '스타일링',
    description: `Tailwind CSS : 
      - 유틸리티 클래스 기반의 빠르고 일관성 있는 스타일링
      - 개발 생산성 향상 및 디자인 시스템 유지에 용이

      Sass(SCSS) : 
      - 변수, 믹스인, 함수 등의 기능을 통해 복잡한 스타일 로직을 구조적으로 관리 가능
      - 재사용 가능한 스타일 시스템을 구축`,
    skills: [
      {
        name: 'Sass(SCSS)',
        icon: '/assets/skills/sass.svg',
      },
      {
        name: 'Tailwind CSS',
        icon: '/assets/skills/tailwind.svg',
      },
    ],
  },
  dataProcessing: {
    title: '상태관리/데이터처리',
    description: `Redux (Redux Toolkit) : 
      - 전역 상태의 체계적인 관리 
      - 복잡한 상태 흐름을 단순화, 예측 가능성 향상

      React Query (TanStack Query) : 
      - 서버 상태 관리와 캐싱을 자동화, 불필요한 API 중복 호출 제거 
      - 효율적인 데이터 동기화 처리`,
    skills: [
      {
        name: 'Redux(Redux Toolkit)',
        icon: '/assets/skills/redux.svg',
      },
      {
        name: 'React Query(TanStack Query)',
        icon: '/assets/skills/reactQuery.svg',
        hasBackground: true,
      },
    ],
  },
  workflow: {
    title: '협업/배포/워크플로우',
    description: `Git / GitHub : 
      - 버전 관리 및 코드 리뷰를 통한 협업 효율성 향상
      - 안정적인 배포 파이프라인 유지

      Jira : 
      - 스프린트 기반 업무 관리 및 이슈 추적을 통한 팀 단위 개발 프로세스 체계적 운영

      Jenkins : 
      - CI/CD 파이프라인을 통한 자동화 배포 환경
      - 안정적이고 반복 가능한 배포 프로세스`,
    skills: [
      {
        name: 'Git',
        icon: '/assets/skills/git.svg',
      },
      {
        name: 'GitHub',
        icon: '/assets/skills/gitHub.svg',
        hasBackground: true,
      },
      {
        name: 'Jira',
        icon: '/assets/skills/jira.svg',
      },
      {
        name: 'Jenkins',
        icon: '/assets/skills/jenkins.svg',
      },
    ],
  },
};

