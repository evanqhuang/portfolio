# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
make dev        # Start Astro dev server (localhost:4321)
make build      # Production build to dist/
make preview    # Preview production build locally
make deploy     # Trigger GitHub Pages deploy via GitHub Actions
make tf-init    # Initialize Terraform in infra/
make tf-plan    # Preview infrastructure changes
make tf-apply   # Apply infrastructure changes
make tf-fmt     # Format Terraform files
```

## Architecture

Single-page portfolio site built with **Astro 5** (static output) + **Tailwind CSS v4**, deployed to **GitHub Pages** with **Terraform** managing Cloudflare DNS.

### Tailwind v4 Setup

Tailwind v4 uses CSS-based configuration — there is no `tailwind.config.js`. The theme is defined in `@theme {}` blocks inside `src/styles/global.css`. Installed as a Vite plugin via `@tailwindcss/vite` in `astro.config.mjs`.

**Known issue**: Tailwind v4's Vite plugin respects `.gitignore` for content detection. The parent `~/.gitignore` (dotfiles repo) contains wildcard ignores (`*`, `*/`). This project must have its own `.git` directory so Tailwind can find `.astro` files to scan for utility classes.

### Design System (global.css)

- **void-*** — background colors (obsidian dark)
- **ash-*** — text colors (zinc/neutral)
- **ember-*** — primary accent (amber/gold)
- **oxide-*** — secondary accent (violet)
- Fonts: DM Sans (body), Space Grotesk (headings), IBM Plex Mono (code)
- Component classes: `card`, `card-hover`, `btn-primary`, `btn-ghost`, `filter-btn-active/inactive`, `badge`, `badge-accent`, `mono-label`, `dot-grid`, `crosshatch`

### Content Collection

Projects are defined as markdown files in `src/content/projects/`. Schema in `src/content.config.ts`:
- `title`, `description`, `tech: string[]`, `category` (enum: embedded/web/devtools/finance/infra)
- `github?`, `url?`, `featured` (bool), `order` (number)

Fetched on the index page via `getCollection('projects')`, sorted by `order` then `title`.

### Client-Side Filtering

`ProjectFilter.astro` uses vanilla JS to toggle `.project-card` elements by `data-category` attribute. Filter buttons swap between `filter-btn-active` and `filter-btn-inactive` CSS classes.

### Infrastructure (infra/)

Terraform with Cloudflare provider v5. Resources: apex + www CNAME DNS records pointing to GitHub Pages (`evanqhuang.github.io`). Uses data sources to auto-discover account/zone IDs. DNS is proxied through Cloudflare.

### CI/CD

`.github/workflows/deploy.yml` — auto-deploys to GitHub Pages on push to `main`. Uses `actions/configure-pages`, `actions/upload-pages-artifact`, and `actions/deploy-pages`. No secrets required (uses OIDC via `id-token: write`).
