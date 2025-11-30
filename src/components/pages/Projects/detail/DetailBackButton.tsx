'use client';

import React, { unstable_ViewTransition as ViewTransition } from 'react';
import { useNavigationHistory } from '../../../../contexts/NavigationContext';
import { useRouter } from '../../../../utils/router';
import { BackButton } from '../../../ui/Button';

interface DetailBackButtonProps {
  timestamp?: number;
}

const DetailBackButton: React.FC<DetailBackButtonProps> = ({ timestamp }) => {
  const { history, canGoBack } = useNavigationHistory();
  const { navigateBack, navigateToUrl } = useRouter();

  // 이전 페이지가 projects면 enablePageTransition false, 아니면 true
  const getEnablePageTransition = (): boolean => {
    if (canGoBack && history.length > 1) {
      const previousUrl = history[history.length - 2].url;
      return !previousUrl.includes('/projects');
    }
    return true; // 기본값
  };

  const handleBack = () => {
    if (canGoBack) {
      navigateBack({
        useDefaultTransition: false,
        state: timestamp ? { timestamp } : undefined,
      });
    } else {
      // 리스트 페이지로
      navigateToUrl({
        url: '/projects',
        useDefaultTransition: false,
        state: timestamp ? { timestamp } : undefined,
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

export default DetailBackButton;
