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
import { motion, AnimatePresence } from 'framer-motion';
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
    <div className="pointer-events-none sticky top-6 z-50 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
      <header
        className={`pointer-events-auto border bg-white/70 backdrop-blur-2xl transition-all duration-500 dark:bg-gray-950/70 ${
          menuOpen
            ? 'rounded-3xl border-gray-200/50 shadow-2xl dark:border-gray-800/50 dark:shadow-orange-500/10'
            : 'rounded-full border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.6)] dark:border-gray-800/80 dark:shadow-[0_8px_30px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.05)]'
        }`}
      >
        <nav
          className="flex items-center justify-between px-4 py-3 sm:px-6"
          aria-label="Main navigation"
        >
          {/* Logo + site name */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 text-base font-extrabold tracking-tight text-gray-900 transition-colors dark:text-white"
            aria-label="AWS Cloud Club VIT Pune — home"
          >
            <motion.div
              whileHover={{ rotate: -10, scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <Logo size={26} />
            </motion.div>
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
                <li key={href} className="relative">
                  <Link
                    href={href}
                    className={[
                      'relative z-10 block px-4 py-2 text-sm font-semibold transition-colors',
                      isActive
                        ? 'text-orange-700 dark:text-orange-400'
                        : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white',
                    ].join(' ')}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {label}
                  </Link>
                  {/* Framer Motion animated active background pill */}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute inset-0 rounded-full bg-orange-100/50 shadow-sm ring-1 ring-orange-500/20 dark:bg-orange-500/10 dark:ring-orange-500/30"
                      initial={false}
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </li>
              );
            })}
          </ul>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition-colors hover:bg-gray-200 md:hidden dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X className="h-5 w-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu className="h-5 w-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </nav>

        {/* Mobile menu dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden border-t border-gray-200/50 bg-transparent md:hidden dark:border-gray-800/50"
            >
              <ul className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-3" role="list">
                {NAV_LINKS.map(({ href, label, icon: Icon }, i) => {
                  const isActive =
                    href === '/'
                      ? pathname === '/'
                      : pathname === href || pathname.startsWith(href + '/');
                  return (
                    <motion.li
                      key={href}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: i * 0.04 }}
                    >
                      <Link
                        href={href}
                        className={[
                          'flex flex-col items-center justify-center gap-2 rounded-2xl p-4 text-sm transition-all active:scale-95',
                          isActive
                            ? 'bg-orange-50 text-orange-600 shadow-[inset_0_0_0_1px_rgba(249,115,22,0.2)] dark:bg-orange-500/10 dark:text-orange-400 dark:shadow-[inset_0_0_0_1px_rgba(249,115,22,0.3)]'
                            : 'bg-gray-50/50 text-gray-600 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)] hover:bg-gray-100 hover:text-gray-900 dark:bg-gray-900/50 dark:text-gray-400 dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)] dark:hover:bg-gray-800 dark:hover:text-white',
                        ].join(' ')}
                        aria-current={isActive ? 'page' : undefined}
                        onClick={() => setMenuOpen(false)}
                      >
                        <Icon className="h-6 w-6" strokeWidth={isActive ? 2.5 : 2} />
                        <span className="text-[11px] font-bold tracking-wider uppercase">
                          {label}
                        </span>
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </div>
  );
}
