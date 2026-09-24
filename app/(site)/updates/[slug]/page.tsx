import { notFound } from 'next/navigation';

interface UpdateDetailPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Update detail page — /updates/[slug]
 * Phase 2: Load update from content/updates/<slug>.md and render it.
 */
export default async function UpdateDetailPage({ params }: UpdateDetailPageProps) {
  const { slug } = await params;
  void slug;
  notFound();
}
