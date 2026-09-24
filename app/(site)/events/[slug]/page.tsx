import { notFound } from 'next/navigation';

interface EventDetailPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Event detail page — /events/[slug]
 * Phase 2: Load event from content/events/<slug>.md and render it.
 */
export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { slug } = await params;
  // TODO Phase 2: replace with actual content loading from lib/content.ts
  void slug;
  notFound();
}
