import '@testing-library/jest-dom/vitest';

// jsdom은 requestAnimationFrame을 구현하지 않는다. 즉시 실행되는 폴리필로 대체한다.
if (typeof window !== 'undefined' && !window.requestAnimationFrame) {
  window.requestAnimationFrame = (cb: FrameRequestCallback) =>
    window.setTimeout(() => cb(performance.now()), 0) as unknown as number;
  window.cancelAnimationFrame = (id: number) => window.clearTimeout(id);
}

// jsdom은 IntersectionObserver도 구현하지 않는다. useScrollSpy 등에서 각 테스트가
// 필요하면 이 자리를 자기 것으로 덮어쓴다(기본은 아무 것도 관찰하지 않는 no-op).
if (typeof window !== 'undefined' && !window.IntersectionObserver) {
  class NoopIntersectionObserver implements IntersectionObserver {
    readonly root = null;
    readonly rootMargin = '';
    readonly thresholds: ReadonlyArray<number> = [];
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords(): IntersectionObserverEntry[] {
      return [];
    }
  }
  window.IntersectionObserver =
    NoopIntersectionObserver as unknown as typeof IntersectionObserver;
}
