'use client';

import { faCircleArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
  size = 'md',
  rounded = 'none',
  style,
  className,
  ...rest
}: ResumeDownloadButtonProps) {
  const hasLargePadding = size !== 'xs' && size !== 'sm';
  const buttonClassName = `font-semibold uppercase font-kor-point 
    focus-visible:ring-4 focus-visible:ring-accent-300! 
    `;

  return (
    <span className="relative inline-flex group">
      <Button
        variant="filled"
        color={'primary'}
        size={size}
        rounded={rounded}
        icon={<FontAwesomeIcon icon={faCircleArrowDown} />}
        className={`${buttonClassName} ${
          hasLargePadding ? 'gap-2 px-8! py-3!' : ''
        } ${className}`}
        style={style}
        onClick={downloadResume}
        {...rest}
      >
        이력서 다운로드
      </Button>
    </span>
  );
}
