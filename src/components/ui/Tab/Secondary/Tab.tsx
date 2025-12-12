'use client';

import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import {
  getContainerClassName,
  getIndicatorClassName,
  getIndicatorStyle,
  getScrollContainerClassName,
  getScrollLeftButtonClassName,
  getScrollRightButtonClassName,
} from './classes';
import { TAB_SPACING } from './constants';
import { useSecondaryTab } from './hooks';
import { TabItem } from './TabItem';
import type { TabProps } from './types';

const Tab: React.FC<TabProps> = ({
  tabs,
  activeTab,
  onTabChange,
  className,
  uniqueId,
}) => {
  const {
    tabsRef,
    scrollContainerRef,
    tabListRef,
    isInitialized,
    indicatorStyle,
    scrollState,
    shouldShowTransition,
    handleTabClick,
    handleButtonKeydown,
    handleButtonFocusSync,
    handleArrowClick,
  } = useSecondaryTab({
    tabs,
    activeTab,
    onTabChange,
    uniqueId,
  });

  const containerClassName = React.useMemo(
    () => getContainerClassName(className),
    [className]
  );

  const scrollContainerClassName = React.useMemo(
    () => getScrollContainerClassName(shouldShowTransition),
    [shouldShowTransition]
  );

  const indicatorClassName = React.useMemo(() => getIndicatorClassName(), []);

  const indicatorStyleValue = React.useMemo(
    () => getIndicatorStyle(indicatorStyle, shouldShowTransition),
    [indicatorStyle, shouldShowTransition]
  );

  const scrollLeftButtonClassName = React.useMemo(
    () => getScrollLeftButtonClassName(),
    []
  );

  const scrollRightButtonClassName = React.useMemo(
    () => getScrollRightButtonClassName(),
    []
  );

  return (
    <div ref={tabsRef} className={containerClassName}>
      {scrollState.canScrollLeft && (
        <button
          type="button"
          onClick={() => handleArrowClick('left')}
          className={scrollLeftButtonClassName}
          aria-label="왼쪽으로 스크롤"
        >
          <FontAwesomeIcon
            icon={faChevronLeft}
            className="text-base relative z-10 text-text-secondary"
          />
        </button>
      )}
      <div
        ref={scrollContainerRef}
        className={scrollContainerClassName}
        role="tablist"
        aria-label="탭 네비게이션"
      >
        <div
          ref={tabListRef}
          className="flex"
          style={{
            gap: `${TAB_SPACING}px`,
          }}
        >
          {tabs.map(tab => (
            <div key={tab.id} className="w-fit group">
              <TabItem
                tab={tab}
                isActive={activeTab === tab.id}
                uniqueId={uniqueId}
                onTabClick={handleTabClick}
                onKeyDown={handleButtonKeydown}
                onFocus={handleButtonFocusSync}
              />
            </div>
          ))}
        </div>
        {isInitialized && (
          <span
            className={indicatorClassName}
            style={indicatorStyleValue}
            aria-hidden="true"
          />
        )}
      </div>
      {scrollState.canScrollRight && (
        <button
          type="button"
          onClick={() => handleArrowClick('right')}
          className={scrollRightButtonClassName}
          aria-label="오른쪽으로 스크롤"
        >
          <FontAwesomeIcon
            icon={faChevronRight}
            className="text-base relative z-10 text-text-secondary"
          />
        </button>
      )}
    </div>
  );
};

export default Tab;
