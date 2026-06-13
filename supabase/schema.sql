-- ============================================================
-- plus. — Supabase schema
-- Run this in the Supabase SQL editor (Dashboard → SQL → New query)
-- ============================================================

-- Newsletter subscribers ------------------------------------
create table if not exists public.subscribers (
    id          uuid primary key default gen_random_uuid(),
    email       text not null unique,
    locale      text not null default 'en',
    created_at  timestamptz not null default now()
);

-- Contact / lead form submissions ---------------------------
create table if not exists public.leads (
    id          uuid primary key default gen_random_uuid(),
    name        text,
    email       text not null,
    message     text,
    locale      text not null default 'en',
    source      text default 'website',
    created_at  timestamptz not null default now()
);

-- Per-article view counter (analytics) ----------------------
create table if not exists public.article_views (
    slug        text primary key,
    views       bigint not null default 0,
    updated_at  timestamptz not null default now()
);

-- Atomic increment helper (insert-or-bump) ------------------
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

-- Row Level Security ----------------------------------------
-- All writes go through API routes using the service-role key,
-- which bypasses RLS. We keep RLS enabled and only expose a
-- public READ policy for view counts (social proof).
alter table public.subscribers   enable row level security;
alter table public.leads          enable row level security;
alter table public.article_views  enable row level security;

drop policy if exists "public read article views" on public.article_views;
create policy "public read article views"
    on public.article_views for select
    to anon
    using (true);
