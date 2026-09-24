# Branding Guidelines — AWS Cloud Club VIT Pune

> **Status:** Placeholder. The club lead will provide the official AWS Cloud Clubs brand guidelines PDF/link. Update this file when received.

## What is settled right now

| Item                 | Status                                                                                           |
| -------------------- | ------------------------------------------------------------------------------------------------ |
| Primary brand colour | **AWS Orange — `#FF9900`** (confirmed)                                                           |
| Logo file            | Pending — use `components/Logo.tsx` placeholder until received                                   |
| Logo rules           | Do not alter or recreate the AWS logo. Swap it in one place: `components/Logo.tsx`.              |
| Font                 | System font stack for Phase 1; upgrade to Inter/Outfit in Phase 4 after brand guidelines confirm |

## Colour palette (provisional)

| Token              | Hex       | Usage                                        |
| ------------------ | --------- | -------------------------------------------- |
| Brand orange       | `#FF9900` | CTAs, links, active states, accents          |
| Brand dark         | `#232F3E` | AWS dark navy — use for dark headers/footers |
| Background (light) | `#FFFFFF` | Page background                              |
| Background (dark)  | `#0A0A0A` | Dark mode background                         |
| Text primary       | `#111827` | Body text                                    |
| Text secondary     | `#6B7280` | Subtext, metadata                            |

## Using the logo

```tsx
// Always import from the single swappable component:
import Logo from '@/components/Logo';

// Use it in your JSX:
<Logo size={40} />;
```

When the official logo arrives:

1. Place the SVG/PNG in `/public/logo.svg` (or `.png`)
2. Open `components/Logo.tsx` and swap the placeholder `<svg>` for an `<Image>` tag
3. Done — all pages update automatically

## What not to do

- ❌ Do not add inline logo SVGs to individual pages
- ❌ Do not hardcode a different shade of orange anywhere — use `text-orange-500` (Tailwind) or the CSS token
- ❌ Do not create a second logo component
- ❌ Do not use the AWS logo in a way that implies official AWS endorsement beyond what the Cloud Clubs programme allows
