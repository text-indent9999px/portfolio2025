import React from 'react';

interface MenuTriggerIconProps {
  isMenuOpen: boolean;
}

const MenuTriggerIcon: React.FC<MenuTriggerIconProps> = ({ isMenuOpen }) => {
  return (
    <div className="absolute w-[30px] h-[20px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <span
        className={`block h-[2px] mb-[7px] transition-all duration-200 ease-linear cursor-pointer transform-origin-center ${
          isMenuOpen
            ? 'bg-[var(--color-text-primary)] w-[15px] translate-x-[2px] translate-y-[4px] rotate-45'
            : 'w-[16.5px] bg-[var(--color-text-primary)] xl:group-hover:w-[30px]'
        }`}
      ></span>
      <span
        className={`block w-[30px] h-[2px] mb-[7px] transition-all duration-200 ease-linear cursor-pointer transform-origin-center ${
          isMenuOpen
            ? 'bg-[var(--color-text-primary)] translate-x-0 translate-y-0 -rotate-45'
            : 'bg-[var(--color-text-primary)]'
        }`}
      ></span>
      <span
        className={`block h-[2px] mb-0 transition-all duration-200 ease-linear cursor-pointer transform-origin-center ${
          isMenuOpen
            ? 'bg-[var(--color-text-primary)] w-[15px] translate-x-[-3px] translate-y-[-3.5px] rotate-45 ml-[15px]'
            : 'w-[16.5px] float-right bg-[var(--color-text-primary)] xl:group-hover:w-[30px]'
        }`}
      ></span>
    </div>
  );
};

export default MenuTriggerIcon;
