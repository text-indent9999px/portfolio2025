import React from 'react';
import { StyleGuideDetailHeading, StyleGuideSection } from '../common';

const FontFamilyStyleGuide: React.FC = () => {
  return (
    <StyleGuideSection>
      <>
        {/* Quicksand - 기본 폰트 */}

        <div className="space-y-1">
          <StyleGuideDetailHeading>
            Quicksand (기본 영문 폰트)
          </StyleGuideDetailHeading>
          <div className="font-medium text-2xl text-text-primary font-base">
            frontend developer portfolio
          </div>
        </div>

        {/* Playwrite AU QLD - 포인트 영문 폰트 */}

        <div className="space-y-1">
          <StyleGuideDetailHeading>
            Playwrite AU QLD (포인트 영문 폰트)
          </StyleGuideDetailHeading>
          <div className="text-2xl font-medium text-text-primary font-eng-point">
            frontend developer portfolio
          </div>
        </div>

        {/* Noto Sans KR - 한글 기본 폰트 */}

        <div className="space-y-1">
          <StyleGuideDetailHeading>
            Noto Sans KR (한글 기본 폰트)
          </StyleGuideDetailHeading>
          <div className="font-medium text-2xl text-text-primary font-base">
            프론트엔드 개발자 포트폴리오
          </div>
        </div>

        {/* Grandiflora One - 한글 폰트 */}

        <div className="space-y-1">
          <StyleGuideDetailHeading>
            Grandiflora One (포인트 한글 폰트)
          </StyleGuideDetailHeading>
          <div className="text-2xl font-bold text-text-primary font-kor-point">
            프론트엔드 개발자 포트폴리오
          </div>
        </div>
      </>
    </StyleGuideSection>
  );
};

export default FontFamilyStyleGuide;
