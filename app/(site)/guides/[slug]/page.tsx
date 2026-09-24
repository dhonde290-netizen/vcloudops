import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getGuideBySlug, getAllGuides, isGuideOutdated, formatDate } from '@/lib/content';
import { ScrollFade } from '@/components/ui/scroll-fade';
import { AlertTriangle, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllGuides().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};
  return { title: guide.title, description: guide.summary };
}

export default async function GuideDetailPage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const outdated = isGuideOutdated(guide.lastReviewed);
  const allGuides = getAllGuides();
  const currentIndex = allGuides.findIndex((g) => g.slug === slug);
  const prev = currentIndex > 0 ? allGuides[currentIndex - 1] : null;
  const next = currentIndex < allGuides.length - 1 ? allGuides[currentIndex + 1] : null;

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <ScrollFade>
        <Link
          href="/guides"
          className="text-sm font-medium text-orange-600 hover:underline dark:text-orange-400"
        >
          ← Back to Guides
        </Link>
      </ScrollFade>

      {/* Outdated notice */}
      {outdated && (
        <ScrollFade delay={0.1}>
          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-yellow-200 bg-yellow-50 p-5 shadow-sm dark:border-yellow-900/50 dark:bg-yellow-900/20">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-yellow-600 dark:text-yellow-500" />
            <p className="text-sm leading-relaxed text-yellow-800 dark:text-yellow-200">
              <strong>This guide may be outdated.</strong> Last reviewed{' '}
              {formatDate(guide.lastReviewed)}. AWS changes frequently — verify steps against the{' '}
              <a
                href="https://docs.aws.amazon.com"
                className="font-semibold underline underline-offset-2 hover:text-yellow-900 dark:hover:text-yellow-100"
                target="_blank"
                rel="noopener noreferrer"
              >
                official docs
              </a>
              .
            </p>
          </div>
        </ScrollFade>
      )}

      {/* Header */}
      <ScrollFade className="mt-6" delay={0.2}>
        <div className="rounded-3xl border border-white/40 bg-white/40 p-8 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-black/40">
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-full bg-orange-100 px-3 py-1 text-xs font-bold tracking-wider text-orange-700 uppercase dark:bg-orange-900/30 dark:text-orange-300">
              <BookOpen className="h-4 w-4" />
              Guide {guide.order}
            </span>
            <span className="ml-auto text-sm font-medium text-gray-500 dark:text-gray-400">
              Last reviewed {formatDate(guide.lastReviewed)}
            </span>
          </div>

          <h1 className="mt-6 text-3xl font-black tracking-tight text-gray-900 sm:text-4xl lg:text-5xl dark:text-white">
            {guide.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            {guide.summary}
          </p>
        </div>
      </ScrollFade>

      {/* Body */}
      <ScrollFade delay={0.3} className="mt-8">
        <div className="rounded-3xl border border-white/40 bg-white/30 p-8 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-black/30">
          <div
            className="prose-content"
            dangerouslySetInnerHTML={{ __html: simpleMarkdownToHtml(guide.body) }}
          />
        </div>
      </ScrollFade>

      {/* Prev / Next navigation */}
      <ScrollFade delay={0.4} className="mt-8">
        <nav
          className="flex flex-col gap-4 rounded-3xl border border-white/40 bg-white/40 p-6 shadow-lg backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between dark:border-white/10 dark:bg-black/40"
          aria-label="Guide navigation"
        >
          {prev ? (
            <Link
              href={`/guides/${prev.slug}`}
              className="group flex items-center gap-4 text-sm font-bold text-gray-700 transition-colors hover:text-orange-600 dark:text-gray-300 dark:hover:text-orange-400"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/80 shadow-sm transition-transform group-hover:-translate-x-1 dark:bg-white/10">
                <ChevronLeft className="h-5 w-5" />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase dark:text-gray-500">
                  Previous
                </span>
                <span>{prev.title}</span>
              </div>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/guides/${next.slug}`}
              className="group flex flex-row-reverse items-center gap-4 text-right text-sm font-bold text-gray-700 transition-colors hover:text-orange-600 sm:flex-row sm:text-left dark:text-gray-300 dark:hover:text-orange-400"
            >
              <div className="flex flex-col items-end sm:items-start">
                <span className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase dark:text-gray-500">
                  Next
                </span>
                <span>{next.title}</span>
              </div>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/80 shadow-sm transition-transform group-hover:translate-x-1 dark:bg-white/10">
                <ChevronRight className="h-5 w-5" />
              </div>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </ScrollFade>
    </div>
  );
}

function simpleMarkdownToHtml(md: string): string {
  return md
    .replace(
      /^## (.+)$/gm,
      '<h2 class="flex items-center text-2xl font-black tracking-tight text-gray-900 dark:text-white mt-10 mb-4">$1</h2>',
    )
    .replace(
      /^### (.+)$/gm,
      '<h3 class="text-xl font-bold tracking-tight text-gray-900 dark:text-white mt-8 mb-3">$1</h3>',
    )
    .replace(
      /^#### (.+)$/gm,
      '<h4 class="text-lg font-bold tracking-tight text-gray-900 dark:text-white mt-6 mb-2">$1</h4>',
    )
    .replace(
      /\*\*(.+?)\*\*/g,
      '<strong class="font-bold text-gray-900 dark:text-gray-100">$1</strong>',
    )
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(
      /`([^`\n]+)`/g,
      '<code class="rounded bg-gray-100 px-1.5 py-0.5 text-sm font-mono text-gray-800 dark:bg-gray-800 dark:text-gray-200">$1</code>',
    )
    .replace(
      /```[\w]*\n([\s\S]*?)```/gm,
      '<pre class="my-6 overflow-x-auto rounded-xl bg-gray-900 p-4 text-sm text-gray-100 dark:bg-black/50 border border-gray-800 shadow-lg"><code>$1</code></pre>',
    )
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" class="font-medium text-orange-600 hover:underline dark:text-orange-400" target="_blank" rel="noopener noreferrer">$1</a>',
    )
    .replace(
      /^> (.+)$/gm,
      '<blockquote class="my-6 border-l-4 border-orange-500 bg-orange-50 py-3 pl-4 pr-4 italic text-gray-700 dark:bg-orange-500/10 dark:text-gray-300 rounded-r-xl">$1</blockquote>',
    )
    .replace(/^- (.+)$/gm, '<li class="ml-4 list-disc marker:text-orange-500">$1</li>')
    .replace(/^(\d+)\. (.+)$/gm, '<li class="ml-4 list-decimal marker:text-orange-500">$2</li>')
    .replace(/(<li.*<\/li>\n?)+/g, (m) => `<ul class="my-4 space-y-2">${m}</ul>`)
    .replace(/\|(.+)\|/g, (row) => {
      const cells = row
        .split('|')
        .filter(Boolean)
        .map((c) => c.trim());
      return `<tr class="border-b border-gray-200 dark:border-gray-800 last:border-0 hover:bg-gray-50/50 dark:hover:bg-gray-800/50">${cells.map((c) => `<td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">${c}</td>`).join('')}</tr>`;
    })
    .replace(
      /(<tr.*<\/tr>\n?)+/g,
      (m) =>
        `<div class="my-6 w-full overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700"><table class="w-full text-left border-collapse"><tbody class="divide-y divide-gray-200 dark:divide-gray-700">${m}</tbody></table></div>`,
    )
    .split('\n\n')
    .map((p) => {
      if (
        p.startsWith('<h') ||
        p.startsWith('<u') ||
        p.startsWith('<b') ||
        p.startsWith('<p') ||
        p.startsWith('<t') ||
        p.startsWith('<d')
      )
        return p;
      if (p === '---') return '<hr class="my-8 border-t border-gray-200 dark:border-gray-700" />';
      if (p.trim())
        return `<p class="mb-4 text-base leading-relaxed text-gray-700 dark:text-gray-300">${p}</p>`;
      return '';
    })
    .join('\n');
}
