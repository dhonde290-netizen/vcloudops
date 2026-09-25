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
  Ticket,
  UsersRound,
  MonitorPlay,
  Gift,
  CalendarRange,
  Presentation,
  BellRing,
  Compass,
  Rocket,
  MessageCircleQuestion,
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
    <div className="group relative overflow-hidden rounded-[2rem] border border-white/60 bg-gradient-to-br from-white/80 to-white/30 p-8 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:shadow-orange-500/20 sm:p-10 dark:border-white/10 dark:from-white/10 dark:to-white/5">
      {/* Decorative blurred blobs */}
      <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-orange-500/30 blur-[100px] transition-transform duration-1000 group-hover:scale-125 dark:bg-orange-500/20" />
      <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-blue-500/20 blur-[100px] transition-transform duration-1000 group-hover:scale-125 dark:bg-blue-500/10" />

      {/* Subtle Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] [mask-image:linear-gradient(to_bottom,white,transparent)] bg-[size:24px_24px] dark:bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)]" />

      {/* Inner highlight for 3D glassy edge */}
      <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-white/50 ring-inset dark:ring-white/10" />

      {/* Decorative Icon */}
      <div className="absolute -top-4 -right-4 text-orange-500 opacity-[0.03] transition-transform duration-700 group-hover:scale-110 group-hover:rotate-12 dark:opacity-10">
        <Calendar className="h-48 w-48" />
      </div>

      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <p className="flex items-center gap-2.5 text-sm font-bold tracking-widest text-orange-600 uppercase dark:text-orange-400">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-500 opacity-75"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-orange-500"></span>
            </span>
            Next Up
          </p>
          <span
            className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-bold shadow-sm backdrop-blur-md ${typeInfo.className}`}
          >
            {typeInfo.label}
          </span>
        </div>

        <h2 className="mt-auto mb-2 text-3xl leading-tight font-extrabold tracking-tight text-gray-900 drop-shadow-sm sm:text-4xl md:text-5xl dark:text-white">
          {event.title}
        </h2>

        <div className="mt-8 flex flex-col items-start gap-3 text-sm font-medium text-gray-700 sm:flex-row sm:items-center sm:gap-4 dark:text-gray-300">
          <div className="flex w-fit items-center gap-2.5 rounded-full border border-gray-200 bg-white/50 px-4 py-2 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:text-gray-200">
            <Calendar className="h-4 w-4 text-orange-500" />
            <span>{formatDateTime(event.date)}</span>
          </div>
          <div className="flex w-fit items-center gap-2.5 rounded-full border border-gray-200 bg-white/50 px-4 py-2 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:text-gray-200">
            <MapPin className="h-4 w-4 text-orange-500" />
            <span>{event.location}</span>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href={`/events/${event.slug}`}
            className="group/btn flex items-center gap-2 rounded-full border border-white/60 bg-gradient-to-b from-white/60 to-white/30 px-7 py-3 text-sm font-bold text-orange-600 shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/80 hover:bg-white/50 hover:shadow-xl focus:ring-2 focus:ring-orange-500 focus:outline-none dark:border-white/10 dark:from-white/10 dark:to-white/5 dark:text-orange-400 dark:hover:border-white/20 dark:hover:bg-white/10"
          >
            View details
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </Link>
          {event.registrationUrl && (
            <a
              href={event.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-7 py-3 text-sm font-bold text-white shadow-xl ring-1 shadow-orange-500/30 ring-white/20 transition-all duration-300 ring-inset hover:-translate-y-1 hover:shadow-2xl hover:shadow-orange-500/50 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:outline-none"
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

function LatestUpdatesTimeline({ updates }: { updates: ClubUpdate[] }) {
  if (updates.length === 0) {
    return (
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/60 bg-gradient-to-b from-white/60 to-white/30 p-8 shadow-2xl backdrop-blur-xl sm:p-10 dark:border-white/10 dark:from-white/10 dark:to-white/5">
        <p className="text-gray-500 dark:text-gray-400">No updates yet.</p>
      </div>
    );
  }

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-[2.5rem] border border-white/60 bg-gradient-to-br from-white/80 to-white/30 p-8 shadow-2xl backdrop-blur-xl sm:p-10 dark:border-white/10 dark:from-white/10 dark:to-white/5">
      {/* Decorative background glow */}
      <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-orange-500/10 blur-[80px] dark:bg-orange-500/5" />

      {/* Inner highlight */}
      <div className="pointer-events-none absolute inset-0 rounded-[2.5rem] ring-1 ring-white/50 ring-inset dark:ring-white/10" />

      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">
            Latest Updates
          </h2>
          <Link
            href="/updates"
            className="group flex items-center gap-1.5 rounded-full bg-white/50 px-4 py-2 text-sm font-bold text-orange-600 shadow-sm backdrop-blur-md transition-all hover:bg-white/80 hover:shadow-md dark:bg-white/5 dark:text-orange-400 dark:hover:bg-white/10"
          >
            See all
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="relative mt-2 flex-1">
          {/* Timeline Line */}
          <div className="absolute top-[32px] bottom-[24px] left-[11px] w-[3px] rounded-full bg-gradient-to-b from-orange-400 via-gray-200 to-transparent dark:via-gray-800" />

          <ul className="space-y-10">
            {updates.map((update) => {
              const typeInfo = UPDATE_TYPE_LABELS[update.type];
              const Icon = {
                winner: Trophy,
                challenge: Zap,
                workshop: GraduationCap,
                announcement: Megaphone,
              }[update.type];

              return (
                <li key={update.slug} className="group relative pl-12">
                  {/* Timeline Dot */}
                  <div className="absolute top-1 left-[0px] flex h-6 w-6 items-center justify-center rounded-full border-4 border-white bg-orange-500 shadow-md transition-all duration-300 group-hover:scale-125 group-hover:border-orange-100 group-hover:bg-orange-600 dark:border-black dark:group-hover:border-gray-800" />

                  <Link href={`/updates/${update.slug}`} className="block">
                    <div className="mb-2 flex flex-wrap items-center gap-3">
                      <span
                        className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase shadow-sm backdrop-blur-md ${typeInfo.className}`}
                      >
                        <Icon className="h-3 w-3" />
                        {typeInfo.label}
                      </span>
                      <span className="text-xs font-bold text-gray-400 dark:text-gray-500">
                        {formatDate(update.date)}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 transition-colors group-hover:text-orange-600 dark:text-white dark:group-hover:text-orange-400">
                      {update.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed font-medium text-gray-600 dark:text-gray-300">
                      {update.summary}
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
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
        <ScrollReveal className="h-full lg:col-span-3" delay={0.2}>
          <LatestUpdatesTimeline updates={latestUpdates} />
        </ScrollReveal>
      </section>

      {/* ── Stats bar ─────────────────────────────────────────────────── */}
      <section className="mt-20" aria-label="Club statistics">
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4" role="list">
          {[
            { value: allEvents.length.toString(), label: 'Events this year', icon: Ticket },
            { value: '80+', label: 'Active members', icon: UsersRound },
            { value: '3', label: 'Workshops held', icon: MonitorPlay },
            { value: '100%', label: 'Free for students', icon: Gift },
          ].map(({ value, label, icon: Icon }, i) => (
            <ScrollReveal key={label} delay={i * 0.1}>
              <li className="group relative overflow-hidden rounded-[1.5rem] border border-white/60 bg-gradient-to-b from-white/60 to-white/30 p-6 text-center shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-gray-900/5 dark:border-white/10 dark:from-white/10 dark:to-white/5 dark:hover:border-white/20 dark:hover:shadow-black/50">
                {/* Dynamic Hover Glow */}
                <div className="absolute inset-0 translate-y-[100%] bg-gradient-to-t from-orange-500/10 to-transparent opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 dark:from-orange-500/5" />

                {/* Inner highlight */}
                <div className="pointer-events-none absolute inset-0 rounded-[1.5rem] ring-1 ring-white/50 ring-inset dark:ring-white/10" />

                <div className="relative z-10 flex flex-col items-center justify-center">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/30 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                    <Icon className="h-7 w-7" />
                  </div>
                  <p className="text-4xl font-extrabold tracking-tight text-gray-900 drop-shadow-sm dark:text-white">
                    {value}
                  </p>
                  <p className="mt-2 text-sm font-bold text-gray-600 dark:text-gray-400">{label}</p>
                </div>
              </li>
            </ScrollReveal>
          ))}
        </ul>
      </section>

      {/* ── Quick links grid ──────────────────────────────────────────── */}
      <section className="mt-24" aria-labelledby="quicklinks-heading">
        <ScrollFade>
          <div className="mb-10 text-center">
            <h2
              id="quicklinks-heading"
              className="text-3xl font-extrabold tracking-tight text-gray-900 drop-shadow-sm dark:text-white"
            >
              Everything in one place
            </h2>
            <p className="mt-3 text-sm font-medium text-gray-600 dark:text-gray-400">
              Quick access to resources, events, and help.
            </p>
          </div>
        </ScrollFade>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3" role="list">
          {[
            {
              href: '/events',
              label: 'Events',
              desc: 'Meetups & challenges',
              icon: CalendarRange,
              color: 'from-orange-500 to-amber-500',
            },
            {
              href: '/workshops',
              label: 'Workshops',
              desc: 'Recordings & notes',
              icon: Presentation,
              color: 'from-blue-500 to-cyan-500',
            },
            {
              href: '/updates',
              label: 'Updates',
              desc: 'Winners & news',
              icon: BellRing,
              color: 'from-green-500 to-emerald-500',
            },
            {
              href: '/guides',
              label: 'Guides',
              desc: 'AWS setups',
              icon: Compass,
              color: 'from-purple-500 to-fuchsia-500',
            },
            {
              href: '/team',
              label: 'Team',
              desc: 'Meet the core',
              icon: Rocket,
              color: 'from-rose-500 to-pink-500',
            },
            {
              href: '/queries',
              label: 'Query',
              desc: 'Ask for help',
              icon: MessageCircleQuestion,
              color: 'from-indigo-500 to-violet-500',
            },
          ].map(({ href, label, desc, icon: Icon, color }, i) => (
            <ScrollReveal key={href} delay={i * 0.1}>
              <li>
                <Link
                  href={href}
                  className="group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-white/60 bg-gradient-to-b from-white/60 to-white/30 p-6 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-gray-900/5 dark:border-white/10 dark:from-white/10 dark:to-white/5 dark:hover:border-white/20 dark:hover:shadow-black/50"
                >
                  <div className="absolute inset-0 translate-y-[100%] bg-gradient-to-t from-white/40 to-transparent opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 dark:from-white/5" />

                  {/* Inner highlight */}
                  <div className="pointer-events-none absolute inset-0 rounded-[1.5rem] ring-1 ring-white/50 ring-inset dark:ring-white/10" />

                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div
                      className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${color} text-white shadow-lg shadow-black/10 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6`}
                    >
                      <Icon className="h-7 w-7" />
                    </div>
                    <span className="block text-lg font-extrabold text-gray-900 drop-shadow-sm dark:text-white">
                      {label}
                    </span>
                    <span className="mt-1.5 block text-sm font-semibold text-gray-600 dark:text-gray-400">
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
