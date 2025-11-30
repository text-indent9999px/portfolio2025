'use client';

import { ErrorPage } from '../components/pages/Error';
import { useNavigationHistory } from '../contexts/NavigationContext';

export default function NotFound({
  title,
  backHref,
}: {
  title?: string;
  backHref?: string;
}) {
  const { history, canGoBack } = useNavigationHistory();

  // 이전 페이지가 있으면 그곳으로, 없으면 홈으로
  const getPreviousUrl = () => {
    if (canGoBack && history.length > 1) {
      return history[history.length - 2].url;
    }
    return '/';
  };

  const notFoundError = {
    status: 404,
    message: '요청하신 페이지를 찾을 수 없습니다.',
  };

  return (
    <ErrorPage
      error={notFoundError}
      title={title}
      backHref={backHref || getPreviousUrl()}
    />
  );
}
