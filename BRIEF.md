You are a senior front-end engineer and UI/UX designer. Build a polished, conversion-focused
company website for "KDEV", a new IT vendor / software house. Work autonomously and deliver a
complete, runnable project. Only stop to ask me something if you are truly blocked.
Deployment is out of scope: I handle it myself. Do not add deploy configs, Dockerfiles, CI
pipelines, or deploy instructions.

## 0. Skills (read these FIRST, before any code)
Skills are installed in .agents/skills/. Each has a SKILL.md. Read the SKILL.md in full before
using a skill; do not guess its commands.

Primary skill: .agents/skills/ui-ux-pro-max/
1. Read .agents/skills/ui-ux-pro-max/SKILL.md.
2. Run its design system generator with a query like
   "software house agency B2B service developer portfolio landing page"
   using `--design-system --persist -p "KDEV"`
   (script: .agents/skills/ui-ux-pro-max/scripts/search.py, requires Python 3; if Python is
   missing, tell me instead of installing anything). This saves design-system/kdev/MASTER.md.
3. Read MASTER.md and follow it for pattern, style, color palette, typography, effects and
   anti-patterns. Pick from the skill's candidate styles; do not default to a generic template.
4. Also query its `ux` domain and `--stack nextjs` guidelines for forms, accessibility, motion.
5. Run its pre-delivery checklist at the end and fix every failure.

Supporting skills (read their SKILL.md first, use only where they clearly help):
- ui-styling: for implementing the Tailwind/component styling.
- design-system: for structuring design tokens, but MASTER.md from ui-ux-pro-max is the single
  source of truth for visual decisions. If two skills conflict, MASTER.md wins.
- brand: we have no brand yet; use it only to help define a minimal brand direction
  (voice, logo/wordmark approach), consistent with MASTER.md.
- Do NOT use: banner-design, slides, design (not needed for this task).

If a skill cannot be run, say so and follow section 7 as the fallback.

## 1. About KDEV
- Team of 8: Project Manager, DevOps, 2 Backend, 2 Frontend, UI/UX Designer, QA.
  Our edge: a complete cross-functional team (PM, design, engineering, QA, DevOps) so clients get
  a whole delivery team, not just coders.
- Services: (1) Web applications, (2) Custom systems (internal tools, dashboards, business
  systems, APIs), (3) Mobile apps.
- Target clients: startups, SMEs (UMKM), and mid-sized companies. Speak to all three without
  sounding generic.
- Long-term: we also want to build our own products. Only tease this as "Coming soon".
- Language: English only. Tone: professional, warm, confident, honest. No hype, no buzzword soup.

## 2. Honesty rules (strict)
- We are a NEW team. Do NOT invent testimonials, client logos, years of experience, project
  counts, ratings, or statistics. Only use facts in this brief.
- Allowed factual numbers: 8 specialists, 3 service lines, 1 delivered MVP.
- Anything I haven't provided must be a clearly marked placeholder, e.g. "TODO: ...", and
  elements with empty optional data (e.g. missing social link) must hide gracefully.
- Do not mention any real brand name of competitors or similar products.

## 3. Pages / sections (single page, anchored nav, sticky header)
1. Header: KDEV wordmark, nav, CTA "Start a project".
2. Hero: strong headline + sub-headline + 2 CTAs ("Start a project", "See our work").
   Include one distinctive visual (e.g. animated architecture/flow diagram, code-and-UI
   composition, or bento-style collage built in SVG/CSS, no stock photos). Write 3 headline
   options in a code comment, use the best one.
3. Who we work with: Startups / SMEs / Mid-sized companies, one card each with what they
   typically need and how we help.
4. Services: Web, Custom Systems, Mobile. What we build, typical deliverables, example use cases.
5. Featured project (case study): a creator donation/support platform (web app for content
   creators to receive donations from fans). Structure: Challenge, Solution, Key features,
   Tech stack, Our role, Outcome. Framing: "MVP delivered, production-ready; the client paused
   the launch." Do NOT say it is live and do NOT mention finances. Use "TODO:" for features,
   stack, screenshots; render tasteful mock UI (SVG/CSS) as placeholder visuals.
6. How we work: process (Discovery -> Design -> Build -> QA -> Launch -> Support), mapping each
   step to the team role responsible.
7. Team: 8 cards (role-based, placeholder names "TODO: Name", initials-avatar fallback,
   optional GitHub/LinkedIn links).
8. Tech stack: grouped chips (Frontend, Backend, Mobile, DevOps, Design/QA), filled with TODO
   values in the content layer. Text chips only, no third-party logos.
9. What's next: "Building our own products" teaser with "Coming soon" badge.
10. FAQ: 5-6 questions (how we start, timelines, pricing model, NDA, post-launch support,
    team size). Keep answers non-committal and mark them `// REVIEW` in the content layer.
11. Contact: form (name, email, company, project type, budget range, message), WhatsApp
    click-to-chat button, email link. Contact details are TODO placeholders.
12. Footer: wordmark, nav, socials (optional), copyright.

