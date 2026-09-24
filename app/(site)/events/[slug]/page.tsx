import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getEventBySlug, getAllEvents, formatDateTime, EVENT_TYPE_LABELS } from '@/lib/content';
import { ScrollFade } from '@/components/ui/scroll-fade';
import {
  ExternalLink,
  CalendarPlus,
  Download,
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  BookOpen,
} from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllEvents().map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) return {};
  return {
    title: event.title,
    description: `${event.type} on ${formatDateTime(event.date)} at ${event.location}`,
  };
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) notFound();

  const typeInfo = EVENT_TYPE_LABELS[event.type];

  // Build a Google Calendar "Add to Calendar" URL
  const gcalStart = event.date.replace(/[-:]/g, '').replace(/\.\d+/, '');
  const gcalEnd = event.endDate
    ? event.endDate.replace(/[-:]/g, '').replace(/\.\d+/, '')
    : gcalStart;
  const gcalUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${gcalStart}/${gcalEnd}&details=${encodeURIComponent(event.location)}&location=${encodeURIComponent(event.location)}`;

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Back link */}
      <ScrollFade>
        <Link
          href="/events"
          className="text-sm text-orange-600 hover:underline dark:text-orange-400"
        >
          ← Back to Events
        </Link>
      </ScrollFade>

      {/* Header */}
      <ScrollFade className="mt-6" delay={0.1}>
        <div className="rounded-3xl border border-white/40 bg-white/40 p-8 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-black/40">
          <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold tracking-wider uppercase ${typeInfo.className}`}
          >
            {typeInfo.label}
          </span>
          <h1 className="mt-4 text-3xl font-black tracking-tight text-gray-900 sm:text-4xl lg:text-5xl dark:text-white">
            {event.title}
          </h1>

          <div className="mt-6 flex flex-wrap gap-4 text-sm font-medium text-gray-700 sm:gap-6 dark:text-gray-300">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              <span>{formatDateTime(event.date)}</span>
            </div>
            {event.endDate && (
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                <span>Ends: {formatDateTime(event.endDate)}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              <span>{event.location}</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            {event.registrationUrl && (
              <a
                href={event.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 rounded-full bg-orange-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-1 hover:bg-orange-700 hover:shadow-xl hover:shadow-orange-500/40 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:outline-none"
              >
                Register Now
                <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            )}
            <a
              href={gcalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 rounded-full border border-white/60 bg-white/50 px-6 py-3 text-sm font-bold text-gray-800 shadow-sm backdrop-blur-md transition-all hover:-translate-y-1 hover:bg-white/80 hover:shadow-md focus:ring-2 focus:ring-gray-200 focus:ring-offset-2 focus:outline-none dark:border-white/10 dark:bg-black/50 dark:text-gray-200 dark:hover:bg-black/80"
            >
              Add to Calendar
              <CalendarPlus className="h-4 w-4 transition-transform group-hover:scale-110" />
            </a>
          </div>
        </div>
      </ScrollFade>

      {/* Body */}
      <ScrollFade delay={0.2}>
        <div
          className="prose-content mt-10 rounded-3xl border border-white/40 bg-white/30 p-8 backdrop-blur-xl dark:border-white/10 dark:bg-black/30"
          dangerouslySetInnerHTML={{ __html: simpleMarkdownToHtml(event.body) }}
        />
      </ScrollFade>

      {event.workshopSlug && (
        <ScrollFade delay={0.3}>
          <div className="mt-8 rounded-3xl border border-blue-500/30 bg-blue-50/50 p-6 backdrop-blur-md dark:border-blue-400/20 dark:bg-blue-900/20">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
                <BookOpen className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-blue-900 dark:text-blue-100">
                  Workshop Resources Available
                </h3>
                <Link
                  href={`/workshops/${event.workshopSlug}`}
                  className="group mt-1 flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  View notes, slides, and recordings
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </ScrollFade>
      )}
    </div>
  );
}

/**
 * Very simple Markdown → HTML converter for body text.
 * Phase 2 polish: replace with a proper MDX renderer (next-mdx-remote).
 * This handles the most common Markdown patterns used in content files.
 */
function simpleMarkdownToHtml(md: string): string {
  return md
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^#### (.+)$/gm, '<h4>$1</h4>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/^(\d+)\. (.+)$/gm, '<li>$2</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, (m) => `<ul>${m}</ul>`)
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[h|u|o|l])/gm, '')
    .trim()
    .replace(/^(.+)$/, '<p>$1</p>');
}
