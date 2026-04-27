'use client';

import { faCircleArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../Button';
import type { CustomButtonProps } from '../Button.types';

const RESUME_FILE_NAME = '프론트엔드_개발_지원자_김남영.pdf';

const downloadResume = async () => {
  try {
    const response = await fetch('/api/resume', {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('resume-download-failed');
    }

    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = objectUrl;
    link.download = RESUME_FILE_NAME;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(objectUrl);
  } catch {
    alert('이력서 파일을 다운로드하지 못했습니다. 잠시 후 다시 시도해주세요.');
  }
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
        variant="solid"
        color={'brand'}
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
