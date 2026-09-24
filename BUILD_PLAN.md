# AWS Cloud Club VIT Pune: Club Web App (PWA) - Build Plan

## 0. Product summary

A fast, mobile-first website for the AWS Cloud Club at VIT Pune, progressively enhanced into an installable PWA. It serves club members and prospective members: events, workshop archive, weekly updates, setup guides, team info, joining, and a student queries form.

Primary audience: VIT Pune students on phones. Optimize for mobile first, low-bandwidth, fast load.

## 1. Tech stack (fixed, do not substitute)

- Framework: Next.js (App Router) + TypeScript (strict mode)
- Styling: Tailwind CSS
- Content: Markdown/MDX files in the repo (content/ directory), parsed with gray-matter + next-mdx-remote (or contentlayer alternative)
- Database (queries feature only): Supabase (Postgres) with Row Level Security
- Hosting: Vercel (preview deploys per PR)
- PWA: Serwist (added in Phase 5, not before)
- Linting/formatting: ESLint + Prettier, enforced via pre-commit (husky + lint-staged)
- Package manager: pnpm
- Portability rule: no Vercel-specific APIs (no Vercel KV/Blob/Edge Config). Keep all data access behind a thin `lib/` layer so the app can later move to AWS Amplify or S3/CloudFront + Lambda without rewrites.

## 2. Repo structure

```
/app
  /(site)
    page.tsx                  # Home
    events/page.tsx           # Event list
    events/[slug]/page.tsx    # Event detail
    workshops/page.tsx        # Workshop archive
    workshops/[slug]/page.tsx # Workshop detail (slides, recording, resources)
    updates/page.tsx          # Updates feed (winners, challenges, announcements)
    updates/[slug]/page.tsx
    guides/page.tsx           # Setup guidelines index
    guides/[slug]/page.tsx
    team/page.tsx             # Core team + alumni
    join/page.tsx             # Membership info + join form link
    queries/page.tsx          # Student queries form
  /api
    /queries/route.ts         # POST handler for queries
    /calendar.ics/route.ts    # ICS feed of events
  /admin
    /queries/page.tsx         # Team-only view (see section 6)
/components                   # Shared UI components
/content
  /events/*.md
  /workshops/*.md
  /updates/*.md
  /guides/*.md
  /team/*.json
/lib
  content.ts                  # Content loading/parsing
  queries.ts                  # Data-access layer for queries (Supabase behind this)
  ics.ts                      # ICS generation
/public                       # Static assets, icons, manifest
/docs
  BRANDING.md                 # Brand guideline reference (link/PDF from club lead)
  CONTENT_GUIDE.md            # How to post an update / workshop / event
  CONTRIBUTING.md
```

## 3. Content schemas (frontmatter, all files are Markdown)

### Event (content/events/<slug>.md)

```yaml
title: string
date: ISO 8601 datetime
endDate: ISO 8601 datetime (optional)
location: string (physical room or "Online")
type: "workshop" | "session" | "challenge" | "meetup"
registrationUrl: string (optional)
poster: string (path under /public/events, optional)
workshopSlug: string (optional, links event to its archive entry)
draft: boolean (default false)
body: markdown description
```

### Workshop (content/workshops/<slug>.md)

```yaml
title, date, speaker, summary
recordingUrl (YouTube/Drive, optional until uploaded)
slidesUrl (optional)
resources: array of { label, url }
tags: array of strings (e.g. "S3", "Lambda", "beginner")
body: markdown notes
```

### Update (content/updates/<slug>.md)

```yaml
title, date
type: "winner" | "challenge" | "workshop" | "announcement"
summary: string (one line, shown in feed cards)
pinned: boolean (default false)
body: markdown
```

### Guide (content/guides/<slug>.md)

```yaml
title, order (number), summary, lastReviewed (date)
body: markdown
```

### Team member (content/team/<slug>.json)

```json
{ "name", "role", "year", "photo", "linkedin" (optional), "github" (optional),
  "group": "core" | "alumni", "order": number }
```

Validate all frontmatter with Zod at build time. A malformed content file must fail the build with a clear error naming the file.

## 4. Feature specs

### 4.1 Home

- Hero: club name, one-line mission, primary CTA "Join the club"
- Next upcoming event card (auto-selected from events by date)
- Latest 3 updates
- Quick links: Events, Workshops, Guides, Ask a Query

### 4.2 Events (Calendar)

- Default view: chronological list, upcoming first, past events collapsed below
- Filter by type
- Per event: "Add to Google Calendar" link and .ics download
- /calendar.ics endpoint returns a subscribable feed of all non-draft events
- Do NOT build a custom calendar grid UI in v1

### 4.3 Workshops archive

- Card grid, filter by tag, search by title
- Detail page: embedded recording (YouTube embed, lazy-loaded), slides link, resources list, notes
- Show "Recording coming soon" if recordingUrl is absent

### 4.4 Updates feed

- Reverse-chronological feed, filter by type, pinned items first
- Winners and weekend challenges are just update types, no special UI in v1
- RSS feed at /updates/rss.xml

