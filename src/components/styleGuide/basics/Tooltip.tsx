import React from 'react';
import Blank from '../../ui/Blank/Blank';
import { Tooltip } from '../../ui/Tooltip';
import { StyleGuideDetailHeading, StyleGuideSection } from '../common';

const TooltipStyleGuide: React.FC = () => {
  const positions = ['bottom', 'top', 'left', 'right'] as const;
  const arrowPositions = ['start', 'center', 'end'] as const;
  const configs = positions.flatMap(position =>
    arrowPositions.map(arrowPosition => ({ position, arrowPosition }))
  );

  return (
    <StyleGuideSection>
      <div className="flex flex-col">
        {configs.map((c, idx) => (
          <React.Fragment key={`${c.position}-${c.arrowPosition}`}>
            {c.position === 'top' && <Blank height="5rem" />}
            <div
              className={`inline-flex relative items-center w-[fit-content] ${
                c.position === 'left'
                  ? 'self-end'
                  : c.position === 'right'
                  ? 'self-start'
                  : 'self-center'
              } `}
            >
              <StyleGuideDetailHeading
                bottomSpacing="none"
                className="whitespace-pre-line"
              >
                {`툴팁방향: ${c.position}\n화살표위치: ${c.arrowPosition}`}
              </StyleGuideDetailHeading>
              <Tooltip
                arrow={true}
                isVisible={true}
                tooltipPosition={c.position}
                arrowPosition={c.arrowPosition}
              >
                {`툴팁을 입력하세요.\n툴팁 내용을 입력합니다.`}
              </Tooltip>
            </div>
            {c.position === 'bottom' && <Blank height="5rem" />}
            {(c.position === 'left' || c.position === 'right') &&
              configs[idx + 1]?.position === c.position && (
                <Blank height="4rem" />
              )}
            {configs[idx + 1]?.position !== c.position &&
              configs[idx + 1]?.position !== 'top' && <Blank height="3rem" />}
          </React.Fragment>
        ))}
      </div>
    </StyleGuideSection>
  );
};

export default TooltipStyleGuide;
