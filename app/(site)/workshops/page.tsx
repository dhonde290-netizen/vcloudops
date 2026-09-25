import type { Metadata } from 'next';
import Link from 'next/link';
import { PlayCircle, Hourglass, ArrowRight } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { getAllWorkshops } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Workshops',
  description: 'Workshop archive — recordings, slides, and resources from AWS Cloud Club VIT Pune.',
};

export const dynamic = 'force-dynamic';

// All unique tags across workshops (for filtering — client-side in Phase 4)
function getAllTags(workshops: ReturnType<typeof getAllWorkshops>) {
  const tags = new Set<string>();
  workshops.forEach((w) => w.tags.forEach((t) => tags.add(t)));
  return Array.from(tags).sort();
}

export default function WorkshopsPage() {
  const workshops = getAllWorkshops();
  const allTags = getAllTags(workshops);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <ScrollReveal>
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-black tracking-tight text-gray-900 sm:text-5xl dark:text-white">
              Workshops<span className="text-orange-500">.</span>
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Recordings, slides, and notes from every AWS Cloud Club workshop.
            </p>
          </div>
        </div>
      </ScrollReveal>

      {/* Tag chips */}
      {allTags.length > 0 && (
        <ScrollReveal delay={0.1}>
          <div className="mt-4 flex flex-wrap gap-2" aria-label="Workshop topics">
            {allTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/40 bg-white/40 px-3 py-1.5 text-[11px] font-bold tracking-wider text-gray-700 uppercase shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-black/40 dark:text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </ScrollReveal>
      )}

      {/* Workshop grid */}
      <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" role="list">
        {workshops.map((workshop, i) => (
          <ScrollReveal key={workshop.slug} delay={i * 0.1}>
            <li className="h-full">
              <Link
                href={`/workshops/${workshop.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-white/60 bg-gradient-to-b from-white/60 to-white/30 p-6 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-gray-900/5 dark:border-white/10 dark:from-white/10 dark:to-white/5 dark:hover:border-white/20 dark:hover:shadow-black/50"
              >
                {/* Dynamic Hover Glow */}
                <div className="absolute inset-0 translate-y-[100%] bg-gradient-to-t from-orange-500/10 to-transparent opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 dark:from-orange-500/5" />

                {/* Inner highlight */}
                <div className="pointer-events-none absolute inset-0 rounded-[1.5rem] ring-1 ring-white/50 ring-inset dark:ring-white/10" />

                <div className="relative z-10 flex h-full flex-col">
                  {/* Recording status badge */}
                  <div className="mb-4">
                    {workshop.recordingUrl ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1.5 text-xs font-bold text-green-700 shadow-sm backdrop-blur-md dark:bg-green-500/20 dark:text-green-400">
                        <PlayCircle className="h-4 w-4" />
                        Recording available
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white/50 px-3 py-1.5 text-xs font-bold text-gray-500 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:text-gray-400">
                        <Hourglass className="h-4 w-4" />
                        Recording coming soon
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold tracking-tight text-gray-900 transition-colors group-hover:text-orange-600 dark:text-white dark:group-hover:text-orange-400">
                    {workshop.title}
                  </h2>

                  {/* Speaker + date */}
                  <p className="mt-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                    {workshop.speaker} <span className="mx-1">•</span>{' '}
                    {new Date(workshop.date).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </p>

                  {/* Summary */}
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    {workshop.summary}
                  </p>

                  {/* Tags */}
                  {workshop.tags.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {workshop.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md bg-orange-100 px-2 py-1 text-[10px] font-bold tracking-wider text-orange-700 uppercase dark:bg-orange-500/20 dark:text-orange-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-6 flex items-center gap-2 text-sm font-bold text-orange-600 transition-colors group-hover:text-orange-700 dark:text-orange-500 dark:group-hover:text-orange-400">
                    View notes & resources
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </li>
          </ScrollReveal>
        ))}
      </ul>

      {workshops.length === 0 && (
        <p className="mt-8 text-gray-500 dark:text-gray-400">No workshops yet — check back soon!</p>
      )}
    </div>
  );
}
