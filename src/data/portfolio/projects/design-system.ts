import type { Project } from '../types';

export const designSystem: Project = {
  slug: 'design-system',
  title: '공통 UI 컴포넌트 시스템',
  summary:
    '스타일 규칙을 한 곳에서 관리하고 Compound 패턴으로 조립 구조를 단순화한 UI 시스템입니다. 이 포트폴리오도 이 위에서 만들었습니다.',
  category: 'Design System',
  status: 'live',
  role: '1인 개발 (설계 · 구현 · 문서화)',
  stack: ['React', 'TypeScript', 'Tailwind CSS', 'SCSS Modules', 'Storybook'],
  tags: ['UI 시스템', 'Compound 패턴', '접근성', '디자인 토큰', 'Storybook'],
  cover: {
    src: '/assets/images/storybook-dark.png',
    alt: 'Storybook으로 문서화한 공통 UI 컴포넌트',
    position: 'top left',
  },
  accent: 'gold',
  background: [
    '에이전시와 자체 서비스에서 여러 브랜드의 자사몰과 신규 화면을 빠르게 만들어야 했습니다. 그 과정에서 컴포넌트 스타일 속성이 흩어져 디자인을 일괄 수정할 때 공수가 크게 들었고, 요구사항마다 props가 늘어나 가독성과 유지보수성이 떨어지는 문제를 겪었습니다.',
    '이를 해결하려고 스타일 설정을 단일 파일로 중앙 제어해 관리 지점을 좁히고, Compound 패턴으로 컴포넌트 내부 복잡도를 낮춰 재사용성과 조립 유연성을 확보하는 공통 UI 시스템을 만들었습니다.',
  ],
  features: [
    'uiConfig.ts 하나로 컬러·radius 등 공통 스타일 속성을 중앙 관리 — 변경 시 수정 범위를 단일 파일로 제한',
    'Tailwind CSS와 CSS 변수 기반으로 다크모드 대응 및 테마 확장 구조 설계',
    'Button: solid/soft/outline/minimal/plain 5개 variant, 3개 size, semantic color 체계, 키보드 포커스·ARIA 처리',
    'Badge: 숫자·아이콘·위치 조정 지원, aria-live로 수치 변화를 스크린리더에 안내',
    'Pill: Badge와 구분되는 비인터랙티브 메타 조각, Button과 동일한 variant/color/size 체계 공유',
    'Card: slots API(header · thumb · body · footer)와 Grid 레이아웃 기반의 Compound 구조',
  ],
  challenges: [
    {
      problem: '컴포넌트마다 공통 스타일 속성이 분산되어 일괄 수정이 어려움',
      solution:
        'uiConfig.ts로 컬러·radius·상태 스타일을 중앙 관리해, 공통 스타일 변경이 단일 파일 수정으로 전체에 반영되게 했습니다.',
    },
    {
      problem: 'variant·size 같은 변형이 늘어나며 props가 복잡해짐',
      solution:
        '기능 로직과 스타일 로직을 분리하고 변형 속성을 설정·유틸 레이어로 위임해 props 구조를 단순화했습니다.',
    },
    {
      problem: '컴포넌트 단위의 웹 접근성(WAI-ARIA, 키보드 내비게이션) 규격 미준수',
      solution:
        '시맨틱 ARIA 마크업과 focus-visible 상태 제어를 컴포넌트에 기본 내장했습니다.',
    },
    {
      problem: '복합 컴포넌트 내부 구조가 뒤섞여 확장과 조합이 어려움',
      solution:
        'Card slots API로 하위 구성요소를 분리해 조합 가능한 구조로 재설계했습니다.',
    },
    {
      problem: '라이트/다크 전환 시 색상 일관성을 유지하기 어려움',
      solution: 'CSS 변수와 Tailwind를 연동해 모드 전환 시 색상이 자동으로 동기화되게 했습니다.',
    },
    {
      problem: '1인 개발에서 컴포넌트별 상태(Props, Variant)를 시각적으로 검증하고 명세하기 번거로움',
      solution:
        'Storybook으로 인터랙티브 명세 문서와 개별 렌더링 검증 환경을 구축했습니다.',
    },
  ],
  videos: [
    {
      path: '/assets/videos/storybook-theme-toggle.mp4',
      title: 'Storybook 테마 전환',
      description: 'Storybook 상단 패널에서 배경색을 바꿔 라이트/다크 모드를 전환합니다.',
      width: 1866,
      height: 912,
      thumbnail: '/assets/images/storybook-dark.png',
    },
  ],
  code: [
    {
      title: '공통 스타일 설정',
      description: 'Button·Pill·Badge가 공유하는 컬러·반경·상태 규칙을 한 곳에서 관리합니다.',
      file: 'uiConfig.ts',
      language: 'typescript',
    },
    {
      title: 'Button',
      description: '5개 variant와 3개 size를 지원하며 접근성과 아이콘 지원이 내장되어 있습니다.',
      file: 'Button.tsx',
      language: 'typescript',
    },
    {
      title: 'Card',
      description: 'slots API와 Grid 레이아웃으로 조합 유연성과 재사용성을 높인 Compound 컴포넌트입니다.',
      file: 'Card.tsx',
      language: 'typescript',
    },
    {
      title: 'Badge',
      description: '숫자 카운트·위치 조정·아이콘을 지원하고 aria-live 속성을 포함합니다.',
      file: 'Badge.tsx',
      language: 'typescript',
    },
    {
      title: 'Tab',
      description: 'Primary/Secondary 변형과 키보드 이동을 지원하는 탭 컴포넌트입니다.',
      file: 'Tab.tsx',
      language: 'typescript',
    },
  ],
  links: [
    {
      label: 'Storybook 열기',
      href: 'https://text-indent9999px-storybook.vercel.app',
    },
  ],
  proof: '이 사이트의 버튼·카드·배지·탭이 모두 이 컴포넌트 시스템으로 만들어졌습니다.',
};
