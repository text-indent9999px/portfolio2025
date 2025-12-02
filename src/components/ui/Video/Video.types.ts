export interface VideoProps {
  /**
   * 비디오 파일 경로
   */
  src: string;
  /**
   * 비디오 제목 (선택사항)
   */
  title?: string;
  /**
   * 비디오 설명 (선택사항)
   */
  description?: string;
  /**
   * aria-label에 사용될 프로젝트/컨텍스트 제목
   */
  contextTitle?: string;
  /**
   * 비디오 인덱스 (aria-label 생성용, 선택사항)
   */
  index?: number;
  /**
   * 자동 재생 여부
   * @default true
   */
  autoPlay?: boolean;
  /**
   * 반복 재생 여부
   * @default true
   */
  loop?: boolean;
  /**
   * 음소거 여부
   * @default true
   */
  muted?: boolean;
  /**
   * 컨트롤 표시 여부
   * @default true
   */
  controls?: boolean;
  /**
   * 추가 className
   */
  className?: string;
}

