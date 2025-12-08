import type { Preview } from '@storybook/nextjs';
import { Gowun_Batang, Kalam, Noto_Sans_KR, Quicksand } from 'next/font/google';
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
const notoSansKr = Noto_Sans_KR({
  variable: '--noto-sans-kr',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  preload: true,
});

const quicksand = Quicksand({
  variable: '--quicksand',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  preload: false,
});

const kalam = Kalam({
  variable: '--kalam',
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  preload: false,
});

const gowunBatang = Gowun_Batang({
  variable: '--gowun-batang',
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  preload: false,
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

    // 전역 변수에 mode 저장 (투명한 배경일 때 사용)
    // @ts-expect-error - 전역 변수
    window.__STORYBOOK_THEME_MODE__ = mode;

    // 실제 다크모드 여부 결정
    const isDark = mode === 'dark';

    // DOM에 테마 적용
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
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
      React.useEffect(() => {
        const getBrightness = (bgColor: string): number | null => {
          // rgba(0, 0, 0, 0) 같은 투명한 배경은 null 반환 (initTheme의 mode 사용)
          if (bgColor.includes('rgba')) {
            const rgbaMatch = bgColor.match(
              /rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/
            );
            if (rgbaMatch) {
              const alpha = parseFloat(rgbaMatch[4]);
              // alpha가 0에 가까우면 투명한 배경 → null 반환
              if (alpha < 0.1) {
                return null;
              }
            }
          }

          // rgb(r, g, b) 또는 rgba(r, g, b, a) 형식 파싱
          const rgbMatch = bgColor.match(/\d+/g);
          if (rgbMatch && rgbMatch.length >= 3) {
            const r = parseInt(rgbMatch[0], 10);
            const g = parseInt(rgbMatch[1], 10);
            const b = parseInt(rgbMatch[2], 10);
            // 밝기 계산 (0-255)
            return (r + g + b) / 3;
          }
          return 150; // 기본값 (중간)
        };

        // 배경색에 따라 dark 클래스 적용
        const applyDarkClassFromBackground = (bgColor: string) => {
          const root = document.documentElement;
          const brightness = getBrightness(bgColor);

          let shouldBeDark: boolean;

          // 투명한 배경이면 initTheme에서 결정된 mode 사용
          if (brightness === null) {
            // @ts-expect-error - 전역 변수
            const themeMode = window.__STORYBOOK_THEME_MODE__ || 'light';
            shouldBeDark = themeMode === 'dark';
          } else {
            // 배경이 어두우면 dark 클래스 추가, 밝으면 제거
            shouldBeDark = brightness < 150;
          }

          const currentIsDark = root.classList.contains('dark');

          if (shouldBeDark !== currentIsDark) {
            if (shouldBeDark) {
              root.classList.add('dark');
            } else {
              root.classList.remove('dark');
            }
          }
        };

        // .sb-show-main 요소 찾기
        const findSbShowMain = (): HTMLElement | null => {
          return document.querySelector('.sb-show-main');
        };

        // 스타일 적용
        setTimeout(() => {
          applyStorybookStyles();
        }, 0);

        // .sb-show-main 요소의 배경색 변경 감지
        let lastBgColor: string | null = null;
        let timeoutId: NodeJS.Timeout | null = null;

        const checkBackgroundColor = () => {
          const element = findSbShowMain();
          if (element) {
            const bgColor = window.getComputedStyle(element).backgroundColor;
            // 배경색이 변경되었을 때만 처리
            if (bgColor !== lastBgColor) {
              lastBgColor = bgColor;
              applyDarkClassFromBackground(bgColor);
            }
          }
        };

        const sbShowMainObserver = new MutationObserver(() => {
          // 이전 타이머 취소
          if (timeoutId) {
            clearTimeout(timeoutId);
          }
          // setTimeout으로 타이밍 지연 (Storybook이 배경색을 변경한 후 computed style이 업데이트될 시간 확보)
          timeoutId = setTimeout(() => {
            checkBackgroundColor();
            timeoutId = null;
          }, 350);
        });

        // .sb-show-main 요소 관찰 시작
        const startObserving = () => {
          const element = findSbShowMain();
          if (element) {
            // 초기 배경색 설정
            lastBgColor = window.getComputedStyle(element).backgroundColor;
            applyDarkClassFromBackground(lastBgColor);

            sbShowMainObserver.observe(element, {
              attributes: true,
              attributeFilter: ['style', 'class'],
              childList: false,
              subtree: false,
            });
          } else {
            // 요소가 아직 없으면 잠시 후 다시 시도
            setTimeout(startObserving, 100);
          }
        };

        startObserving();

        // MutationObserver로 dark 클래스 변경 감지 (스타일만 재적용)
        const classObserver = new MutationObserver(() => {
          applyStorybookStyles();
        });

        classObserver.observe(document.documentElement, {
          attributes: true,
          attributeFilter: ['style'],
        });

        return () => {
          if (timeoutId) {
            clearTimeout(timeoutId);
          }
          sbShowMainObserver.disconnect();
          classObserver.disconnect();
        };
      }, []);

      return React.createElement(
        'div',
        {
          className: `p-10 ${quicksand.variable} ${notoSansKr.variable} ${gowunBatang.variable}
          ${quicksand.variable} ${kalam.variable} antialiased`,
          style: {
            position: 'fixed',
            fontFamily: 'var(--quicksand), var(--noto-sans-kr)',
            height: '100%',
            width: '100%',
            top: 0,
            left: 0,
            backgroundColor: 'var(--color-surface-level-min)',
            transition: 'background-color 0.15s ease-in-out',
          },
        },
        React.createElement(Story)
      );
    },
  ],
};

export default preview;
