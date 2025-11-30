import React from 'react';
import type { TabItem } from '../common.types';

export function buildTabsKeydownHandler({
  tabs,
  activeTab,
  onTabChange,
  uniqueId,
  orientation = 'horizontal',
}: {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  uniqueId: string;
  orientation?: 'horizontal' | 'vertical';
}) {
  return (e: React.KeyboardEvent<HTMLDivElement>) => {
    const currentIndex = tabs.findIndex(t => t.id === activeTab);
    if (currentIndex === -1) return;
    let nextIndex = currentIndex;
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        if (orientation === 'horizontal' && e.key === 'ArrowDown') break;
        nextIndex = (currentIndex + 1) % tabs.length;
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        if (orientation === 'horizontal' && e.key === 'ArrowUp') break;
        nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = tabs.length - 1;
        break;
      default:
        return;
    }
    e.preventDefault();
    const nextTab = tabs[nextIndex];
    if (!nextTab) return;
    onTabChange(nextTab.id);
    const nextButtonId = `tab-${nextTab.id}-${uniqueId}`;
    const el = document.getElementById(
      nextButtonId
    ) as HTMLButtonElement | null;
    el?.focus();
  };
}

