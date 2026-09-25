# Design Rationale — Mohsin Shabbir Portfolio

A cursor-reactive personal portfolio, built as a single self-contained `index.html`
(plain HTML/CSS/vanilla JS, no build, no dependencies — opens by double-click, trivial to host).

## Project
- **Category:** Portfolio / personal brand.
- **Audience:** Prospective clients (small businesses, founders) + peers. Skims on phone, decides in seconds.
- **Signature:** The page *reacts to your cursor* — that interaction is the brand, not a decoration.

## Reference sites (from the skill dataset, portfolio category)
- **Bruno Simon** (bruno-simon.com) — cursor/interactivity *is* the portfolio. Borrowed: reward movement; make the cursor the star.
- **Daniel Spatzek** (danielspatzek.com) — bold display type + smooth magnetic hovers. Borrowed: magnetic CTAs, editorial scale.
- **Tobias van Schneider** (vanschneider.com) — editorial personal-brand structure, warm dark, real voice. Borrowed: asymmetric layout, first-person copy.

## Palette (derived from "Cinema Noir" p044, pushed warmer)
| Token | Hex | Use | Contrast |
|---|---|---|---|
| bg | `#0B0B0E` | page | — |
| surface | `#141419` | cards | — |
| ink | `#ECE7DC` | body text | 14.9:1 on bg ✅ |
| muted | `#9D998F` | secondary | ~6:1 ✅ |
| accent (amber) | `#FF9E2C` | glow, keywords, CTA | ~10:1 on bg ✅ |
| accent-ink | `#0B0B0E` | text on amber | high ✅ |

*Why not indigo→violet:* it's the #1 AI tell. A warm amber-on-near-black reads as
*light* — perfect for a cursor spotlight — and distinguishes Sam's personal brand
from NEXORA's cooler gold.

## Type
- **Display:** Archivo Black (uppercase name + section headings) — engineered, brutalist-editorial, impossible to mistake for Inter.
- **Body:** Manrope 400–800 — geometric-warm, keeps long copy readable.
- **Mono:** Space Mono — section indices, chips, and the **live cursor-coordinate readout** (ties the type system to the theme).
- Validated pair "Archivo Black + Manrope" from the skill's font dataset; all Google Fonts, `display=swap`, preconnected.

## Hero (top-class, not the default)
Asymmetric editorial. One focal point: the name **MOHSIN SHABBIR** at giant scale.
Behind it, an **interactive dot-grid canvas** — dots near the cursor brighten to amber,
scale up and nudge toward it; a soft amber spotlight follows the pointer; a custom
cursor (dot + lagging ring) replaces the arrow. Proof in the fold = real project names
(NEXORA · Mohsin Hub · W. Brothers · Kilcullen Cabs). Two CTAs, both magnetic.
No centered H1 + subhead + two stacked buttons.

## Motion budget (reveals, not decoration)
- **Dot-grid canvas** — reveals interactivity/craft; DPR-aware, dot count capped, `rAF`, pauses when the hero scrolls off-screen or the tab is hidden.
- **Custom cursor** — dot follows exactly, ring lerps at 0.18.
- **Magnetic** CTAs + social/nav chips (strength 0.35).
- **Tilt** on project cards (max 6°) with a cursor-tracked spotlight sheen.
- **Scroll reveal** — one-shot translate/fade on section blocks only (IntersectionObserver), not on everything.
- **Live cursor readout** — mono `x/y` in the hero eyebrow.

## Accessibility
- Skip link; visible `:focus-visible` amber rings; semantic landmarks + `aria-labelledby`.
- Custom cursor, canvas animation, tilt, magnetic and reveals **all disabled** under
  `prefers-reduced-motion` and on touch/coarse pointers — native cursor restored, content shown statically.
- Decorative canvas is `aria-hidden`. Contrast checked (table above).

## SEO / LLM SEO
- Descriptive `<title>` + meta description, canonical, Open Graph + Twitter tags, `theme-color`.
- **JSON-LD `Person`** schema: name, jobTitle, address (Gujranwala, PK), email, `sameAs` GitHub, `knowsAbout`, `worksFor` (NEXORA, Mohsin Hub) — so AI engines can answer "who is Mohsin Shabbir".

## Performance
- Single file, inline CSS/JS, zero images (SVG icons + generative canvas + CSS grain).
- Fonts preconnected + `swap`. Canvas throttled and paused off-screen. Targets: LCP < 2.5s, CLS < 0.1, INP < 200ms.

## Content
All copy is real and specific to Mohsin Shabbir — no lorem, no "your headline here".
Two live projects link out (NEXORA, Mohsin Hub); two are marked *client* without asserting a live URL.

## To edit / publish later
- Edit `index.html` directly. Colours/fonts are CSS variables on `:root`.
- Host anywhere static: drop the folder on Netlify, or commit to the `helo` repo for GitHub Pages.
