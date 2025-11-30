import type React from 'react';

interface BuildClickHandlerArgs {
  disabled?: boolean;
  href?: string;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  navigateBack: (options?: {
    useDefaultTransition?: boolean;
    transitionType?: string;
  }) => void;
  navigateToUrl: (options: {
    url: string;
    useDefaultTransition?: boolean;
    transitionType?: string;
  }) => void;
}

export function buildClickHandler({
  disabled,
  href,
  onClick,
  navigateBack,
  navigateToUrl,
}: BuildClickHandlerArgs) {
  return (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;

    const handleClick = () => {
      onClick?.(e);
      if (href) {
        // 외부 링크인 경우 (http:// 또는 https://로 시작)
        if (href.startsWith('http://') || href.startsWith('https://')) {
          window.open(href, '_blank', 'noopener,noreferrer');
          return;
        }
        if (href.startsWith('back')) {
          const ablePageTransition = href.endsWith(':disable-page-transition');
          navigateBack({ useDefaultTransition: !ablePageTransition });
          return;
        }
        navigateToUrl({ url: href });
        return;
      }
    };
    handleClick();
  };
}
