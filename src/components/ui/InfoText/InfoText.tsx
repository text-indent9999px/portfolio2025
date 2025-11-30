import {
  faCheckCircle,
  faExclamationCircle,
  faExclamationTriangle,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export type InfoTextType = 'info' | 'success' | 'warning' | 'danger';

type ToneVarProperties = {
  bg: string;
  border: string;
  icon: string;
  content: string;
  title: string;
};

interface InfoTextProps {
  type: InfoTextType;
  title?: string;
  children: React.ReactNode;
  className?: string;
  showIcon?: boolean;
}

// 아이콘 매핑
const ICON_MAP: Record<InfoTextType, typeof faInfoCircle> = {
  info: faInfoCircle,
  success: faCheckCircle,
  warning: faExclamationTriangle,
  danger: faExclamationCircle,
} as const;

// CSS 변수 타입 및 속성 정의
const TYPES: InfoTextType[] = ['info', 'success', 'warning', 'danger'];
const PROPERTIES = ['bg', 'border', 'icon', 'content', 'title'] as const;

const InfoText: React.FC<InfoTextProps> = ({
  type,
  title,
  children,
  className = '',
  showIcon = true,
}) => {
  // 아이콘 선택 (useMemo로 최적화)
  const icon = React.useMemo(() => {
    return ICON_MAP[type] || faInfoCircle;
  }, [type]);

  // CSS 변수 매핑 (useMemo로 최적화)
  const toneVars = React.useMemo<
    Record<InfoTextType, ToneVarProperties>
  >(() => {
    return Object.fromEntries(
      TYPES.map(type => [
        type,
        Object.fromEntries(
          PROPERTIES.map(prop => [
            prop,
            `var(--color-infotext-${type}-${prop})`,
          ])
        ) as ToneVarProperties,
      ])
    ) as Record<InfoTextType, ToneVarProperties>;
  }, []);

  // 현재 타입의 CSS 변수
  const vars = React.useMemo(() => {
    return toneVars[type];
  }, [toneVars, type]);

  // Container className 병합
  const containerClasses = React.useMemo(() => {
    return ['border-l-4', 'p-4', className].filter(Boolean).join(' ');
  }, [className]);

  // 인라인 스타일 병합
  const containerStyle = React.useMemo<React.CSSProperties>(() => {
    return {
      backgroundColor: vars.bg,
      borderColor: 'transparent',
      borderLeftColor: vars.border,
      color: vars.content,
    };
  }, [vars]);

  // Title 인라인 스타일
  const titleStyle = React.useMemo<React.CSSProperties>(() => {
    return {
      display: 'block',
      color: vars.title,
    };
  }, [vars.title]);

  // Icon 인라인 스타일
  const iconStyle = React.useMemo<React.CSSProperties>(() => {
    return {
      color: vars.icon,
      marginRight: '0.5rem',
    };
  }, [vars.icon]);

  // Content 인라인 스타일
  const contentStyle = React.useMemo<React.CSSProperties>(() => {
    return {
      color: vars.content,
    };
  }, [vars.content]);

  return (
    <div className={containerClasses} style={containerStyle}>
      {title && (
        <strong className="font-semibold mb-2" style={titleStyle}>
          {showIcon && <FontAwesomeIcon icon={icon} style={iconStyle} />}
          {title}
        </strong>
      )}
      <div className="text-sm space-y-1" style={contentStyle}>
        {children}
      </div>
    </div>
  );
};

export default InfoText;
