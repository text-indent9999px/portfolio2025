/**
 * 간단한 debounce 함수
 * MUI의 debounce와 유사한 동작을 합니다.
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number = 166
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function debounced(...args: Parameters<T>) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

