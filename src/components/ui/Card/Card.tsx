import React from 'react';
import { cn } from '@/utils/cn';
import {
  getBorderClass,
  getClickableStyles,
  getElevationClass,
  getGridClasses,
  getInlineStyle,
  getPaddingClass,
  getSurfaceBackgroundClass,
} from './Card.config';
import styles from './Card.module.scss';
import CardBody from './CardBody';
import CardFooter from './CardFooter';
import CardHeader from './CardHeader';
import CardThumb from './CardThumb';

import type { CardActivationEvent, CardProps } from './Card.types';

const Card: React.FC<CardProps> = ({
  slots,
  thumbAspect,
  thumbClassName,
  appearance = 'solid',
  elevation = appearance === 'outline' ? 0 : 1,
  surfaceLevel = appearance === 'outline' ? 'min' : 1,
  className = '',
  padding = 'md',
  onClick,
  interactiveLabel,
  cursorTrigger = false,
  ratio,
  thumbPosition,
  gap,
  style: styleProp,
  'aria-label': ariaLabelProp,
  ...rest
}) => {
  const cardRef = React.useRef<HTMLDivElement>(null);

  const isClickable = !!onClick;

  const clickableStyles = getClickableStyles(isClickable);

  const hasHeader = slots.header != null;
  const hasFooter = slots.footer != null;
  const hasThumb = slots.thumb != null;

  const gridClasses = React.useMemo(() => {
    return getGridClasses(
      styles,
      hasThumb,
      hasHeader,
      hasFooter,
      thumbPosition
    );
  }, [hasThumb, hasHeader, hasFooter, thumbPosition]);

  const elevationClass = getElevationClass(elevation);

  const surfaceBackgroundClass = getSurfaceBackgroundClass(surfaceLevel);

  const finalClasses = React.useMemo(() => {
    const paddingClass = getPaddingClass(padding);
    const borderClass = getBorderClass(appearance, surfaceLevel);

    return cn(
      'rounded-lg',
      'transition-all duration-400',
      paddingClass,
      borderClass,
      elevationClass,
      surfaceBackgroundClass,
      clickableStyles,
      gridClasses,
      className
    );
  }, [
    padding,
    appearance,
    surfaceLevel,
    elevationClass,
    surfaceBackgroundClass,
    clickableStyles,
    gridClasses,
    className,
  ]);

  const inlineStyle = React.useMemo(
    () => ({
      ...getInlineStyle(ratio, gap, thumbPosition),
      ...styleProp,
    }),
    [ratio, gap, thumbPosition, styleProp]
  );

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

  const handleClick = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!onClick) return;

      const target = e.target;
      if (!(target instanceof HTMLElement)) return;

      const cardElement = cardRef.current;
      if (!cardElement) return;

      if (isInternalButtonClick(target, cardElement)) {
        return;
      }

      onClick(e as CardActivationEvent);
    },
    [onClick, isInternalButtonClick]
  );

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (!onClick) return;
      if (e.target !== e.currentTarget) return;
      if (e.key !== 'Enter' && e.key !== ' ') return;
      e.preventDefault();
      onClick(e as CardActivationEvent);
    },
    [onClick]
  );

  const sectionContent = (
    <>
      {hasHeader && <CardHeader>{slots.header}</CardHeader>}
      {hasThumb && (
        <CardThumb aspect={thumbAspect} className={thumbClassName}>
          {slots.thumb}
        </CardThumb>
      )}
      {slots.body != null && <CardBody>{slots.body}</CardBody>}
      {hasFooter && <CardFooter>{slots.footer}</CardFooter>}
    </>
  );

  return (
    <div
      {...rest}
      ref={cardRef}
      data-cursor={isClickable ? 'hover' : 'default'}
      data-cursor-ripple={cursorTrigger && isClickable ? true : false}
      className={finalClasses}
      style={inlineStyle}
      onClick={handleClick}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      aria-label={isClickable ? interactiveLabel : ariaLabelProp}
      onKeyDown={isClickable ? handleKeyDown : undefined}
    >
      {sectionContent}
    </div>
  );
};

Card.displayName = 'Card';

export default Card;
