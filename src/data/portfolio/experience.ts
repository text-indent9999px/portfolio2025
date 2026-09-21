import type { Career } from './types';

/** 최신 경력이 먼저 온다. 각 성과는 문제 → 행동 → 결과 순서로 작성한다. */
export const CAREERS: Career[] = [
  {
    id: 'weddingbook',
    company: '웨딩북',
    companyType: '자체 서비스',
    role: '프론트엔드 개발자',
    period: '2024.04 – 2025.06',
    duration: '1년 3개월',
    summary:
      '네이티브 앱을 웹뷰로 전환하는 과정에서 인증 구조, 업로드 성능, 공통 UI 모듈화를 맡았습니다.',
    stack: ['React', 'Next.js', 'TypeScript', 'Webview', 'React Query'],
    achievements: [
      {
        id: 'wb-image-upload',
        title: '이미지 선압축으로 업로드 대기 시간 50–70% 개선',
        problem:
          '웨딩 사진 특성상 5MB 이상 원본 업로드가 많아 전송 속도가 느려지고 서버 스토리지가 낭비됐습니다.',
        action:
          'Canvas API와 리사이징 라이브러리로 브라우저에서 화질 저하를 최소화하며 1MB 미만으로 먼저 압축한 뒤 업로드하도록 구현했습니다.',
        result:
          '업로드 대기 속도를 50–70% 개선하고 서버 부하와 스토리지 낭비를 줄였습니다.',
        tags: ['Canvas API', '이미지 최적화'],
      },
      {
        id: 'wb-webview-auth',
        title: '네이티브 로그인·회원가입을 웹뷰로 통합, 소셜 로그인 3종 연동',
        problem:
          '로그인·회원가입 흐름이 네이티브 기반으로 파편화돼 있어 하나의 구조로 통합해야 했습니다.',
        action:
          '통합 웹뷰 구조로 전환하고 네이버·카카오·애플 소셜 로그인(OAuth)을 연동했습니다.',
        result: '3사 소셜 로그인을 안정적으로 안착시켰습니다.',
        tags: ['웹뷰 전환', 'OAuth 2.0', 'Next.js'],
      },
      {
        id: 'wb-token',
        title: '세션 조기 만료 해결 — 토큰 자동 갱신 구조',
        problem:
          '클라이언트와 서버의 갱신 로직이 어긋나 로그인 세션이 조기에 만료됐습니다.',
        action:
          'Next.js 서버 컴포넌트와 React Query를 결합해 세션 동기화와 자동 토큰 갱신 구조로 개선했습니다.',
        result: '세션 동기화와 자동 토큰 갱신 아키텍처를 확립했습니다.',
        tags: ['서버 컴포넌트', 'React Query'],
      },
      {
        id: 'wb-broadcast',
        title: 'Broadcast Channel로 멀티 탭 상태 동기화',
        problem:
          '웹뷰 탭 구조에서 여러 화면이 동시에 API를 중복 호출하고 데이터가 서로 어긋났습니다.',
        action: 'Broadcast Channel API를 적용해 탭 간 상태를 동기화했습니다.',
        result: '중복 호출을 대폭 줄이고 화면 간 데이터 일관성을 확보했습니다.',
        tags: ['Broadcast Channel API', '상태 동기화'],
      },
      {
        id: 'wb-perf',
        title: '이미지 로딩 병목과 체감 성능 개선',
        problem:
          '이미지 렌더링이 병목이었고, 응답이 느린 구간에서는 화면이 멈춘 것처럼 보였습니다.',
        action:
          '이미지 프록시, 뷰포트 진입 시점 Lazy Load, 브라우저 캐싱 전략을 연결하고 응답이 느린 영역에 Skeleton UI를 배치했습니다.',
        result:
          '느린 응답 구간에서도 끊김 없이 이어지는 화면 전환 경험을 제공했습니다.',
        tags: ['Lazy Loading', 'Skeleton UI', '캐싱'],
      },
      {
        id: 'wb-submodule',
        title: 'Git Submodule 기반 공통 UI 패키지 구축',
        problem:
          '프로젝트마다 UI 일관성이 떨어지고 소스 복사·붙여넣기가 반복됐습니다.',
        action:
          '공통 UI 컴포넌트를 별도 패키지로 분리하고 Git Submodule로 여러 프로젝트에 공유했습니다.',
        result:
          '같은 컴포넌트를 여러 프로젝트에서 재사용하며 개발 생산성을 높였습니다.',
        tags: ['Git Submodule', '모듈화'],
      },
      {
        id: 'wb-registry',
        title: '레지스트리(온라인 청첩장) 서비스 신규 론칭',
        problem:
          '마이페이지와 업체 리뷰·포토 영역의 리뉴얼, 그리고 새로운 온라인 청첩장 서비스가 필요했습니다.',
        action:
          '웹뷰 리뉴얼을 주도하고 청첩장 제작 에디터와 위시리스트 카카오톡 실시간 공유 기능을 구현했습니다.',
        result:
          '신규 레지스트리 서비스를 론칭해 비즈니스 성과를 뒷받침했습니다.',
        tags: ['에디터', '카카오톡 공유'],
      },
      {
        id: 'wb-docs',
        title: '레거시 단순화와 기술 문서화',
        problem:
          '복잡하게 얽힌 레거시 코드가 팀의 온보딩과 변경 속도를 늦췄습니다.',
        action:
          '코드를 단순화하고 모듈 경계를 정의했으며, 설계 의도와 아키텍처 가이드를 문서로 남겼습니다.',
        result: '팀 온보딩 시간과 인지 부담을 줄였습니다.',
        tags: ['리팩토링', '기술 문서화'],
      },
    ],
  },
  {
    id: 'ogam',
    company: '오감코퍼레이션',
    companyType: '웹에이전시',
    role: '프론트엔드 개발자',
    period: '2023.04 – 2023.07',
    duration: '4개월',
    summary:
      '패션·식음료 브랜드의 자사몰을 신규 구축·리뉴얼하며 성능 최적화와 브랜드 간 재사용 구조를 설계했습니다.',
    stack: ['React', 'JavaScript', 'jQuery', 'CAFE24', 'E-commerce'],
    engagements: [
      {
        id: 'og-arena',
        title: '수영복 브랜드 아레나코리아 자사몰 신규 구축',
        period: '2023.04 – 2023.07',
        sites: [
          {
            name: '아레나코리아',
            note: '이후 개편되어 당시 화면은 남아 있지 않음',
          },
        ],
        highlights: [
          '카테고리별 상품 노출 로직과 다양한 형태의 기획전 카테고리 개발',
          '스마트픽업 재고 조회 기능을 구현해 지역·매장별 재고 확인 경험 개선',
          '무한 스크롤 기반 상품 로딩 구조를 구축해 쇼핑 흐름과 편의성 향상',
          '카페24 플랫폼 전환에 따른 데이터 이관 수행',
        ],
        achievements: [
          {
            id: 'og-infinite',
            title: '무한 스크롤·이미지 지연 로딩으로 초기 로딩 40% 이상 단축',
            problem:
              '고화질 상품이 늘면서 초기 렌더링 부하가 커지고 스크롤 중 화면이 끊겼습니다.',
            action:
              'Intersection Observer 기반 무한 스크롤을 도입하고 이미지 지연 로딩(Lazy Loading)을 함께 적용했습니다.',
            result:
              '초기 로딩 시간을 40% 이상 단축하고 레이아웃 시프트(CLS)를 없앴습니다.',
            tags: ['Intersection Observer', 'Lazy Loading', 'CLS'],
          },
          {
            id: 'og-smartpickup',
            title: '실시간 재고 연동 스마트픽업',
            problem:
              '온라인·오프라인 재고 동기화가 늦어, 스마트픽업을 신청해도 매장에서 수령하지 못하는 재고 정합성 이슈가 있었습니다.',
            action:
              '주기적 동기화 대신 스마트픽업 단계에서 실시간 재고 조회 API를 호출하도록 설계했습니다.',
            result: '재고 정합성 문제를 원천적으로 개선했습니다.',
            tags: ['스마트픽업', '재고 정합성'],
          },
        ],
      },
      {
        id: 'og-spc',
        title: 'SPC 식음료 다중 브랜드 자사몰 통합 리뉴얼',
        period: '2023.04 – 2023.06',
        sites: [
          { name: '리나스', url: 'https://www.linaskorea.com' },
          { name: '파리크라상', url: 'https://pariscroissantorder.com' },
          { name: '파리크라상 상품권', url: 'https://parisgift.co.kr' },
          { name: '패션5', url: 'https://패션5.com' },
        ],
        highlights: [
          '식음료 계열 4개 브랜드 자사몰 리뉴얼 담당',
          '공통 영역을 컴포넌트화해 브랜드 간 중복 로직을 제거하고 개발 효율 향상',
          '메뉴 자동 호출 구조를 설계해 브랜드별 메뉴 변경·확장에 유연하게 대응',
          '그룹오더 주문 게시판과 상품 타입별 리스트 UI를 구현해 브랜드 특성 반영',
        ],
        achievements: [
          {
            id: 'og-multibrand',
            title: '다중 브랜드 공통 컴포넌트화로 재사용률 70% 이상',
            problem:
              '여러 식음료 브랜드 자사몰을 독립 운영하면서 마크업 중복과 중복 배포로 개발 공수가 과도했습니다.',
            action:
              '공통 헤더·푸터·레이아웃을 컴포넌트화하고 브랜드별 메뉴를 데이터 기반으로 자동 호출하는 구조로 통합했습니다.',
            result:
              '신규 브랜드 자사몰 론칭 소요 시간을 줄이고 코드 재사용률 70% 이상을 달성했습니다.',
            tags: ['공통 컴포넌트', '메뉴 자동 호출', '생산성'],
          },
        ],
      },
    ],
  },
  {
    id: 'innerview',
    company: '이너뷰',
    companyType: '웹에이전시',
    role: '웹퍼블리셔 / 프론트엔드 개발자',
    period: '2020.09 – 2022.11',
    duration: '2년 3개월',
    summary:
      '다중 브랜드 자사몰의 구축·리뉴얼을 수행하며 재사용 가능한 UI 구조, 구매 흐름 UX, 성능 최적화를 담당했습니다.',
    stack: ['React', 'JavaScript', 'jQuery', 'CAFE24', 'E-commerce'],
    engagements: [
      {
        id: 'iv-andar',
        title: '스포츠 애슬레저 브랜드 안다르 자사몰 리뉴얼·유지보수',
        period: '2021.04 – 2021.07',
        sites: [{ name: '안다르', url: 'https://andar.co.kr' }],
        highlights: [
          '메뉴 호출 방식을 통일하고 상품 옵션을 이미지 기반 UI로 개선해 사용자 경험 향상',
          '주요 쇼핑 플로우 페이지를 개발해 구매 과정 전반 최적화',
          '공통 구조 설계와 UI/UX 개선으로 다중 브랜드 환경에서도 일관된 서비스 경험 제공',
        ],
        achievements: [
          {
            id: 'iv-funnel',
            title: '시각형 옵션 UI로 모바일 구매 퍼널 개선',
            problem:
              '텍스트 드롭다운 옵션은 모바일에서 터치 오동작이 잦고 컬러를 직관적으로 확인하기 어려웠습니다.',
            action:
              'Color Chip·Size Box 형태의 시각형 UI로 개편하고 장바구니에서 결제까지의 레이아웃을 단순화했습니다.',
            result: '모바일 구매 퍼널의 이탈률을 낮췄습니다.',
            tags: ['Color Chip UI', '모바일 최적화'],
          },
        ],
      },
      {
        id: 'iv-ohora',
        title: '셀프네일 브랜드 오호라 자사몰 리뉴얼',
        period: '2021.05 – 2021.09',
        sites: [
          {
            name: '오호라',
            note: '이후 개편되어 당시 화면은 남아 있지 않음',
          },
        ],
        highlights: [
          '주요 페이지 프론트엔드 개발, 해시태그 필터와 카테고리별 상품 노출 컴포넌트 구현',
          '재사용 가능한 컴포넌트 구조로 유지보수성과 확장성 강화',
          '성능 최적화로 Lighthouse 성능 점수를 기존 20~30점대에서 평균 85점 이상으로 개선',
        ],
        achievements: [
          {
            id: 'iv-filter',
            title: '해시태그 다차원 상품 필터',
            problem:
              '디자인과 컬러 옵션이 많아 원하는 제품을 찾기 어려워 탐색 단계에서 이탈이 발생했습니다.',
            action:
              '제품 카테고리에 해시태그 메타데이터를 연결하고 여러 태그를 교차 검색하는 필터 컴포넌트를 구현했습니다.',
            result: '상품 탐색과 장바구니 전환 경험을 간소화했습니다.',
            tags: ['다차원 필터링', '상품 탐색 UX'],
          },
        ],
      },
      {
        id: 'iv-dailyco',
        title: '데일리앤코 브랜드 자사몰 신규 구축·유지보수',
        period: '2021.10 – 2022.10',
        sites: [
          { name: '티타드', url: 'https://titad.co.kr' },
          { name: '유리카', url: 'https://yurica.co.kr' },
          { name: '클럭', url: 'https://klug.kr' },
          { name: '몽제', url: 'https://mongze.kr' },
        ],
        highlights: [
          '메뉴 호출 방식을 통일하고 상품 옵션·재고 연동을 개선해 개발 효율과 사용자 경험 향상',
          '재입고 알림 신청 기능과 Admin 대시보드 개발',
          '여러 브랜드를 한 플랫폼에서 운영하며 공통 컴포넌트화와 재사용 가능한 구조 설계',
        ],
        achievements: [
          {
            id: 'iv-restock',
            title: '재입고 알림 신청 시스템과 백오피스 대시보드 구축',
            problem:
              '인기 상품이 품절된 채 입고가 늦어지면 품절 안내만 보고 잠재 구매자가 이탈했습니다.',
            action:
              '옵션별 품절 시 카카오톡·SMS로 재입고 알림을 신청하는 고객용 기능과, 신청 통계를 실시간 집계하는 어드민 대시보드를 구축했습니다.',
            result:
              'MD가 추가 공급 계획을 세우는 근거를 제공해 자사몰 매출에 기여했습니다.',
            tags: ['재입고 알림', '백오피스', 'Admin'],
          },
        ],
      },
      {
        id: 'iv-mediall',
        title: '헤어케어 브랜드 메디올 자사몰 리뉴얼',
        period: '2021.12 – 2022.06',
        sites: [{ name: '메디올', url: 'https://www.medi-all.co.kr' }],
        highlights: [
          '메뉴 호출 방식을 통일해 효율적인 구조 구현',
          '브랜드 아이덴티티에 맞춘 커스텀 select UI와 다크모드 대응 스타일링 적용',
        ],
        achievements: [
          {
            id: 'iv-custom-ui',
            title: '커스텀 UI·반응형·다크모드 대응',
            problem:
              '브라우저 기본 셀렉트 박스로는 브랜드 톤을 맞출 수 없었고, 복잡한 가입·주문 폼의 사용성도 낮았습니다.',
            action:
              '커스텀 드롭다운을 구축하고 반응형 레이아웃과 시스템 다크모드 미디어 쿼리를 도입했습니다.',
            result: '웹 표준성과 비주얼 완성도를 함께 높였습니다.',
            tags: ['커스텀 UI', '반응형', '다크모드'],
          },
        ],
      },
      {
        id: 'iv-others',
        title: '그 외 자사몰 리뉴얼·신규 제작',
        sites: [
          { name: '닥터그루트', url: 'https://drgroot.co.kr' },
          { name: '핑거수트', url: 'https://fingersuit.kr' },
          { name: '퍼셀', url: 'https://purcell.kr' },
        ],
        highlights: [
          '닥터그루트 자사몰 리뉴얼 참여',
          '핑거수트·퍼셀 자사몰 신규 제작 — 퍼블리싱과 프론트엔드 개발 담당',
        ],
      },
    ],
  },
];
