'use client';

import React from 'react';
import { Badge } from '../../Badge';
import type { TabItem as TabItemType } from '../common.types';
import {
  getSecondaryBadgeClassName,
  getSecondaryTabButtonClassName,
  getSecondaryTabButtonContainerClassName,
  getSecondaryTabLabelClassName,
  getTabAriaLabel,
} from './classes';

export interface TabItemProps {
  tab: TabItemType;
  isActive: boolean;
  uniqueId: string;
  onTabClick: (tabId: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLButtonElement>, tabId: string) => void;
  onFocus: (tabId: string) => void;
}

export const TabItem: React.FC<TabItemProps> = ({
  tab,
  isActive,
  uniqueId,
  onTabClick,
  onKeyDown,
  onFocus,
}) => {
  const hasNotification = !!tab.notification;
  const handleClick = React.useCallback(
    () => onTabClick(tab.id),
    [onTabClick, tab.id]
  );
  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>) => onKeyDown(e, tab.id),
    [onKeyDown, tab.id]
  );
  const handleFocus = React.useCallback(
    () => onFocus(tab.id),
    [onFocus, tab.id]
  );

  return (
    <button
      id={`tab-${tab.id}-${uniqueId}`}
      type="button"
      data-tab-id={tab.id}
      className={getSecondaryTabButtonClassName(hasNotification)}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      role="tab"
      aria-selected={isActive}
      aria-controls={`panel-${tab.id}-${uniqueId}`}
      tabIndex={isActive ? 0 : -1}
      aria-label={getTabAriaLabel(tab.label, tab.notification)}
    >
      <div
        className={getSecondaryTabButtonContainerClassName(hasNotification)}
        data-text={tab.label}
      >
        <span className={getSecondaryTabLabelClassName(isActive)}>
          {tab.label}
        </span>
        {hasNotification && (
          <Badge
            size="xs"
            shape="circle"
            variant={isActive ? 'solid' : 'outline'}
            color={isActive ? 'info' : 'neutral'}
            className={getSecondaryBadgeClassName(isActive)}
          >
            {tab.notification}
          </Badge>
        )}
      </div>
    </button>
  );
};

export const MemoizedTabItem = React.memo(TabItem);
