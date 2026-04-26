'use client';

import React from 'react';
import { createPortal } from 'react-dom';

import { cn } from '@/utils/cn';
import { OverlayProps } from './Overlay.types';

const Overlay: React.FC<OverlayProps> = ({
  open,
  blur = false,
  lockScroll = true,
  className = '',
  style,
  unstyled = false,
  children,
  zIndex = 9999,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  onClose,
  onClick,
  trapFocus = true,
  role = 'dialog',
  ariaLabel,
  ariaLabelledBy,
  id,
  ...rest
}) => {
  const modalId = React.useId();
  const finalId = id || modalId;
  const overlayRef = React.useRef<HTMLDivElement>(null);
  const previousActiveElementRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    if (process.env.NODE_ENV !== 'development' || !open) return;
    const r = role ?? 'dialog';
    if (
      (r === 'dialog' || r === 'alertdialog') &&
      !ariaLabel &&
      !ariaLabelledBy
    ) {
      console.warn(
        '[Overlay] dialog/alertdialog에 aria-label 또는 aria-labelledby가 없습니다.'
      );
    }
  }, [open, role, ariaLabel, ariaLabelledBy]);

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

  React.useEffect(() => {
    if (!open || !closeOnEscape || !onClose) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      e.preventDefault();
      onClose();
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, closeOnEscape, onClose]);

  React.useEffect(() => {
    if (!trapFocus || !open || !overlayRef.current) return;

    const overlay = overlayRef.current;

    const getFocusableElements = (): HTMLElement[] => {
      const selector = [
        'a[href]',
        'button:not([disabled])',
        'textarea:not([disabled])',
        'input:not([disabled])',
        'select:not([disabled])',
        '[tabindex]:not([tabindex="-1"])',
      ].join(', ');

      return Array.from(overlay.querySelectorAll<HTMLElement>(selector)).filter(
        el => {
          const s = window.getComputedStyle(el);
          return (
            s.display !== 'none' &&
            s.visibility !== 'hidden' &&
            !el.hasAttribute('aria-hidden')
          );
        }
      );
    };

    previousActiveElementRef.current =
      document.activeElement as HTMLElement | null;

    const focusableElements = getFocusableElements();
    if (focusableElements.length > 0) {
      setTimeout(() => {
        focusableElements[0]?.focus();
      }, 0);
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const els = getFocusableElements();
      if (els.length === 0) return;

      const firstElement = els[0];
      const lastElement = els[els.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (previousActiveElementRef.current) {
        previousActiveElementRef.current.focus();
      }
    };
  }, [open, trapFocus]);

  const overlayStyle: React.CSSProperties = unstyled
    ? { ...style }
    : {
        position: 'fixed',
        inset: 0,
        zIndex,
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'auto' : 'none',
        visibility: open ? 'visible' : 'hidden',
        transition: 'opacity 200ms ease',
        ...(blur ? { backdropFilter: 'blur(6px)' } : {}),
        ...style,
      };

  const mergedClassName = cn(
    className,
    !unstyled && 'bg-surface-level-min/65 touch-pinch-zoom'
  );

  const handleOverlayClick = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        if (closeOnBackdropClick) {
          if (onClose) {
            onClose();
          } else if (onClick) {
            onClick(e);
          }
        }
      }
    },
    [closeOnBackdropClick, onClose, onClick]
  );

  React.useEffect(() => {
    if (open || !overlayRef.current) return;

    const overlay = overlayRef.current;
    const focusableSelector = [
      'a[href]',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(', ');

    const focusableElements = Array.from(
      overlay.querySelectorAll<HTMLElement>(focusableSelector)
    );

    const originalTabIndices = new Map<HTMLElement, string | null>();
    focusableElements.forEach(el => {
      originalTabIndices.set(el, el.getAttribute('tabindex'));
      el.setAttribute('tabindex', '-1');
    });

    return () => {
      focusableElements.forEach(el => {
        const originalTabIndex = originalTabIndices.get(el);
        if (originalTabIndex === null) {
          el.removeAttribute('tabindex');
        } else if (originalTabIndex !== undefined) {
          el.setAttribute('tabindex', originalTabIndex);
        }
      });
    };
  }, [open]);

  const effectiveRole = role ?? 'dialog';
  const isDialogLikeRole =
    effectiveRole === 'dialog' || effectiveRole === 'alertdialog';

  const ariaProps: React.HTMLAttributes<HTMLDivElement> & {
    inert?: boolean;
  } = {
    id: finalId,
    role: open ? role : undefined,
    'aria-modal': open && isDialogLikeRole ? true : undefined,
    'aria-hidden': !open ? true : undefined,
  };

  if (!open) {
    ariaProps.inert = true;
  }

  if (open && isDialogLikeRole) {
    if (ariaLabelledBy) {
      ariaProps['aria-labelledby'] = ariaLabelledBy;
    } else if (ariaLabel) {
      ariaProps['aria-label'] = ariaLabel;
    }
  }

  // {...rest} 먼저, {...ariaProps} 나중에: 계산된 역할·ARIA가 호출부 실수로 덮이지 않도록
  const content = (
    <div
      ref={overlayRef}
      style={overlayStyle}
      className={mergedClassName}
      onClick={handleOverlayClick}
      {...rest}
      {...ariaProps}
    >
      {children}
    </div>
  );

  if (typeof document !== 'undefined') {
    return createPortal(content, document.body);
  }

  return content;
};

export default Overlay;
