'use client';

import React from 'react';
import Overlay from '../Overlay';
import Spinner from './Spinner';

export const PageSpinner: React.FC<{
  text?: string;
  type?: 'normal' | 'inverted';
  open?: boolean;
}> = ({ text, type = 'normal', open = true }) => {
  // Overlay 스타일 계산
  const overlayStyle = React.useMemo<React.CSSProperties>(() => {
    return {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
    };
  }, []);

  return (
    <Overlay open={open} blur={true} style={overlayStyle}>
      <Spinner size="lg" type={type} showText text={text} />
    </Overlay>
  );
};

export default PageSpinner;
