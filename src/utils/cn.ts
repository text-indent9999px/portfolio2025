import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** 라이트 기본 + `dark:` 오버라이드 (Tailwind JIT용 리터럴 유지) */
export function ld(light: string, dark: string): string {
  return `${light} ${dark}`.trim();
}
