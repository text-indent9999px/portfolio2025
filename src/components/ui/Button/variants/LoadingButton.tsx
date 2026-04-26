'use client';

import React from 'react';
import Button from '../Button';
import type { CustomButtonProps } from '../Button.types';
import styles from './LoadingButton.module.scss';

export interface LoadingButtonProps extends CustomButtonProps {
  loading?: boolean;
  loadingLabel?: string;
  tone?: 'auto' | 'light' | 'dark';
}

const LoadingSpinner: React.FC<{ tone?: 'auto' | 'light' | 'dark' }> = ({
  tone = 'auto',
}) => {
  const useLight = tone === 'light';
  return (
    <span className={styles.loader} aria-hidden="true">
      <span className={`${styles.dot} ${useLight ? styles.light : ''}`} />
      <span className={`${styles.dot} ${useLight ? styles.light : ''}`} />
      <span className={`${styles.dot} ${useLight ? styles.light : ''}`} />
    </span>
  );
};

const LoadingButton: React.FC<LoadingButtonProps> = ({
  loading = false,
  loadingLabel,
  tone = 'auto',
  children,
  icon,
  onClick,
  style,
  ...props
}) => {
  const handleClick = loading
    ? (e?: React.MouseEvent<HTMLButtonElement>) => {
        // 로딩 중에는 클릭 무시
        e?.preventDefault();
        e?.stopPropagation();
      }
    : onClick;

  const loadingStyles: React.CSSProperties | undefined = loading
    ? {
        cursor: 'progress',
        opacity: 0.9,
      }
    : undefined;

  return (
    <Button
      {...props}
      onClick={handleClick}
      aria-busy={loading || undefined}
      aria-disabled={loading || undefined}
      cursorTrigger={!loading}
      style={{ ...style, ...loadingStyles }}
    >
      {loading ? (
        <>
          <LoadingSpinner tone={tone} />
          {loadingLabel ? <span className="ml-2">{loadingLabel}</span> : null}
        </>
      ) : (
        <>
          {icon}
          {children}
        </>
      )}
    </Button>
  );
};

export default LoadingButton;
