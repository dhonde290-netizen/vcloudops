/**
 * Home page (/)
 *
 * Phase 1: Static placeholder that shows the navigation is wired up.
 * Phase 4: Replace with full hero, upcoming event card, latest updates,
 *           and quick-links grid as specified in BUILD_PLAN §4.1.
 */

import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'AWS Cloud Club — VIT Pune',
  description:
    'The official AWS Cloud Club at VIT Pune. Learn cloud computing, attend workshops, and build real-world skills with AWS.',
};

export default function HomePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="text-center" aria-labelledby="hero-heading">
        <h1
          id="hero-heading"
          className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl dark:text-white"
        >
          AWS Cloud Club
          <br />
          <span className="text-orange-500">VIT Pune</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-gray-600 dark:text-gray-400">
          Building cloud skills, one workshop at a time. — VIT Pune&apos;s official AWS student
          community.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/join"
            className="rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white shadow transition hover:bg-orange-600 focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            Join the Club
          </Link>
          <Link
            href="/events"
            className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:border-orange-400 hover:text-orange-600 focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:outline-none dark:border-gray-600 dark:text-gray-300"
          >
            Upcoming Events
          </Link>
        </div>
      </section>

      {/* ── Quick links grid ──────────────────────────────────────────── */}
      <section className="mt-20" aria-labelledby="quicklinks-heading">
        <h2
          id="quicklinks-heading"
          className="mb-8 text-center text-2xl font-bold text-gray-900 dark:text-white"
        >
          Explore
        </h2>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4" role="list">
          {[
            { href: '/events', label: '📅 Events', desc: 'Upcoming workshops & meetups' },
            { href: '/workshops', label: '🎓 Workshops', desc: 'Recordings, slides & notes' },
            { href: '/updates', label: '📣 Updates', desc: 'Winners, challenges & news' },
            { href: '/guides', label: '📖 Guides', desc: 'AWS setup & how-tos' },
            { href: '/team', label: '👥 Team', desc: 'Meet the core team' },
            { href: '/join', label: '🚀 Join', desc: 'Become a member' },
            { href: '/queries', label: '❓ Ask a Query', desc: 'Get help from the team' },
          ].map(({ href, label, desc }) => (
            <li key={href}>
              <Link
                href={href}
                className="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-orange-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-900 dark:hover:border-orange-600"
              >
                <span className="font-semibold text-gray-800 dark:text-gray-100">{label}</span>
                <span className="mt-1 text-sm text-gray-500 dark:text-gray-400">{desc}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Coming soon notice ────────────────────────────────────────── */}
      <p className="mt-16 text-center text-sm text-gray-400 dark:text-gray-600">
        🚧 Full homepage with events and updates — Phase 4. Site is live and routing works!
      </p>
    </div>
  );
}
