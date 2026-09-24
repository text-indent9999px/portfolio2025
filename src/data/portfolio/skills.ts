import type { SkillGroup } from './types';

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: 'core',
    title: 'Language & Framework',
    summary:
      '타입으로 오류를 줄이고, 서버·클라이언트 경계를 의식해 설계합니다.',
    items: [
      { name: 'TypeScript', icon: '/assets/skills/ts.svg' },
      { name: 'JavaScript', icon: '/assets/skills/js.svg' },
      { name: 'React', icon: '/assets/skills/react.svg' },
      { name: 'Next.js', icon: '/assets/skills/next.svg', hasBackground: true },
    ],
    points: [
      '제네릭과 유틸리티 타입으로 컴파일 단계에서 오류를 줄입니다.',
      '커스텀 훅으로 UI 관심사와 비즈니스 로직을 분리합니다.',
      'App Router와 서버 컴포넌트로 초기 로딩과 SEO를 챙기고 SSR·ISR 전략을 선택합니다.',
    ],
  },
  {
    id: 'styling',
    title: 'Styling',
    summary: '디자인 토큰 기반으로 반응형과 다크모드를 일관되게 구현합니다.',
    items: [
      { name: 'Tailwind CSS', icon: '/assets/skills/tailwind.svg' },
      { name: 'Sass(SCSS)', icon: '/assets/skills/sass.svg' },
    ],
    points: [
      '모바일 퍼스트 레이아웃과 CSS 변수 기반 테마 시스템을 구축합니다.',
      '변수·믹스인·중첩으로 스타일을 구조화하고 재사용 가능한 UI 모듈을 만듭니다.',
    ],
  },
  {
    id: 'data',
    title: 'State & Data',
    summary:
      '서버 상태와 클라이언트 상태를 분리해 호출 수와 복잡도를 줄입니다.',
    items: [
      {
        name: 'React Query',
        icon: '/assets/skills/reactQuery.svg',
        hasBackground: true,
      },
      { name: 'Redux Toolkit', icon: '/assets/skills/redux.svg' },
    ],
    points: [
      'staleTime 등 캐싱 전략과 중복 호출 제거로 API 호출을 최적화합니다.',
      '복잡한 로직에는 단방향 데이터 흐름으로 예측 가능한 전역 상태를 설계합니다.',
    ],
  },
  {
    id: 'mobile',
    title: 'Mobile',
    summary: '웹과 모바일의 렌더링 차이를 이해하고 웹뷰 연동 경험이 있습니다.',
    items: [
      { name: 'React Native', icon: '/assets/skills/react-native.svg' },
      { name: 'Flutter', icon: '/assets/skills/flutter.svg' },
    ],
    points: [
      '네이티브 앱의 웹뷰 전환과 디바이스 연동 흐름을 다뤄 봤습니다.',
      '개인 프로젝트로 React Native·Flutter 기반 앱을 개발하고 있습니다.',
    ],
  },
  {
    id: 'workflow',
    title: 'Workflow & Deploy',
    summary: '브랜치 전략, 코드 리뷰, 자동 배포까지 협업 흐름을 갖춰 일합니다.',
    items: [
      { name: 'Git', icon: '/assets/skills/git.svg' },
      {
        name: 'GitHub',
        icon: '/assets/skills/gitHub.svg',
        hasBackground: true,
      },
      {
        name: 'Vercel',
        icon: '/assets/skills/vercel.svg',
        hasBackground: true,
      },
      {
        name: 'Render',
        icon: '/assets/skills/render.svg',
        hasBackground: true,
      },
      { name: 'Jira', icon: '/assets/skills/jira.svg' },
    ],
    points: [
      'Git Submodule 기반 공통 모듈 관리, Git Flow, PR 템플릿, 코드 리뷰를 활용합니다.',
      'Vercel·Render로 빌드부터 배포까지 자동화 파이프라인을 운영합니다.',
    ],
  },
  {
    id: 'ai-tools',
    title: 'AI 활용',
    summary:
      '코딩 에이전트로 개발 흐름에 결합하고, 필요하면 API 연동까지 직접 구현합니다.',
    items: [
      { name: 'ChatGPT', icon: '/assets/skills/ai.svg' },
      { name: 'Claude', icon: '/assets/skills/ai.svg' },
      { name: 'Gemini', icon: '/assets/skills/ai.svg' },
      { name: 'Cursor', icon: '/assets/skills/ai.svg' },
    ],
    points: [
      'ChatGPT·Claude·Gemini·Cursor를 코딩 에이전트로 활용해 구현 속도와 코드 품질을 높입니다.',
      'Gemini는 API 연동까지 직접 구현해 서비스 로직에도 활용해 봤습니다.',
    ],
  },
];
