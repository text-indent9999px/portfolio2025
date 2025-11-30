'use client';

import { useState } from 'react';
import { Description } from '../../ui/Description';
import { Toggle as ToggleCmp } from '../../ui/Toggle';
import { StyleGuideDetailHeading, StyleGuideSection } from '../common';

const ToggleStyleGuide: React.FC = () => {
  const [toggleOn, setToggleOn] = useState(true);
  const [normalToggle, setNormalToggle] = useState(true);
  const [disabledToggle, setDisabledToggle] = useState(false);

  return (
    <StyleGuideSection>
      <div className="space-y-1">
        <StyleGuideDetailHeading>ON/OFF toggle</StyleGuideDetailHeading>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <ToggleCmp
              checked={toggleOn}
              onChange={setToggleOn}
              size="md"
              enableTransition={true}
              isOnOffToggle={true}
            />
            <Description
              size={7}
              weight="medium"
              className="text-text-tertiary"
            >
              {toggleOn ? 'ON' : 'OFF'}
            </Description>
          </div>
        </div>
      </div>
      <div className="space-y-1">
        <StyleGuideDetailHeading>Normal toggle</StyleGuideDetailHeading>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <ToggleCmp
              checked={normalToggle}
              onChange={setNormalToggle}
              size="md"
              enableTransition={true}
              isOnOffToggle={false}
            />
            <Description
              size={7}
              weight="medium"
              className="text-text-tertiary"
            >
              {normalToggle ? 'Right' : 'Left'}
            </Description>
          </div>
        </div>
      </div>
      <div className="space-y-1">
        <StyleGuideDetailHeading>Disabled toggle</StyleGuideDetailHeading>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <ToggleCmp
              checked={disabledToggle}
              onChange={setDisabledToggle}
              size="md"
              enableTransition={true}
              isOnOffToggle={false}
              disabled={true}
            />
            <Description
              size={7}
              weight="medium"
              className="text-text-tertiary"
            >
              Disabled
            </Description>
          </div>
        </div>
      </div>
    </StyleGuideSection>
  );
};

export default ToggleStyleGuide;
