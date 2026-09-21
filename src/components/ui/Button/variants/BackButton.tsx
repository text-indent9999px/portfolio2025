'use client';

import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';
import { Button } from '../Button';
import type { ButtonProps } from '../Button.types';

export type BackButtonProps = Omit<ButtonProps, 'icon'>;

/**
 * `href`가 있으면 그 경로로 이동하는 링크, 없으면 브라우저 히스토리의 이전 페이지로 돌아간다.
 */
export function BackButton({
  variant = 'outline',
  size = 'sm',
  children,
  ariaLabel = '뒤로 가기',
  href,
  onClick,
  ...rest
}: BackButtonProps) {
  const router = useRouter();

  return (
    <Button
      variant={variant}
      size={size}
      icon={<FontAwesomeIcon icon={faArrowLeft} />}
      href={href}
      ariaLabel={ariaLabel}
      rounded="circle"
      onClick={e => {
        onClick?.(e);
        if (href === undefined) router.back();
      }}
      {...rest}
    >
      {children}
    </Button>
  );
}
