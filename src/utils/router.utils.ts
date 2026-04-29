import { WindowWithRipple } from './router.types';

export const waitForRipple = (isXlOrAbove?: boolean): Promise<void> => {
  return new Promise(resolve => {
    // 모바일에서는 리플 이펙트를 기다릴 필요가 없다.
    if (isXlOrAbove === false) {
      resolve();
      return;
    }

    const windowWithRipple = window as WindowWithRipple;
    // 리플 종료 이벤트가 누락되는 경우를 대비해
    // 활성 플래그가 false로 돌아오는지 RAF로도 함께 확인한다.
    const MAX_WAIT_MS = 700;
    let settled = false;
    let sawActive = Boolean(windowWithRipple.__cursorRippleActive);
    let frameId: number | null = null;

    const done = () => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeoutId);
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }
      window.removeEventListener('cursor-ripple-start', onRippleStart);
      window.removeEventListener('cursor-ripple-end', onRippleEnd);
      resolve();
    };

    const tick = () => {
      if (settled) return;

      const isActiveNow = Boolean(windowWithRipple.__cursorRippleActive);
      if (isActiveNow) {
        sawActive = true;
      } else if (sawActive) {
        // 리플이 한번이라도 활성화된 뒤 비활성으로 돌아왔으면 종료로 간주
        done();
        return;
      }

      frameId = requestAnimationFrame(tick);
    };

    const onRippleStart = () => {
      sawActive = true;
    };
    const onRippleEnd = () => done();

    const timeoutId = window.setTimeout(done, MAX_WAIT_MS);
    window.addEventListener('cursor-ripple-start', onRippleStart);
    window.addEventListener('cursor-ripple-end', onRippleEnd);
    frameId = requestAnimationFrame(tick);
  });
};

export const resetNavigationFlag = (
  navigationStateRef: {
    current: { isNavigating: boolean; [key: string]: unknown };
  },
  setIsNavigating?: (value: boolean) => void
) => {
  requestAnimationFrame(() => {
    navigationStateRef.current.isNavigating = false;
    if (setIsNavigating) {
      setIsNavigating(false);
    }
  });
};

export const performNavigation = (
  router: { push: (url: string) => void; replace: (url: string) => void },
  url: string,
  useDefaultTransition: boolean,
  transitionType: string,
  addTransitionType: ((type: string) => void) | undefined,
  startTransition: (callback: () => void) => void,
  replace = false
) => {
  if (!url || typeof url !== 'string') {
    return;
  }

  const navigate = replace ? router.replace : router.push;

  if (useDefaultTransition) {
    startTransition(() => {
      if (typeof addTransitionType === 'function') {
        addTransitionType(transitionType);
      }
      navigate(url);
    });
  } else {
    navigate(url);
  }
};
