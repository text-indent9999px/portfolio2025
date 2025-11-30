'use client';

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useDevice } from './DeviceContext';

// 히스토리 최대 길이 설정 (필요시 이 값만 변경하면 됨)
const MAX_HISTORY_LENGTH = 10;

// 모바일 스크롤 컨테이너 캐시 (모바일에서는 변경되지 않으므로 한 번만 찾아서 캐시)
let cachedMobileContainer: HTMLElement | null = null;

// 스크롤 컨테이너 설정 (PC/모바일별로 다르게 설정 가능)
const getScrollContainer = (isXlOrAbove?: boolean): HTMLElement | null => {
  if (typeof window === 'undefined') return null;

  // PC일 때만 동적으로 체크, 모바일일 때는 캐시된 값 사용
  if (isXlOrAbove === true) {
    // PC: 특정 컨테이너 선택자 (필요시 변경)
    return (
      document.querySelector('[data-scroll-container="desktop"]') ||
      document.querySelector('.desktop-scroll-container') ||
      document.documentElement
    );
  } else if (isXlOrAbove === false) {
    // 모바일: 캐시된 값이 있으면 재사용, 없으면 찾아서 캐시
    if (cachedMobileContainer) {
      return cachedMobileContainer;
    }
    cachedMobileContainer =
      (document.querySelector(
        '[data-scroll-container="mobile"]'
      ) as HTMLElement) ||
      (document.querySelector('.mobile-scroll-container') as HTMLElement) ||
      document.documentElement;
    return cachedMobileContainer;
  } else {
    // isXlOrAbove가 제공되지 않은 경우 (초기 마운트 등) 기본값으로 모바일로 간주
    if (cachedMobileContainer) {
      return cachedMobileContainer;
    }
    cachedMobileContainer =
      (document.querySelector(
        '[data-scroll-container="mobile"]'
      ) as HTMLElement) ||
      (document.querySelector('.mobile-scroll-container') as HTMLElement) ||
      document.documentElement;
    return cachedMobileContainer;
  }
};

// 스크롤 값 가져오기
const getScrollY = (isXlOrAbove?: boolean): number => {
  const container = getScrollContainer(isXlOrAbove);
  if (!container) {
    return 0;
  }

  return container === document.documentElement
    ? window.scrollY
    : container.scrollTop;
};

// 스크롤 값 설정
const setScrollY = (scrollY: number, isXlOrAbove?: boolean): void => {
  const container = getScrollContainer(isXlOrAbove);
  if (!container) return;

  if (container === document.documentElement) {
    window.scrollTo(0, scrollY);
  } else {
    container.scrollTop = scrollY;
  }
};

interface NavigationEntry {
  url: string;
  scrollY: number;
  timestamp: number;
  state?: Record<string, unknown>;
}

interface NavigationContextType {
  history: NavigationEntry[];
  currentIndex: number;
  canGoBack: boolean;
  canGoForward: boolean;
  setHistoryIndexBack: (state?: Record<string, unknown>) => void;
  setHistoryIndexForward: () => void;
  navigateTo: (url: string, state?: Record<string, unknown>) => void;
  getCurrentNavigationState: () => Record<string, unknown> | undefined;
  setUrlHistory: (
    history:
      | NavigationEntry[]
      | ((prev: NavigationEntry[]) => NavigationEntry[])
  ) => void;
  isRippleComplete: boolean;
  setRippleComplete: (value: boolean) => void;
}

