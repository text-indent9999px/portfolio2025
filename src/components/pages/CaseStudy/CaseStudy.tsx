import Link from 'next/link';
import type { ReactNode } from 'react';
import { getAdjacentProjects, type Project } from '@/data/portfolio';
import { Reveal } from '../../common/Reveal';
import CustomButton from '../../ui/Button';
import { CodeHighlight } from '../../ui/CodeHighlight';
import { Image } from '../../ui/Image';
import { Pill } from '../../ui/Pill';
import { Video } from '../../ui/Video';
import { Backdrop } from '../Landing/Backdrop';
import { CoverArt } from '../Landing/CoverArt';
import { STATUS_COLOR, STATUS_LABEL } from '../Landing/projectStatus';

interface CaseSectionProps {
  index: number;
  label: string;
  children: ReactNode;
}

/** 좌측에 번호·라벨, 우측에 본문을 두는 케이스 스터디 공통 섹션. */
function CaseSection({ index, label, children }: CaseSectionProps) {
  return (
    <Reveal
      as="section"
      className="grid gap-6 border-t border-surface-level-3 py-12 md:py-16 lg:grid-cols-[200px_1fr] lg:gap-16"
    >
      <div className="lg:sticky lg:top-28 lg:self-start">
        <p className="font-mono-label text-xs font-medium uppercase tracking-[0.18em] text-text-secondary">
          {String(index).padStart(2, '0')}
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-text-primary">
          {label}
        </h2>
      </div>
      <div className="min-w-0">{children}</div>
    </Reveal>
  );
}

function MetaItem({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <dt className="font-mono-label text-xs uppercase tracking-wider text-text-secondary">
        {label}
      </dt>
      <dd className="mt-1.5 font-medium leading-snug text-text-primary">
        {children}
      </dd>
    </div>
  );
}

