export interface ImageProps {
  /**
   * 이미지 파일 경로
   */
  src: string;
  /**
   * 이미지 제목 (선택사항)
   */
  title?: string;
  /**
   * 이미지 설명 (선택사항)
   */
  description?: string;
  /**
   * aria-label에 사용될 컨텍스트 제목
   */
  contextTitle?: string;
  /**
   * 이미지 인덱스 (aria-label 생성용, 선택사항)
   */
  index?: number;
  /**
   * 이미지 너비
   */
  width?: number;
  /**
   * 이미지 높이
   */
  height?: number;
  /**
   * 이미지 alt 텍스트
   */
  alt?: string;
  /**
   * 추가 className
   */
  className?: string;
}

