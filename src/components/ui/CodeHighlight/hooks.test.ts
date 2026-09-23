import { renderHook, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

/**
 * `pendingRequests`가 모듈 전역 캐시라 테스트마다 새로 불러와야 서로 격리된다.
 */
async function loadFreshUseCodeFetch() {
  vi.resetModules();
  const mod = await import('./hooks');
  return mod.useCodeFetch;
}

function mockFetchOnce(response: { ok: boolean; text?: string }) {
  return vi.fn().mockResolvedValue({
    ok: response.ok,
    text: () => Promise.resolve(response.text ?? ''),
  });
}

describe('useCodeFetch', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('빈 filename이면 fetch 없이 즉시 loading:false를 반환한다', async () => {
    const useCodeFetch = await loadFreshUseCodeFetch();
    const { result } = renderHook(() => useCodeFetch(''));

    expect(result.current).toEqual({
      code: undefined,
      loading: false,
      error: null,
    });
    expect(fetch).not.toHaveBeenCalled();
  });

  it('요청이 끝나면 코드를 반환하고 loading이 false가 된다', async () => {
    vi.stubGlobal('fetch', mockFetchOnce({ ok: true, text: 'console.log(1)' }));
    const useCodeFetch = await loadFreshUseCodeFetch();
    const { result } = renderHook(() => useCodeFetch('Button.tsx'));

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.code).toBe('console.log(1)');
    expect(result.current.error).toBeNull();
  });

  it('응답이 실패하면 error를 반환한다', async () => {
    vi.stubGlobal('fetch', mockFetchOnce({ ok: false }));
    const useCodeFetch = await loadFreshUseCodeFetch();
    const { result } = renderHook(() => useCodeFetch('missing.tsx'));

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.code).toBeUndefined();
  });

  it('같은 filename을 보는 두 인스턴스는 fetch를 한 번만 부른다', async () => {
    const fetchMock = mockFetchOnce({ ok: true, text: 'shared' });
    vi.stubGlobal('fetch', fetchMock);
    const useCodeFetch = await loadFreshUseCodeFetch();

    const a = renderHook(() => useCodeFetch('shared.ts'));
    const b = renderHook(() => useCodeFetch('shared.ts'));

    await waitFor(() => expect(a.result.current.loading).toBe(false));
    await waitFor(() => expect(b.result.current.loading).toBe(false));

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(a.result.current.code).toBe('shared');
    expect(b.result.current.code).toBe('shared');
  });

  it('이미 완료된 요청과 같은 filename으로 새로 마운트하면 캐시를 바로 반환한다', async () => {
    const fetchMock = mockFetchOnce({ ok: true, text: 'cached' });
    vi.stubGlobal('fetch', fetchMock);
    const useCodeFetch = await loadFreshUseCodeFetch();

    const first = renderHook(() => useCodeFetch('cached.ts'));
    await waitFor(() => expect(first.result.current.loading).toBe(false));

    const second = renderHook(() => useCodeFetch('cached.ts'));
    // 캐시 히트는 effect 안에서 동기적으로 반영되므로 렌더 직후 바로 확인할 수 있다.
    expect(second.result.current).toEqual({
      code: 'cached',
      loading: false,
      error: null,
    });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
