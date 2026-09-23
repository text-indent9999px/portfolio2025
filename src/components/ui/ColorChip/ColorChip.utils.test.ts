import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import {
  getColorValue,
  resolveColorType,
  rgbToHex,
  useColorValue,
  useHoverState,
} from './ColorChip.utils';

describe('resolveColorType', () => {
  it('tone이 있으면 매핑된 색상 키를 반환한다', () => {
    expect(resolveColorType('brand', undefined)).toBe('primary');
    expect(resolveColorType('error', undefined)).toBe('danger');
  });

  it('tone이 없으면 colorType을 그대로 쓴다', () => {
    expect(resolveColorType(undefined, 'gray')).toBe('gray');
  });

  it('tone도 colorType도 없으면 primary로 대체한다', () => {
    expect(resolveColorType(undefined, undefined)).toBe('primary');
  });
});

describe('rgbToHex', () => {
  it('RGB 값을 6자리 HEX로 변환한다', () => {
    expect(rgbToHex(255, 0, 0)).toBe('#ff0000');
  });

  it('한 자리 16진수는 0으로 채운다', () => {
    expect(rgbToHex(1, 2, 3)).toBe('#010203');
  });
});

describe('getColorValue', () => {
  afterEach(() => {
    document.documentElement.style.cssText = '';
  });

  it('CSS 변수가 이미 HEX면 그대로 반환한다', () => {
    document.documentElement.style.setProperty('--color-primary-500', '#123abc');
    expect(getColorValue('primary', 500)).toBe('#123abc');
  });

  it('CSS 변수가 rgb()면 HEX로 변환해 반환한다', () => {
    document.documentElement.style.setProperty(
      '--color-primary-500',
      'rgb(255, 0, 0)'
    );
    expect(getColorValue('primary', 500)).toBe('#ff0000');
  });

  it('값이 없으면 빈 문자열을 반환한다', () => {
    expect(getColorValue('primary', 999)).toBe('');
  });
});

describe('useColorValue', () => {
  afterEach(() => {
    document.documentElement.style.cssText = '';
    document.documentElement.classList.remove('dark');
  });

  it('현재 CSS 변수 값을 읽어 온다', () => {
    document.documentElement.style.setProperty('--color-primary-500', '#abcdef');
    const { result } = renderHook(() => useColorValue('primary', 500));
    expect(result.current).toBe('#abcdef');
  });

  it('html class가 바뀌면(테마 전환) 값을 다시 읽는다', async () => {
    document.documentElement.style.setProperty('--color-primary-500', '#111111');
    const { result } = renderHook(() => useColorValue('primary', 500));
    expect(result.current).toBe('#111111');

    document.documentElement.style.setProperty('--color-primary-500', '#222222');
    await act(async () => {
      document.documentElement.classList.add('dark');
      // MutationObserver 콜백(마이크로태스크)과 그 안의 requestAnimationFrame까지
      // 흘려보내야 하므로 매크로태스크 한 틱을 기다린다.
      await new Promise(resolve => setTimeout(resolve, 20));
    });

    expect(result.current).toBe('#222222');
  });
});

describe('useHoverState', () => {
  it('마우스 enter/leave로 isHovered를 전환한다', () => {
    const { result } = renderHook(() => useHoverState());
    expect(result.current.isHovered).toBe(false);

    act(() => result.current.handleMouseEnter());
    expect(result.current.isHovered).toBe(true);

    act(() => result.current.handleMouseLeave());
    expect(result.current.isHovered).toBe(false);
  });
});
