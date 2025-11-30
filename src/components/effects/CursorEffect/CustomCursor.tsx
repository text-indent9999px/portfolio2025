'use client';

import React, { useEffect, useRef } from 'react';
import { useMediaQuery } from '../../../hooks';
import styles from './CustomCursor.module.scss';

const CustomCursor: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const secondaryRef = useRef<HTMLDivElement>(null);
  const tertiaryRef = useRef<HTMLDivElement>(null);
  const rippleContainerRef = useRef<HTMLDivElement>(null);
  const isXlOrAbove = useMediaQuery('--breakpoint-xl', 'min');

  useEffect(() => {
    // lg 브레이크포인트 미만이면 이펙트 비활성화
    if (!isXlOrAbove) {
      return;
    }

    let mouseX = 0,
      mouseY = 0;
    let rafId: number = 0;

    const moveCursor = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!rafId) {
        rafId = requestAnimationFrame(updateCursor);
      }
    };

    const updateCursor = () => {
      [mainRef, secondaryRef, tertiaryRef].forEach(ref => {
        if (ref.current) {
          const hasHover = ref.current.classList.contains(
            styles['cursor-hover']
          );
          const scale = hasHover ? ' scale(3.5)' : '';
          ref.current.style.transform = `translate(${mouseX}px, ${mouseY}px)${scale}`;
        }
      });
      rafId = 0;
    };

    const cleanupRipples = () => {
      if (rippleContainerRef.current) {
        rippleContainerRef.current.innerHTML = '';
      }

      const windowWithRipple = window as Window & {
        __cursorRippleActive?: boolean;
        __cursorRippleCompletedAt?: number;
      };
      windowWithRipple.__cursorRippleActive = false;
      window.dispatchEvent(new CustomEvent('cursor-ripple-end'));
    };

    const resetCursorState = () => {
      // 모든 커서 요소에서 hover 클래스 제거
      mainRef.current?.classList.remove(styles['cursor-hover']);
      secondaryRef.current?.classList.remove(styles['cursor-hover']);
      tertiaryRef.current?.classList.remove(styles['cursor-hover']);

      // 모든 DOM 요소에서 hover 클래스 제거
      document.querySelectorAll(`.${styles['cursor-hover']}`).forEach(el => {
        el.classList.remove(styles['cursor-hover']);
      });

      // 스케일을 강제로 초기화 (클래스 제거 후 즉시 반영)
      [mainRef, secondaryRef, tertiaryRef].forEach(ref => {
        if (ref.current) {
          ref.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
        }
      });

      // ripple 요소도 정리
      cleanupRipples();
    };

    const handleHover = (e: Event) => {
      mainRef.current?.classList.add(styles['cursor-hover']);
      secondaryRef.current?.classList.add(styles['cursor-hover']);
      tertiaryRef.current?.classList.add(styles['cursor-hover']);
      // 포커스된 요소에도 클래스 추가
      const target = e.target as HTMLElement;
      target.classList.add(styles['cursor-hover']);
    };
    const handleUnhover = (e: Event) => {
      mainRef.current?.classList.remove(styles['cursor-hover']);
      secondaryRef.current?.classList.remove(styles['cursor-hover']);
      tertiaryRef.current?.classList.remove(styles['cursor-hover']);
      // 포커스된 요소에서 클래스 제거
      const target = e.target as HTMLElement;
      target.classList.remove(styles['cursor-hover']);
    };

    const hoverTargetsSet = new WeakSet<Element>();

    const addHoverListeners = () => {
      const hoverTargets = document.querySelectorAll('[data-cursor="hover"]');
      hoverTargets.forEach(el => {
        if (!hoverTargetsSet.has(el)) {
          el.addEventListener('mouseover', handleHover);
          el.addEventListener('mouseout', handleUnhover);
          hoverTargetsSet.add(el);
        }
      });
    };

    const handleCursorReset = () => {
      resetCursorState();
    };

    // 페이지 가시성 변경 시 ripple 정리 (포커스 복귀 시 버그 방지)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        // 페이지가 다시 보일 때 (에디터에서 브라우저로 돌아올 때)
        // 남아있는 ripple 요소들 정리
        cleanupRipples();
      }
    };

    // 윈도우 포커스 복귀 시 ripple 정리
    const handleWindowFocus = () => {
      cleanupRipples();
    };

    const handleClick = (e: MouseEvent) => {
      // 클릭된 요소 또는 부모 요소에서 data-cursor-ripple 속성 확인
      const target = e.target as HTMLElement;
      const rippleTarget = target.closest('[data-cursor-ripple]');
      const isRippleEnabled =
        rippleTarget?.getAttribute('data-cursor-ripple') === 'true';

      // data-cursor-ripple 속성이 있는 요소에서만 ripple 효과 생성
      if (isRippleEnabled && rippleContainerRef.current) {
        const ripple = document.createElement('div');
        ripple.className = styles['ripple-effect'];

        // 클릭 위치를 기준으로 ripple 위치 설정
        ripple.style.left = `${e.clientX}px`;
        ripple.style.top = `${e.clientY}px`;

        // 애니메이션 완료 이벤트로 정확한 타이밍 감지
        const handleAnimationEnd = (event: AnimationEvent) => {
          // ripple 요소에서 발생한 이벤트인지 확인
          if (event.target === ripple) {
            ripple.removeEventListener('animationend', handleAnimationEnd);
            ripple.remove();
            // 전역 ripple 상태 해제 및 완료 시간 기록
            const windowWithRipple = window as Window & {
              __cursorRippleActive?: boolean;
              __cursorRippleCompletedAt?: number;
            };
            windowWithRipple.__cursorRippleActive = false;
            windowWithRipple.__cursorRippleCompletedAt = Date.now();
            // ripple 완료 이벤트 발생
            window.dispatchEvent(new CustomEvent('cursor-ripple-end'));
          }
        };

        // DOM에 추가하기 전에 리스너 등록
        ripple.addEventListener('animationend', handleAnimationEnd);
        rippleContainerRef.current.appendChild(ripple);

        (
          window as Window & { __cursorRippleActive?: boolean }
        ).__cursorRippleActive = true;

        window.dispatchEvent(
          new CustomEvent('cursor-ripple-start', {
            detail: { target: rippleTarget },
          })
        );
      }
    };

    document.body.addEventListener('mousemove', moveCursor);
    document.body.addEventListener('click', handleClick);
    window.addEventListener('cursor-reset', handleCursorReset);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleWindowFocus);
    addHoverListeners();

    let mutationObserverTimeout: NodeJS.Timeout | null = null;
    const observer = new MutationObserver(() => {
      if (mutationObserverTimeout) {
        clearTimeout(mutationObserverTimeout);
      }
      mutationObserverTimeout = setTimeout(() => {
        addHoverListeners();
        mutationObserverTimeout = null;
      }, 100);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['data-cursor'],
    });

    return () => {
      document.body.removeEventListener('mousemove', moveCursor);
      document.body.removeEventListener('click', handleClick);
      window.removeEventListener('cursor-reset', handleCursorReset);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleWindowFocus);
      observer.disconnect();
      if (mutationObserverTimeout) {
        clearTimeout(mutationObserverTimeout);
      }
      const hoverTargets = document.querySelectorAll('[data-cursor="hover"]');
      hoverTargets.forEach(el => {
        el.removeEventListener('mouseover', handleHover);
        el.removeEventListener('mouseout', handleUnhover);
      });
      if (rafId) cancelAnimationFrame(rafId);
      cleanupRipples();
    };
  }, [isXlOrAbove]);

  // lg 브레이크포인트 미만이면 렌더링하지 않음
  if (!isXlOrAbove) {
    return null;
  }

  return (
    <>
      <div ref={mainRef} className={styles['custom-cursor-main']} />
      <div ref={secondaryRef} className={styles['custom-cursor-secondary']} />
      <div ref={tertiaryRef} className={styles['custom-cursor-tertiary']} />
      <div ref={rippleContainerRef} className={styles['ripple-container']} />
    </>
  );
};

export default CustomCursor;
