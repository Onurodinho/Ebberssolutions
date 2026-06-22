#!/bin/bash
# Registreer Netlify deploy key (public) op GitHub.
# De bijbehorende PRIVATE key plak je in Netlify:
#   Site configuration → Build & deploy → Deploy key
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
GH="${GH_BIN:-/tmp/gh_2.74.2_macOS_arm64/bin/gh}"
REPO="Onurodinho/Ebberssolutions"
KEY_FILE="${1:-$ROOT/.netlify-deploy-key.pub}"

if [[ ! -f "$KEY_FILE" ]]; then
  echo "Geen key-bestand: $KEY_FILE"
  exit 1
fi

if ! "$GH" auth status >/dev/null 2>&1; then
  echo "Log eerst in: $GH auth login"
  exit 1
fi

KEY="$(tr -d '\n' < "$KEY_FILE")"
"$GH" api "repos/$REPO/keys" \
  -f title="Netlify Deploy" \
  -f key="$KEY" \
  -F read_only=true

echo ""
echo "Deploy key toegevoegd op GitHub."
echo "Volgende stap in Netlify (euphonious-boba / ebberssolutions.com):"
echo "  1. Site configuration → Build & deploy → Link repository"
echo "  2. Kies GitHub → Onurodinho/Ebberssolutions → branch main"
echo "  3. Plak de PRIVATE key bij Deploy key (niet de public key)"
echo "  4. Publish directory: / (root)"
echo "  5. Trigger deploy"