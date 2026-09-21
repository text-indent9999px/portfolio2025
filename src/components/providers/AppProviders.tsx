import { ReactNode } from 'react';
import { DeviceProvider } from '../../contexts/DeviceContext';
import { ErrorBoundary } from '../errorBoundary';

interface AppProvidersProps {
  children: ReactNode;
}

/** 앱 전체에서 사용하는 Provider를 묶는 컴포넌트 */
export function AppProviders({ children }: AppProvidersProps) {
  return (
    <DeviceProvider>
      <ErrorBoundary>{children}</ErrorBoundary>
    </DeviceProvider>
  );
}
