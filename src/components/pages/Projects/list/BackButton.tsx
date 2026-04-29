'use client';

import React from 'react';
import { useNavigationHistory } from '../../../../contexts/NavigationContext';
import { useRouter } from '../../../../utils/router';
import { BackButton } from '../../../ui/Button';

const ListBackButton: React.FC = () => {
  const { history, currentIndex, canGoBack } = useNavigationHistory();
  const { navigateBack, navigateToUrl } = useRouter();

  // 이전 페이지가 projects detail면 enablePageTransition false, 아니면 true
  const getEnablePageTransition = (): boolean => {
    if (canGoBack && currentIndex > 0) {
      const previousUrl = history[currentIndex - 1]?.url ?? '';
      return !previousUrl.includes('/projects/');
    }
    return true; // 기본값
  };

  const handleBack = () => {
    if (canGoBack) {
      navigateBack({
        useDefaultTransition: getEnablePageTransition(),
      });
    } else {
      // 홈으로
      navigateToUrl({
        url: '/',
      });
    }
  };

  return (
    <BackButton
      enablePageTransition={getEnablePageTransition()}
      onClick={handleBack}
      href={undefined}
    />
  );
};

export default ListBackButton;
