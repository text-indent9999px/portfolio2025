'use client';

import React, { useEffect, useRef } from 'react';

import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CustomButton from '../Button';
import styles from './Tooltip.module.scss';
import { TooltipProps } from './Tooltip.types';

const Tooltip: React.FC<TooltipProps> = ({
  isVisible,
  children,
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
  const tooltipRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 감지
  useEffect(() => {
    if (!closeOnOutsideClick || !isVisible) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node)
      ) {
        onClose?.();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [closeOnOutsideClick, isVisible, onClose]);

  // 화살표 클래스 계산 (useMemo로 최적화)
  const arrowClass = React.useMemo(() => {
    if (!arrow) return '';
    return `${styles.arrow} ${styles[`arrow-${arrowPosition}`]}`;
  }, [arrow, arrowPosition]);

  // 오프셋 스타일 계산 (useMemo로 최적화)
  const offsetStyle = React.useMemo<React.CSSProperties>(() => {
    if (!offset) return {};
    return {
      marginTop: offset.top,
      marginRight: offset.right,
      marginBottom: offset.bottom,
      marginLeft: offset.left,
    };
  }, [offset]);

  // 전체 className 병합 (useMemo로 최적화)
  const mergedClassName = React.useMemo(() => {
    // 기본 스타일
    const baseClasses = [styles.tooltip];

    // 위치 관련
    const positionClasses = ['absolute', styles[`tooltip-${tooltipPosition}`]];

    // 배경 및 텍스트 색상
    const colorClasses = inverted
      ? ['bg-surface-level-min', 'text-text-primary']
      : ['bg-surface-level-max', 'text-text-inverse'];

    // 패딩
    const paddingClasses = ['px-3', 'py-2'];

    // 모양 및 효과
    const shapeClasses = ['rounded-lg', 'shadow-lg'];

    // 텍스트 스타일
    const textClasses = ['text-sm', 'whitespace-nowrap'];

    // z-index
    const zIndexClasses = ['z-50'];

    // 화살표 및 커스텀 클래스
    const additionalClasses = [arrowClass, className].filter(Boolean);

    return [
      ...baseClasses,
      ...positionClasses,
      ...colorClasses,
      ...paddingClasses,
      ...shapeClasses,
      ...textClasses,
      ...zIndexClasses,
      ...additionalClasses,
    ]
      .filter(Boolean)
      .join(' ');
  }, [tooltipPosition, arrowClass, className, inverted]);

  if (!isVisible) return null;

  return (
    <div ref={tooltipRef} className={mergedClassName} style={offsetStyle}>
      <div className={styles.content}>
        <span className="flex-1 whitespace-pre">{children}</span>
        {showCloseButton && onClose && (
          <CustomButton
            variant="tonal"
            color="primary"
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

export default Tooltip;
