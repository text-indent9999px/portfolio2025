import { ProjectDetail } from '../../components/pages/Projects/types/project-tabs';
import { EXTERNAL_LINKS } from '../../config/links';

export const designSystemProject: ProjectDetail = {
  meta: {
    id: 'design-system',
    title: '공통 UI 컴포넌트 시스템',
    description: `회사에서 공용 UI 컴포넌트를 제작하며 다음과 같은 문제점을 경험했습니다.

1. 컴포넌트 별 스타일링이 독립적으로 이루어져 있어, 색상, radius, font-size 등 공통 스타일 변경 시 각 컴포넌트를 개별적으로 수정해야 하는 비효율
2. 다양한 사용 케이스를 지원하려다 보니 props가 과도하게 길어지고, 결과적으로 가독성이 떨어지는 문제

포트폴리오 프로젝트에서는 이와 같은 문제점을 해결하고 개선하기 위해 다음과 같은 방식으로 구현했습니다.

1. uiConfig.ts 파일을 통해 공통 스타일 속성을 중앙화된 설정 파일로 관리하고, 동일한 패턴으로 적용할 수 있도록 설계하여 유지보수성을 향상
2. 스타일링은 주로 Tailwind CSS를 활용하여 세부 스타일링이 달라지는 문제를 최소화, 일관성을 확보
3. 스타일링, 유틸리티, 이벤트 핸들러 파일을 최대한 분리하여 코드 가독성 향상
4. Compound 패턴을 적용, 다양한 컴포넌트를 구조적으로 확장 가능하도록 설계

공용 UI 컴포넌트는 프로젝트 전반에서 반복 사용되는 만큼, 코드 복잡도를 줄이고 재사용성과 가독성을 높이는 방향에 중점을 두고 제작했습니다.`,
    tags: [
      'UI시스템',
      '공통컴포넌트',
      'Compound 패턴',
      'React',
      'TypeScript',
      'SCSS Modules',
      'Tailwind CSS',
      'Storybook',
    ],
    summary: `공통 스타일 규칙을 중앙에서 관리하고 Compound 패턴으로 컴포넌트 구조를 단순화한 UI 시스템입니다.
실무에서 경험한 유지보수성과 일관성 문제를 개선하기 위해, 공통 설정 기반의 구조로 재설계했습니다.`,
  },
  tabs: [
    { type: 'overview', label: '제작 배경', order: 1 },
    {
      type: 'features',
      label: '구현 사항',
      order: 2,
      payload: {
        features: [
          'uiConfig.ts를 통해 컬러·radius 등 공통 스타일 속성을 중앙 관리, 변경 시 수정 범위를 단일 파일로 제한',
          'Tailwind CSS와 CSS 변수 기반으로 다크모드 대응 및 테마 확장 구조 설계',
          'Button: solid/soft/outline/minimal/plain 5가지 variant, 3가지 size 지원, semantic color 체계 적용 및 키보드 포커스·ARIA 속성 처리',
          'Badge: 숫자 카운트·아이콘·위치 조정 지원, aria-live 속성으로 동적 수치 변경 시 스크린리더 알림 처리',
          'Pill: Badge와 구분되는 비인터랙티브 인라인 메타용 조각, Button과 동일한 variant/color/size 체계 공유',
          'Card: Compound 패턴(Header/Content/Footer) 적용, Grid 레이아웃 기반으로 조합 구조 설계',
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
              '컴포넌트 간 공통 스타일 속성이 분산되어 일괄 수정이 어려움',
            solution:
              'uiConfig.ts로 컬러·radius·상태 스타일을 중앙 관리, 공통 스타일 변경 시 단일 파일 수정으로 전체 반영',
          },
          {
            challenge: 'variant·size 등 변형이 늘어나며 props 복잡도 증가',
            solution:
              '기능 로직과 스타일 로직을 분리하고, 변형 속성을 설정·유틸 레이어로 위임해 props 구조 단순화',
          },
          {
            challenge: '접근성 처리 미흡',
            solution: 'ARIA 속성 및 키보드 네비게이션을 컴포넌트에 기본 내장',
          },
          {
            challenge: '복합 컴포넌트 내부 구조가 혼재되어 확장·조합이 어려움',
            solution:
              'slots API(Card slots: header / thumb / body / footer)로 하위 구성요소 분리 및 조합 가능한 구조로 재설계',
          },
          {
            challenge: '라이트/다크 모드 전환 시 색상 일관성 유지가 어려움',
            solution:
              'CSS 변수와 Tailwind를 연동해 모드 전환 시 색상 자동 동기화',
          },
          {
            challenge: '문서화 부족으로 온보딩 및 디자인팀 협업에 어려움',
            solution:
              'Storybook으로 인터랙티브 문서화, 컴포넌트 사용법과 변형을 시각적으로 확인 가능하도록 구성',
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
            title: '공통 스타일 설정',
            description:
              'Button/Pill/Badge가 공유하는 중앙화된 스타일 설정입니다. 컬러, 반경, 상태 관련 규칙을 한 곳에서 관리합니다.',
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
            title: 'Pill',
            description:
              '분류·메타 표시용 인라인 조각입니다. Badge와 달리 전시 전용이며, 클릭이 필요하면 Button을 사용합니다. 4가지 size를 지원합니다.',
            codeFile: 'Pill.tsx',
            language: 'typescript',
            demoPath: 'Pill',
          },
          {
            title: 'Card',
            description:
              'Compound 패턴(Header/Content/Footer)과 Grid 레이아웃으로 조합 유연성 및 재사용성 극대화한 Card 컴포넌트입니다.',
            codeFile: 'Card.tsx',
            language: 'typescript',
            demoPath: 'Card',
          },
          {
            title: 'InfoText',
            description:
              '성공/주의/오류/안내 상태 메시지를 전달하는 컴포넌트입니다. 사용자 피드백을 문장 형태로 명확히 전달합니다.',
            codeFile: 'InfoText.tsx',
            language: 'typescript',
            demoPath: 'InfoText',
          },
          {
            title: 'Image',
            description:
              '카드형 이미지 표시와 확대 보기(모달) 패턴을 공통 처리하는 컴포넌트입니다. 제목/설명/접근성 라벨을 함께 관리합니다.',
            codeFile: 'Image.tsx',
            language: 'typescript',
            demoPath: 'Image',
          },
          {
            title: 'Video',
            description:
              '데모 영상을 카드 형태로 표시하는 컴포넌트입니다. 썸네일 전환, 재생 옵션, 접근성 라벨을 공통 규칙으로 제공합니다.',
            codeFile: 'Video.tsx',
            language: 'typescript',
            demoPath: 'Video',
          },
          {
            title: 'Tab',
            description:
              '동일 맥락의 콘텐츠를 탭 단위로 전환하는 컴포넌트입니다. Primary/Secondary 변형과 키보드 이동을 지원합니다.',
            codeFile: 'Tab.tsx',
            language: 'typescript',
            demoPath: 'Tab',
          },
          {
            title: 'Toggle',
            description:
              'ON/OFF 같은 이진 상태를 전환하는 스위치 컴포넌트입니다. 테마·옵션 활성화처럼 즉시 상태 변경이 필요한 곳에 사용합니다.',
            codeFile: 'Toggle.tsx',
            language: 'typescript',
            demoPath: 'Toggle',
          },
          {
            title: 'Tooltip',
            description:
              '요소 근처에 짧은 보조 정보를 표시하는 오버레이 컴포넌트입니다. 본문을 대체하기보다 맥락 힌트를 보완할 때 사용합니다.',
            codeFile: 'Tooltip.tsx',
            language: 'typescript',
            demoPath: 'Tooltip',
          },
        ],
      },
    },
    {
      type: 'custom',
      label: '스토리북',
      order: 5,
      payload: {
        videos: [
          {
            path: '/assets/videos/storybook-theme-toggle.mp4',
            width: 1866,
            height: 912,
            thumbnail: '/assets/images/storybook-dark.png',
            title: 'Storybook 테마 전환',
            description:
              'Storybook 상단 패널에서 배경색 변경을 통해 라이트/다크 모드를 전환할 수 있습니다.',
          },
        ],
        storybookUrl: EXTERNAL_LINKS.storybook,
        description:
          'Storybook을 통해 컴포넌트를 인터랙티브하게 탐색하고 테스트할 수 있습니다.',
      },
    },
  ],
};
