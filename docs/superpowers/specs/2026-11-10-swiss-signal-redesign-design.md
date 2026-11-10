# Swiss Signal redesign

## Goal

Rebuild the one-page personal site in the "Swiss Signal" design
(claude.ai artifact `97XhWU5q6LAQt9G3vjv8qT`, file `project/Signal.dc.html`),
refine the README, and carry over the projects from the current site.
It must look good on mobile. Hosting stays on GitHub Pages, deployed by the
existing **Publish website** workflow.

## Decisions

- **Copy:** use the Signal copy (hero, spectrum, principles, contact). Of the
  current site, keep only the projects.
- **Email:** the contact `mailto:` uses `clovis.mugaruka@gmail.com`.
- **Canonical URL:** `https://www.clovisphere.com`. GitHub Pages lists
  `www.clovisphere.com` as the configured domain (set in repo settings, not a
  `CNAME` file; `build_type: workflow`). Used for `canonical`, `og:url`,
  `og:image` and `sitemap.xml`.
- **Stack:** plain HTML, CSS and a small vanilla JS file. No build step.
- **CI:** keep `.github/workflows/pages.yml`. Its copy step already copies
  `assets/` recursively, so `assets/js/` ships without changes. Do not add a
  `CNAME` file.
- **Fonts:** Inter Tight and JetBrains Mono from Google Fonts, as in the
  mockup (self-hosting is an open option).
- **Profile photo:** not shown on the page. Keep `assets/profile.jpg` for the
  og image only.

## Files

| File | Change |
| --- | --- |
| `index.html` | Rewrite from the Signal layout with real content |
| `assets/css/style.css` | Rewrite; CSS variables for dark and light themes |
| `assets/js/main.js` | New: theme toggle, hero word rotation |
| `404.html` | Restyle to match |
| `assets/favicon.svg` | Match the accent dot |
| `sitemap.xml`, `robots.txt` | Point at the canonical URL |
| `README.md` | Rewrite: structure, editing content and theme, deploys |
| `.github/workflows/pages.yml` | Unchanged unless a run shows it must change |

## Sections (Signal order)

1. **Header:** sticky; dot and "Clovisphere", links 01 About, 02 Principles,
   03 Work, 04 Contact, and the theme toggle. Wraps on phones.
2. **Hero:** "Clovis is a [rotating word]_" with the intro line and a button
   that cycles the word.
3. **01 About:** spectrum slider ("Pure engineer" to "Technologist") and the
   two paragraphs.
4. **02 Principles:** four cards (Why before how, Boring is beautiful, People
   are the system, Keep it fun).
5. **03 Work:** hover rows in two groups, "Selected work" (OneLynk, ChezaCash,
   Alice, Omar) and "Outside client work" (Algebraconda, Blip, ODK Installer).
   Each row: index `01`-`07` in place of the mockup's year, name, one-line
   description, stack where known, and an arrow to the link. Links and
   descriptions come from the current site.
6. **04 Contact:** "Let's make something" mailto link, plus GitHub, LinkedIn
   and the copyright line.

## Behavior

- **Theme:** follows the system setting; the toggle saves the choice in
  `localStorage`.
- **No JavaScript:** the page still reads fine; the first word shows and the
  theme follows the system.
- **Reduced motion:** animations and the caret blink are disabled.
- **Accessibility:** skip link, visible focus styles, labelled toggle and
  cycle buttons, sufficient contrast in both themes.

## Mobile

- Mobile-first CSS; fluid `clamp()` type; no horizontal scroll.
- Touch targets of at least 44px.
- Work rows stack: index, name, description, stack.
- Hover effects only under `@media (hover: hover)`.

## Verification

- Screenshots at about 375px, 768px and 1440px in both themes.
- No console errors; no horizontal overflow at 375px.
- Local check with `python3 -m http.server 8000`.
- After pushing, the **Publish website** run succeeds and the live site
  renders.

## Out of scope

Writing or blog section, analytics, framework or build tooling, and changes
to DNS or Pages settings.
