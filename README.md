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

Voordat Peter kan inloggen, moet dit in het **Netlify-dashboard** (https://app.netlify.com):

1. Open het project **ebbers-solutions**
2. Ga naar **Site configuration → Identity**
3. Klik **Enable Identity**
4. Onder **Identity → Services → Git Gateway** → **Enable Git Gateway**
5. Ga naar **Identity → Invite users** → nodig `peterebbers67@gmail.com` uit
6. Peter ontvangt een e-mail om een wachtwoord in te stellen

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