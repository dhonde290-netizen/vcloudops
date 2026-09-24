import { notFound } from 'next/navigation';

interface GuideDetailPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Guide detail page — /guides/[slug]
 * Phase 2: Load guide from content/guides/<slug>.md and render it.
 */
export default async function GuideDetailPage({ params }: GuideDetailPageProps) {
  const { slug } = await params;
  void slug;
  notFound();
}
