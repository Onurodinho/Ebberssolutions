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
SITE_ID = "06de34eb-2df6-4ae4-ac83-0fa936d9f40b"
SITE_NAME = "euphonious-boba-7a95cf"
PETER_EMAIL = "peterebbers67@gmail.com"
SITE_URL = "https://ebberssolutions.com"
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
    _, sites = client.request("GET", "/sites")
    for site in sites or []:
        domain = (site.get("custom_domain") or "").lower()
        url = (site.get("ssl_url") or site.get("url") or "").lower()
        if "ebberssolutions.com" in domain or "ebberssolutions.com" in url:
            return site
    raise RuntimeError(
        "Site niet gevonden. Koppel eerst GitHub in Netlify of zet NETLIFY_SITE_ID."
    )


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


def get_identity_id(client: NetlifyClient, site_id: str) -> str:
    try:
        _, identity = client.request("GET", f"/sites/{site_id}/identity")
        identity_id = identity.get("identity_id") or identity.get("id")
        if identity_id:
            return identity_id
    except RuntimeError:
        pass
    _, site = client.request("GET", f"/sites/{site_id}")
    identity_id = site.get("identity_instance_id")
    if not identity_id:
        raise RuntimeError("Geen identity_instance_id — schakel Identity handmatig in Netlify in.")
    return identity_id


def enable_identity(client: NetlifyClient, site_id: str) -> str:
    print("Netlify Identity inschakelen …")
    try:
        client.request("POST", f"/sites/{site_id}/identity")
    except RuntimeError as err:
        if "HTTP 422" not in str(err) and "already" not in str(err).lower():
            raise
        print("  Identity was al actief")
    identity_id = get_identity_id(client, site_id)
    client.request("PUT", f"/sites/{site_id}/identity/{identity_id}", {
        "disable_signup": True,
    })
    print("  Registratie: alleen op uitnodiging")
    return identity_id


def enable_git_gateway(client: NetlifyClient, site_id: str) -> None:
    print("Git Gateway inschakelen …")
    try:
        client.request("POST", f"/sites/{site_id}/services/git-gateway/instances", {})
        print("  Git Gateway actief")
    except RuntimeError as err:
        if "HTTP 422" in str(err) or "already" in str(err).lower():
            print("  Git Gateway was al actief")
            return
        print("  Git Gateway API niet beschikbaar — handmatig inschakelen:")
        print("    Netlify → Site configuration → Identity → Services → Git Gateway → Enable")


def invite_peter(client: NetlifyClient, site_id: str, identity_id: str) -> None:
    print(f"Peter uitnodigen ({PETER_EMAIL}) …")
    user_id = None
    try:
        _, user = client.request("POST", f"/sites/{site_id}/identity/{identity_id}/users", {
            "email": PETER_EMAIL,
        })
        user_id = user.get("id")
        print("  Account aangemaakt")
    except RuntimeError as err:
        if "HTTP 422" not in str(err) and "already" not in str(err).lower():
            raise
        print("  Account bestaat al — wachtwoord-reset sturen")
    if user_id:
        client.request("POST", f"/sites/{site_id}/identity/{identity_id}/users/{user_id}/recover")
        print("  Uitnodiging / wachtwoord-mail verstuurd")
        return
    try:
        _, users = client.request("GET", f"/sites/{site_id}/identity/{identity_id}/users")
        for user in users or []:
            if (user.get("email") or "").lower() == PETER_EMAIL.lower():
                client.request(
                    "POST",
                    f"/sites/{site_id}/identity/{identity_id}/users/{user['id']}/recover",
                )
                print("  Wachtwoord-reset opnieuw verstuurd")
                return
    except RuntimeError as err:
        print(f"  Kon gebruikers niet ophalen: {err}")
    print("  Nodig Peter handmatig uit via Netlify → Identity → Invite users")


def check_contact_form(client: NetlifyClient, site_id: str) -> None:
    print("Contactformulier controleren …")
    try:
        _, forms = client.request("GET", f"/sites/{site_id}/forms")
    except RuntimeError as err:
        print(f"  Forms API niet bereikbaar: {err}")
        print_form_notification_guide()
        return

    contact = next((f for f in (forms or []) if f.get("name") == "contact"), None)
    if contact:
        print(f"  Formulier 'contact' gevonden (id: {contact.get('id')})")
    else:
        print("  Formulier 'contact' nog niet zichtbaar — wacht op deploy en run script opnieuw.")
    print_form_notification_guide()


def print_form_notification_guide() -> None:
    print("")
    print("Formuliernotificaties (eenmalig in Netlify UI — geen API beschikbaar):")
    print("  1. https://app.netlify.com → euphonious-boba-7a95cf → Forms")
    print("  2. Klik 'Form notification settings' of 'Add notification'")
    print("  3. Kies 'Email notification'")
    print(f"  4. E-mailadres: {PETER_EMAIL}")
    print("  5. Opslaan — daarna krijgt Peter elk formulierbericht per mail")


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
    check_contact_form(client, site_id)

    admin_url = f"{SITE_URL}/admin/"
    print("")
    print("Klaar!")
    print(f"  Website:  {SITE_URL}")
    print(f"  Beheer:   {admin_url}")
    print(f"  Peter:    uitnodiging gestuurd naar {PETER_EMAIL}")
    print("")
    print("Peter:")
    print("  1. Open uitnodigingsmail → wachtwoord instellen")
    print(f"  2. Ga naar {admin_url}")
    print("  3. Login with Netlify Identity")
    print("  4. Bewerk Bedrijfsgegevens, Website teksten (NL/EN/DE) of Collectie")
    print("  5. Klik Publish — binnen ~1 minuut live")
    return 0


if __name__ == "__main__":
    sys.exit(main())