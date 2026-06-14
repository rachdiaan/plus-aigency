-- ============================================================
-- plus. — Complete Supabase setup for the PUBLIC SITE
-- Run ONCE: Supabase Dashboard → SQL Editor → New query → paste → Run
-- Idempotent: safe to re-run. Creates every table the public site's
-- API routes use, verified against the code:
--   /api/subscribe -> subscribers      (service-role key)
--   /api/lead      -> leads            (service-role key)
--   /api/view      -> article_views + increment_article_view() (service-role)
--   /api/contact   -> contacts         (anon key  → needs RLS insert policy)
--   /api/chat      -> chat_messages    (anon key  → needs RLS policies)
-- Studio tables (generated_assets, campaigns, kol_database, analytics_events)
-- live in the root-level schema.sql / fix_rls_policies.sql.
-- ============================================================

-- 1. Newsletter subscribers (written via service-role key) ------
create table if not exists public.subscribers (
    id          uuid primary key default gen_random_uuid(),
    email       text not null unique,
    locale      text not null default 'en',
    created_at  timestamptz not null default now()
);

-- 2. Leads / contact-style submissions (service-role key) -------
create table if not exists public.leads (
    id          uuid primary key default gen_random_uuid(),
    name        text,
    email       text not null,
    message     text,
    locale      text not null default 'en',
    source      text default 'website',
    created_at  timestamptz not null default now()
);

-- 3. Per-article view counter + atomic increment RPC ------------
create table if not exists public.article_views (
    slug        text primary key,
    views       bigint not null default 0,
    updated_at  timestamptz not null default now()
);

create or replace function public.increment_article_view(p_slug text)
returns bigint
language plpgsql
security definer
as $$
declare
    new_count bigint;
begin
    insert into public.article_views (slug, views, updated_at)
    values (p_slug, 1, now())
    on conflict (slug)
    do update set views = public.article_views.views + 1, updated_at = now()
    returning views into new_count;
    return new_count;
end;
$$;

-- 4. Contact form submissions (written via anon key) ------------
create table if not exists public.contacts (
    id          uuid primary key default gen_random_uuid(),
    name        text not null,
    email       text not null,
    company     text,
    message     text not null,
    created_at  timestamptz not null default now()
);

-- 5. Chat messages (written via anon key) -----------------------
create table if not exists public.chat_messages (
    id          uuid primary key default gen_random_uuid(),
    session_id  text,
    role        text,
    content     text,
    created_at  timestamptz not null default now()
);

-- ============================================================
-- Row Level Security
--   subscribers / leads / article_views : written via the
--   service-role key, which BYPASSES RLS (no insert policy needed).
--   contacts / chat_messages : written via the anon key, so they
--   need explicit anon INSERT policies or the writes fail.
-- ============================================================
alter table public.subscribers   enable row level security;
alter table public.leads          enable row level security;
alter table public.article_views  enable row level security;
alter table public.contacts       enable row level security;
alter table public.chat_messages  enable row level security;

-- article_views: allow public read (social-proof counts)
drop policy if exists "article_views_public_read" on public.article_views;
create policy "article_views_public_read"
    on public.article_views for select
    to anon, authenticated using (true);

-- contacts: anyone may submit; only logged-in may read
drop policy if exists "contacts_anon_insert" on public.contacts;
create policy "contacts_anon_insert"
    on public.contacts for insert
    to anon, authenticated with check (true);
drop policy if exists "contacts_auth_read" on public.contacts;
create policy "contacts_auth_read"
    on public.contacts for select
    to authenticated using (true);

-- chat_messages: anon may insert and read (chat demo)
drop policy if exists "chat_anon_insert" on public.chat_messages;
create policy "chat_anon_insert"
    on public.chat_messages for insert
    to anon, authenticated with check (true);
drop policy if exists "chat_anon_select" on public.chat_messages;
create policy "chat_anon_select"
    on public.chat_messages for select
    to anon, authenticated using (true);
