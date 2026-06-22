/**
 * Meertaligheid — NL (default), EN, DE
 * Gebruik: data-i18n="key" | data-i18n-html="key" | data-i18n-placeholder="key"
 */
const I18N_LANGS = ['nl', 'en', 'de'];
const I18N_STORAGE_KEY = 'ebbers-lang';

const I18N_STRINGS = {
  nl: {
    'meta.home.title': 'Ebbers Solutions | Metalen oplossingen op maat',
    'meta.home.desc': 'Ebbers Solutions — metaalbewerking, constructiewerken en machine-onderhoud in Neede. Vakkundige metalen oplossingen op maat.',
    'meta.diensten.title': 'Diensten | Ebbers Solutions',
    'meta.diensten.desc': 'Diensten van Ebbers Solutions: constructiewerken, metaalbewerking en machine-onderhoud in Neede.',
    'meta.collectie.title': 'Collectie | Ebbers Solutions',
    'meta.collectie.desc': 'Collectie handgemaakte ijzeren stoelen, tafels en meubels van Ebbers Solutions — Neede, Achterhoek.',
    'meta.about.title': 'Over ons | Ebbers Solutions',
    'meta.about.desc': 'Over Ebbers Solutions — metaalbewerking en constructiewerken uit Neede, Achterhoek.',
    'meta.contact.title': 'Contact | Ebbers Solutions',
    'meta.contact.desc': 'Neem contact op met Ebbers Solutions in Neede voor metaalbewerking, constructiewerken of machine-onderhoud.',

    'nav.home': 'Home', 'nav.services': 'Diensten', 'nav.collection': 'Collectie',
    'nav.about': 'Over ons', 'nav.contact': 'Contact', 'nav.menu': 'Menu', 'nav.close': 'Sluiten',
    'nav.label': 'Hoofdnavigatie', 'nav.lang': 'Taal',

    'footer.nav': 'Navigatie', 'footer.contact': 'Contact',
    'footer.copyright': '© 2026 Ebbers Solutions · KVK',

    'config.tagline': 'Metalen oplossingen op maat uit Neede.',
    'config.hours': 'Ma – Vr: 07:30 – 16:30',

    'cta.contact': 'Neem contact op', 'cta.quote': 'Offerte aanvragen',
    'cta.viewServices': 'Onze diensten', 'cta.viewCollection': 'Bekijk collectie',
    'cta.allProducts': 'Alle 18 producten bekijken',
    'cta.fullCollection': 'Volledige collectie →',

    'common.scrollTop': 'Terug naar boven', 'common.skipLink': 'Direct naar inhoud',
    'common.required': 'verplicht',
    'common.products': 'producten', 'common.product': 'product',
    'common.zoom': 'Vergroot', 'common.view': 'Bekijk',

    'cat.alles': 'Alles', 'cat.tafels': 'Tafels', 'cat.stoelen': 'Stoelen', 'cat.banken': 'Banken', 'cat.details': 'Details',

    'stats.years': 'Jaar ervaring', 'stats.products': 'Unieke producten',
    'stats.specializations': 'Specialisaties', 'stats.custom': 'Maatwerk',
    'stats.founded': 'Opgericht',

    'home.hero.eyebrow': 'Vakmanschap · Neede · sinds 2017',
    'home.hero.title': 'IJZER.<em>Ambacht.</em>Op maat.',
    'home.hero.lead': 'Machine-onderhoud, constructiewerken en metaalbewerking voor bedrijven — plus handgemaakte stoelen, tafels en frames uit onze werkplaats in Neede.',
    'home.intro.label': 'Werkplaats Neede',
    'home.intro.title': 'Metaal voor bedrijf én interieur.',
    'home.intro.desc': 'Ebbers Solutions is gevestigd op het industrieterrein in Neede. Wij onderhouden machines, bouwen staalconstructies en bewerken metaal voor bedrijven in de Achterhoek — en maken in dezelfde werkplaats handgemaakte ijzeren meubels op maat.',
    'home.servicesDetail.label': 'Expertise',
    'home.servicesDetail.title': 'Machine-onderhoud, constructie en metaalbewerking',
    'home.servicesDetail.desc': 'Van spoedreparatie aan uw productielijn tot nieuwe staalconstructies en precisiebewerking — alles onder één dak, met korte lijnen en direct contact.',
    'home.servicesDetail.cta': 'Alle diensten in detail',
    'home.capabilities.label': 'Sectoren',
    'home.capabilities.c1': 'Industrie & productie',
    'home.capabilities.c2': 'Bouw & utiliteit',
    'home.capabilities.c3': 'Agrarisch & techniek',
    'home.capabilities.c4': 'Interieur & meubels',
    'home.hero.trust1.title': 'Handgemaakt', 'home.hero.trust1.desc': 'Elk stuk uit onze werkplaats in Neede',
    'home.hero.trust2.title': 'Op maat', 'home.hero.trust2.desc': 'Afmeting, houtsoort en design naar wens',
    'home.hero.trust3.title': 'Direct contact', 'home.hero.trust3.desc': 'U spreekt met degene die het maakt',
    'home.hero.tag': 'Collectie 2026', 'home.hero.cardCat': 'Tafels',
    'home.hero.cardTitle': 'Eettafel set', 'home.hero.cardDesc': 'Zwart staal · zes houten stoelen',
    'home.hero.sliderLabel': 'Uitgelichte producten',
    'home.hero.sliderDots': 'Kies een afbeelding',
    'page.hero.sliderLabel': 'Impressie',
    'home.hero.trustLabel': 'Waarom Ebbers Solutions',
    'home.stats.label': 'Bedrijfscijfers',

    'home.services.label': 'Wat wij doen',
    'home.services.title': 'Drie specialisaties,<br>één werkplaats.',
    'home.services.desc': 'Eén aanspreekpunt voor onderhoud, constructie en bewerking. U belt ons — wij lossen het op.',
    'home.services.s1.tag': 'Onderhoud', 'home.services.s1.title': 'Machine-onderhoud',
    'home.services.s1.desc': 'Een stilstaande machine kost meer dan de reparatie. Wij onderhouden preventief en repareren op spoed — zodat uw productie doorloopt.',
    'home.services.s1.link': 'Hoe wij machines onderhouden',
    'home.services.s2.tag': 'Constructie', 'home.services.s2.title': 'Constructiewerken',
    'home.services.s2.desc': 'Staalconstructies op maat — van enkelstuks tot kleine series, gebouwd volgens uw tekening of samen uitgewerkt in de werkplaats.',
    'home.services.s2.link': 'Constructiewerken bekijken',
    'home.services.s3.tag': 'Bewerking', 'home.services.s3.title': 'Metaalbewerking',
    'home.services.s3.desc': 'MIG, TIG, plasma- en lasersnijden, kanten en afwerken. Als het van staal is, bewerken wij het — in eigen werkplaats, op maat.',
    'home.services.s3.link': 'Alle technieken bekijken',

    'home.process.label': 'Hoe het werkt', 'home.process.title': 'Van idee tot oplevering.',
    'home.process.desc': 'Een helder proces zonder verrassingen — u weet altijd waar u aan toe bent.',
    'home.process.s1': 'Stap 01', 'home.process.s1.title': 'Overleg',
    'home.process.s1.desc': 'U belt of mailt ons met uw vraag of tekening. Wij denken direct mee over de beste aanpak en geven een eerlijke inschatting.',
    'home.process.s2': 'Stap 02', 'home.process.s2.title': 'Maatwerk',
    'home.process.s2.desc': 'In onze werkplaats bouwen wij uw product met precisie — van enkelstuks tot kleine series, alles met de hand vervaardigd.',
    'home.process.s3': 'Stap 03', 'home.process.s3.title': 'Oplevering',
    'home.process.s3.desc': 'Het eindresultaat wordt gecontroleerd en op tijd geleverd. U spreekt altijd met dezelfde persoon — van offerte tot oplevering.',

    'home.about.label': 'Over Ebbers Solutions', 'home.about.title': 'Een werkplaats.<br>Direct contact.',
    'home.about.desc': 'Gevestigd op het industrieterrein in Neede werken wij voor bedrijven die kwaliteit en korte lijnen waarderen.',
    'home.about.p1': 'U spreekt met degene die uw project maakt',
    'home.about.p2': 'Maatwerk zonder standaardoplossingen die niet passen',
    'home.about.p3': 'Actief in de Achterhoek sinds 2017',
    'home.about.link': 'Ons verhaal',

    'home.reviews.label': 'Recensies',
    'home.reviews.title': 'Wat klanten zeggen',
    'home.reviews.note': 'Recensies volgen binnenkort.',

    'home.collection.label': 'Ons werk', 'home.collection.title': 'Collectie',
    'home.collection.desc': 'Handgemaakte ijzeren meubels — stoelen, tafels en frames uit de Achterhoek.',
    'home.collection.customBadge': 'Op maat',

    'home.cta.title': 'Project bespreken?',
    'home.cta.desc': 'Vertel ons wat u nodig heeft. Wij reageren snel met een concreet voorstel.',

    'diensten.hero.label': 'Onze expertise', 'diensten.hero.title': 'Diensten',
    'diensten.hero.desc': 'Drie specialisaties onder één dak — van spoedreparatie tot nieuwe constructie.',
    'diensten.index.onderhoud': 'Onderhoud', 'diensten.index.constructie': 'Constructie', 'diensten.index.bewerking': 'Bewerking',

    'diensten.s1.tag': 'Onderhoud & reparatie', 'diensten.s1.title': 'Machine-onderhoud',
    'diensten.s1.desc': 'Een kapotte machine kost meer dan de reparatie. Wij onderhouden preventief en repareren snel — zodat uw productie niet stilvalt.',
    'diensten.s1.l1': 'Reparatie van machine-onderdelen', 'diensten.s1.l2': 'Preventief onderhoud',
    'diensten.s1.l3': 'Vervanging van versleten componenten', 'diensten.s1.l4': 'Spoedservice op aanvraag',
    'diensten.s1.caption': 'Machine-onderhoud · Neede', 'diensten.s1.link': 'Offerte voor onderhoud',

    'diensten.s2.tag': 'Constructie', 'diensten.s2.title': 'Constructiewerken',
    'diensten.s2.desc': 'Metalen constructies en onderdelen volgens uw tekening. Staalconstructies, frames en maatwerk — met oog voor detail en duurzaamheid.',
    'diensten.s2.l1': 'Staalconstructies op maat', 'diensten.s2.l2': 'Half-fabricaten en eindproducten',
    'diensten.s2.l3': 'Enkelstuks en kleine series', 'diensten.s2.l4': 'Lassen en assemblage',
    'diensten.s2.caption': 'Constructiewerken · Maatwerk', 'diensten.s2.link': 'Constructie bespreken',

    'diensten.s3.tag': 'Bewerking', 'diensten.s3.title': 'Metaalbewerking',
    'diensten.s3.desc': 'Staal en andere metalen bewerkt tot precisie-onderdelen. Lassen, snijden, buigen en afwerken — alles in onze eigen werkplaats.',
    'diensten.s3.l1': 'Lassen (MIG, TIG, puntlassen)', 'diensten.s3.l2': 'Plasma- en lasersnijden',
    'diensten.s3.l3': 'Kanten en buigen', 'diensten.s3.l4': 'Oppervlaktebehandeling',
    'diensten.s3.caption': 'Metaalbewerking · Precisiewerk', 'diensten.s3.link': 'Bewerking aanvragen',

    'diensten.cta.title': 'Offerte aanvragen?',
    'diensten.cta.desc': 'Vertel ons over uw project. Wij denken graag mee over de beste aanpak.',

    'collectie.hero.label': 'Handgemaakt in Neede', 'collectie.hero.title': 'Collectie',
    'collectie.hero.desc': 'Ijzeren stoelen, tafels en frames — elk stuk uniek, gebouwd in onze werkplaats. Klik op een foto voor het grote formaat.',
    'collectie.intro': 'Onze meubels combineren <strong>zwart ijzer</strong> met <strong>houten zittingen</strong>. Geometrische frames, zichtbare bouten en vakmanschap uit de Achterhoek.',
    'collectie.introNote': 'Elk stuk is op maat te bestellen — afmeting, houtsoort en design naar uw wens.',
    'collectie.ctaBtn': 'Interesse? Neem contact op',
    'collectie.filterLabel': 'Filter op categorie',
    'collectie.cta.title': 'Op maat laten maken?',
    'collectie.cta.desc': 'Elk meubel kan aangepast worden op afmeting, houtsoort en design. Vraag een vrijblijvende offerte aan.',
    'collectie.lightbox': 'Foto vergroten', 'collectie.error': 'Galerij kon niet geladen worden.',

    'about.hero.label': 'Wie wij zijn', 'about.hero.title': 'Over ons',
    'about.hero.desc': 'Een werkplaats in Neede met korte lijnen, persoonlijk contact en vakmanschap als standaard.',
    'about.story.title': 'Ons verhaal',
    'about.story.p1': 'Ebbers Solutions is in 2017 opgericht en gevestigd op het industrieterrein aan de Veldhoekweg in Neede. Vanuit de Achterhoek helpen wij bedrijven met machine-onderhoud, metaalbewerking en constructiewerken.',
    'about.story.p2': 'Als eenmanszaak combineren wij vakmanschap met persoonlijke service. U spreekt met degene die uw project uitvoert — geen wachttijden, geen tussenlagen.',
    'about.v1.title': 'Vakmanschap', 'about.v1.desc': 'Elk stuk dat onze werkplaats verlaat is gemaakt met de hand en gecontroleerd door dezelfde persoon.',
    'about.v2.title': 'Betrouwbaarheid', 'about.v2.desc': 'Wij halen deadlines. Als er een probleem is, hoort u dat van ons — niet andersom.',
    'about.v3.title': 'Flexibiliteit', 'about.v3.desc': 'Van een enkel onderdeel tot een complete constructie. Wij passen het proces aan op uw situatie.',
    'about.v4.title': 'Korte lijnen', 'about.v4.desc': 'U spreekt met de persoon die het werk uitvoert. Geen doorverbinden, geen wachttijden.',
    'about.location.label': 'Onze locatie', 'about.location.title': 'Industrieterrein Neede',
    'about.location.desc': 'Onze werkplaats ligt aan de Veldhoekweg op het industrieterrein in Neede. Goed bereikbaar vanaf de A18, voor klanten in de regio en daarbuiten.',
    'about.location.caption': 'Werkplaats · Veldhoekweg 1, Neede',
    'about.diff.label': 'Waarom Ebbers Solutions', 'about.diff.title': 'Wat ons onderscheidt',
    'about.f1.title': 'Korte lijnen', 'about.f1.desc': 'Direct contact met de mensen die uw project uitvoeren. Geen tussenlagen, geen verwarring.',
    'about.f2.title': 'Regionaal verankerd', 'about.f2.desc': 'Gevestigd in Neede, actief in de Achterhoek. Dichtbij, bereikbaar en betrokken.',
    'about.f3.title': 'Maatwerk als norm', 'about.f3.desc': 'Geen standaardoplossingen die niet passen. Wij maken wat u nodig heeft.',
    'about.cta.title': 'Samenwerken?',
    'about.cta.desc': 'Ontdek wat Ebbers Solutions voor uw bedrijf kan betekenen.',

    'contact.hero.label': 'Laten we praten', 'contact.hero.title': 'Contact',
    'contact.hero.desc': 'Bel, mail of vul het formulier in. Wij reageren zo snel mogelijk.',
    'contact.quick.call': 'Bel direct', 'contact.quick.mail': 'Stuur e-mail', 'contact.quick.route': 'Route plannen',
    'contact.info.title': 'Gegevens', 'contact.info.address': 'Adres', 'contact.info.phone': 'Telefoon',
    'contact.info.email': 'E-mail', 'contact.info.hours': 'Openingstijden', 'contact.info.access': 'Bereikbaarheid',
    'contact.info.accessDesc': 'Industrieterrein Neede, Achterhoek. Makkelijk bereikbaar vanaf de A18.',
    'contact.map.title': 'Locatie', 'contact.map.desc': 'Veldhoekweg 1 · Industrieterrein Neede',
    'contact.form.title': 'Stuur een bericht', 'contact.form.name': 'Naam', 'contact.form.email': 'E-mail',
    'contact.form.company': 'Bedrijf', 'contact.form.subject': 'Onderwerp', 'contact.form.message': 'Bericht',
    'contact.form.submit': 'Verstuur bericht',
    'contact.form.subjectEmpty': 'Kies een onderwerp',
    'contact.form.subjectQuote': 'Offerte aanvragen', 'contact.form.subjectConstructie': 'Constructiewerken',
    'contact.form.subjectBewerking': 'Metaalbewerking', 'contact.form.subjectOnderhoud': 'Machine-onderhoud',
    'contact.form.subjectOther': 'Anders',
    'contact.form.placeholder': 'Beschrijf uw project of vraag...',
    'contact.form.success': 'Bedankt voor uw bericht. Wij nemen zo snel mogelijk contact met u op.',
    'contact.form.sending': 'Versturen…',
    'contact.form.error': 'Versturen mislukt. Probeer het opnieuw of mail ons direct.',
    'contact.form.err.name': 'Vul uw naam in (minimaal 2 tekens).',
    'contact.form.err.email': 'Vul een geldig e-mailadres in.',
    'contact.form.err.subject': 'Kies een onderwerp.',
    'contact.form.err.message': 'Vul een bericht in (minimaal 10 tekens).',
  },

  en: {
    'meta.home.title': 'Ebbers Solutions | Custom metal solutions',
    'meta.home.desc': 'Ebbers Solutions — metalworking, construction and machine maintenance in Neede, Netherlands.',
    'meta.diensten.title': 'Services | Ebbers Solutions',
    'meta.diensten.desc': 'Services from Ebbers Solutions: construction, metalworking and machine maintenance in Neede.',
    'meta.collectie.title': 'Collection | Ebbers Solutions',
    'meta.collectie.desc': 'Collection of handmade iron chairs, tables and furniture from Ebbers Solutions — Neede, Netherlands.',
    'meta.about.title': 'About us | Ebbers Solutions',
    'meta.about.desc': 'About Ebbers Solutions — metalworking and construction from Neede, Netherlands.',
    'meta.contact.title': 'Contact | Ebbers Solutions',
    'meta.contact.desc': 'Contact Ebbers Solutions in Neede for metalworking, construction or machine maintenance.',

    'nav.home': 'Home', 'nav.services': 'Services', 'nav.collection': 'Collection',
    'nav.about': 'About', 'nav.contact': 'Contact', 'nav.menu': 'Menu', 'nav.close': 'Close',
    'nav.label': 'Main navigation', 'nav.lang': 'Language',

    'footer.nav': 'Navigation', 'footer.contact': 'Contact',
    'footer.copyright': '© 2026 Ebbers Solutions · CoC',

    'config.tagline': 'Custom metal solutions from Neede.',
    'config.hours': 'Mon – Fri: 07:30 – 16:30',

    'cta.contact': 'Get in touch', 'cta.quote': 'Request a quote',
    'cta.viewServices': 'Our services', 'cta.viewCollection': 'View collection',
    'cta.allProducts': 'View all 18 products',
    'cta.fullCollection': 'Full collection →',

    'common.scrollTop': 'Back to top', 'common.skipLink': 'Skip to content',
    'common.required': 'required',
    'common.products': 'products', 'common.product': 'product',
    'common.zoom': 'Enlarge', 'common.view': 'View',

    'cat.alles': 'All', 'cat.tafels': 'Tables', 'cat.stoelen': 'Chairs', 'cat.banken': 'Benches', 'cat.details': 'Details',

    'stats.years': 'Years experience', 'stats.products': 'Unique products',
    'stats.specializations': 'Specialisations', 'stats.custom': 'Custom work',
    'stats.founded': 'Founded',

    'home.hero.eyebrow': 'Craftsmanship · Neede · since 2017',
    'home.hero.title': 'IRON.<em>Craft.</em>Made to order.',
    'home.hero.lead': 'Machine maintenance, construction works and metalworking for businesses — plus handmade chairs, tables and frames from our workshop in Neede.',
    'home.intro.label': 'Workshop Neede',
    'home.intro.title': 'Metal for industry and interiors.',
    'home.intro.desc': 'Ebbers Solutions is based on the industrial estate in Neede. We maintain machines, build steel structures and process metal for companies in the Achterhoek region — and craft handmade iron furniture to order in the same workshop.',
    'home.servicesDetail.label': 'Expertise',
    'home.servicesDetail.title': 'Machine maintenance, construction and metalworking',
    'home.servicesDetail.desc': 'From urgent production-line repairs to new steel structures and precision processing — all under one roof, with short lines and direct contact.',
    'home.servicesDetail.cta': 'All services in detail',
    'home.capabilities.label': 'Sectors',
    'home.capabilities.c1': 'Industry & production',
    'home.capabilities.c2': 'Construction & utilities',
    'home.capabilities.c3': 'Agriculture & engineering',
    'home.capabilities.c4': 'Interiors & furniture',
    'home.hero.trust1.title': 'Handmade', 'home.hero.trust1.desc': 'Every piece from our workshop in Neede',
    'home.hero.trust2.title': 'Custom', 'home.hero.trust2.desc': 'Size, wood type and design to your wishes',
    'home.hero.trust3.title': 'Direct contact', 'home.hero.trust3.desc': 'You speak to the person who makes it',
    'home.hero.tag': 'Collection 2026', 'home.hero.cardCat': 'Tables',
    'home.hero.cardTitle': 'Dining table set', 'home.hero.cardDesc': 'Black steel · six wooden chairs',
    'home.hero.sliderLabel': 'Featured products',
    'home.hero.sliderDots': 'Choose an image',
    'page.hero.sliderLabel': 'Gallery',
    'home.hero.trustLabel': 'Why Ebbers Solutions',
    'home.stats.label': 'Company figures',

    'home.services.label': 'What we do',
    'home.services.title': 'Three specialisations,<br>one workshop.',
    'home.services.desc': 'One point of contact for maintenance, construction and processing. You call us — we solve it.',
    'home.services.s1.tag': 'Maintenance', 'home.services.s1.title': 'Machine maintenance',
    'home.services.s1.desc': 'A stopped machine costs more than the repair. We maintain preventively and repair urgently — so your production keeps running.',
    'home.services.s1.link': 'How we maintain machines',
    'home.services.s2.tag': 'Construction', 'home.services.s2.title': 'Construction works',
    'home.services.s2.desc': 'Custom steel structures — from one-offs to small series, built to your drawing or developed together in the workshop.',
    'home.services.s2.link': 'View construction works',
    'home.services.s3.tag': 'Processing', 'home.services.s3.title': 'Metalworking',
    'home.services.s3.desc': 'MIG, TIG, plasma and laser cutting, bending and finishing. If it\'s steel, we process it — in our own workshop, to order.',
    'home.services.s3.link': 'View all techniques',

    'home.process.label': 'How it works', 'home.process.title': 'From idea to delivery.',
    'home.process.desc': 'A clear process without surprises — you always know what to expect.',
    'home.process.s1': 'Step 01', 'home.process.s1.title': 'Consultation',
    'home.process.s1.desc': 'Call or email us with your question or drawing. We think along immediately and give an honest estimate.',
    'home.process.s2': 'Step 02', 'home.process.s2.title': 'Custom work',
    'home.process.s2.desc': 'In our workshop we build your product with precision — from one-offs to small series, all handmade.',
    'home.process.s3': 'Step 03', 'home.process.s3.title': 'Delivery',
    'home.process.s3.desc': 'The end result is checked and delivered on time. You always speak to the same person — from quote to delivery.',

    'home.about.label': 'About Ebbers Solutions', 'home.about.title': 'A workshop.<br>Direct contact.',
    'home.about.desc': 'Based at the industrial estate in Neede, we work for companies that value quality and short lines.',
    'home.about.p1': 'You speak to the person who makes your project',
    'home.about.p2': 'Custom work without standard solutions that don\'t fit',
    'home.about.p3': 'Active in the Achterhoek since 2017',
    'home.about.link': 'Our story',

    'home.reviews.label': 'Reviews',
    'home.reviews.title': 'What clients say',
    'home.reviews.note': 'Reviews coming soon.',

    'home.collection.label': 'Our work', 'home.collection.title': 'Collection',
    'home.collection.desc': 'Handmade iron furniture — chairs, tables and frames from the Achterhoek.',
    'home.collection.customBadge': 'Custom',

    'home.cta.title': 'Discuss a project?',
    'home.cta.desc': 'Tell us what you need. We respond quickly with a concrete proposal.',

    'diensten.hero.label': 'Our expertise', 'diensten.hero.title': 'Services',
    'diensten.hero.desc': 'Three specialisations under one roof — from urgent repair to new construction.',
    'diensten.index.onderhoud': 'Maintenance', 'diensten.index.constructie': 'Construction', 'diensten.index.bewerking': 'Processing',

    'diensten.s1.tag': 'Maintenance & repair', 'diensten.s1.title': 'Machine maintenance',
    'diensten.s1.desc': 'A broken machine costs more than the repair. We maintain preventively and repair quickly — so your production doesn\'t stop.',
    'diensten.s1.l1': 'Repair of machine parts', 'diensten.s1.l2': 'Preventive maintenance',
    'diensten.s1.l3': 'Replacement of worn components', 'diensten.s1.l4': 'Emergency service on request',
    'diensten.s1.caption': 'Machine maintenance · Neede', 'diensten.s1.link': 'Quote for maintenance',

    'diensten.s2.tag': 'Construction', 'diensten.s2.title': 'Construction works',
    'diensten.s2.desc': 'Metal structures and parts according to your drawing. Steel structures, frames and custom work — with attention to detail and durability.',
    'diensten.s2.l1': 'Custom steel structures', 'diensten.s2.l2': 'Semi-finished and end products',
    'diensten.s2.l3': 'One-offs and small series', 'diensten.s2.l4': 'Welding and assembly',
    'diensten.s2.caption': 'Construction works · Custom', 'diensten.s2.link': 'Discuss construction',

    'diensten.s3.tag': 'Processing', 'diensten.s3.title': 'Metalworking',
    'diensten.s3.desc': 'Steel and other metals processed into precision parts. Welding, cutting, bending and finishing — all in our own workshop.',
    'diensten.s3.l1': 'Welding (MIG, TIG, spot welding)', 'diensten.s3.l2': 'Plasma and laser cutting',
    'diensten.s3.l3': 'Bending and folding', 'diensten.s3.l4': 'Surface treatment',
    'diensten.s3.caption': 'Metalworking · Precision', 'diensten.s3.link': 'Request processing',

    'diensten.cta.title': 'Request a quote?',
    'diensten.cta.desc': 'Tell us about your project. We\'re happy to think along about the best approach.',

    'collectie.hero.label': 'Handmade in Neede', 'collectie.hero.title': 'Collection',
    'collectie.hero.desc': 'Iron chairs, tables and frames — each piece unique, built in our workshop. Click a photo for full size.',
    'collectie.intro': 'Our furniture combines <strong>black iron</strong> with <strong>wooden seats</strong>. Geometric frames, visible bolts and craftsmanship from the Achterhoek.',
    'collectie.introNote': 'Every piece can be ordered to size — dimensions, wood type and design to your wishes.',
    'collectie.ctaBtn': 'Interested? Get in touch',
    'collectie.filterLabel': 'Filter by category',
    'collectie.cta.title': 'Have it made to order?',
    'collectie.cta.desc': 'Every piece of furniture can be adapted in size, wood type and design. Request a no-obligation quote.',
    'collectie.lightbox': 'Enlarge photo', 'collectie.error': 'Gallery could not be loaded.',

    'about.hero.label': 'Who we are', 'about.hero.title': 'About us',
    'about.hero.desc': 'A workshop in Neede with short lines, personal contact and craftsmanship as standard.',
    'about.story.title': 'Our story',
    'about.story.p1': 'Ebbers Solutions was founded in 2017 and is located at the industrial estate on Veldhoekweg in Neede. From the Achterhoek we help companies with machine maintenance, metalworking and construction.',
    'about.story.p2': 'As a sole proprietorship we combine craftsmanship with personal service. You speak to the person who carries out your project — no waiting times, no intermediaries.',
    'about.v1.title': 'Craftsmanship', 'about.v1.desc': 'Every piece that leaves our workshop is handmade and checked by the same person.',
    'about.v2.title': 'Reliability', 'about.v2.desc': 'We meet deadlines. If there\'s a problem, you hear it from us — not the other way around.',
    'about.v3.title': 'Flexibility', 'about.v3.desc': 'From a single part to a complete structure. We adapt the process to your situation.',
    'about.v4.title': 'Short lines', 'about.v4.desc': 'You speak to the person who does the work. No transfers, no waiting.',
    'about.location.label': 'Our location', 'about.location.title': 'Neede industrial estate',
    'about.location.desc': 'Our workshop is on Veldhoekweg at the industrial estate in Neede. Easily accessible from the A18, for clients in the region and beyond.',
    'about.location.caption': 'Workshop · Veldhoekweg 1, Neede',
    'about.diff.label': 'Why Ebbers Solutions', 'about.diff.title': 'What sets us apart',
    'about.f1.title': 'Short lines', 'about.f1.desc': 'Direct contact with the people who carry out your project. No intermediaries, no confusion.',
    'about.f2.title': 'Regionally rooted', 'about.f2.desc': 'Based in Neede, active in the Achterhoek. Close by, accessible and involved.',
    'about.f3.title': 'Custom as standard', 'about.f3.desc': 'No standard solutions that don\'t fit. We make what you need.',
    'about.cta.title': 'Work together?',
    'about.cta.desc': 'Discover what Ebbers Solutions can mean for your business.',

    'contact.hero.label': 'Let\'s talk', 'contact.hero.title': 'Contact',
    'contact.hero.desc': 'Call, email or fill in the form. We respond as quickly as possible.',
    'contact.quick.call': 'Call now', 'contact.quick.mail': 'Send email', 'contact.quick.route': 'Get directions',
    'contact.info.title': 'Details', 'contact.info.address': 'Address', 'contact.info.phone': 'Phone',
    'contact.info.email': 'Email', 'contact.info.hours': 'Opening hours', 'contact.info.access': 'Accessibility',
    'contact.info.accessDesc': 'Neede industrial estate, Achterhoek. Easily accessible from the A18.',
    'contact.map.title': 'Location', 'contact.map.desc': 'Veldhoekweg 1 · Neede industrial estate',
    'contact.form.title': 'Send a message', 'contact.form.name': 'Name', 'contact.form.email': 'Email',
    'contact.form.company': 'Company', 'contact.form.subject': 'Subject', 'contact.form.message': 'Message',
    'contact.form.submit': 'Send message',
    'contact.form.subjectEmpty': 'Choose a subject',
    'contact.form.subjectQuote': 'Request a quote', 'contact.form.subjectConstructie': 'Construction works',
    'contact.form.subjectBewerking': 'Metalworking', 'contact.form.subjectOnderhoud': 'Machine maintenance',
    'contact.form.subjectOther': 'Other',
    'contact.form.placeholder': 'Describe your project or question...',
    'contact.form.success': 'Thank you for your message. We will contact you as soon as possible.',
    'contact.form.sending': 'Sending…',
    'contact.form.error': 'Sending failed. Please try again or email us directly.',
    'contact.form.err.name': 'Enter your name (at least 2 characters).',
    'contact.form.err.email': 'Enter a valid email address.',
    'contact.form.err.subject': 'Choose a subject.',
    'contact.form.err.message': 'Enter a message (at least 10 characters).',
  },

  de: {
    'meta.home.title': 'Ebbers Solutions | Maßgeschneiderte Metalllösungen',
    'meta.home.desc': 'Ebbers Solutions — Metallbearbeitung, Stahlkonstruktion und Maschinenwartung in Neede, Achterhoek. Handwerkliche Lösungen nach Maß.',
    'meta.diensten.title': 'Leistungen | Ebbers Solutions',
    'meta.diensten.desc': 'Leistungen von Ebbers Solutions: Stahlkonstruktion, Metallbearbeitung und Maschinenwartung in Neede, Achterhoek.',
    'meta.collectie.title': 'Kollektion | Ebbers Solutions',
    'meta.collectie.desc': 'Kollektion handgefertigter Eisenmöbel — Stühle, Tische und Gestelle von Ebbers Solutions aus Neede, Achterhoek.',
    'meta.about.title': 'Über uns | Ebbers Solutions',
    'meta.about.desc': 'Über Ebbers Solutions — Metallbearbeitung und Stahlkonstruktion aus Neede in der niederländischen Achterhoek.',
    'meta.contact.title': 'Kontakt | Ebbers Solutions',
    'meta.contact.desc': 'Kontaktieren Sie Ebbers Solutions in Neede für Metallbearbeitung, Stahlkonstruktion oder Maschinenwartung.',

    'nav.home': 'Start', 'nav.services': 'Leistungen', 'nav.collection': 'Kollektion',
    'nav.about': 'Über uns', 'nav.contact': 'Kontakt', 'nav.menu': 'Menü', 'nav.close': 'Schließen',
    'nav.label': 'Hauptnavigation', 'nav.lang': 'Sprache',

    'footer.nav': 'Navigation', 'footer.contact': 'Kontakt',
    'footer.copyright': '© 2026 Ebbers Solutions · Handelsregister',

    'config.tagline': 'Maßgeschneiderte Metalllösungen aus Neede.',
    'config.hours': 'Mo – Fr: 07:30 – 16:30',

    'cta.contact': 'Kontakt aufnehmen', 'cta.quote': 'Angebot anfordern',
    'cta.viewServices': 'Unsere Leistungen', 'cta.viewCollection': 'Kollektion ansehen',
    'cta.allProducts': 'Alle 18 Produkte ansehen',
    'cta.fullCollection': 'Zur gesamten Kollektion →',

    'common.scrollTop': 'Nach oben', 'common.skipLink': 'Zum Inhalt springen',
    'common.required': 'Pflichtfeld',
    'common.products': 'Produkte', 'common.product': 'Produkt',
    'common.zoom': 'Vergrößern', 'common.view': 'Ansehen',

    'cat.alles': 'Alle', 'cat.tafels': 'Tische', 'cat.stoelen': 'Stühle', 'cat.banken': 'Bänke', 'cat.details': 'Details',

    'stats.years': 'Jahre Erfahrung', 'stats.products': 'Einzigartige Produkte',
    'stats.specializations': 'Spezialisierungen', 'stats.custom': 'Maßanfertigung',
    'stats.founded': 'Gegründet',

    'home.hero.eyebrow': 'Handwerkskunst · Neede · seit 2017',
    'home.hero.title': 'EISEN.<em>Handwerk.</em>Maßgefertigt.',
    'home.hero.lead': 'Maschinenwartung, Stahlkonstruktionen und Metallbearbeitung für Unternehmen — plus handgefertigte Stühle, Tische und Gestelle aus unserer Werkstatt in Neede.',
    'home.intro.label': 'Werkstatt Neede',
    'home.intro.title': 'Metall für Industrie und Interieur.',
    'home.intro.desc': 'Ebbers Solutions ist am Industriegelände in Neede ansässig. Wir warten Maschinen, bauen Stahlkonstruktionen und bearbeiten Metall für Betriebe in der Achterhoek — und fertigen in derselben Werkstatt handgemachte Eisenmöbel nach Maß.',
    'home.servicesDetail.label': 'Expertise',
    'home.servicesDetail.title': 'Maschinenwartung, Konstruktion und Metallbearbeitung',
    'home.servicesDetail.desc': 'Von der Eilreparatur an Ihrer Produktionslinie bis zu neuen Stahlkonstruktionen und Präzisionsbearbeitung — alles unter einem Dach, mit kurzen Wegen und direktem Kontakt.',
    'home.servicesDetail.cta': 'Alle Leistungen im Detail',
    'home.capabilities.label': 'Branchen',
    'home.capabilities.c1': 'Industrie & Produktion',
    'home.capabilities.c2': 'Bau & Technik',
    'home.capabilities.c3': 'Landwirtschaft & Technik',
    'home.capabilities.c4': 'Interieur & Möbel',
    'home.hero.trust1.title': 'Handgefertigt', 'home.hero.trust1.desc': 'Jedes Stück entsteht in unserer Werkstatt in Neede',
    'home.hero.trust2.title': 'Individuell', 'home.hero.trust2.desc': 'Abmessungen, Holzart und Design nach Ihren Wünschen',
    'home.hero.trust3.title': 'Persönlich erreichbar', 'home.hero.trust3.desc': 'Sie sprechen direkt mit dem Handwerker, der Ihr Projekt umsetzt',
    'home.hero.tag': 'Kollektion 2026', 'home.hero.cardCat': 'Tische',
    'home.hero.cardTitle': 'Esstischgarnitur', 'home.hero.cardDesc': 'Schwarzer Stahl · sechs Holzstühle',
    'home.hero.sliderLabel': 'Ausgewählte Produkte',
    'home.hero.sliderDots': 'Bild auswählen',
    'page.hero.sliderLabel': 'Eindruck',
    'home.hero.trustLabel': 'Warum Ebbers Solutions',
    'home.stats.label': 'In Zahlen',

    'home.services.label': 'Was wir tun',
    'home.services.title': 'Drei Spezialisierungen,<br>eine Werkstatt.',
    'home.services.desc': 'Ein Ansprechpartner für Wartung, Konstruktion und Metallbearbeitung. Rufen Sie uns an — wir finden die passende Lösung.',
    'home.services.s1.tag': 'Wartung', 'home.services.s1.title': 'Maschinenwartung',
    'home.services.s1.desc': 'Stillstehende Maschinen kosten mehr als jede Reparatur. Wir warten präventiv und beheben Störungen im Eilfall — damit Ihre Produktion ohne Unterbrechung weiterläuft.',
    'home.services.s1.link': 'So warten wir Ihre Maschinen',
    'home.services.s2.tag': 'Konstruktion', 'home.services.s2.title': 'Stahlkonstruktionen',
    'home.services.s2.desc': 'Stahlkonstruktionen nach Maß — von Einzelanfertigungen bis Kleinserien, nach Ihrer Zeichnung oder gemeinsam mit Ihnen in der Werkstatt ausgearbeitet.',
    'home.services.s2.link': 'Konstruktionsleistungen ansehen',
    'home.services.s3.tag': 'Bearbeitung', 'home.services.s3.title': 'Metallbearbeitung',
    'home.services.s3.desc': 'MIG-, TIG-, Plasma- und Laserschneiden, Abkanten und Oberflächenveredelung. Wenn es Stahl ist, bearbeiten wir es — in unserer eigenen Werkstatt, nach Maß.',
    'home.services.s3.link': 'Alle Verfahren im Überblick',

    'home.process.label': 'So arbeiten wir', 'home.process.title': 'Von der Idee bis zur Übergabe.',
    'home.process.desc': 'Ein transparenter Ablauf ohne Überraschungen — Sie wissen zu jedem Zeitpunkt, woran Sie sind.',
    'home.process.s1': 'Schritt 01', 'home.process.s1.title': 'Beratung',
    'home.process.s1.desc': 'Rufen Sie uns an oder schreiben Sie uns mit Ihrer Anfrage oder Zeichnung. Wir beraten Sie umgehend und geben Ihnen eine realistische Einschätzung.',
    'home.process.s2': 'Schritt 02', 'home.process.s2.title': 'Maßanfertigung',
    'home.process.s2.desc': 'In unserer Werkstatt fertigen wir Ihr Produkt mit Präzision — von Einzelstücken bis Kleinserien, alles in Handarbeit.',
    'home.process.s3': 'Schritt 03', 'home.process.s3.title': 'Übergabe',
    'home.process.s3.desc': 'Das fertige Ergebnis wird geprüft und termingerecht geliefert. Sie haben vom Angebot bis zur Übergabe denselben Ansprechpartner.',

    'home.about.label': 'Über Ebbers Solutions', 'home.about.title': 'Eine Werkstatt.<br>Persönlicher Kontakt.',
    'home.about.desc': 'Am Industriepark in Neede fertigen wir für Unternehmen, die Wert auf Qualität und direkten Kontakt legen.',
    'home.about.p1': 'Persönlicher Kontakt zum Handwerker, der Ihr Projekt betreut',
    'home.about.p2': 'Individuelle Lösungen statt Standardware, die nicht passt',
    'home.about.p3': 'Seit 2017 in der Achterhoek (NL) tätig',
    'home.about.link': 'Unsere Geschichte',

    'home.reviews.label': 'Bewertungen',
    'home.reviews.title': 'Was Kunden sagen',
    'home.reviews.note': 'Bewertungen folgen in Kürze.',

    'home.collection.label': 'Unsere Arbeit', 'home.collection.title': 'Kollektion',
    'home.collection.desc': 'Handgefertigte Eisenmöbel — Stühle, Tische und Gestelle aus der niederländischen Achterhoek.',
    'home.collection.customBadge': 'Nach Maß',

    'home.cta.title': 'Haben Sie ein Projekt im Sinn?',
    'home.cta.desc': 'Schildern Sie uns kurz Ihr Vorhaben. Wir melden uns zeitnah mit einem konkreten Angebot.',

    'diensten.hero.label': 'Unsere Expertise', 'diensten.hero.title': 'Leistungen',
    'diensten.hero.desc': 'Drei Spezialisierungen unter einem Dach — von der Eilreparatur bis zur Neukonstruktion.',
    'diensten.index.onderhoud': 'Wartung', 'diensten.index.constructie': 'Konstruktion', 'diensten.index.bewerking': 'Bearbeitung',

    'diensten.s1.tag': 'Wartung & Reparatur', 'diensten.s1.title': 'Maschinenwartung',
    'diensten.s1.desc': 'Ausgefallene Maschinen kosten mehr als jede Reparatur. Wir warten präventiv und beheben Störungen schnell — damit Ihre Produktion nicht stillsteht.',
    'diensten.s1.l1': 'Reparatur von Maschinenteilen', 'diensten.s1.l2': 'Präventive Wartung',
    'diensten.s1.l3': 'Austausch verschlissener Komponenten', 'diensten.s1.l4': 'Eilservice auf Anfrage',
    'diensten.s1.caption': 'Maschinenwartung · Neede', 'diensten.s1.link': 'Wartungsangebot anfordern',

    'diensten.s2.tag': 'Konstruktion', 'diensten.s2.title': 'Stahlkonstruktionen',
    'diensten.s2.desc': 'Metallkonstruktionen und Bauteile nach Ihrer Zeichnung. Stahlrahmen, Gestelle und Sonderanfertigungen — mit Liebe zum Detail und auf Langlebigkeit ausgelegt.',
    'diensten.s2.l1': 'Stahlkonstruktionen nach Maß', 'diensten.s2.l2': 'Halbzeuge und Fertigprodukte',
    'diensten.s2.l3': 'Einzelstücke und Kleinserien', 'diensten.s2.l4': 'Schweißen und Montage',
    'diensten.s2.caption': 'Stahlkonstruktion · Maßanfertigung', 'diensten.s2.link': 'Konstruktion besprechen',

    'diensten.s3.tag': 'Bearbeitung', 'diensten.s3.title': 'Metallbearbeitung',
    'diensten.s3.desc': 'Stahl und andere Metalle verarbeiten wir zu Präzisionsteilen. Schweißen, Schneiden, Biegen und Oberflächenveredelung — alles in unserer eigenen Werkstatt.',
    'diensten.s3.l1': 'Schweißen (MIG, TIG, Punktschweißen)', 'diensten.s3.l2': 'Plasma- und Laserschneiden',
    'diensten.s3.l3': 'Abkanten und Biegen', 'diensten.s3.l4': 'Oberflächenbehandlung',
    'diensten.s3.caption': 'Metallbearbeitung · Präzisionsarbeit', 'diensten.s3.link': 'Bearbeitung anfragen',

    'diensten.cta.title': 'Angebot anfordern?',
    'diensten.cta.desc': 'Erzählen Sie uns von Ihrem Projekt. Wir beraten Sie gerne zu der besten Lösung.',

    'collectie.hero.label': 'Handgefertigt in Neede', 'collectie.hero.title': 'Kollektion',
    'collectie.hero.desc': 'Eisenstühle, Tische und Gestelle — jedes Stück ein Unikat aus unserer Werkstatt. Klicken Sie auf ein Foto für die Großansicht.',
    'collectie.intro': 'Unsere Möbel verbinden <strong>schwarzes Eisen</strong> mit <strong>Holzsitzen</strong>. Geometrische Rahmen, sichtbare Schrauben und Handwerkskunst aus der Achterhoek.',
    'collectie.introNote': 'Jedes Stück lässt sich nach Maß bestellen — Abmessungen, Holzart und Design nach Ihren Wünschen.',
    'collectie.ctaBtn': 'Interesse? Kontakt aufnehmen',
    'collectie.filterLabel': 'Nach Kategorie filtern',
    'collectie.cta.title': 'Nach Maß anfertigen lassen?',
    'collectie.cta.desc': 'Jedes Möbelstück lässt sich in Abmessungen, Holzart und Design anpassen. Fordern Sie ein unverbindliches Angebot an.',
    'collectie.lightbox': 'Foto vergrößern', 'collectie.error': 'Die Galerie konnte nicht geladen werden.',

    'about.hero.label': 'Wer wir sind', 'about.hero.title': 'Über uns',
    'about.hero.desc': 'Eine Werkstatt in Neede mit kurzen Entscheidungswegen, persönlichem Kontakt und Handwerksqualität als Standard.',
    'about.story.title': 'Unsere Geschichte',
    'about.story.p1': 'Ebbers Solutions wurde 2017 gegründet und hat seine Werkstatt am Industriepark an der Veldhoekweg in Neede. Aus der Achterhoek unterstützen wir Unternehmen bei Maschinenwartung, Metallbearbeitung und Stahlkonstruktion.',
    'about.story.p2': 'Als Einzelunternehmen verbinden wir Handwerkskunst mit persönlichem Service. Sie sprechen direkt mit dem Handwerker, der Ihr Projekt umsetzt — ohne Wartezeiten und ohne Zwischenstellen.',
    'about.v1.title': 'Handwerkskunst', 'about.v1.desc': 'Jedes Stück, das unsere Werkstatt verlässt, ist in Handarbeit gefertigt und von derselben Person geprüft.',
    'about.v2.title': 'Zuverlässigkeit', 'about.v2.desc': 'Wir halten Termine ein. Gibt es ein Problem, informieren wir Sie — nicht umgekehrt.',
    'about.v3.title': 'Flexibilität', 'about.v3.desc': 'Vom einzelnen Bauteil bis zur kompletten Konstruktion. Wir passen den Ablauf an Ihre Anforderungen an.',
    'about.v4.title': 'Kurze Wege', 'about.v4.desc': 'Sie sprechen mit der Person, die die Arbeit ausführt. Keine Weiterleitungen, keine Wartezeiten.',
    'about.location.label': 'Unser Standort', 'about.location.title': 'Industriepark Neede',
    'about.location.desc': 'Unsere Werkstatt liegt an der Veldhoekweg am Industriepark in Neede. Gut erreichbar über die A18 — für Kunden in der Region und darüber hinaus.',
    'about.location.caption': 'Werkstatt · Veldhoekweg 1, Neede',
    'about.diff.label': 'Warum Ebbers Solutions', 'about.diff.title': 'Was uns auszeichnet',
    'about.f1.title': 'Kurze Wege', 'about.f1.desc': 'Direkter Kontakt mit den Menschen, die Ihr Projekt umsetzen. Keine Zwischenstellen, keine Missverständnisse.',
    'about.f2.title': 'Regional verwurzelt', 'about.f2.desc': 'Ansässig in Neede, aktiv in der Achterhoek. Nah, gut erreichbar und persönlich engagiert.',
    'about.f3.title': 'Maßanfertigung als Standard', 'about.f3.desc': 'Keine Standardlösungen, die nicht passen. Wir fertigen, was Sie wirklich brauchen.',
    'about.cta.title': 'Gemeinsam ein Projekt starten?',
    'about.cta.desc': 'Erfahren Sie, was Ebbers Solutions für Ihr Unternehmen leisten kann.',

    'contact.hero.label': 'Sprechen wir darüber', 'contact.hero.title': 'Kontakt',
    'contact.hero.desc': 'Rufen Sie an, schreiben Sie eine E-Mail oder nutzen Sie das Formular. Wir melden uns so schnell wie möglich.',
    'contact.quick.call': 'Jetzt anrufen', 'contact.quick.mail': 'E-Mail schreiben', 'contact.quick.route': 'Route planen',
    'contact.info.title': 'Kontaktdaten', 'contact.info.address': 'Adresse', 'contact.info.phone': 'Telefon',
    'contact.info.email': 'E-Mail', 'contact.info.hours': 'Öffnungszeiten', 'contact.info.access': 'Anfahrt',
    'contact.info.accessDesc': 'Industriepark Neede, Achterhoek. Gut erreichbar über die A18.',
    'contact.map.title': 'Standort', 'contact.map.desc': 'Veldhoekweg 1 · Industriepark Neede',
    'contact.form.title': 'Nachricht senden', 'contact.form.name': 'Name', 'contact.form.email': 'E-Mail',
    'contact.form.company': 'Unternehmen', 'contact.form.subject': 'Betreff', 'contact.form.message': 'Nachricht',
    'contact.form.submit': 'Nachricht absenden',
    'contact.form.subjectEmpty': 'Bitte Betreff wählen',
    'contact.form.subjectQuote': 'Angebot anfordern', 'contact.form.subjectConstructie': 'Stahlkonstruktionen',
    'contact.form.subjectBewerking': 'Metallbearbeitung', 'contact.form.subjectOnderhoud': 'Maschinenwartung',
    'contact.form.subjectOther': 'Sonstiges',
    'contact.form.placeholder': 'Beschreiben Sie kurz Ihr Projekt oder Ihre Anfrage …',
    'contact.form.success': 'Vielen Dank für Ihre Nachricht. Wir melden uns so schnell wie möglich bei Ihnen.',
    'contact.form.sending': 'Wird gesendet…',
    'contact.form.error': 'Senden fehlgeschlagen. Bitte versuchen Sie es erneut oder schreiben Sie uns direkt.',
    'contact.form.err.name': 'Bitte geben Sie Ihren Namen ein (mindestens 2 Zeichen).',
    'contact.form.err.email': 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
    'contact.form.err.subject': 'Bitte wählen Sie einen Betreff.',
    'contact.form.err.message': 'Bitte geben Sie eine Nachricht ein (mindestens 10 Zeichen).',
  },
};

