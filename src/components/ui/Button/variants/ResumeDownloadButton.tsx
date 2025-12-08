'use client';

import { faCircleArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMediaQuery } from '../../../../hooks';
import Button from '../Button';
import type { CustomButtonProps } from '../Button.types';

const downloadResume = () => {
  const link = document.createElement('a');
  link.href = '/resume/resume.pdf';
  link.download = '프론트엔드_개발_지원자_김남영.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export type ResumeDownloadButtonProps = Omit<CustomButtonProps, 'onClick'> & {
  label?: string;
  showIcon?: boolean;
};

export default function ResumeDownloadButton({
  variant = 'filled',
  color = 'primary',
  size = 'md',
  rounded = 'none',
  style,
  ...rest
}: ResumeDownloadButtonProps) {
  const isXlOrAbove = useMediaQuery('--breakpoint-xl', 'min');
  const hasLargePadding = size !== 'xs' && size !== 'sm';

  const hoverButtonClassName = [
    'absolute! top-0 left-0 w-full h-full origin-center',
    '[clip-path:polygon(0_50%,100%_50%,100%_50%,0_50%)]',
    'group-hover:[clip-path:polygon(0_0,100%_0,100%_100%,0%_100%)]',
    'focus-visible:[clip-path:polygon(0_0,100%_0,100%_100%,0%_100%)]',
    'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent-300! focus-visible:ring-offset-0 focus-visible:ring-inset',
    'transition-all duration-[0.4s] ease-[cubic-bezier(0.1,0.5,0.5,1)]',
    'font-bold font-eng-point uppercase',
    'bg-primary-300! text-primary-900! border-transparent!',
  ].join(' ');

  const defaultButtonClassName = `font-semibold uppercase font-kor-point 
    focus-visible:ring-4 focus-visible:ring-accent-300!`;

  return (
    <span className="relative inline-flex group">
      <Button
        variant="filled"
        color={'primary'}
        size={size}
        rounded={rounded}
        icon={<FontAwesomeIcon icon={faCircleArrowDown} />}
        className={`${defaultButtonClassName} ${
          hasLargePadding ? 'gap-2 px-8! py-3!' : ''
        }`}
        style={style}
        tabIndex={isXlOrAbove ? -1 : undefined}
        aria-hidden={isXlOrAbove ? 'true' : undefined}
        {...rest}
        noHoverActive={isXlOrAbove ? true : false}
        onClick={isXlOrAbove ? undefined : downloadResume}
      >
        이력서 다운로드
      </Button>
      {isXlOrAbove && (
        <Button
          onClick={downloadResume}
          variant={variant}
          color={color}
          size={size}
          rounded={rounded}
          className={hoverButtonClassName}
          {...rest}
          noHoverActive={true}
        >
          <span className={`text-[1.6em]`}>download</span>
        </Button>
      )}
    </span>
  );
}
