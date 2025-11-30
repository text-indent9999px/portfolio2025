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

  const handleKeyDown = buildTabsKeydownHandler({
    tabs,
    activeTab,
    onTabChange,
    uniqueId,
    orientation,
  });

  const containerClassName = React.useMemo(
    () => getContainerClassName(orientation, className),
    [orientation, className]
  );

  const indicatorClassName = React.useMemo(
    () => getIndicatorClassName(orientation, shouldShowTransition),
    [orientation, shouldShowTransition]
  );

  const indicatorStyleValue = React.useMemo(
    () => getIndicatorStyle(indicatorStyle, orientation),
    [indicatorStyle, orientation]
  );

  return (
    <div
      ref={tabsRef}
      role="tablist"
      aria-orientation={orientation}
      onKeyDown={handleKeyDown}
      className={containerClassName}
    >
      {tabs.map(tab => {
        const isActive = activeTab === tab.id;
        const hasNotification = !!tab.notification;

        return (
          <button
            key={tab.id}
            role="tab"
            id={`tab-${tab.id}-${uniqueId}`}
            aria-selected={isActive ? 'true' : 'false'}
            aria-controls={`panel-${tab.id}-${uniqueId}`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => handleTabChange(tab.id, onTabChange)}
            className={getTabButtonClassName(isActive, hasNotification)}
            data-tab-id={tab.id}
            type="button"
          >
            <div
              className={getTabButtonContainerClassName(hasNotification)}
              data-text={`${tab.label}`}
            >
              <span className={getTabLabelClassName(isActive)}>
                {tab.label}
              </span>
              {hasNotification && (
                <Badge
                  size="xs"
                  variant={isActive ? 'tonal' : 'tonal'}
                  color={isActive ? 'secondary' : 'gray'}
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
        <span className={indicatorClassName} style={indicatorStyleValue} />
      )}
    </div>
  );
};

export default Tab;
