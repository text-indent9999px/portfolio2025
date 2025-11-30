'use client';

import React from 'react';

import { OverlayProps } from './Overlay.types';

const Overlay: React.FC<OverlayProps> = ({
  open,
  blur = false,
  lockScroll = true,
  className = '',
  style,
  unstyled = false,
  children,
  ...rest
}) => {
  React.useEffect(() => {
    if (!lockScroll) return;
    if (open) {
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [open, lockScroll]);

  // Blur 스타일 계산
  const blurStyle = React.useMemo<React.CSSProperties>(() => {
    return blur ? { backdropFilter: 'blur(6px)' } : {};
  }, [blur]);

  // Overlay 스타일 계산
  const overlayStyle = React.useMemo<React.CSSProperties>(() => {
    if (unstyled) {
      return {
        ...style,
      };
    }
    return {
      position: 'fixed',
      inset: 0,
      zIndex: 101,
      opacity: open ? 1 : 0,
      pointerEvents: open ? 'auto' : 'none',
      transition: 'opacity 200ms ease',
      ...blurStyle,
      ...style,
    };
  }, [unstyled, open, blurStyle, style]);

  // className 병합
  const mergedClassName = React.useMemo(() => {
    return [className, unstyled ? '' : 'bg-surface-level-min/65']
      .filter(Boolean)
      .join(' ');
  }, [className, unstyled]);

  return (
    <div
      aria-hidden={!open}
      style={overlayStyle}
      className={mergedClassName}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Overlay;
