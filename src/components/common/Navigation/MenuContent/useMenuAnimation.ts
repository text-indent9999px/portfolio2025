'use client';
import { useCallback, useState } from 'react';
import { SELECTORS } from './useMenuAnimation.constants';
import { MenuAnimationCallbacks } from './useMenuAnimation.types';
import { waitForAnimationEnd } from './useMenuAnimation.utils';

export const useMenuAnimation = (callbacks: MenuAnimationCallbacks = {}) => {
  const { onMenuClose, onMenuOpen } = callbacks;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleMenuClose = useCallback(
    (path?: string): Promise<void> => {
      return new Promise(resolve => {
        setIsClosing(true);

        requestAnimationFrame(() => {
          const overlayElement = document.querySelector(SELECTORS.OVERLAY);
          const contentElement = document.querySelector(SELECTORS.CONTENT);
          const promises: Promise<void>[] = [];

          if (overlayElement) {
            promises.push(waitForAnimationEnd(overlayElement, 'overlay'));
          }
          if (contentElement) {
            promises.push(waitForAnimationEnd(contentElement, 'content'));
          }

          requestAnimationFrame(() => {
            setIsMenuOpen(false);

            if (promises.length > 0) {
              Promise.all(promises).then(() => {
                setIsClosing(false);
                if (onMenuClose && path) {
                  onMenuClose(path);
                }
                resolve();
              });
            } else {
              setIsClosing(false);
              if (onMenuClose && path) {
                onMenuClose(path);
              }
              resolve();
            }
          });
        });
      });
    },
    [onMenuClose]
  );

  const handleMenuOpen = useCallback((): Promise<void> => {
    return new Promise(resolve => {
      setIsMenuOpen(true);

      requestAnimationFrame(() => {
        const contentElement = document.querySelector(SELECTORS.CONTENT);

        if (contentElement) {
          waitForAnimationEnd(contentElement, 'content').then(() => {
            onMenuOpen?.();
            resolve();
          });
        } else {
          onMenuOpen?.();
          resolve();
        }
      });
    });
  }, [onMenuOpen]);

  const openMenu = useCallback((): Promise<void> => {
    if (isMenuOpen) {
      return Promise.resolve();
    }
    return handleMenuOpen();
  }, [isMenuOpen, handleMenuOpen]);

  const closeMenu = useCallback(
    (path?: string): Promise<void> => {
      if (!isMenuOpen) {
        return Promise.resolve();
      }
      return handleMenuClose(path);
    },
    [isMenuOpen, handleMenuClose]
  );

  return {
    isMenuOpen,
    isClosing,
    openMenu,
    closeMenu,
  };
};