const NavigationContext = createContext<NavigationContextType | null>(null);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [history, setHistory] = useState<NavigationEntry[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRippleComplete, setIsRippleComplete] = useState(false);
  const previousUrlRef = useRef<string | null>(null);
  const { isXlOrAbove } = useDevice();

  // 계산된 상태들
  const canGoBack = currentIndex > 0;
  const canGoForward = currentIndex < history.length - 1;

  // 네비게이션 함수들 (상태만 업데이트, 실제 네비게이션은 router.ts에서 처리)
  const setHistoryIndexBack = (state?: Record<string, unknown>) => {
    if (canGoBack) {
      const newIndex = currentIndex - 1;

      // state가 있으면 이전 엔트리의 state만 업데이트
      if (state !== undefined) {
        setHistory(prev => {
          const updatedHistory = [...prev];
          if (updatedHistory[newIndex]) {
            updatedHistory[newIndex] = {
              ...updatedHistory[newIndex],
              state,
            };
          }
          return updatedHistory;
        });
      }

      setCurrentIndex(newIndex);
    }
  };

  const setHistoryIndexForward = () => {
    if (canGoForward) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
    }
  };

  const navigateTo = (url: string, state?: Record<string, unknown>) => {
    const currentScrollY = getScrollY(isXlOrAbove);

    // URL 변경 시 로그 출력 (navigateTo 호출 시점에 바로 출력)
    if (url && url !== previousUrlRef.current) {
      previousUrlRef.current = url;
    }

    // 먼저 같은 URL인지 확인
    const isSameUrl = history.length > 0 && history[currentIndex]?.url === url;

    setHistory(prev => {
      // 같은 URL로 이동하는 경우: 해당 엔트리만 업데이트 (배열 복사 최소화)
      if (isSameUrl) {
        const updatedHistory = [...prev];
        updatedHistory[currentIndex] = {
          ...updatedHistory[currentIndex],
          scrollY: currentScrollY,
          timestamp: Date.now(),
          state, // state 업데이트
        };
        return updatedHistory;
      }

      // 다른 URL로 이동하는 경우
      // currentIndex 이후의 항목들을 제거하고 새 항목 추가
      const updatedHistory = prev.slice(0, currentIndex + 1);

      // 마지막 엔트리의 스크롤 값만 업데이트 (새 엔트리 추가 전)
      if (updatedHistory.length > 0) {
        updatedHistory[updatedHistory.length - 1] = {
          ...updatedHistory[updatedHistory.length - 1],
          scrollY: currentScrollY,
        };
      }

      // 새 항목 추가
      const newEntry: NavigationEntry = {
        url,
        scrollY: 0,
        timestamp: Date.now(),
        state,
      };
      updatedHistory.push(newEntry);

      // 최대 길이 제한 (한 번만 slice)
      return updatedHistory.length > MAX_HISTORY_LENGTH
        ? updatedHistory.slice(-MAX_HISTORY_LENGTH)
        : updatedHistory;
    });

    // 같은 URL이 아닌 경우에만 currentIndex 증가 (setHistory 밖에서 처리)
    if (!isSameUrl) {
      setCurrentIndex(prevIndex =>
        Math.min(prevIndex + 1, MAX_HISTORY_LENGTH - 1)
      );
    }
  };

  // 초기 경로 설정 - 리플로우 방지를 위해 지연 실행
  useEffect(() => {
    if (typeof window !== 'undefined' && history.length === 0) {
      const currentUrl = window.location.pathname;
      // 리플로우 방지를 위해 스크롤 값 읽기를 지연
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const currentScrollY = getScrollY(isXlOrAbove);
          const initialEntry: NavigationEntry = {
            url: currentUrl,
            scrollY: currentScrollY,
            timestamp: Date.now(),
          };
          setHistory([initialEntry]);
          setCurrentIndex(0);
          if (currentUrl && currentUrl !== previousUrlRef.current) {
            previousUrlRef.current = currentUrl;
          }
        });
      });
    }
  }, [isXlOrAbove, history.length]);

  // 브라우저 뒤로가기/앞으로가기 버튼 처리
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handlePopState = () => {
      const currentUrl = window.location.pathname;

      // 히스토리에서 현재 URL과 일치하는 항목 찾기
      setHistory(prev => {
        const urlIndex = prev.findIndex(entry => entry.url === currentUrl);
        if (urlIndex !== -1) {
          setCurrentIndex(urlIndex);
          const entry = prev[urlIndex];
          if (entry) {
            setScrollY(entry.scrollY, isXlOrAbove);
          }
          return prev;
        }
        return prev;
      });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [isXlOrAbove]);

  // 주소 변경 시 현재 페이지 출력 (처음 마운트 및 주소 변경 시 한 번만)
  useEffect(() => {
    if (history.length > 0 && currentIndex >= 0) {
      const currentUrl = history[currentIndex]?.url;
      if (currentUrl && currentUrl !== previousUrlRef.current) {
        previousUrlRef.current = currentUrl;
      }
    }
  }, [history, currentIndex]);

  const getCurrentNavigationState = (): Record<string, unknown> | undefined => {
    return history[currentIndex]?.state;
  };

  const value: NavigationContextType = {
    history,
    currentIndex,
    canGoBack,
    canGoForward,
    setHistoryIndexBack,
    setHistoryIndexForward,
    navigateTo,
    getCurrentNavigationState,
    setUrlHistory: setHistory,
    isRippleComplete,
    setRippleComplete: setIsRippleComplete,
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigationHistory() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error(
      'useNavigationHistory must be used within NavigationProvider'
    );
  }
  return context;
}
