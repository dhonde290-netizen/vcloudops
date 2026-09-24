import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getWorkshopBySlug, getAllWorkshops } from '@/lib/content';
import { ScrollFade } from '@/components/ui/scroll-fade';
import { Calendar, User, ExternalLink, FileText, Link as LinkIcon, Hourglass } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllWorkshops().map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const workshop = getWorkshopBySlug(slug);
  if (!workshop) return {};
  return { title: workshop.title, description: workshop.summary };
}

export default async function WorkshopDetailPage({ params }: Props) {
  const { slug } = await params;
  const workshop = getWorkshopBySlug(slug);
  if (!workshop) notFound();

  const dateStr = new Date(workshop.date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <ScrollFade>
        <Link
          href="/workshops"
          className="text-sm font-medium text-orange-600 hover:underline dark:text-orange-400"
        >
          ← Back to Workshops
        </Link>
      </ScrollFade>

      {/* Header */}
      <ScrollFade className="mt-6" delay={0.1}>
        <div className="rounded-3xl border border-white/40 bg-white/40 p-8 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-black/40">
          <h1 className="text-3xl font-black tracking-tight text-gray-900 sm:text-4xl lg:text-5xl dark:text-white">
            {workshop.title}
          </h1>

          <div className="mt-6 flex flex-wrap gap-4 text-sm font-medium text-gray-700 sm:gap-6 dark:text-gray-300">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              <span>By {workshop.speaker}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              <span>{dateStr}</span>
            </div>
          </div>

          <p className="mt-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            {workshop.summary}
          </p>

          {/* Tags */}
          {workshop.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {workshop.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-orange-500/20 bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700 shadow-sm dark:bg-orange-900/30 dark:text-orange-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </ScrollFade>

      {/* Recording */}
      <ScrollFade className="mt-8" delay={0.2}>
        <h2
          id="recording-heading"
          className="text-2xl font-black tracking-tight text-gray-900 dark:text-white"
        >
          Recording
        </h2>
        {workshop.recordingUrl ? (
          <div className="mt-4 overflow-hidden rounded-3xl border border-white/40 shadow-lg dark:border-white/10">
            <div className="relative aspect-video bg-black">
              <iframe
                src={workshop.recordingUrl.replace('watch?v=', 'embed/')}
                title={`${workshop.title} recording`}
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        ) : (
          <div className="mt-4 flex flex-col items-center justify-center gap-3 rounded-3xl border border-white/40 bg-white/40 p-10 text-center shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-black/40">
            <Hourglass className="h-8 w-8 animate-pulse text-gray-400 dark:text-gray-500" />
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              <strong>Recording coming soon</strong> — we&apos;re processing it after the session.
            </p>
          </div>
        )}
      </ScrollFade>

      {/* Links */}
      <ScrollFade className="mt-8" delay={0.3}>
        <h2
          id="resources-heading"
          className="text-2xl font-black tracking-tight text-gray-900 dark:text-white"
        >
          Slides & Resources
        </h2>
        <div className="mt-4 rounded-3xl border border-white/40 bg-white/40 p-6 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-black/40">
          <ul className="space-y-4">
            {workshop.slidesUrl && (
              <li>
                <a
                  href={workshop.slidesUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-sm font-bold text-gray-800 transition-colors hover:text-orange-600 dark:text-gray-200 dark:hover:text-orange-400"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/80 shadow-sm transition-transform group-hover:scale-110 dark:bg-white/10">
                    <FileText className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  Download Slides
                  <ExternalLink className="h-4 w-4 text-gray-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </li>
            )}
            {workshop.resources.map((r) => (
              <li key={r.url}>
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-sm font-bold text-gray-800 transition-colors hover:text-orange-600 dark:text-gray-200 dark:hover:text-orange-400"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/80 shadow-sm transition-transform group-hover:scale-110 dark:bg-white/10">
                    <LinkIcon className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  {r.label}
                  <ExternalLink className="h-4 w-4 text-gray-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </li>
            ))}
            {!workshop.slidesUrl && workshop.resources.length === 0 && (
              <li>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Resources will be linked here after the session.
                </p>
              </li>
            )}
          </ul>
        </div>
      </ScrollFade>

      {/* Notes / body */}
      {workshop.body.trim() && (
        <ScrollFade className="mt-8" delay={0.4}>
          <h2
            id="notes-heading"
            className="text-2xl font-black tracking-tight text-gray-900 dark:text-white"
          >
            Session Notes
          </h2>
          <div
            className="prose-content mt-4 rounded-3xl border border-white/40 bg-white/30 p-8 backdrop-blur-xl dark:border-white/10 dark:bg-black/30"
            dangerouslySetInnerHTML={{ __html: simpleMarkdownToHtml(workshop.body) }}
          />
        </ScrollFade>
      )}
    </div>
  );
}

function simpleMarkdownToHtml(md: string): string {
  return md
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/^(\d+)\. (.+)$/gm, '<li>$2</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, (m) => `<ul>${m}</ul>`)
    .split('\n\n')
    .map((p) => (p.startsWith('<') ? p : `<p>${p}</p>`))
    .join('\n');
}
