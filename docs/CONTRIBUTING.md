# Contributing to AWS Cloud Club VIT Pune Website

Welcome! This site is built by students, for students. If you're a first-year joining the team, start here.

## Before you start

1. **Read the [Content Guide](CONTENT_GUIDE.md)** — most contributions are Markdown files, not code.
2. For code changes, read the [BUILD_PLAN.md](../BUILD_PLAN.md) to understand the architecture.
3. Check open issues and PRs before starting work — someone may already be on it.

---

## Setup (one-time)

```bash
# 1. Clone the repo
git clone https://github.com/dhonde290-netizen/vcloudops.git
cd vcloudops

# 2. Install dependencies
pnpm install

# 3. Copy the env file
cp .env.example .env.local
# Fill in any values you need (most are only needed for Phase 3+)

# 4. Start the dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Workflow

### All work goes through Pull Requests

`main` is a protected branch. Direct pushes are blocked.

```
main (protected)
  └── feature/your-feature-name   ← your branch
```

### Step by step

1. **Create a branch** from `main`:

   ```bash
   git checkout -b feat/events-page
   ```

2. **Make your changes** (keep them focused — one thing per PR)

3. **Commit** using Conventional Commits:

   ```
   feat(events): add upcoming event list
   fix(navbar): close menu on link click
   docs(content): add guide template
   chore(deps): upgrade tailwindcss
   ```

   The commit-msg hook will reject non-conventional messages.

4. **Push** and open a PR on GitHub:

   ```bash
   git push origin feat/events-page
   ```

5. **Fill the PR description** — include:
   - What changed and why
   - Vercel preview link (auto-posted as a comment)
   - Screenshots for UI changes

6. **Get one review** from a core team member

7. **Merge** — only after CI passes (lint + typecheck + build)

---

## CI checks (must pass before merge)

| Check      | Command          | Fails on        |
| ---------- | ---------------- | --------------- |
| ESLint     | `pnpm lint`      | Any lint error  |
| TypeScript | `pnpm typecheck` | Any type error  |
| Build      | `pnpm build`     | Any build error |

Run these locally before pushing:

```bash
pnpm lint && pnpm typecheck && pnpm build
```

---

## Code style

- **TypeScript strict mode** — no `any`, no `as unknown as X` unless unavoidable
- **Prettier** formats on save (VSCode) and on commit (husky)
- **Tailwind CSS** for all styles — no inline styles, no separate CSS files for components
- **No secrets in code** — use env vars from `.env.local`
- Comments on non-obvious code are encouraged; the team includes beginners

---

## Branch protection rules (set in GitHub → Settings → Branches)

- `main` requires: 1 approving review, passing CI, no stale approvals
- Force push to `main` is blocked

---

## Questions?

Open a GitHub Discussion or ask in the team WhatsApp group.
