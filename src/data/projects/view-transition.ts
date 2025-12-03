import { ProjectDetail } from '../../components/pages/Projects/types/project-tabs';

export const viewTransitionProject: ProjectDetail = {
  meta: {
    id: 'view-transition',
    title: 'React View Transition 기반 내비게이션 시스템',
    description: `웹 페이지 전환은 일반적으로 DOM이 한 번에 바뀌기 때문에 순간적으로 단절감을 느끼기 쉽습니다. 
    반면 모바일 앱은 스와이프, 페이드 등 다양한 전환 효과를 활용해 페이지 이동 과정을 직관적으로 보여주고, 사용자가 흐름을 끊김 없이 경험할 수 있도록 합니다. 
    
    이런 모바일 앱의 부드러운 전환을 웹에서도 구현하고자, 
    React의 실험적 기능인 ViewTransition API를 적용해보았습니다. 
    라우터 이동 시 애니메이션이 적용될 수 있도록 커스텀한 useRouter 훅을 설계하고,
    커서 인터랙션(ripple 이펙트, Desktop 환경에서 확인 가능) 완료 시점 동기화로 자연스러운 체감 이동을 구현하였습니다.

    페이지 전환은 다음과 같은 방식으로 구현하여, 
    웹에서도 이동 과정에서 느껴지는 단절감을 최소화하고, 연속적인 경험을 제공하도록 했습니다. 

1. 새 페이지로 이동할 때와 이전 페이지로 돌아갈 때 애니메이션의 전환 방향을 다르게 변경
2. 리스트 페이지와 디테일 페이지 간 공통 요소를 활용한 자연스러운 전환

아직 실험 단계라 일부 환경에서는 제약이 있지만, UX 측면에서는 향후 웹 페이지 전환의 중요한 요소로 자리잡을 것으로 생각하여 적용해보았습니다.`,
    tags: [
      'UX전환',
      'ViewTransition',
      'TransitionHook',
      'React',
      'Next.js',
      'TypeScript',
      'CSS Animations',
    ],
    summary: `React의 실험적 기능인 ViewTransition API를 적용해 페이지 이동 시 발생하는 단절감을 최소화했습니다.
전환 흐름을 브라우저 레벨에서 제어해, 웹에서도 앱처럼 자연스러운 전환 경험을 제공합니다.`,
  },

  tabs: [
    {
      type: 'demo',
      label: '데모',
      order: 0,
      payload: {
        description:
          'View Transition API를 활용한 페이지 전환 데모입니다.\n리스트에서 디테일로 이동하거나 뒤로가기를 할 때 부드러운 전환 효과를 확인할 수 있습니다.',
        videos: [
          {
            path: '/assets/videos/view-transition-page.mp4',
            width: 1866,
            height: 912,
            thumbnail: '/assets/images/port-dark.png',
            title: '페이지 전환',
            description:
              '페이지 간 이동 시 View Transition API를 통한 자연스러운 전환 효과',
          },
          {
            path: '/assets/videos/view-transition-detail.mp4',
            width: 1866,
            height: 912,
            thumbnail: '/assets/images/project-light.png',
            title: '디테일 페이지 전환',
            description:
              '리스트-디테일 페이지 간 이동 시 View Transition API를 통한 자연스러운 전환 효과',
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
          'View Transition API + React useTransition 결합으로 부드러운 전환 구현',
          'navigateForward / navigateBack / navigateForwardAction 커스텀 훅 설계',
          '전환 상태 관리 및 중복 이동 방지(isNavigatingRef)',
          '커서 인터랙션(ripple) 완료 시점 동기화로 자연스러운 체감 이동',
          '전환 타입(nav-forward, nav-back)에 따른 시각적 효과 분리',
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
            challenge: '기존 라우팅 시 화면 깜빡임 및 전환 단절감 발생',
            solution:
              'View Transition API의 DOM Snapshot 전환을 적용하여 페이지 이동 간의 시각적 연속성 확보',
          },
          {
            challenge:
              'React Router 구조상 전환 흐름 제어가 라우팅 단위에 제한됨',
            solution:
              'Next.js Router를 커스터마이징하고 useTransitionNavigation 훅을 구현해 전환 제어를 컴포넌트 레벨로 확장',
          },
          {
            challenge: '전환 도중 중복 클릭으로 인한 이중 내비게이션 발생 이슈',
            solution:
              'isNavigatingRef 플래그로 상태를 잠그고 resetNavigationFlag를 통해 프레임 단위로 안전하게 해제',
          },
          {
            challenge:
              '커서 인터랙션(리플 효과)과 페이지 전환이 타이밍 불일치로 충돌',
            solution:
              'waitForRipple() 유틸로 커서 애니메이션 완료 시점 감지 후 전환 수행하여 체감 흐름 자연스럽게 동기화',
          },
          {
            challenge: 'View Transition의 브라우저 지원 불안정성',
            solution:
              '지원 여부를 감지하여 미지원 환경에서는 일반 router.push()로 폴백',
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
            title: 'router.ts',
            description:
              'ViewTransition 컴포넌트 및 커스텀한 useRouter 훅을 사용하여 페이지 전환 시 부드러운 애니메이션을 구현했습니다.',
            codeFile: 'router.ts',
            language: 'typescript',
          },
        ],
      },
    },
  ],
};
