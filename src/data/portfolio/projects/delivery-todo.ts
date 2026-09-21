import type { Project } from '../types';

export const deliveryTodo: Project = {
  slug: 'delivery-todo',
  title: '배달 주문 자동 추출 To-Do',
  summary:
    '통화 녹음과 주문 문자를 파싱해 배달 주문을 할 일 카드로 바꿔 주는, 소상공인을 위한 Flutter 앱입니다.',
  category: 'Mobile · AI',
  status: 'wip',
  role: '1인 개발 (설계 · 개발)',
  stack: ['Flutter', 'Dart', 'SQLite', 'Gemini 2.5 Flash'],
  tags: ['개발 중', 'Flutter', 'Gemini API', 'SQLite', '음성 인식(STT)'],
  cover: {
    src: '/assets/projects/todolist/0.png',
    alt: '배달 주문 관리 대시보드 화면',
    position: 'top',
  },
  accent: 'sand',
  background: [
    '전화와 문자로 끊임없이 밀려오는 배달 주문을 효율적으로 관리하고 싶은 소상공인과 1인 매장 운영자를 위한 To-Do 앱입니다.',
    '통화 중 자동 녹음된 음성이나 수신된 주문 문자를 파싱해 배달지 주소, 메뉴, 요청사항을 구조화된 할 일 카드로 변환합니다. 복잡한 작업 흐름을 단순화하고 주문 누락을 막는 것을 최우선 가치로 두고 Flutter 기반 크로스플랫폼 앱으로 개발하고 있습니다.',
  ],
  features: [
    'Flutter와 sqflite로 기기 로컬 데이터베이스 중심의 영속성 계층 구축',
    '통화 녹음 오디오(M4A/MP3)를 Base64로 인코딩해 Gemini API inlineData로 전송하는 파이프라인',
    '문자와 오디오 텍스트화 결과에서 [메뉴명, 배달주소, 배달요청일자]를 뽑는 Structured Outputs 프롬프트 구성',
    '주방 환경을 고려해 오프라인에서도 주문을 조회할 수 있는 SQLite 연동 구조',
    'FFmpeg Flutter 라이브러리로 기기 안에서 오디오 비트레이트·모노 채널 변환을 수행하는 가공 스크립트 리서치',
  ],
  challenges: [
    {
      problem: '"저번 주소로 해주세요", "단골 메뉴 하나" 같은 비정형 구어체에서 정보를 추출하기 어려움',
      solution:
        '로컬 SQLite에 쌓인 단골 고객의 주문 이력과 선호 메뉴 사전을 프롬프트의 RAG 컨텍스트로 함께 전달해, 모호한 표현도 정밀하게 파싱하도록 고도화하고 있습니다.',
    },
    {
      problem: '대용량 오디오 전송으로 인한 네트워크 오버헤드와 모바일 데이터 소모',
      solution:
        'FFmpeg Flutter 모듈로 기기 안에서 저비트레이트 모노 채널로 인코딩하는 파이프라인을 구축해 전송 용량을 80% 이상 줄였습니다.',
    },
  ],
  images: [
    {
      path: '/assets/projects/todolist/0.png',
      title: '배달 주문 관리 대시보드',
      description: '추출된 주문의 상세 정보(배달 주소, 메뉴, 일자)와 작업 상태를 확인하는 화면',
      width: 720,
      height: 1280,
    },
  ],
  mediaNote: '오프라인 우선으로 주문 목록을 관리하는 핵심 화면입니다. 화면 리뉴얼을 준비하고 있습니다.',
};
