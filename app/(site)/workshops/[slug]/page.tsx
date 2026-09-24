import { notFound } from 'next/navigation';

interface WorkshopDetailPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Workshop detail page — /workshops/[slug]
 * Phase 2: Load workshop from content/workshops/<slug>.md and render it.
 */
export default async function WorkshopDetailPage({ params }: WorkshopDetailPageProps) {
  const { slug } = await params;
  // TODO Phase 2: replace with actual content loading from lib/content.ts
  void slug;
  notFound();
}
