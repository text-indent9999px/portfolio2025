'use client';

import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../Button';
import type { CustomButtonProps } from '../Button.types';

export type BackButtonProps = Omit<CustomButtonProps, 'icon'> & {
  enablePageTransition?: boolean;
  newHref?: string;
};

export default function BackButton({
  variant = 'outlined',
  size = 'sm',
  children,
  ariaLabel = '뒤로 가기',
  enablePageTransition = true,
  newHref,
  ...rest
}: BackButtonProps) {
  const isIconOnly = !children;
  const href = newHref
    ? newHref
    : enablePageTransition
    ? 'back'
    : 'back:disable-page-transition';
  const button = (
    <Button
      type="button"
      variant={variant}
      size={size}
      icon={<FontAwesomeIcon icon={faArrowLeft} />}
      href={href}
      aria-label={isIconOnly ? ariaLabel : undefined}
      rounded="circle"
      cursorTrigger={true}
      {...rest}
    >
      {children ?? ''}
    </Button>
  );
  return button;
}
