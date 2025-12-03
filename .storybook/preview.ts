import type { Preview } from '@storybook/nextjs';
import {
  Grandiflora_One,
  Noto_Sans_KR,
  Playwrite_AU_QLD,
  Quicksand,
} from 'next/font/google';
import React from 'react';

// CSS 변수를 먼저 로드 (Tailwind보다 먼저)
// 순서가 중요: CSS 변수 → Tailwind → 기타 스타일
import '../src/styles/colors-modes.css';
import '../src/styles/colors-theme.css';
import '../src/styles/colors-variables.css';
// 그 다음 Tailwind와 다른 스타일
import '../src/app/globals.css';

// Storybook 배경색 강제 적용 (다크모드 지원)
const applyStorybookStyles = () => {
  if (typeof document === 'undefined') return;

  const style = document.createElement('style');
  style.id = 'storybook-theme-styles';

  // 기존 스타일 제거 (이미 있다면)
  const existingStyle = document.getElementById('storybook-theme-styles');
  if (existingStyle) {
    existingStyle.remove();
  }

  const storybookStyles = `

  `;

  style.textContent = storybookStyles;
  document.head.appendChild(style);
};

// 스타일 적용
if (typeof document !== 'undefined') {
  applyStorybookStyles();
}

// Next.js navigation 모킹
const mockRouter = {
  push: (url: string) => {
    console.log('Mock router push:', url);
  },
  back: () => {
    console.log('Mock router back');
  },
  forward: () => {
    console.log('Mock router forward');
  },
  refresh: () => {
    console.log('Mock router refresh');
  },
  replace: (url: string) => {
    console.log('Mock router replace:', url);
  },
  prefetch: (url: string) => {
    console.log('Mock router prefetch:', url);
  },
};

// 전역 모킹 설정
if (typeof window !== 'undefined') {
  // @ts-expect-error - Storybook에서 전역 모킹을 위한 설정
  window.__NEXT_ROUTER_MOCK = mockRouter;
}

