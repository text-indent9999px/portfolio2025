'use client';

import { useId, useState } from 'react';
import Blank from '../../ui/Blank';
import { PrimaryTab, SecondaryTab } from '../../ui/Tab';
import { StyleGuideDetailHeading, StyleGuideSection } from '../common';

const tabs = [
  { id: 'one', label: 'One' },
  { id: 'two', label: 'Two', notification: 'N' },
  { id: 'three', label: 'Three', notification: 30 },
];

const TabStyleGuide: React.FC = () => {
  const [activeTab, setActiveTab] = useState('two');
  const [activeTab2, setActiveTab2] = useState('two');

  const [activeSecondaryTab, setActiveSecondaryTab] = useState('two');
  const uniqueId = useId();
  const uniqueId2 = useId();
  const uniqueId3 = useId();

  return (
    <>
      <StyleGuideSection title="Primary Tabs" size={4} visualSize="md">
        <div className="space-y-1">
          <StyleGuideDetailHeading>Horizontal</StyleGuideDetailHeading>
          <PrimaryTab
            tabs={tabs}
            uniqueId={uniqueId}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            enableTransition={true}
          />
        </div>
        <div className="space-y-1">
          <StyleGuideDetailHeading>Vertical</StyleGuideDetailHeading>
          <PrimaryTab
            tabs={tabs}
            uniqueId={uniqueId2}
            activeTab={activeTab2}
            onTabChange={setActiveTab2}
            enableTransition={true}
            orientation="vertical"
          />
        </div>
      </StyleGuideSection>
      <Blank height="2rem" bgColor="transparent" />
      <StyleGuideSection title="Secondary Tabs" size={4} visualSize="md">
        <div className="space-y-1">
          <StyleGuideDetailHeading>Horizontal</StyleGuideDetailHeading>
          <SecondaryTab
            tabs={tabs}
            activeTab={activeSecondaryTab}
            onTabChange={setActiveSecondaryTab}
            uniqueId={uniqueId3}
          />
        </div>
      </StyleGuideSection>
    </>
  );
};

export default TabStyleGuide;
