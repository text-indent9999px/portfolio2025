import React from 'react';
import type { CardTitleSectionProps } from '../../../ui/Card';
import { Heading } from '../../../ui/Heading';

// Spacing 스타일
const SPACING_STYLES = {
  none: '',
  tight: 'mb-3',
  normal: 'mb-4',
  loose: 'mb-6',
} as const;

// 프로젝트 카드 제목 컴포넌트
const ProjectTitle: React.FC<CardTitleSectionProps> = ({
  title,
  subtitle,
  size = 3,
  visualSize,
  fontFamily,
  titleColor = 'text-text-primary',
  className = '',
  spacing = 'normal',
}) => {
  // Container className 병합
  const containerClassName = React.useMemo(() => {
    return ['flex', 'flex-col', 'gap-2', SPACING_STYLES[spacing], className]
      .filter(Boolean)
      .join(' ');
  }, [spacing, className]);

  // Title className 병합
  const titleClassName = React.useMemo(() => {
    return [titleColor].filter(Boolean).join(' ');
  }, [titleColor]);

  return (
    <div className={containerClassName}>
      <Heading
        size={size}
        visualSize={visualSize}
        fontFamily={fontFamily}
        className={titleClassName}
        bottomSpacing="none"
      >
        {title}
      </Heading>
      {subtitle && subtitle}
    </div>
  );
};

ProjectTitle.displayName = 'ProjectTitle';

export default ProjectTitle;
