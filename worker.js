const APEX = 'ebberssolutions.com';
const WWW = 'www.ebberssolutions.com';

const SUBJECT_LABELS = {
  offerte: 'Offerte aanvragen',
  constructie: 'Constructiewerken',
  bewerking: 'Metaalbewerking',
  onderhoud: 'Machine-onderhoud',
  anders: 'Anders',
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.hostname === WWW) {
      url.hostname = APEX;
      return new Response(null, {
        status: 301,
        headers: {
          Location: url.toString(),
          'Cache-Control': 'public, max-age=86400',
        },
      });
    }

    if (url.pathname === '/api/contact') {
      return handleContact(request, env);
    }

    if (url.pathname === '/api/assistant') {
      return handleAssistant(request, env);
    }

    return env.ASSETS.fetch(request);
  },
};

async function handleContact(request, env) {
  if (request.method !== 'POST') {
    return json({ error: 'method_not_allowed' }, 405);
  }

  let data;
  const contentType = request.headers.get('content-type') || '';

  try {
    if (contentType.includes('application/json')) {
      data = await request.json();
    } else {
      const form = await request.formData();
      data = Object.fromEntries(form.entries());
    }
  } catch {
    return json({ error: 'invalid_body' }, 400);
  }

  if (data['bot-field']) {
    return json({ ok: true });
  }

  const naam = trim(data.naam);
  const email = trim(data.email);
  const bedrijf = trim(data.bedrijf);
  const onderwerp = trim(data.onderwerp);
  const bericht = trim(data.bericht);

  if (naam.length < 2) return json({ error: 'invalid_name' }, 400);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ error: 'invalid_email' }, 400);
  if (!SUBJECT_LABELS[onderwerp]) return json({ error: 'invalid_subject' }, 400);
  if (bericht.length < 10) return json({ error: 'invalid_message' }, 400);

  if (!env.EMAIL) {
    return json({ error: 'email_not_configured' }, 503);
  }

  const subjectLabel = SUBJECT_LABELS[onderwerp];
  const to = env.CONTACT_TO || 'peterebbers67@gmail.com';
  const fromEmail = env.CONTACT_FROM || 'contact@ebberssolutions.com';

  const text = [
    `Nieuw bericht via ebberssolutions.com`,
    '',
    `Naam: ${naam}`,
    `E-mail: ${email}`,
    bedrijf ? `Bedrijf: ${bedrijf}` : null,
    `Onderwerp: ${subjectLabel}`,
    '',
    'Bericht:',
    bericht,
  ]
    .filter(Boolean)
    .join('\n');

  const html = [
    '<h2>Nieuw bericht via ebberssolutions.com</h2>',
    '<table cellpadding="4" cellspacing="0">',
    row('Naam', naam),
    row('E-mail', email),
    bedrijf ? row('Bedrijf', bedrijf) : '',
    row('Onderwerp', subjectLabel),
    '</table>',
    '<p><strong>Bericht:</strong></p>',
    `<p style="white-space:pre-wrap">${escapeHtml(bericht)}</p>`,
  ].join('');

  try {
    await env.EMAIL.send({
      to,
      from: { email: fromEmail, name: 'Ebbers Solutions' },
      replyTo: { email, name: naam },
      subject: `[Website] ${subjectLabel} — ${naam}`,
      text,
      html,
    });
    return json({ ok: true });
  } catch (err) {
    console.error('contact email failed', err);
    return json({ error: 'send_failed' }, 500);
  }
}

const COMPANY = {
  name: 'Ebbers Solutions',
  tagline: 'Metalen oplossingen op maat uit Neede.',
  founded: 2017,
  kvk: '68518102',
  street: 'Veldhoekweg 1',
  postcode: '7161 RW',
  city: 'Neede',
  region: 'Industrieterrein Neede, Berkelland',
  phone: '+31 6 1390 0094',
  phoneHref: '+31613900094',
  email: 'peterebbers67@gmail.com',
  hours: 'Ma – Vr: 07:30 – 16:30',
  site: 'https://ebberssolutions.com',
};

const ASSISTANT_MODEL = '@cf/meta/llama-3.1-8b-instruct';

