export function SiteFooter() {
  return (
    <footer className="border-t border-surface-level-1 dark:border-surface-level-2">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-5 py-10 text-sm text-text-secondary md:flex-row md:items-center md:justify-between md:px-8">
        <p>© {new Date().getFullYear()} Portfolio. All rights reserved.</p>
        <p>Designed &amp; built with Next.js, React, TypeScript, Tailwind CSS.</p>
      </div>
    </footer>
  );
}
