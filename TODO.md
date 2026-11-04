# Pending Placeholders & Content Audit

Every placeholder that needs to be filled by the KDEV team before public launch.
Run `npm run check:content` to verify whether any placeholders remain in the codebase.

## 1. `src/content/site.ts`

- [ ] `contact.email`: Replace `hello@kdev.example` with the real domain email (e.g. `hello@kdev.id`).
- [ ] `contact.whatsapp`: Add the company's WhatsApp phone number (digits only with country code, e.g. `6281234567890`). Currently empty (WhatsApp button is hidden).
- [ ] `socials[0].href` (GitHub): Add KDEV company GitHub profile URL. Currently empty (hidden).
- [ ] `socials[1].href` (LinkedIn): Add KDEV company LinkedIn page URL. Currently empty (hidden).

## 2. `src/content/team.ts`

Replace all 8 placeholder team members with real names and optional profiles:

- [ ] Member 1: Project Manager (currently `TODO: Name`)
- [ ] Member 2: UI/UX Designer (currently `TODO: Name`)
- [ ] Member 3: Frontend Engineer (currently `TODO: Name`)
- [ ] Member 4: Frontend Engineer (currently `TODO: Name`)
- [ ] Member 5: Backend Engineer (currently `TODO: Name`)
- [ ] Member 6: Backend Engineer (currently `TODO: Name`)
- [ ] Member 7: QA Engineer (currently `TODO: Name`)
- [ ] Member 8: DevOps Engineer (currently `TODO: Name`)
- [ ] Optional: Add personal GitHub or LinkedIn URLs for any team members who want them shown.

## 3. `src/content/stack.ts`

Fill in the real technology chips the team uses:

- [ ] `Frontend`: Replace the 3 `TODO: technology` items (e.g. Next.js, React, TypeScript, Tailwind).
- [ ] `Backend`: Replace the 3 `TODO: technology` items (e.g. Node.js, Go, PostgreSQL, Redis).
- [ ] `Mobile`: Replace the 2 `TODO: technology` items (e.g. Flutter, React Native).
- [ ] `DevOps`: Replace the 3 `TODO: technology` items (e.g. Docker, GitHub Actions, AWS).
- [ ] `Design / QA`: Replace the 3 `TODO: technology` items (e.g. Figma, Vitest, Playwright).

## 4. `src/content/projects.ts` (Creator Support Platform)

- [ ] `features`: Replace the 4 `TODO: key feature` items with real capabilities of the delivered MVP.
- [ ] `stack`: Replace the 3 `TODO:` stack items with the actual languages, frameworks, and databases used.
- [ ] `role`: Replace the `TODO: describe KDEV's role` with the team's specific scope on the engagement.
- [ ] `screenshots`: Once the client gives permission to show real UI, save image files in `public/projects/` and replace `src: ""` with the image paths.

## 5. Items marked `// REVIEW` (Verify before publishing)

- [ ] `src/content/faq.ts`: 6 answers are written in a deliberately non-committal tone. Review them with the leadership team to ensure they reflect company policy on pricing, NDAs, and support.
- [ ] `src/content/contact.ts`: `budgets` contains descriptive labels ("Lean MVP", "Mid-size build") instead of specific numbers. Confirm whether you want to display currency ranges instead.
- [ ] `src/content/contact.ts`: `direct.note` states "Reply times are usually within one working day." Confirm this SLA with the PM.

## 6. Infrastructure & Deployment Setup

- [ ] Set up a Formspree or Web3Forms form endpoint and add it to `NEXT_PUBLIC_FORM_ENDPOINT` in your production environment.
- [ ] Set `NEXT_PUBLIC_SITE_URL` to your production domain (e.g. `https://kdev.id`).
