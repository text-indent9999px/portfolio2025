export const getSecondaryTabButtonClassName = (hasNotification: boolean) => {
  return [
    'relative inline-flex items-center',
    'py-[0.5rem] pl-[3px] gap-[0.5rem]',
    hasNotification ? 'pr-1' : 'pr-[3px]',
    'bg-transparent border-none',
    'text-sm font-medium whitespace-nowrap',
    'transition-all duration-200 ease-in-out',
    'cursor-pointer',
    'focus-visible:outline-2 focus-visible:outline-accent-500 focus-visible:outline-offset-[-3px]',
  ]
    .filter(Boolean)
    .join(' ');
};

export const getSecondaryTabButtonContainerClassName = (
  hasNotification: boolean
) => {
  return [
    'relative',
    'flex',
    'select-none',
    'before:content-[attr(data-text)] before:flex before:items-center before:font-bold before:opacity-0 before:pointer-events-none before:white-space-nowrap',
    hasNotification ? 'before:pe-[8px]' : '',
  ]
    .filter(Boolean)
    .join(' ');
};

/**
 * 왼쪽 스크롤 버튼 className
 */
export const getScrollLeftButtonClassName = () => {
  return [
    'absolute left-0 top-0 bottom-0',
    'z-10',
    'flex items-center justify-center',
    'pr-3 mb-[0.75rem] mt-[0.25rem]',
    'bg-gradient-to-l from-transparent',
    'via-[color-mix(in_srgb,var(--color-surface-level-min,#ffffff)_80%,transparent)]',
    'via-[45%] to-[color-mix(in_srgb,var(--color-surface-level-min,#ffffff)_100%,transparent)]',
  ]
    .filter(Boolean)
    .join(' ');
};

/**
 * 오른쪽 스크롤 버튼 className
 */
export const getScrollRightButtonClassName = () => {
  return [
    'absolute right-6 xl:right-0 top-0 bottom-0',
    'z-10',
    'flex items-center justify-center',
    'pl-3 mb-[0.75rem] mt-[0.25rem]',
    'bg-gradient-to-r from-transparent',
    'via-[color-mix(in_srgb,var(--color-surface-level-min,#ffffff)_80%,transparent)]',
    'via-[45%] to-[color-mix(in_srgb,var(--color-surface-level-min,#ffffff)_100%,transparent)]',
  ]
    .filter(Boolean)
    .join(' ');
};

export const getSecondaryTabLabelClassName = (isActive: boolean) => {
  return [
    'absolute left-0 top-1/2 -translate-y-1/2',
    'transition-all duration-200 ease-in-out',
    isActive
      ? 'text-primary-900 dark:text-primary-50 font-semibold'
      : 'text-primary-500 dark:text-primary-300 font-medium group-hover:text-primary-700',
  ]
    .filter(Boolean)
    .join(' ');
};

export const getSecondaryBadgeClassName = (isActive: boolean) => {
  return [
    isActive
      ? 'opacity-100 dark:brightness-100'
      : 'contrast-135 group-hover:contrast-100 dark:brightness-80 dark:group-hover:brightness-90',
    'transition-all duration-200 ease-in-out',
  ]
    .filter(Boolean)
    .join(' ');
};

export const getContainerClassName = (className: string | undefined) => {
  return [
    'relative overflow-hidden',
    'max-w-full',
    'pt-[0.25rem] pb-[0.25rem]',
    className || '',
  ]
    .filter(Boolean)
    .join(' ');
};

export const getScrollContainerClassName = (shouldShowTransition: boolean) => {
  return [
    'relative w-full overflow-x-auto overflow-y-hidden',
    'border-b-1 border-primary-300',
    'pb-[0.5rem]',
    'no-scrollbar',
    shouldShowTransition ? 'scroll-smooth' : '',
    'touch-pan-x',
  ]
    .filter(Boolean)
    .join(' ');
};

export const getIndicatorClassName = () => {
  return [
    'absolute left-0 bottom-0 z-1',
    'h-[3px]',
    'bg-primary-900 dark:bg-primary-50',
    'rounded-[1px]',
    'will-change-transform',
    'will-change-width',
  ]
    .filter(Boolean)
    .join(' ');
};

export const getIndicatorStyle = (
  indicatorStyle: {
    width: number;
    left: number;
    transformOrigin?: 'left' | 'right';
  },
  shouldShowTransition: boolean
): React.CSSProperties => {
  return {
    width: `${indicatorStyle.width}px`,
    transform: `translateX(${indicatorStyle.left}px)`,
    transformOrigin: indicatorStyle.transformOrigin || 'left',
    transition: shouldShowTransition
      ? 'width 200ms linear 30ms, transform 250ms linear'
      : 'none',
  };
};

export const getTabAriaLabel = (
  label: string,
  notification?: number | string
): string => {
  return `${label} 탭${notification ? `, ${notification}개 알림` : ''}`;
};
