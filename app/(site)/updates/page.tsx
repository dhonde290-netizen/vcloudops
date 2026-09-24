import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllUpdates, formatDate, UPDATE_TYPE_LABELS } from '@/lib/content';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { Trophy, Zap, GraduationCap, Megaphone, Pin, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Updates',
  description:
    'Latest updates from AWS Cloud Club VIT Pune — winners, challenges, and announcements.',
};

export const dynamic = 'force-dynamic';

export default function UpdatesPage() {
  const updates = getAllUpdates(); // pinned first, then newest first

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <ScrollReveal>
        <div className="mb-12">
          <h1 className="text-4xl font-black tracking-tight text-gray-900 sm:text-5xl dark:text-white">
            Updates<span className="text-orange-500">.</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Winners, challenges, announcements, and workshop recaps — posted weekly.
          </p>
        </div>
      </ScrollReveal>

      <ul className="mt-8 space-y-4" role="list">
        {updates.map((update, i) => {
          const typeInfo = UPDATE_TYPE_LABELS[update.type];
          const Icon = {
            winner: Trophy,
            challenge: Zap,
            workshop: GraduationCap,
            announcement: Megaphone,
          }[update.type];

          return (
            <ScrollReveal key={update.slug} delay={i * 0.1}>
              <li>
                <Link
                  href={`/updates/${update.slug}`}
                  className="group flex flex-col rounded-2xl border border-white/40 bg-white/40 p-6 shadow-lg backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-white/60 hover:bg-white/50 dark:border-white/10 dark:bg-black/40 dark:hover:border-white/20 dark:hover:bg-black/50"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold tracking-wider uppercase ${typeInfo.className}`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {typeInfo.label}
                    </span>
                    {update.pinned && (
                      <span className="flex items-center gap-1.5 rounded-full bg-orange-100 px-3 py-1 text-[10px] font-bold tracking-wider text-orange-700 uppercase dark:bg-orange-500/20 dark:text-orange-400">
                        <Pin className="h-3.5 w-3.5" />
                        Pinned
                      </span>
                    )}
                    <span className="ml-auto text-xs font-medium text-gray-500 dark:text-gray-400">
                      {formatDate(update.date)}
                    </span>
                  </div>

                  <h2 className="mt-4 text-xl font-bold tracking-tight text-gray-900 transition-colors group-hover:text-orange-600 dark:text-white dark:group-hover:text-orange-400">
                    {update.title}
                  </h2>

                  <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    {update.summary}
                  </p>

                  <div className="mt-6 flex items-center gap-2 text-sm font-bold text-orange-600 transition-colors group-hover:text-orange-700 dark:text-orange-500 dark:group-hover:text-orange-400">
                    Read more{' '}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </li>
            </ScrollReveal>
          );
        })}
      </ul>

      {updates.length === 0 && (
        <p className="mt-8 text-gray-500 dark:text-gray-400">No updates yet — check back soon!</p>
      )}
    </div>
  );
}
