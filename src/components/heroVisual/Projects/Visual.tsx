'use client';

import React, { useEffect, useRef, useState } from 'react';
import { getThemeDetector } from '../../../utils/themeDetector';

interface ProjectsVisualProps {
  className?: string;
  speed?: number;
}

export const ProjectsVisual: React.FC<ProjectsVisualProps> = ({
  className = '',
  speed = 0.5,
}) => {
  const [isReady, setIsReady] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const timeRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const themeDetector =
    typeof window !== 'undefined' ? getThemeDetector() : null;

  useEffect(() => {
    let frameA = 0;
    let frameB = 0;

    frameA = requestAnimationFrame(() => {
      frameB = requestAnimationFrame(() => {
        setIsReady(true);
      });
    });

    return () => {
      cancelAnimationFrame(frameA);
      cancelAnimationFrame(frameB);
    };
  }, []);

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
    const color = getCSSVariable('--color-surface-level-max');

    // 색상을 전역 변수로 저장하여 애니메이션에서 사용
    (
      window as typeof window & {
        crystallineColors?: { color: string };
      }
    ).crystallineColors = { color };
  };

  useEffect(() => {
    if (!isReady) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 부모 컨테이너 크기 가져오기
    const container = canvas.parentElement;
    if (!container) return;

    const updateCanvasSize = () => {
      const rect = container.getBoundingClientRect();
      // 부모 영역의 80% 크기로 캔버스 설정 (여유 공간 확보)
      const CANVAS_WIDTH = rect.width;
      const CANVAS_HEIGHT = rect.height;

      // 고해상도를 위한 devicePixelRatio 적용
      const dpr = window.devicePixelRatio || 1;
      canvas.width = CANVAS_WIDTH * dpr;
      canvas.height = CANVAS_HEIGHT * dpr;
      canvas.style.width = `${CANVAS_WIDTH}px`;
      canvas.style.height = `${CANVAS_HEIGHT}px`;
      // 스케일 누적 방지
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      return { CANVAS_WIDTH, CANVAS_HEIGHT, dpr };
    };

    let { CANVAS_WIDTH, CANVAS_HEIGHT, dpr } = updateCanvasSize();
    const GLOBAL_SPEED = speed;

    // 애니메이션 설정 - 캔버스 크기에 맞춤
    let CANVAS_WIDTH_ANIM = CANVAS_WIDTH * 0.8;
    let CANVAS_HEIGHT_ANIM = CANVAS_HEIGHT * 0.8;
    const fov = 250;

    // 유틸리티 함수: 현재 테마 색상(불투명) 문자열 반환
    const MONOCHROME_FILL = () => {
      const windowWithColors = window as typeof window & {
        crystallineColors?: { color: string };
      };
      const raw = (windowWithColors.crystallineColors?.color ??
        getComputedStyle(document.documentElement)
          .getPropertyValue('--color-surface-level-max')
          .trim()) as string;

      if (/^rgba?\(/i.test(raw)) return raw;

      const hex = raw.replace(/\s+/g, '').toLowerCase();
      const hexMatch = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(hex);
      if (hexMatch) {
        let h = hexMatch[1];
        if (h.length === 3)
          h = h
            .split('')
            .map(c => c + c)
            .join('');
        const r = parseInt(h.slice(0, 2), 16);
        const g = parseInt(h.slice(2, 4), 16);
        const b = parseInt(h.slice(4, 6), 16);
        return `rgb(${r}, ${g}, ${b})`;
      }

      // 기타(hsl 등) 원본 반환
      return raw || 'rgb(255, 255, 255)';
    };

    const easeInOutCubic = (t: number) => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    // 3D 큐브 포인트 생성 함수
    const generatePoints = () => {
      const points: Array<{ x: number; y: number; z: number }> = [];
      const gridSize = 10;
      const currentBaseSize = Math.min(CANVAS_WIDTH, CANVAS_HEIGHT);
      const spacing = Math.min(35, Math.max(12, currentBaseSize / 30));
      const cubeHalfSize = ((gridSize - 1) * spacing) / 2;

      for (let x = 0; x < gridSize; x++) {
        for (let y = 0; y < gridSize; y++) {
          for (let z = 0; z < gridSize; z++) {
            points.push({
              x: x * spacing - cubeHalfSize,
              y: y * spacing - cubeHalfSize,
              z: z * spacing - cubeHalfSize,
            });
          }
        }
      }
      return { points, cubeHalfSize };
    };

    let { points, cubeHalfSize } = generatePoints();
    let maxDist = Math.hypot(cubeHalfSize, cubeHalfSize, cubeHalfSize);

    // 초기 색상 설정
    if (themeDetector) {
      updateColors();
    }

    // 캔버스 중앙에 80% 영역을 잡고 그 안에 렌더링 (패딩 역할)
    let offsetX = (CANVAS_WIDTH - CANVAS_WIDTH_ANIM) / 2;
    let offsetY = (CANVAS_HEIGHT - CANVAS_HEIGHT_ANIM) / 2;
    let centerX = offsetX + CANVAS_WIDTH_ANIM / 2;
    let centerY = offsetY + CANVAS_HEIGHT_ANIM / 2;

    const animate = (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const deltaTime = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;
      timeRef.current += deltaTime * 0.0003 * GLOBAL_SPEED;

      // 전체 픽셀 캔버스를 지우고 dpr 스케일 재적용 (잔상/잘림 방지)
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const rotX = timeRef.current * 2;
      const rotY = timeRef.current * 3;
      const waveRadius = (timestamp * 0.04 * GLOBAL_SPEED) % (maxDist * 1.5);
      const waveWidth = 60; // 점 개수 증가에 맞춰 파동 폭 증가
      const displacementMagnitude = 15; // 점 개수 증가에 맞춰 변위 강도 증가

      const pointsToDraw: Array<{
        x: number;
        y: number;
        z: number;
        size: number;
        opacity: number;
      }> = [];

      points.forEach(p_orig => {
        let { x, y, z } = p_orig;
        const distFromCenter = Math.hypot(x, y, z);
        const distToWave = Math.abs(distFromCenter - waveRadius);
        let displacementAmount = 0;

        if (distToWave < waveWidth / 2) {
          const wavePhase = (distToWave / (waveWidth / 2)) * (Math.PI / 2);
          displacementAmount =
            easeInOutCubic(Math.cos(wavePhase)) * displacementMagnitude;
        }

        if (displacementAmount > 0 && distFromCenter > 0) {
          const ratio = (distFromCenter + displacementAmount) / distFromCenter;
          x *= ratio;
          y *= ratio;
          z *= ratio;
        }

        // Y축 회전
        const cY = Math.cos(rotY);
        const sY = Math.sin(rotY);
        const tX = x * cY - z * sY;
        let tZ = x * sY + z * cY;
        x = tX;
        z = tZ;

        // X축 회전
        const cX = Math.cos(rotX);
        const sX = Math.sin(rotX);
        const tY = y * cX - z * sX;
        tZ = y * sX + z * cX;
        y = tY;
        z = tZ;

        const scale = fov / (fov + z);
        const pX = centerX + x * scale;
        const pY = centerY + y * scale;
        const waveInfluence = displacementAmount / displacementMagnitude;
        const currentBaseSize = Math.min(CANVAS_WIDTH, CANVAS_HEIGHT);
        const basePointSize = Math.min(
          2,
          Math.max(0.5, currentBaseSize * 0.003)
        ); // 부모 크기에 비례하되 범위 제한
        const size = (basePointSize + waveInfluence * basePointSize) * scale;
        const opacity = Math.max(0.1, scale * 0.7 + waveInfluence * 0.4);

        if (size > 0.1) {
          pointsToDraw.push({ x: pX, y: pY, z, size, opacity });
        }
      });

      // Z축 기준으로 정렬하여 올바른 깊이 렌더링
      pointsToDraw
        .sort((a, b) => a.z - b.z)
        .forEach(p => {
          ctx.save();
          ctx.globalAlpha = p.opacity;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = MONOCHROME_FILL();
          ctx.fill();
          ctx.restore();
        });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    // 리사이즈 이벤트 리스너 추가
    const handleResize = () => {
      const newSize = updateCanvasSize();
      // 리사이즈 시 모든 변수 업데이트
      CANVAS_WIDTH = newSize.CANVAS_WIDTH;
      CANVAS_HEIGHT = newSize.CANVAS_HEIGHT;
      dpr = newSize.dpr;
      CANVAS_WIDTH_ANIM = CANVAS_WIDTH * 0.8;
      CANVAS_HEIGHT_ANIM = CANVAS_HEIGHT * 0.8;

      // 위치 변수들도 업데이트
      offsetX = (CANVAS_WIDTH - CANVAS_WIDTH_ANIM) / 2;
      offsetY = (CANVAS_HEIGHT - CANVAS_HEIGHT_ANIM) / 2;
      centerX = offsetX + CANVAS_WIDTH_ANIM / 2;
      centerY = offsetY + CANVAS_HEIGHT_ANIM / 2;

      // 리사이즈 시 포인트 재생성
      const newResult = generatePoints();
      points = newResult.points;
      cubeHalfSize = newResult.cubeHalfSize;
      maxDist = Math.hypot(cubeHalfSize, cubeHalfSize, cubeHalfSize);
    };

    window.addEventListener('resize', handleResize);

    // 테마 변경 구독
    const unsubscribeTheme =
      themeDetector?.subscribe(() => updateColors()) || (() => {});

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
      unsubscribeTheme();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speed, isReady]);

  return (
    <div
      className={`crystalline-cube-refraction ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {isReady && (
        <canvas
          ref={canvasRef}
          style={{
            width: '80%',
            height: '80%',
          }}
        />
      )}
    </div>
  );
};
