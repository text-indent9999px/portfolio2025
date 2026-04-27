import type { Preview } from '@storybook/nextjs';
import { Gowun_Batang, Kalam, Noto_Sans_KR, Quicksand } from 'next/font/google';
import React from 'react';
import { DeviceProvider } from '../src/contexts/DeviceContext';
import { NavigationProvider } from '../src/contexts/NavigationContext';
import '../src/app/globals.css';
import '../src/styles/colors-modes.css';
import '../src/styles/colors-theme.css';
import '../src/styles/colors-variables.css';

if (typeof document !== 'undefined') {
  const root = document.documentElement;
  // globals.css의 초기 숨김(opacity: 0 / display: none) 방지
  root.classList.add('theme-ready', 'theme-setting-completed');
  root.setAttribute('data-visibility', 'visible');
}

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

const preview: Preview = {
  parameters: {
    nextjs: {
      // useRouter/usePathname/useSearchParams from next/navigation 지원
      appDirectory: true,
      navigation: {
        pathname: '/',
        query: {},
      },
    },
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
      default: 'light',
      values: [
        { name: 'light', value: '#f5f5f5' },
        { name: 'dark', value: '#121212' },
      ],
    },
  },
  decorators: [
    (Story: React.FC, context) => {
      React.useEffect(() => {
        const root = document.documentElement;
        const bgValue =
          typeof context.globals?.backgrounds === 'object'
            ? context.globals.backgrounds?.value
            : context.globals?.backgrounds;
        const isDarkBackground =
          bgValue === '#121212' ||
          bgValue === 'dark' ||
          bgValue === 'var(--color-surface-level-max)';

        root.classList.toggle('dark', Boolean(isDarkBackground));
      }, [context.globals?.backgrounds]);

      return React.createElement(
        DeviceProvider,
        null,
        React.createElement(
          NavigationProvider,
          null,
          React.createElement(
            'div',
            {
              className: `${quicksand.variable} ${notoSansKr.variable} ${gowunBatang.variable} ${kalam.variable} antialiased`,
              style: {
                padding: '2rem',
                fontFamily: 'var(--quicksand), var(--noto-sans-kr)',
              },
            },
            React.createElement(Story)
          )
        )
      );
    },
  ],
};

export default preview;
