import React from 'react';
import { StyleGuideDetailHeading, StyleGuideSection } from '../common';

const LineHeightStyleGuide: React.FC = () => {
  return (
    <StyleGuideSection>
      <>
        <div className="space-y-1">
          <StyleGuideDetailHeading>
            leading-tight (1.25)
          </StyleGuideDetailHeading>
          <div className="text-lg leading-tight text-text-primary">
            이 텍스트는 leading-tight 스타일을 사용합니다. 줄 간격이 좁아서
            컴팩트한 느낌을 줍니다.
          </div>
        </div>

        <div className="space-y-1">
          <StyleGuideDetailHeading>
            leading-normal (1.5)
          </StyleGuideDetailHeading>
          <div className="text-lg leading-normal text-text-primary">
            이 텍스트는 leading-normal 스타일을 사용합니다. 기본적인 줄 간격으로
            가독성이 좋습니다.
          </div>
        </div>
        <div className="space-y-1">
          <StyleGuideDetailHeading>
            leading-relaxed (1.625)
          </StyleGuideDetailHeading>
          <div className="text-lg leading-relaxed text-text-primary">
            이 텍스트는 leading-relaxed 스타일을 사용합니다. 줄 간격이 넓어서
            여유로운 느낌을 줍니다.
          </div>
        </div>
      </>
    </StyleGuideSection>
  );
};

export default LineHeightStyleGuide;
