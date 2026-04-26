import type { InfoTextType } from './InfoText.types';

export type ToneVarProperties = {
  bg: string;
  border: string;
  icon: string;
  content: string;
  title: string;
};

const TYPES: InfoTextType[] = ['info', 'success', 'warning', 'danger'];
const PROPERTIES = ['bg', 'border', 'icon', 'content', 'title'] as const;

function buildToneVarMap(): Record<InfoTextType, ToneVarProperties> {
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
}

/** 모듈 로드 시 한 번만 계산 (컴포넌트 인스턴스마다 반복하지 않음) */
export const INFO_TEXT_TONE_VAR_MAP = buildToneVarMap();
