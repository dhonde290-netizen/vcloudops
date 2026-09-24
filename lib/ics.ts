/**
 * lib/ics.ts — ICS (iCalendar) file generation
 *
 * Generates .ics feed content from Event objects.
 * Called by GET /api/calendar.ics.
 *
 * Phase 2: Full implementation.
 * Phase 1: Type stubs.
 */

import type { Event } from './content';

/**
 * Converts an array of Event objects into a valid iCalendar string.
 * The output can be served directly as text/calendar.
 */
export function eventsToICS(_events: Event[]): string {
  // TODO Phase 2: implement using the ical-generator package or hand-rolled VCALENDAR format
  throw new Error('eventsToICS: not implemented — coming in Phase 2');
}

/**
 * Format a date string as an ICS DTSTART/DTEND value.
 * e.g. "2024-03-15T14:00:00" → "20240315T140000"
 */
export function formatICSDate(_isoDate: string): string {
  throw new Error('formatICSDate: not implemented — coming in Phase 2');
}
