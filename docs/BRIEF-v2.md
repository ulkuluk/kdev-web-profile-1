# KDEV website: Revision brief (v2)

This is an ITERATION on the existing repo. Create branch `redesign/v2`. Do not start over.
Deployment remains out of scope.

## 0. Keep / replace / remove

KEEP: Next.js + TypeScript + Tailwind, the layered architecture (content / ui / sections /
layout / app), zod-validated content layer, env.ts, form handling, tests, AGENTS.md, honesty rules.
REPLACE: information architecture (single page -> multi-page), visual identity (palette,
typography, style), all copy and section content.
REMOVE from the site: the "What's next / own products" section (allow at most one optional
sentence on /about, hidden when empty), the Tech Stack section on Home, the Team section on Home,
and the three-card "Who we work with" section.
Update AGENTS.md and ARCHITECTURE.md to match every structural change.

## 1. Strategy

Primary client: early-stage startups that need an MVP built and taken all the way to production.
Positioning (refine the wording): KDEV takes a startup from idea to a production-ready MVP, with
scope, milestones and price agreed in writing before any code is written.
Pillars:

1. MVP to production: we ship, we don't stop at a prototype.
2. Clear scope in writing: we work under a written MoU with defined scope and workflow.
3. Startup-friendly pricing: fair and affordable. Never use the word "cheap". Invent no prices;
   all pricing details are TODO placeholders.
4. A full team: PM, UI/UX, 2 frontend, 2 backend, QA, DevOps (8 people) on every project.
   Proof: Petepete, a donation platform for content creators; MVP delivered, production-ready; the
   client paused the launch before go-live. Never say it is live. Never mention finances.
   Language: English. Voice: concrete, plain, short sentences, specific verbs, honest.
   Facts you may state: 8 specialists, MVP-to-production focus, written MoU/scope, 1 delivered MVP.
   Never invent testimonials, logos, client counts, user numbers, metrics, years, or prices.
   Anything unknown is a visible "TODO: ..." placeholder (link-type fields hide when empty).

## 2. Information architecture

/ Home

1. Header (wordmark, nav, CTA "Start your MVP")
2. Hero: headline from the pillars (write 3 options in a comment, use the best), subhead,
   CTAs "Start your MVP" (/contact) and "See Petepete" (/work/petepete). Next to or below it,
   a PRIMARY MEDIA SLOT showing real Petepete footage (video loop or image) in a device frame.
