import { config } from '@fortawesome/fontawesome-svg-core';
import type { Metadata, Viewport } from 'next';
import {
  Grandiflora_One,
  Noto_Sans_KR,
  Playwrite_AU_QLD,
  Quicksand,
} from 'next/font/google';
import { Header } from '../components/common/Navigation';
import LazyCustomCursor from '../components/effects/CursorEffect/LazyCustomCursor';
import { AppProviders } from '../components/providers';
import './globals.css';

// FontAwesome 설정
config.autoAddCss = false;
config.autoAddCss = true;

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
          ${notoSansKr.variable} ${grandiflora.variable} ${playWriteAu.variable} ${quicksand.variable} antialiased bg-surface-level-min`}
      >
        <AppProviders>
          <Header />
          {children}
          <LazyCustomCursor />
        </AppProviders>
      </body>
    </html>
  );
}
