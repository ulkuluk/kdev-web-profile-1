# Design System Master File (v2 — The Engineering Spec)

**LOGIC:** When building or modifying a page, follow the tokens and rules below as the authoritative design source of truth.

---

**Project:** KDEV  
**Revision:** v2 (The Engineering Spec)  
**Direction:** Warm Drafting Paper & Architectural Engineering  
**Positioning:** Early-stage startup MVP to production with scope, milestones, and price agreed in writing.

---

## Global Rules

### Color Palette

Strictly 3 core colors + neutrals. No blue + orange pairing, no purple/pink gradients, no glassmorphism, no blurry blobs.

| Role | Hex | CSS Variable | Notes |
|------|-----|--------------|-------|
| Primary / Ink | `#12151A` | `--color-primary`, `--color-foreground` | Deep carbon drafting ink |
| On Primary | `#FFFFFF` | `--color-on-primary` | Pure white text on ink |
| Accent / Verdigris | `#0F766E` | `--color-accent` | Verdigris teal (AAA >7.1:1 on paper) |
| Accent Hover | `#115E59` | `--color-accent-hover` | Deeper teal hover state |
| On Accent | `#FFFFFF` | `--color-on-accent` | Crisp white on teal |
| Accent Tint | `#E6F4F2` | `--color-accent-tint` | Light verdigris wash |
| Accent Glow | `#14B8A6` | `--color-accent-glow` | High-contrast readout tag on dark surfaces |
| Background / Paper | `#F4F3EF` | `--color-background` | Warm architectural drafting paper |
| Card / Surface | `#FFFFFF` | `--color-card` | Crisp white drafting sheet |
| Card Foreground | `#12151A` | `--color-card-foreground` | Deep carbon ink |
| Muted / Drafting Line | `#ECEAE4` | `--color-muted` | Soft paper tint |
| Muted Foreground | `#525965` | `--color-muted-foreground` | Calibrated slate (4.6:1+ on paper) |
| Border | `#DCD9D0` | `--color-border` | Precision technical line |
| Border Dark | `#12151A` | `--color-border-dark` | Structural border & docket frames |
| Dark Band Surface | `#12151A` | `--color-dark-band` | Dark ink band behind Petepete showcase |
| Destructive | `#DC2626` | `--color-destructive` | Error states |
| On Destructive | `#FFFFFF` | `--color-on-destructive` | Pure white text |
| Ring / Focus | `#0F766E` | `--color-ring` | High-visibility focus ring (3px offset 2px) |

### Typography

Google Fonts loaded via `next/font`:
- **Display / Heading:** `Epilogue` (weight: 600, 700, 800) — technical geometric weight, balanced letter-spacing.
- **Body / Editorial:** `Source Serif 4` (weight: 400, 600) — literary clarity, readable at 16–18px.
- **Mono / Software Details:** `IBM Plex Mono` (weight: 400, 500, 600) — labels, status tags, step numbers, clause indicators (§ 01.1), terminal snippets, commit/spec readouts.
- **Banned Fonts:** Inter, Roboto, Poppins, Plus Jakarta Sans, Space Grotesk.

### Spacing Variables

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `4px` / `0.25rem` | Monospace tags, status pills |
| `--space-sm` | `8px` / `0.5rem` | Icon gaps, chip spacing |
| `--space-md` | `16px` / `1rem` | Standard interior component padding |
| `--space-lg` | `24px` / `1.5rem` | Card padding, grid gaps |
| `--space-xl` | `32px` / `2rem` | Section gutters |
| `--space-2xl` | `48px` / `3rem` | Section vertical rhythm |
| `--space-3xl` | `64px` / `4rem` | Hero padding & dark band margins |

### Elevation & Borders

- Precision over diffusion: crisp 1px borders (`#DCD9D0`), structured solid 1–2px dark ink borders (`#12151A`), and hard-edged 3px–4px offset box shadows (`4px 4px 0px #12151A`).
- **NO soft diffuse glassmorphism or floating blurry blobs.**

---

## Component Specs

### Buttons & CTAs

CTA must be the most visible interactive element on every screen:

```css
/* Primary Button / High Visibility CTA */
.btn-primary {
  background: #12151A;
  color: #FFFFFF;
  border: 1px solid #12151A;
  padding: 10px 20px;
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-radius: 2px;
  box-shadow: 2px 2px 0px #12151A;
  transition: all 150ms ease;
  cursor: pointer;
}

.btn-primary:hover {
  background: #0F766E;
  border-color: #0F766E;
  transform: translate(-1px, -1px);
  box-shadow: 3px 3px 0px #12151A;
}

/* Secondary Button */
.btn-secondary {
  background: transparent;
  color: #12151A;
  border: 1px solid #DCD9D0;
  padding: 10px 20px;
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 600;
  border-radius: 2px;
  transition: all 150ms ease;
  cursor: pointer;
}

.btn-secondary:hover {
  background: #FFFFFF;
  border-color: #12151A;
}
```

### Signature Element: Signed Scope MoU Docket

- Clause indicators (§ 01.1, § 01.2, § 01.3).
- Structured tabular docket with dark header bar and verified state tags (`MANDATORY`, `GUARANTEED`, `COMMITTED`).
- Subtle animated interactive check-off states respecting `prefers-reduced-motion`.

### Product & Software House Moments

- Precision device frames with browser title bars (`petepete.app / preview / creator-portal`) and status telemetry.
- Code/terminal snippets and architectural specification tags using IBM Plex Mono.
- Dedicated dark band on Home (`#12151A`) behind the Petepete media slot to give video/footage maximum pop before returning to the warm drafting paper background.

---

## Anti-Patterns (STRICTLY FORBIDDEN)

- ❌ **No gradient headline text** (solid deep ink `#12151A` or pure white on dark band).
- ❌ **No glassmorphism / blurred backdrops** (crisp drafting paper and solid panels).
- ❌ **No blue + orange SaaS pairing** (teal `#0F766E`, ink `#12151A`, paper `#F4F3EF`).
- ❌ **No 3-equal-cards-with-icon-circles grid**.
- ❌ **No stock photos, fake testimonials, fake client logos, or fake ratings**.
- ❌ **No buzzwords**: "empower", "elevate", "seamless", "cutting-edge", "innovative", "synergy", "world-class".
- ❌ **No claim that Petepete is "live"** (must state: "MVP delivered, production-ready; client paused launch before go-live").

---

## Pre-Delivery Checklist

- [ ] All text passes WCAG AA (minimum 4.5:1 normal text, 7:1+ for verdigris teal and deep ink).
- [ ] Primary CTA is clearly the most prominent interactive element on every screen.
- [ ] Petepete media on Home is framed in the dark ink band for optimal contrast.
- [ ] Motion animations are subtle and fully disabled under `prefers-reduced-motion`.
- [ ] No hardcoded copy in components; all copy validated through Zod in `src/content/`.
- [ ] Responsive across 375px, 768px, 1024px, 1440px.
