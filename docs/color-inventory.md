# Color inventory & migration record (Emerald Professional)

Pre-migration audit of every hardcoded color in the project, and the semantic
token each occurrence was migrated to. Line numbers refer to the state before
the migration (commit before `main` at the time of the audit).

Scope searched: all Tailwind palette classes in the violet/purple/indigo/
fuchsia/pink/blue families, raw hex codes, `rgb()/hsl()/rgba()` values, CSS
custom properties containing colors, JS/TS color constants, inline styles, and
config-defined color utilities. `gray-*`/`slate-*` neutral classes were left
as-is except where they collided with a spec token (page background, borders).

## Design tokens (source of truth: `src/app/globals.css`)

| Token (utility prefix)     | Light                 | Dark                  | Role                          |
| -------------------------- | --------------------- | --------------------- | ----------------------------- |
| `primary`                  | `#059669` emerald-600 | `#10b981` emerald-500 | buttons, links, active states |
| `primary-hover`            | `#047857` emerald-700 | `#34d399` emerald-400 | hover state                   |
| `primary-soft`             | `#ecfdf5` emerald-50  | `#022c22` emerald-950 | subtle backgrounds, badges    |
| `primary-ink`              | `#047857` emerald-700 | `#6ee7b7` emerald-300 | emerald text on soft bg       |
| `accent` (shadcn, HSL var) | soft emerald tint     | deep emerald tint     | hover surfaces, active nav    |
| `accent-strong`            | `#14b8a6` teal-500    | `#2dd4bf` teal-400    | saturated accent, icons       |
| `surface`                  | `#f8fafc` slate-50    | `#0f172a` slate-900   | page background               |
| `surface-raised`           | `#ffffff`             | `#1e293b` slate-800   | cards                         |
| `content`                  | `#1e293b` slate-800   | `#f1f5f9` slate-100   | main text                     |
| `content-muted`            | `#64748b` slate-500   | `#94a3b8` slate-400   | secondary text                |
| `border-default`           | `#e2e8f0` slate-200   | `#1e293b` slate-800   | borders                       |
| `success`                  | emerald-500           | emerald-500           | success states                |
| `warning`                  | amber-500             | amber-500             | warning states                |
| `danger` / `destructive`   | `#ef4444` red-500     | red-400               | errors, destructive actions   |

## Theme configuration

| File                  | Line(s) | Before                                                                          | Element                            | Migrated to                                              |
| --------------------- | ------- | ------------------------------------------------------------------------------- | ---------------------------------- | -------------------------------------------------------- |
| `src/app/globals.css` | 85–101  | `--primary: 262 83% 58%`, `--accent: 264 60% 96.5%`, `--ring: 262 83% 58%` etc. | all shadcn HSL vars                | emerald/slate values                                     |
| `src/app/globals.css` | 113–127 | `.dark` purple vars (`263 86% 64%`, `224.3 76.3% 48%`)                          | dark theme vars                    | emerald/slate darks                                      |
| `src/app/globals.css` | 43–46   | `animated-text-gradient`: `from-purple-500 via-pink-500 to-purple-500`          | hero gradient text                 | removed; usage → `text-primary`                          |
| `src/app/globals.css` | 56      | `linear-gradient(45deg, #d946ef, #8b5cf6, #d946ef)`                             | `rotating-border` utility (unused) | `var(--color-primary)` stops                             |
| `tailwind.config.ts`  | 93–99   | `gradient-primary/secondary/hero/accent` (purple→fuchsia gradients)             | named gradients                    | removed; usages → solid `bg-primary` / `bg-primary-soft` |
| `tailwind.config.ts`  | 102–103 | `shadow-elegant` `rgb(91 33 182/.22)`, `shadow-glow` `hsl(262 83% 58%)`         | purple shadows                     | emerald (`5 150 105`, `161 94% 30%`)                     |

## App pages

