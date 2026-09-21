import type { HeroFact, Metric, Principle, SiteInfo } from './types';

export const SITE: SiteInfo = {
  role: '프론트엔드 개발자',
  title: '프론트엔드 개발자 포트폴리오',
  description:
    '체감 성능과 유지보수 구조를 함께 개선하는 프론트엔드 개발자의 포트폴리오입니다. 웹뷰 전환, 이미지 업로드 최적화, 공통 UI 모듈화 사례를 소개합니다.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://text-indent9999px.vercel.app',
  email: 'namyoung1013@gmail.com',
  github: 'https://github.com/text-indent9999px',
  indexable: false,
  resumeDownload: false,
  totalCareer: '3년 10개월',
};

export const HERO = {
  eyebrow: 'Front-end Developer',
  /** 줄 단위로 끊어 의도한 위치에서만 줄바꿈한다. mark는 형광펜 강조. */
  headline: [
    [{ text: '사용자가 체감하는 성능과' }],
    [{ text: '팀이 오래 쓰는 구조', mark: true }, { text: '를' }],
    [{ text: '함께 만듭니다.' }],
  ],
  description:
    '웹뷰 전환, 이미지 업로드 최적화, 공통 UI 모듈화까지. 실서비스에서 불편의 원인을 찾고, 수치로 확인하며 개선해 온 프론트엔드 개발자입니다.',
} satisfies {
  eyebrow: string;
  headline: { text: string; mark?: boolean }[][];
  description: string;
};

export const HERO_FACTS: HeroFact[] = [
  { value: SITE.totalCareer, label: '실무 경력' },
  { value: '3개 팀', label: '자체 서비스 · 웹에이전시' },
  { value: 'React · Next.js', label: '주력 스택' },
];

/** 경험의 규모. 대략적인 수치라 '+'로 표기한다. */
export const METRICS: Metric[] = [
  {
    value: '20+',
    unit: '개',
    label: '신규 구축·전면 리뉴얼 사이트',
    context:
      '자사몰과 브랜드 사이트를 처음부터 구축하거나 전면 개편한 프로젝트 수입니다.',
    source: '이너뷰 · 오감코퍼레이션',
  },
  {
    value: '40+',
    unit: '개',
    label: '유지보수·부분 개편까지 참여한 사이트',
    context:
      '운영 중인 사이트의 유지보수, 부분 개편, 기능 추가까지 포함해 참여한 사이트 수입니다.',
    source: '이너뷰 · 오감코퍼레이션',
  },
];

export const PRINCIPLES: Principle[] = [
  {
    title: '사용자가 실제로 느끼는 경험',
    description:
      '화면이 동작하는 것에서 멈추지 않고, 모바일 인터랙션·체감 성능·화면 전환처럼 작은 불편도 직접 검증하며 줄여 왔습니다.',
  },
  {
    title: '일정과 유지보수 비용까지 보는 판단',
    description:
      '더 많은 기능보다 팀의 생산성과 오래 유지되는 구조를 우선합니다. 기술적 완성도와 현실적 제약 사이에서 균형을 잡습니다.',
  },
  {
    title: '문서로 남기는 설계 의도',
    description:
      '모듈 경계와 아키텍처 가이드를 문서화해 새 팀원의 온보딩 시간과 인지 부담을 줄이는 데 힘써 왔습니다.',
  },
];

export const ABOUT_INTRO = [
  '프론트엔드 개발에서 가장 중요하게 생각하는 것은 사용자가 실제로 느끼는 경험입니다.',
  '에이전시와 자체 서비스 환경에서 프로젝트를 독립적으로 맡으며, 화면이 동작하는 데서 그치지 않고 더 자연스럽고 편한 경험을 만들기 위해 고민해 왔습니다.',
  '앞으로도 사용자 경험을 중심에 두되, 팀과 서비스 전체의 관점까지 고려하며 오래 유지될 수 있는 제품을 만드는 개발자로 성장하고 싶습니다.',
];

export const CONTACT = {
  headline: '더 나은 경험, 더 깔끔한 코드.',
  description: '함께 만들어갈 기회를 기다리고 있습니다. 편하게 연락 주세요.',
} as const;

export interface NavItem {
  id: string;
  label: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];
