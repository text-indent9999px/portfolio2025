import { ProjectDetail } from '../../components/pages/Projects/types/project-tabs';

export const designSystemProject: ProjectDetail = {
  meta: {
    id: 'design-system',
    title: '공통 UI 컴포넌트 시스템',
    description: `회사에서 공용 UI 컴포넌트를 제작하며 다음과 같은 문제점을 경험했습니다.

1. 컴포넌트 별 스타일링이 독립적으로 이루어져 있어, 스타일 가이드 상 공통 요소(컬러 팔레트, radius, font-size 등) 리뉴얼 시, 각 컴포넌트를 개별적으로 수정해야 하는 비효율
2. 다양한 사용 케이스를 지원하려다 보니 props가 과도하게 길어지고, 결과적으로 가독성이 떨어지는 문제

포트폴리오 프로젝트에서는 이와 같은 문제점을 해결하고 개선하기 위해 다음과 같은 방식으로 구현했습니다.

1. uiConfig.ts 파일을 통해 공통 디자인 속성을 토큰화, 동일한 패턴으로 적용할 수 있도록 설계하여 유지보수성을 향상
2. 스타일링은 주로 Tailwind CSS를 활용하여 세부 스타일링이 달라지는 문제를 최소화, 작업자 간 일관성을 확보
3. 스타일링, 유틸리티, 이벤트 핸들러 파일을 최대한 분리하여 코드 가독성 향상
4. Compound 패턴을 적용, 다양한 컴포넌트를 구조적으로 확장 가능하도록 설계

공용 UI 컴포넌트는 프로젝트 전반에서 반복 사용되는 만큼, 코드 복잡도를 줄이고 재사용성과 가독성을 높이는 방향에 중점을 두고 제작했습니다.`,
    tags: [
      'UI시스템',
      '공통컴포넌트',
      '디자인토큰',
      'Compound 패턴',
      'React',
      'TypeScript',
      'SCSS Modules',
      'Tailwind CSS',
      'Storybook',
    ],
    summary: `디자인 토큰을 중앙에서 관리하고 Compound 패턴으로 컴포넌트 구조를 단순화한 UI 시스템입니다.
실무에서 경험한 유지보수성과 일관성 문제를 개선하기 위해, 공통 설정 기반의 구조로 재설계했습니다.`,
  },
  tabs: [
    { type: 'overview', label: '제작 배경', order: 1 },
    {
      type: 'features',
      label: '주요 구현 사항',
      order: 2,
      payload: {
        features: [
          'uiConfig.ts를 통한 컬러·radius 등 UI 토큰 일원화로 디자인 일관성 및 유지보수성 향상',
          '디자인 토큰(CSS 변수 + Tailwind) 기반 테마 전환 자동화 및 확장 용이성 확보',
          'Button: 5가지 variant(filled/tonal/outlined/ghost/text), 3가지 size 지원, 내장 접근성 로직으로 키보드 포커스·ARIA 자동 처리',
          'Badge: 숫자 카운트·아이콘·위치 조정 기능 + aria-live 속성으로 실시간 알림 접근성 강화',
          'Label: Button과 동일한 variant/color 체계 및 4가지 size 지원으로 컴포넌트 간 시각적 일관성 확보',
          'Card: Compound 패턴(Header/Content/Footer)과 Grid 레이아웃으로 조합 유연성 및 재사용성 극대화',
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
              '컴포넌트 간 공통 속성(컬러, radius 등)이 분산되어 있어 일관성 유지 및 일괄 수정이 어려움',
            solution:
              '공통 설정 파일(uiConfig.ts)로 컬러·radius·상태 토큰 중앙 관리 → 디자인 리뉴얼 시 한 번의 수정으로 전체 반영',
          },
          {
            challenge:
              'variant·size·shape 등 컴포넌트 변형이 늘어나면서 props가 과도하게 복잡해짐',
            solution:
              '기능 로직과 스타일 로직을 분리하고, 변형 속성은 설정·유틸 단으로 위임 → props 슬림화 및 재사용성 향상',
          },
          {
            challenge:
              '접근성(ARIA, 키보드 탐색) 고려 부족으로 사용자 경험 저하 발생',
            solution: 'ARIA 속성 및 키보드 네비게이션을 기본 내장',
          },
          {
            challenge:
              'Card 등 복합 컴포넌트에서 내부 구조가 섞여 확장·조합이 어려워지고 코드 복잡도 증가',
            solution:
              'Compound 패턴(Card.Header, Card.Body, Card.Footer 등)을 적용해 하위 구성요소를 명확히 분리하고, 조합 가능한 구조로 재설계',
          },
          {
            challenge:
              '라이트/다크 모드 전환 시 색상 동기화가 수동적이라 테마별 색상 일관성이 깨지고 관리가 어려움',
            solution:
              'CSS 변수(colors.css)와 Tailwind 디자인 토큰을 연동 → 라이트/다크 모드 전환 시 자연스러운 색상 동기화 구현',
          },
          {
            challenge:
              '문서화 부족으로 인한 온보딩 비용 증가, 디자인팀과의 커뮤니케이션 어려움',
            solution:
              'Storybook 기반 인터랙티브 문서화로 접근성·온보딩 품질 개선, 디자인팀과의 커뮤니케이션 개선',
          },
        ],
      },
    },
    {
      type: 'code',
      label: '코드 하이라이트',
      order: 4,
      payload: {
        codeHighlights: [
          {
            title: '공통 토큰 설정',
            description:
              'Button/Label/Badge가 공유하는 중앙화된 토큰 시스템입니다. 컬러, 반경, 상태를 한 곳에서 관리합니다.',
            codeFile: 'uiConfig.ts',
            language: 'typescript',
          },
          {
            title: 'Button',
            description:
              '5가지 variant와 3가지 size를 지원하는 Button 컴포넌트입니다. 접근성과 아이콘 지원이 내장되어 있습니다.',
            codeFile: 'Button.tsx',
            language: 'typescript',
            demoPath: 'Button',
          },
          {
            title: 'Badge',
            description:
              '숫자 카운트, 위치 조정, 아이콘 지원이 가능한 Badge 컴포넌트입니다. 접근성 속성(aria-live)을 포함합니다.',
            codeFile: 'Badge.tsx',
            language: 'typescript',
            demoPath: 'Badge',
          },
          {
            title: 'Label',
            description:
              'Button과 동일한 토큰 체계를 사용하는 Label 컴포넌트입니다. 4가지 size를 지원합니다.',
            codeFile: 'Label.tsx',
            language: 'typescript',
            demoPath: 'Label',
          },
          // {
          //   title: 'Tab',
          //   description:
          //     '키보드 네비게이션과 접근성을 고려한 Tab 컴포넌트입니다.',
          //   codeFile: ['PrimaryTab.tsx', 'SecondaryTab.tsx'],
          //   language: 'typescript',
          //   demoPath: 'Tab',
          // },
          {
            title: 'Card',
            description:
              'Compound 패턴(Header/Content/Footer)과 Grid 레이아웃으로 조합 유연성 및 재사용성 극대화한 Card 컴포넌트입니다.',
            codeFile: 'Card.tsx',
            language: 'typescript',
            demoPath: 'Card',
          },
        ],
      },
    },
  ],
};
