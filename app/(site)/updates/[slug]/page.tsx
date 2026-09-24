import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getUpdateBySlug, getAllUpdates, formatDate, UPDATE_TYPE_LABELS } from '@/lib/content';
import { ScrollFade } from '@/components/ui/scroll-fade';
import { Trophy, Zap, GraduationCap, Megaphone, Pin } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllUpdates().map((u) => ({ slug: u.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const update = getUpdateBySlug(slug);
  if (!update) return {};
  return { title: update.title, description: update.summary };
}

export default async function UpdateDetailPage({ params }: Props) {
  const { slug } = await params;
  const update = getUpdateBySlug(slug);
  if (!update) notFound();

  const typeInfo = UPDATE_TYPE_LABELS[update.type];
  const Icon = {
    winner: Trophy,
    challenge: Zap,
    workshop: GraduationCap,
    announcement: Megaphone,
  }[update.type];

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <ScrollFade>
        <Link
          href="/updates"
          className="text-sm font-medium text-orange-600 hover:underline dark:text-orange-400"
        >
          ← Back to Updates
        </Link>
      </ScrollFade>

      <ScrollFade className="mt-6" delay={0.1}>
        <div className="rounded-3xl border border-white/40 bg-white/40 p-8 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-black/40">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold tracking-wider uppercase ${typeInfo.className}`}
            >
              <Icon className="h-4 w-4" />
              {typeInfo.label}
            </span>
            {update.pinned && (
              <span className="flex items-center gap-1.5 rounded-full border border-orange-500/20 bg-orange-100 px-3 py-1 text-xs font-bold tracking-wider text-orange-700 uppercase dark:bg-orange-900/30 dark:text-orange-300">
                <Pin className="h-4 w-4" />
                Pinned
              </span>
            )}
            <span className="ml-auto text-sm font-medium text-gray-500 dark:text-gray-400">
              {formatDate(update.date)}
            </span>
          </div>

          <h1 className="mt-6 text-3xl font-black tracking-tight text-gray-900 sm:text-4xl lg:text-5xl dark:text-white">
            {update.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            {update.summary}
          </p>
        </div>
      </ScrollFade>

      <ScrollFade delay={0.2} className="mt-8">
        <div className="rounded-3xl border border-white/40 bg-white/30 p-8 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-black/30">
          <div
            className="prose-content"
            dangerouslySetInnerHTML={{ __html: simpleMarkdownToHtml(update.body) }}
          />
        </div>
      </ScrollFade>
    </div>
  );
}

function simpleMarkdownToHtml(md: string): string {
  const first =
    '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="inline-block text-yellow-500 mr-2 -mt-1"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7c0 3.31 2.69 6 6 6s6-2.69 6-6V2Z"/></svg>';
  const second =
    '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="inline-block text-gray-400 mr-2 -mt-1"><path d="M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15"/><path d="M11 12 5.12 2.2"/><path d="M13 12l5.88-9.8"/><path d="M8 7h8"/><circle cx="12" cy="17" r="5"/><path d="M12 18v-2h-.5"/></svg>';
  const third =
    '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="inline-block text-amber-600 mr-2 -mt-1"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>';

  return md
    .replace(/🥇/g, first)
    .replace(/🥈/g, second)
    .replace(/🥉/g, third)
    .replace(
      /^## (.+)$/gm,
      '<h2 class="flex items-center text-2xl font-black tracking-tight text-gray-900 dark:text-white mt-10 mb-4">$1</h2>',
    )
    .replace(
      /^### (.+)$/gm,
      '<h3 class="text-xl font-bold tracking-tight text-gray-900 dark:text-white mt-8 mb-3">$1</h3>',
    )
    .replace(
      /\*\*(.+?)\*\*/g,
      '<strong class="font-bold text-gray-900 dark:text-gray-100">$1</strong>',
    )
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(
      /`(.+?)`/g,
      '<code class="rounded bg-gray-100 px-1.5 py-0.5 text-sm font-mono text-gray-800 dark:bg-gray-800 dark:text-gray-200">$1</code>',
    )
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" class="text-orange-600 hover:underline dark:text-orange-400">$1</a>',
    )
    .replace(/^- (.+)$/gm, '<li class="ml-4 list-disc marker:text-orange-500">$1</li>')
    .replace(/^(\d+)\. (.+)$/gm, '<li class="ml-4 list-decimal marker:text-orange-500">$2</li>')
    .replace(/(<li.*<\/li>\n?)+/g, (m) => `<ul class="my-4 space-y-2">${m}</ul>`)
    .split('\n\n')
    .map((p) => {
      if (p.startsWith('<h') || p.startsWith('<u')) return p;
      if (p === '---') return '<hr class="my-8 border-t border-gray-200 dark:border-gray-700" />';
      return `<p class="mb-4 text-base leading-relaxed text-gray-700 dark:text-gray-300">${p}</p>`;
    })
    .join('\n');
}
