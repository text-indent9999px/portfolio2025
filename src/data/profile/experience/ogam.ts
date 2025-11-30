import type {
  ExperienceItem,
  ProjectItem,
} from '../../../components/pages/Profile/types';

export const ogamExperience: ExperienceItem = {
  id: '2',
  period: '2023.04 - 2023.07 (4개월)',
  title: '오감코퍼레이션',
  position: '프론트엔드 개발자',
  company: '오감코퍼레이션',
  companyType: 'web-agency',
  description:
    '다양한 브랜드의 자사몰 및 웹사이트 구축을 담당하며, 사용자 경험 개선과 성능 최적화에 기여했습니다. 컴포넌트 기반 개발과 모듈화를 통해 개발 효율성을 향상시켰습니다.',
  skills: ['React', 'JavaScript', 'jQuery', 'CAFE24', 'E-commerce'],
  type: 'work',
  projects: [
    {
      id: '2-1',
      period: '2023.01 - 2023.07',
      title: '수영복 브랜드 자사몰 신규 구축',
      description: `수영복 브랜드 자사몰에서 카테고리별 상품 노출 및 다양한 형태의 기획전 카테고리를 개발했습니다. 스마트픽업 재고 조회와 무한 스크롤 기능을 구현해 쇼핑 편의성과 사용자 경험을 향상시켰습니다.`,
      tags: ['신규구축', '스마트픽업', '재고조회', '무한스크롤'],
    },
    {
      id: '2-2',
      period: '2023.04 - 2023.06',
      title: '다중 브랜드 통합 관리 시스템 구축',
      description: `식음료 계열 다중 브랜드 자사몰 리뉴얼을 담당하며 공통 영역 컴포넌트화와 메뉴 자동 호출 구조로 개발 효율을 높였습니다. 그룹오더 주문 게시판과 상품 타입별 리스트 UI를 구현해 다양한 브랜드 특성을 반영했습니다.`,
      tags: ['다중브랜드몰', '자동메뉴호출', '그룹오더'],
    },
    {
      id: '2-3',
      period: '2023.03 - 2023.07',
      title: 'SI/SM 기업 사이트 리뉴얼',
      description: `기업 홈페이지를 구축하며 통일된 메뉴 데이터 기반의 자동 호출 시스템을 구현하고, fetch API를 활용해 공통 마크업을 동적으로 출력했습니다. 프로젝트 리스트를 데이터 기반으로 로딩되도록 개발해 유지보수 효율성을 높였습니다.`,
      tags: ['사이트리뉴얼', 'FetchAPI'],
    },
  ] as ProjectItem[],
};
