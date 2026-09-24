/**
 * GET /api/calendar.ics
 *
 * Returns a subscribable iCalendar (.ics) feed of all non-draft events.
 * Phase 2: Full implementation using lib/ics.ts and content/events/*.md.
 *
 * Phase 1: Stub that returns a valid but empty ICS file.
 */
import { NextResponse } from 'next/server';
import { getAllEvents } from '@/lib/content';
import { generateIcs } from '@/lib/ics';

export async function GET() {
  const events = getAllEvents();
  const ics = generateIcs(events);

  return new NextResponse(ics, {
    status: 200,
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'attachment; filename="events.ics"',
      // Don't cache heavily — events change. 1 hour is fine.
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
