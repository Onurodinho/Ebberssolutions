#!/usr/bin/env bash
# Eenmalige setup: Cloudflare Email Sending voor het contactformulier.
set -euo pipefail

DOMAIN="${1:-ebberssolutions.com}"

echo "→ Email Sending inschakelen voor ${DOMAIN}…"
npx wrangler email sending enable "${DOMAIN}"

echo ""
echo "→ Controleren…"
npx wrangler email sending list

echo ""
echo "Klaar. Deploy daarna met: npm run deploy:ci"
echo "Testformulier: https://${DOMAIN}/contact.html"