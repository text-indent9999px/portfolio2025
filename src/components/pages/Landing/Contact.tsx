import { CONTACT, SITE } from '@/data/portfolio';
import { Reveal } from '../../common/Reveal';
import { Heading } from '../../ui/Heading';
import { Backdrop } from './Backdrop';
import { ContactActions } from './ContactActions';

export function Contact() {
  return (
    <section
      id="contact"
      aria-label="연락처"
      className="relative isolate scroll-mt-20 md:scroll-mt-24 overflow-hidden py-10 md:py-16"
    >
      <Backdrop fade={false} />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 px-6 md:px-10"
      >
        <div className="border-t-2 border-surface-level-4 dark:border-surface-level-5" />
      </div>
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <Reveal>
          <p className="font-mono-label text-xs font-medium uppercase tracking-[0.18em] text-text-secondary">
            06 — Contact
          </p>
          <div className="mt-4">
            <Heading
              size={2}
              className="max-w-4xl text-[2.2rem] leading-[1.15] tracking-[-0.03em] text-text-primary md:text-7xl md:leading-[1.08]"
            >
              {CONTACT.headline}
            </Heading>
          </div>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-text-secondary md:text-xl">
            {CONTACT.description}
          </p>
          <a
            href={`mailto:${SITE.email}`}
            className="marker mt-8 inline-block rounded-sm text-xl font-semibold tracking-tight text-text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-500 md:text-3xl"
          >
            {SITE.email}
          </a>
          <ContactActions />
        </Reveal>
      </div>
    </section>
  );
}
