import type { HeadingLevel, SizeType, SpacingType } from './Heading.types';

/** 시각적 토큰(xs~4xl) → Heading 내부 레벨(1~8). 단일 소스. */
export const VISUAL_SIZE_TO_LEVEL: Record<SizeType, HeadingLevel> = {
  '4xl': 1,
  '3xl': 2,
  '2xl': 3,
  xl: 4,
  lg: 5,
  md: 6,
  sm: 7,
  xs: 8,
} as const;

/** `VISUAL_SIZE_TO_LEVEL.lg` — 이 레벨 이하(더 큰 제목)는 PageHeader에서 제목·부제 간격을 `sm`으로 쓴다. */
const PAGE_HEADER_SUBTITLE_TIGHT_SPACING_MAX_LEVEL: HeadingLevel =
  VISUAL_SIZE_TO_LEVEL.lg;

/**
 * 제목이 시각적으로 lg 이상이면 제목·부제 사이 `sm`, 그보다 작은 타이포면 `md`.
 */
export function getPageHeaderHeadingSubtitleSpacing(
  visualSize: SizeType | undefined,
  size: HeadingLevel | undefined
): SpacingType {
  const level = visualSize ? VISUAL_SIZE_TO_LEVEL[visualSize] : (size ?? 1);
  return level <= PAGE_HEADER_SUBTITLE_TIGHT_SPACING_MAX_LEVEL ? 'sm' : 'md';
}
