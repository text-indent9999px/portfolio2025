'use client';

import React, { useEffect, useState } from 'react';

import { cn } from '@/utils/cn';

import { buildClickHandler, buildKeydownHandler } from './Toggle.handlers';
import { ToggleProps, ToggleSize } from './Toggle.types';
import {
  getFocusRingClasses,
  getThumbSizeClass,
  getThumbStateClasses,
  getThumbTranslateClasses,
  getTrackBaseClass,
  getTrackSizeClass,
  getTrackStateClasses,
} from './Toggle.utils';

export const Toggle: React.FC<ToggleProps> = ({
  checked,
  onChange,
  disabled = false,
  className = '',
  id,
  ariaLabel,
  ariaDescribedBy,
  renderThumb,
  toggleType,
  placeholder = false,
  size = 'md',
  enableTransition = false,
  isOnOffToggle = false,
  ariaControls,
  onFocus,
  onBlur,
  onMouseEnter,
  onMouseLeave,
}) => {
  /** 마운트 후에만 트랙/썸을 그린다. SSR 첫 페인트와 하이드레이션 직후에 부모가 준 `checked`와 기본 스냅샷이 잠깐 달라져 레이아웃·트랜지션이 어색해 보이는 것을 줄이기 위함. */
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    setIsInitialized(true);
  }, []);

  const [isUserInteraction, setIsUserInteraction] = useState(false);

  useEffect(() => {
    if (isUserInteraction) {
      const timer = setTimeout(() => {
        setIsUserInteraction(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isUserInteraction]);

  const handleClick = buildClickHandler({
    checked,
    disabled,
    placeholder,
    onChange,
    setIsUserInteraction,
  });

  const handleKeyDown = buildKeydownHandler({
    checked,
    disabled,
    placeholder,
    onChange,
    setIsUserInteraction,
  });

  const isDisabled = disabled || placeholder;

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-controls={ariaControls}
      id={id}
      disabled={isDisabled}
      tabIndex={placeholder ? -1 : undefined}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onFocus={onFocus}
      onBlur={onBlur}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={cn(
        'flex items-center relative',
        getFocusRingClasses(),
        className
      )}
      data-toggle-type={toggleType}
    >
      {isInitialized && (
        <>
          <ToggleTrack
            size={size}
            enableTransition={enableTransition || isUserInteraction}
            data-toggle-type={toggleType}
            checked={checked}
            isOnOffToggle={isOnOffToggle}
            isDisabled={isDisabled}
          />
          <ToggleThumb
            size={size}
            checked={checked}
            enableTransition={enableTransition || isUserInteraction}
            data-toggle-type={toggleType}
            isDisabled={isDisabled}
          />
          {renderThumb ? renderThumb(checked) : null}
        </>
      )}
    </button>
  );
};

const ToggleTrack: React.FC<{
  size: ToggleSize;
  enableTransition: boolean;
  checked: boolean;
  isOnOffToggle: boolean;
  isDisabled: boolean;
}> = ({
  size,
  enableTransition,
  checked,
  isOnOffToggle,
  isDisabled,
  ...rest
}) => {
  const transition = enableTransition
    ? 'transition-[colors, width, height]'
    : 'transition-[width, height]';

  const trackClassName = cn(
    getTrackBaseClass(),
    getTrackSizeClass(size),
    'border-2 shadow-lg',
    getTrackStateClasses(isOnOffToggle, checked, isDisabled),
    transition,
    'duration-200 ease-in-out'
  );

  return <span className={trackClassName} {...rest} />;
};

const ToggleThumb: React.FC<{
  size: ToggleSize;
  checked: boolean;
  enableTransition: boolean;
  isDisabled: boolean;
}> = ({ size, checked, enableTransition, isDisabled, ...rest }) => {
  const thumbClasses = getThumbStateClasses(isDisabled);
  const transition = enableTransition
    ? 'transition-[transform, width, height]'
    : 'transition-[width, height]';

  const thumbClassName = cn(
    'flex items-center justify-center absolute',
    getThumbSizeClass(size),
    'rounded-full shadow-md text-xs',
    thumbClasses,
    transition,
    'duration-200 ease-in-out',
    getThumbTranslateClasses(size, checked),
    'top-1/2 -translate-y-1/2'
  );

  return <span className={thumbClassName} {...rest} />;
};
