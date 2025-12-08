'use client';

import { useCallback } from 'react';
import type { TabItem } from '../common.types';
import { buildButtonFocusSync } from '../common.utils';

export interface UseTabNavigationProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  uniqueId: string;
}

export function useTabNavigation({
  tabs,
  activeTab,
  onTabChange,
  uniqueId,
}: UseTabNavigationProps) {
  const handleTabClick = useCallback(
    (tabId: string) => {
      onTabChange(tabId);
    },
    [onTabChange]
  );

  const handleButtonKeydown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    currentTabId: string
  ) => {
    const currentIndex = tabs.findIndex(tab => tab.id === currentTabId);
    if (currentIndex === -1) return;

    let targetIndex = currentIndex;

    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        targetIndex = Math.max(0, currentIndex - 1);
        break;
      case 'ArrowRight':
        e.preventDefault();
        targetIndex = Math.min(tabs.length - 1, currentIndex + 1);
        break;
      case 'Home':
        e.preventDefault();
        targetIndex = 0;
        break;
      case 'End':
        e.preventDefault();
        targetIndex = tabs.length - 1;
        break;
      case 'Tab':
        // Tab 키는 기본 동작을 유지하여 다음 포커스 가능한 요소로 이동
        return;
      default:
        return;
    }

    if (targetIndex !== currentIndex) {
      const targetTab = tabs[targetIndex];
      onTabChange(targetTab.id);

      setTimeout(() => {
        const targetButton = document.getElementById(
          `tab-${targetTab.id}-${uniqueId}`
        ) as HTMLButtonElement;
        targetButton?.focus();
      }, 100);
    }
  };

  const handleButtonFocusSync = buildButtonFocusSync({
    activeTab,
    onTabChange,
  });

  return {
    handleTabClick,
    handleButtonKeydown,
    handleButtonFocusSync,
  };
}