// Storybook에서도 동일한 폰트 로드
const quicksand = Quicksand({
  variable: '--quicksand',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

const notoSansKr = Noto_Sans_KR({
  variable: '--noto-sans-kr',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

const grandiflora = Grandiflora_One({
  variable: '--grandiflora-one',
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  preload: false,
});

const playWriteAu = Playwrite_AU_QLD({
  variable: '--playwrite-au-QLD',
  weight: '400',
  display: 'swap',
});

// Storybook에서 테마 초기화
// backgrounds가 설정되어 있으면 호출하지 않음 (충돌 방지)
// 전역 플래그로 한 번만 실행되도록 함
const initTheme = () => {
  if (typeof window === 'undefined') return;

  try {
    // 이미 초기화되었으면 스킵 (무한 루프 방지)
    // @ts-expect-error - 전역 플래그
    if (window.__STORYBOOK_THEME_INITIALIZED__) {
      return;
    }

    // backgrounds가 설정되어 있으면 initTheme()이 dark 클래스를 건드리지 않음
    // @ts-expect-error - Storybook globals API
    const currentGlobals = window.__STORYBOOK_GLOBALS__ || {};
    if (currentGlobals.backgrounds !== undefined) {
      // backgrounds가 설정되어 있으면 dark 클래스는 backgrounds에 의해 제어됨
      // 단지 플래그만 설정
      document.documentElement.setAttribute('data-theme-ready', '1');
      document.documentElement.classList.add('theme-ready');
      // @ts-expect-error - 전역 플래그
      window.__STORYBOOK_THEME_INITIALIZED__ = true;
      return;
    }

    // localStorage에서 저장된 테마 설정 읽기
    const stored = localStorage.getItem('siteTheme');

    // 시스템 다크모드 선호도 확인
    const systemDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;

    // 유효한 테마 모드인지 확인 (라이트/다크만 지원)
    const mode =
      stored && (stored === 'light' || stored === 'dark')
        ? stored
        : systemDark
        ? 'dark'
        : 'light';

    // 실제 다크모드 여부 결정
    const isDark = mode === 'dark';

    // DOM에 테마 적용
    const root = document.documentElement;
    console.log('[initTheme] dark 클래스 변경', {
      isDark,
      현재dark클래스: root.classList.contains('dark'),
      stack: new Error().stack?.split('\n').slice(1, 3).join('\n'),
    });
    if (isDark) {
      root.classList.add('dark');
      console.log('[initTheme] dark 클래스 추가됨');
    } else {
      root.classList.remove('dark');
      console.log('[initTheme] dark 클래스 제거됨');
    }

    // 테마 준비 완료 플래그 설정
    root.setAttribute('data-theme-ready', '1');
    root.classList.add('theme-ready');
  } catch (error) {
    // 에러 발생 시 기본값으로 설정
    console.warn('Theme initialization failed:', error);
    document.documentElement.setAttribute('data-theme-ready', '1');
    document.documentElement.classList.add('theme-ready');
  }
};

// Storybook 로드 시 테마 초기화
if (typeof window !== 'undefined') {
  initTheme();
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      expanded: true, // Controls 패널을 기본적으로 확장
    },
    docs: {
      controls: {
        sort: 'requiredFirst', // 필수 props를 먼저 표시
      },
    },
    backgrounds: {
      default:
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light',
    },
  },
  decorators: [
    (Story: React.FC) => {
      // 각 스토리 렌더링 시에도 테마 초기화 확인
      React.useEffect(() => {
        // initTheme()은 전역 플래그로 한 번만 실행되므로 여기서는 호출하지 않음
        // 대신 backgrounds가 설정되어 있는지 확인만 함

        // syncBackgroundToDarkClass가 실행 중인지 추적하는 플래그 (무한 루프 방지)
        let isSyncingBackground = false;

        // Storybook backgrounds 변경 감지 및 dark 클래스 적용
        // backgrounds가 설정되어 있으면 이것이 최우선 (다른 함수들이 덮어쓰지 않도록)
        let lastBackgroundsValue: string | { value?: string } | undefined =
          undefined;
        const syncBackgroundToDarkClass = (
          backgroundsValue?: string | { value?: string } | undefined
        ) => {
          try {
            // 이미 동일한 값으로 처리 중이면 스킵 (무한 루프 방지)
            if (isSyncingBackground) {
              return;
            }

            // backgrounds 값이 직접 전달되지 않으면 channel에서 가져오기
            let backgrounds = backgroundsValue;

            if (backgrounds === undefined) {
              // @ts-expect-error - Storybook globals API
              const channel = window.__STORYBOOK_ADDONS_CHANNEL__;
              if (!channel) return;

              // 현재 globals 가져오기
              // @ts-expect-error - Storybook globals API
              const currentGlobals = window.__STORYBOOK_GLOBALS__ || {};
              backgrounds = currentGlobals.backgrounds;
            }

            // backgrounds가 없으면 함수 종료 (다른 함수들이 처리하도록)
            if (backgrounds === undefined) {
              return;
            }

            // 이전 값과 동일하면 스킵 (무한 루프 방지)
            const backgroundsStr = JSON.stringify(backgrounds);
            const lastBackgroundsStr = JSON.stringify(lastBackgroundsValue);
            if (backgroundsStr === lastBackgroundsStr) {
              return;
            }

            // backgrounds 값에 따라 dark 클래스 추가/제거
            const root = document.documentElement;
            let isDark = false;

            if (typeof backgrounds === 'string') {
              isDark = backgrounds === 'dark';
            } else if (backgrounds && typeof backgrounds === 'object') {
              // 객체 형태: { value: 'dark' } 또는 { name: 'dark', value: '#333' }
              const bgObj = backgrounds as Record<string, unknown>;
              isDark = bgObj.value === 'dark' || bgObj.name === 'dark' || false;
            }

            // 현재 상태와 동일하면 스킵 (불필요한 DOM 조작 방지)
            const currentHasDark = root.classList.contains('dark');
            if (isDark === currentHasDark) {
              lastBackgroundsValue = backgrounds;
              return;
            }

            // backgrounds 기반으로 dark 클래스 강제 적용 (다른 함수들이 덮어쓰지 않도록)
            isSyncingBackground = true;
            lastBackgroundsValue = backgrounds;

            if (isDark) {
              root.classList.add('dark');
            } else {
              root.classList.remove('dark');
            }

            // MutationObserver가 이 변경을 감지하지 않도록 충분한 지연 후 플래그 해제
            // 다른 핸들러들이 실행될 시간을 주기 위해 더 긴 지연
            setTimeout(() => {
              isSyncingBackground = false;
            }, 100);
          } catch (error) {
            console.debug('Failed to sync background to dark class:', error);
            isSyncingBackground = false;
          }
        };

        // Storybook backgrounds addon 초기값 설정
        // 이미 설정되어 있으면 그 값을 유지하고, 없으면 시스템 설정에 따라 초기화
        const setInitialBackground = () => {
          try {
            // @ts-expect-error - Storybook globals API
            const channel = window.__STORYBOOK_ADDONS_CHANNEL__;
            if (!channel) return;

            // 현재 globals 확인
            // @ts-expect-error - Storybook globals API
            const currentGlobals = window.__STORYBOOK_GLOBALS__ || {};
            const currentBackgrounds = currentGlobals.backgrounds;

            // 이미 backgrounds가 설정되어 있으면 아무것도 하지 않음
            // (handleGlobalsUpdate가 이미 처리했을 것이므로)
            if (currentBackgrounds !== undefined) {
              return;
            }

            // backgrounds가 설정되어 있지 않을 때만 시스템 설정에 따라 초기화
            // localStorage에서 저장된 테마 설정 읽기
            const stored = localStorage.getItem('siteTheme');

            // 시스템 다크모드 선호도 확인
            const systemDark = window.matchMedia(
              '(prefers-color-scheme: dark)'
            ).matches;

            // 유효한 테마 모드인지 확인 (라이트/다크만 지원)
            const mode =
              stored && (stored === 'light' || stored === 'dark')
                ? stored
                : systemDark
                ? 'dark'
                : 'light';

            const backgroundValue = mode === 'dark' ? 'dark' : 'light';

            // Storybook의 backgrounds addon API를 통해 설정
            channel.emit('updateGlobals', {
              globals: {
                backgrounds: backgroundValue,
              },
            });
          } catch (error) {
            // backgrounds addon이 없거나 설정 실패 시 무시
            console.debug('Failed to set initial background:', error);
          }
        };

        // Storybook globals 변경 감지 (backgrounds 변경 시)
        // 이벤트 리스너는 전역으로 한 번만 등록 (decorator가 매번 실행되므로 중복 방지)
        // @ts-expect-error - Storybook globals API
        const channel = window.__STORYBOOK_ADDONS_CHANNEL__;
        if (channel) {
          // 전역 플래그로 이벤트 리스너가 이미 등록되었는지 확인
          // @ts-expect-error - 전역 플래그
          if (!window.__STORYBOOK_BACKGROUNDS_LISTENERS_INITIALIZED__) {
            // @ts-expect-error - 전역 플래그
            window.__STORYBOOK_BACKGROUNDS_LISTENERS_INITIALIZED__ = true;

            console.log('[초기화] 이벤트 리스너 등록 시작');

            // 초기 backgrounds 설정 (최초 한 번만)
            // setInitialBackground()는 updateGlobals를 emit하므로,
            // handleGlobalsUpdate가 자동으로 syncBackgroundToDarkClass를 호출함
            // 따라서 여기서 별도로 syncBackgroundToDarkClass를 호출할 필요 없음

            // 현재 backgrounds가 없을 때만 초기화
            // @ts-expect-error - Storybook globals API
            const currentGlobals = window.__STORYBOOK_GLOBALS__ || {};
            if (currentGlobals.backgrounds === undefined) {
              console.log(
                '[초기화] backgrounds가 없어서 setInitialBackground 호출'
              );
              setInitialBackground();
            } else {
              console.log(
                '[초기화] backgrounds가 이미 설정되어 있음',
                currentGlobals.backgrounds
              );
              // 이미 backgrounds가 있으면 dark 클래스만 동기화
              setTimeout(() => {
                syncBackgroundToDarkClass(currentGlobals.backgrounds);
              }, 50);
            }

            // handleGlobalsUpdate 디바운싱 (중복 호출 방지)
            let globalsUpdateTimeout: NodeJS.Timeout | null = null;
            let lastGlobalsBackgrounds:
              | string
              | { value?: string }
              | undefined = undefined;
            const handleGlobalsUpdate = (event: {
              globals?: { backgrounds?: string | { value?: string } };
            }) => {
              console.log('[handleGlobalsUpdate] 이벤트 수신', {
                backgrounds: event?.globals?.backgrounds,
                isSyncingBackground,
              });
              if (event?.globals?.backgrounds !== undefined) {
                // 이전 값과 동일하면 스킵 (무한 루프 방지)
                const currentBg = event.globals.backgrounds;
                const currentBgStr = JSON.stringify(currentBg);
                const lastBgStr = JSON.stringify(lastGlobalsBackgrounds);
                if (currentBgStr === lastBgStr && isSyncingBackground) {
                  console.log(
                    '[handleGlobalsUpdate] 이전 값과 동일하고 isSyncingBackground=true로 스킵'
                  );
                  return;
                }

                // 이전 타이머 취소
                if (globalsUpdateTimeout) {
                  clearTimeout(globalsUpdateTimeout);
                  console.log('[handleGlobalsUpdate] 이전 타이머 취소');
                }

                // 약간의 지연을 두어 중복 호출 방지 및 다른 핸들러와의 충돌 방지
                globalsUpdateTimeout = setTimeout(() => {
                  // syncBackgroundToDarkClass가 실행 중이 아니고, backgrounds가 설정되어 있을 때만 실행
                  if (
                    !isSyncingBackground &&
                    event?.globals?.backgrounds !== undefined
                  ) {
                    console.log(
                      '[handleGlobalsUpdate] syncBackgroundToDarkClass 호출'
                    );
                    lastGlobalsBackgrounds = event.globals.backgrounds;
                    // 이벤트에서 직접 받은 backgrounds 값을 전달
                    syncBackgroundToDarkClass(event.globals.backgrounds);
                  } else {
                    console.log('[handleGlobalsUpdate] 실행 스킵', {
                      isSyncingBackground,
                      hasBackgrounds: event?.globals?.backgrounds !== undefined,
                    });
                  }
                  globalsUpdateTimeout = null;
                }, 10);
              }
            };

            channel.on('updateGlobals', handleGlobalsUpdate);

            // 스토리 변경 시에도 backgrounds 값 확인하여 dark 클래스 동기화
            let storyChangedTimeout: NodeJS.Timeout | null = null;
            const handleStoryChanged = () => {
              console.log('[handleStoryChanged] 스토리 변경 감지', {
                isSyncingBackground,
              });
              // 이전 타이머 취소
              if (storyChangedTimeout) {
                clearTimeout(storyChangedTimeout);
              }

              // 스토리 변경 시 현재 backgrounds 값을 확인하고 동기화
              storyChangedTimeout = setTimeout(() => {
                // syncBackgroundToDarkClass가 실행 중이 아니고, backgrounds가 설정되어 있을 때만 실행
                if (isSyncingBackground) {
                  console.log(
                    '[handleStoryChanged] isSyncingBackground=true로 스킵'
                  );
                  return;
                }

                // 현재 globals에서 backgrounds 값을 가져와서 동기화
                // @ts-expect-error - Storybook globals API
                const currentGlobals = window.__STORYBOOK_GLOBALS__ || {};
                const currentBackgrounds = currentGlobals.backgrounds;

                console.log('[handleStoryChanged] backgrounds 확인', {
                  currentBackgrounds,
                });
                if (currentBackgrounds !== undefined) {
                  // backgrounds가 설정되어 있으면 그 값에 맞춰 동기화
                  console.log(
                    '[handleStoryChanged] syncBackgroundToDarkClass 호출'
                  );
                  syncBackgroundToDarkClass(currentBackgrounds);
                } else {
                  // backgrounds가 없으면 현재 dark 클래스 상태를 유지
                  // (setInitialBackground는 최초 한 번만 호출되어야 하므로 여기서는 호출하지 않음)
                  console.log('[handleStoryChanged] backgrounds가 없어서 스킵');
                }
                storyChangedTimeout = null;
              }, 50);
            };

            // Storybook의 스토리 변경 이벤트 감지
            channel.on('storyChanged', handleStoryChanged);
            channel.on('storyRendered', handleStoryChanged);

            // 테마 변경 후 스타일 재적용 (약간의 지연을 두어 DOM이 준비된 후 적용)
            setTimeout(() => {
              applyStorybookStyles();
            }, 0);

            // 시스템 테마 변경 감지 (하지만 backgrounds는 사용자가 설정한 값을 유지)
            const mediaQuery = window.matchMedia(
              '(prefers-color-scheme: dark)'
            );
            const handleThemeChange = () => {
              // backgrounds가 설정되어 있으면 initTheme()을 호출하지 않음 (충돌 방지)
              // @ts-expect-error - Storybook globals API
              const currentGlobals = window.__STORYBOOK_GLOBALS__ || {};
              const hasBackgrounds = currentGlobals.backgrounds !== undefined;

              if (!hasBackgrounds) {
                initTheme();
              }
              // backgrounds는 사용자가 설정한 값을 유지하므로 초기화하지 않음
              // 단지 현재 backgrounds 값에 맞춰 dark 클래스만 동기화
              setTimeout(() => {
                applyStorybookStyles();
                // syncBackgroundToDarkClass가 실행 중이 아닐 때만 동기화
                if (!isSyncingBackground) {
                  console.log(
                    '[handleThemeChange] syncBackgroundToDarkClass 호출'
                  );
                  syncBackgroundToDarkClass();
                } else {
                  console.log(
                    '[handleThemeChange] isSyncingBackground=true로 스킵'
                  );
                }
              }, 0);
            };

            mediaQuery.addEventListener('change', handleThemeChange);

            // MutationObserver로 dark 클래스 변경 감지
            // backgrounds가 설정되어 있으면 MutationObserver는 dark 클래스를 건드리지 않음
            // (syncBackgroundToDarkClass가 이미 제어하고 있으므로)
            const observer = new MutationObserver(() => {
              // backgrounds가 설정되어 있으면 dark 클래스는 syncBackgroundToDarkClass가 제어하므로
              // MutationObserver는 스타일만 적용하고 dark 클래스는 건드리지 않음
              applyStorybookStyles();
            });

            observer.observe(document.documentElement, {
              attributes: true,
              attributeFilter: ['class'],
            });

            // 전역 cleanup 함수 저장 (필요시 사용)
            // @ts-expect-error - 전역 cleanup
            window.__STORYBOOK_BACKGROUNDS_CLEANUP__ = () => {
              channel.off('updateGlobals', handleGlobalsUpdate);
              channel.off('storyChanged', handleStoryChanged);
              channel.off('storyRendered', handleStoryChanged);
              mediaQuery.removeEventListener('change', handleThemeChange);
              observer.disconnect();
              // @ts-expect-error - 전역 플래그
              window.__STORYBOOK_BACKGROUNDS_LISTENERS_INITIALIZED__ = false;
            };
          }

          // 각 스토리마다 현재 backgrounds 값에 맞춰 dark 클래스만 동기화
          // (이벤트 리스너는 이미 전역으로 등록되어 있음)
          // 하지만 handleStoryChanged가 이미 처리하므로 여기서는 호출하지 않음
          // (무한 루프 방지)

          return () => {
            // cleanup: 이벤트 리스너는 전역으로 등록되어 있으므로 제거하지 않음
            // 각 스토리의 cleanup에서는 아무것도 하지 않음
          };
        } else {
          // channel이 없을 경우 기본 처리
          setTimeout(() => {
            applyStorybookStyles();
          }, 0);

          const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
          const handleThemeChange = () => {
            initTheme();
            setTimeout(() => {
              applyStorybookStyles();
            }, 0);
          };

          mediaQuery.addEventListener('change', handleThemeChange);

          const observer = new MutationObserver(() => {
            applyStorybookStyles();
          });

          observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
          });

          return () => {
            mediaQuery.removeEventListener('change', handleThemeChange);
            observer.disconnect();
          };
        }
      }, []);

      return React.createElement(
        'div',
        {
          className: `p-4 ${quicksand.variable} ${notoSansKr.variable} ${grandiflora.variable} ${playWriteAu.variable}`,
          style: {
            fontFamily: 'var(--quicksand), var(--noto-sans-kr)',
            minHeight: '100vh',
          },
        },
        React.createElement(Story)
      );
    },
  ],
};

export default preview;
