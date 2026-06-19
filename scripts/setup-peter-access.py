#!/usr/bin/env python3
"""
Eenmalige setup: site live, Netlify Identity, Git Gateway, Peter uitnodigen.

Gebruik:
  export NETLIFY_AUTH_TOKEN="nfp_..."
  python3 scripts/setup-peter-access.py

Token aanmaken: https://app.netlify.com/user/applications#personal-access-tokens
"""
from __future__ import annotations

import io
import json
import os
import sys
import time
import urllib.error
import urllib.request
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SITE_ID = "1819af13-e955-477e-9570-cdaa6c1e24aa"
SITE_NAME = "ebbers-solutions"
PETER_EMAIL = "peterebbers67@gmail.com"
GITHUB_REPO = "Onurodinho/Ebberssolutions"
API = "https://api.netlify.com/api/v1"

ZIP_SKIP_DIRS = {
    ".git", "node_modules", ".netlify", ".grok", ".vscode",
}
ZIP_SKIP_FILES = {".DS_Store"}


class NetlifyClient:
    def __init__(self, token: str):
        self.token = token

    def request(self, method: str, path: str, data=None, content_type="application/json"):
        url = f"{API}{path}"
        body = None
        headers = {
            "Authorization": f"Bearer {self.token}",
            "User-Agent": "EbbersSolutions-Setup/1.0",
        }
        if data is not None:
            if content_type == "application/json":
                body = json.dumps(data).encode("utf-8")
                headers["Content-Type"] = "application/json"
            else:
                body = data
                headers["Content-Type"] = content_type
        req = urllib.request.Request(url, data=body, headers=headers, method=method)
        try:
            with urllib.request.urlopen(req, timeout=120) as res:
                raw = res.read()
                if not raw:
                    return res.status, None
                return res.status, json.loads(raw.decode("utf-8"))
        except urllib.error.HTTPError as err:
            raw = err.read().decode("utf-8", errors="replace")
            try:
                payload = json.loads(raw) if raw else None
            except json.JSONDecodeError:
                payload = raw
            raise RuntimeError(f"{method} {path} → HTTP {err.code}: {payload}") from err


def build_site_zip() -> bytes:
    buffer = io.BytesIO()
    with zipfile.ZipFile(buffer, "w", zipfile.ZIP_DEFLATED) as zf:
        for path in ROOT.rglob("*"):
            if path.is_dir():
                continue
            rel = path.relative_to(ROOT)
            parts = rel.parts
            if parts[0] in ZIP_SKIP_DIRS:
                continue
            if path.name in ZIP_SKIP_FILES:
                continue
            zf.write(path, rel.as_posix())
    return buffer.getvalue()


def resolve_site(client: NetlifyClient) -> dict:
    env_site_id = os.environ.get("NETLIFY_SITE_ID", "").strip()
    candidates = [c for c in (env_site_id, SITE_ID, SITE_NAME, f"{SITE_NAME}.netlify.app") if c]
    for candidate in candidates:
        try:
            _, site = client.request("GET", f"/sites/{candidate}")
            return site
        except RuntimeError as err:
            if "HTTP 404" not in str(err):
                raise
    print("Site niet gevonden — nieuwe site aanmaken …")
    _, site = client.request("POST", "/sites", {
        "name": SITE_NAME,
        "repo": {
            "provider": "github",
            "repo": GITHUB_REPO,
            "branch": "main",
            "dir": "/",
            "cmd": "",
        },
    })
    return site


def deploy_zip(client: NetlifyClient, site_id: str) -> None:
    print("ZIP-deploy starten (fallback als GitHub-build niet klaar is) …")
    payload = build_site_zip()
    url = f"{API}/sites/{site_id}/deploys"
    req = urllib.request.Request(
        url,
        data=payload,
        headers={
            "Authorization": f"Bearer {client.token}",
            "Content-Type": "application/zip",
            "User-Agent": "EbbersSolutions-Setup/1.0",
        },
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=300) as res:
        deploy = json.loads(res.read().decode("utf-8"))
    deploy_id = deploy.get("id")
    print(f"Deploy gestart: {deploy_id}")
    for _ in range(60):
        _, status = client.request("GET", f"/deploys/{deploy_id}")
        state = status.get("state")
        print(f"  status: {state}")
        if state in {"ready", "error"}:
            if state == "error":
                raise RuntimeError(f"Deploy mislukt: {status.get('error_message')}")
            break
        time.sleep(5)


def enable_identity(client: NetlifyClient, site_id: str) -> str:
    print("Netlify Identity inschakelen …")
    try:
        _, identity = client.request("POST", f"/sites/{site_id}/identity")
    except RuntimeError as err:
        if "HTTP 422" in str(err) or "already" in str(err).lower():
            _, identity = client.request("GET", f"/sites/{site_id}/identity")
        else:
            raise
    identity_id = identity.get("identity_id") or identity.get("id")
    if not identity_id:
        raise RuntimeError(f"Geen identity_id in response: {identity}")
    client.request("PUT", f"/sites/{site_id}/identity/{identity_id}", {
        "disable_signup": True,
    })
    print("  Registratie: alleen op uitnodiging")
    return identity_id


def enable_git_gateway(client: NetlifyClient, site_id: str) -> None:
    print("Git Gateway inschakelen …")
    try:
        client.request("POST", f"/sites/{site_id}/services/git-gateway/instances", {})
    except RuntimeError as err:
        if "HTTP 422" in str(err) or "already" in str(err).lower():
            print("  Git Gateway was al actief")
            return
        raise


def invite_peter(client: NetlifyClient, site_id: str, identity_id: str) -> None:
    print(f"Peter uitnodigen ({PETER_EMAIL}) …")
    client.request("POST", f"/sites/{site_id}/identity/{identity_id}/users/invite", {
        "email": PETER_EMAIL,
    })


def main() -> int:
    token = os.environ.get("NETLIFY_AUTH_TOKEN", "").strip()
    if not token:
        print("Fout: stel NETLIFY_AUTH_TOKEN in.")
        print("Token: https://app.netlify.com/user/applications#personal-access-tokens")
        print("")
        print("  export NETLIFY_AUTH_TOKEN='jouw-token'")
        print("  python3 scripts/setup-peter-access.py")
        return 1

    client = NetlifyClient(token)
    _, user = client.request("GET", "/user")
    print(f"Ingelogd als: {user.get('email')}")

    site = resolve_site(client)
    site_id = site["id"]
    print(f"Site: {site.get('name')} → {site.get('ssl_url') or site.get('url')}")

    if not site.get("build_settings", {}).get("repo_url"):
        print("Waarschuwing: site is niet aan GitHub gekoppeld.")
        print("Koppel in Netlify: Site configuration → Build & deploy → Link repository")
        print(f"  Repo: {GITHUB_REPO}")

    try:
        deploy_zip(client, site_id)
    except Exception as err:
        print(f"ZIP-deploy overgeslagen/mislukt: {err}")

    identity_id = enable_identity(client, site_id)
    enable_git_gateway(client, site_id)
    invite_peter(client, site_id, identity_id)

    admin_url = f"{site.get('ssl_url') or 'https://' + SITE_NAME + '.netlify.app'}/admin/"
    print("")
    print("Klaar!")
    print(f"  Website:  {site.get('ssl_url')}")
    print(f"  Beheer:   {admin_url}")
    print(f"  Peter:    uitnodiging gestuurd naar {PETER_EMAIL}")
    print("")
    print("Peter opent /admin → Login with Netlify Identity → wachtwoord instellen via e-mail.")
    return 0


if __name__ == "__main__":
    sys.exit(main())