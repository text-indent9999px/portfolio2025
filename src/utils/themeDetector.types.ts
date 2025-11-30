export type ThemeMode = '' | 'light' | 'dark';

export interface ThemeState {
  mode: ThemeMode;
  isDark: boolean | null;
}

export type ThemeChangeCallback = (themeState: ThemeState) => void;














