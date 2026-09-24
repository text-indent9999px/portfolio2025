import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import type { Metadata, Viewport } from 'next';
import { Noto_Sans_KR, Quicksand } from 'next/font/google';
import { SiteFooter } from '../components/common/SiteFooter';
import { SiteHeader } from '../components/common/SiteHeader';
import { PageTransition } from '../components/common/PageTransition';
import { AppProviders } from '../components/providers';
import { SITE } from '../data/portfolio';
import { THEME_STORAGE_KEY } from '../utils/themeDetector.constants';
import './globals.css';

// 스타일은 위에서 직접 불러오므로 런타임 주입을 끈다.
config.autoAddCss = false;

// 기본 폰트: 라틴은 Quicksand, 한글은 Noto Sans KR. 두 폰트 모두 가변 폰트라 굵기별 파일이 따로 없다.
const quicksand = Quicksand({
  variable: '--quicksand',
  subsets: ['latin'],
  display: 'swap',
});

const notoSansKr = Noto_Sans_KR({
  variable: '--noto-sans-kr',
  subsets: ['latin'],
  display: 'swap',
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.title, template: `%s | ${SITE.title}` },
  description: SITE.description,
  applicationName: SITE.title,
  authors: [{ url: SITE.github }],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: SITE.title,
    title: SITE.title,
    description: SITE.description,
  },
  twitter: { card: 'summary_large_image' },
  robots: SITE.indexable
    ? { index: true, follow: true }
    : { index: false, follow: false },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafaf9' },
    { media: '(prefers-color-scheme: dark)', color: '#111111' },
  ],
};

/** 첫 페인트 전에 저장된 테마(없으면 시스템 설정)를 적용해 깜빡임을 막는다. */
const themeInitScript = `(function(){try{var s=localStorage.getItem('${THEME_STORAGE_KEY}');var d=s==='dark'||((s!=='light')&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d);}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${quicksand.variable} ${notoSansKr.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-dvh bg-surface-level-min text-text-primary antialiased">
        <AppProviders>
          <a href="#main-content" className="skip-link">
            본문으로 건너뛰기
          </a>
          {/* 페이지 전체를 감싸는 테두리. 뷰포트 끝까지는 안 닿게 최소 여백을 주고,
              1320px부터는 그 이상 넓어지지 않고 가운데 정렬된다 — 폭 제한은 이
              바깥 껍데기에서 한 번만 걸고, 안쪽 콘텐츠는 이 너비를 그대로 채운다
              (각 섹션 안에서 max-w-6xl로 한 번 더 좁히지 않는다). */}
          <div className="px-3 md:px-5">
            <div className="mx-auto my-3 max-w-[1320px] border-2 border-surface-level-4 dark:border-surface-level-5 md:my-5">
              <SiteHeader />
              <main id="main-content">
                <PageTransition>{children}</PageTransition>
              </main>
              <SiteFooter />
            </div>
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
