'use client';

import { useDevice } from '../contexts/DeviceContext';

/**
 * CSS 변수를 기반으로 미디어 쿼리를 확인하는 커스텀 훅
 * DeviceContext를 활용하여 성능 최적화
 * @param cssVariable CSS 변수 이름 (예: '--breakpoint-xl')
 * @param direction 'min' 또는 'max' (기본값: 'min')
 * @returns 해당 미디어 쿼리에 일치하는지 여부
 */
export const useMediaQuery = (
  cssVariable: string,
  direction: 'min' | 'max' = 'min'
): boolean => {
  const { isMdOrAbove, isLgOrAbove, isXlOrAbove, is2XlOrAbove } = useDevice();

  // 브레이크포인트 매핑 (CSS 변수명 -> 상태)
  const breakpointMap: Record<string, boolean> = {
    '--breakpoint-md': isMdOrAbove,
    '--breakpoint-lg': isLgOrAbove,
    '--breakpoint-xl': isXlOrAbove,
    '--breakpoint-2xl': is2XlOrAbove,
  };

  const matches = breakpointMap[cssVariable] ?? false;

  // direction이 'max'인 경우 반대값 반환
  return direction === 'min' ? matches : !matches;
};
