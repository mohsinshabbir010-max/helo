# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

A personal portfolio website built with **plain HTML, CSS, and vanilla JavaScript**.
No framework, no build step, no package manager, no dependencies. Files are served
as-is.

## Commands

There is no build or test tooling. To preview locally, serve the repo root:

```
python -m http.server 8000     # then open http://localhost:8000
```

Opening `index.html` directly in a browser also works, but a server avoids
file:// path quirks.

## Architecture

Single-page site. The whole document is `index.html`; navigation links are
in-page anchors (`#about`, `#projects`, `#contact`) with `scroll-behavior: smooth`.

- **`index.html`** — all markup. Sections: header/nav, `.hero`, `#about`,
  `#projects` (a `.projects` grid of `.card` articles), `#contact`, footer.
- **`css/styles.css`** — all styling. Design tokens (colors, radius, max width,
  spacing) are CSS custom properties on `:root`, with a dark-mode override block
  under `@media (prefers-color-scheme: dark)`. Change theming there, not in
  individual rules. Mobile styles live in the `@media (max-width: 640px)` block,
  which is what activates the hamburger menu.
- **`js/main.js`** — two small behaviors only: the mobile nav toggle (adds
  `.is-open` to `#nav-menu`, syncs `aria-expanded`) and writing the current year
  into `#year`. Keep JS minimal; the site should work with scripting disabled.
- **`assets/`** — images and static files.

## Conventions

- CSS classes follow a loose BEM style (`.card`, `.card__title`, `.nav__menu`).
- Keep the site dependency-free and no-build unless there's a strong reason to
  change that — it's a deliberate constraint. If a build step ever gets added,
  update the Commands and Architecture sections here.
- Preserve accessibility basics already in place: semantic landmarks, the
  `aria-expanded` toggle, and the `prefers-reduced-motion` block in the CSS.

## Content

Text in `index.html` is placeholder copy (name shown as "Sam", `you@example.com`,
dummy project cards). Real content replaces it in place — there is no CMS or data
file.

## Project helpers

- **`site-review` agent** (`.claude/agents/site-review.md`) — read-only audit of
  accessibility, responsive layout, dark mode, and BEM/token consistency. Run it
  after changing `index.html` or `css/styles.css`.
- **`deploy` skill** (`.claude/skills/deploy/`) — steps to publish to GitHub Pages
  (repo is already on GitHub) or Netlify.
