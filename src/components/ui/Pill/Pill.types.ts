import type { ReactNode } from 'react';

import type { Color, RadiusKey, Size, Variant } from '../shared/UI.config';

export type PillVariant = Variant;

/**
 * 인라인 분류·메타 표시용(비인터랙티브). 클릭·포커스가 필요하면 `Button` 등을 사용한다.
 * HTML 폼의 `<label>`이 아니라 `<span>`으로 렌더한다.
 */
export interface PillProps {
  children: ReactNode;
  variant?: PillVariant;
  color?: Color;
  size?: Size;
  rounded?: RadiusKey;
  className?: string;
}
