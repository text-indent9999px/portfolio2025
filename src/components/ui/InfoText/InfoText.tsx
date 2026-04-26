import {
  faCheckCircle,
  faExclamationCircle,
  faExclamationTriangle,
  faInfoCircle,
  type IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import { cn } from '@/utils/cn';
import { INFO_TEXT_TONE_VAR_MAP } from './InfoText.config';
import type { InfoTextProps, InfoTextType } from './InfoText.types';

// 아이콘 매핑
const ICON_MAP: Record<InfoTextType, IconDefinition> = {
  info: faInfoCircle,
  success: faCheckCircle,
  warning: faExclamationTriangle,
  danger: faExclamationCircle,
} as const;

const InfoText: React.FC<InfoTextProps> = ({
  type,
  title,
  children,
  className = '',
  showIcon = true,
}) => {
  const icon = ICON_MAP[type] ?? faInfoCircle;
  const vars = INFO_TEXT_TONE_VAR_MAP[type];

  const containerStyle: React.CSSProperties = {
    backgroundColor: vars.bg,
    borderColor: 'transparent',
    borderLeftColor: vars.border,
    color: vars.content,
  };

  const titleStyle: React.CSSProperties = {
    display: 'block',
    color: vars.title,
  };

  const iconStyle: React.CSSProperties = {
    color: vars.icon,
    marginRight: '0.5rem',
  };

  const contentStyle: React.CSSProperties = {
    color: vars.content,
  };

  return (
    <div className={cn('border-l-4', 'p-4', className)} style={containerStyle}>
      {title && (
        <strong className="font-semibold mb-2" style={titleStyle}>
          {showIcon && <FontAwesomeIcon icon={icon} style={iconStyle} />}
          {title}
        </strong>
      )}
      <div className="text-sm space-y-1" style={contentStyle}>
        {showIcon && !title && (
          <FontAwesomeIcon icon={icon} style={iconStyle} />
        )}
        {children}
      </div>
    </div>
  );
};

export default InfoText;
