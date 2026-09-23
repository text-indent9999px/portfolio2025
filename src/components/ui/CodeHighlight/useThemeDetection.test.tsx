import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { useThemeDetection } from './hooks';

describe('useThemeDetection', () => {
  afterEach(() => {
    document.documentElement.classList.remove('dark');
  });

  it('마운트 시 html에 dark 클래스가 있으면 true를 반환한다', () => {
    document.documentElement.classList.add('dark');
    const { result } = renderHook(() => useThemeDetection());
    expect(result.current).toBe(true);
  });

  it('html의 class 속성이 바뀌면 값을 다시 읽어 반영한다', async () => {
    const { result } = renderHook(() => useThemeDetection());
    expect(result.current).toBe(false);

    // MutationObserver 콜백은 마이크로태스크로 도착하므로 한 틱 기다린다.
    await act(async () => {
      document.documentElement.classList.add('dark');
      await Promise.resolve();
    });

    expect(result.current).toBe(true);
  });
});
