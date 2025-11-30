import { WindowWithRipple } from './router.types';

export const waitForRipple = (isXlOrAbove?: boolean): Promise<void> => {
  return new Promise(resolve => {
    // 모바일에서는 리플 이펙트가 없으므로 바로 resolve
    if (isXlOrAbove === false) {
      resolve();
      return;
    }

    const windowWithRipple = window as WindowWithRipple;
    const isRippleActive = windowWithRipple.__cursorRippleActive;

    if (isRippleActive) {
      // ripple이 이미 시작되었으므로 완료 이벤트만 기다림
      const rippleEndHandler = () => {
        window.removeEventListener('cursor-ripple-end', rippleEndHandler);
        resolve();
      };
      window.addEventListener('cursor-ripple-end', rippleEndHandler);
    } else {
      // ripple이 없거나 아직 시작되지 않음
      let isResolved = false;
      let checkFrame: number | null = null;

      const handleRippleStart = () => {
        // 시작 이벤트 리스너 제거 및 체크 프레임 취소
        window.removeEventListener('cursor-ripple-start', handleRippleStart);
        if (checkFrame !== null) {
          cancelAnimationFrame(checkFrame);
          checkFrame = null;
        }
        if (isResolved) return;

        // ripple 시작 후 완료 이벤트를 기다림
        const endHandler = () => {
          window.removeEventListener('cursor-ripple-end', endHandler);
          if (!isResolved) {
            isResolved = true;
            resolve();
          }
        };
        window.addEventListener('cursor-ripple-end', endHandler);
      };

      window.addEventListener('cursor-ripple-start', handleRippleStart);

      // 다음 이벤트 루프에서 체크 (ripple 시작이 아직 발생하지 않았을 수 있음)
      checkFrame = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const stillInactive = !(window as WindowWithRipple)
            .__cursorRippleActive;

          if (stillInactive) {
            // 여전히 ripple이 없으면 시작 이벤트 리스너 제거하고 즉시 진행
            window.removeEventListener(
              'cursor-ripple-start',
              handleRippleStart
            );
            if (!isResolved) {
              isResolved = true;
              resolve();
            }
          }
          // ripple이 시작되었으면 handleRippleStart가 처리할 것
        });
      });
    }
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
  router: { push: (url: string) => void },
  url: string,
  useDefaultTransition: boolean,
  transitionType: string,
  addTransitionType: (type: string) => void,
  startTransition: (callback: () => void) => void
) => {
  if (!url || typeof url !== 'string') {
    return;
  }

  if (useDefaultTransition) {
    startTransition(() => {
      addTransitionType(transitionType);
      router.push(url);
    });
  } else {
    router.push(url);
  }
};
