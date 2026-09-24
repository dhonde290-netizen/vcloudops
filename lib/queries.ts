/**
 * lib/queries.ts — Data-access layer for the Student Queries feature
 *
 * All Supabase calls for the queries table go through this file.
 * This makes it easy to swap the database later (portability rule).
 *
 * Phase 3: Full implementation.
 * Phase 1: Type stubs only.
 */

// ─── Types ─────────────────────────────────────────────────────────────────

export type QueryCategory = 'Club/Membership' | 'AWS/Cloud help' | 'Events' | 'Other';
export type QueryStatus = 'new' | 'answered' | 'closed';

/** The shape of a row in the `queries` Supabase table */
export interface QueryRow {
  id: string; // uuid
  created_at: string; // ISO 8601
  name: string;
  email: string;
  category: QueryCategory;
  message: string;
  status: QueryStatus;
  answered_by: string | null;
  reply: string | null;
}

/** The shape of a new query submission from the public form */
export interface NewQueryInput {
  name: string;
  email: string;
  category: QueryCategory;
  message: string;
}

// ─── TODO Phase 3: implement these functions ────────────────────────────────

/**
 * Insert a new query into the Supabase `queries` table.
 * Called from POST /api/queries after validation and rate-limit check.
 */
export async function insertQuery(_input: NewQueryInput): Promise<{ id: string }> {
  throw new Error('insertQuery: not implemented — coming in Phase 3');
}

/**
 * Get all queries (team-only admin view).
 * Requires Supabase service role key — never call from the browser.
 */
export async function getAllQueries(_status?: QueryStatus): Promise<QueryRow[]> {
  throw new Error('getAllQueries: not implemented — coming in Phase 3');
}

/**
 * Update the status or reply of a query (admin triage action).
 */
export async function updateQuery(
  _id: string,
  _patch: Partial<Pick<QueryRow, 'status' | 'answered_by' | 'reply'>>,
): Promise<void> {
  throw new Error('updateQuery: not implemented — coming in Phase 3');
}
