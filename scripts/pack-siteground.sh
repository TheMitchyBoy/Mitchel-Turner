#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

echo "Building production site..."
npm run build

cat > dist/UPLOAD-THESE-FILES.txt <<'EOF'
SiteGround upload checklist
===========================

Upload EVERYTHING in this folder into public_html on SiteGround.
Do NOT upload the project source code (src/, package.json, etc.).

Required files:
  - index.html          (must reference ./assets/*.js — NOT /src/main.tsx)
  - .htaccess
  - assets/             (entire folder with .js and .css inside)
  - favicon.svg
  - mitchel-turner.jpg
  - icons.svg

In SiteGround File Manager:
  1. Open public_html
  2. Delete old index.html if it mentions /src/main.tsx
  3. Upload this zip and Extract, OR upload all files here directly
  4. Confirm public_html/assets/ exists and contains .js files
EOF

rm -f siteground-upload.zip
(cd dist && zip -r ../siteground-upload.zip .)

echo ""
echo "Done! Upload siteground-upload.zip to SiteGround:"
echo "  1. Site Tools → File Manager → public_html"
echo "  2. Upload siteground-upload.zip"
echo "  3. Right-click → Extract"
echo "  4. Delete the zip file after extracting"
echo ""
echo "Verify: open index.html on the server — it should say ./assets/index-*.js"
echo "        NOT /src/main.tsx"