async function handleAssistant(request, env) {
  if (request.method !== 'POST') {
    return json({ error: 'method_not_allowed' }, 405);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'invalid_body' }, 400);
  }

  const message = trim(body.message);
  const lang = ['nl', 'en', 'de'].includes(body.lang) ? body.lang : 'nl';
  const history = Array.isArray(body.history)
    ? body.history
        .filter((item) => item && (item.role === 'user' || item.role === 'assistant'))
        .slice(-6)
        .map((item) => ({
          role: item.role,
          content: trim(item.content).slice(0, 600),
        }))
        .filter((item) => item.content.length > 0)
    : [];

  if (message.length < 1 || message.length > 500) {
    return json({ error: 'invalid_message' }, 400);
  }

  const fallback = assistantFallback(message, lang);

  if (!env.AI) {
    return json({ reply: fallback, source: 'fallback' });
  }

  const messages = [
    { role: 'system', content: assistantSystemPrompt(lang) },
    ...history,
    { role: 'user', content: message },
  ];

  try {
    const result = await env.AI.run(ASSISTANT_MODEL, {
      messages,
      max_tokens: 420,
      temperature: 0.45,
    });
    const reply = trim(result?.response);
    if (reply.length > 0) {
      return json({ reply, source: 'ai' });
    }
  } catch (err) {
    console.error('assistant ai failed', err);
  }

  return json({ reply: fallback, source: 'fallback' });
}

function assistantSystemPrompt(lang) {
  const langHint =
    lang === 'en'
      ? 'Default to English when the user language is unclear.'
      : lang === 'de'
        ? 'Default to German when the user language is unclear.'
        : 'Default to Dutch when the user language is unclear.';

  return [
    `You are the helpful website assistant for ${COMPANY.name}, a metal workshop in Neede, Netherlands.`,
    'Answer in the same language the visitor uses (Dutch, English, German, or any other language).',
    langHint,
    'Be concise (max 3 short paragraphs). Friendly, professional, craft-focused — not corporate or salesy.',
    '',
    'Facts (do not invent others):',
    `- Services: machine maintenance & repair, steel construction, metal fabrication (MIG/TIG/plasma/laser).`,
    `- Also: handmade iron/wood furniture (chairs, tables, benches) — "Collectie" on the website.`,
    `- All furniture is custom-made (dimensions, wood type, design).`,
    `- Address: ${COMPANY.street}, ${COMPANY.postcode} ${COMPANY.city} (${COMPANY.region}).`,
    `- Phone (international): ${COMPANY.phone} — always show with country code +31.`,
    `- Email: ${COMPANY.email}`,
    `- Opening hours: ${COMPANY.hours}`,
    `- Founded ${COMPANY.founded}, KVK ${COMPANY.kvk}.`,
    `- Contact page: ${COMPANY.site}/contact.html`,
    '',
    'Rules:',
    '- For quotes, prices, lead times, or orders: explain briefly and direct to contact form, phone, or email.',
    '- Never invent prices, delivery dates, or stock availability.',
    '- Mention phone or email when the visitor wants to reach Peter directly.',
    '- You cannot book appointments or process orders — only inform and refer.',
  ].join('\n');
}

