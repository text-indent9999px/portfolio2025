import type { ImageProps as NextImageProps } from 'next/image';
import type { MouseEventHandler } from 'react';

export interface ImageProps
  extends Omit<NextImageProps, 'src' | 'alt' | 'onClick'> {
  /**
   * 이미지 파일 경로
   * - Next.js Image의 src 타입을 그대로 사용
   */
  src: NextImageProps['src'];
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
   * 이미지 alt 텍스트
   * - Next.js Image의 필수 alt를 선택적으로 오버라이드
   */
  alt?: string;
  /**
   * 이미지 클릭 시 오버레이 모달을 사용할지 여부
   * - true: 클릭 시 확대 모달 표시 (기본값)
   * - false: 모달 없이 부모에서 전달한 onClick만 동작
   */
  enableModal?: boolean;
  /**
   * 클릭은 래퍼 `div`에서 처리한다. (Next Image `img`용과 DOM 타입이 다름)
   */
  onClick?: MouseEventHandler<HTMLDivElement>;
}
