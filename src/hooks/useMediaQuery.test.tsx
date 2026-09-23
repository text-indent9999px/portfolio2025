import { act, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { DeviceProvider } from '../contexts/DeviceContext';
import { useMediaQuery } from './useMediaQuery';

/**
 * `window.matchMedia`를 쿼리 문자열별로 흉내 낸다. `set(query, matches)`로 값을
 * 바꾸고 등록된 리스너에 change 이벤트를 흘려보낼 수 있다.
 */
function mockMatchMedia(initial: Record<string, boolean>) {
  const state = { ...initial };
  const listeners = new Map<string, Set<() => void>>();

  window.matchMedia = ((query: string) => {
    return {
      get matches() {
        return state[query] ?? false;
      },
      media: query,
      addEventListener: (_: string, cb: () => void) => {
        if (!listeners.has(query)) listeners.set(query, new Set());
        listeners.get(query)!.add(cb);
      },
      removeEventListener: (_: string, cb: () => void) => {
        listeners.get(query)?.delete(cb);
      },
    } as unknown as MediaQueryList;
  }) as typeof window.matchMedia;

  return {
    set(query: string, matches: boolean) {
      state[query] = matches;
      listeners.get(query)?.forEach(cb => cb());
    },
  };
}

const XL_QUERY = '(min-width: 80rem)';

function Probe({ direction }: { direction?: 'min' | 'max' }) {
  const matches = useMediaQuery('--breakpoint-xl', direction);
  return <span>{matches ? 'match' : 'no-match'}</span>;
}

describe('useMediaQuery', () => {
  afterEach(() => {
    // matchMedia 모킹을 다음 테스트로 새지 않게 정리한다.
    // (jsdom 기본 matchMedia는 없어 재할당만으로 충분하다)
  });

  it('min 방향: 뷰포트가 브레이크포인트 이상이면 true', async () => {
    const media = mockMatchMedia({ [XL_QUERY]: false });
    render(
      <DeviceProvider>
        <Probe />
      </DeviceProvider>
    );
    expect(await screen.findByText('no-match')).toBeInTheDocument();

    act(() => media.set(XL_QUERY, true));
    expect(await screen.findByText('match')).toBeInTheDocument();
  });

  it('max 방향: min 결과를 뒤집는다', async () => {
    mockMatchMedia({ [XL_QUERY]: true });
    render(
      <DeviceProvider>
        <Probe direction="max" />
      </DeviceProvider>
    );
    expect(await screen.findByText('no-match')).toBeInTheDocument();
  });
});
