import React from 'react';
import {
  getBorderClass,
  getClickableStyles,
  getElevationClass,
  getGridClasses,
  getInlineStyle,
  getPaddingClass,
  getSurfaceBackgroundClass,
  getVariantClass,
} from './Card.config';
import styles from './Card.module.scss';
import CardBody from './CardBody';
import CardFooter from './CardFooter';
import CardHeader from './CardHeader';
import CardThumb from './CardThumb';

import { CardCompound } from './Card.types';

const Card: CardCompound = ({
  children,
  variant = 'default',
  elevation = variant === 'outlined' ? 0 : 1,
  surfaceLevel = variant === 'outlined' ? 'min' : 1,
  className = '',
  padding = 'md',
  onClick,
  clickable = false,
  cursorTrigger = false,
  ratio,
  thumbPosition,
  gap,
}) => {
  // 클릭 가능 여부 계산
  const isClickable = clickable || !!onClick;

  // 클릭 가능한 스타일 계산
  const clickableStyles = getClickableStyles(isClickable);

  // 컴파운드 섹션 존재 여부 감지
  const { hasHeader, hasFooter, hasThumb } = React.useMemo(() => {
    const childArray = React.Children.toArray(children);
    // React.ReactElement 타입 가드
    const isReactElement = (
      child: React.ReactNode
    ): child is React.ReactElement => {
      return (
        typeof child === 'object' &&
        child !== null &&
        'type' in child &&
        'props' in child
      );
    };

    const reactElements = childArray.filter(isReactElement);
    return {
      hasHeader: reactElements.some(c => c.type === CardHeader),
      hasFooter: reactElements.some(c => c.type === CardFooter),
      hasThumb: reactElements.some(c => c.type === CardThumb),
    };
  }, [children]);

  // Grid 클래스 계산
  const gridClasses = React.useMemo(() => {
    return getGridClasses(
      styles,
      hasThumb,
      hasHeader,
      hasFooter,
      thumbPosition
    );
  }, [hasThumb, hasHeader, hasFooter, thumbPosition]);

  // Elevation 스타일 계산
  const elevationClass = getElevationClass(elevation);

  // Surface background 계산
  const surfaceBackgroundClass = getSurfaceBackgroundClass(surfaceLevel);

  // 전체 className 병합
  const finalClasses = React.useMemo(() => {
    const paddingClass = getPaddingClass(padding);
    const variantClass = getVariantClass(variant);
    const borderClass = getBorderClass(variant, surfaceLevel);

    return [
      variant === 'outlined' ? 'border' : '',
      'rounded-lg',
      'transition-all duration-400',
      paddingClass,
      variantClass,
      borderClass,
      elevationClass,
      surfaceBackgroundClass,
      clickableStyles,
      gridClasses,
      className,
    ]
      .filter(Boolean)
      .join(' ');
  }, [
    padding,
    variant,
    surfaceLevel,
    elevationClass,
    surfaceBackgroundClass,
    clickableStyles,
    gridClasses,
    className,
  ]);

  // 인라인 스타일 계산
  const inlineStyle = getInlineStyle(ratio, gap, thumbPosition);

  // 내부 button 요소 클릭인지 체크
  const isInternalButtonClick = React.useCallback(
    (
      element: HTMLElement | null,
      parentElement: HTMLElement | null
    ): boolean => {
      if (!element) return false;
      if (!parentElement) return false;
      if (element === parentElement) return false;
      const closestButton =
        element.closest('button') ?? element.closest('[role="button"]');

      if (closestButton === parentElement) return false;
      if (!closestButton) return false;
      return true;
    },
    []
  );

  // 클릭 핸들러: 내부 button 요소는 제외
  const handleClick = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!onClick) return;
      if (!clickable) return;

      // 타입 가드: EventTarget을 HTMLElement로 안전하게 변환
      const target = e.target;
      if (!(target instanceof HTMLElement)) return;

      const cardElement = cardRef.current;
      if (!cardElement) return;

      if (isInternalButtonClick(target, cardElement)) {
        return;
      }

      onClick();
    },
    [onClick, isInternalButtonClick, clickable]
  );

  // Card ref
  const cardRef = React.useRef<HTMLDivElement>(null);

  return (
    <div
      ref={cardRef}
      data-cursor={isClickable ? 'hover' : 'default'}
      data-cursor-ripple={cursorTrigger && isClickable ? true : false}
      className={finalClasses}
      style={inlineStyle}
      onClick={handleClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
      {children}
    </div>
  );
};

// Compound 패턴을 위한 섹션 컴포넌트 할당
Card.Header = CardHeader;
Card.Thumb = CardThumb;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
