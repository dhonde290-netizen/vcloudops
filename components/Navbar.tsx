'use client';

/**
 * Navbar component
 *
 * Mobile-first. Uses a hamburger menu on small screens, full link row on md+.
 * All nav links and the logo are imported from a single config array so the team
 * only needs to edit one file to add or remove a nav item.
 */

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Logo from './Logo';

/** Edit this list to add / remove / rename nav links. */
const NAV_LINKS = [
  { href: '/events', label: 'Events' },
  { href: '/workshops', label: 'Workshops' },
  { href: '/updates', label: 'Updates' },
  { href: '/guides', label: 'Guides' },
  { href: '/team', label: 'Team' },
  { href: '/join', label: 'Join' },
  { href: '/queries', label: 'Ask a Query' },
] as const;

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-950/95">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        {/* Logo + site name */}
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-white"
          aria-label="AWS Cloud Club VIT Pune — home"
        >
          <Logo size={32} />
          <span className="hidden sm:block">AWS Cloud Club</span>
          <span className="sm:hidden">ACC</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex" role="list">
          {NAV_LINKS.map(({ href, label }) => {
            const isActive = pathname === href || pathname.startsWith(href + '/');
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={[
                    'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-orange-50 text-orange-600 dark:bg-orange-950 dark:text-orange-400'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white',
                  ].join(' ')}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="rounded-md p-2 text-gray-600 hover:bg-gray-100 md:hidden dark:text-gray-300 dark:hover:bg-gray-800"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? (
            // X icon
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            // Hamburger icon
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="border-t border-gray-200 bg-white md:hidden dark:border-gray-800 dark:bg-gray-950"
        >
          <ul className="space-y-1 px-4 py-3" role="list">
            {NAV_LINKS.map(({ href, label }) => {
              const isActive = pathname === href || pathname.startsWith(href + '/');
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={[
                      'block rounded-md px-3 py-2 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-orange-50 text-orange-600 dark:bg-orange-950 dark:text-orange-400'
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800',
                    ].join(' ')}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={() => setMenuOpen(false)}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}