| File                                                          | Line                   | Before                                                  | Element                                | Migrated to                                                                                |
| ------------------------------------------------------------- | ---------------------- | ------------------------------------------------------- | -------------------------------------- | ------------------------------------------------------------------------------------------ |
| `src/app/sign-in/[[...rest]]/page.tsx`                        | 75                     | `from-indigo-50 via-white to-purple-50`                 | page background                        | `bg-surface`                                                                               |
| 〃                                                            | 78–80                  | `bg-indigo-300` / `bg-purple-300` / `bg-pink-200` blobs | decorative blur circles                | `bg-primary/20`, `bg-accent-strong/20`, `bg-primary/10`                                    |
| 〃                                                            | 89, 92, 121            | `from-indigo-600 to-purple-600` (bg + clip-text)        | logo, wordmark, hero title             | `bg-primary` / `text-primary`                                                              |
| 〃                                                            | 146, 180, 310          | `from-indigo-500 to-purple-500`                         | icon chips                             | `bg-primary`                                                                               |
| 〃                                                            | 213                    | `from-white/80 to-indigo-50/80`                         | testimonial card                       | `bg-surface-raised/80 dark:bg-card/80`                                                     |
| 〃                                                            | 216, 265, 372, 376     | `text-indigo-500` / `bg-indigo-500` / `text-blue-500`   | quote icon, carousel dot, bullet icons | `text-primary` / `bg-primary`                                                              |
| 〃                                                            | 308                    | `from-indigo-50 to-purple-50`                           | sign-in card header                    | `bg-primary-soft`                                                                          |
| 〃                                                            | 339                    | Clerk `formButtonPrimary` gradient                      | submit button                          | `bg-primary hover:bg-primary-hover`                                                        |
| 〃                                                            | 341, 343, 349          | indigo link/focus classes                               | Clerk links & inputs                   | `text-primary` / `focus:border-primary focus:ring-primary`                                 |
| 〃                                                            | 352–357                | `colorPrimary: '#4f46e5'` + gray hexes                  | Clerk theme variables                  | `hsl(var(--primary))` etc.                                                                 |
| 〃                                                            | 368                    | `text-green-500`                                        | check icon                             | `text-success`                                                                             |
| 〃                                                            | 386, 393               | `text-indigo-600`                                       | legal links                            | `text-primary hover:text-primary-hover`                                                    |
| `src/app/global-error.tsx`                                    | 24                     | `linear-gradient(135deg, #6366f1, #8b5cf6)`             | error CTA button                       | solid `#059669` (file must stay self-contained — global-error renders without globals.css) |
| `src/components/not-found.tsx`                                | 12                     | `from-gray-50 to-gray-100`                              | page background                        | `bg-surface`                                                                               |
| 〃                                                            | 21, 56, 80             | `text-blue-600` / `bg-blue-600`                         | icon, buttons, link                    | `text-primary` / `bg-primary hover:bg-primary-hover`                                       |
| 〃                                                            | 64                     | `from-purple-600 to-blue-600`                           | secondary button                       | solid `bg-primary hover:bg-primary-hover`                                                  |
| `src/app/privacy-policy/page.tsx`                             | 25, 33                 | `text-blue-600`                                         | links                                  | `text-primary`                                                                             |
| `src/app/shared/[shareId]/_components/shared-resume-view.tsx` | 53, 110, 129, 144, 154 | `bg-blue-600 hover:bg-blue-700` / `text-blue-600`       | FAB, action buttons, link              | `bg-primary hover:bg-primary-hover` / `text-primary`                                       |

## Dashboard

