import React from 'react';
import { cn } from '@/utils/cn';
import { getRadiusClass } from '../shared/UI.config';
import { getVariantStyles } from '../shared/getVariantStyles';
import { BadgeProps } from './Badge.types';
import {
  getAnchorStyle,
  getLiveAttrs,
  getMaxWidthStyle,
  getOffsetMarginStyle,
  getPositionClasses,
  getSizeClasses,
  mapBadgeShapeToRadius,
  resolveDisplayContent,
} from './Badge.utils';

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'solid',
  color = 'brand',
  size = 'md',
  shape = 'circle',
  count,
  maxCount = 99,
  showZero = false,
  ariaLabel,
  ariaLive = 'off',
  maxWidth,
  position = 'static',
  anchor,
  offset,
  icon,
  iconPosition = 'left',
  className = '',
}) => {
  const isCircle = shape === 'circle';

  // Variant 스타일 계산
  const variantStyles = React.useMemo(() => {
    return getVariantStyles(variant, color, false);
  }, [variant, color]);

  const mergedClassName = React.useMemo(
    () =>
      cn(
        'inline-flex items-center justify-center font-semibold leading-none align-middle border-2 select-none cursor-default',
        variantStyles,
        getRadiusClass(mapBadgeShapeToRadius(shape)),
        getSizeClasses(size, shape),
        !isCircle && 'whitespace-nowrap truncate gap-1.5',
        getPositionClasses(position),
        className
      ),
    [variantStyles, size, shape, isCircle, position, className]
  );

  const inlineStyle = React.useMemo(() => {
    return {
      ...getMaxWidthStyle(shape, maxWidth),
      ...getAnchorStyle(position, anchor),
      ...getOffsetMarginStyle(offset),
    };
  }, [position, anchor, shape, maxWidth, offset]);

  // 아이콘 요소 렌더링
  const iconElement = React.useMemo(() => {
    if (!icon) return null;
    return <span className="inline-flex items-center">{icon}</span>;
  }, [icon]);

  // 표시할 콘텐츠(없으면 렌더 스킵)
  const displayContent = resolveDisplayContent(
    count,
    maxCount,
    showZero,
    children
  );
  if (displayContent === null) return null;

  const liveAttrs = getLiveAttrs(ariaLive);

  return (
    <div
      className={mergedClassName}
      style={inlineStyle}
      aria-label={ariaLabel}
      {...liveAttrs}
    >
      {iconPosition === 'left' && iconElement}
      <span
        className={cn('inline-flex items-center', isCircle && 'text-[0.8em]')}
      >
        {displayContent}
      </span>
      {iconPosition === 'right' && iconElement}
    </div>
  );
};

export default Badge;
