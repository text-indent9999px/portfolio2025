'use client';

import dynamic from 'next/dynamic';
import { useMediaQuery } from '../../../hooks';
import React from 'react';

const CustomCursor = dynamic(() => import('./CustomCursor'), {
  ssr: false,
});

const LazyCustomCursor: React.FC = () => {
  const isXlOrAbove = useMediaQuery('--breakpoint-xl', 'min');

  if (!isXlOrAbove) {
    return null;
  }

  return <CustomCursor />;
};

export default LazyCustomCursor;

