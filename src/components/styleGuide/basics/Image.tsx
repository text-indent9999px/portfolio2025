import React from 'react';

import { Image } from '../../ui/Image';
import { StyleGuideDetailHeading, StyleGuideSection } from '../common';

const ImageStyleGuide: React.FC = () => {
  return (
    <StyleGuideSection>
      <div className="space-y-1">
        <StyleGuideDetailHeading>Default</StyleGuideDetailHeading>
        <Image
          src="/assets/images/example1.png"
          width={800}
          height={600}
          title="이미지 예시"
          description="기본 이미지 렌더링 예시입니다."
          alt="이미지 예시"
        />
      </div>

      <div className="space-y-1">
        <StyleGuideDetailHeading>Modal Disabled</StyleGuideDetailHeading>
        <Image
          src="/assets/images/example2.png"
          width={800}
          height={600}
          title="모달 비활성"
          description="클릭 확대 없이 정적 이미지로 사용하는 예시입니다."
          enableModal={false}
          alt="모달 비활성 이미지 예시"
        />
      </div>
    </StyleGuideSection>
  );
};

export default ImageStyleGuide;
