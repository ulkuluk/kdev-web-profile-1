# Architecture & Maintenance Guide (v2)

## Principles

1. **Separation of concerns:** Content never lives in components. Components never read `process.env`.
2. **Deploy-agnostic:** Works with `npm run build` anywhere (Node, static host, Docker). No vendor lock-in.
3. **Single source of design truth:** `design-system/kdev/MASTER.md` defines "The Engineering Spec" visual identity tokens and component specifications.
4. **Honesty rules:** We are a dedicated team of 8 specialists. Allowed factual numbers: 8 specialists, 3 service lines, 1 delivered MVP (Petepete). Never claim "years of experience", fake ratings, fake logos, or that a paused project is live.
5. **No unwritten code:** Scope, milestones, and price are agreed in writing under a binding MoU before any development begins.

---

## Visual Identity & Tokens (v2 — The Engineering Spec)

- **Canvas & Palette:**
  - Background: Warm architectural drafting paper (`#F4F3EF`)
  - Foreground / Ink: Deep carbon drafting ink (`#12151A`)
  - Accent: Verdigris teal (`#0F766E`, AAA >7.1:1 contrast against paper)
  - Surface: Crisp white drafting sheet (`#FFFFFF`)
  - Dark Band: High-contrast ink band (`#12151A`) behind the Petepete media slot on Home
- **Typography:**
  - Display / Headings: `Epilogue` (Google Font via `next/font/google`, weights 600, 700, 800)
  - Body Text: `Source Serif 4` (Google Font via `next/font/google`, weights 400, 600)
  - Technical & UI Monospace: `IBM Plex Mono` (Google Font via `next/font/google`, weights 400, 500, 600)
- **Signature UI:**
  - Signed Scope MoU Docket with clause inspection and verified covenant badges (§ 01.1–01.3).
  - Subtle interactive state animations respecting `prefers-reduced-motion`.
  - Precision device frames and terminal/code telemetry snippets.

---

## MDX Approach Justification

Case studies are authored as MDX documents in `src/content/work/<slug>.mdx`.
We use `next-mdx-remote/rsc` for MDX rendering:

1. **App Router Native:** Runs entirely within React Server Components. MDX compilation happens during static page generation (`npm run build`), producing zero client-side compiler overhead.
2. **Bundler Agnostic:** Does not require complex webpack or Turbopack loader plugins in `next.config.ts`.
3. **Strict Build-Time Validation:** Frontmatter is parsed via `yaml` and validated against Zod (`caseStudyFrontmatterSchema`) before rendering. Invalid frontmatter fails the build immediately.
4. **Rich Custom Components:** Exposes `<Figure>`, `<Video>`, `<Gallery>`, `<Timeline>`, `<Callout>`, `<DeviceFrame>`, and `<Stat>`.

---

## Folder Structure & Layering

```
src/
├── app/                       # Next.js App Router layer (multi-page static routes)
│   ├── layout.tsx             # HTML shell, fonts (Epilogue, Source Serif 4, IBM Plex Mono), JSON-LD
│   ├── page.tsx               # Home: Hero, Pillars, Featured Work, Engagement Flow, CTA Banner
│   ├── globals.css            # Tailwind @theme tokens, drafting grid, hard shadows
│   ├── sitemap.ts             # Static sitemap including all /work/<slug> routes
│   ├── robots.ts              # Robots.txt
│   ├── icon.svg               # Architectural favicon
│   ├── services/page.tsx      # Services & MoU Engagement Protocol + FAQ
│   ├── work/page.tsx          # Case study portfolio index + "Your project could be next"
│   ├── work/[slug]/page.tsx   # Dynamic case study page (MDX Remote Server Component)
│   ├── about/page.tsx         # 8-specialist team, operating principles, toolbox
│   └── contact/page.tsx       # Startup MVP brief form, direct WhatsApp, and email
│
├── content/                   # Content layer: typed and validated at build time via Zod
│   ├── _shared.ts             # Shared Zod primitives (roles, routes, sectionIds)
│   ├── site.ts                # Company metadata, contact endpoints, socials
│   ├── nav.ts                 # Multi-page header/footer nav items and a11y labels
│   ├── hero.ts                # Headline, subheadline, CTAs, signed docket clauses
│   ├── pillars.ts             # 4 operational commitments
│   ├── services.ts            # MVP offer, phase deliverables, pricing principles, capabilities
│   ├── about.ts               # Principles, team composition, toolbox
│   ├── contact.ts             # Startup brief fields, stages, timelines, budget options
│   ├── faq.ts                 # 6 non-committal FAQ items (marked // REVIEW)
│   ├── work.ts                # Case study frontmatter schema, MDX file parser & loader
│   ├── work/<slug>.mdx        # Narrative case studies (Petepete seed)
│   └── index.ts               # Barrel re-export + assertContentConsistency()
│
├── components/
│   ├── ui/                    # Content-agnostic, reusable primitives (Button, Card, Section, Badge)
│   ├── mdx/                   # Case study MDX components (Figure, Video, Timeline, DeviceFrame)
│   ├── layout/                # Global chrome (Header, MobileNav, Footer, Wordmark)
│   └── sections/              # Page feature sections
│       ├── hero/              # Hero, SignedScopeDocket
│       ├── pillars/           # Pillars strip
│       ├── featured-work/     # Featured case study display
│       ├── engagement-flow/   # 5-step delivery process with MoU anchor
│       ├── cta-banner/        # High-contrast bottom CTA
│       ├── services/          # ServicesOverview (offer, inclusions, phases, capabilities, FAQ)
│       └── contact/           # Startup brief contact form
│
└── lib/                       # Shared utilities
    ├── cn.ts                  # clsx + twMerge helper
    ├── env.ts                 # The ONLY file that reads process.env
    ├── icons.ts               # Named Lucide icon registry
    ├── json-ld.ts             # Schema.org Organization generator
    └── form/                  # Pure validation & submission helpers
```

---

## How-to Recipes

### 1. How do I add a new case study?

Follow `docs/ADDING-WORK.md`:

1. Drop screenshots into `media-source/work/<slug>/`.
2. Run `npm run media` to optimize images to WebP/AVIF in `public/work/<slug>/`.
3. Create `src/content/work/<slug>.mdx` with complete frontmatter and body narrative.
4. The project automatically appears on `/work`, `/sitemap.xml`, and `/work/<slug>`.

### 2. How do I optimize media assets?

Run:

```bash
npm run media
```

Original files in `media-source/work/<slug>/` are converted into WebP and AVIF formats in `public/work/<slug>/` with dimensions written to `manifest.json`.

### 3. How do I run the content placeholder and media check?

Run:

```bash
npm run check:content
```

This fails if any `TODO:` strings, `kdev.example`, missing media files, or oversized files (> 8 MB) exist.
_(Note: Not hooked into `npm run build` so development can proceed smoothly)._

### 4. How do I change design tokens?

Update `design-system/kdev/MASTER.md` and `src/app/globals.css` under `@theme`. Never hard-code hex colors or magic numbers inside component files.
