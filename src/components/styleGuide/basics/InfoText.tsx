import React from 'react';
import InfoText from '../../ui/InfoText';
import { StyleGuideDetailHeading, StyleGuideSection } from '../common';

const InfoTextStyleGuide: React.FC = () => {
  return (
    <StyleGuideSection>
      <div className="space-y-1">
        <StyleGuideDetailHeading>Info</StyleGuideDetailHeading>
        <InfoText type="info" title="Info">
          설명을 입력하세요.
        </InfoText>
      </div>
      <div className="space-y-1">
        <StyleGuideDetailHeading>Success</StyleGuideDetailHeading>
        <InfoText type="success" title="Success">
          성공 메시지를 입력하세요.
        </InfoText>
      </div>
      <div className="space-y-1">
        <StyleGuideDetailHeading>Warning</StyleGuideDetailHeading>
        <InfoText type="warning" title="Warning">
          경고 메시지를 입력하세요.
        </InfoText>
      </div>
      <div className="space-y-1">
        <StyleGuideDetailHeading>Danger</StyleGuideDetailHeading>
        <InfoText type="danger" title="Danger">
          오류 메시지를 입력하세요.
        </InfoText>
      </div>
    </StyleGuideSection>
  );
};

export default InfoTextStyleGuide;
