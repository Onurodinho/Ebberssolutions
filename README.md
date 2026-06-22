# Ebbers Solutions — website

Live: https://ebberssolutions.com *(opnieuw deployen — zie hieronder)*  
Tijdelijk: https://onurodinho.github.io/Ebberssolutions/  
Beheer: https://ebberssolutions.com/admin *(werkt pas na Netlify-deploy)*

---

## Beheer voor Peter

Via het beheerpaneel kun je zelf wijzigingen doorvoeren — zonder code. Na opslaan staat de wijziging binnen circa één minuut live.

### Wat kun je aanpassen?

| Menu in beheer | Wat zit erin? |
|---|---|
| **Bedrijfsgegevens** | Telefoon, e-mail, adres, openingstijden, KVK |
| **Website teksten** | Homepage, contact en recensies in **NL, EN en DE** |
| **Collectie** | Producten toevoegen, foto's, titels, beschrijvingen |

### Site + admin werkt niet?

Als `ebbers-solutions.netlify.app` “Site not found” toont, is het Netlify-project weg. De admin-link werkt dan ook niet. Oplossing:

1. Ga naar [Netlify → Add new project → Import from Git](https://app.netlify.com/start)
2. Kies repo **Onurodinho/Ebberssolutions**, branch **main**, publish directory **/** (root)
3. Kopieer het **Site ID** (Project configuration → General → Project information)
4. Voeg GitHub secrets toe (repo → Settings → Secrets → Actions):
   - `NETLIFY_AUTH_TOKEN` — [Personal Access Token](https://app.netlify.com/user/applications#personal-access-tokens)
   - `NETLIFY_SITE_ID` — het ID uit stap 3
5. Ga naar **Actions → Deploy naar Netlify → Run workflow** (of push naar `main`)

Daarna werkt de site én `/admin` weer. Voer daarna het Peter-script uit (hieronder).

### Eenmalige setup (door Onur, één keer)

**Automatisch (aanbevolen):**

1. Maak een token: [Netlify Personal Access Token](https://app.netlify.com/user/applications#personal-access-tokens)
2. Voer in de terminal uit:

```bash
cd ebbers-solutions
export NETLIFY_AUTH_TOKEN='jouw-token-hier'
python3 scripts/setup-peter-access.py
```

Het script zet de site live, schakelt Identity + Git Gateway in en nodigt Peter uit.

**Handmatig** (als het script niet werkt): in [Netlify Dashboard](https://app.netlify.com):

1. Open **ebbers-solutions** → koppel GitHub-repo `Onurodinho/Ebberssolutions` als dat nog niet zo is
2. **Site configuration → Identity** → **Enable Identity**
3. **Identity → Services → Git Gateway** → **Enable Git Gateway**
4. **Identity → Invite users** → `peterebbers67@gmail.com`

### Inloggen en bewerken

1. Ga naar https://ebberssolutions.com/admin
2. Klik **Login with Netlify Identity**
3. Log in met e-mail + wachtwoord
4. Kies links een onderdeel (Bedrijfsgegevens, Website teksten, Collectie)
5. Pas aan en klik **Publish** (rechtsboven)
6. Wacht ~1 minuut — ververs de website om het resultaat te zien

### Nieuw product toevoegen

1. Beheer → **Collectie** → **Producten**
2. Klik **Add product** (of het +-icoon bij de lijst)
3. Vul in:
   - **ID**: uniek nummer, bijv. `product-19`
   - **Titel** en **Beschrijving**
   - **Foto**: upload een foto (of kies bestaande)
   - **Miniaturen**: optioneel — laat leeg om dezelfde foto te gebruiken
   - **Categorie**: tafels, stoelen, banken of details
4. **Publish** — het product verschijnt automatisch op de collectiepagina

### Formulierberichten (e-mailnotificatie)

Eenmalig instellen in Netlify (kan niet via code):

1. [Netlify Dashboard](https://app.netlify.com) → **ebbers-solutions** → **Forms**
2. **Form notification settings** → **Add notification** → **Email notification**
3. E-mail: `peterebbers67@gmail.com` → opslaan

Daarna krijgt Peter elk contactformulier direct per mail. Alle inzendingen blijven ook zichtbaar onder **Forms → contact**.

### Hulp nodig?

Voor design-wijzigingen of technische problemen: neem contact op met Onur.