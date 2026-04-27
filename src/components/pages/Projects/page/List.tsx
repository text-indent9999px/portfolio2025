'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useScrollRestoration } from '../../../../hooks/useScrollRestoration';
import { useRouter } from '../../../../utils/router';
import Blank from '../../../ui/Blank';
import InfoText from '../../../ui/InfoText';
import { ProjectList } from '../list';
import type { ProjectDetail } from '../types';

interface ListProps {
  projects: ProjectDetail[];
  errorMessage?: string | null;
}

const List: React.FC<ListProps> = ({ projects, errorMessage }) => {
  // 스크롤 복원 훅 사용
  useScrollRestoration();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { getNavigationState, navigateToUrl } = useRouter();

  useEffect(() => {
    const state = getNavigationState() as
      | {
          transitionScope?: string;
          transitionFrom?: 'list-forward' | 'detail-back';
        }
      | undefined;

    if (
      state?.transitionScope !== 'projects-list-detail' ||
      state?.transitionFrom !== 'detail-back'
    ) {
      return;
    }

    const query = searchParams.toString();
    const url = query ? `${pathname}?${query}` : pathname;

    // back 전환용 state는 리스트에서 1회성으로 소비 후 즉시 정리한다.
    requestAnimationFrame(() => {
      navigateToUrl({
        url,
        useDefaultTransition: false,
        replace: true,
      });
    });
  }, [getNavigationState, navigateToUrl, pathname, searchParams]);

  return (
    <div className="min-h-screen">
      {errorMessage ? (
        <InfoText type="danger" title="데이터를 불러오지 못했습니다">
          {errorMessage}
        </InfoText>
      ) : (
        <ProjectList projects={projects} />
      )}
      <Blank height="5rem" bgColor="transparent" />
    </div>
  );
};

export default List;

