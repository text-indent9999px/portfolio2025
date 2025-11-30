'use client';

import { useRouter as useNextRouter, usePathname } from 'next/navigation';
import React, {
  unstable_addTransitionType as addTransitionType,
  useTransition,
} from 'react';
import { useNavigationHistory } from '../contexts/NavigationContext';
import { useMediaQuery } from '../hooks/useMediaQuery';
import {
  performNavigation,
  resetNavigationFlag,
  waitForRipple,
} from './router.utils';

export function useTransitionNavigation() {
  const router = useNextRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const isXlOrAbove = useMediaQuery('--breakpoint-xl', 'min');
  const {
    history,
    navigateTo,
    setHistoryIndexBack,
    setHistoryIndexForward,
    currentIndex,
    getCurrentNavigationState,
    setRippleComplete,
  } = useNavigationHistory();

  const isNavigatingRef = React.useRef(false);
  const [isNavigating, setIsNavigating] = React.useState(false);
  const historyRef = React.useRef(history);
  const currentIndexRef = React.useRef(currentIndex);
  const previousPathnameRef = React.useRef<string>(pathname);
  const setIsNavigatingRef = React.useRef<((value: boolean) => void) | null>(
    null
  );
  setIsNavigatingRef.current = setIsNavigating;

  React.useEffect(() => {
    historyRef.current = history;
    currentIndexRef.current = currentIndex;
  }, [history, currentIndex]);

  // pathname 변경 시 로딩 상태 해제
  React.useEffect(() => {
    const previousPathname = previousPathnameRef.current;
    if (previousPathname !== pathname) {
      previousPathnameRef.current = pathname;
      setRippleComplete(false);
      setIsNavigating(false);
      isNavigatingRef.current = false;
    }
  }, [pathname, setRippleComplete]);

  const navigateToUrl = React.useCallback(
    ({
      url,
      useDefaultTransition = true,
      transitionType = 'nav-forward',
      state,
    }: {
      url: string;
      useDefaultTransition?: boolean;
      transitionType?: string;
      state?: Record<string, unknown>;
    }) => {
      if (isNavigatingRef.current) return;

      if (!url || typeof url !== 'string') {
        return;
      }

      if (pathname === url) {
        return;
      }

      waitForRipple(isXlOrAbove).then(() => {
        setRippleComplete(true);
        isNavigatingRef.current = true;
        setIsNavigating(true);
        window.dispatchEvent(new CustomEvent('cursor-reset'));
        navigateTo(url, state);

        performNavigation(
          router,
          url,
          useDefaultTransition,
          transitionType,
          addTransitionType,
          startTransition
        );
      });
    },
    [
      navigateTo,
      startTransition,
      router,
      setRippleComplete,
      pathname,
      isXlOrAbove,
    ]
  );

  const navigateBack = React.useCallback(
    ({
      useDefaultTransition = true,
      transitionType = 'nav-back',
      state,
    }: {
      useDefaultTransition?: boolean;
      transitionType?: string;
      state?: Record<string, unknown>;
    } = {}) => {
      if (isNavigatingRef.current) return;

      waitForRipple(isXlOrAbove).then(() => {
        const latestHistory = historyRef.current;
        const latestCurrentIndex = currentIndexRef.current;
        const latestCanGoBack = latestCurrentIndex > 0;

        if (!latestCanGoBack) {
          isNavigatingRef.current = false;
          setIsNavigating(false);
          performNavigation(
            router,
            '/',
            useDefaultTransition,
            transitionType,
            addTransitionType,
            startTransition
          );
          return;
        }

        const previousEntry = latestHistory[latestCurrentIndex - 1];
        if (!previousEntry || !previousEntry.url) {
          isNavigatingRef.current = false;
          setIsNavigating(false);
          return;
        }

        setRippleComplete(true);
        isNavigatingRef.current = true;
        setIsNavigating(true);
        setHistoryIndexBack(state);
        window.dispatchEvent(new CustomEvent('cursor-reset'));

        // 단일 requestAnimationFrame으로 변경
        requestAnimationFrame(() => {
          performNavigation(
            router,
            previousEntry.url,
            useDefaultTransition,
            transitionType,
            addTransitionType,
            startTransition
          );
        });
      });
    },
    [
      setHistoryIndexBack,
      startTransition,
      router,
      setRippleComplete,
      isXlOrAbove,
    ]
  );

  const navigateForwardAction = React.useCallback(
    ({
      useDefaultTransition = true,
      transitionType = 'nav-forward',
    }: {
      useDefaultTransition?: boolean;
      transitionType?: string;
    } = {}) => {
      if (isNavigatingRef.current) return;

      waitForRipple(isXlOrAbove).then(() => {
        const latestHistory = historyRef.current;
        const latestCurrentIndex = currentIndexRef.current;
        const latestCanGoForward =
          latestCurrentIndex < latestHistory.length - 1;

        if (!latestCanGoForward) return;

        const nextEntry = latestHistory[latestCurrentIndex + 1];
        if (!nextEntry || !nextEntry.url) return;

        isNavigatingRef.current = true;
        setHistoryIndexForward();
        window.dispatchEvent(new CustomEvent('cursor-reset'));

        requestAnimationFrame(() => {
          performNavigation(
            router,
            nextEntry.url,
            useDefaultTransition,
            transitionType,
            addTransitionType,
            startTransition
          );
          resetNavigationFlag(
            isNavigatingRef,
            setIsNavigatingRef.current || undefined
          );
        });
      });
    },
    [setHistoryIndexForward, startTransition, router, isXlOrAbove]
  );

  const finalIsPending = isNavigating || isPending;

  return {
    navigateToUrl,
    navigateBack,
    navigateForwardAction,
    isPending: finalIsPending,
    urlHistory: history.map(entry => entry.url),
    getNavigationState: getCurrentNavigationState,
  };
}

export const useRouter = useTransitionNavigation;
