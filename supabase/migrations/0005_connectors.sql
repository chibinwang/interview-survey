-- Manufacturing AI Discovery Notes — connectors (standalone Connector CRM)
-- Separate from leads/visits: tracks the network of consultants, ERP
-- partners, professors, SIs, and guild contacts who can open factory doors,
-- not prospects themselves.
-- Idempotent: safe to re-run.

create table if not exists public.connectors (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  name text not null default '',
  company text,
  role text[] not null default '{}',
  role_other text,
  specialty text[] not null default '{}',
  specialty_other text,
  factory_exposure_estimate integer,
  linkedin text,
  warm_intro boolean,
  interviewed boolean,
  can_introduce_customers integer,
  potential_advisor integer,
  notes text,

  constraint connectors_role_check
    check (role <@ array['consultant','erp_partner','professor','si','guild','other']::text[]),
  constraint connectors_specialty_check
    check (specialty <@ array['erp','mes','aps','lean','cnc','other']::text[]),
  constraint connectors_factory_exposure_estimate_check
    check (factory_exposure_estimate is null or factory_exposure_estimate >= 0),
  constraint connectors_can_introduce_customers_check
    check (can_introduce_customers is null or can_introduce_customers between 1 and 5),
  constraint connectors_potential_advisor_check
    check (potential_advisor is null or potential_advisor between 1 and 5)
);

drop trigger if exists connectors_set_updated_at on public.connectors;
create trigger connectors_set_updated_at
  before update on public.connectors
  for each row
  execute function public.set_updated_at();

create index if not exists connectors_user_id_idx on public.connectors (user_id);
create index if not exists connectors_name_idx on public.connectors (name);

alter table public.connectors enable row level security;

drop policy if exists "connectors_select_own" on public.connectors;
create policy "connectors_select_own"
  on public.connectors for select
  using (auth.uid() = user_id);

drop policy if exists "connectors_insert_own" on public.connectors;
create policy "connectors_insert_own"
  on public.connectors for insert
  with check (auth.uid() = user_id);

drop policy if exists "connectors_update_own" on public.connectors;
create policy "connectors_update_own"
  on public.connectors for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "connectors_delete_own" on public.connectors;
create policy "connectors_delete_own"
  on public.connectors for delete
  using (auth.uid() = user_id);
