/**
 * POST /api/queries
 *
 * Accepts student query submissions and writes them to Supabase.
 * Phase 3: Full implementation with Zod validation, honeypot,
 *           rate limiting, and Supabase insert.
 *
 * Phase 1: Stub that returns 501 Not Implemented.
 */
import { NextResponse } from 'next/server';

export async function POST() {
  // TODO Phase 3: implement full validation, rate limiting, and Supabase write
  return NextResponse.json({ error: 'Not implemented yet — coming in Phase 3' }, { status: 501 });
}
