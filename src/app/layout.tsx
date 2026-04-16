import { config } from '@fortawesome/fontawesome-svg-core';
import type { Metadata, Viewport } from 'next';
import { Gowun_Batang, Kalam, Noto_Sans_KR, Quicksand } from 'next/font/google';
import { Suspense } from 'react';
import { Header } from '../components/common/Navigation';
import LazyCustomCursor from '../components/effects/CursorEffect/LazyCustomCursor';
import { AppProviders } from '../components/providers';
import './globals.css';

// FontAwesome 설정
config.autoAddCss = false;
config.autoAddCss = true;

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

export const metadata: Metadata = {
  title: '김남영 | 프론트엔드 개발자',
  description: '프론트엔드 개발 포트폴리오입니다.',
  robots: {
    index: false,
    follow: false,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      suppressHydrationWarning
      className="w-full h-full overflow-y-hidden"
    >
      <body
        data-scroll-container="mobile"
        className={`
          w-full h-full overflow-y-auto 
          xl:overflow-y-hidden no-scrollbar
          ${notoSansKr.variable} ${gowunBatang.variable}
          ${quicksand.variable} ${kalam.variable} antialiased bg-surface-level-min`}
      >
        <AppProviders>
          <Suspense fallback={null}>
            <Header />
            <main id="main-content" className="w-full h-full">
              {children}
            </main>
          </Suspense>
          <LazyCustomCursor />
        </AppProviders>
      </body>
    </html>
  );
}