function assistantFallback(message, lang) {
  const text = message.toLowerCase();
  const pick = (nl, en, de) => (lang === 'en' ? en : lang === 'de' ? de : nl);
  const contact = pick(
    `Neem direct contact op via het [contactformulier](${COMPANY.site}/contact.html), bel **${COMPANY.phone}** of mail **${COMPANY.email}**. Wij zijn bereikbaar ${COMPANY.hours}.`,
    `Contact us via the [contact form](${COMPANY.site}/contact.html), call **${COMPANY.phone}**, or email **${COMPANY.email}**. We're available ${COMPANY.hours}.`,
    `Kontaktieren Sie uns über das [Kontaktformular](${COMPANY.site}/contact.html), telefonisch **${COMPANY.phone}** oder per E-Mail **${COMPANY.email}**. Erreichbar ${COMPANY.hours}.`,
  );

  if (/prijs|kosten|offerte|quote|price|cost|preis|angebot/.test(text)) {
    return pick(
      `Elk project is maatwerk — prijzen hangen af van materiaal, formaat en complexiteit. ${contact}`,
      `Every project is custom — pricing depends on material, size, and complexity. ${contact}`,
      `Jedes Projekt ist Maßanfertigung — Preise hängen von Material, Größe und Aufwand ab. ${contact}`,
    );
  }

  if (/collectie|meubel|stoel|tafel|bank|furniture|chair|table|möbel|stuhl|tisch/.test(text)) {
    return pick(
      `Onze **Collectie** bevat handgemaakte ijzeren meubels (stoelen, tafels, banken), allemaal op maat. Bekijk [collectie.html](${COMPANY.site}/collectie.html). Vragen of een offerte? ${contact}`,
      `Our **Collection** features handmade iron furniture (chairs, tables, benches), all custom-made. See [collectie.html](${COMPANY.site}/collectie.html). Questions or a quote? ${contact}`,
      `Unsere **Kollektion** umfasst handgefertigte Eisenmöbel (Stühle, Tische, Bänke), alles nach Maß. [collectie.html](${COMPANY.site}/collectie.html). Fragen oder Angebot? ${contact}`,
    );
  }

  if (/dienst|service|onderhoud|constructie|bewerking|maintenance|construction|metal|wartung|konstruktion/.test(text)) {
    return pick(
      `Wij bieden **machine-onderhoud**, **constructiewerken** en **metaalbewerking** vanuit Neede. Meer info op [diensten.html](${COMPANY.site}/diensten.html). ${contact}`,
      `We offer **machine maintenance**, **steel construction**, and **metal fabrication** from Neede. Details at [diensten.html](${COMPANY.site}/diensten.html). ${contact}`,
      `Wir bieten **Maschinenwartung**, **Stahlkonstruktionen** und **Metallbearbeitung** aus Neede. Details unter [diensten.html](${COMPANY.site}/diensten.html). ${contact}`,
    );
  }

  if (/bel|telefoon|phone|nummer|call|anruf|tel/.test(text)) {
    return pick(
      `Bel ons op **${COMPANY.phone}** (${COMPANY.hours}).`,
      `Call us at **${COMPANY.phone}** (${COMPANY.hours}).`,
      `Rufen Sie uns an: **${COMPANY.phone}** (${COMPANY.hours}).`,
    );
  }

  if (/mail|email|e-mail|schrijf/.test(text)) {
    return pick(
      `Mail naar **${COMPANY.email}** of gebruik het [contactformulier](${COMPANY.site}/contact.html).`,
      `Email **${COMPANY.email}** or use the [contact form](${COMPANY.site}/contact.html).`,
      `E-Mail an **${COMPANY.email}** oder [Kontaktformular](${COMPANY.site}/contact.html).`,
    );
  }

  if (/adres|address|neede|waar|where|standort|locatie|location/.test(text)) {
    return pick(
      `U vindt ons op **${COMPANY.street}, ${COMPANY.postcode} ${COMPANY.city}** (${COMPANY.region}). ${contact}`,
      `We're at **${COMPANY.street}, ${COMPANY.postcode} ${COMPANY.city}** (${COMPANY.region}). ${contact}`,
      `Adresse: **${COMPANY.street}, ${COMPANY.postcode} ${COMPANY.city}** (${COMPANY.region}). ${contact}`,
    );
  }

  if (/open|uur|hours|öffnung|zeit/.test(text)) {
    return pick(
      `Openingstijden: **${COMPANY.hours}**.`,
      `Opening hours: **${COMPANY.hours}**.`,
      `Öffnungszeiten: **${COMPANY.hours}**.`,
    );
  }

  return pick(
    `Ik help u graag met vragen over onze diensten, collectie of contact. ${contact}`,
    `I'm happy to help with questions about our services, collection, or contact details. ${contact}`,
    `Ich helfe gern bei Fragen zu Leistungen, Kollektion oder Kontakt. ${contact}`,
  );
}

function trim(value) {
  return String(value ?? '').trim();
}

function row(label, value) {
  return `<tr><td><strong>${escapeHtml(label)}</strong></td><td>${escapeHtml(value)}</td></tr>`;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}