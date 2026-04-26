'use client';

import React from 'react';
import { cn } from '@/utils/cn';
import { Tooltip } from '../Tooltip';
import { ColorChipProps } from './ColorChip.types';
import {
  resolveColorType,
  useColorValue,
  useHoverState,
} from './ColorChip.utils';

// 크기별 스타일
const SIZE_STYLES = {
  sm: 'w-10 h-10',
  md: 'w-12 h-12',
  lg: 'w-20 h-20',
} as const;

// 모양별 스타일
const VARIANT_STYLES = {
  circle: 'rounded-full',
  square: 'rounded-md',
} as const;

function tooltipLabel(
  tone: ColorChipProps['tone'],
  resolvedColorType: string,
  shade: string | number
): string {
  if (!tone) {
    return `${resolvedColorType}-${shade}`;
  }
  return `${tone} -> ${resolvedColorType}-${shade}`;
}

const ColorChip: React.FC<ColorChipProps> = ({
  colorType,
  tone,
  shade,
  variant = 'circle',
  size = 'md',
  className = '',
}) => {
  const resolvedColorType = resolveColorType(tone, colorType);
  const hexCode = useColorValue(resolvedColorType, shade);
  const { isHovered, handleMouseEnter, handleMouseLeave } = useHoverState();
  const tooltipId = React.useId();

  const hoverStyles = isHovered
    ? 'scale-125 shadow-lg z-50'
    : 'hover:scale-110';

  return (
    <div className="relative">
      <div
        className={cn(
          SIZE_STYLES[size],
          VARIANT_STYLES[variant],
          'border-2 border-gray-200 shadow-sm transition-all duration-300 cursor-pointer',
          hoverStyles,
          className
        )}
        style={{
          backgroundColor: `var(--color-${resolvedColorType}-${shade})`,
          zIndex: isHovered ? 50 : 1,
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />

      <Tooltip
        id={tooltipId}
        isVisible={isHovered}
        arrow={true}
        arrowPosition="center"
        tooltipPosition="bottom"
        offset={{ top: '10px' }}
      >
        <div className="font-medium">
          {tooltipLabel(tone, resolvedColorType, shade)}
        </div>
        <div className="text-xs opacity-80">{hexCode}</div>
      </Tooltip>
    </div>
  );
};

export default ColorChip;
