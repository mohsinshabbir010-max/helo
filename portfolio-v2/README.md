# portfolio-v2

A second personal portfolio built the same way as the parent site: **plain HTML,
CSS, and vanilla JavaScript**. No framework, no build step, no dependencies.

## Preview

Serve this folder:

```
python -m http.server 8000     # then open http://localhost:8000
```

Opening `index.html` directly also works, but a server avoids `file://` quirks.

## Structure

- `index.html` — all markup. Sections: header/nav, `.hero`, `#about`, `#work`
  (`.projects` grid of `.card` articles), `#experience` (`.timeline`), `#contact`,
  footer.
- `css/styles.css` — all styling. Design tokens are CSS custom properties on
  `:root`, with a `@media (prefers-color-scheme: dark)` override block. Mobile
  styles (including the hamburger menu) live in `@media (max-width: 640px)`.
- `js/main.js` — mobile nav toggle + current year in the footer. Core content
  works without JS; a `<noscript>` block in `index.html` falls back to a static
  expanded menu.
- `assets/` — images and static files.

## Conventions

- CSS classes follow a loose BEM style (`.card`, `.card__title`, `.nav__menu`).
- Keep it dependency-free and no-build.
- Preserve the accessibility basics: skip link, semantic landmarks, the
  `aria-expanded` toggle, `:focus-visible` styles, and the
  `prefers-reduced-motion` block.

## Content

Text is placeholder copy (name shown as "Sam", `you@example.com`, dummy
projects). Replace it in place.
