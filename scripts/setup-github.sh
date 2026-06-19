#!/bin/bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
GH="${GH_BIN:-/tmp/gh_2.74.2_macOS_arm64/bin/gh}"
REPO_NAME="${1:-ebbers-solutions}"

cd "$ROOT"

if ! "$GH" auth status >/dev/null 2>&1; then
  echo "Niet ingelogd op GitHub. Voer eerst uit:"
  echo "  $GH auth login --hostname github.com --git-protocol https --web"
  exit 1
fi

if "$GH" repo view "$REPO_NAME" >/dev/null 2>&1; then
  echo "Repository bestaat al: $REPO_NAME"
else
  "$GH" repo create "$REPO_NAME" --private --source=. --remote=origin --description "Ebbers Solutions — website Neede"
fi

git push -u origin main

echo ""
echo "Klaar. Private repo:"
"$GH" repo view "$REPO_NAME" --json url -q .url