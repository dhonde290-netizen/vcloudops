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
import {
  Home,
  Calendar,
  Wrench,
  Megaphone,
  BookOpen,
  Users,
  HelpCircle,
  X,
  Menu,
} from 'lucide-react';

const NAV_LINKS = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/events', label: 'Events', icon: Calendar },
  { href: '/workshops', label: 'Workshops', icon: Wrench },
  { href: '/updates', label: 'Updates', icon: Megaphone },
  { href: '/guides', label: 'Guides', icon: BookOpen },
  { href: '/team', label: 'Team', icon: Users },
  { href: '/queries', label: 'Ask a Query', icon: HelpCircle },
] as const;

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="pointer-events-none sticky top-4 z-50 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
      <header
        className={`pointer-events-auto border border-white/40 bg-white/40 shadow-lg backdrop-blur-xl transition-all dark:border-white/10 dark:bg-black/40 ${
          menuOpen ? 'rounded-2xl' : 'rounded-full'
        }`}
      >
        <nav
          className="flex items-center justify-between px-4 py-3 sm:px-6"
          aria-label="Main navigation"
        >
          {/* Logo + site name */}
          <Link
            href="/"
            className="flex items-center gap-2 text-base font-bold text-gray-900 dark:text-white"
            aria-label="AWS Cloud Club VIT Pune — home"
          >
            <Logo size={24} />
            <span className="tracking-tight">AWS Cloud Club</span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 md:flex" role="list">
            {NAV_LINKS.map(({ href, label }) => {
              const isActive =
                href === '/'
                  ? pathname === '/'
                  : pathname === href || pathname.startsWith(href + '/');
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={[
                      'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-white/60 text-orange-600 shadow-sm dark:bg-white/10 dark:text-orange-400'
                        : 'text-gray-700 transition-colors hover:bg-white/50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-white/10 dark:hover:text-white',
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
            className="rounded-full p-2 text-gray-700 transition-colors hover:bg-white/50 md:hidden dark:text-gray-300 dark:hover:bg-white/10"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        {/* Mobile menu dropdown */}
        {menuOpen && (
          <div
            id="mobile-menu"
            className="border-t border-white/40 bg-transparent md:hidden dark:border-white/10"
          >
            <ul className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-3" role="list">
              {NAV_LINKS.map(({ href, label, icon: Icon }) => {
                const isActive =
                  href === '/'
                    ? pathname === '/'
                    : pathname === href || pathname.startsWith(href + '/');
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={[
                        'flex flex-col items-center justify-center gap-2 rounded-xl p-4 text-sm transition-all active:scale-95',
                        isActive
                          ? 'bg-orange-100/80 text-orange-600 shadow-sm dark:bg-orange-500/20 dark:text-orange-400'
                          : 'bg-white/40 text-gray-700 shadow-sm hover:bg-white/60 hover:text-gray-900 dark:bg-white/5 dark:text-gray-300 dark:hover:bg-white/10 dark:hover:text-white',
                      ].join(' ')}
                      aria-current={isActive ? 'page' : undefined}
                      onClick={() => setMenuOpen(false)}
                    >
                      <Icon className="h-6 w-6" strokeWidth={isActive ? 2.5 : 2} />
                      <span className="text-[11px] font-bold tracking-wider uppercase">
                        {label}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </header>
    </div>
  );
}