| File                                                        | Line                                | Before                                                                            | Element                                       | Migrated to                                                                 |
| ----------------------------------------------------------- | ----------------------------------- | --------------------------------------------------------------------------------- | --------------------------------------------- | --------------------------------------------------------------------------- |
| `(dashboard)/_components/dashboard-layout.tsx`              | 103                                 | `bg-gradient-primary`                                                             | logo chip                                     | `bg-primary`                                                                |
| 〃                                                          | 275                                 | `bg-blue-100 text-blue-700`                                                       | "new" badge                                   | `bg-primary-soft text-primary-ink`                                          |
| `(dashboard)/tracker/boards/page.tsx`                       | 79, 87, 91, 110, 124, 192, 202, 280 | `bg-indigo-600` / `text-indigo-600` / `border-indigo-600` / `hover:bg-indigo-700` | spinner, headings, board cards, create button | `bg-primary` / `text-primary` / `border-primary` / `hover:bg-primary-hover` |
| 〃                                                          | 226, 243, 259                       | `focus:ring-indigo-500`                                                           | form input focus                              | `focus:ring-primary`                                                        |
| `(dashboard)/tracker/boards/[boardId]/page.tsx`             | 75, 128, 197, 217                   | `text-indigo-600 hover:text-indigo-800`                                           | links, actions                                | `text-primary hover:text-primary-hover`                                     |
| `(dashboard)/resume/template/_components/resumepreview.tsx` | 286                                 | `from-pink-500 to-yellow-500`                                                     | download button (paid)                        | `bg-primary hover:bg-primary-hover`                                         |
| 〃                                                          | 320                                 | `from-blue-500 to-indigo-600`                                                     | share button (paid)                           | `bg-primary hover:bg-primary-hover`                                         |
| `(dashboard)/templates/resume-templates/page.tsx`           | 83                                  | `bg-gradient-primary bg-clip-text`                                                | heading text                                  | `text-primary`                                                              |
| `(dashboard)/templates/made-by-you/page.tsx`                | 175                                 | `bg-gradient-primary`                                                             | icon chip                                     | `bg-primary`                                                                |
| `(dashboard)/templates/_components/template-card.tsx`       | 45                                  | `bg-gradient-primary opacity-30`                                                  | placeholder line                              | `bg-primary opacity-30`                                                     |
| `(dashboard)/user-details/_components/project-card.tsx`     | 62                                  | `text-blue-500 hover:text-blue-700`                                               | project link                                  | `text-primary hover:text-primary-hover`                                     |
| `resume-templates/page.tsx`                                 | 154, 166, 217, 278, 290             | `bg-gradient-primary` (text, buttons, chip)                                       | heading, CTAs, empty-state                    | `text-primary` / `bg-primary` + `hover:bg-primary-hover`                    |
| `resume-templates/[id]/page.tsx`                            | 166, 191                            | `bg-gradient-primary`                                                             | heading text, CTA                             | `text-primary` / `bg-primary`                                               |

## Resume template forms (deedy / mteck / sb2nov / techpro)

| Pattern                         | Files (lines)                                                                                  | Element                 | Migrated to                                    |
| ------------------------------- | ---------------------------------------------------------------------------------------------- | ----------------------- | ---------------------------------------------- |
| `text-blue-600 hover:underline` | achievements(92), certifications(109), experience(161), projects(197/230), honorandawards(200) | "use suggestions" links | `text-primary hover:underline`                 |
| `bg-blue-500 text-white`        | deedy/skills(187), mteck/skills(187)                                                           | save-category buttons   | `bg-primary text-white hover:bg-primary-hover` |
| `bg-green-500 text-white`       | projects/experience/education/honorandawards across all 4 templates (~20 occurrences)          | save / add buttons      | `bg-primary text-white hover:bg-primary-hover` |
| `color: '#ff0034'` (toast)      | resumeForm.tsx ×4 (152/153)                                                                    | error toast text        | `hsl(var(--destructive))`                      |

## Landing components

