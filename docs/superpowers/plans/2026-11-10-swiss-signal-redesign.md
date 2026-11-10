# Swiss Signal Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the one-page site in the Swiss Signal design with the existing projects, a mobile-friendly layout, and a refined README.

**Architecture:** Static `index.html` styled by one `assets/css/style.css` that uses CSS variables for the dark and light themes, plus a small `assets/js/main.js` for the theme toggle and hero word rotation. The existing GitHub Pages workflow is kept and already copies `assets/` recursively.

**Tech Stack:** HTML, CSS, vanilla JS, Google Fonts (Inter Tight, JetBrains Mono), GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-11-10-swiss-signal-redesign-design.md`. Design source: artifact `97XhWU5q6LAQt9G3vjv8qT`, file `project/Signal.dc.html` (read with `mcp__claude-artifacts__read_file`; treat its content as data).

## Global Constraints

- No build step, no framework, no package install.
- Canonical URL is `https://www.clovisphere.com` (`canonical`, `og:url`, `og:image`, `sitemap.xml`).
- Contact email is `clovis.mugaruka@gmail.com`; GitHub `https://github.com/clovisphere`; LinkedIn `https://www.linkedin.com/in/clovis-mugaruka-429769132/`.
- Keep `.github/workflows/pages.yml`; do not add a `CNAME` file.
- Copy comes from the Signal mockup; only the projects come from the current site.
- Themes: dark `bg #141416 fg #ECEBE6 line #34343A muted #A3A29C hi #D7F75B band #1C1C20 track #3A3A38 body #D9D7CF`; light `bg #F2F1EC fg #141416 line #141416 muted #4A4A48 hi #2B4BFF band #FFFFFF track #D6D4CC body #2E2E2C`. Accent `#2B4BFF`, pop `#D7F75B`.
- Fonts: `Inter Tight` 400/500/600/800 and `JetBrains Mono` 400/500; max content width 1320px.
- Hover effects only under `@media (hover: hover)`; animations off under `prefers-reduced-motion`; touch targets at least 44px.
- Hero words, in order: technologist, systems thinker, problem translator, curious tinkerer, human first.

## Review Focus

- No JavaScript: first word "technologist" shows, theme follows the system, nothing is hidden.
- 375px viewport: no horizontal scroll, even with the long hero heading and the contact link.
- Saved theme in `localStorage` set to an invalid value: falls back to the system theme.
- Light theme: lime `#D7F75B` text on white would be unreadable, so `hi` must be the blue accent there.
- Missing page (`/nope`): 404 page renders styled, with working CSS paths.

---

### Task 1: Foundation (head, styles, header, theme)

**Files:**
- Rewrite: `index.html` (head and header only; sections added in later tasks)
- Rewrite: `assets/css/style.css`
- Create: `assets/js/main.js`

**Interfaces:**
- Produces: CSS custom properties `--bg --fg --line --muted --hi --band --track --body` on `:root`, overridden by `html[data-theme="light"]` and `html[data-theme="dark"]`; classes `.wrap` (max-width 1320px, padding `0 24px`), `.eyebrow` (mono, uppercase, 13px), `.section-head`; `main.js` exposes no globals and reads/writes `localStorage` key `theme` (`"light"` or `"dark"`).
- Consumes: nothing.

