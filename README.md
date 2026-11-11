# no-moat.com

A single-page "domain for sale" site. No build step, no dependencies. Just `index.html`.

## Deploy on Cloudflare Pages

1. Push this folder to a GitHub repo.
2. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**, then pick the repo.
3. Build settings:
   - Framework preset: **None**
   - Build command: *(leave empty)*
   - Build output directory: `/` (or leave empty)
4. Deploy.
5. In the Pages project → **Custom domains** → **Set up a custom domain** → enter `no-moat.com`. Since the domain is already on Cloudflare, the DNS record is added for you.

Optionally add `www.no-moat.com` as a second custom domain too.

## View counter (optional)

The page shows a view count and an "I'm interested" button. They are backed by `functions/api/stats.js`, which Cloudflare Pages deploys automatically. It needs one KV namespace:

1. Cloudflare dashboard → **Storage & Databases** → **KV** → **Create a namespace** (name it e.g. `no-moat-counter`).
2. Pages project → **Settings** → **Bindings** (or **Functions** → **KV namespace bindings**) → **Add** → KV namespace.
   - Variable name: `COUNTER`
   - Namespace: the one you just created
3. Redeploy (push a commit, or **Retry deployment**).

Until the binding exists, the counter stays hidden and the rest of the page works normally. Each browser is counted once (tracked in localStorage), so it's a rough count, not exact analytics.

## Editing

Change the price or email directly in `index.html` and push. Cloudflare redeploys automatically.
