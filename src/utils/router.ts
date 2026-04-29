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
  const TRANSITION_PRIME_TEST_ENABLED = true;

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
  const setTransitionNavigating =
    navigation?.setTransitionNavigating ?? (() => {});
  const getIsTransitionNavigating =
    navigation?.getIsTransitionNavigating ?? (() => false);
  const transitionNavigatingState = navigation?.isTransitionNavigating ?? false;
  const addTransitionType =
    (
      React as typeof React & {
        unstable_addTransitionType?: (type: string) => void;
        addTransitionType?: (type: string) => void;
      }
    ).unstable_addTransitionType ??
    (React as typeof React & { addTransitionType?: (type: string) => void })
      .addTransitionType;

  const localNavigatingRef = React.useRef(false);
  const [localIsNavigating, setLocalIsNavigating] = React.useState(false);
  const historyRef = React.useRef(history);
  const currentIndexRef = React.useRef(currentIndex);
  const previousPathnameRef = React.useRef<string>(pathname);
  const previousSearchParamsRef = React.useRef<string>(searchParams.toString());
  const setIsNavigatingRef = React.useRef<((value: boolean) => void) | null>(
    null
  );
  setIsNavigatingRef.current = setLocalIsNavigating;

  const isNavigatingNow = () => {
    if (navigation) {
      return getIsTransitionNavigating();
    }
    return localNavigatingRef.current;
  };

  const setNavigating = (value: boolean) => {
    if (navigation) {
      setTransitionNavigating(value);
      return;
    }
    localNavigatingRef.current = value;
    setLocalIsNavigating(value);
  };

  const emitUiFreeze = () => {
    if (typeof window === 'undefined') return;
    window.dispatchEvent(new CustomEvent('vt-freeze-ui'));
  };

  const primeRouteForTransition = React.useCallback(
    async (url: string) => {
      if (!TRANSITION_PRIME_TEST_ENABLED) {
        return;
      }

      const routerWithPrefetch = router as typeof router & {
        prefetch?: (target: string) => Promise<void> | void;
      };

      if (typeof routerWithPrefetch.prefetch === 'function') {
        try {
          await Promise.race([
            Promise.resolve(routerWithPrefetch.prefetch(url)),
            new Promise(resolve => window.setTimeout(resolve, 300)),
          ]);
        } catch {
          // 실험 단계에서는 prefetch 실패를 무시한다.
        }
      }

      await new Promise<void>(resolve => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => resolve());
        });
      });

    },
    [router]
  );

  React.useEffect(() => {
    historyRef.current = history;
    currentIndexRef.current = currentIndex;
  }, [history, currentIndex]);

  // pathname 변경 시 로딩 상태 해제
  React.useEffect(() => {
    const previousPathname = previousPathnameRef.current;
    const currentSearchParams = searchParams.toString();
    const previousSearchParams = previousSearchParamsRef.current;
    const hasUrlChanged =
      previousPathname !== pathname ||
      previousSearchParams !== currentSearchParams;

    if (hasUrlChanged) {
      previousPathnameRef.current = pathname;
      previousSearchParamsRef.current = currentSearchParams;

      // 실제로 네비게이션을 시작한 인스턴스에서만 리셋 처리한다.
      if (!isNavigatingNow()) {
        return;
      }

      setRippleComplete(false);
      setNavigating(false);
    }
  }, [pathname, searchParams, setRippleComplete, navigation]);

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

      // replace 경로는 전환 트리거와 상태 후처리를 분리해 단순화한다.
      if (replace) {
        navigateTo?.(url, state, replace);
        const currentUrl = (() => {
          const query = searchParams.toString();
          return query ? `${pathname}?${query}` : pathname;
        })();

        if (currentUrl === url) {
          return;
        }

        emitUiFreeze();
        performNavigation(
          router,
          url,
          useDefaultTransition,
          transitionType,
          addTransitionType,
          startTransition,
          true
        );
        return;
      }

      // replace가 아닌 경우: 기존 로직 유지
      if (isNavigatingNow()) {
        return;
      }

      if (pathname === url) {
        return;
      }

      waitForRipple(isXlOrAbove).then(async () => {
        setRippleComplete(true);
        setNavigating(true);
        window.dispatchEvent(new CustomEvent('cursor-reset'));

        navigateTo?.(url, state, replace);
        await primeRouteForTransition(url);
        emitUiFreeze();

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
      primeRouteForTransition,
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
      if (isNavigatingNow()) {
        return;
      }

      waitForRipple(isXlOrAbove).then(async () => {
        const latestHistory = historyRef.current;
        const latestCurrentIndex = currentIndexRef.current;
        const latestCanGoBack = latestCurrentIndex > 0;

        if (!latestCanGoBack) {
          setNavigating(false);
          emitUiFreeze();
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
          setNavigating(false);
          return;
        }

        setRippleComplete(true);
        setNavigating(true);
        setHistoryIndexBack?.(state);
        window.dispatchEvent(new CustomEvent('cursor-reset'));
        await primeRouteForTransition(previousEntry.url);
        emitUiFreeze();

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
    },
    [
      setHistoryIndexBack,
      startTransition,
      router,
      setRippleComplete,
      isXlOrAbove,
      primeRouteForTransition,
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
      if (isNavigatingNow()) return;

      waitForRipple(isXlOrAbove).then(async () => {
        const latestHistory = historyRef.current;
        const latestCurrentIndex = currentIndexRef.current;
        const latestCanGoForward =
          latestCurrentIndex < latestHistory.length - 1;

        if (!latestCanGoForward) return;

        const nextEntry = latestHistory[latestCurrentIndex + 1];
        if (!nextEntry || !nextEntry.url) return;

        setNavigating(true);
        setHistoryIndexForward?.();
        window.dispatchEvent(new CustomEvent('cursor-reset'));
        await primeRouteForTransition(nextEntry.url);

        requestAnimationFrame(() => {
          emitUiFreeze();
          performNavigation(
            router,
            nextEntry.url,
            useDefaultTransition,
            transitionType,
            addTransitionType,
            startTransition,
            false
          );
          // forward 경로는 URL 변경 이펙트 전에 플래그를 한 번 더 안전 해제한다.
          requestAnimationFrame(() => {
            setNavigating(false);
            if (setIsNavigatingRef.current) {
              setIsNavigatingRef.current(false);
            }
          });
        });
      });
    },
    [
      setHistoryIndexForward,
      startTransition,
      router,
      isXlOrAbove,
      primeRouteForTransition,
    ]
  );

  const finalIsPending =
    transitionNavigatingState || localIsNavigating || isPending;

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
