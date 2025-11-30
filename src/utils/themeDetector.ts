'use client';

import React from 'react';
import {
  HTML_SHOW_DELAY,
  THEME_CHANGE_MESSAGE_TYPE,
  THEME_CHANNEL_NAME,
  THEME_COMPLETED_DELAY,
  THEME_STORAGE_KEY,
} from './themeDetector.constants';
import type {
  ThemeChangeCallback,
  ThemeMode,
  ThemeState,
} from './themeDetector.types';

export type { ThemeChangeCallback, ThemeMode, ThemeState };

class ThemeDetector {
  private siteTheme: ThemeMode | null = null;
  private callbacks: Set<ThemeChangeCallback> = new Set();
  private themeChannel: BroadcastChannel | null = null;
  private beforeTheme: ThemeMode | null = null;
  private hasProcessed = false;
  private useStorageEvent = false;

  private isBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  constructor() {
    if (!this.isBrowser()) {
      return;
    }

    const supportsBroadcastChannel = typeof BroadcastChannel !== 'undefined';

    if (supportsBroadcastChannel) {
      // BroadcastChannel 초기화
      try {
        this.themeChannel = new BroadcastChannel(THEME_CHANNEL_NAME);
        this.setupBroadcastListener();
      } catch {
        this.useStorageEvent = true;
        this.setupStorageListener();
      }
    } else {
      this.useStorageEvent = true;
      this.setupStorageListener();
    }

    // 이벤트 리스너 설정
    this.setupEventListeners();

    // 초기화
    this.init();
  }

  private init() {
    if (!this.isBrowser()) {
      return;
    }

    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    this.beforeTheme = storedTheme as ThemeMode;
    if (storedTheme && ['light', 'dark'].includes(storedTheme)) {
      this.siteTheme = storedTheme as ThemeMode;
    } else {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      this.beforeTheme = prefersDark ? 'dark' : 'light';
      this.siteTheme = prefersDark ? 'dark' : 'light';
      localStorage.setItem(THEME_STORAGE_KEY, this.siteTheme);
    }

    this.notifyCallbacks();
  }

  private setupEventListeners() {
    if (!this.isBrowser()) {
      return;
    }

    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        this.htmlShow(this.beforeTheme !== this.siteTheme);
      } else {
        this.htmlHide();
      }
    });

    window.addEventListener('focus', () => {
      // this.syncFromStorage();
    });
  }

  private setupBroadcastListener() {
    if (!this.themeChannel) return;

    this.themeChannel.addEventListener('message', event => {
      if (event.data.type === THEME_CHANGE_MESSAGE_TYPE) {
        this.beforeTheme = this.siteTheme;
        this.siteTheme = event.data.siteTheme;
        if (this.siteTheme) {
          localStorage.setItem(THEME_STORAGE_KEY, this.siteTheme);
        }
        this.syncFromStorage();
      }
    });
  }

  private setupStorageListener() {
    if (!this.isBrowser()) {
      return;
    }

    window.addEventListener('storage', event => {
      if (event.key === THEME_STORAGE_KEY && event.newValue) {
        const newTheme = event.newValue as ThemeMode;

        if (['light', 'dark'].includes(newTheme)) {
          this.beforeTheme = this.siteTheme;
          this.siteTheme = newTheme;
          this.syncFromStorage();
        }
      }
    });
  }

  private syncFromStorage() {
    if (!this.isBrowser()) {
      return;
    }

    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    const beforeTheme = this.beforeTheme;

    if (
      (storedTheme && storedTheme !== this.siteTheme) ||
      beforeTheme !== this.siteTheme
    ) {
      this.siteTheme = storedTheme as ThemeMode;
      this.notifyCallbacks();
    }
  }

  private broadcastThemeChange() {
    // BroadcastChannel 사용 시
    if (this.themeChannel) {
      this.themeChannel.postMessage({
        type: THEME_CHANGE_MESSAGE_TYPE,
        siteTheme: this.siteTheme,
        timestamp: Date.now(),
      });
    }
    // storage 이벤트 사용 시
    // localStorage.setItem이 호출되면 다른 탭에서 storage 이벤트가 발생
    // 같은 탭에서는 직접 notifyCallbacks()가 호출되므로 여기서는 추가 작업 불필요
  }

  private notifyCallbacks() {
    const themeState = this.getCurrentThemeState();
    this.updateCSSVariables(themeState);
    this.callbacks.forEach(callback => callback(themeState));
  }

  private updateCSSVariables(themeState: ThemeState) {
    if (!this.isBrowser()) {
      return;
    }

    const html = document.documentElement;

    if (themeState.isDark) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }

    this.addThemeCompletedClass();
  }

  private addThemeCompletedClass() {
    const html = document.documentElement;
    const handleLoad = () => {
      if (html.classList.contains('theme-setting-completed')) {
        return;
      } else {
        html.classList.add('theme-ready');
        setTimeout(() => {
          html.classList.add('theme-setting-completed');
        }, THEME_COMPLETED_DELAY);
      }
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad, { once: true });
    }
  }

  public getCurrentThemeState(): ThemeState {
    if (!this.isBrowser()) {
      return {
        mode: 'light',
        isDark: false,
      };
    }

    const isDark = this.siteTheme === 'dark';

    return {
      mode: this.siteTheme || 'light',
      isDark,
    };
  }

  public htmlShow(themeChanged: boolean) {
    if (this.hasProcessed) {
      return;
    }
    this.hasProcessed = true;
    const html = document.documentElement;
    if (themeChanged) {
      html.dataset.visibility = 'visible';
      setTimeout(() => {
        html.classList.add('theme-ready');
      }, HTML_SHOW_DELAY);
    } else {
      html.dataset.visibility = 'visible';
      html.classList.add('theme-ready');
    }
  }

  public htmlHide() {
    const html = document.documentElement;
    html.dataset.visibility = 'hidden';
    html.classList.remove('theme-ready');
    this.hasProcessed = false;
    this.beforeTheme = this.siteTheme;
  }

  public setTheme(mode: ThemeMode) {
    if (!this.isBrowser()) {
      return;
    }

    this.beforeTheme = this.siteTheme;
    this.siteTheme = mode;
    localStorage.setItem(THEME_STORAGE_KEY, mode);
    this.broadcastThemeChange();
    this.notifyCallbacks();
  }

  public toggleTheme() {
    if (!this.isBrowser()) {
      return;
    }

    const currentState = this.getCurrentThemeState();

    this.setTheme(currentState.isDark ? 'light' : 'dark');
  }

  public subscribe(callback: ThemeChangeCallback): () => void {
    this.callbacks.add(callback);

    callback(this.getCurrentThemeState());

    return () => {
      this.callbacks.delete(callback);
    };
  }

  public destroy() {
    this.callbacks.clear();
    if (this.themeChannel) {
      this.themeChannel.close();
    }
  }
}

let themeDetectorInstance: ThemeDetector | null = null;

export const getThemeDetector = (): ThemeDetector => {
  if (!themeDetectorInstance) {
    themeDetectorInstance = new ThemeDetector();
  }
  return themeDetectorInstance;
};

export const useThemeDetector = () => {
  const detector = getThemeDetector();

  return {
    getCurrentTheme: React.useCallback(
      () => detector.getCurrentThemeState(),
      [detector]
    ),
    setTheme: React.useCallback(
      (mode: ThemeMode) => detector.setTheme(mode),
      [detector]
    ),
    toggleTheme: React.useCallback(() => detector.toggleTheme(), [detector]),
    subscribe: React.useCallback(
      (callback: ThemeChangeCallback) => detector.subscribe(callback),
      [detector]
    ),
  };
};
