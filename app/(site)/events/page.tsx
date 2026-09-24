import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllEvents, splitEventsByTime, formatDateTime, EVENT_TYPE_LABELS } from '@/lib/content';
import type { Event } from '@/lib/content';
import { Calendar } from '@/components/Calendar';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { Calendar as CalendarIcon, ArrowRight, ExternalLink, MapPin } from 'lucide-react';
export const metadata: Metadata = {
  title: 'Events',
  description:
    'Upcoming and past events from AWS Cloud Club VIT Pune — workshops, sessions, challenges, and meetups.',
};

// This page is dynamically rendered so it always shows fresh event data.
export const dynamic = 'force-dynamic';

function EventCard({ event }: { event: Event }) {
  const typeInfo = EVENT_TYPE_LABELS[event.type];

  return (
    <article className="group rounded-2xl border border-white/40 bg-white/40 p-6 shadow-lg backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-white/60 hover:bg-white/50 dark:border-white/10 dark:bg-black/40 dark:hover:border-white/20 dark:hover:bg-black/50">
      {/* Type badge */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span
          className={`rounded-full px-3 py-1 text-[10px] font-bold tracking-wider uppercase ${typeInfo.className}`}
        >
          {typeInfo.label}
        </span>
        {event.registrationUrl && (
          <span className="relative flex items-center gap-1.5 rounded-full bg-orange-100 px-3 py-1 text-[10px] font-bold tracking-wider text-orange-700 uppercase dark:bg-orange-500/20 dark:text-orange-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500"></span>
            </span>
            Registration open
          </span>
        )}
      </div>

      {/* Title */}
      <h2 className="text-xl font-bold tracking-tight text-gray-900 transition-colors group-hover:text-orange-600 sm:text-2xl dark:text-white dark:group-hover:text-orange-400">
        <Link
          href={`/events/${event.slug}`}
          className="focus-visible:underline focus-visible:outline-none"
        >
          {event.title}
        </Link>
      </h2>

      {/* Date + location */}
      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400">
          <CalendarIcon className="h-4 w-4 text-orange-500" />
          <span>{formatDateTime(event.date)}</span>
        </div>
        <div className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400">
          <MapPin className="h-4 w-4 text-orange-500" />
          <span>{event.location}</span>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href={`/events/${event.slug}`}
          className="group/btn flex items-center gap-2 rounded-full border border-gray-300 bg-white px-5 py-2 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:bg-gray-50 focus:ring-2 focus:ring-gray-200 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-gray-300 dark:hover:bg-white/10"
        >
          View details
          <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
        </Link>
        {event.registrationUrl && (
          <a
            href={event.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn flex items-center gap-2 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 px-5 py-2 text-sm font-bold text-white shadow-md shadow-orange-500/25 transition-all hover:scale-105 hover:shadow-lg hover:shadow-orange-500/40 focus:ring-2 focus:ring-orange-500 focus:outline-none"
          >
            Register
            <ExternalLink className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </a>
        )}
      </div>
    </article>
  );
}

export default function EventsPage() {
  const allEvents = getAllEvents();
  const { upcoming, past } = splitEventsByTime(allEvents);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <ScrollReveal>
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-black tracking-tight text-gray-900 sm:text-5xl dark:text-white">
              Events<span className="text-orange-500">.</span>
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Workshops, sessions, challenges, and meetups from AWS Cloud Club VIT Pune.
            </p>
          </div>
        </div>
      </ScrollReveal>

      {/* Calendar Grid UI */}
      <ScrollReveal delay={0.1}>
        <Calendar events={allEvents} />
      </ScrollReveal>

      {/* Upcoming events */}
      <section className="mt-10" aria-labelledby="upcoming-heading">
        <h2 id="upcoming-heading" className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Upcoming ({upcoming.length})
        </h2>
        {upcoming.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">
            No upcoming events right now — check back soon!
          </p>
        ) : (
          <ul className="space-y-4" role="list">
            {upcoming.map((event, i) => (
              <ScrollReveal key={event.slug} delay={i * 0.1}>
                <li>
                  <EventCard event={event} />
                </li>
              </ScrollReveal>
            ))}
          </ul>
        )}
      </section>

      {/* Past events — collapsible */}
      {past.length > 0 && (
        <section className="mt-12" aria-labelledby="past-heading">
          <h2 id="past-heading" className="mb-4 text-xl font-bold text-gray-500 dark:text-gray-400">
            Past events ({past.length})
          </h2>
          <ul className="space-y-4 opacity-70" role="list">
            {past.map((event, i) => (
              <ScrollReveal key={event.slug} delay={i * 0.05}>
                <li>
                  <EventCard event={event} />
                </li>
              </ScrollReveal>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
