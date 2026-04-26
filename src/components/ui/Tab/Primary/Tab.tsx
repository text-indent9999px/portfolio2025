'use client';

import React from 'react';
import { Badge } from '../../Badge';
import { buildTabsKeydownHandler } from './a11y';
import {
  getBadgeClassName,
  getContainerClassName,
  getIndicatorClassName,
  getIndicatorStyle,
  getTabButtonClassName,
  getTabButtonContainerClassName,
  getTabLabelClassName,
} from './classes';
import { useTabIndicator } from './hooks';
import type { TabProps } from './types';

const Tab: React.FC<TabProps> = ({
  tabs,
  activeTab,
  onTabChange,
  className,
  enableTransition = false,
  orientation = 'horizontal',
  uniqueId,
}) => {
  const {
    tabsRef,
    isInitialized,
    indicatorStyle,
    shouldShowTransition,
    handleTabChange,
  } = useTabIndicator({
    activeTab,
    tabs,
    enableTransition,
    orientation,
  });

  const handleKeyDown = React.useMemo(
    () =>
      buildTabsKeydownHandler({
        tabs,
        activeTab,
        onTabChange,
        uniqueId,
        orientation,
      }),
    [tabs, activeTab, onTabChange, uniqueId, orientation]
  );

  return (
    <div
      ref={tabsRef}
      role="tablist"
      aria-orientation={orientation}
      onKeyDown={handleKeyDown}
      className={getContainerClassName(orientation, className)}
    >
      {tabs.map(tab => {
        const isActive = activeTab === tab.id;
        const hasNotification = !!tab.notification;

        return (
          <button
            key={tab.id}
            role="tab"
            id={`tab-${tab.id}-${uniqueId}`}
            aria-selected={isActive}
            aria-controls={`panel-${tab.id}-${uniqueId}`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => handleTabChange(tab.id, onTabChange)}
            className={getTabButtonClassName(isActive, hasNotification)}
            data-tab-id={tab.id}
            type="button"
          >
            <div
              className={getTabButtonContainerClassName(hasNotification)}
              // CSS에서 content: attr(data-text)로 숨은 bold 폭을 미리 확보해
              // active 전환 시 라벨 너비 흔들림을 줄인다.
              data-text={tab.label}
            >
              <span className={getTabLabelClassName(isActive)}>
                {tab.label}
              </span>
              {hasNotification && (
                <Badge
                  size="xs"
                  variant={isActive ? 'solid' : 'soft'}
                  color={isActive ? 'info' : 'neutral'}
                  className={getBadgeClassName(isActive)}
                >
                  {tab.notification}
                </Badge>
              )}
            </div>
          </button>
        );
      })}
      {isInitialized && (
        <span
          className={getIndicatorClassName(orientation, shouldShowTransition)}
          style={getIndicatorStyle(indicatorStyle, orientation)}
        />
      )}
    </div>
  );
};

export default Tab;
