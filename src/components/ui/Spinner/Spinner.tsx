import React from 'react';
import styles from './Spinner.module.scss';
import type { SpinnerProps } from './Spinner.types.js';

// 색상 상수
const NORMAL_COLOR = 'var(--color-surface-level-max)';
const INVERTED_COLOR = 'var(--color-surface-level-min)';

// 사이즈 매핑
const BASE_SIZE = {
  sm: 3,
  md: 4,
  lg: 5,
} as const;

// 애니메이션 지속시간 패턴
const DURATION_PATTERN = [1.1, 1.05, 1.15];

// 텍스트 사이즈 매핑
const TEXT_SIZES = {
  sm: '12px',
  md: '14px',
  lg: '16px',
} as const;

const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  type = 'normal',
  className,
  showText = false,
  text = ` Loading...`,
  ...props
}) => {
  // 공 색상 계산
  const ballColor = React.useMemo(() => {
    return type === 'inverted' ? INVERTED_COLOR : NORMAL_COLOR;
  }, [type]);

  // 공 스타일 계산 함수 (useMemo로 최적화)
  const getBallAnimation = React.useCallback(
    (index: number) => {
      // 규칙: 짝수 인덱스는 moveTop, 홀수 인덱스는 moveDown
      const isEven = index % 2 === 0;
      const animationName = isEven ? 'move-top' : 'move-down';

      // 애니메이션 지속시간 패턴: 1.1, 1.05, 1.15 반복, 마지막은 1
      const isLastIndex = index === 6; // 7개 공이므로 마지막 인덱스는 6
      const duration = isLastIndex ? 1 : DURATION_PATTERN[index % 3];
      const ballSize = BASE_SIZE[size] * 2;

      return {
        className: `rounded-full ${animationName}`,
        style: {
          '--bounce-distance': `${ballSize}px`,
          width: `${ballSize}px`,
          height: `${ballSize}px`,
          backgroundColor: ballColor,
          animation: `${styles[animationName]} ${duration}s infinite ease-in-out`,
        },
      };
    },
    [size, ballColor]
  );

  const Ball = React.memo(({ index }: { index: number }) => {
    const { className, style } = getBallAnimation(index);
    return <div className={className} style={style}></div>;
  });
  Ball.displayName = 'Ball';

  // 컨테이너 gap 계산
  const containerGap = React.useMemo(() => {
    return `${BASE_SIZE[size] * 2}px`;
  }, [size]);

  // 텍스트 스타일 계산
  const textStyle = React.useMemo<React.CSSProperties>(() => {
    return {
      color: ballColor,
      marginTop: `${BASE_SIZE[size] * 8}px`,
      animation: `${styles['text-pulse']} 2s infinite ease-in-out`,
      fontSize: TEXT_SIZES[size],
      fontFamily: `var(--quicksand)`,
      fontWeight: '500',
      whiteSpace: 'pre-wrap',
    };
  }, [ballColor, size]);

  // 전체 className 병합
  const mergedClassName = React.useMemo(() => {
    return [
      'flex',
      'flex-col',
      'items-center',
      'justify-center',
      'relative',
      className,
    ]
      .filter(Boolean)
      .join(' ');
  }, [className]);

  const Text = React.memo(() => {
    return (
      <div
        className="font-regular tracking-tight text-center opacity-80"
        style={textStyle}
      >
        {text}
      </div>
    );
  });
  Text.displayName = 'Text';

  return (
    <div className={mergedClassName} {...props}>
      <div
        className="relative flex items-center justify-center"
        style={{ gap: containerGap }}
      >
        {Array.from({ length: 7 }).map((_, index) => (
          <Ball key={index} index={index} />
        ))}
      </div>
      {showText && <Text />}
    </div>
  );
};

export default Spinner;
