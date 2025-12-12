'use client';

import React from 'react';
import { useRouter } from '../../../utils/router';
import { DISABLED_CLASSES, getColorClasses } from '../shared/UI.config';
import { BASE_CLASSES, STYLE_CLASSES } from './Button.config';
import { buildClickHandler } from './Button.handlers';
import styles from './Button.module.scss';
import { CustomButtonProps } from './Button.types';

const CustomButton: React.FC<CustomButtonProps> = ({
  icon,
  iconPosition = 'left',
  ariaLabel,
  href,
  dataCursor = '',
  size = 'md',
  variant = 'filled',
  color = 'primary',
  rounded = 'none',
  noHoverActive = false,
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

  // 버튼 클래스 생성
  const buttonClasses = React.useMemo(() => {
    const classList = [
      BASE_CLASSES,
      STYLE_CLASSES.rounded[rounded],
      rounded === 'circle' || isIconOnly
        ? STYLE_CLASSES.equalRatio[size]
        : STYLE_CLASSES.size[size],
    ];

    if (disabled) {
      classList.push(DISABLED_CLASSES[variant]);
    } else {
      const colorClasses = getColorClasses(color, variant, noHoverActive);
      classList.push(colorClasses);
    }

    return classList.filter(Boolean).join(' ');
  }, [rounded, isIconOnly, size, disabled, variant, color, noHoverActive]);

  // 전체 className 병합
  const mergedClassName = React.useMemo(() => {
    return [
      buttonClasses,
      styles.button,
      styles[color],
      fullWidth ? 'w-full' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');
  }, [buttonClasses, color, fullWidth, className]);

  // 아이콘 요소 렌더링
  const iconElement = React.useMemo(() => {
    if (!icon) return null;

    return iconPosition === 'left' ? (
      <span className={styles.icon}>{icon}</span>
    ) : (
      <span className="inline-flex items-center">{icon}</span>
    );
  }, [icon, iconPosition]);

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
        <span className={`${styles.label} ${labelWhiteSpaceClass}`}>
          {children}
        </span>
      )}
      {iconPosition === 'right' && iconElement}
    </button>
  );
};

export default CustomButton;
