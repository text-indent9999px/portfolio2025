'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import { NAV_ITEMS } from '@/data/portfolio';
import {
  useScrollDetection,
  useScrollSpy,
  useSectionNavigation,
} from '@/hooks';
import { cn } from '@/utils/cn';
import { Button, MenuButton } from '../../ui/Button';
import { ThemeToggle } from '../../ui/ThemeToggle';

const MOBILE_MENU_ID = 'mobile-menu';
const SECTION_IDS = NAV_ITEMS.map(item => item.id);

export function SiteHeader() {
  const pathname = usePathname();
  const goToSection = useSectionNavigation();
  const isScrolled = useScrollDetection(8);
  const activeId = useScrollSpy(pathname === '/' ? SECTION_IDS : []);
  const [menuState, setMenuState] = useState<{ open: boolean; path: string }>({
    open: false,
    path: pathname,
  });
  // 경로가 바뀌면 열려 있던 모바일 메뉴는 자동으로 닫힌 것으로 취급한다.
  const isMenuOpen = menuState.open && menuState.path === pathname;

  const toggleMenu = () =>
    setMenuState({ open: !isMenuOpen, path: pathname });
  const closeMenu = useCallback(
    () => setMenuState({ open: false, path: pathname }),
    [pathname]
  );

  useEffect(() => {
    if (!isMenuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMenu();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isMenuOpen, closeMenu]);

  const handleNavClick =
    (id: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey) return;
      event.preventDefault();
      closeMenu();
      goToSection(id);
    };

  const showSolidBackground = isScrolled || isMenuOpen;

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300',
        showSolidBackground
          ? 'bg-surface-level-min/80 shadow-[0_1px_0_0_var(--color-surface-level-1)] backdrop-blur-xl dark:shadow-[0_1px_0_0_var(--color-surface-level-2)]'
          : 'bg-transparent'
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 md:px-8">
        <Link
          href="/"
          aria-label="포트폴리오 홈"
          className="group flex items-center gap-2 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-500"
          onClick={closeMenu}
        >
          <Image
            src="/assets/images/logo.png"
            alt=""
            width={44}
            height={44}
            className="size-10 mix-blend-multiply transition-transform duration-300 group-hover:scale-105 dark:invert dark:mix-blend-screen"
            priority
          />
        </Link>

        <nav aria-label="주요 메뉴" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV_ITEMS.map(item => {
              const isActive = activeId === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`/#${item.id}`}
                    onClick={handleNavClick(item.id)}
                    aria-current={isActive ? 'location' : undefined}
                    className={cn(
                      'relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors',
                      'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500',
                      isActive
                        ? 'text-text-primary'
                        : 'text-text-secondary hover:text-text-primary'
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className={cn(
                        'absolute inset-x-3.5 -bottom-0.5 h-0.5 origin-left rounded-full bg-accent-500 transition-transform duration-300',
                        isActive ? 'scale-x-100' : 'scale-x-0'
                      )}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3 md:gap-4">
          <ThemeToggle size="sm" />
          <Button
            size="sm"
            rounded="pill"
            variant="solid"
            color="brand"
            className="hidden md:inline-flex"
            onClick={() => goToSection('contact')}
          >
            연락하기
          </Button>
          <MenuButton
            className="md:hidden"
            variant="minimal"
            size="sm"
            interactive={false}
            open={isMenuOpen}
            controlsId={MOBILE_MENU_ID}
            onClick={toggleMenu}
          />
        </div>
      </div>

      <div
        id={MOBILE_MENU_ID}
        hidden={!isMenuOpen}
        className="border-t border-surface-level-1 px-5 pb-6 pt-2 md:hidden dark:border-surface-level-2"
      >
        <ul className="flex flex-col">
          {NAV_ITEMS.map(item => (
            <li key={item.id}>
              <a
                href={`/#${item.id}`}
                onClick={handleNavClick(item.id)}
                className="flex items-center justify-between border-b border-surface-level-1 py-4 text-lg font-semibold text-text-primary dark:border-surface-level-2"
              >
                {item.label}
                <span aria-hidden className="text-text-tertiary">
                  →
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
