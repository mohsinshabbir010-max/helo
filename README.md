# Portfolio site

A personal portfolio built with plain HTML, CSS, and JavaScript — no build step, no dependencies.

## Structure

| Path              | Purpose                                        |
| ----------------- | ---------------------------------------------- |
| `index.html`      | The entire page (single-page site)             |
| `css/styles.css`  | All styling; design tokens at the top          |
| `js/main.js`      | Mobile nav toggle, footer year                 |
| `assets/`         | Images and other static files (add as needed)  |

## Develop

Open `index.html` directly in a browser, or serve the folder for a nicer workflow:

```
python -m http.server 8000
```

Then visit http://localhost:8000.

## Customize

1. Replace placeholder text in `index.html` (name, bio, projects, email, social links).
2. Adjust colors, spacing, and fonts via the `:root` variables in `css/styles.css`.
3. Drop project screenshots into `assets/` and reference them from the project cards.

## Deploy

Any static host works: GitHub Pages, Netlify, Cloudflare Pages, Vercel. Point it at the
repository root — there is nothing to build.
