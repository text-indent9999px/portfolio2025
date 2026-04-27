'use client';

import {
  useRouter as useNextRouter,
  usePathname,
  useSearchParams,
} from 'next/navigation';
import React, { useTransition } from 'react';
import { useNavigationHistoryOptional } from '../contexts/NavigationContext';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { performNavigation, waitForRipple } from './router.utils';

export function useTransitionNavigation() {
  const router = useNextRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const isXlOrAbove = useMediaQuery('--breakpoint-xl', 'min');
  const navigation = useNavigationHistoryOptional();
  const history = navigation?.history ?? [];
  const currentIndex = navigation?.currentIndex ?? 0;
  const navigateTo = navigation?.navigateTo;
  const setHistoryIndexBack = navigation?.setHistoryIndexBack;
  const setHistoryIndexForward = navigation?.setHistoryIndexForward;
  const getCurrentNavigationState =
    navigation?.getCurrentNavigationState ?? (() => undefined);
  const setRippleComplete = navigation?.setRippleComplete ?? (() => {});
  const addTransitionType = (
    React as typeof React & {
      unstable_addTransitionType?: (type: string) => void;
      addTransitionType?: (type: string) => void;
    }
  ).unstable_addTransitionType ??
    (React as typeof React & { addTransitionType?: (type: string) => void })
      .addTransitionType;

  const isNavigatingRef = React.useRef(false);
  const [isNavigating, setIsNavigating] = React.useState(false);
  const historyRef = React.useRef(history);
  const currentIndexRef = React.useRef(currentIndex);
  const previousPathnameRef = React.useRef<string>(pathname);
  const previousSearchParamsRef = React.useRef<string>(searchParams.toString());
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
      replace = false,
    }: {
      url: string;
      useDefaultTransition?: boolean;
      transitionType?: string;
      state?: Record<string, unknown>;
      replace?: boolean;
    }) => {
      if (!url || typeof url !== 'string') {
        return;
      }

      // replace인 경우: 히스토리만 교체하고 router.replace 호출 (네비게이션 상태 변경 없음)
      if (replace) {
        navigateTo?.(url, state, replace);
        router.replace(url);
        return;
      }

      // replace가 아닌 경우: 기존 로직 유지
      if (isNavigatingRef.current) {
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

        navigateTo?.(url, state, replace);

        performNavigation(
          router,
          url,
          useDefaultTransition,
          transitionType,
          addTransitionType,
          startTransition,
          replace
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
            startTransition,
            false
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
        setHistoryIndexBack?.(state);
        window.dispatchEvent(new CustomEvent('cursor-reset'));

        // 단일 requestAnimationFrame으로 변경
        requestAnimationFrame(() => {
          performNavigation(
            router,
            previousEntry.url,
            useDefaultTransition,
            transitionType,
            addTransitionType,
            startTransition,
            false
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
        setHistoryIndexForward?.();
        window.dispatchEvent(new CustomEvent('cursor-reset'));

        requestAnimationFrame(() => {
          performNavigation(
            router,
            nextEntry.url,
            useDefaultTransition,
            transitionType,
            addTransitionType,
            startTransition,
            false
          );
          // isNavigatingRef는 boolean이므로 resetNavigationFlag 대신 직접 설정
          requestAnimationFrame(() => {
            isNavigatingRef.current = false;
            if (setIsNavigatingRef.current) {
              setIsNavigatingRef.current(false);
            }
          });
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
