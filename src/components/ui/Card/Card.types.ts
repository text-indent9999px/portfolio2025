import React from 'react';
import type { HeadingLevel, SizeType } from '../Heading/Heading.types';

export type CardStyle = React.CSSProperties & { ['--card-columns']?: string };

export type SurfaceLevel = 'min' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 'max';

/** 마우스 클릭 또는 카드 루트 포커스 상태의 Enter/Space */
export type CardActivationEvent =
  | React.MouseEvent<HTMLDivElement>
  | React.KeyboardEvent<HTMLDivElement>;

export interface CardSlots {
  header?: React.ReactNode;
  thumb?: React.ReactNode;
  body?: React.ReactNode;
  footer?: React.ReactNode;
}

type CardPropsVisual = {
  /** 레이아웃 슬롯 — DOM 순서는 header → thumb → body → footer 로 고정된다. */
  slots: CardSlots;
  /**
   * `slots.thumb`가 있을 때 `CardThumb`에 넘길 종횡비. 예: `"16/9"`.
   */
  thumbAspect?: string;
  /**
   * `slots.thumb`가 있을 때 썸 영역 루트 `className`.
   */
  thumbClassName?: string;
  /**
   * `solid`: 테두리 없음(투명 2px). `outline`: `surfaceLevel`에 맞춘 테두리 색.
   * 그림자는 `elevation`이 1 이상일 때만 적용된다.
   */
  appearance?: 'solid' | 'outline';
  /** 0이면 그림자 없음. 1~4는 단계별 그림자. */
  elevation?: 0 | 1 | 2 | 3 | 4;
  /** 배경 `bg-surface-level-*`. `outline`일 때 테두리 색도 같은 단계 축을 따른다. */
  surfaceLevel?: SurfaceLevel;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
  cursorTrigger?: boolean;
  ratio?: string; // e.g. '120px 1fr'
  thumbPosition?: 'left' | 'right' | 'top' | 'bottom';
  gap?: string; // e.g. '8px', '0.75rem'
};

type CardPropsInteractive =
  | {
      onClick: (e: CardActivationEvent) => void;
      /** `onClick`이 있을 때 `role="button"` — 스크린 리더용 접근 가능한 이름(필수). */
      interactiveLabel: string;
    }
  | {
      onClick?: undefined;
      interactiveLabel?: undefined;
    };

export type CardProps = CardPropsVisual &
  CardPropsInteractive &
  Omit<
    React.HTMLAttributes<HTMLDivElement>,
    'onClick' | 'onKeyDown' | 'children' | 'role' | 'tabIndex'
  >;

/** `Card.Body` 슬롯 안에서 자식 블록 사이 세로 간격(`space-y-*`)만 주는 래퍼. 그리드 영역인 `Card.Body`와 역할이 다릅니다. */
export interface CardStackProps {
  children: React.ReactNode;
  className?: string;
  spacing?: 'none' | 'tight' | 'normal' | 'loose';
}

/**
 * 카드 헤더 **안**에 넣는 타이틀 블록(Heading 등, 예: `ProjectTitle`)용 props.
 */
export interface CardTitleSectionProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  size?: HeadingLevel;
  visualSize?: SizeType;
  fontFamily?: 'default' | 'kor-point' | 'eng-point';
  titleColor?: string;
  className?: string;
  spacing?: 'none' | 'tight' | 'normal' | 'loose';
}
