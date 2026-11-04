# Architecture & Maintenance Guide

## Principles

1. **Separation of concerns:** Content never lives in components. Components never read `process.env`.
2. **Deploy-agnostic:** Works with `npm run build` anywhere (Node, static host, Docker). No vendor lock-in.
3. **Single source of design truth:** `design-system/kdev/MASTER.md` plus documented overrides in `design-system/kdev/pages/overrides.md`.
4. **Honesty rules:** We are a new team of 8. Allowed factual numbers: 8 specialists, 3 service lines, 1 delivered MVP. Never claim "years of experience", fake ratings, or "live" clients.

## Folder structure & layering

```
src/
├── app/                  # Next.js App Router layer (composition, metadata, static routes)
│   ├── layout.tsx        # HTML shell, fonts, JSON-LD Organization schema, skip link
│   ├── page.tsx          # Composes sections in order, passes typed content props
│   ├── globals.css       # Tailwind @theme tokens, base styles, glassmorphism utilities
│   ├── sitemap.ts        # Static sitemap
│   ├── robots.ts         # Static robots.txt
│   ├── icon.svg          # Favicon
│   └── fonts/            # Self-hosted WOFF2 variable fonts
│
├── content/              # Content layer: typed, validated at import time via Zod
│   ├── _shared.ts        # Shared Zod primitives (roles, icon names, sectionIds)
│   ├── site.ts           # Company metadata, contact endpoints, socials
│   ├── nav.ts            # Header/footer nav items and a11y labels
│   ├── hero.ts           # Headline, subheadline, CTAs, factual numbers
│   ├── audiences.ts      # Startups, SMEs (UMKM), Mid-sized companies
│   ├── services.ts       # Web, Custom Systems, Mobile
│   ├── projects.ts       # Featured case study (creator support platform)
│   ├── process.ts        # 6-step delivery workflow + role ownership mapping
│   ├── team.ts           # 8 specialists (roles, names, initials, socials)
│   ├── stack.ts          # Grouped technology chips
│   ├── next.ts           # "Building our own products" teaser
│   ├── faq.ts            # 6 non-committal FAQ items (marked // REVIEW)
│   ├── contact.ts        # Form labels, error copy, select options
│   └── index.ts          # Barrel re-export + assertContentConsistency()
│
├── components/
│   ├── ui/               # Reusable, content-agnostic primitives
│   │   ├── button.tsx    # Button and Link variant with accessible focus rings
│   │   ├── badge.tsx     # Neutral, primary, and accent pill badges
│   │   ├── card.tsx      # Standard card with optional interactive hover
│   │   ├── container.tsx # Max-width responsive container (max-w-content)
│   │   ├── field.tsx     # Form field wrapper with linked label & inline error
│   │   ├── icon.tsx      # Decorative Lucide icon mapped through lib/icons
│   │   ├── reveal.tsx    # Scroll reveal using motion (respects prefers-reduced-motion)
│   │   └── section.tsx   # Consistent vertical rhythm, h2, eyebrow, anchor ID
│   │
│   ├── layout/           # Global chrome
│   │   ├── header.tsx    # Sticky glass header with desktop nav & CTA
│   │   ├── mobile-nav.tsx# Keyboard-navigable hamburger drawer
│   │   ├── footer.tsx    # Wordmark, nav links, copyright, optional socials
│   │   └── wordmark.tsx  # SVG mark + mono brand text
│   │
│   └── sections/         # Feature sections (one folder per section)
│       ├── hero/
│       ├── audiences/
│       ├── services/
│       ├── case-study/
│       ├── process/
│       ├── team/
│       ├── stack/
│       ├── next/
│       ├── faq/
│       └── contact/
│
└── lib/                  # Shared utilities
    ├── cn.ts             # clsx + twMerge helper
    ├── env.ts            # The ONLY file that reads process.env
    ├── icons.ts          # Named Lucide icon registry
    ├── json-ld.ts        # Schema.org Organization generator
    └── form/             # Contact form validation & submission
        ├── validate.ts   # Pure validation logic (Zod-free runtime)
        └── submit.ts     # Formspree / Web3Forms / mailto submitter
```

## How-to Recipes

### 1. How do I add or change a team member?

1. Open `src/content/team.ts`.
2. Update the `members` array. Every entry requires `role`, `name`, `github` (URL or `""`), and `linkedin` (URL or `""`).
3. If changing the team size, update the Zod schema length (`.length(8)`) and the cross-file check in `src/content/index.ts`.
4. Run `npm test` and `npm run check:content`.

### 2. How do I add a new service or edit existing ones?

1. Open `src/content/services.ts`.
2. Add or edit an item in `services.items`. Each item has `id`, `title`, `icon` (must be in `src/lib/icons.ts`), `summary`, `deliverables`, and `useCases`.
3. The layout automatically renders the first service as the wide hero card in the bento grid.

### 3. How do I add a case study?

1. Open `src/content/projects.ts`.
2. Add a new item to `projects.items`.
3. Fill in `challenge`, `solution`, `features`, `stack`, `role`, and `outcome`.
4. When real screenshots become available, place images in `public/projects/<slug>-1.png` and update `screenshots: [{ alt: "...", src: "/projects/<slug>-1.png" }]`.
5. Remember the honesty rule: never claim a paused MVP is live, and never disclose client financials.

### 4. How do I change brand colors or fonts?

1. Open `src/app/globals.css`.
2. Update the CSS variables under `@theme`:
   - `--color-primary`: Main brand color (currently Trust Blue `#2563EB`)
   - `--color-accent`: High-contrast CTA color (currently `#C2410C`, overrides MASTER `#EA580C`)
   - `--color-background`, `--color-card`, etc.
3. If changing fonts, replace the WOFF2 files in `src/app/fonts/` and update the `localFont` imports in `src/app/layout.tsx`.
4. Document any deliberate deviation from `design-system/kdev/MASTER.md` in `design-system/kdev/pages/overrides.md`.

### 5. How do I add a new section?

1. Define the section ID in `src/content/_shared.ts` under `sectionIds`.
2. Create the content file `src/content/<section>.ts` with its Zod schema, and export it from `src/content/index.ts`.
3. Create the component under `src/components/sections/<section>/<section>.tsx` using `<Section id={...}>`.
4. Add the component to `src/app/page.tsx`.
5. If the section should appear in the navigation, add it to `src/content/nav.ts`.

### 6. How do I swap the content layer for a headless CMS or i18n?

1. Every section component receives its data strictly via props typed with `z.infer<typeof ...Schema>`.
2. Replace the static objects in `src/content/*.ts` with async fetchers that query your CMS and validate the response against the existing Zod schemas (`await schema.parseAsync(await res.json())`).
3. Make `src/app/page.tsx` async and pass the fetched content into the section components.
4. Component JSX remains 100% untouched.