## 4. Stack
- Next.js (latest stable, App Router), TypeScript (strict), Tailwind CSS, Motion for animation,
  Lucide icons (SVG, never emojis), next/font for fonts from the skill's pairing.
- No custom backend. Keep the project deploy-agnostic: it must work with a plain
  `npm run build` and must NOT depend on platform-specific features (no Vercel-only APIs,
  no runtime image optimization service requirements, no edge-only code). Use a pre-made static
  OG image instead of dynamically generated ones.
- Contact form posts to a third-party form service (Web3Forms or Formspree) via env var
  NEXT_PUBLIC_FORM_ENDPOINT, with honeypot spam field, client-side validation, loading /
  success / error states, and graceful fallback to mailto if the endpoint is missing.
  Provide .env.example.

## 5. Architecture and maintainability (high priority)
The site must be easy to maintain by a team of 8 and easy to extend months later. Optimize for
readability and low coupling over cleverness.
- Separation of concerns, in layers:
  1. Content layer: ALL copy and data (services, team, stack, FAQ, case study, contact,
     socials, nav) in typed modules under src/content/, one file per domain (e.g. services.ts,
     team.ts, projects.ts, faq.ts, site.ts). Define TypeScript types/interfaces (or zod
     schemas) for each, and validate content at build time. Components never contain hard-coded
     copy. The content layer must be swappable for a CMS or i18n later without touching
     components.
  2. UI primitives: src/components/ui/ (Button, Badge, Card, Section, Container, Input, etc.),
     generic, content-agnostic, styled only with design tokens.
  3. Sections: src/components/sections/<section-name>/ (one folder per section, with its
     sub-components). A section receives data via props typed from the content layer.
  4. Layout: src/components/layout/ (Header, Footer, nav).
  5. App: src/app/ only composes sections and defines metadata; no business logic.
- Design tokens (colors, typography, spacing, radii, shadows, motion durations) defined once in
  Tailwind config / CSS variables, derived from MASTER.md. No magic numbers or hard-coded hex
  values inside components.
- Hooks/utilities in src/lib/ (cn helper, form validation, analytics-free utils). Keep functions
  small and single-purpose. Co-locate component-specific helpers with the component.
- Reusable patterns: one generic Section wrapper (consistent spacing, id for anchors, heading
  structure), one reveal-animation wrapper, one icon-mapping helper. No copy-pasted markup.
- Strict TypeScript, ESLint, Prettier, path aliases (@/components, @/content, @/lib). Consistent
  naming conventions (PascalCase components, kebab-case folders, named exports).
- Environment variables read in exactly one typed module (src/lib/env.ts) and nowhere else.
- Tests (keep lean but meaningful): unit tests (Vitest) for form validation and content schema
  validation, plus a component test for the contact form states. No snapshot spam.
- Documentation:
  - README.md: what this is, how to run locally, available scripts, env vars.
  - ARCHITECTURE.md: folder structure, layering rules, naming conventions, and short "how do I..."
    recipes: add a section, add/remove a team member, add a project/case study, change the
    brand colors/fonts, add a new page, swap content for a CMS.
  - TODO.md: every placeholder I must fill, grouped by content file.
- Dependencies: minimal, each justified. No unused packages.
- Build the project in small, logical commits-worth of steps (scaffold -> tokens/primitives ->
  layout -> sections -> content -> polish -> tests/docs), so the history is readable.

## 6. Quality bar
- Responsive and verified at 375, 768, 1024, 1440 px; no horizontal scroll; text must reflow
  without clipping (long headings, chips, buttons).
- Accessible: semantic HTML, WCAG AA contrast (4.5:1 text), visible focus states, keyboard
  navigation, aria labels on icon buttons, skip link, respect prefers-reduced-motion.
- Motion: purposeful and subtle (scroll reveals, hover states, hero animation). Interactive
  elements get cursor-pointer. Never let animation hide content.
- SEO basics: metadata, Open Graph/Twitter tags, sitemap, robots, favicon, JSON-LD Organization.
  Target Lighthouse 90+ on all four categories.
- Performance: no heavy libraries, lazy-load below-the-fold visuals, optimized fonts.
- Avoid: generic purple/pink "AI gradient" look, stock photos, emoji icons, walls of text,
  carousel-heavy layouts, lorem ipsum.
- Aim for a memorable, premium look that still feels trustworthy to a non-technical business
  owner, while giving developers little details to enjoy.

## 7. Fallback design direction (only if the skill is unavailable)
Modern, clean, confident. Strong typographic hierarchy (one expressive display font + one
readable body font), a restrained palette with one vivid accent, generous whitespace, bento-grid
for services, subtle grain/gradient depth, soft shadows, 8px spacing scale.

## 8. Deliverables
- Full project source that runs with `npm install && npm run dev`, builds with
  `npm run build`, and passes `npm run lint` and `npm test`.
- README.md, ARCHITECTURE.md, TODO.md as described in section 5.
- Final summary: design system chosen (style, palette, fonts), architecture overview in 5-8
  lines, what's still placeholder, and any checklist items that could not be satisfied.