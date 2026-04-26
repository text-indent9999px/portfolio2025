import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { CustomButton, LoadingButton } from '../../ui/Button';
import { Description } from '../../ui/Description';
import { StyleGuideDetailHeading, StyleGuideSection } from '../common';

const ButtonStyleGuide: React.FC = () => {
  const colors = [
    'brand',
    'subBrand',
    'success',
    'warning',
    'error',
    'info',
    'neutral',
  ] as const;
  const variants = ['solid', 'soft', 'outline', 'minimal', 'plain'] as const;

  return (
    <StyleGuideSection>
      <>
        <Description size={7} className="mb-4">
          Button은 `solid`, `soft`, `outline`, `minimal`, `plain` 프리셋을
          사용하고, 색상은 `brand`, `subBrand`, `neutral`, `error` 같은 semantic
          tone으로 선택합니다.
        </Description>
        {colors.map(color => (
          <div className="space-y-1" key={color}>
            <StyleGuideDetailHeading capitalize>
              {color}
            </StyleGuideDetailHeading>
            <div className="flex flex-wrap gap-4 w-full mb-4">
              {variants.map(variant => (
                <CustomButton
                  key={`${color}-${variant}`}
                  variant={variant}
                  color={color}
                  size="md"
                >
                  {variant}
                </CustomButton>
              ))}
            </div>
          </div>
        ))}
        <div className="space-y-1">
          <StyleGuideDetailHeading>Usage Examples</StyleGuideDetailHeading>
          <Description size={8} className="mb-3 mt-1">
            실제 사용처에서는 아이콘 조합, 로딩 상태, 강조 수준에 따라 프리셋을
            선택합니다.
          </Description>
          <div className="flex flex-wrap gap-4 w-full mb-4">
            <CustomButton
              variant="soft"
              color="subBrand"
              size="md"
              icon={<FontAwesomeIcon icon={faUser} />}
              iconPosition="left"
            >
              아이콘 + 텍스트
            </CustomButton>
            <CustomButton
              variant="soft"
              color="subBrand"
              size="md"
              icon={<FontAwesomeIcon icon={faUser} />}
              iconPosition="right"
            >
              텍스트 + 아이콘
            </CustomButton>
            <CustomButton
              variant="outline"
              color="success"
              size="md"
              icon={<FontAwesomeIcon icon={faUser} />}
            />
            <LoadingButton
              variant="soft"
              color="brand"
              size="md"
              tone="light"
              loading
            >
              결제 하기
            </LoadingButton>
          </div>
        </div>
        {/* <div className="space-y-1">
          <StyleGuideDetailHeading>Disabled</StyleGuideDetailHeading>
          <div className="flex flex-wrap gap-4 w-full">
            {variants.map(variant => (
              <CustomButton
                key={`disabled-${variant}`}
                variant={variant}
                color="brand"
                size="md"
                disabled={true}
              >
                disabled
              </CustomButton>
            ))}
          </div>
        </div> */}
      </>
    </StyleGuideSection>
  );
};

export default ButtonStyleGuide;
