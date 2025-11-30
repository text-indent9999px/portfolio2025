'use client';

import { useNavigationHistory } from '@/contexts/NavigationContext';
import { useEffect } from 'react';
import { useMediaQuery } from './useMediaQuery';

/**
 * 스크롤 복원을 위한 커스텀 훅
 * 페이지가 마운트된 후 자동으로 스크롤 위치를 복원합니다.
 */
export const useScrollRestoration = () => {
  const { history, currentIndex } = useNavigationHistory();
  const isXlOrAbove = useMediaQuery('--breakpoint-xl', 'min');

  useEffect(() => {
    // 현재 페이지의 히스토리 엔트리 가져오기
    const currentEntry = history[currentIndex];

    if (!currentEntry || currentEntry.scrollY === 0) {
      return;
    }

    // 스크롤 컨테이너 찾기
    const getScrollContainer = () => {
      // lg 브레이크포인트 이상이면 데스크톱 컨테이너, 아니면 모바일 컨테이너
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

    // 스크롤 위치 설정 (부드러운 애니메이션)
    const setScrollY = (scrollY: number) => {
      const container = getScrollContainer();
      if (container) {
        // 부드러운 스크롤 애니메이션
        container.scrollTo({
          top: scrollY,
          behavior: 'smooth',
        });
      }
    };

    // 스크롤 복원 실행
    const restoreScroll = () => {
      setScrollY(currentEntry.scrollY);
    };

    // setTimeout으로 지연 실행
    setTimeout(restoreScroll, 100);
  }, [history, currentIndex, isXlOrAbove]);
};

/**
 * 수동으로 스크롤 복원을 실행하는 함수
 * 특정 상황에서 직접 호출할 때 사용
 */
export const restoreScrollPosition = (scrollY: number) => {
  // 브레이크포인트 확인 (함수이므로 직접 체크)
  const getBreakpointValue = (): string | null => {
    if (typeof window === 'undefined') return null;
    const value = getComputedStyle(document.documentElement)
      .getPropertyValue('--breakpoint-xl')
      .trim();
    return value || null;
  };

  const parseRemToPx = (remValue: string): number => {
    const rem = parseFloat(remValue);
    return rem * 16;
  };

  const getScrollContainer = () => {
    const breakpointValue = getBreakpointValue();
    const isXlOrAbove =
      breakpointValue && window.innerWidth >= parseRemToPx(breakpointValue);

    // lg 브레이크포인트 이상이면 데스크톱 컨테이너, 아니면 모바일 컨테이너
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
  if (container) {
    // 부드러운 스크롤 애니메이션
    container.scrollTo({
      top: scrollY,
      behavior: 'smooth',
    });
  }
};
