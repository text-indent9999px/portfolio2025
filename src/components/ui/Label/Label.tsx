import React from 'react';
import { getRadiusClass } from '../shared/UI.config';
import { getVariantStyles } from '../shared/getVariantStyles';
import { LabelProps } from './Label.types';

const Label: React.FC<LabelProps> = ({
  children,
  variant = 'filled',
  color = 'primary',
  size = 'md',
  rounded = 'full',
  className = '',
}) => {
  // Variant 스타일 계산
  const variantStyles = React.useMemo(() => {
    return getVariantStyles(variant, color);
  }, [variant, color]);

  // Size 스타일 계산
  const sizeStyles = React.useMemo(() => {
    switch (size) {
      case 'xs':
        return 'px-2 py-0.5 text-2xs';
      case 'sm':
        return 'px-3 py-1 text-xs';
      case 'lg':
        return 'px-5 py-2 text-base';
      default: // md
        return 'px-4 py-1 text-sm';
    }
  }, [size]);

  // Rounded 클래스 계산
  const roundedClass = React.useMemo(() => {
    return getRadiusClass(rounded ?? 'full');
  }, [rounded]);

  // 전체 className 병합
  const mergedClassName = React.useMemo(() => {
    return [
      'inline-flex',
      'items-center',
      'font-semibold',
      'border-2',
      'select-none',
      'cursor-default',
      variantStyles,
      sizeStyles,
      roundedClass,
      className,
    ]
      .filter(Boolean)
      .join(' ');
  }, [variantStyles, sizeStyles, roundedClass, className]);

  return <span className={mergedClassName}>{children}</span>;
};

export default Label;
