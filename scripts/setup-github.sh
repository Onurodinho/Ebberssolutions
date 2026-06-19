#!/bin/bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
GH="${GH_BIN:-/tmp/gh_2.74.2_macOS_arm64/bin/gh}"
REPO="Onurodinho/Ebberssolutions"
REMOTE_URL="https://github.com/${REPO}.git"

cd "$ROOT"

if ! "$GH" auth status >/dev/null 2>&1; then
  echo "Niet ingelogd op GitHub. Voer eerst uit:"
  echo "  $GH auth login --hostname github.com --git-protocol https --web"
  echo "  $GH auth setup-git"
  exit 1
fi

if git remote get-url origin >/dev/null 2>&1; then
  git remote set-url origin "$REMOTE_URL"
else
  git remote add origin "$REMOTE_URL"
fi

git push -u origin main

echo ""
echo "Klaar. Private repo:"
"$GH" repo view "$REPO" --json url -q .url