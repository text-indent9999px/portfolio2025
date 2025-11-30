import { DISABLED_CLASSES, getColorClasses } from '../shared/UI.config';

export type ToggleSize = 'sm' | 'md' | 'lg';

export const getTrackBaseClass = (): string => 'rounded-full';

export const getTrackSizeClass = (size: ToggleSize): string => {
  const map: Record<ToggleSize, string> = {
    sm: 'w-13 h-7',
    md: 'w-15 h-8',
    lg: 'w-20 h-10',
  };
  return map[size];
};

export const getThumbSizeClass = (size: ToggleSize): string => {
  const map: Record<ToggleSize, string> = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-7 h-7',
  };
  return map[size];
};

export const getThumbTranslateClasses = (
  size: ToggleSize,
  checked: boolean
): string => {
  const map: Record<ToggleSize, { on: string; off: string }> = {
    sm: {
      on: 'translate-x-[calc(var(--spacing)*7.5)]',
      off: 'translate-x-[calc(var(--spacing)*1.5)]',
    },
    md: {
      on: 'translate-x-[calc(var(--spacing)*8.5)]',
      off: 'translate-x-[calc(var(--spacing)*1.5)]',
    },
    lg: {
      on: 'translate-x-[calc(var(--spacing)*11.5)]',
      off: 'translate-x-[calc(var(--spacing)*1.5)]',
    },
  };
  return checked ? map[size].on : map[size].off;
};

export const getFocusRingClasses = (): string =>
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2';

// track 상태 스타일링
export const getTrackStateClasses = (
  isOnOffToggle: boolean,
  checked: boolean,
  isDisabled: boolean
): string => {
  if (isDisabled) {
    return DISABLED_CLASSES.filled;
  }
  if (isOnOffToggle) {
    if (checked) {
      // on/off 토글의 on 상태: success tonal
      return getColorClasses('success', 'tonal', true);
    } else {
      // on/off 토글의 off 상태: gray tonal
      return getColorClasses('gray', 'tonal', true);
    }
  } else {
    // 기본 토글: primary tonal
    return getColorClasses('primary', 'tonal', true);
  }
};

// thumb 상태 스타일링
export const getThumbStateClasses = (isDisabled: boolean): string => {
  if (isDisabled) {
    return 'bg-[var(--color-disabled-text)] opacity-80 dark:opacity-100 dark:brightness-50';
  }
  const className = 'bg-surface-0 ';
  return className;
};
