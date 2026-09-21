import Link from 'next/link';

export default function NotFound() {
  return (
    <section
      aria-label="페이지를 찾을 수 없음"
      className="mx-auto flex min-h-[70dvh] w-full max-w-6xl flex-col items-start justify-center px-5 pb-16 pt-32 md:px-8"
    >
      <p className="font-mono-label text-xs font-medium uppercase tracking-[0.18em] text-text-secondary">
        Error 404
      </p>
      <h1 className="mt-4 text-5xl font-bold tracking-[-0.03em] text-text-primary md:text-7xl">
        페이지를 찾을 수 없습니다.
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-text-secondary">
        주소가 바뀌었거나 삭제된 페이지입니다. 홈에서 프로젝트와 경력을 확인해
        보세요.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex items-center gap-2 rounded-full bg-primary-900 px-6 py-3 font-semibold text-primary-50 transition-colors hover:bg-primary-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-500 dark:bg-primary-300 dark:text-primary-900 dark:hover:bg-primary-200"
      >
        홈으로 돌아가기
        <span aria-hidden>→</span>
      </Link>
    </section>
  );
}