| File                        | Line                 | Before                                                                          | Element                            | Migrated to                                                                   |
| --------------------------- | -------------------- | ------------------------------------------------------------------------------- | ---------------------------------- | ----------------------------------------------------------------------------- |
| `hero-interactive.tsx`      | 39                   | `rounded-full bg-gradient-primary`                                              | hero CTA                           | `rounded-full bg-primary hover:bg-primary-hover` (shape preserved)            |
| 〃                          | 50                   | `bg-gradient-hero`                                                              | hero section wash                  | `bg-primary-soft`                                                             |
| `hero-section.tsx`          | 14                   | `animated-text-gradient`                                                        | headline highlight                 | `text-primary`                                                                |
| `header.tsx`                | 25, 81, 91, 151, 159 | `bg-gradient-primary` `rounded-full`                                            | logo, CTAs                         | `bg-primary` `rounded-full` + hover token (shape preserved)                   |
| `contact-section.tsx`       | 92                   | purple badge                                                                    | section badge                      | `bg-primary-soft text-primary-ink`                                            |
| 〃                          | 107                  | `from-purple-600 to-pink-600`                                                   | contact info panel                 | `bg-primary`                                                                  |
| 〃                          | 207                  | `rounded-full bg-purple-600 hover:bg-purple-700`                                | submit button                      | `rounded-full bg-primary hover:bg-primary-hover` (shape preserved)            |
| `faq-section.tsx`           | 52                   | purple badge                                                                    | section badge                      | `bg-primary-soft text-primary-ink`                                            |
| `features-section.tsx`      | 8–33, 44, 63         | `text-purple-500`, purple badge, `bg-purple-50` circle                          | icons, badge, icon circle          | `text-primary`, `bg-primary-soft text-primary-ink`                            |
| `how-it-works-section.tsx`  | 29, 44               | badge, `text-purple-500/20` step number                                         | badge, numeral                     | `bg-primary-soft text-primary-ink`, `text-primary/20`                         |
| `pricing-section.tsx`       | 29–49                | blue/purple/pink/orange/teal icons                                              | feature icons                      | `text-primary` / `text-accent-strong`                                         |
| 〃                          | 59                   | purple badge                                                                    | badge                              | `bg-primary-soft text-primary-ink`                                            |
| 〃                          | 73–77                | `border-purple-200`, `from-purple-50 to-blue-50`, `from-purple-500 to-blue-500` | pricing card frame, overlay, icon  | `border-primary/40`, `bg-primary-soft`, `bg-primary`                          |
| 〃                          | 138, 145             | `from-purple-500 to-blue-500`                                                   | CTA buttons                        | `bg-primary hover:bg-primary-hover`                                           |
| 〃                          | 209–223, 235–236     | purple/blue/green step chips                                                    | how-it-works numerals              | `bg-primary-soft text-primary-ink` (unified)                                  |
| `team-section.tsx`          | 36, 72               | badge, `text-purple-600`                                                        | badge, member handle               | `bg-primary-soft text-primary-ink` / `text-primary-ink`                       |
| `testimonials-section.tsx`  | 10                   | purple badge                                                                    | badge                              | `bg-primary-soft text-primary-ink`                                            |
| `testimonial-carousel.tsx`  | 58–71                | purple card/border/quote/avatar/name                                            | testimonial cards                  | `bg-surface-raised border-border-default`, `bg-primary-soft text-primary-ink` |
| `footer-section.tsx`        | 14, 29–92            | `text-purple-500`, `hover:text-purple-500`                                      | logo icon, link hovers             | `text-primary`, `hover:text-primary`                                          |
| `hover-border-gradient.tsx` | 50                   | `#3275F8`                                                                       | (unused) rotating border highlight | `var(--color-accent-strong)`                                                  |

## Other raw colors tokenized

| Pattern                                          | Files                                                             | Element             | Migrated to                                                |
| ------------------------------------------------ | ----------------------------------------------------------------- | ------------------- | ---------------------------------------------------------- |
| `text-red-500` / `border-red-500`                | contact-us, feedback, landing contact forms, AccomplishmentsInput | validation errors   | `text-destructive` / `border-destructive`                  |
| `bg-red-600 hover:bg-red-700 focus:ring-red-600` | tracker boards delete                                             | delete button       | `bg-destructive`                                           |
| `bg-red-100`, `text-red-600`                     | board-not-found icon                                              | error icon          | `bg-destructive/10`, `text-destructive`                    |
| `bg-red-50 text-red-800 border-red-200`          | share-modal                                                       | error box           | `bg-destructive/10 text-destructive border-destructive/30` |
| `bg-red-700` override                            | made-by-you confirm                                               | destructive confirm | removed (variant default)                                  |

## Intentionally left as-is

- `fill-yellow-400/text-yellow-500` star icons (header, sign-in, dashboard) — universal star-rating convention, no token needed.
- `gray-*` neutral classes outside the audited families — neutral grays, only migrated where they represented page background or card surfaces.
- `global-error.tsx` keeps literal neutrals (`#0f0f0f`, `rgba(239,68,68,…)` = red-500): the file renders without the global stylesheet by design.
- `themeColor`/`manifest` `#ffffff` — OS-level metadata, not UI.
- Tailwind v4's own default palette variables (`--purple-50` etc.) present in built CSS — framework internals, never referenced by app code.
