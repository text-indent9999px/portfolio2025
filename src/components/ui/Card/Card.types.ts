import React from 'react';
import type { HeadingLevel, SizeType } from '../Heading/Heading.types';

export type CardStyle = React.CSSProperties & { ['--card-columns']?: string };

export type SurfaceLevel = 'min' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 'max';

export interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'outlined';
  elevation?: 0 | 1 | 2 | 3 | 4;
  surfaceLevel?: SurfaceLevel;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  clickable?: boolean;
  cursorTrigger?: boolean;
  ratio?: string; // e.g. '120px 1fr'
  thumbPosition?: 'left' | 'right' | 'top' | 'bottom';
  gap?: string; // e.g. '8px', '0.75rem'
}

export interface CardCompound extends React.FC<CardProps> {
  Header: React.FC<{ children?: React.ReactNode; className?: string }>;
  Thumb: React.FC<{
    children?: React.ReactNode;
    className?: string;
    aspect?: string;
  }>;
  Body: React.FC<{ children?: React.ReactNode; className?: string }>;
  Footer: React.FC<{ children?: React.ReactNode; className?: string }>;
}

export interface CardContentProps {
  children: React.ReactNode;
  className?: string;
  spacing?: 'none' | 'tight' | 'normal' | 'loose';
}

export interface CardHeaderProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  size?: HeadingLevel;
  visualSize?: SizeType;
  fontFamily?: 'default' | 'kor-point' | 'eng-point';
  titleColor?: string;
  className?: string;
  spacing?: 'none' | 'tight' | 'normal' | 'loose';
}
