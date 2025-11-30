'use client';

import { Component, ErrorInfo, ReactNode } from 'react';
import { ErrorBoundaryFallback } from './ErrorBoundaryFallback';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * React ErrorBoundary 컴포넌트
 * React 렌더링 에러와 자식 컴포넌트 트리의 에러를 잡아냅니다.
 *
 * 참고: 함수 컴포넌트는 ErrorBoundary가 될 수 없으므로 클래스 컴포넌트로 구현했습니다.
 */
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return <>{this.props.fallback}</>;
      }

      return (
        <ErrorBoundaryFallback
          error={this.state.error ?? new Error('Unknown error occurred')}
        />
      );
    }

    return <>{this.props.children}</>;
  }
}

export default ErrorBoundary;
