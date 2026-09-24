/**
 * lib/content.ts — Content loading and parsing layer
 *
 * ALL content reading goes through this file.
 * Pages must never import 'fs' or 'gray-matter' directly.
 * This makes it easy to swap the content source later (e.g., a CMS).
 *
 * Phase 2: Full implementation with gray-matter + Zod validation.
 *
 * Phase 1: Type stubs only — will fail to compile if used directly.
 *           This file documents the interface that Phase 2 will implement.
 */

// ─── Shared types ──────────────────────────────────────────────────────────

/** An event loaded from content/events/<slug>.md */
export interface EventFrontmatter {
  title: string;
  date: string; // ISO 8601
  endDate?: string;
  location: string;
  type: 'workshop' | 'session' | 'challenge' | 'meetup';
  registrationUrl?: string;
  poster?: string;
  workshopSlug?: string;
  draft?: boolean;
}

export interface Event extends EventFrontmatter {
  slug: string;
  body: string; // Markdown body text (not rendered HTML)
}

/** A workshop loaded from content/workshops/<slug>.md */
export interface WorkshopFrontmatter {
  title: string;
  date: string;
  speaker: string;
  summary: string;
  recordingUrl?: string;
  slidesUrl?: string;
  resources?: { label: string; url: string }[];
  tags?: string[];
}

export interface Workshop extends WorkshopFrontmatter {
  slug: string;
  body: string;
}

/** An update loaded from content/updates/<slug>.md */
export interface UpdateFrontmatter {
  title: string;
  date: string;
  type: 'winner' | 'challenge' | 'workshop' | 'announcement';
  summary: string;
  pinned?: boolean;
}

export interface ClubUpdate extends UpdateFrontmatter {
  slug: string;
  body: string;
}

/** A guide loaded from content/guides/<slug>.md */
export interface GuideFrontmatter {
  title: string;
  order: number;
  summary: string;
  lastReviewed: string; // ISO 8601 date
}

export interface Guide extends GuideFrontmatter {
  slug: string;
  body: string;
}

/** A team member loaded from content/team/<slug>.json */
export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  year: string;
  photo: string;
  linkedin?: string;
  github?: string;
  group: 'core' | 'alumni';
  order: number;
}

// ─── TODO Phase 2: implement these functions ────────────────────────────────
// Each function should:
//   1. Read files from the content/ directory (use fs/promises)
//   2. Parse frontmatter with gray-matter
//   3. Validate frontmatter with Zod (fail the build on error)
//   4. Return typed objects

export async function getAllEvents(): Promise<Event[]> {
  throw new Error('getAllEvents: not implemented — coming in Phase 2');
}

export async function getEventBySlug(_slug: string): Promise<Event | null> {
  throw new Error('getEventBySlug: not implemented — coming in Phase 2');
}

export async function getAllWorkshops(): Promise<Workshop[]> {
  throw new Error('getAllWorkshops: not implemented — coming in Phase 2');
}

export async function getWorkshopBySlug(_slug: string): Promise<Workshop | null> {
  throw new Error('getWorkshopBySlug: not implemented — coming in Phase 2');
}

export async function getAllUpdates(): Promise<ClubUpdate[]> {
  throw new Error('getAllUpdates: not implemented — coming in Phase 2');
}

export async function getUpdateBySlug(_slug: string): Promise<ClubUpdate | null> {
  throw new Error('getUpdateBySlug: not implemented — coming in Phase 2');
}

export async function getAllGuides(): Promise<Guide[]> {
  throw new Error('getAllGuides: not implemented — coming in Phase 2');
}

export async function getGuideBySlug(_slug: string): Promise<Guide | null> {
  throw new Error('getGuideBySlug: not implemented — coming in Phase 2');
}

export async function getAllTeamMembers(): Promise<TeamMember[]> {
  throw new Error('getAllTeamMembers: not implemented — coming in Phase 2');
}
