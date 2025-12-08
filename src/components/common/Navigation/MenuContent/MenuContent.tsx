'use client';

import React from 'react';
import { menuItems } from '../../../../data/navigation';
import CustomButton, { ResumeDownloadButton } from '../../../ui/Button';
import Overlay from '../../../ui/Overlay';
import styles from '../navigation.module.scss';
import { useMenu } from './MenuContext';

const MenuContent: React.FC = () => {
  const { isMenuOpen, isClosing } = useMenu();

  return (
    <>
      {/* 메뉴 오버레이 */}
      <Overlay
        open={isMenuOpen}
        unstyled={true}
        className={`${styles['menu-overlay']} ${
          isClosing ? styles['closing'] : ''
        } 
        ${isMenuOpen ? styles['active'] : ''}`}
        data-menu-overlay
      >
        <div
          className={`bg-surface-level-2 ${styles['menu-overlay-layer']}`}
          data-menu-overlay-before
        />
        <div
          className={`bg-surface-level-1 ${styles['menu-overlay-layer']} ${styles['menu-overlay-layer-after']}`}
          data-menu-overlay-after
        />
      </Overlay>

      {/* 메뉴 컨텐츠 */}
      <div
        data-menu-content
        className={`${styles['menu-content']} ${
          isMenuOpen ? styles['active'] : ''
        }`}
        tabIndex={isMenuOpen ? undefined : -1}
        aria-hidden={!isMenuOpen}
        id="global-menu"
      >
        <nav aria-label="메인 네비게이션">
          <ul>
            {menuItems.map(menu => (
              <MenuItem key={menu.label} label={menu.label} path={menu.path} />
            ))}
          </ul>
        </nav>
        <div className={`${styles['menu-download-section']} mx-6 xl:mx-8 mb-5`}>
          <ResumeDownloadButton
            tabIndex={isMenuOpen ? undefined : -1}
            size="sm"
          />
        </div>
      </div>
    </>
  );
};

const MenuItem = ({ label, path }: { label: string; path: string }) => {
  const { isMenuOpen, closeMenu } = useMenu();

  return (
    <li>
      <CustomButton
        noHoverActive={true}
        color="primary"
        variant="ghost"
        data-cursor="hover"
        onClick={() => {
          // path를 전달하여 closeMenu 호출
          closeMenu(path).catch(() => {
            console.error('Error closing menu');
          });
        }}
        cursorTrigger={true}
        className={`${styles['menu-content-item']} font-kor-point text-primary-900 dark:text-primary-50`}
        tabIndex={isMenuOpen ? undefined : -1}
      >
        {label}
      </CustomButton>
    </li>
  );
};

export default MenuContent;
