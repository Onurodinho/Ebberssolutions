#!/bin/bash
# Eenmalige setup: formulier + chatbot-mails naar Peter (peterebbers67@gmail.com)
set -euo pipefail

DOMAIN="ebberssolutions.com"
PETER_EMAIL="peterebbers67@gmail.com"
FROM_EMAIL="contact@ebberssolutions.com"

echo "=== Cloudflare Email Sending — Ebbers Solutions ==="
echo ""
echo "Doel: contactformulier + chatbot-leads → ${PETER_EMAIL}"
echo "Afzender: ${FROM_EMAIL}"
echo ""

if [[ -z "${CLOUDFLARE_API_TOKEN:-}" || -z "${CLOUDFLARE_ACCOUNT_ID:-}" ]]; then
  echo "Zet eerst CLOUDFLARE_API_TOKEN en CLOUDFLARE_ACCOUNT_ID (zelfde als GitHub Actions)."
  echo ""
  echo "Handmatig in Cloudflare Dashboard:"
  echo "  1. https://dash.cloudflare.com → Email → Email Sending"
  echo "  2. Onboard domain: ${DOMAIN}"
  echo "  3. Voeg SPF/DKIM DNS-records toe (meestal automatisch)"
  echo "  4. Wacht 5–15 min tot DNS actief is"
  echo ""
  echo "Daarna test:"
  echo "  curl -X POST https://${DOMAIN}/api/contact \\"
  echo "    -H 'Content-Type: application/json' \\"
  echo "    -d '{\"naam\":\"Test\",\"email\":\"test@example.com\",\"onderwerp\":\"anders\",\"bericht\":\"Testbericht van minstens tien tekens.\"}'"
  echo ""
  echo "Verwacht: {\"ok\":true} — mail in inbox ${PETER_EMAIL}"
  exit 0
fi

echo "Email Sending inschakelen voor ${DOMAIN} …"
npx wrangler email sending enable "${DOMAIN}" || true

echo ""
echo "DNS-records (SPF/DKIM):"
npx wrangler email sending dns get "${DOMAIN}" || true

echo ""
echo "Testmail naar Peter …"
npx wrangler email sending send \
  --from="${FROM_EMAIL}" \
  --to="${PETER_EMAIL}" \
  --subject="[Test] Ebbers website e-mail werkt" \
  --text="Als u dit leest, komen contactformulier en chatbot-leads aan op ${PETER_EMAIL}." \
  || echo "Test verzenden mislukt — controleer of ${DOMAIN} volledig is onboarded."

echo ""
echo "Klaar. Deploy opnieuw als wrangler.jsonc is gewijzigd: git push origin main"