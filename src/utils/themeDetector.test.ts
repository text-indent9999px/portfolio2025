import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { THEME_STORAGE_KEY } from './themeDetector.constants';

// 모듈 top-level에 리스너 Set을 갖고 있어 테스트마다 격리되도록 매번 새로 불러온다.
async function loadFreshThemeDetector() {
  vi.resetModules();
  return import('./themeDetector');
}

function mockMatchMedia(prefersDark: boolean) {
  const listeners = new Set<(e: MediaQueryListEvent) => void>();
  window.matchMedia = vi.fn().mockReturnValue({
    matches: prefersDark,
    addEventListener: (_: string, cb: (e: MediaQueryListEvent) => void) =>
      listeners.add(cb),
    removeEventListener: (_: string, cb: (e: MediaQueryListEvent) => void) =>
      listeners.delete(cb),
  });
  return listeners;
}

describe('themeDetector / useTheme', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('저장된 값이 없으면 시스템 설정(prefers-color-scheme)을 따른다', async () => {
    mockMatchMedia(true);
    const { useTheme } = await loadFreshThemeDetector();
    const { result } = renderHook(() => useTheme());
    expect(result.current.mode).toBe('dark');
  });

  it('저장된 값이 있으면 시스템 설정보다 우선한다', async () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'light');
    mockMatchMedia(true);
    const { useTheme } = await loadFreshThemeDetector();
    const { result } = renderHook(() => useTheme());
    expect(result.current.mode).toBe('light');
  });

  it('setTheme으로 바꾸면 localStorage에 저장되고 html에 dark 클래스가 반영된다', async () => {
    mockMatchMedia(false);
    const { useTheme } = await loadFreshThemeDetector();
    const { result } = renderHook(() => useTheme());

    act(() => result.current.setTheme('dark'));

    expect(result.current.mode).toBe('dark');
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('다른 탭에서 storage 이벤트가 오면 이 탭도 같은 값으로 바뀐다', async () => {
    mockMatchMedia(false);
    const { useTheme } = await loadFreshThemeDetector();
    const { result } = renderHook(() => useTheme());
    expect(result.current.mode).toBe('light');

    localStorage.setItem(THEME_STORAGE_KEY, 'dark');
    act(() => {
      window.dispatchEvent(
        new StorageEvent('storage', {
          key: THEME_STORAGE_KEY,
          newValue: 'dark',
        })
      );
    });

    expect(result.current.mode).toBe('dark');
  });

  it('toggleTheme은 현재 값을 반대로 뒤집는다', async () => {
    mockMatchMedia(false);
    const { useTheme } = await loadFreshThemeDetector();
    const { result } = renderHook(() => useTheme());

    act(() => result.current.toggleTheme());
    expect(result.current.mode).toBe('dark');

    act(() => result.current.toggleTheme());
    expect(result.current.mode).toBe('light');
  });
});