### 4.5 Setup guides

- Ordered list of guides (AWS account setup, budgets/alerts, CLI setup, etc.)
- Table of contents on detail pages, copy button on code blocks
- Show lastReviewed date; guides older than 12 months display a "may be outdated" notice

### 4.6 Team

- Core team grid, then alumni section
- Static data only, no login or editing UI

### 4.7 Join

- Why join, what members get, how to join
- Button linking to an external form (Google Form) in v1; do not build custom membership storage

### 4.8 Student Queries

- Public form at /queries: fields = name, VIT email (must end with the college domain, configurable via env var), category (dropdown: Club/Membership, AWS/Cloud help, Events, Other), message (max 1000 chars)
- No login
- Anti-abuse: honeypot hidden field, IP-based rate limit (max 3 submissions per IP per hour), server-side validation with Zod, message sanitization
- POST /api/queries writes to the Supabase `queries` table via lib/queries.ts
- Table columns: id (uuid), created_at, name, email, category, message, status ("new" | "answered" | "closed"), answered_by (nullable), reply (nullable)
- Row Level Security: anonymous role can INSERT only; no anonymous SELECT/UPDATE/DELETE
- Success screen: "We received your query. Expect a reply within 3 days" (SLA value in config)
- Do not display other people's queries publicly in v1

## 5. Non-functional requirements

- Lighthouse targets (mobile): Performance >= 90, Accessibility >= 95, Best Practices >= 95, SEO >= 90
- WCAG 2.1 AA: semantic HTML, keyboard navigable, color contrast checked, alt text on all images
- Images: next/image, WebP/AVIF, explicit dimensions, lazy loading below the fold
- No secrets in the repo; use .env.local and Vercel environment variables; commit .env.example
- Security headers configured in next.config (CSP, X-Frame-Options, Referrer-Policy)
- Dark mode support via Tailwind, respecting prefers-color-scheme

## 6. Admin view (queries triage)

- Minimal, v1: /admin/queries protected by Supabase Auth (email magic link), allowlist of team emails in an env var
- Table of queries with status filter; buttons to mark answered/closed and add a reply note
- Do not build a general admin CMS. Content is managed through Git.
- Replies go out by email manually from the club address in v1; storing the reply is for tracking only

## 7. PWA (Phase 5 only)

- Web app manifest: name, short_name, theme color, icons (192, 512, maskable)
- Serwist service worker: precache app shell, runtime cache for content pages (stale-while-revalidate), offline fallback page
- Install prompt: show a dismissible custom banner only after the user's second visit
- Push notifications: OUT OF SCOPE for v1 (iOS support is limited and requires install)
- The site must remain fully functional without the service worker

## 8. Branding

- Follow the AWS Cloud Clubs brand guidelines stored at docs/BRANDING.md (placeholder until the club lead provides it). Do not invent logos. Use a placeholder logo component that can be swapped in one place (components/Logo.tsx)

## 9. Phases and definition of done

**Phase 1 — Foundation:** repo setup, Next.js + TS + Tailwind + ESLint/Prettier/husky, CI (lint, typecheck, build on PR), Vercel connected, layout with nav/footer, empty pages deploying.
**Done when:** a PR triggers a preview and CI passes.

**Phase 2 — Content engine:** Zod schemas, content loaders, sample content for every type, Events + Workshops + Updates + Guides + Team pages rendering from Markdown, ICS endpoint, RSS.
**Done when:** adding a Markdown file and opening a PR produces a live preview page with no code changes.

**Phase 3 — Queries:** Supabase project, table + RLS, form, API route, rate limiting, honeypot.
**Done when:** a valid submission appears in the table and an invalid or rate-limited one is rejected.

**Phase 4 — Admin + polish:** admin queries view with auth, Home page, Join page, accessibility pass, Lighthouse pass, dark mode.
**Done when:** Lighthouse targets are met on the deployed preview.

**Phase 5 — PWA:** manifest, Serwist, offline fallback, install banner.
**Done when:** app is installable on Android Chrome and shows the offline page without network.

## 10. Team roles (for task assignment)

- Design lead: Figma mockups, Tailwind theme tokens, shared components
- Frontend dev: pages, content rendering, PWA
- Backend/infra dev: Supabase, API route, RLS, admin auth, CI, deployment
- Content/QA/PM: content templates, sample content, mobile testing, roadmap, weekly content rota

## 11. Workflow rules

- `main` is protected; all work through feature branches and pull requests, minimum one review
- Conventional commit messages
- Each PR must include a preview link and pass CI
- Weekly content: a named content owner (junior core member) posts one update per week via PR using the template in docs/CONTENT_GUIDE.md, with the president/VP as owner of record and a named backup

## 12. Out of scope for v1 (do not build)

- Community member profiles / directory
- User accounts for students
- Quizzes
- AWS integrated builder/sandbox environment
- Push notifications
- Custom calendar grid UI
- General-purpose CMS/admin panel
