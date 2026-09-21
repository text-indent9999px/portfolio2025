import type { Project } from '../types';

export const viewTransition: Project = {
  slug: 'view-transition',
  title: 'View Transition 기반 내비게이션',
  summary:
    'React의 실험적 ViewTransition을 적용해 페이지 이동의 단절감을 줄이고, 웹에서도 앱처럼 이어지는 화면 전환을 구현했습니다.',
  category: 'UX Engineering',
  status: 'live',
  role: '1인 개발 (리서치 · 설계 · 구현)',
  stack: ['React', 'Next.js', 'TypeScript', 'CSS Animations'],
  tags: ['View Transition', '페이지 전환', 'Transition Hook', 'UX'],
  art: 'transition',
  accent: 'sand',
  background: [
    '네이티브 앱을 웹뷰 구조로 전환하는 프로젝트를 진행하면서, 페이지가 바뀔 때 화면이 툭툭 끊기고 깜빡이는 시각적 단절감이 사용자 경험을 해치는 요인임을 알게 됐습니다.',
    '브라우저 기본 기능만으로 앱 수준의 연속적인 화면 전환을 제공할 방법을 고민했고, 당시 실험적 기능이던 View Transition API로 라우팅 전환 모션과 클릭 피드백 타이밍이 맞물리는 내비게이션 시스템을 연구·구현했습니다.',
  ],
  features: [
    'View Transition API와 React useTransition을 결합한 페이지 전환 애니메이션',
    'navigateForward / navigateBack / navigateForwardAction 커스텀 내비게이션 훅 설계',
    '전환 상태 관리와 중복 이동 방지(isNavigatingRef)',
    '클릭 피드백(리플) 완료 시점과 전환을 동기화해 체감 대기 흐름을 조율',
    '전환 타입(nav-forward, nav-back)에 따른 시각 효과 분리',
  ],
  challenges: [
    {
      problem: '기존 라우팅에서 화면 깜빡임과 전환 단절감이 발생',
      solution:
        'View Transition API의 DOM 스냅샷 방식으로 라우팅 이동 사이의 화면을 시각적으로 이어 붙였습니다.',
    },
    {
      problem: '라우터 구조상 전환 제어가 라우팅 단위에 머무름',
      solution:
        'Next.js Router를 감싸 useTransitionNavigation 훅을 구현하고, 전환 제어를 컴포넌트 단위까지 확장했습니다.',
    },
    {
      problem: '전환 도중 중복 클릭으로 이중 내비게이션이 발생',
      solution:
        'isNavigatingRef 플래그로 상태를 잠그고, resetNavigationFlag로 프레임 단위로 안전하게 해제했습니다.',
    },
    {
      problem: '클릭 피드백 애니메이션과 페이지 전환 타이밍이 어긋남',
      solution:
        'waitForRipple() 유틸로 애니메이션 완료를 감지한 뒤 전환을 수행해 이동 타이밍을 맞췄습니다.',
    },
    {
      problem: 'View Transition의 브라우저 지원이 불안정',
      solution: '지원 여부를 감지해 미지원 환경에서는 일반 router.push()로 폴백합니다.',
    },
  ],
  videos: [
    {
      path: '/assets/videos/view-transition-page.mp4',
      title: '페이지 전환',
      description: '페이지 간 이동 시 View Transition API로 이어지는 전환 효과',
      width: 1866,
      height: 912,
      thumbnail: '/assets/images/port-dark.png',
    },
    {
      path: '/assets/videos/view-transition-detail.mp4',
      title: '리스트 → 상세 전환',
      description: '리스트에서 상세로 이동하고 돌아올 때의 전환 효과',
      width: 1866,
      height: 912,
      thumbnail: '/assets/images/project-light.png',
    },
  ],
  mediaNote: '시연 영상은 사이트 리뉴얼 이전 버전에서 녹화한 화면입니다.',
  code: [
    {
      title: '전환 내비게이션 훅',
      description: 'ViewTransition과 커스텀 useRouter 훅으로 페이지 전환 애니메이션을 구현했습니다.',
      file: 'router.ts',
      language: 'typescript',
    },
    {
      title: '전환 타이밍 유틸',
      description: '리플 완료 대기(waitForRipple)와 실제 내비게이션(performNavigation)을 분리해 타이밍을 안정적으로 제어합니다.',
      file: 'router.utils.ts',
      language: 'typescript',
    },
    {
      title: '내비게이션 상태 컨텍스트',
      description: '커스텀 히스토리와 전환 상태를 전역에서 관리해 back/forward 동작과 전환 상태를 일관되게 유지합니다.',
      file: 'NavigationContext.tsx',
      language: 'typescript',
    },
    {
      title: 'ViewTransition 호환 래퍼',
      description: '브라우저 지원 여부를 감지해 View Transition과 폴백 렌더링을 호환 레이어에서 처리합니다.',
      file: 'ViewTransitionCompat.tsx',
      language: 'typescript',
    },
  ],
};
