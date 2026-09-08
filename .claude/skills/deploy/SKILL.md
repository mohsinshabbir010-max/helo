---
name: deploy
description: >-
  Publish this portfolio site. Covers GitHub Pages (the default, since the repo
  is already on GitHub) and Netlify as an alternative. Use when the user wants to
  deploy, publish, ship, or put the site online, or update the live version.
---

# Deploy the portfolio site

Static site, no build. The repo's remote is
`https://github.com/mohsinshabbir010-max/helo.git` (branch `main`).

## Pre-flight

1. `git status` — everything intended is committed.
2. Serve locally once and sanity-check: `python -m http.server 8000`.
3. If links/images use absolute paths (`/assets/...`), confirm they'll resolve at
   the deploy URL. GitHub Pages project sites are served from
   `https://<user>.github.io/helo/`, so prefer **relative** paths (`assets/...`).

## GitHub Pages (default)

Deploy = push to `main`. Enabling Pages is a one-time step.

**One-time — enable Pages:**
- If `gh` CLI is available and authenticated:
  ```
  gh api -X POST repos/mohsinshabbir010-max/helo/pages -f build_type=legacy \
    -f "source[branch]=main" -f "source[path]=/"
  ```
- Otherwise, tell the user to do it in the browser:
  GitHub repo → **Settings → Pages** → Source: **Deploy from a branch** →
  Branch: **main**, folder: **/ (root)** → Save.

**Every deploy after that:**
```
git add -A
git commit -m "…"
git push origin main
```
Pages rebuilds automatically (~1 min). Live at `https://mohsinshabbir010-max.github.io/helo/`.

**Optional — custom domain:** add a `CNAME` file containing the domain at the repo
root, set the DNS records GitHub shows on the Pages settings screen, commit, push.

## Netlify (alternative)

- Drag-and-drop: zip the repo root (exclude `.git`) and drop it on
  https://app.netlify.com/drop — instant URL, no account needed for a quick share.
- Git-connected: New site → pick the `helo` repo → build command **blank**,
  publish directory **`.`** → Deploy. Auto-deploys on every push to `main`.

## After deploying

Confirm the live URL loads, check dark mode and the mobile nav on the real URL,
and report the URL to the user.
