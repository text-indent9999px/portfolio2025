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
import { MemoizedTabItem } from './TabItem';
import type { TabProps } from './types';

const INDICATOR_CLASS_NAME = getIndicatorClassName();
const SCROLL_LEFT_BUTTON_CLASS_NAME = getScrollLeftButtonClassName();
const SCROLL_RIGHT_BUTTON_CLASS_NAME = getScrollRightButtonClassName();

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
    handleArrowLeft,
    handleArrowRight,
  } = useSecondaryTab({
    tabs,
    activeTab,
    onTabChange,
    uniqueId,
  });

  return (
    <div ref={tabsRef} className={getContainerClassName(className)}>
      <button
        type="button"
        onClick={handleArrowLeft}
        className={`${SCROLL_LEFT_BUTTON_CLASS_NAME} ${
          scrollState.canScrollLeft ? '' : 'invisible pointer-events-none'
        }`}
        aria-label="왼쪽으로 스크롤"
      >
        <FontAwesomeIcon
          icon={faChevronLeft}
          className="text-base relative z-10 text-text-secondary"
        />
      </button>
      <div
        ref={scrollContainerRef}
        className={getScrollContainerClassName(shouldShowTransition)}
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
              <MemoizedTabItem
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
            className={INDICATOR_CLASS_NAME}
            style={getIndicatorStyle(indicatorStyle, shouldShowTransition)}
            aria-hidden="true"
          />
        )}
      </div>
      <button
        type="button"
        onClick={handleArrowRight}
        className={`${SCROLL_RIGHT_BUTTON_CLASS_NAME} ${
          scrollState.canScrollRight ? '' : 'invisible pointer-events-none'
        }`}
        aria-label="오른쪽으로 스크롤"
      >
        <FontAwesomeIcon
          icon={faChevronRight}
          className="text-base relative z-10 text-text-secondary"
        />
      </button>
    </div>
  );
};

export default Tab;
