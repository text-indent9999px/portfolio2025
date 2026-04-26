import React from 'react';
import InfoText from '../../ui/InfoText';
import { StyleGuideDetailHeading, StyleGuideSection } from '../common';

const InfoTextStyleGuide: React.FC = () => {
  return (
    <StyleGuideSection>
      <div className="space-y-1">
        <StyleGuideDetailHeading>Info - With Title</StyleGuideDetailHeading>
        <InfoText type="info" title="Info">
          설명을 입력하세요.
        </InfoText>
      </div>
      <div className="space-y-1">
        <StyleGuideDetailHeading>Info - No Title</StyleGuideDetailHeading>
        <InfoText type="info">설명을 입력하세요.</InfoText>
      </div>
      <div className="space-y-1">
        <StyleGuideDetailHeading>Success - With Title</StyleGuideDetailHeading>
        <InfoText type="success" title="Success">
          성공 메시지를 입력하세요.
        </InfoText>
      </div>
      <div className="space-y-1">
        <StyleGuideDetailHeading>Success - No Title</StyleGuideDetailHeading>
        <InfoText type="success">성공 메시지를 입력하세요.</InfoText>
      </div>
      <div className="space-y-1">
        <StyleGuideDetailHeading>Warning - With Title</StyleGuideDetailHeading>
        <InfoText type="warning" title="Warning">
          경고 메시지를 입력하세요.
        </InfoText>
      </div>
      <div className="space-y-1">
        <StyleGuideDetailHeading>Warning - No Title</StyleGuideDetailHeading>
        <InfoText type="warning">경고 메시지를 입력하세요.</InfoText>
      </div>
      <div className="space-y-1">
        <StyleGuideDetailHeading>Danger - With Title</StyleGuideDetailHeading>
        <InfoText type="danger" title="Danger">
          오류 메시지를 입력하세요.
        </InfoText>
      </div>
      <div className="space-y-1">
        <StyleGuideDetailHeading>Danger - No Title</StyleGuideDetailHeading>
        <InfoText type="danger">오류 메시지를 입력하세요.</InfoText>
      </div>
    </StyleGuideSection>
  );
};

export default InfoTextStyleGuide;
