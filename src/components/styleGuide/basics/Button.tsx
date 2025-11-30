import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { CustomButton, LoadingButton } from '../../ui/Button';
import { StyleGuideDetailHeading, StyleGuideSection } from '../common';

const ButtonStyleGuide: React.FC = () => {
  const colors = [
    'primary',
    'secondary',
    'success',
    'warning',
    'danger',
    'info',
    'gray',
  ] as const;
  const variants = ['filled', 'tonal', 'outlined', 'ghost', 'text'] as const;

  return (
    <StyleGuideSection>
      <>
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
          <StyleGuideDetailHeading>ETC.</StyleGuideDetailHeading>
          <div className="flex flex-wrap gap-4 w-full mb-4">
            <CustomButton
              variant="tonal"
              color="secondary"
              size="md"
              icon={<FontAwesomeIcon icon={faUser} />}
              iconPosition="left"
            >
              아이콘 + 텍스트
            </CustomButton>
            <CustomButton
              variant="outlined"
              color="success"
              size="md"
              icon={<FontAwesomeIcon icon={faUser} />}
            />
            <LoadingButton
              variant="tonal"
              color="primary"
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
                color="primary"
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
