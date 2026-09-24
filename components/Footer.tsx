/**
 * Footer component
 *
 * Simple, informational footer. Links to key sections and external club resources.
 * Update SOCIAL_LINKS and QUICK_LINKS when the club's actual URLs are confirmed.
 */

import Link from 'next/link';
import Logo from './Logo';
import { CalendarPlus, ArrowUpRight } from 'lucide-react';

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
      <rect x="2" y="9" width="4" height="12"></rect>
      <circle cx="4" cy="4" r="2"></circle>
    </svg>
  );
}

/** Update these with the club's actual social media URLs */
const SOCIAL_LINKS = [
  { href: 'https://instagram.com', label: 'Instagram', icon: InstagramIcon },
  { href: 'https://linkedin.com', label: 'LinkedIn', icon: LinkedinIcon },
  // { href: 'https://twitter.com', label: 'Twitter' },
] as const;

const QUICK_LINKS = [
  { href: '/events', label: 'Events' },
  { href: '/workshops', label: 'Workshops' },
  { href: '/guides', label: 'Guides' },
  { href: '/queries', label: 'Ask a Query' },
] as const;

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-10 border-t border-gray-200 bg-white/50 backdrop-blur-xl dark:border-white/10 dark:bg-black/50">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {/* Brand column */}
          <div className="col-span-2 space-y-6">
            <Link
              href="/"
              className="group flex items-center gap-3 transition-opacity hover:opacity-90"
              aria-label="AWS Cloud Club VIT Pune — home"
            >
              <div className="rounded-xl bg-orange-100 p-2 shadow-inner transition-transform duration-300 group-hover:scale-110 dark:bg-orange-500/20">
                <Logo size={32} />
              </div>
              <span className="text-xl font-black tracking-tight text-gray-900 dark:text-white">
                AWS Cloud Club
              </span>
            </Link>
            <p className="max-w-sm text-sm leading-relaxed font-medium text-gray-500 dark:text-gray-400">
              VIT Pune&apos;s official AWS Cloud Club — building cloud skills, one workshop at a
              time.
            </p>
          </div>

          {/* Quick links column */}
          <nav className="col-span-1" aria-label="Footer navigation">
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
          <div className="col-span-1">
            <h2 className="mb-4 text-sm font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400">
              Connect
            </h2>
            <ul className="space-y-3" role="list">
              {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-orange-600 dark:text-gray-400 dark:hover:text-orange-400"
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span>{label}</span>
                    <ArrowUpRight className="hidden h-3 w-3 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 sm:block" />
                  </a>
                </li>
              ))}
            </ul>
            {/* ICS calendar subscribe link */}
            <a
              href="/api/calendar.ics"
              className="group mt-6 flex items-start gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-orange-600 sm:items-center dark:text-gray-400 dark:hover:text-orange-400"
            >
              <CalendarPlus className="mt-0.5 h-4 w-4 shrink-0 sm:mt-0" />
              <span className="leading-tight sm:leading-normal">Subscribe to events</span>
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/20 pt-4 sm:flex-row dark:border-white/10">
          <p className="text-center text-sm font-medium text-gray-500 sm:text-left dark:text-gray-400">
            © {currentYear} AWS Cloud Club, VIT Pune.
          </p>
          <p className="flex items-center gap-1.5 text-center text-sm font-medium text-gray-500 sm:text-left dark:text-gray-400">
            Built by the club team.
          </p>
        </div>
      </div>
    </footer>
  );
}
