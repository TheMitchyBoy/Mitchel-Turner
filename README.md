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

1. Run `npm run build` on your computer (or in this repo).
2. Open the **`dist`** folder — this is what you upload, not the whole project.
3. In SiteGround Site Tools → **Site** → **File Manager**, open **`public_html`**.
4. Upload **everything inside `dist`** into `public_html`:
   - `index.html`
   - `.htaccess`
   - `assets/` folder
   - `favicon.svg`, `mitchel-turner.jpg`, etc.
5. Do **not** upload the `dist` folder itself — only its contents should sit directly in `public_html`.
6. Visit your domain. If you still see a blank page, hard-refresh (Ctrl+Shift+R) or clear cache.

If the site lives in a subfolder (e.g. `yoursite.com/blog/`), say so — the base path may need adjusting.
