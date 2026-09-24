/**
 * Footer component
 *
 * Simple, informational footer. Links to key sections and external club resources.
 * Update SOCIAL_LINKS and QUICK_LINKS when the club's actual URLs are confirmed.
 */

import Link from 'next/link';
import Logo from './Logo';

/** Update these with the club's actual social media URLs */
const SOCIAL_LINKS = [
  { href: 'https://instagram.com', label: 'Instagram' },
  { href: 'https://linkedin.com', label: 'LinkedIn' },
  // { href: 'https://twitter.com', label: 'Twitter' },
] as const;

const QUICK_LINKS = [
  { href: '/events', label: 'Events' },
  { href: '/workshops', label: 'Workshops' },
  { href: '/guides', label: 'Guides' },
  { href: '/queries', label: 'Ask a Query' },
  { href: '/join', label: 'Join the Club' },
] as const;

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Brand column */}
          <div className="space-y-4">
            <Link
              href="/"
              className="flex items-center gap-2"
              aria-label="AWS Cloud Club VIT Pune — home"
            >
              <Logo size={32} />
              <span className="font-bold text-gray-900 dark:text-white">AWS Cloud Club</span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              VIT Pune&apos;s official AWS Cloud Club — building cloud skills, one workshop at a
              time.
            </p>
          </div>

          {/* Quick links column */}
          <nav aria-label="Footer navigation">
            <h2 className="mb-4 text-sm font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400">
              Quick Links
            </h2>
            <ul className="space-y-2" role="list">
              {QUICK_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-gray-600 transition-colors hover:text-orange-600 dark:text-gray-400 dark:hover:text-orange-400"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social + subscribe column */}
          <div>
            <h2 className="mb-4 text-sm font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400">
              Connect
            </h2>
            <ul className="space-y-2" role="list">
              {SOCIAL_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-600 transition-colors hover:text-orange-600 dark:text-gray-400 dark:hover:text-orange-400"
                  >
                    {label} ↗
                  </a>
                </li>
              ))}
            </ul>
            {/* ICS calendar subscribe link — populated in Phase 2 */}
            <a
              href="/api/calendar.ics"
              className="mt-4 inline-block text-sm text-gray-600 transition-colors hover:text-orange-600 dark:text-gray-400 dark:hover:text-orange-400"
            >
              📅 Subscribe to events calendar
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-gray-200 pt-6 dark:border-gray-800">
          <p className="text-center text-xs text-gray-500 dark:text-gray-400">
            © {currentYear} AWS Cloud Club, VIT Pune. Built by the club team.
          </p>
        </div>
      </div>
    </footer>
  );
}
