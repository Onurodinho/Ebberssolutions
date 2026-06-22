const APEX = 'ebberssolutions.com';
const WWW = 'www.ebberssolutions.com';

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

    return env.ASSETS.fetch(request);
  },
};