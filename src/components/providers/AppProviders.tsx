import { ReactNode } from 'react';
import { DeviceProvider } from '../../contexts/DeviceContext';
import { NavigationProvider } from '../../contexts/NavigationContext';
import { ErrorBoundary } from '../errorBoundary';

interface AppProvidersProps {
  children: ReactNode;
}

/**
 * 앱 전체에서 사용하는 모든 Provider를 묶는 컴포넌트
 * Provider 순서는 중요합니다 (의존성 순서대로 배치)
 */
export function AppProviders({ children }: AppProvidersProps) {
  return (
    <DeviceProvider>
      <NavigationProvider>
        <ErrorBoundary>{children}</ErrorBoundary>
      </NavigationProvider>
    </DeviceProvider>
  );
}
