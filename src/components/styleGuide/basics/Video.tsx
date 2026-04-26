import React from 'react';

import { Video } from '../../ui/Video';
import { StyleGuideDetailHeading, StyleGuideSection } from '../common';

const SAMPLE_MP4 = '/assets/videos/storybook-theme-toggle.mp4';

const VideoStyleGuide: React.FC = () => {
  return (
    <StyleGuideSection>
      <div className="space-y-1">
        <StyleGuideDetailHeading>Default</StyleGuideDetailHeading>
        <Video
          src={SAMPLE_MP4}
          width={640}
          height={360}
          title="비디오 예시"
          description="기본 비디오 컴포넌트 예시입니다."
          controls={true}
        />
      </div>

      <div className="space-y-1">
        <StyleGuideDetailHeading>With Thumbnail</StyleGuideDetailHeading>
        <Video
          src={SAMPLE_MP4}
          width={640}
          height={360}
          title="썸네일 전환"
          description="썸네일에서 클릭 후 재생되는 예시입니다."
          thumbnail="/assets/images/storybook-dark.png"
          controls={true}
        />
      </div>
    </StyleGuideSection>
  );
};

export default VideoStyleGuide;
