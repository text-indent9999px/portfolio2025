export function SiteFooter() {
  return (
    <footer>
      <div className="px-6 md:px-10">
        <div className="border-t-2 border-surface-level-4 dark:border-surface-level-5" />
      </div>
      <div className="flex w-full flex-col gap-2 px-6 py-10 text-sm text-text-secondary md:flex-row md:items-center md:justify-between md:px-10">
        <p>© {new Date().getFullYear()} Portfolio. All rights reserved.</p>
        <p>Designed &amp; built with Next.js, React, TypeScript, Tailwind CSS.</p>
      </div>
    </footer>
  );
}
