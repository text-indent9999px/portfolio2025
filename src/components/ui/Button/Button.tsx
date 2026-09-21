'use client';

import Link from 'next/link';
import React from 'react';
import { cn } from '@/utils/cn';
import { DISABLED_CLASSES, getColorClasses } from '../shared/UI.config';
import {
  BASE_CLASSES,
  EQUAL_RATIO_CLASSES,
  ROUNDED_CLASSES,
  SIZE_CLASSES,
} from './Button.config';
import styles from './Button.module.scss';
import { ButtonProps } from './Button.types';

const BUTTON_ACTIVE_CLASSES =
  'active:scale-95 active:transition-transform active:duration-100';

const isWebUrl = (href: string) => /^https?:\/\//.test(href);
const isInternal = (href: string) => href.startsWith('/') || href.startsWith('#');

const Button: React.FC<ButtonProps> = ({
  icon,
  iconPosition = 'left',
  ariaLabel,
  href,
  size = 'md',
  variant = 'solid',
  color = 'brand',
  rounded = 'none',
  interactive = true,
  className,
  children,
  onClick,
  fullWidth = false,
  disabled = false,
  type = 'button',
  ...props
}) => {
  const isIconOnly = !!icon && !children;

  const mergedClassName = cn(
    BASE_CLASSES,
    ROUNDED_CLASSES[rounded],
    rounded === 'circle' || isIconOnly
      ? EQUAL_RATIO_CLASSES[size]
      : SIZE_CLASSES[size],
    disabled
      ? DISABLED_CLASSES[variant]
      : getColorClasses(color, variant, interactive),
    !disabled && interactive && BUTTON_ACTIVE_CLASSES,
    styles.button,
    styles[color],
    fullWidth && 'w-full',
    className
  );

  const iconElement = icon ? <span className={styles.icon}>{icon}</span> : null;
  const labelWhiteSpaceClass =
    rounded === 'circle' ? 'whitespace-normal' : 'whitespace-nowrap';

  const content = (
    <>
      {iconPosition === 'left' && iconElement}
      {children && (
        <span className={cn(styles.label, labelWhiteSpaceClass)}>
          {children}
        </span>
      )}
      {iconPosition === 'right' && iconElement}
    </>
  );

  if (href === undefined) {
    return (
      <button
        {...props}
        className={mergedClassName}
        type={type}
        data-size={size}
        aria-label={isIconOnly ? ariaLabel : undefined}
        disabled={disabled}
        onClick={onClick}
      >
        {content}
      </button>
    );
  }

  const linkProps = {
    className: mergedClassName,
    'data-size': size,
    'aria-label': isIconOnly ? ariaLabel : undefined,
    onClick,
  };

  // 비활성 링크는 href를 떼어 포커스·이동이 모두 막히게 한다.
  if (disabled) {
    return (
      <a {...linkProps} aria-disabled="true" role="link" onClick={undefined}>
        {content}
      </a>
    );
  }

  if (isInternal(href)) {
    return (
      <Link href={href} {...linkProps}>
        {content}
      </Link>
    );
  }

  return (
    <a
      href={href}
      {...linkProps}
      {...(isWebUrl(href) && { target: '_blank', rel: 'noopener noreferrer' })}
    >
      {content}
    </a>
  );
};

export { Button };
