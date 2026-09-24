/**
 * Home page (/)
 *
 * Shows: hero, next upcoming event card, latest 3 updates, quick-links grid.
 * All content is loaded from Markdown files via lib/content.ts.
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import {
  getAllEvents,
  getAllUpdates,
  splitEventsByTime,
  formatDateTime,
  formatDate,
  EVENT_TYPE_LABELS,
  UPDATE_TYPE_LABELS,
} from '@/lib/content';
import type { Event, ClubUpdate } from '@/lib/content';
import { Hero } from '@/components/ui/animated-hero';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { ScrollFade } from '@/components/ui/scroll-fade';
import {
  ArrowRight,
  ExternalLink,
  Calendar,
  MapPin,
  Trophy,
  Zap,
  GraduationCap,
  Megaphone,
  Users,
  BookOpen,
  Rocket,
  HelpCircle,
  Sparkles,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'AWS Cloud Club — VIT Pune',
  description:
    'The official AWS Cloud Club at VIT Pune. Learn cloud computing, attend workshops, and build real-world skills with AWS.',
};

export const dynamic = 'force-dynamic';

function UpcomingEventCard({ event }: { event: Event }) {
  const typeInfo = EVENT_TYPE_LABELS[event.type];
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/40 bg-white/40 p-8 shadow-2xl backdrop-blur-xl transition-all hover:border-white/60 hover:bg-white/50 dark:border-white/10 dark:bg-black/40 dark:hover:border-white/20 dark:hover:bg-black/50">
      {/* Decorative blurred blobs */}
      <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-orange-500/30 blur-3xl transition-transform duration-700 group-hover:scale-125 dark:bg-orange-600/20" />
      <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-amber-500/20 blur-3xl transition-transform duration-700 group-hover:scale-125 dark:bg-amber-600/10" />

      {/* Decorative Icon */}
      <div className="absolute top-6 right-6 text-orange-500 opacity-10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12 dark:opacity-20">
        <Calendar className="h-24 w-24" />
      </div>

      <div className="relative z-10">
        <p className="mb-2 text-sm font-bold tracking-widest text-orange-600 uppercase dark:text-orange-400">
          Next up
        </p>
        <span
          className={`inline-block rounded-full px-3 py-1 text-xs font-semibold shadow-sm ${typeInfo.className}`}
        >
          {typeInfo.label}
        </span>
        <h2 className="mt-4 text-3xl leading-tight font-extrabold tracking-tight text-gray-900 dark:text-white">
          {event.title}
        </h2>

        <div className="mt-5 flex flex-col gap-3 text-sm font-medium text-gray-700 sm:flex-row sm:items-center sm:gap-6 dark:text-gray-300">
          <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/50 px-3 py-1.5 backdrop-blur-md dark:border-white/5 dark:bg-black/30">
            <Calendar className="h-4 w-4 text-orange-500" />
            <span>{formatDateTime(event.date)}</span>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/50 px-3 py-1.5 backdrop-blur-md dark:border-white/5 dark:bg-black/30">
            <MapPin className="h-4 w-4 text-orange-500" />
            <span>{event.location}</span>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href={`/events/${event.slug}`}
            className="flex items-center gap-2 rounded-full border border-orange-200 bg-white/50 px-6 py-2.5 text-sm font-semibold text-orange-600 shadow-sm backdrop-blur-md transition-all hover:bg-orange-50 focus:ring-2 focus:ring-orange-500 focus:outline-none dark:border-orange-800 dark:bg-black/50 dark:text-orange-400 dark:hover:bg-gray-800"
          >
            View details
            <ArrowRight className="h-4 w-4" />
          </Link>
          {event.registrationUrl && (
            <a
              href={event.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full bg-orange-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-orange-700 hover:shadow-lg focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:outline-none"
            >
              Register
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function UpdateCard({ update }: { update: ClubUpdate }) {
  const typeInfo = UPDATE_TYPE_LABELS[update.type];
  const Icon = {
    winner: Trophy,
    challenge: Zap,
    workshop: GraduationCap,
    announcement: Megaphone,
  }[update.type];

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/40 bg-white/40 p-5 shadow-lg backdrop-blur-lg transition-all hover:-translate-y-1 hover:border-white/60 hover:bg-white/50 dark:border-white/10 dark:bg-black/40 dark:hover:border-white/20 dark:hover:bg-black/50">
      <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-[100%]" />

      <div className="relative z-10">
        <div className="flex items-center gap-3">
          <span
            className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold shadow-sm ${typeInfo.className}`}
          >
            <Icon className="h-3.5 w-3.5" />
            {typeInfo.label}
          </span>
          <span className="ml-auto rounded-full border border-white/20 bg-white/50 px-2.5 py-1 text-xs font-medium text-gray-500 backdrop-blur-md dark:border-white/5 dark:bg-black/30 dark:text-gray-400">
            {formatDate(update.date)}
          </span>
        </div>
        <h3 className="mt-3 text-lg font-bold text-gray-900 transition-colors group-hover:text-orange-600 dark:text-white dark:group-hover:text-orange-400">
          <Link href={`/updates/${update.slug}`} className="before:absolute before:inset-0">
            {update.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-gray-600 dark:text-gray-300">
          {update.summary}
        </p>
      </div>
    </article>
  );
}

export default function HomePage() {
  const allEvents = getAllEvents();
  const { upcoming } = splitEventsByTime(allEvents);
  const nextEvent = upcoming[0] ?? null;

  const latestUpdates = getAllUpdates().slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <Hero />

      {/* ── Two-column: next event + latest updates ────────────────────── */}
      <section
        className="mt-20 grid grid-cols-1 gap-8 lg:grid-cols-5"
        aria-label="Event and updates highlights"
      >
        {/* Next event card — wider column */}
        <ScrollReveal className="lg:col-span-2">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Next Event</h2>
          {nextEvent ? (
            <UpcomingEventCard event={nextEvent} />
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-300 p-6 text-center dark:border-gray-700">
              <p className="text-gray-500 dark:text-gray-400">No upcoming events scheduled yet.</p>
              <Link
                href="/events"
                className="mt-2 block text-sm text-orange-600 hover:underline dark:text-orange-400"
              >
                View all events →
              </Link>
            </div>
          )}
        </ScrollReveal>

        {/* Latest updates */}
        <ScrollReveal className="lg:col-span-3" delay={0.2}>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Latest Updates</h2>
            <Link
              href="/updates"
              className="text-sm text-orange-600 hover:underline dark:text-orange-400"
            >
              See all →
            </Link>
          </div>
          {latestUpdates.length > 0 ? (
            <ul className="space-y-3" role="list">
              {latestUpdates.map((u, i) => (
                <ScrollReveal key={u.slug} delay={0.2 + i * 0.1}>
                  <li>
                    <UpdateCard update={u} />
                  </li>
                </ScrollReveal>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No updates yet.</p>
          )}
        </ScrollReveal>
      </section>

      {/* ── Stats bar ─────────────────────────────────────────────────── */}
      <section className="mt-20" aria-label="Club statistics">
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4" role="list">
          {[
            { value: allEvents.length.toString(), label: 'Events this year', icon: Calendar },
            { value: '80+', label: 'Active members', icon: Users },
            { value: '3', label: 'Workshops held', icon: GraduationCap },
            { value: '100%', label: 'Free for students', icon: Sparkles },
          ].map(({ value, label, icon: Icon }, i) => (
            <ScrollReveal key={label} delay={i * 0.1}>
              <li className="group relative overflow-hidden rounded-2xl border border-white/40 bg-white/40 p-6 text-center shadow-lg backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-white/60 hover:bg-white/50 dark:border-white/10 dark:bg-black/40 dark:hover:border-white/20 dark:hover:bg-black/50">
                <div className="relative z-10 flex flex-col items-center justify-center">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400">
                    <Icon className="h-6 w-6" />
                  </div>
                  <p className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                    {value}
                  </p>
                  <p className="mt-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                    {label}
                  </p>
                </div>
              </li>
            </ScrollReveal>
          ))}
        </ul>
      </section>

      {/* ── Quick links grid ──────────────────────────────────────────── */}
      <section className="mt-20" aria-labelledby="quicklinks-heading">
        <ScrollFade>
          <h2
            id="quicklinks-heading"
            className="mb-8 text-center text-2xl font-bold text-gray-900 dark:text-white"
          >
            Everything in one place
          </h2>
        </ScrollFade>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4" role="list">
          {[
            {
              href: '/events',
              label: 'Events',
              desc: 'Upcoming workshops & meetups',
              icon: Calendar,
            },
            {
              href: '/workshops',
              label: 'Workshops',
              desc: 'Recordings, slides & notes',
              icon: GraduationCap,
            },
            {
              href: '/updates',
              label: 'Updates',
              desc: 'Winners, challenges & news',
              icon: Megaphone,
            },
            { href: '/guides', label: 'Guides', desc: 'AWS setup how-tos', icon: BookOpen },
            { href: '/team', label: 'Team', desc: 'Meet the core team', icon: Users },
            {
              href: '/queries',
              label: 'Ask a Query',
              desc: 'Get help from the team',
              icon: HelpCircle,
            },
          ].map(({ href, label, desc, icon: Icon }, i) => (
            <ScrollReveal key={href} delay={i * 0.1}>
              <li>
                <Link
                  href={href}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/40 bg-white/40 p-6 shadow-lg backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-white/60 hover:bg-white/50 dark:border-white/10 dark:bg-black/40 dark:hover:border-white/20 dark:hover:bg-black/50"
                >
                  <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-[100%]" />
                  <div className="relative z-10">
                    <div className="mb-4 inline-flex rounded-lg bg-orange-100 p-2.5 text-orange-600 transition-colors group-hover:bg-orange-600 group-hover:text-white dark:bg-orange-500/20 dark:text-orange-400 dark:group-hover:bg-orange-500 dark:group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="block text-lg font-bold text-gray-900 dark:text-white">
                      {label}
                    </span>
                    <span className="mt-2 block text-sm font-medium text-gray-600 dark:text-gray-400">
                      {desc}
                    </span>
                  </div>
                </Link>
              </li>
            </ScrollReveal>
          ))}
        </ul>
      </section>
    </div>
  );
}
