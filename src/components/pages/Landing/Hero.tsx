import type { CSSProperties } from 'react';
import { HERO, HERO_FACTS } from '@/data/portfolio';
import { Backdrop } from './Backdrop';
import { HeroActions } from './HeroActions';

const delay = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties;

export function Hero() {
  return (
    <section id="top" aria-label="소개" className="relative isolate">
      <Backdrop />
      <div className="mx-auto w-full max-w-6xl px-5 pb-20 pt-36 md:px-8 md:pb-28 md:pt-48">
        <p
          className="hero-in font-mono-label inline-flex items-center gap-2.5 rounded-full border border-surface-level-2 bg-surface-level-min/70 px-3.5 py-1.5 text-xs font-medium text-text-secondary backdrop-blur dark:border-surface-level-3"
          style={delay(0)}
        >
          <span
            aria-hidden
            className="motion-safe-anim size-2 rounded-full bg-success-500 animate-[pulse-dot_2.4s_ease-in-out_infinite]"
          />
          {HERO.eyebrow}
        </p>

        <h1
          className="hero-in mt-7 max-w-5xl text-[2.15rem] font-bold leading-[1.22] tracking-[-0.03em] text-text-primary sm:text-6xl sm:leading-[1.14] xl:text-7xl xl:leading-[1.1]"
          style={delay(60)}
        >
          {HERO.headline.map((line, lineIndex) => (
            <span key={lineIndex} className="block">
              {line.map(part =>
                'mark' in part && part.mark ? (
                  <span key={part.text} className="marker">
                    {part.text}
                  </span>
                ) : (
                  part.text
                )
              )}
            </span>
          ))}
        </h1>

        <p
          className="hero-in mt-7 max-w-2xl text-base leading-relaxed text-text-secondary md:text-xl md:leading-relaxed"
          style={delay(120)}
        >
          {HERO.description}
        </p>

        <HeroActions />

        <dl
          className="hero-in mt-16 grid max-w-3xl grid-cols-1 gap-6 border-t border-surface-level-2 pt-8 sm:grid-cols-3 dark:border-surface-level-3"
          style={delay(240)}
        >
          {HERO_FACTS.map(fact => (
            <div key={fact.label}>
              <dt className="font-mono-label text-xs uppercase tracking-wider text-text-secondary">
                {fact.label}
              </dt>
              <dd className="mt-1.5 text-xl font-semibold tracking-tight text-text-primary">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
