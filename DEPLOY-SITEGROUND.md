# Deploy to SiteGround from GitHub

This repo is set up so **SiteGround pulls a pre-built site** — not the React source code.

## How it works

Every push to `main` triggers a GitHub Action that:

1. Runs `npm ci` and `npm run build`
2. Pushes the built files to the **`siteground`** branch (only `index.html`, `assets/`, `.htaccess`, images, etc.)

SiteGround should pull from the **`siteground`** branch — **not** `main`.

---

## One-time SiteGround setup

1. Push this repo to GitHub (if you haven't already).
2. Wait for the **Build for SiteGround** action to finish on `main` (GitHub → Actions tab).
3. Confirm the **`siteground`** branch exists on GitHub.
4. In **SiteGround Site Tools** → **Devs** → **Git**:
   - **Create New Repository** (or edit existing)
   - **Repository URL:** your GitHub repo (HTTPS or SSH)
   - **Branch:** `siteground` ← important
   - **Install path:** `public_html` (or your staging folder)
5. Click **Deploy** (or enable auto-deploy on push if your plan supports it).

### First deploy cleanup

If you previously uploaded source files, delete these from `public_html` before deploying:

- `src/` folder
- Root `index.html` that contains `/src/main.tsx`
- `node_modules/`, `package.json`, etc.

After a correct deploy, `public_html/index.html` should reference `./assets/index-*.js`.

---

## Staging vs production

| Site | Typical path |
|------|----------------|
| Staging | https://mitchelt86.sg-host.com/ → staging `public_html` |
| Production | https://mitchelturner.com/ → main domain `public_html` |

Use the same **`siteground`** branch for both — just point each SiteGround Git install at the right folder.

---

## Manual upload (backup option)

If Git deploy isn't available on your plan:

```bash
npm install
npm run pack
```

Upload **`siteground-upload.zip`** to `public_html` and extract. See `UPLOAD-THESE-FILES.txt` inside the zip.

---

## Troubleshooting white page

| Symptom | Cause | Fix |
|---------|--------|-----|
| White page | SiteGround pulling `main` instead of `siteground` | Change branch to `siteground` in Git settings |
| White page | `index.html` has `/src/main.tsx` | Wrong files on server — redeploy from `siteground` branch |
| White page | Missing `assets/` folder | Re-run GitHub Action, then Deploy in SiteGround |

Hard refresh after deploy: **Ctrl+Shift+R** (Windows) or **Cmd+Shift+R** (Mac).