3. Pillars strip: the 3-4 promises above, designed as a distinctive layout, not an icon grid.
4. Featured work: Petepete with a large media slot (video or image), 2-3 sentence summary,
   key facts, "Built with" chips (read from the project's content), link to the case study.
5. How an engagement works: 4-6 steps with the written scope/MoU step emphasized; links to
   /services.
6. Final CTA, footer.
   /services: the MVP-to-production offer. What's included, what's not, deliverables per phase,
   the full engagement flow (scope doc + MoU -> milestones -> demos -> acceptance criteria ->
   production launch -> handover/support; mark everything beyond the MoU as "// REVIEW"),
   pricing approach (packages/ranges as TODO), capabilities (web, custom systems, mobile) as
   secondary, and the FAQ (moved here).
   /work: project index generated from content (only Petepete now) + a "Your project could be
   next" card. Adding a project must need zero changes to code.
   /work/[slug]: case study pages (section 3).
   /about: team of 8 (role, name TODO, photo slot, optional links), how we work, a compact "Our
   toolbox" grouped by area (TODO values), optional one-line product vision.
   /contact: startup-oriented form (name, email, company/startup, stage [idea / prototype / have
   users], what you want to build, desired timeline, budget range, optional link), WhatsApp
   button, email. Keep existing form behavior.

## 3. Showcase system (case studies, media, tech stack)

Case studies are MDX files in src/content/work/<slug>.mdx. Frontmatter is validated with zod at
build time: slug, title, tagline, statusLabel, clientDisclosure ("named" | "anonymized";
anonymized shows "Confidential client"), timeframe, teamSize, ourRole[], summary,
heroMedia, featured (bool), order, and stack: groups[{label, items[{name, why?}]}].
Use the lightest reliable MDX approach for the current Next.js App Router and justify it in
ARCHITECTURE.md. Provide MDX components: Figure, Video, Gallery, Timeline, Callout,
DeviceFrame. Include a Stat component but only ever use it with real numbers.
Seed src/content/work/petepete.mdx with this narrative skeleton (all body text "TODO: ..."):
Overview, The problem, Scope we agreed, How we built it (timeline phases, each with media slots),
Architecture and key decisions (diagram slot), Challenges and how we solved them, Outcome
(honest framing above), What we learned, Built with (stack with "why we chose it").
Media:

- Originals go in media-source/work/<slug>/. Provide `npm run media` (script) that outputs
  web-optimized images (WebP/AVIF, max 1920px wide) to public/work/<slug>/ and records
  dimensions so there is no layout shift. Lazy-load everything below the fold.
- Videos: support (a) embed (YouTube/Vimeo/Loom) via a click-to-load facade, and
  (b) short local mp4/webm clips (target under 8 MB) with a poster. Hero loops are muted,
  playsInline, loop, and do not autoplay under prefers-reduced-motion (show the poster).
  Never autoplay with sound.
- A missing media file renders a clearly marked placeholder frame naming the exact path to drop
  the file at. `npm run check:content` must fail on: remaining "TODO:" strings, kdev.example,
  missing media files, and media over size limits. Do not hook it into `npm run build`.
- Write docs/ADDING-WORK.md: how to add a project, drop media, embed a video, and fill the stack.

## 4. Art direction (STAGE 1: stop for my approval before building)

The current look (blue + orange palette, glassmorphism, Plus Jakarta Sans, symmetrical
icon-card grids) is rejected as generic. Do not reuse it.
Produce THREE clearly different visual directions as standalone static HTML files in
design-explore/ (outside the Next.js app), each showing hero + featured work + one services
snippet, using placeholder media frames, with screenshots at 1440 and 390 px width. For each
direction give: name, palette (hex, roles, AA contrast verified), type pairing, layout idea, and
one SIGNATURE visual idea tied to our promise (clear scope in writing, MVP to production), such
as scope-document or milestone-tracker UI, numbered clauses, acceptance checklists.
Constraints:

- Palette: at most 3 core colors plus neutrals. No blue + orange pairing, no purple/pink
  gradients, no glassmorphism, no floating blurry blobs.
- Typography: distinctive display + readable body + optional mono. Not Inter, Roboto, Poppins,
  Plus Jakarta Sans or Space Grotesk. Google Fonts only, loaded via next/font.
- Anti-slop: no gradient headline text, no three-equal-cards-with-icon-circles grid, no stock
  photos, no fake dashboards with meaningless data, no buzzwords (empower, elevate, seamless,
  cutting-edge, innovative, synergy, world-class).
- The real Petepete media is the visual hero; design the layout so footage looks good in it.
  After I pick one: apply it to tokens, update design-system/kdev/MASTER.md to reflect the
  chosen direction (so future sessions do not drift back), and log it in ARCHITECTURE.md.

## 5. Skills

Read each SKILL.md in .agents/skills/ before using it. This brief wins over any skill.

- frontend-design (.agents/skills/frontend-design/SKILL.md): REQUIRED. Read it before Stage 1.
  It drives art direction and anti-generic decisions.
- ui-ux-pro-max: use for UX/accessibility guidance, `ux` and `--stack nextjs` queries, and the
  pre-delivery checklist. Do NOT adopt its generated palette or style by default.
- ui-styling: implementation of styling. brand: voice only. design: only for the wordmark if its
  SKILL.md covers it.
- Do not use: banner-design, slides.

## 6. Quality bar and deliverables

Keep everything from the previous brief: responsive at 375/768/1024/1440, WCAG AA, visible
focus, reduced motion, SEO + JSON-LD per page, Lighthouse 90+, lint/test/build green. Update
tests for MDX frontmatter validation and the media/content checks.
Work in readable commits. Final summary: chosen direction, new page map, which skills were
used, what is still placeholder, and anything unverified.

## 7. Stages

Stage 1: direction board only, then STOP. Stage 2 (after my pick): tokens, IA, pages, MDX and
media system, copy, seed content. Stage 3: tests, docs, checks.
