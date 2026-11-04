# KDEV Website

Company website for **KDEV**, a software house of 8 specialists building web applications,
custom systems, and mobile apps.

## Prerequisites

- Node.js 20+ (developed and verified on Node 22)
- npm 10+

## Local development

```bash
# Install dependencies
npm install

# Start the dev server on http://localhost:3000
npm run dev

# Production build
npm run build

# Start the production server
npm run start
```

## Available scripts

| Script                  | Purpose                                                                                        |
| ----------------------- | ---------------------------------------------------------------------------------------------- |
| `npm run dev`           | Start Next.js App Router in development mode                                                   |
| `npm run build`         | Compile static production build with Turbopack + strict TypeScript                             |
| `npm run start`         | Serve the production build locally                                                             |
| `npm run lint`          | ESLint (Next.js core-web-vitals + strict TypeScript)                                           |
| `npm run typecheck`     | `tsc --noEmit` strict typecheck across the whole project                                       |
| `npm test`              | Run Vitest test suite (content schemas, validation, form states)                               |
| `npm run test:watch`    | Vitest in watch mode                                                                           |
| `npm run format`        | Prettier write with `prettier-plugin-tailwindcss`                                              |
| `npm run format:check`  | Prettier check                                                                                 |
| `npm run check:content` | Audit script: exits non-zero if any `TODO:` string or `kdev.example` remains in `src/content/` |

## Environment variables

Configured in `.env.local` (see `.env.example`). Read in exactly one place: `src/lib/env.ts`.

| Variable                      | Required | Description                                                                                                      |
| ----------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_FORM_ENDPOINT`   | No       | Formspree / form service URL. When missing or empty, the contact form falls back gracefully to a `mailto:` link. |
| `NEXT_PUBLIC_FORM_ACCESS_KEY` | No       | Optional Web3Forms access key, sent as `access_key` in the JSON payload when present.                            |
| `NEXT_PUBLIC_SITE_URL`        | No       | Public canonical URL for OpenGraph, Twitter cards, sitemap, and robots. Defaults to `http://localhost:3000`.     |

## Tech stack

- **Framework:** Next.js 16 (App Router, Server Components by default, deploy-agnostic)
- **Styling:** Tailwind CSS v4 (`@theme` tokens in `src/app/globals.css`)
- **Animation:** `motion` 14 (prefers-reduced-motion respected everywhere)
- **Icons:** `lucide-react` (SVG only, no emojis)
- **Fonts:** Next.js self-hosted local variable fonts (Plus Jakarta Sans + JetBrains Mono)
- **Validation:** Zod 4 for build-time content schemas and runtime form validation
- **Testing:** Vitest 5 + Testing Library + jsdom
