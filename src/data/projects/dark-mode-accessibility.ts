import { ProjectDetail } from '../../components/pages/Projects/types/project-tabs';

export const darkModeAccessibilityProject: ProjectDetail = {
  meta: {
    id: 'dark-mode-accessibility',
    title: '다크모드·접근성 우선 테마 시스템 & 탭 동기화',
    description: `최근 대부분의 서비스가 다크 모드를 지원하고 있고, 접근성 측면에서도 다크 모드는 중요한 요소가 되어가고 있습니다. 
    기존 프로젝트에서는 라이트 모드 중심의 개발과 최소한의 접근성 고려로 진행되는 경우가 많아, 이를 개선해보고자 다크 모드 기반 UI 설계 및 전반적인 웹 접근성 강화 작업을 진행했습니다.

1. 다크 모드 컬러 시스템 구축
단순히 컬러 팔레트를 반전하는 방식으로는 일관된 다크 모드를 구현하기 어려웠기 때문에,
- 배경색을 기본적으로 gray scale 기반으로 정리하고,
- 라이트/다크 모드별로 bg-surface-level-1과 같은 계층적 컬러 토큰을 따로 지정했으며,
-CSS 변수 기반으로 전체 색상을 관리할 수 있도록 구조화했습니다.
이를 통해 테마 전환 시 개별 컴포넌트를 다시 수정할 필요 없이, 컬러 토큰 변경만으로 전체 테마가 안정적으로 바뀌도록 설계했습니다.

2. 사용자 주도 테마 변경 및 탭 간 동기화
웹 브라우저의 다크 모드 설정을 기본으로 따르되, 사용자가 직접 테마를 토글할 수 있는 옵션을 제공했습니다.
또한 여러 개의 브라우저 탭을 동시에 사용할 때, 탭마다 다른 테마가 적용되어 혼란을 주는 문제를 해결하기 위해 BroadcastChannel API를 사용해 테마 변경 상태를 실시간으로 동기화했습니다.
BroadcastChannel을 지원하지 않는 환경에서는 제한적으로 sessionStorage 및 storage 이벤트를 활용하여 동일한 동작을 수행하도록 폴백을 구성했습니다.

3. 웹 접근성(Accessibility) 강화
각 UI 컴포넌트 단위로 접근성 점검을 진행하며 다음과 같은 요소들을 개선했습니다.
- aria-live, aria-label 등 ARIA 속성 정비
- focus-visible 및 키보드 네비게이션 지원
- 버튼 및 텍스트 대비 비율을 WCAG 기준에 맞추어 조정
- 키보드만으로 모든 주요 인터랙션을 수행할 수 있도록 구조 개선

이를 통해 구글 Lighthouse 기준으로 모든 페이지의 접근성 점수 100점을 달성했습니다.`,
    tags: [
      '다크모드',
      '접근성',
      '탭 동기화',
      'WCAG',
      'ARIA',
      '키보드 네비게이션',
      'BroadcastChannel',
      'Tailwind',
      'CSS변수',
    ],
    summary: `BroadcastChannel로 다크모드 상태를 실시간 동기화하고, 폴백으로 storage 이벤트를 활용한 테마 시스템입니다.
단순한 색상 전환이 아닌, 탭 간 일관된 사용자 경험을 목표로 설계했습니다.`,
  },
  tabs: [
    {
      type: 'demo',
      label: '데모',
      order: 0,
      payload: {
        description:
          '다크모드 토글 및 탭 간 테마 동기화 데모입니다.\n여러 탭을 열어두고 테마를 변경하면 모든 탭에서 실시간으로 동기화되는 것을 확인할 수 있습니다.',
        videos: [
          {
            path: '/assets/videos/theme-toggle-click.webm',
            title: '테마 토글',
            description: '테마 버튼 클릭으로 라이트/다크 모드 전환',
          },
          {
            path: '/assets/videos/theme-toggle-tabs.webm',
            title: '탭 간 테마 동기화',
            description:
              '여러 탭을 열어두고 한 탭에서 테마를 변경하면 모든 탭에서 실시간으로 동기화',
          },
        ],
      },
    },
    { type: 'overview', label: '제작 배경', order: 1 },
    {
      type: 'features',
      label: '구현 사항',
      order: 2,
      payload: {
        features: [
          '싱글톤 ThemeDetector 클래스 설계: 초기화, 구독(subscribe), set/toggle API 제공',
          'useThemeDetector React Hook으로 컴포넌트 친화적 인터페이스 제공',
          '로컬스토리지 기준 초기화 + 시스템 prefers-color-scheme 폴백 처리',
          'BroadcastChannel 기반 탭 간 실시간 테마 동기화(탭 간 일관된 UX 보장)',
          'HTML 루트에 dark, theme-ready, theme-setting-completed 등 클래스/데이터 속성 주입으로 전환 플래시 최소화',
          'CSS Custom Properties + Tailwind 토큰 매핑으로 라이트/다크 일관성 유지',
          '컴포넌트 레벨의 ARIA 속성 및 키보드 포커스 개선으로 스크린 리더·키보드 접근성 강화',
        ],
      },
    },
    {
      type: 'challenges',
      label: '문제와 해결',
      order: 3,
      payload: {
        items: [
          {
            challenge:
              '기존 사이트가 라이트모드 중심으로 설계되어 다크모드 지원과 색상 일관성이 부족함',
            solution:
              'CSS Custom Properties와 Tailwind 토큰 매핑을 결합한 디자인 토큰 시스템을 도입해 라이트/다크 모드 전환 시 색상 일관성을 보장',
          },
          {
            challenge:
              '사용자가 여러 탭을 열었을 때 탭별 테마 불일치로 UX가 파편화됨',
            solution:
              'BroadcastChannel을 이용해 탭 간 테마 변경 이벤트를 브로드캐스트하고 동기화 로직을 구현하여 모든 탭에서 동일한 테마 유지',
          },
          {
            challenge:
              '테마 전환 시 HTML 플래시(깜빡임)나 레이아웃 점프가 발생해 시각적 단절감 유발',
            solution:
              'theme-ready/theme-setting-completed 클래스와 html.dataset.visibility 플래그를 사용해 전환 시점 제어 및 로드 타이밍을 맞춰 깜빡임 최소화',
          },
          {
            challenge:
              '사용자가 직접 테마를 설정할 때 상태 저장·복원과 동기화 로직이 미흡해 설정이 유지되지 않음',
            solution:
              '로컬스토리지에 테마 저장, getCurrentThemeState/setTheme API 제공 및 syncFromStorage 로직으로 안정적인 상태 복원·동기화 보장',
          },
          {
            challenge:
              '접근성(명도 대비·ARIA·키보드 네비게이션) 미준수로 일부 사용자가 이용에 어려움 발생',
            solution:
              '색상 팔레트 설계 시 명도 대비 4.5:1 이상을 보장하고, 컴포넌트 단위로 ARIA·시맨틱 HTML·포커스 표시기를 적용하여 WCAG 2.1 AA 수준 접근성 확보',
          },
        ],
      },
    },
    {
      type: 'code',
      label: '코드 보기',
      order: 4,
      payload: {
        codeHighlights: [
          {
            title: '탭 동기화',
            description:
              '여러 탭 간에 테마 설정을 실시간으로 동기화하는 시스템을 구현했습니다.',
            codeFile: 'themeDetector.ts',
            language: 'typescript',
          },
          {
            title: '테마 토글 버튼',
            description:
              '테마 토글 버튼 컴포넌트입니다. 접근성 속성(aria-live)을 포함합니다.',
            codeFile: 'ThemeToggle.tsx',
            language: 'typescript',
          },
        ],
      },
    },
    {
      type: 'custom',
      label: 'Lighthouse',
      order: 5,
    },
  ],
};
