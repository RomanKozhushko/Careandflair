-- Care & Flair Phase 4.1: quote request persistence
-- Run this file in the Supabase SQL Editor for the target project.
-- Required environment variables in the app:
-- NEXT_PUBLIC_SUPABASE_URL=
-- SUPABASE_SERVICE_ROLE_KEY=

create extension if not exists pgcrypto;

create table if not exists public.quote_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  status text not null default 'new',
  name text,
  phone text,
  email text,
  postcode text,
  address_optional text,
  service_type text,
  selected_package text,
  property_category text,
  property_type text,
  selected_problems jsonb,
  selected_upgrades jsonb,
  estimated_price numeric,
  deadline text,
  message text,
  source_page text,
  admin_notes text,
  constraint quote_requests_status_check check (
    status in ('new', 'contacted', 'quoted', 'booked', 'completed', 'lost')
  )
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists quote_requests_set_updated_at on public.quote_requests;

create trigger quote_requests_set_updated_at
before update on public.quote_requests
for each row
execute function public.set_updated_at();

create index if not exists quote_requests_created_at_idx
  on public.quote_requests (created_at desc);

create index if not exists quote_requests_status_idx
  on public.quote_requests (status);

comment on table public.quote_requests is
  'Care & Flair quote builder requests captured from the public website.';

comment on column public.quote_requests.admin_notes is
  'Internal admin-only notes. Never expose this on public pages.';
