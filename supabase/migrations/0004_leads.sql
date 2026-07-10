-- Manufacturing AI Discovery Notes — leads (standalone prospect tracking table)
-- Separate from the visits/interview template — a lightweight table for
-- tracking prospects before (or without) a full visit record.
-- Idempotent: safe to re-run.

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  company_name text not null default '',
  industry_type text,
  address text,
  phone text,
  email text,
  product_type text,
  custom_quote_potential boolean,
  scheduling_pain_potential boolean,
  contact_status text not null default 'not_contacted',
  correct_contact text,
  next_followup_date date,
  notes text,
  script_used text,

  constraint leads_contact_status_check
    check (contact_status in ('not_contacted','awaiting_reply','meeting_scheduled','quoted','closed_won','not_interested'))
);

drop trigger if exists leads_set_updated_at on public.leads;
create trigger leads_set_updated_at
  before update on public.leads
  for each row
  execute function public.set_updated_at();

create index if not exists leads_user_id_idx on public.leads (user_id);
create index if not exists leads_company_name_idx on public.leads (company_name);
create index if not exists leads_contact_status_idx on public.leads (contact_status);
create index if not exists leads_next_followup_date_idx on public.leads (next_followup_date);

alter table public.leads enable row level security;

drop policy if exists "leads_select_own" on public.leads;
create policy "leads_select_own"
  on public.leads for select
  using (auth.uid() = user_id);

drop policy if exists "leads_insert_own" on public.leads;
create policy "leads_insert_own"
  on public.leads for insert
  with check (auth.uid() = user_id);

drop policy if exists "leads_update_own" on public.leads;
create policy "leads_update_own"
  on public.leads for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "leads_delete_own" on public.leads;
create policy "leads_delete_own"
  on public.leads for delete
  using (auth.uid() = user_id);
