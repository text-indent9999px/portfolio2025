'use client';

import { createContext, ReactNode, useContext } from 'react';
import { useMenuAnimation } from './useMenuAnimation';
import { MenuAnimationCallbacks } from './useMenuAnimation.types';

interface MenuContextType {
  isMenuOpen: boolean;
  isClosing: boolean;
  openMenu: () => Promise<void>;
  closeMenu: (path?: string) => Promise<void>;
}

const MenuContext = createContext<MenuContextType | null>(null);

interface MenuProviderProps {
  children: ReactNode;
  callbacks?: MenuAnimationCallbacks;
}

export function MenuProvider({ children, callbacks }: MenuProviderProps) {
  const { isMenuOpen, isClosing, openMenu, closeMenu } =
    useMenuAnimation(callbacks);

  return (
    <MenuContext.Provider
      value={{ isMenuOpen, isClosing, openMenu, closeMenu }}
    >
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within MenuProvider');
  }
  return context;
}
