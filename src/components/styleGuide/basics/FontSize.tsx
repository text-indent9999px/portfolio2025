import React from 'react';
import { StyleGuideDetailHeading, StyleGuideSection } from '../common';

const FontSizeStyleGuide: React.FC = () => {
  return (
    <StyleGuideSection>
      <div className="space-y-1">
        <StyleGuideDetailHeading>Heading Levels</StyleGuideDetailHeading>
        <div className="space-y-3">
          <div className="text-4xl font-bold text-text-primary">
            H1 - 4xl Bold
          </div>
          <div className="text-2xl font-bold text-text-primary">
            H2 - 2xl Bold
          </div>
          <div className="text-xl font-semibold text-text-primary">
            H3 - xl Semibold
          </div>
          <div className="text-lg font-semibold text-text-primary">
            H4 - lg Semibold
          </div>
          <div className="text-base font-medium text-text-primary">
            H5 - base Medium
          </div>
          <div className="text-sm font-medium text-text-primary">
            H6 - sm Medium
          </div>
        </div>
      </div>
    </StyleGuideSection>
  );
};

export default FontSizeStyleGuide;
