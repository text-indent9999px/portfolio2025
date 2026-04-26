'use client';

import React, { useEffect, useId, useRef } from 'react';

import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { cn } from '@/utils/cn';

import CustomButton from '../Button';
import styles from './Tooltip.module.scss';
import type { TooltipProps } from './Tooltip.types';

export const Tooltip: React.FC<TooltipProps> = ({
  isVisible,
  children,
  id: idProp,
  className = '',
  showCloseButton = false,
  onClose,
  closeOnOutsideClick = false,
  arrow = false,
  tooltipPosition = 'top',
  arrowPosition = 'center',
  inverted = false,
  offset,
}) => {
  const generatedId = useId();
  const tooltipId = idProp ?? generatedId;
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!closeOnOutsideClick || !isVisible) return;

    /** `mousedown`와 함께 쓰지 않음: 마우스는 pointer → mouse 순으로 두 번 떨어져 `onClose`가 중복 호출될 수 있음. `pointerdown`으로 마우스·터치·펜을 한 경로에서 처리. */
    const handlePointerDownOutside = (event: PointerEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node)
      ) {
        onClose?.();
      }
    };

    document.addEventListener('pointerdown', handlePointerDownOutside);
    return () =>
      document.removeEventListener('pointerdown', handlePointerDownOutside);
  }, [closeOnOutsideClick, isVisible, onClose]);

  const offsetStyle: React.CSSProperties | undefined = offset
    ? {
        marginTop: offset.top,
        marginRight: offset.right,
        marginBottom: offset.bottom,
        marginLeft: offset.left,
      }
    : undefined;

  const mergedClassName = cn(
    styles.tooltip,
    'absolute',
    styles[`tooltip-${tooltipPosition}`],
    inverted
      ? 'bg-surface-level-min text-text-primary'
      : 'bg-surface-level-max text-text-inverse',
    'px-3 py-2 rounded-lg shadow-lg text-sm whitespace-nowrap z-50',
    arrow && styles.arrow,
    arrow && styles[`arrow-${arrowPosition}`],
    className
  );

  if (!isVisible) return null;

  return (
    <div
      ref={tooltipRef}
      id={tooltipId}
      role="tooltip"
      className={mergedClassName}
      style={offsetStyle}
    >
      <div className={styles.content}>
        <span className="flex-1 whitespace-pre">{children}</span>
        {showCloseButton && onClose && (
          <CustomButton
            variant="soft"
            color="brand"
            size="xs"
            aria-label="닫기"
            rounded="circle"
            icon={<FontAwesomeIcon icon={faXmark} />}
            className="mb-auto mt-[1px] w-[1.3rem] h-[1.3rem] translate-y-[-1px] translate-x-[3px]"
            cursorTrigger={false}
            onClick={onClose}
          />
        )}
      </div>
    </div>
  );
};
