import { useCallback, useEffect, useState } from 'react';

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
  const [hexCode, setHexCode] = useState<string>('');

  const updateColorValue = useCallback(() => {
    try {
      const colorValue = getColorValue(colorType, shade);
      setHexCode(colorValue);
    } catch (error) {
      console.warn(
        `Failed to get color value for ${colorType}-${shade}:`,
        error
      );
      setHexCode('#000000'); // fallback
    }
  }, [colorType, shade]);

  useEffect(() => {
    updateColorValue();

    // 다크모드 변경 감지
    const observer = new MutationObserver(() => {
      updateColorValue();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, [updateColorValue]);

  return hexCode;
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
