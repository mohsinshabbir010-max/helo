# NEXORA — Design Rationale

**Category:** Agency / software house + education (academy). **Audience:** business owners who need AI, software and marketing; students and career-switchers in digital skills.

## References
- **Active Theory** (activetheory.com): cinematic transitions between sections, particle effects. We borrow the slide-to-slide feeling, not the heavy WebGL.
- **Lusion** (lusion.co): 3D scenes that react to scroll and the mouse. The hero particle core reacts to the pointer.
- **Aesop** (aesop.com): an editorial, literary tone. Serif headlines, restrained copy, generous space.

## Palette (base: skill palette p079 "Luxury Onyx", plus platinum from the brief)
| Token | Hex | Use | Contrast on #08080a |
|---|---|---|---|
| `--bg` | #08080a | Page ground | — |
| `--text` | #edebe5 | Body text | ~17:1 |
| `--text-2` | #b4b5bb | Secondary text | ~9.5:1 |
| `--gold` | #c8a24a | Accent, labels | ~8.6:1 |
| `--gold-hi` | #f0dca0 | Highlights | ~15:1 |
| `--plat` | #d8dce2 | Platinum accents | ~14:1 |

## Type
- **Michroma**: NEXORA wordmark and small uppercase labels (wide, futuristic).
- **Bodoni Moda**: headlines, with italic metallic accent words (the luxury-magazine voice).
- **Manrope**: body text. **IBM Plex Mono**: the agent console, notes and figures.

## Hero
Opening sequence (NEXORA mark → letters → metallic line), then an **asymmetric split** hero: the wordmark, tagline and CTAs on the left, and a rotating gold/platinum particle core on the right. The skill discourages a centered hero, so the brief's content sits in a split layout.

## Motion budget
Intro (about 2.7s, skippable, once per session) · horizontal wipe as each slide enters (scroll-driven CSS) · pinned horizontal "Why NEXORA" panels · agent console replay · counters · slow orbit. Every effect turns off under `prefers-reduced-motion`.

## Before launch: replace
- Contact details (`index.html` contact section) and `NEXORA_CONFIG` in `js/data.js` (WhatsApp number, email).
- Social links (currently `#connect`).
- Sample stats, testimonials and concept projects (marked "Sample" / "Concept" on the page).
- Instructor names and photos (`js/data.js`).
