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

echo "Worker custom domain $WWW koppelen …"
# Workers Domains API — maakt DNS/certificaat indien nodig
RESULT=$(api PUT "/accounts/$ACCOUNT_ID/workers/domains" \
  -d "{\"hostname\":\"$WWW\",\"service\":\"$WORKER\",\"zone_id\":\"$ZONE_ID\"}" 2>&1) || true

if echo "$RESULT" | grep -q '"success":true'; then
  echo "✓ Worker custom domain gekoppeld."
else
  echo "Worker-domain API: $(echo "$RESULT" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('errors',d))" 2>/dev/null || echo "$RESULT")"
  echo "Fallback: redirect rule op zone …"
  # Dynamic redirect (Rulesets API)
  RULESET=$(api GET "/zones/$ZONE_ID/rulesets/phases/http_request_dynamic_redirect/entrypoint" 2>/dev/null || echo '{"result":null}')
  RULESET_ID=$(echo "$RULESET" | python3 -c "import sys,json; r=json.load(sys.stdin).get('result'); print(r['id'] if r else '')" 2>/dev/null || true)

  RULE_BODY=$(cat <<EOF
{
  "description": "www naar apex",
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

  if [[ -n "$RULESET_ID" ]]; then
    api PUT "/zones/$ZONE_ID/rulesets/$RULESET_ID" -d "$RULE_BODY" >/dev/null
  else
    api POST "/zones/$ZONE_ID/rulesets" \
      -d "{\"name\":\"www redirect\",\"kind\":\"zone\",\"phase\":\"http_request_dynamic_redirect\",\"rules\":$(echo "$RULE_BODY" | python3 -c "import sys,json; print(json.dumps(json.load(sys.stdin)['rules']))")}" >/dev/null
  fi
  echo "✓ Redirect rule gezet."
fi

echo ""
echo "Wacht 30s op propagatie …"
sleep 30

STATUS=$(curl -sI --max-time 20 "https://$WWW/" 2>/dev/null | head -1 || echo "timeout")
echo "Test https://$WWW/ → $STATUS"
if echo "$STATUS" | grep -qE '301|302|200'; then
  echo "✓ www werkt. Test in Safari privénavigatie."
else
  echo "Nog geen 301/200. Dashboard: Workers → $WORKER → Domains → Add → $WWW"
  echo "Daarna: Caching → Purge Everything"
fi