# Adding a Case Study / Work Item (v2)

This guide documents how to add a new project or case study to KDEV.
Adding a project requires **zero changes to application code**; the project index (`/work`), dynamic case study route (`/work/[slug]`), and sitemap (`/sitemap.xml`) automatically discover and validate all MDX files in `src/content/work/`.

---

## 1. Create the Case Study File

Create a new file at `src/content/work/<slug>.mdx`.

### Frontmatter Schema (Validated at Build Time)

```yaml
---
slug: "your-project-slug"
title: "Project Name"
tagline: "One clear sentence summarizing what was built"
statusLabel: "MVP Delivered · Production Ready" # e.g. "MVP Delivered · Launch Paused" or "In Production"
clientDisclosure: "named" # "named" displays clientName; "anonymized" displays "Confidential client"
clientName: "Client Name" # Optional if anonymized
timeframe: "8 weeks"
teamSize: 8 # Always factual: 8 specialists
ourRole:
  - "Product Management"
  - "UI/UX Design"
  - "Frontend Engineering"
  - "Backend Engineering"
  - "QA Testing"
  - "DevOps CI/CD"
summary: "A 2-3 sentence overview of the platform, the core problem solved, and the production delivery outcome."
heroMedia:
  type: "video" # "image" or "video"
  src: "/work/your-project-slug/hero-clip.mp4"
  poster: "/work/your-project-slug/hero-poster.webp"
  alt: "Interface preview of project dashboard"
featured: true # If true, displays in the Featured Work section on Home
order: 2 # Sort order on /work index
stack:
  - label: "Frontend & Interface"
    items:
      - name: "Next.js App Router"
        why: "Server-side rendering for speed and SEO."
      - name: "Tailwind CSS"
        why: "Design token compliance with zero runtime overhead."
  - label: "Backend & Database"
    items:
      - name: "PostgreSQL"
        why: "ACID-compliant relational ledger and transaction security."
  - label: "DevOps & Infrastructure"
    items:
      - name: "Docker & GitHub Actions"
        why: "Reproducible containers and automated CI/CD deployment."
---
```

---

## 2. Media Optimization Workflow

Original media files are never committed directly into `public/`.

1. **Place source assets:**
   Drop your full-resolution screenshots (`.png`, `.jpg`) into:
   ```
   media-source/work/<slug>/
   ```
2. **Run the optimizer:**
   ```bash
   npm run media
   ```
   This script:
   - Resizes images to a maximum width of 1920px.
   - Generates high-efficiency `.webp` and `.avif` formats in `public/work/<slug>/`.
   - Outputs `public/work/<slug>/manifest.json` recording dimensions to prevent layout shifts.

---

## 3. Video Handling & Embeds

All video playback respects user accessibility and bandwidth constraints:

- **Never autoplay audio.**
- Autoplay hero loops must be muted and automatically disabled when `prefers-reduced-motion` is detected (displaying the poster instead).

### A. Local Short Clips

- Target under **8 MB** per clip.
- Save to `media-source/work/<slug>/` and run `npm run media` or place in `public/work/<slug>/`.
- Use the `<Video>` component:
  ```jsx
  <Video
    src="/work/<slug>/feature-demo.mp4"
    poster="/work/<slug>/feature-poster.webp"
    title="Dashboard Walkthrough"
  />
  ```

### B. Third-Party Embeds (YouTube, Vimeo, Loom)

- Uses a click-to-load facade: zero third-party tracking scripts load until the user explicitly clicks the play button.
  ```jsx
  <Video
    type="youtube" # or "vimeo" | "loom"
    src="https://www.youtube-nocookie.com/embed/VIDEO_ID"
    poster="/work/<slug>/poster.webp"
    title="Founder Walkthrough Video"
  />
  ```

---

## 4. MDX Body Components

The case study body supports standard Markdown alongside custom components:

| Component       | Description                                             | Example Usage                                                                       |
| --------------- | ------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `<Figure>`      | Responsive image with caption and missing-file fallback | `<Figure src="/work/slug/screen.webp" alt="UI" caption="..." />`                    |
| `<Video>`       | Local clip or click-to-load embed                       | `<Video src="..." poster="..." />`                                                  |
| `<Gallery>`     | 2- or 3-column media grid                               | `<Gallery columns={2}><Figure ... /><Figure ... /></Gallery>`                       |
| `<Timeline>`    | Chronological sprint/phase list                         | `<Timeline events={[{ date: "Week 01", title: "...", description: "..." }]} />`     |
| `<Callout>`     | Architectural or process notice                         | `<Callout type="architecture" title="...">...</Callout>`                            |
| `<DeviceFrame>` | Browser chassis with status indicator                   | `<DeviceFrame title="app.slug.com" status="DELIVERED"><Figure ... /></DeviceFrame>` |
| `<Stat>`        | Verified factual metric (only real numbers)             | `<Stat value="8" label="Specialists" />`                                            |

---

## 5. Honesty & Content Rules

- **Never claim a paused MVP is live.** For Petepete, state: _"MVP delivered, production-ready; client paused launch before go-live."_
- **Never disclose client financial data or invent ratings/testimonials.**
- **Factual team size:** Always 8 specialists.
- Run the content audit before submitting:
  ```bash
  npm run check:content
  ```
