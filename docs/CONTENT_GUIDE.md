# Content Guide — How to Post in 5 Minutes

This guide is for the weekly content owner and anyone who wants to add or update club content. You do not need to know how to code.

## The golden rule

**Everything lives in the `content/` folder as Markdown files.** Open a PR, fill the template, get one approval → it's live.

---

## How to post a new update (weekly content owner)

1. Copy `content/updates/_template.md` to `content/updates/YYYY-MM-DD-short-title.md`
2. Fill in the frontmatter fields (see below)
3. Write the body in plain Markdown
4. Open a pull request against `main`
5. Get one team review
6. Merge → Vercel deploys automatically

**Target time: under 5 minutes.**

---

## Frontmatter reference

### Update (`content/updates/*.md`)

```yaml
---
title: 'Winner of April Week 2 Challenge'
date: '2024-04-14'
type: 'winner' # winner | challenge | workshop | announcement
summary: 'Arjun Sharma won the S3 static site challenge.'
pinned: false # set true to pin to the top of the feed
---
Write the full update body here in Markdown.
```

### Event (`content/events/*.md`)

```yaml
---
title: 'Introduction to AWS Lambda'
date: '2024-04-20T15:00:00+05:30'
endDate: '2024-04-20T17:00:00+05:30' # optional
location: 'Room 301, VIT Pune Main Building'
type: 'workshop' # workshop | session | challenge | meetup
registrationUrl: 'https://forms.google.com/...' # optional
poster: '/events/lambda-poster.jpg' # optional, place file in public/events/
workshopSlug: 'intro-lambda' # optional, links to workshop archive entry
draft: false # set true to hide from the site
---
Write the event description here.
```

### Workshop (`content/workshops/*.md`)

```yaml
---
title: 'Intro to AWS Lambda'
date: '2024-04-20'
speaker: 'Priya Patil'
summary: 'An intro to serverless computing with AWS Lambda.'
recordingUrl: 'https://youtube.com/watch?v=...' # add after the session
slidesUrl: 'https://drive.google.com/...' # optional
resources:
  - label: 'Lambda docs'
    url: 'https://docs.aws.amazon.com/lambda/'
tags:
  - Lambda
  - serverless
  - beginner
---
Write session notes or a summary here.
```

### Guide (`content/guides/*.md`)

```yaml
---
title: 'Setting Up Your AWS Free Tier Account'
order: 1 # controls list order on the Guides page
summary: 'Step-by-step account creation and billing alert setup.'
lastReviewed: '2024-04-01'
---
Write the guide content here. Use code blocks, numbered steps, and screenshots (in public/guides/).
```

---

## Rules for content

- **Never commit secrets** (access keys, passwords). If a guide needs a placeholder, use `YOUR_ACCESS_KEY_HERE`.
- Slugs come from the filename: `content/events/intro-lambda.md` → `/events/intro-lambda`
- Set `draft: true` while you're writing; remove it when ready to publish
- Add images to `public/events/`, `public/workshops/`, or `public/guides/` and reference them as `/events/my-image.jpg`
- `lastReviewed` on guides must be kept up to date — guides older than 12 months show a "may be outdated" warning

---

## Who posts what

| Content type           | Owner                        | Backup | Frequency          |
| ---------------------- | ---------------------------- | ------ | ------------------ |
| Weekly update          | Named junior core member     | VP     | Every week         |
| New event              | Any core member              |        | When scheduled     |
| Workshop archive entry | Workshop speaker / organiser |        | After each session |
| Guide update           | Any core member              |        | When AWS changes   |

Questions? Ask in the team WhatsApp group.
