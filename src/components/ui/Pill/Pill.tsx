import React from 'react';

import { cn } from '@/utils/cn';
import { getRadiusClass } from '../shared/UI.config';
import { getVariantStyles } from '../shared/getVariantStyles';
import type { PillProps } from './Pill.types';

function sizeClassFor(size: NonNullable<PillProps['size']>): string {
  switch (size) {
    case 'xs':
      return 'px-2 py-0.5 text-2xs';
    case 'sm':
      return 'px-3 py-1 text-xs';
    case 'lg':
      return 'px-5 py-2 text-base';
    default:
      return 'px-4 py-1 text-sm';
  }
}

const Pill: React.FC<PillProps> = ({
  children,
  variant = 'solid',
  color = 'brand',
  size = 'md',
  rounded = 'pill',
  className = '',
}) => {
  const variantStyles = getVariantStyles(variant, color, false);
  const sizeStyles = sizeClassFor(size);
  const roundedClass = getRadiusClass(rounded);

  return (
    <span
      className={cn(
        'inline-flex items-center font-semibold border-2 select-none cursor-default',
        variantStyles,
        sizeStyles,
        roundedClass,
        className
      )}
    >
      {children}
    </span>
  );
};

export default Pill;
