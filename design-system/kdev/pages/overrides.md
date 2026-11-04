# KDEV: Documented Design System Overrides (v2)

With the v2 revision, `design-system/kdev/MASTER.md` serves as the direct source of truth for "The Engineering Spec" visual direction.

| # | Master Rule | Implementation Note | Rationale |
|---|-------------|---------------------|-----------|
| 1 | Dark Band on Home | Section enclosing Petepete primary media renders in `#12151A` with white/teal accents | Provides high-contrast theater for production application footage, then returns to warm drafting paper (`#F4F3EF`). |
| 2 | Subtle Interactive Docket | Signed Scope Docket has interactive/animated clause validation | Respects `prefers-reduced-motion` to immediately display locked states without animation. |
| 3 | CTA prominence | Primary button has solid `#12151A` fill and 2px offset box shadow, switching to verdigris `#0F766E` on hover | Highest visual contrast element on all screens. |
