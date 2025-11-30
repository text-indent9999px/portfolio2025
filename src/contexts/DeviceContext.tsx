'use client';

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

type DeviceType = 'mobile' | 'tablet' | 'desktop';

interface DeviceContextType {
  device: DeviceType;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  // 브레이크포인트 헬퍼 함수들
  isMdOrAbove: boolean; // >= 48rem
  isLgOrAbove: boolean; // >= 64rem
  isXlOrAbove: boolean; // >= 80rem
  is2XlOrAbove: boolean; // >= 96rem
}

const DeviceContext = createContext<DeviceContextType | null>(null);

/**
 * CSS 변수 --device를 읽어서 현재 디바이스 타입을 반환
 */
const getDeviceFromCSS = (): DeviceType => {
  if (typeof window === 'undefined') return 'mobile';

  const device = getComputedStyle(document.documentElement)
    .getPropertyValue('--device')
    .trim();

  // CSS 변수 값이 'tablet' 또는 'desktop'이면 해당 값, 아니면 'mobile'
  if (device === 'tablet' || device === 'desktop') {
    return device;
  }
  return 'mobile';
};

export function DeviceProvider({ children }: { children: ReactNode }) {
  // Hydration mismatch 방지: 서버와 클라이언트 모두 동일한 초기값 사용
  const [device, setDevice] = useState<DeviceType>('mobile');
  const [breakpoints, setBreakpoints] = useState({
    isMdOrAbove: false,
    isLgOrAbove: false,
    isXlOrAbove: false,
    is2XlOrAbove: false,
  });
  const previousBreakpointsRef = useRef(breakpoints);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const breakpointQueries = {
      isMdOrAbove: window.matchMedia('(min-width: 48rem)'),
      isLgOrAbove: window.matchMedia('(min-width: 64rem)'),
      isXlOrAbove: window.matchMedia('(min-width: 80rem)'),
      is2XlOrAbove: window.matchMedia('(min-width: 96rem)'),
    };

    const updateDevice = () => {
      // 리플로우 방지를 위해 requestAnimationFrame으로 감싸기
      requestAnimationFrame(() => {
        const newDevice = getDeviceFromCSS();
        setDevice(prev => (prev === newDevice ? prev : newDevice));
      });
    };

    const updateBreakpoints = () => {
      const nextBreakpoints = {
        isMdOrAbove: breakpointQueries.isMdOrAbove.matches,
        isLgOrAbove: breakpointQueries.isLgOrAbove.matches,
        isXlOrAbove: breakpointQueries.isXlOrAbove.matches,
        is2XlOrAbove: breakpointQueries.is2XlOrAbove.matches,
      };

      const prev = previousBreakpointsRef.current;
      const hasChanged =
        prev.isMdOrAbove !== nextBreakpoints.isMdOrAbove ||
        prev.isLgOrAbove !== nextBreakpoints.isLgOrAbove ||
        prev.isXlOrAbove !== nextBreakpoints.isXlOrAbove ||
        prev.is2XlOrAbove !== nextBreakpoints.is2XlOrAbove;

      if (hasChanged) {
        previousBreakpointsRef.current = nextBreakpoints;
        setBreakpoints(nextBreakpoints);
        updateDevice();
      }
    };

    // 클라이언트에서 실제 값으로 초기화 - 리플로우 방지를 위해 지연
    requestAnimationFrame(() => {
      updateBreakpoints();
    });

    const listeners = Object.values(breakpointQueries).map(mq => {
      const handler = () => updateBreakpoints();
      if (typeof mq.addEventListener === 'function') {
        mq.addEventListener('change', handler);
      } else {
        mq.addListener(handler);
      }
      return { mq, handler };
    });

    return () => {
      listeners.forEach(({ mq, handler }) => {
        if (typeof mq.removeEventListener === 'function') {
          mq.removeEventListener('change', handler);
        } else {
          mq.removeListener(handler);
        }
      });
    };
  }, []);

  const value: DeviceContextType = {
    device,
    isMobile: device === 'mobile',
    isTablet: device === 'tablet',
    isDesktop: device === 'desktop',
    ...breakpoints,
  };

  return (
    <DeviceContext.Provider value={value}>{children}</DeviceContext.Provider>
  );
}

export function useDevice() {
  const context = useContext(DeviceContext);
  if (!context) {
    throw new Error('useDevice must be used within DeviceProvider');
  }
  return context;
}
