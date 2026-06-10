# Deploy to SiteGround

## The white page problem

If you see a **blank white page**, you almost certainly uploaded **source code** instead of the **built site**.

Check the `index.html` on your server. If it contains:

```html
<script type="module" src="/src/main.tsx"></script>
```

That is **wrong** — browsers cannot run that on SiteGround.

After a correct build, `index.html` must look like:

```html
<script type="module" crossorigin src="./assets/index-xxxxx.js"></script>
<link rel="stylesheet" crossorigin href="./assets/index-xxxxx.css">
```

## Easy deploy (recommended)

On your computer, in this project folder:

```bash
npm install
npm run pack
```

This creates **`siteground-upload.zip`** in the project root.

Then in **SiteGround Site Tools**:

1. Go to **Site** → **File Manager**
2. Open **`public_html`**
3. Delete any old `index.html` that references `/src/main.tsx`
4. **Upload** `siteground-upload.zip`
5. Right-click the zip → **Extract**
6. Make sure you now have:
   - `public_html/index.html`
   - `public_html/assets/` (folder with `.js` and `.css` files)
   - `public_html/.htaccess`
   - `public_html/mitchel-turner.jpg`
7. Delete `siteground-upload.zip` from the server
8. Visit https://mitchelt86.sg-host.com/ and hard-refresh (Ctrl+Shift+R)

## What NOT to upload

Do **not** upload these to `public_html`:

- `src/` folder
- `node_modules/`
- Root `index.html` (the dev version)
- `package.json`, `vite.config.ts`, etc.
- The `dist` folder itself — only **contents inside** `dist`

## Staging URL

Your staging site: https://mitchelt86.sg-host.com/

When ready for production, repeat the same steps in `public_html` for **mitchelturner.com** (you may need to remove or replace the old WordPress files first).
