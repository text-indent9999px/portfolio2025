import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import type { Project } from '@/data/portfolio';
import { cn } from '@/utils/cn';
import { Card } from '../../ui/Card';
import { Pill } from '../../ui/Pill';
import { CoverArt } from './CoverArt';
import { STATUS_COLOR, STATUS_LABEL } from './projectStatus';

type Variant = 'feature' | 'default' | 'compact';

interface ProjectCardProps {
  project: Project;
  variant?: Variant;
  priority?: boolean;
}

const CARD_CLASS =
  'group relative h-full hover:-translate-y-1 hover:border-surface-level-4 focus-within:border-surface-level-5';

function Meta({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="font-mono-label text-xs font-medium uppercase tracking-wider text-text-secondary">
        {project.category}
      </span>
      <Pill
        variant="soft"
        color={STATUS_COLOR[project.status]}
        size="xs"
      >
        {STATUS_LABEL[project.status]}
      </Pill>
    </div>
  );
}

/** 카드 전체를 클릭 영역으로 만드는 stretched link. 실제 <a>라 키보드·검색엔진·프리패치가 모두 동작한다. */
function TitleLink({
  project,
  className,
  children,
}: {
  project: Project;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        'rounded-sm after:absolute after:inset-0 after:z-10 after:rounded-lg focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-accent-500',
        className
      )}
    >
      {children}
    </Link>
  );
}

function Tags({ tags, limit }: { tags: string[]; limit: number }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="기술 태그">
      {tags.slice(0, limit).map(tag => (
        <li key={tag}>
          <Pill variant="outline" color="neutral" size="xs">
            {tag}
          </Pill>
        </li>
      ))}
    </ul>
  );
}

function Cta() {
  return (
    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-text-primary">
      케이스 스터디 보기
      <span
        aria-hidden
        className="transition-transform duration-300 group-hover:translate-x-1"
      >
        →
      </span>
    </span>
  );
}

export function ProjectCard({
  project,
  variant = 'default',
  priority,
}: ProjectCardProps) {
  if (variant === 'compact') {
    return (
      <Card
        appearance="outline"
        surfaceLevel={1}
        elevation={0}
        padding="md"
        thumbPosition="left"
        ratio="84px 1fr"
        gap="1.25rem"
        className={CARD_CLASS}
        slots={{
          thumb: project.cover ? (
            <div className="relative aspect-[9/19] w-full overflow-hidden rounded-lg border border-surface-level-2 bg-surface-level-2 dark:border-surface-level-3">
              <Image
                src={project.cover.src}
                alt={project.cover.alt}
                fill
                sizes="84px"
                quality={70}
                className="object-cover"
                style={{ objectPosition: project.cover.position ?? 'top' }}
              />
            </div>
          ) : null,
          body: (
            <div className="flex h-full flex-col gap-2">
              <Meta project={project} />
              <h3 className="text-lg font-bold leading-snug tracking-tight text-text-primary">
                <TitleLink project={project}>{project.title}</TitleLink>
              </h3>
              <p className="text-sm leading-relaxed text-text-secondary">
                {project.summary}
              </p>
              <div className="mt-auto pt-2">
                <Tags tags={project.stack} limit={3} />
              </div>
            </div>
          ),
        }}
      />
    );
  }

  if (variant === 'feature') {
    return (
      <Card
        appearance="outline"
        surfaceLevel={1}
        elevation={0}
        padding="md"
        className={CARD_CLASS}
        slots={{
          body: (
            <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr] lg:items-center lg:gap-10">
              <CoverArt
                project={project}
                priority={priority}
                sizes="(min-width: 1024px) 55vw, 100vw"
              />
              <div className="flex flex-col gap-4 lg:py-4 lg:pr-4">
                <Meta project={project} />
                <h3 className="text-2xl font-bold leading-tight tracking-tight text-text-primary md:text-3xl">
                  <TitleLink project={project}>{project.title}</TitleLink>
                </h3>
                <p className="leading-relaxed text-text-secondary md:text-lg">
                  {project.summary}
                </p>
                <Tags tags={project.tags} limit={5} />
                <div className="pt-2">
                  <Cta />
                </div>
              </div>
            </div>
          ),
        }}
      />
    );
  }

  return (
    <Card
      appearance="outline"
      surfaceLevel={1}
      elevation={0}
      padding="md"
      thumbPosition="top"
      gap="1.25rem"
      className={CARD_CLASS}
      slots={{
        thumb: <CoverArt project={project} sizes="(min-width: 1024px) 30vw, 100vw" />,
        body: (
          <div className="flex h-full flex-col gap-3">
            <Meta project={project} />
            <h3 className="text-xl font-bold leading-snug tracking-tight text-text-primary">
              <TitleLink project={project}>{project.title}</TitleLink>
            </h3>
            <p className="text-sm leading-relaxed text-text-secondary">
              {project.summary}
            </p>
            <div className="mt-auto pt-2">
              <Tags tags={project.tags} limit={3} />
            </div>
          </div>
        ),
        footer: <Cta />,
      }}
    />
  );
}
