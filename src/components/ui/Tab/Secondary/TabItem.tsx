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

  return (
    <button
      id={`tab-${tab.id}-${uniqueId}`}
      type="button"
      data-tab-id={tab.id}
      data-text={tab.label}
      className={getSecondaryTabButtonClassName(hasNotification)}
      onClick={() => onTabClick(tab.id)}
      onKeyDown={e => onKeyDown(e, tab.id)}
      onFocus={() => onFocus(tab.id)}
      role="tab"
      aria-selected={isActive ? 'true' : 'false'}
      aria-controls={`panel-${tab.id}-${uniqueId}`}
      tabIndex={isActive ? 0 : -1}
      aria-label={getTabAriaLabel(tab.label, tab.notification)}
    >
      <div
        className={getSecondaryTabButtonContainerClassName(hasNotification)}
        data-text={`${tab.label}`}
      >
        <span className={getSecondaryTabLabelClassName(isActive)}>
          {tab.label}
        </span>
        {hasNotification && (
          <Badge
            size="xs"
            shape="circle"
            variant="filled"
            color={isActive ? 'primary' : 'gray'}
            className={getSecondaryBadgeClassName(isActive)}
          >
            {tab.notification}
          </Badge>
        )}
      </div>
    </button>
  );
};
