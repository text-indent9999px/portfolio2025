'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useScrollRestoration } from '../../../../hooks/useScrollRestoration';
import { useRouter } from '../../../../utils/router';
import Blank from '../../../ui/Blank';
import { ProjectList } from '../list';
import { projectData } from '../../../../data/projects';

const List: React.FC = () => {
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
      <ProjectList projects={projectData} />
      <Blank height="5rem" bgColor="transparent" />
    </div>
  );
};

export default List;

