
-- Enable UUID extension
create extension if not exists "pgcrypto";

-- RSVP responses table
create table rsvp_responses (
  id uuid primary key default gen_random_uuid(),
  guest_name text not null,
  attending boolean not null,
  message text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Enable RLS
alter table rsvp_responses enable row level security;

-- Anon can insert (submit RSVP)
create policy "anon_insert_rsvp" on rsvp_responses
  for insert to anon
  with check (true);

-- Anon can select (view their own confirmation after submitting)
create policy "anon_select_rsvp" on rsvp_responses
  for select to anon
  using (true);

-- Auto-update updated_at trigger
create or replace function update_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger rsvp_updated_at
  before update on rsvp_responses
  for each row execute function update_updated_at();
