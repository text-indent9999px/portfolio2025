import { ImageResponse } from 'next/og';

export const alt = 'Front-end Developer Portfolio';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** 기본 폰트에는 한글 글리프가 없어 영문으로만 구성한다. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: '#111111',
          color: '#fafaf9',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            fontSize: 28,
            color: '#acacac',
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: '#e9b335',
            }}
          />
          Portfolio
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div
            style={{
              fontSize: 92,
              fontWeight: 700,
              letterSpacing: '-0.04em',
              lineHeight: 1.05,
            }}
          >
            Front-end Developer
          </div>
          <div style={{ fontSize: 44, color: '#e9b335', fontWeight: 600 }}>
            Portfolio
          </div>
        </div>
        <div style={{ fontSize: 28, color: '#acacac' }}>
          React · Next.js · TypeScript
        </div>
      </div>
    ),
    size
  );
}
