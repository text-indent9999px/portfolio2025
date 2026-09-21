'use client';

import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useMediaQuery } from '../../../hooks';
import { ThemeState, useThemeDetector } from '../../../utils/themeDetector';
import { Toggle } from '../Toggle';
import { Tooltip } from '../Tooltip';

import styles from './ThemeToggle.module.scss';
import { ThemeToggleProps } from './ThemeToggle.types';

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = '',
  size = 'md',
}) => {
  const isXlOrAbove = useMediaQuery('--breakpoint-xl', 'min');
  const { getCurrentTheme, toggleTheme, subscribe } = useThemeDetector();

  // SSR와 클라이언트 첫 렌더가 동일하도록 중립 초기값
  const [currentTheme, setCurrentTheme] = useState<ThemeState>({
    mode: '',
    isDark: null,
  });

  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [announceText, setAnnounceText] = useState('');

  useEffect(() => {
    setCurrentTheme(getCurrentTheme());

    // 테마 변경 구독
    const unsubscribe = subscribe(setCurrentTheme);

    return unsubscribe;
  }, [getCurrentTheme, subscribe]);

  const checked = currentTheme.isDark ?? false;

  useEffect(() => {
    if (currentTheme.isDark === null) return;
    setAnnounceText(
      currentTheme.isDark ? '다크 모드로 변경됨' : '라이트 모드로 변경됨'
    );
  }, [currentTheme.isDark]);

  // Container className 병합
  const containerClassName = React.useMemo(() => {
    return ['relative', 'inline-block', className].filter(Boolean).join(' ');
  }, [className]);

  // Toggle className 병합
  const toggleClassName = React.useMemo(() => {
    return [
      styles.root,
      styles[size],
      currentTheme.isDark !== null ? 'opacity-100' : 'opacity-0',
      'will-change-transform',
    ]
      .filter(Boolean)
      .join(' ');
  }, [currentTheme.isDark, size]);

  // 아이콘 className: 켜진 쪽은 썸 위에서 골드로, 꺼진 쪽은 트랙 위에서 보조 텍스트색으로 보인다.
  const getSunIconClassName = (isDark: boolean) => {
    return isDark ? 'text-text-secondary' : 'text-accent-600';
  };

  const getMoonIconClassName = (isDark: boolean) => {
    return isDark ? 'text-accent-600' : 'text-text-secondary';
  };

  // ariaLabel 계산
  const ariaLabelValue = React.useMemo(() => {
    return checked ? '다크 모드' : '라이트 모드';
  }, [checked]);

  return (
    <div className={containerClassName}>
      <Toggle
        checked={checked}
        onChange={() => toggleTheme()}
        className={toggleClassName}
        ariaLabel={ariaLabelValue}
        toggleType="theme"
        size={size}
        onFocus={() => isXlOrAbove && setIsTooltipVisible(true)}
        onBlur={() => isXlOrAbove && setIsTooltipVisible(false)}
        onMouseEnter={() => isXlOrAbove && setIsTooltipVisible(true)}
        onMouseLeave={() => isXlOrAbove && setIsTooltipVisible(false)}
        ariaDescribedBy={
          isTooltipVisible ? 'theme-toggle-tooltip' : undefined
        }
        renderThumb={isDark => {
          return (
            <span className="absolute flex items-center justify-between">
              <FontAwesomeIcon
                icon={faSun}
                className={getSunIconClassName(isDark)}
              />
              <FontAwesomeIcon
                icon={faMoon}
                className={getMoonIconClassName(isDark)}
              />
            </span>
          );
        }}
      />

      {isXlOrAbove && (
        <Tooltip
          id="theme-toggle-tooltip"
          isVisible={isTooltipVisible}
          className={`pointer-events-none`}
          arrow={true}
          arrowPosition="center"
          tooltipPosition="bottom"
          offset={{ top: '5px' }}
        >
          <span>라이트/다크 모드 전환</span>
        </Tooltip>
      )}

      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announceText}
      </div>
    </div>
  );
};
