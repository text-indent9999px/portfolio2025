'use client';

import React from 'react';
import { useNavigationHistory } from '../../../../contexts/NavigationContext';
import { useRouter } from '../../../../utils/router';
import { BackButton } from '../../../ui/Button';

interface DetailBackButtonProps {
  timestamp?: string | number;
  transitionToken?: string;
  projectId?: string;
  onBeforeBack?: () => void;
}

const DetailBackButton: React.FC<DetailBackButtonProps> = ({
  timestamp,
  transitionToken,
  projectId,
  onBeforeBack,
}) => {
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
    onBeforeBack?.();
    const transitionRunId = Date.now();
    if (canGoBack) {
      navigateBack({
        useDefaultTransition: true,
        state:
          timestamp && transitionToken && projectId
            ? {
                timestamp,
                transitionToken,
                transitionScope: 'projects-list-detail',
                transitionTargetId: projectId,
                transitionFrom: 'detail-back',
                transitionRunId,
              }
            : undefined,
      });
    } else {
      // 리스트 페이지로
      navigateToUrl({
        url: '/projects',
        useDefaultTransition: true,
        state:
          timestamp && transitionToken && projectId
            ? {
                timestamp,
                transitionToken,
                transitionScope: 'projects-list-detail',
                transitionTargetId: projectId,
                transitionFrom: 'detail-back',
                transitionRunId,
              }
            : undefined,
        replace: true,
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

export default DetailBackButton;
