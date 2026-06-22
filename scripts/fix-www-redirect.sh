#!/bin/bash
# Fix www.ebberssolutions.com → 301 naar apex (private Safari / Error 522)
#
# Oorzaak: www heeft DNS maar geen Worker-custom-domain en geen redirect rule.
# Gebruik: export CLOUDFLARE_API_TOKEN=... CLOUDFLARE_ACCOUNT_ID=...
#          bash scripts/fix-www-redirect.sh
set -euo pipefail

DOMAIN="ebberssolutions.com"
WWW="www.ebberssolutions.com"
WORKER="ebbers"
ACCOUNT_ID="${CLOUDFLARE_ACCOUNT_ID:?Zet CLOUDFLARE_ACCOUNT_ID}"
TOKEN="${CLOUDFLARE_API_TOKEN:?Zet CLOUDFLARE_API_TOKEN}"

api() {
  local method="$1" path="$2"
  shift 2
  curl -sf -X "$method" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    "https://api.cloudflare.com/client/v4$path" \
    "$@"
}

echo "=== www-fix: $WWW → https://$DOMAIN ==="

echo "Zone opzoeken …"
ZONE_JSON=$(api GET "/zones?name=$DOMAIN")
ZONE_ID=$(echo "$ZONE_JSON" | python3 -c "import sys,json; r=json.load(sys.stdin)['result']; print(r[0]['id'] if r else '')")
if [[ -z "$ZONE_ID" ]]; then
  echo "Zone $DOMAIN niet gevonden." >&2
  exit 1
fi
echo "Zone ID: $ZONE_ID"

echo "DNS voor www controleren …"
EXISTING=$(api GET "/zones/$ZONE_ID/dns_records?name=$WWW" | python3 -c "import sys,json; print(len(json.load(sys.stdin)['result']))")
if [[ "$EXISTING" == "0" ]]; then
  echo "A-record www aanmaken (192.0.2.0, proxied) …"
  api POST "/zones/$ZONE_ID/dns_records" \
    -d "{\"type\":\"A\",\"name\":\"www\",\"content\":\"192.0.2.0\",\"proxied\":true,\"ttl\":1}" >/dev/null
else
  echo "www DNS bestaat al ($EXISTING record(s))."
fi

echo "Redirect rule zetten (geen Worker custom domain — dat breekt wrangler deploy) …"
RULE_PAYLOAD=$(cat <<EOF
{
  "name": "www naar apex",
  "kind": "zone",
  "phase": "http_request_dynamic_redirect",
  "rules": [
    {
      "expression": "(http.host eq \"$WWW\")",
      "description": "www → apex",
      "action": "redirect",
      "action_parameters": {
        "from_value": {
          "target_url": {
            "expression": "concat(\"https://$DOMAIN\", http.request.uri.path)"
          },
          "status_code": 301,
          "preserve_query_string": true
        }
      }
    }
  ]
}
EOF
)
api POST "/zones/$ZONE_ID/rulesets" -d "$RULE_PAYLOAD" >/dev/null 2>&1 || \
  api PUT "/zones/$ZONE_ID/rulesets/phases/http_request_dynamic_redirect/entrypoint" -d "$RULE_PAYLOAD" >/dev/null
echo "✓ Redirect rule gezet."

echo ""
echo "Wacht 30s op propagatie …"
sleep 30

STATUS=$(curl -sI --max-time 20 "https://$WWW/" 2>/dev/null | head -1 || echo "timeout")
echo "Test https://$WWW/ → $STATUS"
if echo "$STATUS" | grep -qE '301|302'; then
  echo "✓ www redirect actief (snel — geen volledige pagina op www)."
elif echo "$STATUS" | grep -q '200'; then
  echo "⚠ www geeft nog 200 (traag). Controleer of de redirect rule actief is."
else
  echo "Nog geen 301. Caching → Purge Everything en opnieuw testen."
fi