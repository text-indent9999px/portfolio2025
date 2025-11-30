import React from 'react';
import { getRadiusClass } from '../shared/UI.config';
import { getVariantStyles } from '../shared/getVariantStyles';
import { BadgeProps } from './Badge.types';
import {
  getAnchorStyle,
  getLiveAttrs,
  getMaxWidthStyle,
  getPositionClasses,
  getSizeClasses,
  mapBadgeShapeToRadius,
  resolveDisplayContent,
} from './Badge.utils';

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'filled',
  color = 'primary',
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
    return getVariantStyles(variant, color);
  }, [variant, color]);

  // 전체 className 병합
  const mergedClassName = React.useMemo(() => {
    const positionClass = getPositionClasses(position);
    const sizeClass = getSizeClasses(size, shape);
    const radiusClass = getRadiusClass(mapBadgeShapeToRadius(shape));
    const whitespaceClass = !isCircle
      ? 'whitespace-nowrap truncate gap-1.5'
      : '';

    return [
      'inline-flex',
      'items-center',
      'justify-center',
      'font-semibold',
      'leading-none',
      'align-middle',
      'border-2',
      variantStyles,
      radiusClass,
      sizeClass,
      whitespaceClass,
      positionClass,
      className,
    ]
      .filter(Boolean)
      .join(' ');
  }, [variantStyles, size, shape, isCircle, position, className]);

  // 인라인 스타일 병합
  const inlineStyle = React.useMemo(() => {
    const anchorStyle = getAnchorStyle(position, anchor);
    const maxWidthStyle = getMaxWidthStyle(shape, maxWidth);
    const offsetStyle: React.CSSProperties = {
      ...(offset?.top ? { marginTop: offset.top } : {}),
      ...(offset?.right ? { marginRight: offset.right } : {}),
      ...(offset?.bottom ? { marginBottom: offset.bottom } : {}),
      ...(offset?.left ? { marginLeft: offset.left } : {}),
    };

    return {
      ...maxWidthStyle,
      ...anchorStyle,
      ...offsetStyle,
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
        className={`inline-flex items-center ${
          shape === 'circle' ? 'text-[0.8em]' : ''
        }`}
      >
        {displayContent}
      </span>
      {iconPosition === 'right' && iconElement}
    </div>
  );
};

export default Badge;
