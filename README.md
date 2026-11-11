# no-moat.com

A single-page "domain for sale" site, deployed as a Cloudflare Worker with static assets.

- `public/index.html` is the whole site.
- `src/worker.js` serves it and handles `/api/stats` (view counter).
- `wrangler.jsonc` is the Cloudflare config.

## Deploy

Cloudflare dashboard → **Workers & Pages** → **Create** → **Import a repository** → pick this repo.

- Build command: *(empty)*
- Deploy command: `npx wrangler deploy`
- The Worker name in the dashboard must match `name` in `wrangler.jsonc` (`no-moat`).

Then in the Worker → **Settings** → **Domains & Routes** → add `no-moat.com` as a custom domain.

## View counter (optional)

The page shows a view count and an "I'm interested" button. Until KV is connected the counter stays hidden and the rest of the page works normally.

1. Cloudflare dashboard → **Storage & Databases** → **KV** → **Create a namespace** (e.g. `no-moat-counter`) and copy its ID.
2. In `wrangler.jsonc`, uncomment the `kv_namespaces` line and paste the ID (the line starts with a comma, keep it).
3. Commit and push. Cloudflare redeploys.

Each browser is counted once (tracked in localStorage), so it's a rough count, not exact analytics.

## Editing

Change the price or email in `public/index.html` and push. Cloudflare redeploys automatically.
