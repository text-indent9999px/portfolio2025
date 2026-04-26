'use client';

import React from 'react';
import { cn } from '@/utils/cn';
import { useRouter } from '../../../utils/router';
import { DISABLED_CLASSES, getColorClasses } from '../shared/UI.config';
import {
  BASE_CLASSES,
  EQUAL_RATIO_CLASSES,
  ROUNDED_CLASSES,
  SIZE_CLASSES,
} from './Button.config';
import { buildClickHandler } from './Button.handlers';
import styles from './Button.module.scss';
import { CustomButtonProps } from './Button.types';

const BUTTON_ACTIVE_CLASSES =
  'active:scale-95 active:transition-transform active:duration-100';

const CustomButton: React.FC<CustomButtonProps> = ({
  icon,
  iconPosition = 'left',
  ariaLabel,
  href,
  dataCursor = '',
  size = 'md',
  variant = 'solid',
  color = 'brand',
  rounded = 'none',
  interactive = true,
  cursorTrigger = false,
  className,
  children,
  onClick,
  fullWidth = false,
  disabled = false,
  ...props
}) => {
  const isIconOnly = !!icon && !children;

  let navigateToUrl, navigateBack;

  try {
    const router = useRouter();
    navigateToUrl = router.navigateToUrl;
    navigateBack = router.navigateBack;
  } catch {
    // Storybook 환경에서 useRouter가 실패할 경우 기본 동작 사용
    navigateToUrl = ({ url }: { url: string }) => {
      if (typeof window !== 'undefined') {
        window.location.href = url;
      }
    };
    navigateBack = () => {
      if (typeof window !== 'undefined') {
        window.history.back();
      }
    };
  }

  const handleClick = buildClickHandler({
    disabled: disabled,
    href,
    onClick,
    navigateBack,
    navigateToUrl,
  });

  const buttonClasses = React.useMemo(() => {
    return cn(
      BASE_CLASSES,
      ROUNDED_CLASSES[rounded],
      rounded === 'circle' || isIconOnly
        ? EQUAL_RATIO_CLASSES[size]
        : SIZE_CLASSES[size],
      disabled
        ? DISABLED_CLASSES[variant]
        : getColorClasses(color, variant, interactive),
      !disabled && interactive && BUTTON_ACTIVE_CLASSES
    );
  }, [rounded, isIconOnly, size, disabled, variant, color, interactive]);

  const mergedClassName = React.useMemo(() => {
    return cn(
      buttonClasses,
      styles.button,
      styles[color],
      fullWidth && 'w-full',
      className
    );
  }, [buttonClasses, color, fullWidth, className]);

  const iconElement = React.useMemo(() => {
    if (!icon) return null;
    return <span className={styles.icon}>{icon}</span>;
  }, [icon]);

  // whiteSpace className 결정
  const labelWhiteSpaceClass =
    rounded === 'circle' ? 'whitespace-normal' : 'whitespace-nowrap';

  return (
    <button
      className={mergedClassName}
      type="button"
      data-size={size}
      data-cursor={disabled ? undefined : dataCursor}
      data-cursor-ripple={cursorTrigger && !disabled ? 'true' : 'false'}
      aria-label={isIconOnly ? ariaLabel : undefined}
      disabled={disabled}
      onClick={handleClick}
      {...props}
    >
      {iconPosition === 'left' && iconElement}
      {children && (
        <span className={cn(styles.label, labelWhiteSpaceClass)}>
          {children}
        </span>
      )}
      {iconPosition === 'right' && iconElement}
    </button>
  );
};

export default CustomButton;
