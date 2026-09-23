import { act, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { useScrollSpy } from './useScrollSpy';

/** 콜백을 붙잡아 두고 테스트에서 직접 intersection 엔트리를 흘려보낼 수 있게 하는 스텁. */
class StubIntersectionObserver implements IntersectionObserver {
  static instances: StubIntersectionObserver[] = [];
  readonly root = null;
  readonly rootMargin = '';
  readonly thresholds: ReadonlyArray<number> = [];
  observed: Element[] = [];

  constructor(private callback: IntersectionObserverCallback) {
    StubIntersectionObserver.instances.push(this);
  }
  observe(el: Element) {
    this.observed.push(el);
  }
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
  trigger(entries: Partial<IntersectionObserverEntry>[]) {
    this.callback(entries as IntersectionObserverEntry[], this);
  }
}

function Probe({ ids }: { ids: string[] }) {
  const activeId = useScrollSpy(ids);
  return <span>{activeId ?? 'none'}</span>;
}

describe('useScrollSpy', () => {
  beforeEach(() => {
    StubIntersectionObserver.instances = [];
    window.IntersectionObserver =
      StubIntersectionObserver as unknown as typeof IntersectionObserver;

    document.body.innerHTML = `
      <div id="one"></div>
      <div id="two"></div>
    `;
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('처음에는 활성 섹션이 없다', () => {
    render(<Probe ids={['one', 'two']} />);
    expect(screen.getByText('none')).toBeInTheDocument();
  });

  it('교차 비율이 가장 높은 섹션을 활성으로 표시한다', () => {
    render(<Probe ids={['one', 'two']} />);
    const observer = StubIntersectionObserver.instances[0]!;

    act(() => {
      observer.trigger([
        {
          isIntersecting: true,
          intersectionRatio: 0.4,
          target: document.getElementById('one')!,
        },
        {
          isIntersecting: true,
          intersectionRatio: 0.9,
          target: document.getElementById('two')!,
        },
      ]);
    });

    expect(screen.getByText('two')).toBeInTheDocument();
  });

  it('페이지 맨 위 근처로 스크롤하면 활성 섹션을 비운다', () => {
    render(<Probe ids={['one', 'two']} />);
    const observer = StubIntersectionObserver.instances[0]!;

    act(() => {
      observer.trigger([
        {
          isIntersecting: true,
          intersectionRatio: 0.9,
          target: document.getElementById('one')!,
        },
      ]);
    });
    expect(screen.getByText('one')).toBeInTheDocument();

    Object.defineProperty(window, 'scrollY', { value: 0, configurable: true });
    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });

    expect(screen.getByText('none')).toBeInTheDocument();
  });

  it('id가 없는 페이지에서는 IntersectionObserver를 만들지 않는다', () => {
    document.body.innerHTML = '';
    render(<Probe ids={['missing']} />);
    expect(StubIntersectionObserver.instances).toHaveLength(0);
  });
});