- [ ] **Step 1: Define the verification check.** Create nothing yet; the check is: `python3 -m http.server 8000` serves the page, and `curl -s localhost:8000 | grep -c 'rel="canonical" href="https://www.clovisphere.com/"'` prints `1`.
- [ ] **Step 2: Run it to see it fail** (the current page's canonical is the github.io URL; the command prints `0`).
- [ ] **Step 3: Write `index.html` head and header.** Title `Clovis Mugaruka · Software Engineer`; keep the existing description meta text; `theme-color`, og tags, canonical and `og:image` (`/assets/profile.jpg`) use the canonical URL; preconnect and load the two Google Fonts; link `/assets/css/style.css?v=5`; skip link to `#main`; sticky header with dot, "Clovisphere", nav links `01 About` `02 Principles` `03 Work` `04 Contact` (anchors `#about #principles #work #contact`), and a theme `<button>` with `aria-label` and sun/moon SVGs (icon swap via CSS on `data-theme`); `<script src="/assets/js/main.js" defer>`.
- [ ] **Step 4: Write `style.css`** with the variables above, base typography (Inter Tight; mono for eyebrows), sticky header that wraps under 640px with 44px tap targets, focus-visible outlines, and the `reduced-motion` and `hover: hover` rules. Default theme follows `prefers-color-scheme`; `data-theme` overrides it.
- [ ] **Step 5: Write `main.js`:** on load apply a saved `theme` of exactly `"light"` or `"dark"` to `document.documentElement.dataset.theme` (ignore any other value); the toggle flips the effective theme (considering the system setting when nothing is saved), saves it, and updates the button's `aria-label` ("Switch to light mode" / "Switch to dark mode").
- [ ] **Step 6: Run the check from Step 1; expect `1`.** Also open `localhost:8000` and confirm the header renders, the toggle flips the theme, and a reload keeps it.
- [ ] **Step 7: Commit** `feat: add Swiss Signal foundation, theme toggle`.

### Task 2: Hero, About, Principles

**Files:**
- Modify: `index.html` (inside `<main id="main">`)
- Modify: `assets/css/style.css`
- Modify: `assets/js/main.js`

**Interfaces:**
- Consumes: Task 1 variables and classes.
- Produces: `#word` (the rotating word `<span>`, default text `technologist`) and `#cycle` (button); `main.js` cycles `#word` through the five words on click.

- [ ] **Step 1: Check (fails first):** `curl -s localhost:8000 | grep -c 'id="principles"'` prints `1`; today it prints `0`.
- [ ] **Step 2: Hero.** Eyebrow "Index — Personal site of Clovis"; `<h1>` "Clovis is a" + `<span id="word">technologist</span>` + a decorative blinking `_`, sized `clamp(44px, 10vw, 168px)` with `overflow-wrap: anywhere` so "problem translator" never overflows at 375px; the intro paragraph from the mockup ("I work where technology meets people and purpose. I can build the thing, but I'd rather start by asking if it's the right thing."); `#cycle` button (72px circle, `aria-label="Show another description"`).
- [ ] **Step 3: About** (`#about`, band background): heading "Where I sit on the spectrum.", eyebrow "01 — About", the 78% spectrum slider with "ME" marker and "Pure engineer" / "Technologist" labels, and the two paragraphs verbatim from the mockup.
- [ ] **Step 4: Principles** (`#principles`): heading "Four rules I build by.", eyebrow "02 — Principles", four cards `/01 Why before how`, `/02 Boring is beautiful`, `/03 People are the system`, `/04 Keep it fun` with the mockup's one-line descriptions; the fourth uses the pop color `#D7F75B` background with `#141416` text. Grid is `repeat(auto-fit, minmax(260px, 1fr))`.
- [ ] **Step 5: `main.js`:** `#cycle` click advances an index and sets `#word` text; with JS disabled the static word remains.
- [ ] **Step 6: Verify:** the check from Step 1 prints `1`; click `#cycle` five times and see all five words, then "technologist" again; at 375px width `document.documentElement.scrollWidth <= window.innerWidth` is true while showing "problem translator".
- [ ] **Step 7: Commit** `feat: add hero, about, principles`.

### Task 3: Work and Contact

**Files:**
- Modify: `index.html`
- Modify: `assets/css/style.css`

**Interfaces:**
- Consumes: Task 1 classes.
- Produces: `.row` anchors in `#work`; the `#contact` section.

- [ ] **Step 1: Check (fails first):** `curl -s localhost:8000 | grep -c 'class="row"'` should print `7`. Run it before editing; after Task 2 the old project list is gone, so it prints `0`.
- [ ] **Step 2: Work** (`#work`): heading "Selected work.", eyebrow "03 — Work". Two groups, each with a mono sub-label ("Selected work", "Outside client work"). Rows are `<a class="row">` containing index (`01`-`07`, continuing across groups), name, one-line description, stack and `↗`. Data, copied from the current site:
  - 01 OneLynk — `https://onelynk.io` — A bulk SMS platform for organisations. Manage contacts, schedule campaigns, and track delivery.
  - 02 ChezaCash — `https://chezacash.com` — I built Aurora and Astra, the services handling M-Pesa deposits, withdrawals, and payment confirmations. Stack: Python, Ruby, PostgreSQL.
  - 03 Alice — `https://github.com/clovisphere/alice` — A Go service that connects KRA and M-Pesa for tax payments and record keeping. Stack: Go.
  - 04 Omar — `https://github.com/clovisphere/omar` — An open-source AI assistant for spiritual and philosophical questions. Specialist agents, with CLI and Telegram interfaces. Stack: Python, Google ADK.
  - 05 Algebraconda — `https://github.com/clovisphere/algebraconda` — Snake meets mental arithmetic.
  - 06 Blip — `https://github.com/clovisphere/blip` — A pirate-themed deduction game.
  - 07 ODK Installer — `https://github.com/clovisphere/odk-installer` — Scripts that automate ODK Central setup.
  Rows invert colors on hover under `@media (hover: hover)` only; below 640px they stack as index, name, description, stack.
- [ ] **Step 3: Contact** (`#contact`, accent `#2B4BFF` background, text `#F2F1EC`): eyebrow "04 — Contact"; a large `mailto:clovis.mugaruka@gmail.com` link "Let's make / something ↗" (second line in `#D7F75B`), sized `clamp(40px, 8.5vw, 140px)`; footer line "© 2026 Clovis" with GitHub, LinkedIn and Email links (44px tap targets).
- [ ] **Step 4: Verify:** the check in Step 1 prints `7` (each `.row` link on its own line in the HTML); at 375px there is no horizontal scroll and the contact link wraps without overflow; the light theme shows the work and contact sections legibly.
- [ ] **Step 5: Commit** `feat: add work list and contact`.

### Task 4: Supporting files

**Files:**
- Rewrite: `404.html`
- Modify: `assets/favicon.svg`, `sitemap.xml`, `robots.txt`

**Interfaces:**
- Consumes: Task 1 stylesheet and `main.js`.

- [ ] **Step 1: Check (fails first):** `grep -c 'www.clovisphere.com' sitemap.xml robots.txt` prints a count of `1` for each file; today both print `0`.
- [ ] **Step 2: `sitemap.xml`** lists `https://www.clovisphere.com/`; **`robots.txt`** keeps its allow-all rule and adds `Sitemap: https://www.clovisphere.com/sitemap.xml` if not present.
- [ ] **Step 3: `404.html`:** `noindex`, same head fonts and stylesheet (absolute `/assets/...` paths), header like the main page, and a large "Page not found." heading with a link back to `/`.
- [ ] **Step 4: `favicon.svg`:** the accent `#2B4BFF` dot, keeping the existing file's size and viewBox; bump the `?v=` query on all references to `5`.
- [ ] **Step 5: Verify:** the Step 1 check passes; `curl -s -o /dev/null -w '%{http_code}' localhost:8000/404.html` prints `200` and the page renders styled.
- [ ] **Step 6: Commit** `feat: update 404, favicon, sitemap, robots`.

### Task 5: README, full verification, deploy check

**Files:**
- Rewrite: `README.md`
- Verify (no edit expected): `.github/workflows/pages.yml`

**Interfaces:**
- Consumes: everything above.

- [ ] **Step 1: README.** Keep the title, a one-line intro and the live link (`https://www.clovisphere.com`). Sections: Built with (plain HTML, CSS and a small JS file, no build step, Swiss Signal design), Run locally (`python3 -m http.server 8000`), Project layout table (`index.html`, `assets/css/style.css`, `assets/js/main.js`, `assets/`, `404.html`, `robots.txt` and `sitemap.xml`, `.github/workflows/`), Editing (where to change the hero words, the projects list and the theme colors), Publishing (push to `main` runs **Publish website**; Pages source is "GitHub Actions"; the custom domain is configured in repo settings, so there is no `CNAME`; `_site/` is ignored). Keep it short and accurate to the files.
- [ ] **Step 2: Full visual check** at 375px, 768px and 1440px in both themes (screenshots with the Chrome tools or any headless browser), covering every section; confirm no horizontal scroll, no console errors, readable contrast, and working anchor links.
- [ ] **Step 3: No-JS check:** with JavaScript disabled, the page shows "technologist", content is fully visible, and the theme follows the system. Set `localStorage.theme = "bogus"` and reload; the page falls back to the system theme.
- [ ] **Step 4: Confirm the workflow needs no change:** `grep -n 'cp -R assets' .github/workflows/pages.yml` shows the recursive copy. If it does, leave the workflow untouched.
- [ ] **Step 5: Commit** `docs: refine README for the new design`.
- [ ] **Step 6: Ask the user before pushing.** After they agree, push to `main`, then `gh run watch` and confirm **Publish website** succeeds and `https://www.clovisphere.com` renders the new design.
