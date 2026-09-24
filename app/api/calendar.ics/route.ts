/**
 * GET /api/calendar.ics
 *
 * Returns a subscribable iCalendar (.ics) feed of all non-draft events.
 * Phase 2: Full implementation using lib/ics.ts and content/events/*.md.
 *
 * Phase 1: Stub that returns a valid but empty ICS file.
 */
import { NextResponse } from 'next/server';

export async function GET() {
  // Minimal valid ICS file — empty calendar
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//AWS Cloud Club VIT Pune//Events//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:AWS Cloud Club VIT Pune Events',
    'X-WR-TIMEZONE:Asia/Kolkata',
    // TODO Phase 2: insert VEVENT blocks here from lib/ics.ts
    'END:VCALENDAR',
  ].join('\r\n');

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
