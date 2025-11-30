// PrimaryTab className 계산 함수들

// 탭 버튼 className 계산 함수
export const getTabButtonClassName = (
  isActive: boolean,
  hasNotification: boolean
) => {
  return [
    // Group/State
    'group',
    // Layout/Position
    'relative flex items-center justify-center',
    // Spacing
    'px-[1rem] lg:px-[1.5rem]',
    // Size
    'h-[2.5rem]',
    // Border radius
    'rounded-[1.5rem]',
    // Typography
    'text-sm font-medium whitespace-nowrap',
    // Transitions
    'transition-color duration-200 ease-in-out',
    // Interactive
    'cursor-pointer',
    // Conditional text colors
    isActive
      ? 'text-primary-50 dark:text-primary-900 font-semibold'
      : 'text-primary-900 dark:text-primary-50 font-medium hover:text-primary-700 dark:hover:text-primary-300',
    // Focus states
    'focus-visible:ring-2 focus-visible:outline-2 focus-visible:outline-accent-500 focus-visible:outline-offset-3 focus-visible:rounded-full',
    // text drag disable
  ]
    .filter(Boolean)
    .join(' ');
};

export const getTabButtonContainerClassName = (hasNotification: boolean) => {
  return [
    'relative',
    'flex',
    'select-none',
    // Before pseudo-element
    'before:content-[attr(data-text)] before:flex before:items-center before:font-bold before:opacity-0 before:pointer-events-none before:white-space-nowrap',
    hasNotification ? 'before:pe-[8px]' : '',
  ]
    .filter(Boolean)
    .join(' ');
};

// 탭 라벨 className 계산 함수
export const getTabLabelClassName = (isActive: boolean) => {
  return [
    // Position
    'absolute left- top-1/2 -translate-y-1/2',
    isActive ? ' font-semibold' : '',
  ]
    .filter(Boolean)
    .join(' ');
};

// Badge className 계산 함수
export const getBadgeClassName = (isActive: boolean) => {
  return isActive ? '' : 'group-hover:opacity-70';
};

// 컨테이너 className 계산 함수
export const getContainerClassName = (
  orientation: 'horizontal' | 'vertical',
  className: string | undefined
) => {
  return [
    // Layout
    'inline-flex relative size-fit',
    // Spacing
    'p-[0.5rem] gap-[0.25rem]',
    // Border
    'border-2 border-primary-900 dark:border-primary-50',
    // Conditional orientation
    orientation === 'vertical' ? 'flex-col rounded-[0.5rem]' : 'rounded-[2rem]',
    // z-index
    '**:z-2',
    className || '',
  ]
    .filter(Boolean)
    .join(' ');
};

// 인디케이터 className 계산 함수
export const getIndicatorClassName = (
  orientation: 'horizontal' | 'vertical',
  shouldShowTransition: boolean
) => {
  return [
    // Position
    'absolute top-[0.5rem] z-1!',
    orientation === 'vertical' ? 'left-[0.5rem]' : 'left-0',
    // Layout
    'flex',
    // Size
    'h-[2.5rem]',
    // Background
    'bg-primary-900 dark:bg-primary-50',
    // Border radius
    'rounded-[1.5rem]',
    // Transition
    shouldShowTransition
      ? 'transition-all duration-300 ease-[cubic-bezier(0.4, 0, 0.2, 1)]'
      : 'transition-none',
  ]
    .filter(Boolean)
    .join(' ');
};

// 인디케이터 스타일 계산 함수
export const getIndicatorStyle = (
  indicatorStyle: { width: number; left: number },
  orientation: 'horizontal' | 'vertical'
): React.CSSProperties => {
  return {
    width: `${indicatorStyle.width}px`,
    transform:
      orientation === 'vertical'
        ? `translateY(${indicatorStyle.left}px)`
        : `translateX(${indicatorStyle.left}px)`,
  };
};
