'use client';

import InfoText from '../../../ui/InfoText';
import { SectionHeader } from '../../../ui/Heading';
import type { IntroSectionItem } from '../types';

interface IntroSectionProps {
  sections: IntroSectionItem[];
  errorMessage?: string | null;
}

export default function IntroSection({
  sections,
  errorMessage,
}: IntroSectionProps) {
  if (errorMessage) {
    return (
      <InfoText type="danger" title="데이터를 불러오지 못했습니다">
        {errorMessage}
      </InfoText>
    );
  }

  return (
    <div className="space-y-8 mb-8">
      {sections.map((section, sectionIndex) => (
        <div key={`intro-section-${sectionIndex}`} className="space-y-4">
          {section.title.trim() ? (
            <SectionHeader
              title={section.title}
              size={3}
              visualSize="lg"
              bottomSpacing="none"
            />
          ) : null}
          <div className="space-y-4">
            {section.paragraphs.map((paragraph, paragraphIndex) => (
              <p
                key={`intro-paragraph-${sectionIndex}-${paragraphIndex}`}
                className="text-base text-text-secondary whitespace-pre-line"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
