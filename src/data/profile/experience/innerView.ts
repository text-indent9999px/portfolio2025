import type {
  ExperienceItem,
  ProjectItem,
} from '../../../components/pages/Profile/types';

export const innerViewExperience: ExperienceItem = {
  id: '3',
  period: '2020.09 - 2022.11 (2년 3개월)',
  title: '이너뷰',
  position: '웹퍼블리셔/프론트엔드 개발자',
  company: '이너뷰',
  companyType: 'web-agency',
  description:
    '다양한 브랜드의 자사몰 구축 및 리뉴얼을 담당하며, 사용자 경험 개선과 개발 효율성 향상에 기여했습니다. 컴포넌트 기반 개발과 UI/UX 최적화를 통해 비즈니스 성과를 창출했습니다.',
  skills: ['React', 'JavaScript', 'jQuery', 'CAFE24', 'E-commerce'],
  type: 'work',
  projects: [
    {
      id: '3-1',
      period: '2021.10 - 2022.10',
      title: '다중 브랜드 자사몰 신규 구축 및 유지보수',
      description: `다중 브랜드 자사몰(셀프네일, 헤어케어, 매트리스)을 구축·운영하며 메뉴 호출 통일, 상품 옵션·재고 연동 개선, 재입고 알림 Admin 개발로 효율성과 사용자 경험을 향상시켰습니다.`,
      tags: ['다중브랜드몰', '재고연동', '신규구축', '유지보수'],
    },
    {
      id: '3-2',
      period: '2021.12 - 2022.06',
      title: '헤어케어 브랜드 자사몰 리뉴얼',
      description: `헤어케어 브랜드 자사몰 리뉴얼을 담당하며 메뉴 호출 방식을 통일해 효율성을 높이고, 브랜드 아이덴티티에 맞춘 커스텀 select UI와 다크모드 대응 스타일링을 구현했습니다.`,
      tags: ['자사몰리뉴얼', '다크모드'],
    },
    {
      id: '3-3',
      period: '2021.05 - 2021.09',
      title: '셀프네일 브랜드 자사몰 리뉴얼',
      description: `셀프네일 브랜드 자사몰 리뉴얼을 담당하며 주요 페이지 프론트엔드 개발과 해시태그 필터, 카테고리별 상품 노출 컴포넌트를 구현해 브랜드 특성을 반영한 쇼핑 경험을 제공했습니다.`,
      tags: ['자사몰리뉴얼', '해시태그필터', '카테고리별상품노출'],
    },
    {
      id: '3-4',
      period: '2021.04 - 2021.07',
      title: '스포츠 애슬레저 브랜드 자사몰 리뉴얼 및 유지보수',
      description: `자사몰 리뉴얼과 유지보수를 담당하며 메뉴 호출 방식을 통일하고, 상품 옵션을 이미지 기반 UI로 개선해 사용자 경험을 향상시켰습니다. 주요 쇼핑 플로우 페이지를 개발하여 전체 구매 과정을 최적화했습니다.`,
      tags: ['자사몰리뉴얼', '상품옵션UI개선', '쇼핑플로우최적화'],
    },
  ] as ProjectItem[],
};