const I18N_META = {
  home: { title: 'meta.home.title', desc: 'meta.home.desc' },
  diensten: { title: 'meta.diensten.title', desc: 'meta.diensten.desc' },
  collectie: { title: 'meta.collectie.title', desc: 'meta.collectie.desc' },
  about: { title: 'meta.about.title', desc: 'meta.about.desc' },
  contact: { title: 'meta.contact.title', desc: 'meta.contact.desc' },
};

const I18N_PRODUCTS = {
  'product-2': { title: { nl: 'Eettafel set', en: 'Dining table set', de: 'Esstischgarnitur' }, desc: { nl: 'Zwart staal met zes houten stoelen — complete eetgroep op maat.', en: 'Black steel with six wooden chairs — complete dining set to order.', de: 'Schwarzer Stahl mit sechs Holzstühlen — komplette Essgruppe nach Maß.' } },
  'product-5': { title: { nl: 'Live-edge tafel', en: 'Live-edge table', de: 'Tisch mit Baumkante' }, desc: { nl: 'Natuurlijk houten blad op gebogen metalen poot.', en: 'Natural wood top on curved metal leg.', de: 'Natürliche Holzplatte mit Baumkante auf gebogenem Metallfuß.' } },
  'product-6': { title: { nl: 'Ijzeren kruk', en: 'Iron stool', de: 'Eisenhocker' }, desc: { nl: 'Compact onderstel met warme houten zitting.', en: 'Compact base with warm wooden seat.', de: 'Kompaktes Gestell mit warmer Holzsitzfläche.' } },
  'product-7': { title: { nl: 'Industriële stoel', en: 'Industrial chair', de: 'Industriestuhl' }, desc: { nl: 'Geperforeerde rugleuning en strak staalframe.', en: 'Perforated backrest and sleek steel frame.', de: 'Perforierte Rückenlehne und schlanker Stahlrahmen.' } },
  'product-16': { title: { nl: 'Werkplaatsstoel', en: 'Workshop chair', de: 'Werkstattstuhl' }, desc: { nl: 'Hout en ijzer — gebouwd in onze werkplaats Neede.', en: 'Wood and iron — built in our Neede workshop.', de: 'Holz und Eisen — gefertigt in unserer Werkstatt in Neede.' } },
  'product-4': { title: { nl: 'Geometrisch frame', en: 'Geometric frame', de: 'Geometrischer Rahmen' }, desc: { nl: 'Strakke lijnen en zichtbare constructie.', en: 'Clean lines and visible construction.', de: 'Klare Linien und sichtbare Konstruktion.' } },
  'product-8': { title: { nl: 'Bijzettafel', en: 'Side table', de: 'Beistelltisch' }, desc: { nl: 'Geometrische uitsparingen in zwart staal.', en: 'Geometric cutouts in black steel.', de: 'Geometrische Ausschnitte in schwarzem Stahl.' } },
  'product-12': { title: { nl: 'Kettingtafel', en: 'Chain table', de: 'Tisch mit Kettengestell' }, desc: { nl: 'Industrieel design met opvallend onderstel.', en: 'Industrial design with striking base.', de: 'Industriedesign mit markantem Untergestell.' } },
  'product-3': { title: { nl: 'X-poot detail', en: 'X-leg detail', de: 'X-Gestell — Detail' }, desc: { nl: 'Verbinding van hout en zwart staal.', en: 'Connection of wood and black steel.', de: 'Verbindung von Holz und schwarzem Stahl.' } },
  'product-9': { title: { nl: 'Hexagon poot', en: 'Hexagon leg', de: 'Sechseckiges Tischbein' }, desc: { nl: 'Metalen tafelpoot met zeshoekig design.', en: 'Metal table leg with hexagonal design.', de: 'Metalltischfuß mit sechseckigem Profil.' } },
  'product-11': { title: { nl: 'Raster onderstel', en: 'Grid base', de: 'Gittergestell' }, desc: { nl: 'Gelast frame met geometrisch patroon.', en: 'Welded frame with geometric pattern.', de: 'Geschweißter Rahmen mit geometrischem Muster.' } },
  'product-10': { title: { nl: 'Onderstellen', en: 'Table bases', de: 'Tischgestelle' }, desc: { nl: 'Vier metalen frames — overzicht collectie.', en: 'Four metal frames — collection overview.', de: 'Vier Metallgestelle — Überblick über die Kollektion.' } },
  'product-13': { title: { nl: 'Meubelwerk', en: 'Furniture work', de: 'Möbel in Handarbeit' }, desc: { nl: 'Handgemaakt ijzerwerk uit de werkplaats.', en: 'Handmade ironwork from the workshop.', de: 'Handgefertigte Eisenarbeit aus unserer Werkstatt.' } },
  'product-14': { title: { nl: 'Constructiedetail', en: 'Construction detail', de: 'Konstruktionsdetail' }, desc: { nl: 'Close-up van las- en montagewerk.', en: 'Close-up of welding and assembly work.', de: 'Detailaufnahme von Schweiß- und Montagearbeit.' } },
  'product-1': { title: { nl: 'Werkplaatsframe', en: 'Workshop frame', de: 'Rahmen in Fertigung' }, desc: { nl: 'Ijzeren frame in productie — Neede.', en: 'Iron frame in production — Neede.', de: 'Eisenrahmen in der Fertigung — Neede.' } },
  'product-15': { title: { nl: 'De werkplaats', en: 'The workshop', de: 'Unsere Werkstatt' }, desc: { nl: 'Stalen rekken en houten planken — waar alles ontstaat.', en: 'Steel racks and wooden planks — where everything begins.', de: 'Stahlregale und Holzbretter — hier entsteht alles.' } },
  'product-17': { title: { nl: 'Houten tuinbank', en: 'Wooden garden bench', de: 'Gartenbank aus Holz und Stahl' }, desc: { nl: 'Naturel houten planken op zwart stalen frame met rugleuning.', en: 'Natural wood planks on black steel frame with backrest.', de: 'Naturbelassene Holzbretter auf schwarzem Stahlrahmen mit Rückenlehne.' } },
  'product-18': { title: { nl: 'Houten tuinbank', en: 'Wooden garden bench', de: 'Gartenbank aus Holz und Stahl' }, desc: { nl: 'Identiek model — tweede bank uit de set van twee.', en: 'Identical model — second bench from the set of two.', de: 'Gleiches Modell — zweite Bank aus dem Zweierset.' } },
};

