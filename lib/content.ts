/**
 * lib/content.ts — Content loading and parsing layer
 *
 * ALL content reading goes through this file.
 * Pages must never import 'fs' or 'gray-matter' directly.
 * This makes it easy to swap the content source later (e.g., a CMS or API).
 *
 * Content lives in the content/ directory as Markdown files with YAML frontmatter.
 * Frontmatter is validated with Zod — a malformed file throws an error that names the file.
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { z } from 'zod/v4';

// ─── Path helpers ──────────────────────────────────────────────────────────

const CONTENT_ROOT = path.join(process.cwd(), 'content');

function contentDir(type: string) {
  return path.join(CONTENT_ROOT, type);
}

/** Read all .md files in a content subdirectory, return [slug, raw content] pairs */
function readMarkdownFiles(type: string): { slug: string; raw: string }[] {
  const dir = contentDir(type);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => ({
      slug: f.replace(/\.md$/, ''),
      raw: fs.readFileSync(path.join(dir, f), 'utf-8'),
    }));
}

/** Read all .json files in a content subdirectory */
function readJsonFiles(type: string): { slug: string; data: unknown }[] {
  const dir = contentDir(type);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => ({
      slug: f.replace(/\.json$/, ''),
      data: JSON.parse(fs.readFileSync(path.join(dir, f), 'utf-8')),
    }));
}

// ─── Zod schemas (validates frontmatter at build/request time) ───────────────

const EventSchema = z.object({
  title: z.string(),
  date: z.string(),
  endDate: z.string().optional(),
  location: z.string(),
  type: z.enum(['workshop', 'session', 'challenge', 'meetup']),
  registrationUrl: z.string().optional(),
  poster: z.string().optional(),
  workshopSlug: z.string().optional(),
  draft: z.boolean().optional().default(false),
});

const WorkshopSchema = z.object({
  title: z.string(),
  date: z.string(),
  speaker: z.string(),
  summary: z.string(),
  recordingUrl: z.string().optional(),
  slidesUrl: z.string().optional(),
  resources: z
    .array(z.object({ label: z.string(), url: z.string() }))
    .optional()
    .default([]),
  tags: z.array(z.string()).optional().default([]),
});

const UpdateSchema = z.object({
  title: z.string(),
  date: z.string(),
  type: z.enum(['winner', 'challenge', 'workshop', 'announcement']),
  summary: z.string(),
  pinned: z.boolean().optional().default(false),
});

const GuideSchema = z.object({
  title: z.string(),
  order: z.number(),
  summary: z.string(),
  lastReviewed: z.string(),
});

const TeamMemberSchema = z.object({
  name: z.string(),
  role: z.string(),
  year: z.string(),
  photo: z.string(),
  linkedin: z.string().optional(),
  github: z.string().optional(),
  group: z.enum(['core', 'alumni']),
  order: z.number(),
});

// ─── TypeScript types (inferred from schemas) ─────────────────────────────

export type EventFrontmatter = z.infer<typeof EventSchema>;
export type WorkshopFrontmatter = z.infer<typeof WorkshopSchema>;
export type UpdateFrontmatter = z.infer<typeof UpdateSchema>;
export type GuideFrontmatter = z.infer<typeof GuideSchema>;
export type TeamMemberData = z.infer<typeof TeamMemberSchema>;

export interface Event extends EventFrontmatter {
  slug: string;
  body: string;
}

export interface Workshop extends WorkshopFrontmatter {
  slug: string;
  body: string;
}

export interface ClubUpdate extends UpdateFrontmatter {
  slug: string;
  body: string;
}

export interface Guide extends GuideFrontmatter {
  slug: string;
  body: string;
}

export interface TeamMember extends TeamMemberData {
  slug: string;
}

// ─── Helper: parse + validate a markdown file ─────────────────────────────

function parseMarkdown<T>(
  schema: z.ZodType<T>,
  slug: string,
  raw: string,
  contentType: string,
): { data: T; body: string } {
  const { data: frontmatter, content: body } = matter(raw);
  const result = schema.safeParse(frontmatter);
  if (!result.success) {
    // Format the error so the developer knows exactly which file and field failed
    const errors = result.error.issues
      .map((i) => `  • ${i.path.join('.')}: ${i.message}`)
      .join('\n');
    throw new Error(
      `Invalid frontmatter in content/${contentType}/${slug}.md:\n${errors}\n\nFix the file and restart the dev server.`,
    );
  }
  return { data: result.data, body };
}

// ─── Public API ────────────────────────────────────────────────────────────

