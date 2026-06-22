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