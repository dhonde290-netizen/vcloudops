import { Event } from './content';

/**
 * Generate a complete .ics calendar string from an array of events.
 */
export function generateIcs(events: Event[]): string {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//AWS Cloud Club VIT Pune//Events//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:AWS Cloud Club VIT Pune Events',
    'X-WR-TIMEZONE:Asia/Kolkata',
  ];

  for (const event of events) {
    const start = formatIcsDate(event.date);
    const end = event.endDate
      ? formatIcsDate(event.endDate)
      : formatIcsDate(event.date, 60 * 60 * 1000); // default +1 hr

    const dtstamp = formatIcsDate(new Date().toISOString());
    // Create a deterministic UUID for the event so calendar apps don't duplicate it on refresh
    const uid = `${event.slug}@awscloudclub.vit.edu`;

    // A basic text version of the markdown body, stripped of heavy markdown
    const cleanDescription = event.body
      .replace(/##/g, '')
      .replace(/\*\*/g, '')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1 ($2)')
      .replace(/\n/g, '\\n')
      .trim();

    lines.push(
      'BEGIN:VEVENT',
      `UID:${uid}`,
      `DTSTAMP:${dtstamp}`,
      `DTSTART;TZID=Asia/Kolkata:${start}`,
      `DTEND;TZID=Asia/Kolkata:${end}`,
      `SUMMARY:${event.title} (AWS Cloud Club)`,
      `DESCRIPTION:${cleanDescription}\\n\\nView on website: https://vcloudops.vercel.app/events/${event.slug}`,
      `LOCATION:${event.location}`,
      'END:VEVENT',
    );
  }

  lines.push('END:VCALENDAR');
  return lines.join('\r\n');
}

/**
 * Convert ISO string to ICS format: YYYYMMDDThhmmss
 * Optionally add an offset in milliseconds (for end times)
 */
function formatIcsDate(isoStr: string, offsetMs = 0): string {
  const d = new Date(new Date(isoStr).getTime() + offsetMs);

  const pad = (n: number) => n.toString().padStart(2, '0');

  const year = d.getFullYear();
  const month = pad(d.getMonth() + 1);
  const day = pad(d.getDate());
  const hours = pad(d.getHours());
  const minutes = pad(d.getMinutes());
  const seconds = pad(d.getSeconds());

  return `${year}${month}${day}T${hours}${minutes}${seconds}`;
}
