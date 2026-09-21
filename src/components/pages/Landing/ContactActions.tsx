'use client';

import {
  faArrowUpRightFromSquare,
  faCheck,
  faCopy,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { SITE } from '@/data/portfolio';
import CustomButton, { ResumeDownloadButton } from '../../ui/Button';

const COPIED_RESET_MS = 2200;

export function ContactActions() {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    },
    []
  );

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(
        () => setCopied(false),
        COPIED_RESET_MS
      );
    } catch {
      window.location.href = `mailto:${SITE.email}`;
    }
  };

  return (
    <div className="mt-10 flex flex-wrap items-center gap-3">
      <CustomButton
        size="lg"
        rounded="pill"
        variant="solid"
        color="brand"
        icon={<FontAwesomeIcon icon={faEnvelope} />}
        onClick={() => {
          window.location.href = `mailto:${SITE.email}`;
        }}
      >
        이메일 보내기
      </CustomButton>
      <CustomButton
        size="lg"
        rounded="pill"
        variant="outline"
        color="brand"
        icon={<FontAwesomeIcon icon={copied ? faCheck : faCopy} />}
        onClick={copyEmail}
      >
        {copied ? '복사했습니다' : '주소 복사'}
      </CustomButton>
      <CustomButton
        size="lg"
        rounded="pill"
        variant="minimal"
        color="brand"
        href={SITE.github}
        icon={<FontAwesomeIcon icon={faArrowUpRightFromSquare} />}
        iconPosition="right"
      >
        GitHub
      </CustomButton>
      {SITE.resumeDownload && (
        <ResumeDownloadButton size="lg" rounded="pill" />
      )}
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? '이메일 주소를 클립보드에 복사했습니다.' : ''}
      </span>
    </div>
  );
}
