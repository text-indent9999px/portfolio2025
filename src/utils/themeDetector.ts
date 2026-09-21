import { useSyncExternalStore } from 'react';

import { THEME_STORAGE_KEY } from './themeDetector.constants';

export type ThemeMode = 'light' | 'dark';

const listeners = new Set<() => void>();
/** localStorage를 못 쓰는 환경(사생활 보호 모드 등)에서 현재 탭의 선택을 기억한다. */
let memoryMode: ThemeMode | null = null;

const isMode = (value: unknown): value is ThemeMode =>
  value === 'light' || value === 'dark';

function readStored(): ThemeMode | null {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY);
    return isMode(value) ? value : null;
  } catch {
    return null;
  }
}

/** 저장된 선택 → 이 탭의 선택 → 시스템 설정 순으로 현재 모드를 정한다. */
function resolve(): ThemeMode {
  return (
    readStored() ??
    memoryMode ??
    (window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light')
  );
}

function emit() {
  document.documentElement.classList.toggle('dark', resolve() === 'dark');
  listeners.forEach(listener => listener());
}

export function setTheme(mode: ThemeMode) {
  memoryMode = mode;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, mode);
  } catch {}
  emit();
}

export function toggleTheme() {
  setTheme(resolve() === 'dark' ? 'light' : 'dark');
}

/**
 * 다른 탭의 변경은 브라우저가 `storage` 이벤트로 알려 준다(현재 탭에서는 발생하지 않음).
 * 저장된 선택이 없을 때는 OS 설정 변화도 따라간다.
 */
function subscribe(listener: () => void) {
  if (listeners.size === 0) {
    window.addEventListener('storage', onStorage);
    darkQuery().addEventListener('change', emit);
  }
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      window.removeEventListener('storage', onStorage);
      darkQuery().removeEventListener('change', emit);
    }
  };
}

const darkQuery = () => window.matchMedia('(prefers-color-scheme: dark)');

function onStorage(event: StorageEvent) {
  // key가 null이면 다른 탭에서 storage.clear()가 호출된 경우
  if (event.key === THEME_STORAGE_KEY || event.key === null) {
    memoryMode = null;
    emit();
  }
}

/** 서버 렌더와 하이드레이션 첫 렌더는 `''`(미확정)로 맞춘 뒤 클라이언트 값으로 바뀐다. */
export function useTheme() {
  const mode = useSyncExternalStore<ThemeMode | ''>(subscribe, resolve, () => '');

  return {
    mode,
    /** 모드가 확정되기 전(SSR·하이드레이션)에는 null */
    isDark: mode === '' ? null : mode === 'dark',
    setTheme,
    toggleTheme,
  };
}