let currentLang = 'nl';

function i18nDetectLang() {
  const stored = localStorage.getItem(I18N_STORAGE_KEY);
  if (stored && I18N_LANGS.includes(stored)) return stored;
  const browser = (navigator.language || 'nl').slice(0, 2).toLowerCase();
  return I18N_LANGS.includes(browser) ? browser : 'nl';
}

function i18nT(key, lang = currentLang) {
  return I18N_STRINGS[lang]?.[key] ?? I18N_STRINGS.nl[key] ?? key;
}

function i18nProduct(id, field, lang = currentLang) {
  const p = I18N_PRODUCTS[id];
  if (!p) return null;
  return p[field]?.[lang] ?? p[field]?.nl ?? null;
}

function i18nCat(category, lang = currentLang) {
  return i18nT(`cat.${category}`, lang);
}

function i18nApply(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  localStorage.setItem(I18N_STORAGE_KEY, lang);

  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = i18nT(el.dataset.i18n, lang);
  });

  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    el.innerHTML = i18nT(el.dataset.i18nHtml, lang);
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = i18nT(el.dataset.i18nPlaceholder, lang);
  });

  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    el.setAttribute('aria-label', i18nT(el.dataset.i18nAria, lang));
  });

  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    el.title = i18nT(el.dataset.i18nTitle, lang);
  });

  document.querySelectorAll('abbr[data-i18n]').forEach(el => {
    el.title = i18nT(el.dataset.i18n, lang);
  });

  const page = document.body.dataset.page;
  if (page && I18N_META[page]) {
    document.title = i18nT(I18N_META[page].title, lang);
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.content = i18nT(I18N_META[page].desc, lang);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.content = i18nT(I18N_META[page].title, lang);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.content = i18nT(I18N_META[page].desc, lang);
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) twitterTitle.content = i18nT(I18N_META[page].title, lang);
    const twitterDesc = document.querySelector('meta[name="twitter:description"]');
    if (twitterDesc) twitterDesc.content = i18nT(I18N_META[page].desc, lang);
  }

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
    btn.setAttribute('aria-pressed', btn.dataset.lang === lang ? 'true' : 'false');
  });

  document.querySelectorAll('.lang-switcher').forEach(switcher => {
    switcher.setAttribute('aria-label', i18nT('nav.lang', lang));
  });

  if (typeof initSiteConfig === 'function') initSiteConfig();
  document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
}

