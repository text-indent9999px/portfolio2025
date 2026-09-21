import Image from 'next/image';
import type { Project } from '@/data/portfolio';
import { cn } from '@/utils/cn';

const ACCENT_BG: Record<NonNullable<Project['accent']>, string> = {
  gold: 'from-accent-100 to-accent-300 dark:from-accent-900 dark:to-accent-700',
  indigo:
    'from-primary-100 to-primary-300 dark:from-primary-900 dark:to-primary-700',
  sand: 'from-secondary-100 to-secondary-300 dark:from-secondary-900 dark:to-secondary-700',
  mist: 'from-info-100 to-info-300 dark:from-info-900 dark:to-info-700',
};

/** 페이지가 겹쳐 밀려나는 모습 — View Transition */
function TransitionArt() {
  return (
    <svg
      viewBox="0 0 320 200"
      className="h-full w-full text-text-primary"
      fill="none"
      aria-hidden
    >
      <rect x="46" y="52" width="140" height="104" rx="14" className="fill-surface-level-min/30 stroke-current opacity-40" strokeWidth="2" />
      <rect x="86" y="38" width="140" height="104" rx="14" className="fill-surface-level-min/50 stroke-current opacity-70" strokeWidth="2" />
      <rect x="126" y="24" width="140" height="104" rx="14" className="fill-surface-level-min stroke-current" strokeWidth="2.5" />
      <path d="M150 58h60M150 76h92M150 94h40" className="stroke-current" strokeWidth="3" strokeLinecap="round" opacity="0.55" />
      <path d="M52 176h216m0 0-14-10m14 10-14 10" className="stroke-current" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** 라이트/다크가 하나의 원 안에서 만나는 모습 — 테마 시스템 */
function ThemeArt() {
  return (
    <svg
      viewBox="0 0 320 200"
      className="h-full w-full"
      fill="none"
      aria-hidden
    >
      <defs>
        <clipPath id="theme-art-clip">
          <circle cx="160" cy="100" r="62" />
        </clipPath>
      </defs>
      <g clipPath="url(#theme-art-clip)">
        <rect x="98" y="38" width="62" height="124" fill="#fafaf9" />
        <rect x="160" y="38" width="62" height="124" fill="#111111" />
        <circle cx="130" cy="100" r="14" fill="#e9b335" />
        <path d="M190 84a18 18 0 1 0 0 32 14 14 0 0 1 0-32Z" fill="#fafaf9" />
      </g>
      <circle cx="160" cy="100" r="62" className="stroke-text-primary" strokeWidth="2.5" />
      <circle cx="160" cy="100" r="80" className="stroke-text-primary" strokeWidth="1.5" strokeDasharray="4 8" opacity="0.4" />
    </svg>
  );
}

interface CoverArtProps {
  project: Pick<Project, 'cover' | 'art' | 'accent' | 'title'>;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

/** 프로젝트 카드 상단 비주얼: 실제 화면 캡처가 있으면 캡처, 없으면 일러스트를 그린다. */
export function CoverArt({ project, className, sizes, priority }: CoverArtProps) {
  const { cover, art, accent = 'gold' } = project;

  return (
    <div
      className={cn(
        'relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-surface-level-2 bg-linear-to-br dark:border-surface-level-3',
        ACCENT_BG[accent],
        className
      )}
    >
      {cover ? (
        <Image
          src={cover.src}
          alt={cover.alt}
          fill
          sizes={sizes ?? '(min-width: 1024px) 40vw, 100vw'}
          quality={70}
          priority={priority}
          className={cn(
            'transition-transform duration-500 ease-out group-hover:scale-[1.03]',
            cover.fit === 'contain' ? 'object-contain' : 'object-cover'
          )}
          style={{ objectPosition: cover.position ?? 'center' }}
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center p-6 transition-transform duration-500 ease-out group-hover:scale-[1.04]">
          {art === 'transition' && <TransitionArt />}
          {art === 'theme' && <ThemeArt />}
        </div>
      )}
    </div>
  );
}
