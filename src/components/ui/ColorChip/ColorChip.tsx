import React from 'react';
import { Tooltip } from '../Tooltip';
import { ColorChipProps } from './ColorChip.types';
import { useColorValue, useHoverState } from './ColorChip.utils';

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

const ColorChip: React.FC<ColorChipProps> = ({
  colorType,
  shade,
  variant = 'circle',
  size = 'md',
  className = '',
}) => {
  const hexCode = useColorValue(colorType, shade);
  const { isHovered, handleMouseEnter, handleMouseLeave } = useHoverState();

  // hover 효과 계산
  const hoverStyles = React.useMemo(() => {
    return isHovered ? 'scale-125 shadow-lg z-50' : 'hover:scale-110';
  }, [isHovered]);

  // 전체 className 병합
  const mergedClassName = React.useMemo(() => {
    return [
      SIZE_STYLES[size],
      VARIANT_STYLES[variant],
      'border-2',
      'border-gray-200',
      'shadow-sm',
      'transition-all',
      'duration-300',
      'cursor-pointer',
      hoverStyles,
      className,
    ]
      .filter(Boolean)
      .join(' ');
  }, [size, variant, hoverStyles, className]);

  // 인라인 스타일 계산
  const inlineStyle = React.useMemo<React.CSSProperties>(() => {
    return {
      backgroundColor: `var(--color-${colorType}-${shade})`,
      zIndex: isHovered ? 50 : 1,
    };
  }, [colorType, shade, isHovered]);

  return (
    <div className="relative">
      <div
        className={mergedClassName}
        style={inlineStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />

      <Tooltip
        isVisible={isHovered}
        arrow={true}
        arrowPosition="center"
        tooltipPosition="bottom"
        offset={{ top: '10px' }}
      >
        <div className="font-medium">
          {colorType}-{shade}
        </div>
        <div className="text-xs opacity-80">{hexCode}</div>
      </Tooltip>
    </div>
  );
};

export default ColorChip;
