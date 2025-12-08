'use client';

import React from 'react';
import { createPortal } from 'react-dom';

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
  onClose,
  onClick,
  trapFocus = true,
  role = 'dialog',
  ariaLabel,
  ariaLabelledBy,
  id,
  ...rest
}) => {
  // ID가 제공되지 않으면 자동 생성
  const modalId = React.useId();
  const finalId = id || modalId;
  const overlayRef = React.useRef<HTMLDivElement>(null);
  const previousActiveElementRef = React.useRef<HTMLElement | null>(null);

  // 스크롤 잠금
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

  // 포커스 트랩
  React.useEffect(() => {
    if (!trapFocus || !open || !overlayRef.current) return;

    const overlay = overlayRef.current;

    // 포커스 가능한 요소들 찾기
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
          const style = window.getComputedStyle(el);
          return (
            style.display !== 'none' &&
            style.visibility !== 'hidden' &&
            !el.hasAttribute('aria-hidden')
          );
        }
      );
    };

    // 모달이 열릴 때 현재 포커스된 요소 저장
    previousActiveElementRef.current =
      document.activeElement as HTMLElement | null;

    // 첫 번째 포커스 가능한 요소로 포커스 이동
    const focusableElements = getFocusableElements();
    if (focusableElements.length > 0) {
      // 약간의 지연을 두어 DOM이 완전히 렌더링된 후 포커스 이동
      setTimeout(() => {
        focusableElements[0]?.focus();
      }, 0);
    }

    // Tab 키 핸들러
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const focusableElements = getFocusableElements();
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      // Shift+Tab: 첫 번째 요소에서 마지막 요소로
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab: 마지막 요소에서 첫 번째 요소로
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      // 모달이 닫힐 때 원래 포커스 위치로 복원
      if (previousActiveElementRef.current) {
        previousActiveElementRef.current.focus();
      }
    };
  }, [open, trapFocus]);

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
      zIndex: zIndex,
      opacity: open ? 1 : 0,
      pointerEvents: open ? 'auto' : 'none',
      visibility: open ? 'visible' : 'hidden',
      transition: 'opacity 200ms ease',
      ...blurStyle,
      ...style,
    };
  }, [unstyled, open, blurStyle, style, zIndex]);

  // className 병합
  const mergedClassName = React.useMemo(() => {
    return [
      className,
      unstyled ? '' : 'bg-surface-level-min/65 touch-pinch-zoom',
    ]
      .filter(Boolean)
      .join(' ');
  }, [className, unstyled]);

  // 오버레이 클릭 핸들러
  const handleOverlayClick = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      // children 영역 클릭은 무시 (이벤트 버블링 방지)
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

  // 닫힌 상태에서 포커스 가능한 요소들에 tabIndex={-1} 설정
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

    // 원래 tabIndex 값을 저장하고 -1로 설정
    const originalTabIndices = new Map<HTMLElement, string | null>();
    focusableElements.forEach(el => {
      originalTabIndices.set(el, el.getAttribute('tabindex'));
      el.setAttribute('tabindex', '-1');
    });

    // cleanup: 원래 tabIndex 값 복원
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

  // 접근성 속성 계산
  const ariaProps = React.useMemo(() => {
    const props: React.HTMLAttributes<HTMLDivElement> & {
      inert?: boolean;
    } = {
      id: finalId,
      role: open ? role : undefined,
      'aria-modal': open ? true : undefined,
      'aria-hidden': !open ? true : undefined,
    };

    // inert 속성 추가 (최신 브라우저 지원)
    if (!open) {
      props.inert = true;
    }

    if (open) {
      if (ariaLabelledBy) {
        props['aria-labelledby'] = ariaLabelledBy;
      } else if (ariaLabel) {
        props['aria-label'] = ariaLabel;
      }
    }

    return props;
  }, [open, role, ariaLabel, ariaLabelledBy, finalId]);

  const content = (
    <div
      ref={overlayRef}
      style={overlayStyle}
      className={mergedClassName}
      onClick={handleOverlayClick}
      {...ariaProps}
      {...rest}
    >
      {children}
    </div>
  );

  // 포털로 body 최상단에 렌더링 (헤더/레이아웃 위에 떠 있도록)
  if (typeof document !== 'undefined') {
    return createPortal(content, document.body);
  }

  // SSR 안전 장치: 문서 객체 없을 때는 그냥 렌더만
  return content;
};

export default Overlay;
