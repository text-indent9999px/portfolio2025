'use client';

import React, { unstable_ViewTransition as ViewTransition } from 'react';
import { useNavigationHistory } from '../../../../contexts/NavigationContext';
import { useRouter } from '../../../../utils/router';
import { BackButton } from '../../../ui/Button';

interface ListBackButtonProps {
  timestamp?: number;
}

const ListBackButton: React.FC<ListBackButtonProps> = ({ timestamp }) => {
  const { history, canGoBack } = useNavigationHistory();
  const { navigateBack, navigateToUrl } = useRouter();

  // 이전 페이지가 projects detail면 enablePageTransition false, 아니면 true
  const getEnablePageTransition = (): boolean => {
    if (canGoBack && history.length > 1) {
      const previousUrl = history[history.length - 2].url;
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
    <ViewTransition name={`back-button-${timestamp}`} update="none">
      <BackButton
        enablePageTransition={getEnablePageTransition()}
        onClick={handleBack}
        href={undefined}
      />
    </ViewTransition>
  );
};

export default ListBackButton;
