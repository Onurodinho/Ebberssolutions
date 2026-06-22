#!/bin/bash
# Cloudflare Pages — eenmalige setup voor ebberssolutions.com
set -euo pipefail

echo "=== Cloudflare Pages setup — Ebbers Solutions ==="
echo ""
echo "1. API-token (Cloudflare Dashboard)"
echo "   https://dash.cloudflare.com/profile/api-tokens"
echo "   → Create Token → Edit Cloudflare Pages (of custom: Account + Pages Edit)"
echo ""
echo "2. Account ID (rechterkolom op Cloudflare dashboard home)"
echo ""
echo "3. GitHub Secrets (repo Onurodinho/Ebberssolutions)"
echo "   Settings → Secrets and variables → Actions → New repository secret"
echo "   • CLOUDFLARE_API_TOKEN"
echo "   • CLOUDFLARE_ACCOUNT_ID"
echo ""
echo "4. Trigger deploy"
echo "   GitHub → Actions → 'Deploy naar Cloudflare Pages' → Run workflow"
echo "   (of: git push naar main)"
echo ""
echo "5. Custom domain (Cloudflare Dashboard)"
echo "   Workers & Pages → ebberssolutions → Custom domains"
echo "   → ebberssolutions.com + www.ebberssolutions.com"
echo "   (DNS staat al op Cloudflare — Pages koppelt automatisch)"
echo ""
echo "6. Oude Netlify-koppeling verwijderen"
echo "   Verwijder CNAME/proxy naar Netlify als die nog in DNS staat."
echo "   Pages neemt het domein over zodra custom domain is toegevoegd."
echo ""
echo "Let op: contactformulier (Netlify Forms) werkt niet op Pages."
echo "       Volgende stap: Formspree of Web3Forms (zie README)."

if [[ -n "${CLOUDFLARE_API_TOKEN:-}" && -n "${CLOUDFLARE_ACCOUNT_ID:-}" ]]; then
  echo ""
  echo "Token gevonden — project aanmaken en eerste deploy …"
  npx wrangler@latest pages project create ebberssolutions --production-branch=main 2>/dev/null || true
  CLOUDFLARE_API_TOKEN="$CLOUDFLARE_API_TOKEN" CLOUDFLARE_ACCOUNT_ID="$CLOUDFLARE_ACCOUNT_ID" \
    npx wrangler@latest pages deploy . --project-name=ebberssolutions --branch=main
  echo "Deploy klaar. Voeg custom domain toe in het dashboard."
fi