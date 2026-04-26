'use client';

import React from 'react';

import { cn } from '@/utils/cn';

import styles from './Spinner.module.scss';
import type { SpinnerProps, SpinnerSize } from './Spinner.types';

const NORMAL_COLOR = 'var(--color-surface-level-max)';
const INVERTED_COLOR = 'var(--color-surface-level-min)';

const BASE_SIZE: Record<SpinnerSize, number> = {
  sm: 3,
  md: 4,
  lg: 5,
};

const DURATION_PATTERN = [1.1, 1.05, 1.15] as const;

const TEXT_SIZES: Record<SpinnerSize, string> = {
  sm: '12px',
  md: '14px',
  lg: '16px',
};

const BALL_COUNT = 7;
const LAST_BALL_INDEX = BALL_COUNT - 1;

type CssModuleStyles = typeof styles;

function getBallStyle(
  index: number,
  size: SpinnerSize,
  ballColor: string,
  moduleStyles: CssModuleStyles
): { className: string; style: React.CSSProperties } {
  const isEven = index % 2 === 0;
  const animationKey = isEven ? 'move-top' : 'move-down';
  const duration =
    index === LAST_BALL_INDEX ? 1 : DURATION_PATTERN[index % 3];
  const ballSize = BASE_SIZE[size] * 2;

  return {
    className: cn('rounded-full', moduleStyles.spinnerBall),
    style: {
      ['--bounce-distance' as string]: `${ballSize}px`,
      width: `${ballSize}px`,
      height: `${ballSize}px`,
      backgroundColor: ballColor,
      animation: `${String(moduleStyles[animationKey as keyof CssModuleStyles])} ${duration}s infinite ease-in-out`,
    } as React.CSSProperties,
  };
}

const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  type = 'normal',
  className,
  showText = false,
  text = 'Loading...',
  ...props
}) => {
  const ballColor = type === 'inverted' ? INVERTED_COLOR : NORMAL_COLOR;
  const containerGap = `${BASE_SIZE[size] * 2}px`;

  const textStyle: React.CSSProperties = {
    color: ballColor,
    marginTop: `${BASE_SIZE[size] * 8}px`,
    animation: `${styles['text-pulse']} 2s infinite ease-in-out`,
    fontSize: TEXT_SIZES[size],
    fontFamily: 'var(--quicksand)',
    fontWeight: '500',
    whiteSpace: 'pre-wrap',
  };

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={showText ? undefined : 'Loading'}
      className={cn(
        'flex flex-col items-center justify-center relative',
        className
      )}
      {...props}
    >
      <div
        className="relative flex items-center justify-center"
        style={{ gap: containerGap }}
        aria-hidden="true"
      >
        {Array.from({ length: BALL_COUNT }).map((_, index) => {
          const { className: ballClass, style } = getBallStyle(
            index,
            size,
            ballColor,
            styles
          );
          return <div key={index} className={ballClass} style={style} />;
        })}
      </div>
      {showText && (
        <div
          className={cn(
            'font-normal tracking-tight text-center opacity-80',
            styles.spinnerText
          )}
          style={textStyle}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default Spinner;
