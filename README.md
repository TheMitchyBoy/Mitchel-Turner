# Mitchel Turner — Journalism Website

A modern personal journalism site for Mitchel Turner, covering local topics and politics in Ketchikan, Alaska.

## Features

- **Headline Ticker** — Rotating featured headlines in the hero
- **Public Meetings Board** — Expandable agendas for borough, school board, city council, and planning commission
- **Investigation Files** — Folder-style dossier browser with document listings
- **Tip Line & Records Guide** — Send a tip or learn how to request public records in Alaska
- **Story Cards** — Filterable story grid with expandable previews

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy to SiteGround

**Recommended:** Connect SiteGround Git to the **`siteground`** branch (not `main`).  
GitHub Actions builds the site automatically on every push to `main`.

See **[DEPLOY-SITEGROUND.md](./DEPLOY-SITEGROUND.md)** for full setup steps.

Manual fallback: `npm run pack` → upload `siteground-upload.zip` to `public_html`.
