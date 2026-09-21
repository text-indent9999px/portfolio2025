import type { Project } from '../types';

export const saveOurWallet: Project = {
  slug: 'save-our-wallet',
  title: 'Save Our Wallet — 가족 공동 AI 가계부',
  summary:
    '결제 알림을 앱이 알아서 읽어 기록하고, 영수증과 음성은 AI가 먼저 정리해 주는 가족용 가계부입니다. 앱·네이티브·서버를 혼자 설계했고, 지금은 가족과 함께 써 보며 다듬는 단계입니다.',
  category: 'Mobile · Native · AI',
  status: 'wip',
  role: '1인 개발 (기획 · 설계 · 앱/네이티브/서버 개발)',
  period: '2026.06 – 진행 중',
  stack: [
    'React Native',
    'TypeScript',
    'Android (Java/Kotlin)',
    'SQLite',
    'Firebase',
    'Gemini API',
    'React · Vite (WebView UI)',
  ],
  tags: [
    '가족 사용 중',
    'React Native',
    'Android Native',
    'Gemini API',
    'Firebase',
    '클라이언트 측 암호화',
    '오프라인 우선',
  ],
  stats: [
    { value: '400+', label: '커밋 (약 3개월 개발)' },
    { value: '1,000+', label: '가맹점 딕셔너리 항목 (14개 업종)' },
    { value: '5단계', label: '예산 소진율에 따라 바뀌는 앱 테마' },
  ],
  cover: {
    src: '/assets/projects/saveourwallet/cover.png',
    alt: '가계부 앱의 스플래시, 대시보드, 타임라인 화면',
    position: 'top',
  },
  accent: 'gold',
  background: [
    '결제할 때마다 가계부를 여는 일은 금방 귀찮아집니다. 그래서 카드·페이 앱의 결제 알림과 문자를 앱이 스스로 읽어 기록 초안을 만들고, 사람은 확인만 하도록 설계했습니다. 영수증 촬영이나 음성 입력도 AI가 먼저 분석해 초안을 만들어 줍니다.',
    '가족이 함께 예산을 관리할 수 있도록 가구(household) 단위로 동기화하고, 서버가 내용을 알 수 없도록 민감한 필드는 기기에서 암호화합니다.',
    '구조는 세 갈래로 나눴습니다. 화면은 웹뷰의 React 앱이, 앱이 꺼져 있어도 돌아야 하는 알림 수집·파싱·동기화·알림 예약은 안드로이드 네이티브가, 화면 전환과 상태 관리는 React Native가 맡습니다. 같은 웹뷰 UI를 네이티브 브릿지만 모킹해 웹 데모로도 빌드할 수 있습니다.',
    '현재는 저와 가족만 사용하는 비공개 단계입니다. 출시 전에 채워야 할 부분도 정리해 두었습니다. 파서·병합·동기화 핵심 로직의 자동 테스트, 암호화 구현 점검(키 생성, 인증 암호화, 비밀번호 기반 키 파생), Firestore 보안 규칙의 저장소 관리입니다.',
  ],
  features: [
    '안드로이드 NotificationListenerService로 카드·간편결제·은행·커머스 앱의 결제 알림과 문자를 실시간 수집하고, 금액·일시·결제처·자산(카드)을 정규식 기반 추출기로 파싱',
    '14개 업종, 약 1,000개 가맹점(별칭·하위 브랜드 포함) 딕셔너리로 결제처를 정규화하고, PG·VAN·간편결제사가 결제처로 오인식되는 문제를 차단. 추출기는 기기 없이 JDK만으로 돌리는 회귀 테스트(실제 알림 코퍼스)로 검증',
    '알림 템플릿 캐시(HybridParser): 숫자를 가린 알림 형식을 최근 기록과 비교해 같은 형식이면 AI 호출 없이 분류를 재사용하고, 상품명만 바뀐 경우에는 경량 AI로 제목·분류만 보완',
    'Gemini 연동(영수증 이미지, 음성 입력, 알림 분류): Cloud Functions 프록시와 App Check(Play Integrity)로 API 키를 앱에 두지 않음',
    '서로 다른 앱의 알림 자동 병합(쇼핑앱 주문 알림 + 카드 승인 알림)과 수동 병합 위저드, 할부·정기결제 사전 등록과 실결제 매칭',
    '오프라인 우선 구조: SQLite 로컬 저장, Firestore와 워터마크 기반 델타 push/pull 동기화, 미동기화 변경과 삭제를 보호하는 충돌 규칙',
    '가족 그룹 동기화: 제목·결제처·원문 등 민감 필드를 AES-256으로 기기에서 암호화(서버는 평문을 모름)하고, 변경 신호는 무음 FCM으로 전달',
    '예산 소진율 5단계 테마(청정 → 침수 → 사막 → 용암 → 잿더미 지구): 스플래시·대시보드·앱 아이콘이 소진율에 따라 바뀜',
    '주간·월간 리포트(지난달 비교, 고정지출, 비필수 소비)와 WorkManager 기반 알림, 알림 탭 딥링크 진입',
  ],
  challenges: [
    {
      problem:
        '같은 알림이 중복 호출되거나, 메시지 앱이 같은 알림 ID를 갱신하는 바람에 서로 다른 문자가 "중복"으로 오인되어 정상 기록이 버려짐',
      solution:
        '알림 키(패키지·ID·태그)만 보던 중복 판정에 제목+본문 해시를 더해, 완전히 같은 내용이 10초 안에 다시 올 때만 걸러내도록 바꿨습니다.',
    },
    {
      problem:
        '쇼핑앱 알림에는 금액이 없고 카드 승인 알림에는 품목이 없어, 같은 결제가 기록 두 건으로 갈라짐',
      solution:
        '금액이 없는 알림을 잠깐 대기시켰다가 짝이 되는 결제 알림과 합칩니다. 대기 중인 알림은 디스크에 남기지 않고 시간이 지나면 폐기하며, 이종 앱 자동 병합과 같은 시간 창을 써서 두 곳의 판단 기준이 어긋나지 않게 했습니다.',
    },
    {
      problem:
        'AI 호출을 줄이려고 만든 템플릿 캐시가, 병합 기록의 뒤쪽 조각과 우연히 모양이 같은 무관한 알림에 엉뚱한 제목을 붙임',
      solution:
        '병합 기록은 항상 첫 조각만 템플릿 비교 대상으로 삼고, 템플릿이 같아도 가맹점 딕셔너리 기준으로 같은 곳일 때만 결제처를 재사용하도록 제한했습니다.',
    },
    {
      problem:
        '네이티브가 SQLite에 직접 저장한 기록은 React Native 스토어를 거치지 않아, 앱이 켜져 있어도 화면에 나타나지 않음',
      solution:
        '저장 직후 네이티브 이벤트(NEW_PENDING_RECORD)로 즉시 다시 불러오고, 브릿지 전달이 불안정한 경우를 대비해 포그라운드 8초 폴링을 안전망으로 두었습니다. 로컬 SQLite 조회만이라 네트워크 비용은 없습니다.',
    },
    {
      problem:
        '서버가 기록 내용을 모르는 구조(클라이언트 측 암호화)라, 가족 기기에 "무엇이 바뀌었는지"를 서버가 알림 문구로 만들어 줄 수 없음',
      solution:
        'households 문서의 updatedAt 변경을 트리거로 내용 없는 무음 데이터 메시지만 보내 다른 가구원의 기기를 깨우고, 실제 변경 내용은 기기가 pull한 뒤 복호화해서 판단합니다. 전송에 실패한 무효 토큰은 결과를 보고 정리합니다.',
    },
    {
      problem:
        'Gemini API 키를 앱에 넣으면 추출당할 위험이 있는데, 로그인 없이(게스트) 쓰는 앱이라 Auth로는 접근을 막을 수 없음',
      solution:
        'Cloud Functions의 callGemini 프록시로 옮기고 키는 서버 시크릿으로 보관했습니다. 접근 제어는 App Check(Play Integrity)로 "이 앱의 설치본에서 온 요청인지"만 검증합니다.',
    },
  ],
  images: [
    {
      path: '/assets/projects/saveourwallet/app-01-splash.png',
      title: '스플래시',
      description: '예산 소진율에 따라 5단계로 바뀌는 지구 테마의 시작 화면 (1단계 청정지구)',
      width: 716,
      height: 1324,
    },
    {
      path: '/assets/projects/saveourwallet/app-02-dashboard.png',
      title: '대시보드',
      description: '남은 예산과 소진율, 주요 기능, 대기·오늘·이번 주기 기록을 한 화면에 모은 홈',
      width: 716,
      height: 1324,
    },
    {
      path: '/assets/projects/saveourwallet/app-03-ai-record.png',
      title: 'AI 간편 기록',
      description: 'AI가 먼저 분석해 초안을 만드는 영수증·음성 입력의 진입 화면',
      width: 716,
      height: 1324,
    },
    {
      path: '/assets/projects/saveourwallet/app-04-receipt.png',
      title: '영수증 촬영',
      description: '카메라 촬영 또는 갤러리에서 영수증·결제 스크린샷을 고르는 시작 화면',
      width: 716,
      height: 1324,
    },
    {
      path: '/assets/projects/saveourwallet/app-05-voice.png',
      title: '음성 입력',
      description: '거래 타입부터 단계별로 말하며 기록하는 음성 입력의 첫 단계',
      width: 716,
      height: 1324,
    },
    {
      path: '/assets/projects/saveourwallet/app-06-manual.png',
      title: '직접 기록',
      description: '금액·거래 타입·사용처·분류·내역을 입력하는 수동 기록 화면',
      width: 716,
      height: 1324,
    },
    {
      path: '/assets/projects/saveourwallet/app-07-timeline.png',
      title: '내 타임라인',
      description: '알림에서 자동 생성된 기록을 확정·자동병합 상태로 보고 원문을 확인·수정하는 화면',
      width: 716,
      height: 1324,
    },
    {
      path: '/assets/projects/saveourwallet/app-08-report.png',
      title: '월간 리포트',
      description: '예산 주기 기준 월간 리포트. 기록한 날과 지출 요약, 지난달 대비 변화를 확인',
      width: 716,
      height: 1324,
    },
  ],
  links: [{ label: '웹 데모 보기', href: 'https://saveourmoney-54276.web.app/' }],
  mediaNote:
    '실제 앱 실행 화면입니다. 영수증 촬영과 음성 입력은 시작 화면만 담았고, 웹 데모는 일부 기능만 담은 체험 버전입니다.',
};
