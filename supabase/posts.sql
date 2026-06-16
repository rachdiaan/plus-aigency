-- ============================================================
-- plus. — Blog CMS: posts table
-- Run in Supabase SQL Editor (project qsklgxeovoegxxiutkzh).
-- Lets you create/edit/publish blog articles from the admin dashboard.
-- ============================================================

create table if not exists public.posts (
    id            uuid primary key default gen_random_uuid(),
    slug          text not null unique,
    title         text not null,
    description   text default '',
    category      text default '',
    tags          text[] not null default '{}',
    content       text default '',                 -- HTML
    image         text default '',
    locale        text not null default 'en',      -- 'en' | 'id'
    read_time     text default '5 min',
    status        text not null default 'draft',   -- 'draft' | 'published'
    published_at  timestamptz,
    created_at    timestamptz not null default now(),
    updated_at    timestamptz not null default now()
);

create index if not exists posts_status_locale_idx on public.posts (status, locale);
create index if not exists posts_published_at_idx on public.posts (published_at desc);

-- Auto-update updated_at
create or replace function public.set_posts_updated_at()
returns trigger language plpgsql as $$
begin
    new.updated_at = now();
    return new;
end;
$$;

drop trigger if exists posts_set_updated_at on public.posts;
create trigger posts_set_updated_at
    before update on public.posts
    for each row execute function public.set_posts_updated_at();

-- RLS: public can read PUBLISHED posts; all writes go through the
-- service-role key from the admin dashboard (bypasses RLS).
alter table public.posts enable row level security;

drop policy if exists "posts_public_read_published" on public.posts;
create policy "posts_public_read_published"
    on public.posts for select
    to anon, authenticated
    using (status = 'published');
