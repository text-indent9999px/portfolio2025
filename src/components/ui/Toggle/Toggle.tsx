'use client';

import React, { useEffect, useState } from 'react';
import { buildClickHandler, buildKeydownHandler } from './Toggle.handlers';
import { ToggleProps } from './Toggle.types';
import {
  getFocusRingClasses,
  getThumbSizeClass,
  getThumbStateClasses,
  getThumbTranslateClasses,
  getTrackBaseClass,
  getTrackSizeClass,
  getTrackStateClasses,
  ToggleSize,
} from './Toggle.utils';

export const Toggle: React.FC<ToggleProps> = ({
  checked,
  onChange,
  disabled = false,
  className = '',
  id,
  ariaLabel,
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
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    setIsInitialized(true);
  }, []);

  const [isUserInteraction, setIsUserInteraction] = useState(false);

  // 사용자 상호작용 애니메이션 처리
  useEffect(() => {
    if (isUserInteraction) {
      const timer = setTimeout(() => {
        setIsUserInteraction(false);
      }, 300); // 애니메이션 지속 시간과 맞춤

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

  const isDisabled = React.useMemo(() => {
    return disabled || placeholder;
  }, [disabled, placeholder]);

  // Button className 병합 (useMemo로 최적화)
  const buttonClassName = React.useMemo(() => {
    return [
      'flex',
      'items-center',
      'relative',
      getFocusRingClasses(),
      className,
    ]
      .filter(Boolean)
      .join(' ');
  }, [className]);

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      aria-controls={ariaControls}
      id={id}
      disabled={isDisabled}
      aria-disabled={placeholder || undefined}
      tabIndex={placeholder ? -1 : undefined}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onFocus={onFocus}
      onBlur={onBlur}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={buttonClassName}
      data-toggle-type={toggleType}
    >
      {isInitialized && (
        <>
          <ToggleTrack
            size={size as ToggleSize}
            enableTransition={enableTransition || isUserInteraction}
            data-toggle-type={toggleType}
            checked={checked}
            isOnOffToggle={isOnOffToggle}
            isDisabled={isDisabled}
          />
          <ToggleThumb
            size={size as ToggleSize}
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
  // Track className 병합 (useMemo로 최적화)
  const trackClassName = React.useMemo(() => {
    const trackBasicClass = getTrackBaseClass();
    const stateClasses = getTrackStateClasses(
      isOnOffToggle,
      checked,
      isDisabled
    );
    const transition = enableTransition
      ? 'transition-[colors, width, height]'
      : 'transition-[width, height]';

    return [
      trackBasicClass,
      getTrackSizeClass(size),
      'border-2',
      'shadow-lg',
      stateClasses,
      transition,
      'duration-200',
      'ease-in-out',
    ]
      .filter(Boolean)
      .join(' ');
  }, [size, enableTransition, isOnOffToggle, checked, isDisabled]);

  return <span className={trackClassName} {...rest} />;
};

const ToggleThumb: React.FC<{
  size: ToggleSize;
  checked: boolean;
  enableTransition: boolean;
  isDisabled: boolean;
}> = ({ size, checked, enableTransition, isDisabled, ...rest }) => {
  // Thumb className 병합 (useMemo로 최적화)
  const thumbClassName = React.useMemo(() => {
    const thumbClasses = getThumbStateClasses(isDisabled);
    const transition = enableTransition
      ? 'transition-[transform, width, height]'
      : 'transition-[width, height]';

    return [
      'flex',
      'items-center',
      'justify-center',
      'absolute',
      getThumbSizeClass(size),
      'rounded-full',
      'shadow-md',
      'text-xs',
      thumbClasses,
      transition,
      'duration-200',
      'ease-in-out',
      getThumbTranslateClasses(size, checked),
      'top-1/2',
      '-translate-y-1/2',
    ]
      .filter(Boolean)
      .join(' ');
  }, [size, checked, enableTransition, isDisabled]);

  return <span className={thumbClassName} {...rest} />;
};

export default Toggle;
