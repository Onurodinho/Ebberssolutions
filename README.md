# Ebbers Solutions — website

Live: https://ebbers-solutions.netlify.app  
Beheer: https://ebbers-solutions.netlify.app/admin

---

## Beheer voor Peter

Via het beheerpaneel kun je zelf wijzigingen doorvoeren — zonder code. Na opslaan staat de wijziging binnen circa één minuut live.

### Wat kun je aanpassen?

| Menu in beheer | Wat zit erin? |
|---|---|
| **Bedrijfsgegevens** | Telefoon, e-mail, adres, openingstijden, KVK |
| **Teksten (Nederlands)** | Homepage-teksten en contactpagina |
| **Collectie** | Producten toevoegen, foto's, titels, beschrijvingen |

Engels en Duits worden nog niet via het beheer bewerkt — daarvoor kan Onur helpen.

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

1. Ga naar https://ebbers-solutions.netlify.app/admin
2. Klik **Login with Netlify Identity**
3. Log in met e-mail + wachtwoord
4. Kies links een onderdeel (Bedrijfsgegevens, Teksten, Collectie)
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

### Formulierberichten bekijken

Contactformulier-berichten komen binnen in Netlify:

**Site configuration → Forms → contact**

### Hulp nodig?

Voor design-wijzigingen, Engels/Duits vertalen of technische problemen: neem contact op met Onur.