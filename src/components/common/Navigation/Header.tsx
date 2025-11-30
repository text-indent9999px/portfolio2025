'use client';

import React from 'react';
import { useDevice } from '../../../contexts/DeviceContext';
import { useScrollDetection } from '../../../hooks/useScrollDetection';
import { useRouter } from '../../../utils/router';
import { MenuButton } from '../../ui/Button';
import { ThemeToggle } from '../../ui/ThemeToggle';
import Logo from '../Logo';
import { MenuContent, MenuProvider, useMenu } from './MenuContent';
import styles from './navigation.module.scss';

interface HeaderProps {
  onMenuClick?: () => void;
}

const HeaderContent: React.FC = () => {
  const { isXlOrAbove } = useDevice();
  const { isMenuOpen, isClosing, openMenu, closeMenu } = useMenu();
  const isScrolled = useScrollDetection(0);

  const isTransparent = !isScrolled || isMenuOpen || isClosing;

  const handleMenuToggle = () => {
    if (isMenuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  return (
    <>
      <header
        className={`
          ${styles.navigation}
          ${isTransparent ? styles['is-transparent'] : styles['is-scrolled']}
          w-full
          flex items-center justify-between
          fixed top-0 left-0
          pl-4 pr-6 py-2 xl:py-4 xl:px-8
          z-111
          transition-all duration-300
        `}
      >
        {/* 좌측 로고 */}
        <div className="flex items-center">
          <Logo
            // needInvert={isMenuOpen}
            onClick={isMenuOpen ? closeMenu : undefined}
            width={isXlOrAbove ? (isTransparent ? 50 : 45) : 40}
            height={isXlOrAbove ? (isTransparent ? 50 : 45) : 40}
          />
        </div>

        {/* 우측 메뉴 버튼과 테마 토글 */}
        <div className="flex items-center gap-10">
          <ThemeToggle
            needInvert={isMenuOpen}
            size={!isTransparent || !isXlOrAbove ? 'sm' : 'md'}
          />
          <MenuButton
            className={isMenuOpen ? 'menu-button-active' : ''}
            ariaLabel={isMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
            onClick={handleMenuToggle}
            type="button"
            data-cursor="hover"
            noHoverActive={true}
            cursorTrigger={false}
            variant="ghost"
            open={isMenuOpen}
            controlsId="global-menu"
            size={!isTransparent || !isXlOrAbove ? 'sm' : 'md'}
          />
        </div>

        <div className={styles['backdrop']}></div>
      </header>
      {/* 메뉴 컨텐츠 */}
      <MenuContent />
    </>
  );
};

const Header: React.FC<HeaderProps> = ({}) => {
  const { navigateToUrl } = useRouter();

  return (
    <MenuProvider
      callbacks={{
        onMenuClose: path => {
          if (path) {
            navigateToUrl({ url: path });
          }
        },
      }}
    >
      <HeaderContent />
    </MenuProvider>
  );
};

export default Header;
