# plus. — Global Digital AI-gency

Bilingual (EN/ID) marketing site for **plus.**, built with **Next.js 16 (App Router)**, React 19, TypeScript, and Tailwind CSS v4.

Live target domain: **plusthe.site**

## Features

- **Internationalization (EN/ID)** with locale-prefixed routing (`/en`, `/id`), automatic locale detection (cookie + `Accept-Language`), and an in-navbar language toggle.
- **Per-language SEO**: `hreflang` (en/id/x-default), canonical URLs, localized `sitemap.xml`, `robots.txt`, and `llms.txt` for AI/LLM discovery.
- **94 SEO articles** (66 ID + 28 EN) under `/blog`, each generated as a static page in its own language.
- **Structured data (JSON-LD)**: Organization, WebSite + SearchAction, Blog, BlogPosting, BreadcrumbList, FAQPage.
- **Dynamic Open Graph images** (per article + per locale) via `next/og`.
- **PWA manifest**, reading-progress bar, scroll-to-top, and CDN `preconnect` for faster LCP.
- Product pages: AI Chat Bot, Digital Agency, Mobile Game — all fully bilingual.

## Getting Started

```bash
npm install
npm run dev      # http://localhost:3000  (redirects to /en or /id)
```

Other scripts:

```bash
npm run build    # production build (static-generates all pages)
npm run start    # serve the production build
npm run lint     # eslint
```

## Project Structure

```
src/
  app/
    [locale]/            # all localized routes (home, blog, product pages, studio)
      layout.tsx         # <html lang>, fonts, providers, per-locale metadata + hreflang
      page.tsx           # homepage
      blog/              # blog listing + [slug] detail + per-article OG image
      chat-bot/ ...      # product pages
      opengraph-image.tsx
    layout.tsx           # pass-through root layout
    sitemap.ts           # localized sitemap with hreflang
    robots.ts
    manifest.ts          # PWA manifest
  proxy.ts               # locale detection + root redirect (Next 16 "proxy" convention)
  i18n/                  # config, dictionaries (en/id), provider, getDictionary
  data/articles.ts       # blog content (each tagged with locale)
  components/            # Navbar, Footer, Hero, ReadingProgress, ScrollToTop, ...
```

## Environment Variables

Copy `.env.example` to `.env.local` and fill in as needed:

```bash
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here   # used by the Studio AI features
GEMINI_API_KEY=your_gemini_api_key_here
```

The marketing site + blog render without any keys. Gemini keys are only needed for the AI Studio (`/[locale]/studio`); Supabase keys power the database features (below).

## Database (Supabase)

Powers newsletter subscribers, contact leads, and per-article view counts. The site builds and runs without it — these features degrade gracefully until configured.

**Setup:**

1. Create a project at **https://supabase.com** (free tier is fine).
2. Open *SQL Editor → New query*, paste the contents of [`supabase/schema.sql`](supabase/schema.sql), and run it. This creates the `subscribers`, `leads`, and `article_views` tables plus the `increment_article_view` function.
3. In *Project Settings → API*, copy the **Project URL**, **anon public** key, and **service_role** key into your env (`.env.local` locally, or Vercel → Settings → Environment Variables):

   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_public_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_secret_key   # server-only, keep secret
   ```

4. Redeploy. The newsletter form (footer) and article view counter become live.

**API endpoints** (used by the UI): `POST /api/subscribe`, `POST /api/lead`, `POST /api/view`. Writes go through the server using the service-role key, so the secret key is never exposed to the browser.

## Deploy to Vercel (recommended)

Next.js auto-deploys on Vercel with **no extra config**.

1. Go to **https://vercel.com/new** and sign in with GitHub.
2. Import the repo **`rachdiaan/plus-aigency`**.
3. (Optional) add the env vars above under *Settings → Environment Variables*.
4. Click **Deploy** → you get a live URL (e.g. `plus-aigency.vercel.app`).
5. To use **plusthe.site**: *Settings → Domains → Add* `plusthe.site`, then point your DNS as Vercel instructs. If plusthe.site already hosts another site, use a subdomain such as `app.plusthe.site` instead.

After connecting, every push to `main` redeploys automatically.

## Notes

- The site base URL is hard-coded as `https://plusthe.site` in metadata, sitemap, robots, and OG images. If you deploy to a different domain, update `SITE` / `BASE_URL` in `src/app/[locale]/layout.tsx`, `src/app/sitemap.ts`, `src/app/robots.ts`, and the blog metadata files.
- Studio (`/[locale]/studio`) is disallowed in `robots.txt`.
