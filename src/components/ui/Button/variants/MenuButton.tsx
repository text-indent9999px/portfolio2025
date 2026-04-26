'use client';

import React from 'react';
import { cn } from '@/utils/cn';
import MenuTriggerIcon from '../../Icon/MenuTriggerIcon';
import Button from '../Button';
import type { CustomButtonProps } from '../Button.types';

export interface MenuButtonProps extends Omit<CustomButtonProps, 'ariaLabel'> {
  open: boolean;
  controlsId: string; // 오버레이/메뉴 id
  hasPopup?: 'menu' | 'listbox' | 'dialog';
  ariaLabel?: string; // 아이콘-only일 때 대체 라벨
  size?: 'sm' | 'md' | 'lg';
}

const MenuButton: React.FC<MenuButtonProps> = ({
  open,
  controlsId,
  hasPopup = 'menu',
  size = 'md',
  className,
  ariaLabel,
  children,
  ...props
}) => {
  return (
    <Button
      size={size}
      className={cn(
        'transition-all duration-300 ease-in-out cursor-pointer group',
        size === 'sm' && 'scale-95',
        size === 'lg' && 'scale-110',
        className
      )}
      {...props}
      aria-haspopup={hasPopup}
      aria-expanded={open}
      aria-controls={controlsId}
      ariaLabel={
        props.icon && !children ? ariaLabel : `메뉴 ${open ? '닫기' : '열기'}`
      }
      icon={<MenuTriggerIcon isMenuOpen={open} />}
    />
  );
};

export default MenuButton;
