// 색상 및 Variant별 클래스 정의
import type { Color, Variant } from './UI.config';

export const COLOR_VARIANT_CLASSES: Record<Color, Record<Variant, string>> = {
  primary: {
    filled:
      'bg-primary-900 dark:bg-primary-50 text-primary-50 dark:text-primary-900 border-primary-900 dark:border-primary-50',
    tonal:
      'bg-primary-300 dark:bg-primary-700 text-primary-900 dark:text-primary-50 border-primary-300 dark:border-primary-700',
    outlined:
      'text-primary-900 dark:text-primary-50 border-primary-900 dark:border-primary-50 hover:bg-primary-100 dark:hover:bg-primary-700',
    ghost:
      'text-primary-900 dark:text-primary-50 hover:bg-primary-100 dark:hover:bg-primary-700',
    text: 'text-primary-900 dark:text-primary-50',
  },
  secondary: {
    filled:
      'bg-secondary-600 dark:bg-secondary-300 text-secondary-50 dark:text-secondary-900 border-secondary-600 dark:border-secondary-300',
    tonal:
      'bg-secondary-300 dark:bg-secondary-700 text-secondary-900 dark:text-secondary-50 border-secondary-300 dark:border-secondary-700',
    outlined:
      'text-secondary-600 dark:text-secondary-300 border-secondary-600 dark:border-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-700',
    ghost:
      'text-secondary-600 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-700',
    text: 'text-secondary-600 dark:text-secondary-300',
  },
  success: {
    filled:
      'bg-success-600 dark:bg-success-300 text-success-50 dark:text-success-900 border-success-600 dark:border-success-300',
    tonal:
      'bg-success-300 dark:bg-success-700 text-success-900 dark:text-success-50 border-success-300 dark:border-success-700',
    outlined:
      'text-success-600 dark:text-success-300 border-success-600 dark:border-success-300 hover:bg-success-100 dark:hover:bg-success-700',
    ghost:
      'text-success-600 dark:text-success-300 hover:bg-success-100 dark:hover:bg-success-700',
    text: 'text-success-600 dark:text-success-300',
  },
  warning: {
    filled:
      'bg-warning-600 dark:bg-warning-300 text-warning-50 dark:text-warning-900 border-warning-600 dark:border-warning-300',
    tonal:
      'bg-warning-300 dark:bg-warning-700 text-warning-900 dark:text-warning-50 border-warning-300 dark:border-warning-700',
    outlined:
      'text-warning-600 dark:text-warning-300 border-warning-600 dark:border-warning-300 hover:bg-warning-100 dark:hover:bg-warning-700',
    ghost:
      'text-warning-600 dark:text-warning-300 hover:bg-warning-100 dark:hover:bg-warning-700',
    text: 'text-warning-600 dark:text-warning-300',
  },
  danger: {
    filled:
      'bg-danger-700 dark:bg-danger-300 text-danger-50 dark:text-danger-900 border-danger-700 dark:border-danger-300',
    tonal:
      'bg-danger-300 dark:bg-danger-700 text-danger-900 dark:text-danger-50 border-danger-300 dark:border-danger-700',
    outlined:
      'text-danger-700 dark:text-danger-300 border-danger-700 dark:border-danger-300 hover:bg-danger-100 dark:hover:bg-danger-700',
    ghost:
      'text-danger-700 dark:text-danger-300 hover:bg-danger-100 dark:hover:bg-danger-700',
    text: 'text-danger-700 dark:text-danger-300',
  },
  info: {
    filled:
      'bg-info-600 dark:bg-info-300 text-info-50 dark:text-info-900 border-info-600 dark:border-info-300',
    tonal:
      'bg-info-300 dark:bg-info-700 text-info-900 dark:text-info-50 border-info-300 dark:border-info-700',
    outlined:
      'text-info-600 dark:text-info-300 border-info-600 dark:border-info-300 hover:bg-info-100 dark:hover:bg-info-700',
    ghost:
      'text-info-600 dark:text-info-300 hover:bg-info-100 dark:hover:bg-info-700',
    text: 'text-info-600 dark:text-info-300',
  },
  gray: {
    filled:
      'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700',
    tonal:
      'bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-50 border-gray-300 dark:border-gray-600',
    outlined:
      'text-gray-500 dark:text-gray-300 border-gray-400 dark:border-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700',
    ghost:
      'text-gray-500 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700',
    text: 'text-gray-500 dark:text-gray-300',
  },
};