/** Get all non-draft events, sorted chronologically (upcoming first) */
export function getAllEvents(): Event[] {
  return readMarkdownFiles('events')
    .map(({ slug, raw }) => {
      const { data, body } = parseMarkdown(EventSchema, slug, raw, 'events');
      return { slug, body, ...data };
    })
    .filter((e) => !e.draft)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

/** Get a single event by slug */
export function getEventBySlug(slug: string): Event | null {
  const filePath = path.join(contentDir('events'), `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, body } = parseMarkdown(EventSchema, slug, raw, 'events');
  if (data.draft) return null;
  return { slug, body, ...data };
}

/** Get all workshops, sorted by date descending (newest first) */
export function getAllWorkshops(): Workshop[] {
  return readMarkdownFiles('workshops')
    .map(({ slug, raw }) => {
      const { data, body } = parseMarkdown(WorkshopSchema, slug, raw, 'workshops');
      return { slug, body, ...data };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/** Get a single workshop by slug */
export function getWorkshopBySlug(slug: string): Workshop | null {
  const filePath = path.join(contentDir('workshops'), `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, body } = parseMarkdown(WorkshopSchema, slug, raw, 'workshops');
  return { slug, body, ...data };
}

/** Get all updates, pinned first then newest first */
export function getAllUpdates(): ClubUpdate[] {
  return readMarkdownFiles('updates')
    .map(({ slug, raw }) => {
      const { data, body } = parseMarkdown(UpdateSchema, slug, raw, 'updates');
      return { slug, body, ...data };
    })
    .sort((a, b) => {
      // Pinned items float to the top
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
}

/** Get a single update by slug */
export function getUpdateBySlug(slug: string): ClubUpdate | null {
  const filePath = path.join(contentDir('updates'), `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, body } = parseMarkdown(UpdateSchema, slug, raw, 'updates');
  return { slug, body, ...data };
}

/** Get all guides, sorted by order field */
export function getAllGuides(): Guide[] {
  return readMarkdownFiles('guides')
    .map(({ slug, raw }) => {
      const { data, body } = parseMarkdown(GuideSchema, slug, raw, 'guides');
      return { slug, body, ...data };
    })
    .sort((a, b) => a.order - b.order);
}

/** Get a single guide by slug */
export function getGuideBySlug(slug: string): Guide | null {
  const filePath = path.join(contentDir('guides'), `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, body } = parseMarkdown(GuideSchema, slug, raw, 'guides');
  return { slug, body, ...data };
}

/** Get all team members — core members first (by order), then alumni */
export function getAllTeamMembers(): TeamMember[] {
  return readJsonFiles('team')
    .map(({ slug, data }) => {
      const result = TeamMemberSchema.safeParse(data);
      if (!result.success) {
        const errors = result.error.issues
          .map((i) => `  • ${i.path.join('.')}: ${i.message}`)
          .join('\n');
        throw new Error(`Invalid data in content/team/${slug}.json:\n${errors}`);
      }
      return { slug, ...result.data };
    })
    .sort((a, b) => {
      if (a.group === 'core' && b.group === 'alumni') return -1;
      if (a.group === 'alumni' && b.group === 'core') return 1;
      return a.order - b.order;
    });
}

// ─── Utility helpers ───────────────────────────────────────────────────────

/** Returns true if a guide is more than 12 months old (shows "may be outdated") */
export function isGuideOutdated(lastReviewed: string): boolean {
  const reviewed = new Date(lastReviewed);
  const twelveMonthsAgo = new Date();
  twelveMonthsAgo.setFullYear(twelveMonthsAgo.getFullYear() - 1);
  return reviewed < twelveMonthsAgo;
}

/** Splits events into upcoming (>= now) and past (< now) */
export function splitEventsByTime(events: Event[]): { upcoming: Event[]; past: Event[] } {
  const now = new Date();
  const upcoming = events.filter((e) => new Date(e.date) >= now);
  const past = events.filter((e) => new Date(e.date) < now).reverse(); // past: newest first
  return { upcoming, past };
}

/** Format a date string for display, e.g. "15 Oct 2026" */
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/** Format a date + time, e.g. "15 Oct 2026, 3:00 PM" */
export function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata',
  });
}

/** Map event type to a display label and colour class */
export const EVENT_TYPE_LABELS: Record<
  EventFrontmatter['type'],
  { label: string; className: string }
> = {
  workshop: {
    label: 'Workshop',
    className: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  },
  session: {
    label: 'Session',
    className: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  },
  challenge: {
    label: 'Challenge',
    className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  },
  meetup: {
    label: 'Meetup',
    className: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  },
};

export const UPDATE_TYPE_LABELS: Record<
  UpdateFrontmatter['type'],
  { label: string; className: string }
> = {
  winner: {
    label: 'Winner',
    className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  },
  challenge: {
    label: 'Challenge',
    className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  },
  workshop: {
    label: 'Workshop',
    className: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  },
  announcement: {
    label: 'Announcement',
    className: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  },
};
