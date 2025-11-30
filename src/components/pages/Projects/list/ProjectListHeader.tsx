'use client';

import { useRouter } from '../../../../utils/router';
import ListBackButton from './BackButton';

export function ProjectListHeader() {
  const { getNavigationState } = useRouter();
  const state = getNavigationState() as { timestamp?: number } | undefined;
  const timestamp = state?.timestamp ?? Date.now();

  return <ListBackButton timestamp={timestamp} />;
}

