'use client';

import React from 'react';

import Overlay from '../Overlay';
import Spinner from './Spinner';

const pageSpinnerOverlayStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9999,
};

export const PageSpinner: React.FC<{
  text?: string;
  type?: 'normal' | 'inverted';
  open?: boolean;
}> = ({ text, type = 'normal', open = true }) => {
  return (
    <Overlay
      open={open}
      blur={true}
      style={pageSpinnerOverlayStyle}
      role="presentation"
      closeOnEscape={false}
    >
      <Spinner size="lg" type={type} showText text={text} />
    </Overlay>
  );
};

export default PageSpinner;
