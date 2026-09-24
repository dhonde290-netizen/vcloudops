/**
 * Admin — Queries triage page (/admin/queries)
 *
 * Phase 4: Protected by Supabase Auth (email magic link).
 * Only team emails in ADMIN_EMAILS env var can access this page.
 *
 * Phase 1: Returns 404 (notFound) so the route exists but is inaccessible.
 */
import { notFound } from 'next/navigation';

export default function AdminQueriesPage() {
  // TODO Phase 4: add auth check via Supabase and render triage table
  notFound();
}
