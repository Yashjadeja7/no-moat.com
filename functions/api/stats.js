// Cloudflare Pages Function: GET/POST /api/stats
// Stores two counters in a KV namespace bound as COUNTER:
//   views      - incremented once per browser on first visit
//   interested - incremented when someone presses "I'm interested"

const headers = { 'content-type': 'application/json', 'cache-control': 'no-store' };
const json = (data, status = 200) => new Response(JSON.stringify(data), { status, headers });

export async function onRequest({ request, env }) {
  const kv = env.COUNTER;
  if (!kv) return json({ error: 'KV binding COUNTER is not set up' }, 503);

  const read = async () => ({
    views: parseInt((await kv.get('views')) || '0', 10),
    interested: parseInt((await kv.get('interested')) || '0', 10),
  });

  if (request.method === 'GET') return json(await read());

  if (request.method === 'POST') {
    // Only accept requests coming from this site.
    const origin = request.headers.get('origin');
    if (origin && origin !== new URL(request.url).origin) return json({ error: 'forbidden' }, 403);

    let body = {};
    try { body = await request.json(); } catch (e) {}
    const key = body.type === 'view' ? 'views' : body.type === 'interest' ? 'interested' : null;
    if (!key) return json({ error: 'bad request' }, 400);

    const data = await read();
    data[key] += 1;
    await kv.put(key, String(data[key]));
    return json(data);
  }

  return json({ error: 'method not allowed' }, 405);
}
