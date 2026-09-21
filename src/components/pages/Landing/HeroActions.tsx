'use client';

import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { CSSProperties } from 'react';
import { SITE } from '@/data/portfolio';
import { useSectionNavigation } from '@/hooks';
import CustomButton, { ResumeDownloadButton } from '../../ui/Button';

export function HeroActions() {
  const goToSection = useSectionNavigation();

  return (
    <div
      className="hero-in mt-10 flex flex-wrap items-center gap-3"
      style={{ '--d': '180ms' } as CSSProperties}
    >
      <CustomButton
        size="lg"
        rounded="pill"
        variant="solid"
        color="brand"
        icon={<FontAwesomeIcon icon={faArrowDown} />}
        iconPosition="right"
        onClick={() => goToSection('work')}
      >
        프로젝트 보기
      </CustomButton>
      <CustomButton
        size="lg"
        rounded="pill"
        variant="outline"
        color="brand"
        onClick={() => goToSection('contact')}
      >
        연락하기
      </CustomButton>
      {SITE.resumeDownload && (
        <ResumeDownloadButton size="lg" rounded="pill" />
      )}
    </div>
  );
}
