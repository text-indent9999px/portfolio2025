'use client';

import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useMediaQuery } from '../../../hooks';
import { ThemeState, useThemeDetector } from '../../../utils/themeDetector';
import { Toggle } from '../Toggle';
import Tooltip from '../Tooltip/Tooltip';

import { ThemeToggleProps } from './ThemeToggle.types';

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = '',
  needInvert = false,
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
      currentTheme.isDark !== null ? 'opacity-100' : 'opacity-0',
      'text-accent-500',
      'will-change-transform',
    ]
      .filter(Boolean)
      .join(' ');
  }, [currentTheme.isDark]);

  // 아이콘 className 계산 함수
  const getSunIconClassName = (isDark: boolean) => {
    return isDark ? 'text-primary-300 opacity-[0.5]' : 'text-accent-300';
  };

  const getMoonIconClassName = (isDark: boolean) => {
    return isDark ? 'text-accent-100' : 'text-primary-800 opacity-[0.5]';
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
        aria-describedby="theme-toggle-tooltip"
        renderThumb={isDark => {
          return (
            <span className="absolute w-[190%] h-[100%] flex items-center justify-between left-[50%] transform -translate-x-[50%]">
              <FontAwesomeIcon
                icon={faSun}
                className={`${getSunIconClassName(isDark)} ${
                  size === 'sm' ? 'text-sm' : ''
                }`}
              />
              <FontAwesomeIcon
                icon={faMoon}
                className={`${getMoonIconClassName(isDark)} ${
                  size === 'sm' ? 'text-sm' : ''
                }`}
              />
            </span>
          );
        }}
      />

      {isXlOrAbove && (
        <Tooltip
          isVisible={isTooltipVisible}
          className={`pointer-events-none`}
          arrow={true}
          arrowPosition="center"
          tooltipPosition="bottom"
          offset={{ top: '5px' }}
          inverted={needInvert}
        >
          <span id="theme-toggle-tooltip">라이트/다크 모드 전환</span>
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
