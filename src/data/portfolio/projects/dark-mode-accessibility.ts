import type { Project } from '../types';

export const darkModeAccessibility: Project = {
  slug: 'dark-mode-accessibility',
  title: '다크모드 · 접근성 테마 시스템',
  summary:
    '여러 탭의 테마를 실시간 동기화하고, 명도 대비 4.5:1 이상의 토큰으로 접근성을 지킨 테마 시스템입니다.',
  category: 'Accessibility',
  status: 'live',
  role: '1인 개발 (설계 · 구현 · 검증)',
  stack: ['React', 'TypeScript', 'Tailwind CSS', 'CSS Variables'],
  tags: ['다크모드', '접근성', 'WCAG', 'ARIA', '탭 동기화', '키보드 내비게이션'],
  art: 'theme',
  accent: 'mist',
  background: [
    '여러 웹 서비스를 리뉴얼하며 다크모드를 다뤘습니다. 그런데 단순한 색상 반전 위주의 다크모드는 디자인 일관성이 무너지고 텍스트 명도 대비 기준도 못 맞춰 오히려 접근성을 해칠 수 있었습니다.',
    '또 사용자가 브라우저 탭을 여러 개 열어 두면 탭마다 테마가 달라 경험이 파편화되는 문제도 발견했습니다. WCAG 가이드라인을 지키면서 탭 간 테마를 실시간 동기화하는 테마 시스템을 설계한 이유입니다.',
  ],
  features: [
    '모듈 단위 테마 스토어: 저장값 → 시스템 설정 순으로 모드를 정하고 set/toggle API 제공',
    'useTheme 훅(useSyncExternalStore)으로 컴포넌트 친화적인 인터페이스 제공',
    'localStorage 값 우선, 시스템 prefers-color-scheme 폴백으로 초기 테마 결정',
    'storage 이벤트 기반 탭 간 실시간 테마 동기화 (다른 탭의 변경을 브라우저가 알려 줌)',
    'HTML 루트에 테마 클래스를 주입하는 시점을 제어해 초기 로드 시 화면 깜빡임(Flash) 방지',
    'CSS Custom Properties와 Tailwind 토큰 매핑으로 라이트/다크 일관성 유지',
    '컴포넌트 단위 ARIA 속성과 키보드 포커스 개선',
  ],
  challenges: [
    {
      problem: '라이트모드 중심 설계라 다크모드 지원과 색상 일관성이 부족',
      solution:
        'CSS Custom Properties와 Tailwind 토큰 매핑을 결합한 디자인 토큰 시스템으로 라이트/다크 전환 시 색상 일관성을 보장했습니다.',
    },
    {
      problem: '여러 탭을 열면 탭마다 테마가 달라짐',
      solution:
        'storage 이벤트로 다른 탭의 변경을 감지해 모든 탭이 같은 상태를 유지하게 했습니다.',
    },
    {
      problem: '테마 전환 시 HTML 플래시(깜빡임) 발생',
      solution:
        '<head>의 인라인 스크립트가 첫 페인트 전에 html에 dark 클래스를 미리 적용해 깜빡임을 막았습니다.',
    },
    {
      problem: '사용자가 고른 테마의 저장·복원과 동기화가 불완전해 설정이 유지되지 않음',
      solution:
        'localStorage 저장, getCurrentThemeState/setTheme API, syncFromStorage 로직으로 상태 복원과 동기화를 안정화했습니다.',
    },
    {
      problem: '명도 대비·ARIA·키보드 내비게이션 미준수로 일부 사용자가 이용하기 어려움',
      solution:
        '색상 팔레트를 명도 대비 4.5:1 이상으로 설계하고, 컴포넌트마다 ARIA·시맨틱 HTML·포커스 표시기를 적용해 WCAG 2.1 AA 수준을 목표로 했습니다.',
    },
  ],
  videos: [
    {
      path: '/assets/videos/theme-toggle-click.mp4',
      title: '테마 토글',
      description: '버튼 클릭으로 라이트/다크 모드 전환',
      width: 1866,
      height: 912,
      thumbnail: '/assets/images/port-dark.png',
    },
    {
      path: '/assets/videos/theme-toggle-tabs.mp4',
      title: '탭 간 테마 동기화',
      description: '한 탭에서 테마를 바꾸면 열려 있는 모든 탭이 실시간으로 동기화',
      width: 1866,
      height: 912,
      thumbnail: '/assets/images/project-dark.png',
    },
  ],
  mediaNote: '시연 영상은 사이트 리뉴얼 이전 버전에서 녹화한 화면입니다.',
  proof: '주요 페이지 Lighthouse 접근성 100점, axe-core 자동 검사 위반 0건 (라이트·다크 모두).',
  code: [
    {
      title: '테마 상태 동기화 로직',
      description: '여러 탭 간에 테마 설정을 실시간으로 동기화하는 시스템입니다.',
      file: 'themeDetector.ts',
      language: 'typescript',
    },
    {
      title: '테마 토글 UI',
      description: 'aria-live 안내를 포함한 접근성 있는 토글 컴포넌트입니다.',
      file: 'ThemeToggle.tsx',
      language: 'typescript',
    },
    {
      title: '테마 컬러 토큰 매핑',
      description: '라이트/다크의 핵심 컬러 토큰을 정의해 명도 대비와 시각적 일관성을 유지합니다.',
      file: 'colors-theme.css',
      language: 'css',
    },
    {
      title: '모드별 컬러 정의',
      description: '라이트/다크 모드별 색상 값을 분리해 테마 의도를 명확하게 유지합니다.',
      file: 'colors-modes.css',
      language: 'css',
    },
  ],
};
