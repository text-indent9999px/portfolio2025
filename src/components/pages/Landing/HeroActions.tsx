'use client';

import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { CSSProperties } from 'react';
import { SITE } from '@/data/portfolio';
import { useSectionNavigation } from '@/hooks';
import { Button, ResumeDownloadButton } from '../../ui/Button';

export function HeroActions() {
  const goToSection = useSectionNavigation();

  return (
    <div
      className="hero-in mt-10 flex flex-wrap items-center gap-3"
      style={{ '--d': '180ms' } as CSSProperties}
    >
      <Button
        size="md"
        rounded="md"
        variant="solid"
        color="brand"
        icon={<FontAwesomeIcon icon={faArrowDown} />}
        iconPosition="right"
        onClick={() => goToSection('work')}
      >
        프로젝트 보기
      </Button>
      <Button
        size="md"
        rounded="md"
        variant="outline"
        color="brand"
        onClick={() => goToSection('contact')}
      >
        연락하기
      </Button>
      {SITE.resumeDownload && <ResumeDownloadButton size="md" rounded="md" />}
    </div>
  );
}
