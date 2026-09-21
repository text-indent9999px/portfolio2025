import type { Project } from '../types';

export const beMyMoney: Project = {
  slug: 'be-my-money',
  title: '실시간 가상 자산 분석 시뮬레이터',
  summary:
    'pnpm 모노레포에서 Recharts 렌더링 최적화, Drizzle ORM, Next.js Middleware 인증까지 직접 설계한 1인 풀스택 대시보드입니다.',
  category: 'Full-stack · Monorepo',
  status: 'live',
  role: '1인 개발 (설계 · 개발 · 배포)',
  stack: ['Next.js', 'TypeScript', 'Recharts', 'TanStack Query', 'Drizzle ORM', 'pnpm'],
  tags: [
    '1인 개발',
    'AI 오케스트레이션',
    'pnpm Monorepo',
    'Recharts',
    'TanStack Query v5',
    'Drizzle ORM',
    'Upbit API',
  ],
  cover: {
    src: '/assets/projects/bemymoney/0.png',
    alt: '실시간 가상 자산 분석 시뮬레이터 첫 화면',
    position: 'top left',
  },
  accent: 'indigo',
  background: [
    '실시간 시계열 데이터(Upbit 코인 시세)를 차트로 시각화하면서, 빠르게 갱신되는 데이터에서도 브라우저 렌더링이 흔들리지 않도록 만드는 것이 출발점이었습니다.',
    'AI(LLM) 도구를 활용하되 설계와 검증의 주도권은 직접 쥐는 방식으로 pnpm 모노레포 기반 1인 풀스택 개발 생산성을 검증하고자 했습니다. 프론트엔드는 컴포넌트 설계와 데이터 흐름을 직접 통제했고, 백엔드·DB 영역은 API 응답 규격과 속도 지표로 병목을 진단해 AI에게 수정 방향을 피드백하며 개선했습니다.',
  ],
  features: [
    'Upbit OpenAPI 연동으로 가상 자산 실시간 캔들 시세 조회 및 분석',
    'Recharts 기반 시계열 시세 차트의 반응형 렌더링 최적화',
    'Next.js Middleware와 쿠키 기반 관리자 인증(SHA-256 해시 비교) 구현',
    'Drizzle ORM 스키마 설계와 마이그레이션 관리',
    'pnpm Workspaces·Turborepo 모노레포 설계 (apps/web, apps/worker, packages/db, packages/shared)',
  ],
  challenges: [
    {
      problem: '종목(Symbol) 전환 시 비동기 데이터 패칭에서 발생하는 경쟁 상태(Race Condition)',
      solution:
        'fetch를 수행하는 useEffect 안에 ignore 클린업 플래그 패턴을 적용해, 이전 요청이 뒤늦게 끝나도 렌더링 콜백이 실행되지 않고 컴포넌트 해제 시 메모리 누수도 생기지 않도록 했습니다.',
    },
    {
      problem: '1인 개발 환경에서 관리자 설정 페이지(/settings, /api/settings)가 노출될 위험',
      solution:
        'Next.js Middleware에서 환경변수 비밀번호의 해시값을 쿠키와 대조하는 라우트 가드를 구축했습니다. 미인증 접근은 /login으로 리다이렉트하고 API는 401을 반환합니다.',
    },
    {
      problem: '여러 앱과 패키지(Web, Worker, Shared)에 걸친 중복 코드와 유지보수 혼선',
      solution:
        'pnpm Workspaces 모노레포로 전환하고, 공통 계산식은 @bemymoney/shared, DB 스키마는 @bemymoney/db로 분리해 의존성 경계와 재사용성을 확보했습니다.',
    },
    {
      problem: '실시간 데이터 갱신 때마다 리렌더링이 반복되어 차트가 버벅이는 문제',
      solution:
        '차트 영역을 독립 컴포넌트(CoinReturnChart 등)로 격리하고 메모이제이션과 디바운싱으로 업데이트를 조율해 렌더링 부하를 줄였습니다.',
    },
  ],
  images: [
    {
      path: '/assets/projects/bemymoney/0.png',
      title: '서비스 첫 화면',
      description: '실시간 Upbit 시세 캔들 차트와 시뮬레이션 대시보드',
      width: 1866,
      height: 947,
    },
  ],
  links: [{ label: '배포 사이트 보기', href: 'https://bemymoney.onrender.com/' }],
};
