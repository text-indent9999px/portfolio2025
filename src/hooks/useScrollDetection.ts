'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from './useMediaQuery';

/**
 * 스크롤 상태를 감지하는 커스텀 훅
 * @param threshold 스크롤 임계값 (기본값: 0)
 * @returns isScrolled 스크롤 상태
 */
export const useScrollDetection = (threshold = 0) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isXlOrAbove = useMediaQuery('--breakpoint-xl', 'min');
  const lastScrollTopRef = useRef<number>(0);
  const isUpdatingRef = useRef(false);

  useEffect(() => {
    // 초기 렌더링 지연 방지를 위해 지연 실행
    const timeoutId = setTimeout(() => {
      const getScrollContainer = () => {
        if (isXlOrAbove) {
          const desktopContainer = document.querySelector(
            '[data-scroll-container="desktop"]'
          ) as HTMLElement;
          return desktopContainer || document.documentElement;
        } else {
          const mobileContainer = document.querySelector(
            '[data-scroll-container="mobile"]'
          ) as HTMLElement;
          return mobileContainer || document.documentElement;
        }
      };

      const container = getScrollContainer();
      if (!container) return;

      // requestAnimationFrame으로 최적화된 스크롤 감지
      let ticking = false;
      let rafId: number | null = null;

      const updateScrollState = () => {
        const scrollTop =
          container === document.documentElement
            ? window.scrollY
            : container.scrollTop;
        const scrollDelta = Math.abs(scrollTop - lastScrollTopRef.current);
        const newIsScrolled = scrollTop > threshold;

        if (scrollDelta < 1 && isUpdatingRef.current) {
          ticking = false;
          isUpdatingRef.current = false;
          return;
        }

        if (scrollDelta >= 1 || !isUpdatingRef.current) {
          setIsScrolled(newIsScrolled);
          lastScrollTopRef.current = scrollTop;
        }

        ticking = false;
        isUpdatingRef.current = false;
      };

      const handleScroll = (e: Event) => {
        if (
          e.target !== container &&
          e.target !== container.parentElement &&
          container !== document.documentElement
        ) {
          return;
        }

        if (!ticking) {
          isUpdatingRef.current = true;
          rafId = requestAnimationFrame(updateScrollState);
          ticking = true;
        }
      };

      const target =
        container === document.documentElement ? window : container;
      target.addEventListener('scroll', handleScroll, { passive: true });

      // 초기값 설정 - 리플로우 방지를 위해 더 지연 (3중 중첩)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            const initialScrollTop =
              container === document.documentElement
                ? window.scrollY
                : container.scrollTop;
            lastScrollTopRef.current = initialScrollTop;
            setIsScrolled(initialScrollTop > threshold);
          });
        });
      });

      return () => {
        target.removeEventListener('scroll', handleScroll);
        if (rafId !== null) {
          cancelAnimationFrame(rafId);
        }
      };
    }, 0);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [threshold, pathname, isXlOrAbove]);

  return isScrolled;
};
