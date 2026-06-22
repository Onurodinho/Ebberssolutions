#!/bin/bash
# Zet ebberssolutions.com om van Netlify → Cloudflare Worker "ebbers"
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "=== Ebbers Solutions: domein naar Cloudflare Worker ==="
echo ""
echo "Probleem: ebberssolutions.com wijst nog naar Netlify (oude site)."
echo "Oplossing: Worker 'ebbers' deployen + custom domain koppelen."
echo ""

if curl -sI https://ebberssolutions.com/ 2>/dev/null | grep -qi 'netlify'; then
  echo "Status nu: domein serveert nog NETLIFY"
else
  echo "Status nu: geen Netlify-header meer — mogelijk al omgezet"
fi
echo ""

echo "── STAP 1: Cloudflare API-token ──"
echo "  https://dash.cloudflare.com/profile/api-tokens"
echo "  → Create Token → template 'Edit Cloudflare Workers'"
echo "  → Zone Resources: ebberssolutions.com (of All zones)"
echo ""
echo "── STAP 2: Account ID ──"
echo "  Dashboard home, rechterkolom onder 'Account ID'"
echo ""

if [[ -z "${CLOUDFLARE_API_TOKEN:-}" || -z "${CLOUDFLARE_ACCOUNT_ID:-}" ]]; then
  echo "Geen CLOUDFLARE_API_TOKEN / CLOUDFLARE_ACCOUNT_ID in deze shell."
  echo ""
  echo "── STAP 3 (handmatig in dashboard — VOLGORDE BELANGRIJK) ──"
  echo "  1. DNS → Records voor ebberssolutions.com:"
  echo "     → Verwijder EERST oude records (A/CNAME naar Netlify of andere origin)"
  echo "  2. Workers & Pages → Worker 'ebbers' → Settings → Domains & Routes"
  echo "     → Add → Custom Domain → ebberssolutions.com"
  echo "     → Add → Custom Domain → www.ebberssolutions.com"
  echo "     (Custom domain in wrangler.jsonc faalt zolang oude DNS nog bestaat)"
  echo "  4. Caching → Configuration → Purge Everything"
  echo "  5. Netlify: Site settings → Domain management → verwijder ebberssolutions.com"
  echo ""
  echo "── STAP 4 (deploy via CLI) ──"
  echo "  export CLOUDFLARE_API_TOKEN='...'"
  echo "  export CLOUDFLARE_ACCOUNT_ID='...'"
  echo "  bash scripts/switch-domain-to-cloudflare.sh"
  echo ""
  echo "── STAP 5 (optioneel: auto-deploy bij git push) ──"
  echo "  GitHub repo → Settings → Secrets → Actions:"
  echo "    CLOUDFLARE_API_TOKEN, CLOUDFLARE_ACCOUNT_ID"
  echo "  Commit + push .github/workflows/deploy-cloudflare-pages.yml"
  exit 0
fi

echo "Credentials gevonden — deploy Worker + custom domains …"
echo ""

npx wrangler deploy

echo ""
echo "Deploy klaar (workers.dev actief). Koppel domein handmatig in dashboard (STAP 3)."
echo "Controleer headers:"
sleep 3
if curl -sI https://ebberssolutions.com/ 2>/dev/null | grep -qi 'netlify'; then
  echo "⚠ Nog steeds Netlify. Verwijder oude DNS/origin in Cloudflare dashboard (STAP 3)."
  echo "  curl -sI https://ebberssolutions.com/ | grep -i netlify"
  exit 1
fi

if curl -s https://ebberssolutions.com/ 2>/dev/null | grep -q '20260622c'; then
  echo "✓ Domein serveert nieuwe code (cache-bust 20260622c gevonden)."
else
  echo "✓ Geen Netlify meer. Cache legen in dashboard als oude pagina zichtbaar blijft."
fi