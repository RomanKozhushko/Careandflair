-- Care & Flair editable site content storage
--
-- Run this in the Supabase SQL Editor for the project used by the live site.
-- JSON files in src/data remain the default seed/fallback content. The admin
-- editor saves live changes into this table using resource_key values such as:
-- site-settings, quote-builder, packages, services, before-after, faq, areas,
-- homepage, upgrades.

create extension if not exists pgcrypto;

create table if not exists public.site_content (
  id uuid primary key default gen_random_uuid(),
  resource_key text unique not null,
  content jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists site_content_resource_key_idx
  on public.site_content (resource_key);

create table if not exists public.site_content_drafts (
  id uuid primary key default gen_random_uuid(),
  resource_key text unique not null,
  content jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists site_content_drafts_resource_key_idx
  on public.site_content_drafts (resource_key);

create or replace function public.set_site_content_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_site_content_updated_at on public.site_content;

create trigger set_site_content_updated_at
before update on public.site_content
for each row
execute function public.set_site_content_updated_at();

drop trigger if exists set_site_content_drafts_updated_at on public.site_content_drafts;

create trigger set_site_content_drafts_updated_at
before update on public.site_content_drafts
for each row
execute function public.set_site_content_updated_at();

comment on table public.site_content is
  'Editable Care & Flair website content. JSON files remain fallback/default seed content.';

comment on column public.site_content.resource_key is
  'Admin resource key, for example site-settings, quote-builder, packages, solutions, before-after, faqs, areas.';

comment on column public.site_content.content is
  'JSON object for object resources, JSON array for list resources.';

comment on table public.site_content_drafts is
  'Draft Care & Flair website content. Drafts do not affect the public site until published into site_content.';

comment on column public.site_content_drafts.resource_key is
  'Admin resource key matching site_content.resource_key.';

comment on column public.site_content_drafts.content is
  'Draft JSON object for object resources, draft JSON array for list resources.';

-- Optional seed example:
-- insert into public.site_content (resource_key, content)
-- values ('site-settings', '{"siteName":"Care & Flair"}'::jsonb)
-- on conflict (resource_key) do update set content = excluded.content;
