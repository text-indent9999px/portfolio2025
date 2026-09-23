import { useCallback, useState, useSyncExternalStore } from 'react';
import type { SemanticTone } from './ColorChip.types';

export const SEMANTIC_TONE_TO_RAW_COLOR: Record<SemanticTone, string> = {
  brand: 'primary',
  subBrand: 'secondary',
  success: 'success',
  warning: 'warning',
  error: 'danger',
  info: 'info',
  neutral: 'gray',
};

export const resolveColorType = (
  tone?: SemanticTone,
  colorType?: string
): string => {
  if (tone) {
    const raw = SEMANTIC_TONE_TO_RAW_COLOR[tone];
    if (raw !== undefined) {
      return raw;
    }
    if (process.env.NODE_ENV === 'development') {
      console.warn(
        `[ColorChip] 알 수 없는 tone "${String(tone)}" — primary로 대체합니다.`
      );
    }
    return 'primary';
  }

  return colorType ?? 'primary';
};

// RGB를 HEX로 변환하는 유틸리티 함수
export const rgbToHex = (r: number, g: number, b: number): string => {
  const toHex = (n: number) => {
    const hex = Math.round(n).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

// CSS 변수에서 실제 색상값을 가져오는 함수
export const getColorValue = (
  colorType: string,
  shade: string | number
): string => {
  const cssVar = `--color-${colorType}-${shade}`;
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(cssVar)
    .trim();

  if (value.startsWith('#')) {
    return value;
  }

  // RGB/RGBA 값인 경우 HEX로 변환
  if (value.startsWith('rgb')) {
    const matches = value.match(/\d+/g);
    if (matches && matches.length >= 3) {
      const r = parseInt(matches[0]);
      const g = parseInt(matches[1]);
      const b = parseInt(matches[2]);
      return rgbToHex(r, g, b);
    }
  }

  return value; // fallback
};

// 색상값을 동적으로 가져오는 커스텀 훅
export const useColorValue = (colorType: string, shade: string | number) => {
  const getSnapshot = useCallback(() => {
    try {
      return getColorValue(colorType, shade);
    } catch (error) {
      console.warn(
        `Failed to get color value for ${colorType}-${shade}:`,
        error
      );
      return '#000000'; // fallback
    }
  }, [colorType, shade]);

  // 테마(`html` class)가 바뀌면 칩 옆 HEX도 다시 읽어야 하므로, 그 변화를
  // 외부 소스로 보고 useSyncExternalStore로 구독한다.
  const subscribe = useCallback((onStoreChange: () => void) => {
    if (typeof MutationObserver === 'undefined') return () => {};

    // 연속 attribute 변화는 requestAnimationFrame으로 한 프레임에 합친다.
    let rafId: number | null = null;
    const observer = new MutationObserver(() => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      rafId = requestAnimationFrame(() => {
        rafId = null;
        onStoreChange();
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      observer.disconnect();
    };
  }, []);

  return useSyncExternalStore(subscribe, getSnapshot, () => '');
};

// hover 상태를 관리하는 커스텀 훅
export const useHoverState = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  return {
    isHovered,
    handleMouseEnter,
    handleMouseLeave,
  };
};
