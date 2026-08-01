# Mitchel Turner — Journalism Website

Personal journalism site for [Mitchel Turner](https://mitchelturner.com/) — local reporting on politics, community, and island life in Ketchikan, Alaska.

| | |
|---|---|
| **Production** | https://mitchelturner.com/ |
| **Staging** | https://mitchelt86.sg-host.com/ |
| **Contact** | hello@mitchelturner.com |

## Features

- **Hero & Headline Ticker** — Brand-forward Rain Coast hero with rotating featured headlines
- **About Me** — Bio, mission, and portrait
- **Tip Line & Records Guide** — Send a tip or learn how to request public records in Alaska
- **Latest Coverage** — Filterable story cards (politics, community, investigation, maritime)
- **Public Meetings Board** — Expandable agendas for borough, school board, city council, and planning commission
- **Investigation Files** — Folder-style dossier browser with document listings
- **Ambient rain** — Canvas atmosphere in the background

## Tech stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS 4
- Framer Motion
- Lucide icons

## Development

Requires **Node.js 20+**.

```bash
npm install
npm run dev
```

| Script | What it does |
|--------|----------------|
| `npm run dev` | Local dev server |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview the production build |
| `npm run pack` | Build + zip for manual SiteGround upload |
| `npm run lint` | ESLint |

## Editing content

Story cards, public meetings, and investigation files live in:

```
src/data/content.ts
```

Portrait and static assets go in `public/` (e.g. `mitchel-turner.jpg`).

## Project layout

```
src/
  App.tsx                 # Page sections
  components/             # UI sections (hero ticker, meetings, files, etc.)
  data/content.ts         # Stories, meetings, investigation folders
public/                   # Static assets copied into the build
scripts/pack-siteground.sh
.github/workflows/        # CI + SiteGround deploy
```

## Deploy to SiteGround

**Recommended:** Connect SiteGround Git to the **`siteground`** branch (not `main`).  
GitHub Actions builds the site automatically on every push to `main` and publishes the built files to that branch.

See **[DEPLOY-SITEGROUND.md](./DEPLOY-SITEGROUND.md)** for full setup, staging vs production paths, and troubleshooting.

Manual fallback:

```bash
npm run pack
```

Upload `siteground-upload.zip` to `public_html` and extract.