function i18nBuildSwitcher(id, modifier) {
  const wrap = document.createElement('div');
  wrap.className = 'lang-switcher' + (modifier ? ' ' + modifier : '');
  if (id) wrap.id = id;
  wrap.setAttribute('role', 'group');
  wrap.setAttribute('aria-label', i18nT('nav.lang'));

  I18N_LANGS.forEach(code => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'lang-btn';
    btn.dataset.lang = code;
    btn.textContent = code.toUpperCase();
    btn.setAttribute('aria-pressed', 'false');
    btn.addEventListener('click', () => i18nApply(code));
    wrap.appendChild(btn);
  });

  return wrap;
}

function i18nInitSwitcher() {
  const navbar = document.querySelector('.usa-navbar');
  if (!navbar || document.getElementById('langSwitcher')) return;

  const barSwitcher = i18nBuildSwitcher('langSwitcher', 'lang-switcher--bar');
  const menuBtn = navbar.querySelector('.usa-menu-btn');
  if (menuBtn) navbar.insertBefore(barSwitcher, menuBtn);
  else navbar.appendChild(barSwitcher);
}

function initI18n() {
  currentLang = i18nDetectLang();
  i18nInitSwitcher();
  i18nApply(currentLang);
}

window.EbbersI18n = { t: i18nT, product: i18nProduct, cat: i18nCat, getLang: () => currentLang, apply: i18nApply };
window.initI18n = initI18n;