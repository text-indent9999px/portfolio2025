import React from 'react';

import { cn } from '@/utils/cn';

interface MenuTriggerIconProps {
  isMenuOpen: boolean;
}

/** 막대 공통: transform 기준점은 중앙 (hamburger ↔ X 애니메이션용) */
const LINE_COMMON =
  'block transition-all duration-200 ease-linear cursor-pointer origin-center';

const BAR_BG = 'bg-[var(--color-text-primary)]';

const MenuTriggerIcon: React.FC<MenuTriggerIconProps> = ({ isMenuOpen }) => {
  return (
    <div className="absolute w-[30px] h-[20px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <span
        className={cn(
          LINE_COMMON,
          'h-[2px] mb-[7px]',
          isMenuOpen
            ? cn(
                BAR_BG,
                'w-[15px] translate-x-[2px] translate-y-[4px] rotate-45'
              )
            : cn('w-[16.5px]', BAR_BG, 'xl:group-hover:w-[30px]')
        )}
      />
      <span
        className={cn(
          LINE_COMMON,
          'w-[30px] h-[2px] mb-[7px]',
          isMenuOpen
            ? cn(BAR_BG, 'translate-x-0 translate-y-0 -rotate-45')
            : BAR_BG
        )}
      />
      <span
        className={cn(
          LINE_COMMON,
          'h-[2px] mb-0',
          isMenuOpen
            ? cn(
                BAR_BG,
                'w-[15px] translate-x-[-3px] translate-y-[-3.5px] rotate-45 ml-[15px]'
              )
            : cn('w-[16.5px] float-right', BAR_BG, 'xl:group-hover:w-[30px]')
        )}
      />
    </div>
  );
};

export default MenuTriggerIcon;
