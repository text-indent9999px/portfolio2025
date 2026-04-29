'use client';

import Image from 'next/image';
import React from 'react';
import { useRouter } from '../../../utils/router';
import CustomButton from '../../ui/Button';

interface LogoProps {
  className?: string;
  onClick?: () => Promise<void>;
  width?: number;
  height?: number;
}

const Logo: React.FC<LogoProps> = ({
  className = '',
  onClick,
  width = 50,
  height = 50,
}) => {
  const { navigateToUrl } = useRouter();

  const handleLogoClick = React.useCallback(async () => {
    if (onClick) {
      await onClick();
    }

    navigateToUrl({
      url: '/',
      useDefaultTransition: true,
      transitionType: 'nav-forward',
    });
  }, [onClick, navigateToUrl]);

  return (
    <CustomButton
      interactive={false}
      color="brand"
      variant="minimal"
      className={`${className} font-kor-point`}
      data-cursor="hover"
      cursorTrigger={true}
      onClick={handleLogoClick}
      aria-label="포트폴리오 홈으로 이동"
      aria-roledescription="로고 버튼"
      style={{ padding: 0 }}
    >
      <Image
        src={'/assets/images/logo.png'}
        className="invert-0 dark:invert-100 will-change-width transition-all duration-300 ease-in-out"
        alt="로고 이미지"
        width={width}
        height={height}
      />
    </CustomButton>
  );
};

export default Logo;
