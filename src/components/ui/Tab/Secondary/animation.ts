export function easeInOutSin(time: number): number {
  return (1 + Math.sin(Math.PI * time - Math.PI / 2)) / 2;
}

export function animate(
  property: 'scrollLeft',
  element: HTMLElement,
  to: number,
  options: { duration?: number; ease?: (time: number) => number } = {},
  cb: (error: Error | null) => void = () => {}
): () => void {
  const { ease = easeInOutSin, duration = 300 } = options;
  let start: number | null = null;
  const from = element[property];
  let cancelled = false;

  const cancel = () => {
    cancelled = true;
  };

  const step = (timestamp: number) => {
    if (cancelled) {
      cb(new Error('Animation cancelled'));
      return;
    }
    if (start === null) {
      start = timestamp;
    }
    const time = Math.min(1, (timestamp - start) / duration);
    element[property] = ease(time) * (to - from) + from;
    if (time >= 1) {
      requestAnimationFrame(() => {
        cb(null);
      });
      return;
    }
    requestAnimationFrame(step);
  };

  if (from === to) {
    cb(new Error('Element already at target position'));
    return cancel;
  }
  requestAnimationFrame(step);
  return cancel;
}
