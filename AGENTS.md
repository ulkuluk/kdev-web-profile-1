# Agent & LLM Architecture Instructions

This repository is strictly structured into unidirectional layers. When writing or modifying code in this codebase, you must follow the rules below.

## Layering Rules

1. **Content Layer (`src/content/`):**
   - ALL copy, links, labels, and structured data live here in typed modules.
   - Every file must export a Zod schema (`*Schema`), the inferred TypeScript type, and the parsed content object.
   - NEVER hard-code copy or strings inside components in `src/components/`.
   - Never invent client names, testimonials, ratings, or live project claims.

2. **UI Primitives (`src/components/ui/`):**
   - Content-agnostic, reusable primitives (Button, Card, Section, Container, Badge, etc.).
   - Styled only with tokens from `src/app/globals.css`. Never use arbitrary hex colors or magic numbers.

3. **Sections (`src/components/sections/<section-name>/`):**
   - One folder per section containing the section component and its private sub-components.
   - Section components receive all data via props typed from the content schemas.
   - Section components wrap their content in `<Section id="...">` to maintain uniform rhythm and heading hierarchy.

4. **Layout (`src/components/layout/`):**
   - Global persistent chrome: `Header`, `Footer`, `MobileNav`, `Wordmark`.

5. **App Router (`src/app/`):**
   - `page.tsx` only composes sections and passes data down. No business logic or copy.
   - `layout.tsx` configures fonts, metadata, JSON-LD, skip links, and HTML structure.

6. **Shared Utilities (`src/lib/`):**
   - `env.ts`: The ONLY file allowed to read `process.env`.
   - `icons.ts`: Named icon mapping for Lucide icons.
   - `cn.ts`: Class name merger (`clsx` + `twMerge`).

## Naming & Conventions

- **Folders:** kebab-case (`case-study`, `mobile-nav`).
- **Files & Components:** PascalCase for React components (`ContactForm.tsx`), kebab-case for utilities and content (`contact.ts`, `validate.ts`).
- **Exports:** Prefer named exports (`export function Button`).
- **Icons:** Always use vector Lucide icons via `src/lib/icons.ts`. NEVER use emojis for structural or semantic icons.
- **Accessibility:** Interactive elements must have `cursor-pointer`, focus rings must be visible (`:focus-visible`), and icons alongside text must have `aria-hidden="true"`.
