# AWS Cloud Club — VIT Pune

> **The official website of AWS Cloud Club at Vishwakarma Institute of Technology, Pune.**
> Events · Workshops · Updates · Guides · Team · Join · Student Queries

[![CI](https://github.com/dhonde290-netizen/vcloudops/actions/workflows/ci.yml/badge.svg)](https://github.com/dhonde290-netizen/vcloudops/actions/workflows/ci.yml)

---

## Tech stack

| Layer     | Technology                                                |
| --------- | --------------------------------------------------------- |
| Framework | Next.js 16 (App Router) + TypeScript (strict)             |
| Styling   | Tailwind CSS v4                                           |
| Content   | Markdown files in `content/` (gray-matter + Zod, Phase 2) |
| Database  | Supabase (queries feature only, Phase 3)                  |
| Hosting   | Vercel                                                    |
| PWA       | Serwist (Phase 5)                                         |

---

## Getting started

```bash
# Prerequisites: Node.js ≥ 20, pnpm

git clone https://github.com/dhonde290-netizen/vcloudops.git
cd vcloudops
pnpm install
cp .env.example .env.local   # fill in values as needed
pnpm dev                     # → http://localhost:3000
```

---

## Project structure

```
app/              # Next.js App Router pages and API routes
  (site)/         # Public-facing pages (events, workshops, guides, etc.)
  admin/          # Team-only admin view (Phase 4)
  api/            # API routes (queries, ICS calendar)
components/       # Shared React components (Navbar, Footer, Logo, etc.)
content/          # Markdown/JSON content files (Phase 2)
  events/
  workshops/
  updates/
  guides/
  team/
lib/              # Data-access layer (content.ts, queries.ts, ics.ts)
docs/             # Team documentation (BRANDING, CONTENT_GUIDE, CONTRIBUTING)
public/           # Static assets
.github/          # CI workflow
```

---

## Adding content

See **[docs/CONTENT_GUIDE.md](docs/CONTENT_GUIDE.md)** — no code required.

---

## Contributing code

See **[docs/CONTRIBUTING.md](docs/CONTRIBUTING.md)**.

---

## Build phases

| Phase              | Status  | Description                              |
| ------------------ | ------- | ---------------------------------------- |
| 1 — Foundation     | ✅ Done | Repo, tooling, layout, shell pages, CI   |
| 2 — Content engine | 🔜 Next | Markdown parsing, all content pages live |
| 3 — Queries        | ⬜      | Supabase form, API, rate limiting        |
| 4 — Admin + polish | ⬜      | Admin triage, homepage, Lighthouse pass  |
| 5 — PWA            | ⬜      | Manifest, service worker, install banner |

---

## CI

Every PR runs: **ESLint → TypeScript → Prettier → Next.js build**

`main` is protected — at least one review required before merge.
