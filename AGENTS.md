# Agent & LLM Architecture Instructions (v2)

This repository is strictly structured into unidirectional layers. When writing or modifying code in this codebase, you must follow the rules below.

## Layering Rules

1. **Content & MDX Layer (`src/content/`):**
   - ALL copy, links, labels, and structured data live here in typed modules.
   - Every file must export a Zod schema (`*Schema`), the inferred TypeScript type, and the parsed content object.
   - Case studies live as MDX documents in `src/content/work/<slug>.mdx`. Frontmatter is parsed and validated at build time with Zod (`caseStudyFrontmatterSchema`).
   - Adding a new case study requires ZERO code modifications; dropping `<slug>.mdx` into `src/content/work/` automatically populates the index, routes, and sitemap.
   - NEVER hard-code copy or strings inside components in `src/components/`.
   - Never invent client names, testimonials, ratings, or live project claims.

2. **UI Primitives (`src/components/ui/`):**
   - Content-agnostic, reusable primitives (Button, Card, Section, Container, Badge, etc.).
   - Styled only with tokens from `src/app/globals.css`. Never use arbitrary hex colors or magic numbers.
   - Primary CTA is styled with high contrast (`#12151A` background, white text, 2px offset box shadow, switching to `#0F766E` on hover).

3. **Sections (`src/components/sections/<section-name>/`):**
   - One folder per section containing the section component and its private sub-components.
   - Section components receive all data via props typed from the content schemas.
   - Section components wrap their content in `<Section id="...">` or container primitives to maintain uniform rhythm.

4. **MDX Components (`src/components/mdx/`):**
   - Custom presentation components for case studies: `Figure`, `Video`, `Gallery`, `Timeline`, `Callout`, `DeviceFrame`, `Stat`.
   - `<Stat>` is strictly limited to factual real numbers (8 specialists, 1 delivered MVP).
   - Missing media gracefully falls back to visible placeholder frames naming the exact expected path.

5. **Layout (`src/components/layout/`):**
   - Global persistent chrome: `Header`, `Footer`, `MobileNav`, `Wordmark`.
   - Navigation links to multi-page routes (`/services`, `/work`, `/about`, `/contact`).

6. **App Router (`src/app/`):**
   - Multi-page App Router architecture:
     - `/`: Home (Hero with signed docket, dark band media showcase, pillars, featured work, engagement flow, CTA banner)
     - `/services`: Full MVP-to-production offer, included/not included, 5-phase engagement flow, pricing approach, capabilities, and FAQ
     - `/work`: Case study index and "Your project could be next" card
     - `/work/[slug]`: Dynamic case study page with MDX content rendering
     - `/about`: 8-specialist team, operating principles, compact toolbox, optional product vision
     - `/contact`: Startup-oriented MVP brief form, direct WhatsApp, and email fallbacks
   - `page.tsx` only composes sections and passes data down. No business logic or copy.
   - `layout.tsx` configures Google Fonts (`Epilogue`, `Source_Serif_4`, `IBM_Plex_Mono`), metadata, JSON-LD, skip links, and HTML structure.

7. **Shared Utilities (`src/lib/`):**
   - `env.ts`: The ONLY file allowed to read `process.env`.
   - `icons.ts`: Named icon mapping for Lucide icons.
   - `cn.ts`: Class name merger (`clsx` + `twMerge`).
   - `form/`: Validation logic and submit handlers for startup brief submissions.

## Media & Content Pipeline

- Source media goes in `media-source/work/<slug>/`.
- Run `npm run media` to optimize images (WebP/AVIF, max 1920px) to `public/work/<slug>/` and output `manifest.json`.
- Videos must be under 8 MB, muted, loop, and never autoplay under `prefers-reduced-motion` or autoplay sound.
- Run `npm run check:content` to audit for remaining `TODO:` strings, `kdev.example`, missing media files, and oversized assets.

## Naming & Conventions

- **Folders:** kebab-case (`featured-work`, `engagement-flow`, `mobile-nav`).
- **Files & Components:** PascalCase for React components (`ContactForm.tsx`), kebab-case for utilities and content (`contact.ts`, `validate.ts`).
- **Exports:** Prefer named exports (`export function Button`).
- **Icons:** Always use vector Lucide icons via `src/lib/icons.ts`. NEVER use emojis for structural or semantic icons.
- **Accessibility:** Interactive elements must have `cursor-pointer`, focus rings must be visible (`:focus-visible`), and icons alongside text must have `aria-hidden="true"`.
