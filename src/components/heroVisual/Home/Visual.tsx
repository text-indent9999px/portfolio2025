'use client';
import React, { useEffect, useRef } from 'react';
import { getThemeDetector } from '../../../utils/themeDetector';

interface HomeVisualProps {
  className?: string;
}

export const HomeVisual: React.FC<HomeVisualProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const themeDetector =
    typeof window !== 'undefined' ? getThemeDetector() : null;

  // 색상 업데이트 함수
  const updateColors = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // CSS 변수에서 색상 가져오기
    const getCSSVariable = (variable: string): string => {
      return window
        .getComputedStyle(document.documentElement)
        .getPropertyValue(variable)
        .trim();
    };

    // 테마에 따라 색상 설정
    const color1 = getCSSVariable('--color-surface-level-4');
    const color2 = getCSSVariable('--color-surface-level-6');
    const color3 = getCSSVariable('--color-surface-level-max');

    // 색상을 전역 변수로 저장하여 애니메이션에서 사용
    (
      window as typeof window & {
        visualColors?: { color1: string; color2: string; color3: string };
      }
    ).visualColors = { color1, color2, color3 };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Canvas 크기를 부모 요소에 맞춤
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        const rect = parent.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    resizeCanvas();

    const circOffsetX = 0.11111;
    const circOffsetY = 0.15873;

    // 초기 색상 설정
    if (themeDetector) {
      updateColors();
    }

    const animDuration = 1.6;

    // 원 그리기 함수
    const drawCircle = (
      x: number,
      y: number,
      radius: number,
      color: string,
      alpha: number = 1
    ) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    // 애니메이션 함수
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const time = Date.now() * 0.001;

      // 현재 색상 가져오기
      const windowWithColors = window as typeof window & {
        visualColors?: { color1: string; color2: string; color3: string };
      };
      const colors = windowWithColors.visualColors || {
        color1: getComputedStyle(document.documentElement)
          .getPropertyValue('--color-surface-level-4')
          .trim(),
        color2: getComputedStyle(document.documentElement)
          .getPropertyValue('--color-surface-level-6')
          .trim(),
        color3: getComputedStyle(document.documentElement)
          .getPropertyValue('--color-surface-level-max')
          .trim(),
      };

      // 부모 영역에 맞게 동적으로 크기 계산
      const availableWidth = canvas.width;
      const availableHeight = canvas.height;

      // 원이 확장되었을 때도 모두 들어올 수 있도록 여백 확보
      const maxScale = 1.0; // 최대 확장 크기
      const padding = 5; // 경계 여백

      // 사용 가능한 공간 계산 (여백 제외)
      const usableWidth = availableWidth - padding * 2;
      const usableHeight = availableHeight - padding * 2;

      // 부모 영역에 맞게 동적으로 그리드 크기 계산
      const minCircleSize = 52; // 최소 원 크기 (40 * 1.3 = 52)
      const dynamicGridSizeX = Math.max(
        5,
        Math.floor(usableWidth / minCircleSize)
      );
      const dynamicGridSizeY = Math.max(
        5,
        Math.floor(usableHeight / minCircleSize)
      );

      // 원 크기와 간격을 부모 영역에 맞게 계산
      const dynamicCircD = Math.min(
        usableWidth / dynamicGridSizeX, // 가로 공간을 동적 그리드 크기로 나눔
        usableHeight / dynamicGridSizeY // 세로 공간을 동적 그리드 크기로 나눔
      );

      // 실제로 그릴 수 있는 그리드 크기 계산 (짤리지 않는 범위)
      const maxRadius = (dynamicCircD / 2) * maxScale; // 최대 반지름
      const actualGridSizeX = Math.floor(
        (usableWidth - maxRadius * 2) / (dynamicCircD + 2)
      );
      const actualGridSizeY = Math.floor(
        (usableHeight - maxRadius * 2) / (dynamicCircD + 2)
      );

      // 가운데 정렬을 위한 오프셋 계산
      const offsetX = (usableWidth - actualGridSizeX * (dynamicCircD + 2)) / 2;
      const offsetY = (usableHeight - actualGridSizeY * (dynamicCircD + 2)) / 2;

      for (let i = 0; i < actualGridSizeX; i++) {
        for (let j = 0; j < actualGridSizeY; j++) {
          // 가운데 정렬된 위치 계산
          const baseX =
            padding + offsetX + i * (dynamicCircD + 2) + dynamicCircD / 2;
          const baseY =
            padding + offsetY + j * (dynamicCircD + 2) + dynamicCircD / 2;

          // 원본 GSAP stagger 효과 정확히 구현
          // from: [0, 1] - 우상단에서 좌하단으로 진행하면서 주변에도 영향
          const distanceFromTopRight = Math.sqrt(
            (actualGridSizeX - 1 - i) ** 2 + j ** 2
          ); // 우상단으로부터의 거리
          const staggerDelay = distanceFromTopRight * 0.2; // each: 0.1, 우상단부터 시작
          const wave = Math.sin(
            (time - staggerDelay) * (Math.PI / animDuration)
          );

          // 원본과 동일한 yoyo 효과: 0.15 ~ 1.0 스케일
          const scale = 0.15 + (wave + 1) * 0.425; // 0.15 ~ 1.0 범위
          const radius = (dynamicCircD / 2) * scale;

          // 첫 번째 원
          drawCircle(baseX, baseY, radius, colors.color1, 0.8);

          // 두 번째 원
          drawCircle(
            baseX - circOffsetX * dynamicCircD,
            baseY + circOffsetY * dynamicCircD,
            radius,
            colors.color2,
            0.8
          );

          // 세 번째 원
          drawCircle(
            baseX + circOffsetX * dynamicCircD,
            baseY + circOffsetY * dynamicCircD,
            radius,
            colors.color3,
            0.8
          );
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    // 초기 렌더링 완료 후 애니메이션 시작
    const startAnimation = () => {
      if (typeof requestIdleCallback !== 'undefined') {
        requestIdleCallback(
          () => {
            animate();
          },
          { timeout: 1000 }
        );
      } else {
        // requestIdleCallback 미지원 브라우저를 위한 폴백
        setTimeout(() => {
          animate();
        }, 100);
      }
    };

    startAnimation();

    // 테마 변경 구독
    const unsubscribeTheme =
      themeDetector?.subscribe(() => updateColors()) || (() => {});

    // 리사이즈 핸들러
    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener('resize', handleResize);

    // 클린업
    return () => {
      window.removeEventListener('resize', handleResize);
      unsubscribeTheme();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
      style={{ zIndex: 1000 }}
    />
  );
};
