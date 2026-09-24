import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllGuides, isGuideOutdated, formatDate } from '@/lib/content';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { ArrowRight, AlertTriangle, Lightbulb } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Setup Guides',
  description:
    'Step-by-step AWS setup guides for VIT Pune students — account creation, billing alerts, CLI, and more.',
};

export const dynamic = 'force-dynamic';

export default function GuidesPage() {
  const guides = getAllGuides(); // sorted by order field

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <ScrollReveal>
        <div className="mb-12">
          <h1 className="text-4xl font-black tracking-tight text-gray-900 sm:text-5xl dark:text-white">
            Setup Guides<span className="text-orange-500">.</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Everything you need to get started with AWS — from account creation to your first
            deployment.
          </p>
          <p className="mt-2 text-sm font-medium text-gray-500 dark:text-gray-500">
            Start with Guide 1 and work through them in order.
          </p>
        </div>
      </ScrollReveal>

      <ol className="mt-8 space-y-4" role="list">
        {guides.map((guide, i) => {
          const outdated = isGuideOutdated(guide.lastReviewed);
          return (
            <ScrollReveal key={guide.slug} delay={i * 0.1}>
              <li>
                <Link
                  href={`/guides/${guide.slug}`}
                  className="group flex items-start gap-5 rounded-2xl border border-white/40 bg-white/40 p-6 shadow-lg backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-white/60 hover:bg-white/50 dark:border-white/10 dark:bg-black/40 dark:hover:border-white/20 dark:hover:bg-black/50"
                >
                  {/* Step number */}
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-sm font-bold text-white shadow-md shadow-orange-500/25">
                    {i + 1}
                  </span>

                  <div className="min-w-0 flex-1">
                    <h2 className="text-xl font-bold tracking-tight text-gray-900 transition-colors group-hover:text-orange-600 dark:text-white dark:group-hover:text-orange-400">
                      {guide.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                      {guide.summary}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-500">
                      <span>Last reviewed: {formatDate(guide.lastReviewed)}</span>
                      {outdated && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-0.5 font-bold text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400">
                          <AlertTriangle className="h-3 w-3" />
                          May be outdated
                        </span>
                      )}
                    </div>
                  </div>

                  <span
                    className="mt-1 flex-shrink-0 text-gray-400 transition-colors group-hover:text-orange-500 dark:text-gray-600"
                    aria-hidden="true"
                  >
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            </ScrollReveal>
          );
        })}
      </ol>

      {guides.length === 0 && (
        <p className="mt-8 text-gray-500 dark:text-gray-400">
          Guides are being written — check back soon!
        </p>
      )}

      <ScrollReveal delay={0.3}>
        <div className="mt-12 rounded-2xl border border-blue-200/50 bg-blue-50/50 p-5 backdrop-blur-sm dark:border-blue-900/30 dark:bg-blue-900/10">
          <p className="flex items-center gap-2.5 text-sm font-medium text-blue-800 dark:text-blue-200">
            <Lightbulb className="h-5 w-5 text-blue-500 dark:text-blue-400" />
            <span>
              Spot an outdated step or have a suggestion?{' '}
              <Link
                href="/queries"
                className="font-bold underline decoration-blue-300 underline-offset-2 transition-colors hover:text-blue-600 dark:decoration-blue-700 dark:hover:text-blue-300"
              >
                Ask the team
              </Link>{' '}
              or open a PR on GitHub.
            </span>
          </p>
        </div>
      </ScrollReveal>
    </div>
  );
}