export function CaseStudy({ project }: { project: Project }) {
  const { next } = getAdjacentProjects(project.slug);
  const hasVisual = Boolean(project.cover || project.art);
  const mediaLabel = project.videos?.length ? '시연' : '화면';
  // 세로형(앱) 화면은 본문 칼럼이 아니라 전체 폭에 4열로 보여 준다.
  const isPortraitGallery = Boolean(
    project.images?.some(image => image.height > image.width)
  );
  let section = 0;
  const nextIndex = () => ++section;

  return (
    <article className="relative isolate">
      <Backdrop />

      <div className="mx-auto w-full max-w-6xl px-5 pb-24 pt-28 md:px-8 md:pt-36">
        <Link
          href="/#work"
          className="group inline-flex items-center gap-2 rounded-sm text-sm font-medium text-text-secondary transition-colors hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-500"
        >
          <span
            aria-hidden
            className="transition-transform duration-300 group-hover:-translate-x-1"
          >
            ←
          </span>
          프로젝트 목록
        </Link>

        <header className="mt-8 max-w-4xl">
          <div className="flex flex-wrap items-center gap-2.5">
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
          <h1 className="mt-4 text-balance text-[2.2rem] font-bold leading-[1.15] tracking-[-0.03em] text-text-primary md:text-6xl md:leading-[1.1]">
            {project.title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-text-secondary md:text-xl md:leading-relaxed">
            {project.summary}
          </p>
          {project.proof && (
            <p className="mt-5 text-base font-medium text-text-primary">
              <span className="marker">{project.proof}</span>
            </p>
          )}
          {project.links && project.links.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-3">
              {project.links.map((link, index) => (
                <CustomButton
                  key={link.href}
                  size="lg"
                  rounded="pill"
                  variant={index === 0 ? 'solid' : 'outline'}
                  color="brand"
                  href={link.href}
                >
                  {link.label} ↗
                </CustomButton>
              ))}
            </div>
          )}
        </header>

        <dl className="mt-12 grid gap-6 border-y border-surface-level-3 py-7 sm:grid-cols-2 lg:grid-cols-[1fr_1.4fr_1fr_0.7fr]">
          <MetaItem label="역할">{project.role}</MetaItem>
          <MetaItem label="기술 스택">{project.stack.join(' · ')}</MetaItem>
          {project.period && <MetaItem label="기간">{project.period}</MetaItem>}
          <MetaItem label="상태">{STATUS_LABEL[project.status]}</MetaItem>
        </dl>

        {project.stats && project.stats.length > 0 && (
          <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3">
            {project.stats.map(stat => (
              <li key={stat.label}>
                <p className="text-4xl font-bold tracking-tight text-text-primary tabular-nums md:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm leading-snug text-text-secondary">
                  {stat.label}
                </p>
              </li>
            ))}
          </ul>
        )}

        {hasVisual && (
          <div className="mt-10">
            <CoverArt
              project={project}
              priority
              sizes="(min-width: 1152px) 1088px, 100vw"
              className="aspect-[16/8] rounded-2xl"
            />
          </div>
        )}

        <div className="mt-6">
          <CaseSection index={nextIndex()} label="배경">
            <div className="max-w-3xl space-y-5 text-base leading-relaxed text-text-secondary md:text-lg md:leading-relaxed">
              {project.background.map(paragraph => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </CaseSection>

          <CaseSection index={nextIndex()} label="구현">
            <ul className="max-w-3xl space-y-4">
              {project.features.map(feature => (
                <li key={feature} className="flex gap-3.5 leading-relaxed">
                  <span
                    aria-hidden
                    className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent-500"
                  />
                  <span className="text-text-primary">{feature}</span>
                </li>
              ))}
            </ul>
          </CaseSection>

          <CaseSection index={nextIndex()} label="문제와 해결">
            <ol className="space-y-5">
              {project.challenges.map((item, index) => (
                <li
                  key={item.problem}
                  className="rounded-2xl border border-surface-level-2 bg-surface-level-1 p-6 dark:border-surface-level-3 md:p-8"
                >
                  <p className="font-mono-label text-xs font-medium uppercase tracking-wider text-text-secondary">
                    Problem {String(index + 1).padStart(2, '0')}
                  </p>
                  <p className="mt-2 text-lg font-semibold leading-snug text-text-primary">
                    {item.problem}
                  </p>
                  <p className="font-mono-label mt-6 text-xs font-medium uppercase tracking-wider text-text-secondary">
                    Solution
                  </p>
                  <p className="mt-2 border-l-2 border-accent-500 pl-4 leading-relaxed text-text-secondary">
                    {item.solution}
                  </p>
                </li>
              ))}
            </ol>
          </CaseSection>

          {Boolean(project.videos?.length || project.images?.length) &&
            (isPortraitGallery ? (
              <Reveal
                as="section"
                className="border-t border-surface-level-3 py-12 md:py-16"
              >
                <p className="font-mono-label text-xs font-medium uppercase tracking-[0.18em] text-text-secondary">
                  {String(nextIndex()).padStart(2, '0')}
                </p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-text-primary">
                  {mediaLabel}
                </h2>
                {project.mediaNote && (
                  <p className="mt-3 max-w-3xl text-sm text-text-secondary">
                    {project.mediaNote}
                  </p>
                )}
                <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
                  {project.images?.map((image, index) => (
                    <Image
                      key={image.path}
                      src={image.path}
                      alt={image.title}
                      title={image.title}
                      description={image.description}
                      contextTitle={project.title}
                      index={index + 1}
                      width={image.width}
                      height={image.height}
                      className="p-3"
                    />
                  ))}
                </div>
              </Reveal>
            ) : (
              <CaseSection index={nextIndex()} label={mediaLabel}>
                {project.mediaNote && (
                  <p className="mb-6 text-sm text-text-secondary">
                    {project.mediaNote}
                  </p>
                )}
                {project.videos && project.videos.length > 0 && (
                  <div className="grid gap-6 xl:grid-cols-2">
                    {project.videos.map((video, index) => (
                      <Video
                        key={video.path}
                        src={video.path}
                        title={video.title}
                        description={video.description}
                        contextTitle={project.title}
                        index={index + 1}
                        width={video.width}
                        height={video.height}
                        thumbnail={video.thumbnail}
                      />
                    ))}
                  </div>
                )}
                {project.images && project.images.length > 0 && (
                  <div className="grid gap-6 xl:grid-cols-2">
                    {project.images.map((image, index) => (
                      <Image
                        key={image.path}
                        src={image.path}
                        alt={image.title}
                        title={image.title}
                        description={image.description}
                        contextTitle={project.title}
                        index={index + 1}
                        width={image.width}
                        height={image.height}
                      />
                    ))}
                  </div>
                )}
              </CaseSection>
            ))}

          {project.code && project.code.length > 0 && (
            <CaseSection index={nextIndex()} label="핵심 코드">
              <p className="mb-6 max-w-3xl text-sm text-text-secondary">
                이 포트폴리오 저장소의 실제 소스입니다. 항목을 열면 코드를
                불러옵니다.
              </p>
              <ul className="space-y-3">
                {project.code.map(item => (
                  <li
                    key={item.file}
                    className="rounded-2xl border border-surface-level-2 bg-surface-level-1 dark:border-surface-level-3"
                  >
                    <details className="group">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-5 py-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500 md:px-6 [&::-webkit-details-marker]:hidden">
                        <span>
                          <span className="block font-semibold text-text-primary">
                            {item.title}
                          </span>
                          <span className="font-mono-label mt-0.5 block text-xs text-text-secondary">
                            {item.file}
                          </span>
                        </span>
                        <span
                          aria-hidden
                          className="grid size-7 shrink-0 place-items-center rounded-full border border-surface-level-4 text-lg leading-none text-text-secondary transition-transform duration-300 group-open:rotate-45"
                        >
                          +
                        </span>
                      </summary>
                      <div className="border-t border-surface-level-2 px-5 pb-5 pt-4 dark:border-surface-level-3 md:px-6">
                        <p className="mb-4 text-sm leading-relaxed text-text-secondary">
                          {item.description}
                        </p>
                        <CodeHighlight
                          filename={item.file}
                          language={item.language}
                        />
                      </div>
                    </details>
                  </li>
                ))}
              </ul>
            </CaseSection>
          )}
        </div>

        {next && next.slug !== project.slug && (
          <nav aria-label="다음 프로젝트" className="mt-8">
            <Link
              href={`/projects/${next.slug}`}
              className="group block rounded-3xl border border-surface-level-2 bg-surface-level-1 p-8 transition-colors hover:border-surface-level-5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-500 dark:border-surface-level-3 md:p-12"
            >
              <span className="font-mono-label text-xs font-medium uppercase tracking-[0.18em] text-text-secondary">
                Next project
              </span>
              <span className="mt-3 flex items-center justify-between gap-6">
                <span className="text-2xl font-bold leading-snug tracking-tight text-text-primary md:text-4xl">
                  {next.title}
                </span>
                <span
                  aria-hidden
                  className="text-3xl text-text-primary transition-transform duration-300 group-hover:translate-x-2"
                >
                  →
                </span>
              </span>
            </Link>
          </nav>
        )}
      </div>
    </article>
  );
}
