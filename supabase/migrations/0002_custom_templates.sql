-- Manufacturing AI Discovery Notes — custom survey templates
-- Adds support for non-factory conversation types (investor, advisor,
-- consultant, senior engineer, custom) with a user-defined, reusable
-- question list per type. Idempotent: safe to re-run.

-- ---------------------------------------------------------------------
-- visits: which kind of conversation this is, and answers to that
-- type's custom questions (ignored for visit_type = 'potential_client',
-- which keeps using the existing typed columns).
-- ---------------------------------------------------------------------
alter table public.visits
  add column if not exists visit_type text not null default 'potential_client',
  add column if not exists custom_answers jsonb not null default '{}'::jsonb;

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'visits_visit_type_check'
  ) then
    alter table public.visits
      add constraint visits_visit_type_check
      check (visit_type in ('potential_client','investor','advisor','consultant','senior_engineer','custom'));
  end if;
end $$;

create index if not exists visits_visit_type_idx on public.visits (visit_type);

-- ---------------------------------------------------------------------
-- templates: one reusable question list per (user, visit_type)
-- ---------------------------------------------------------------------
create table if not exists public.templates (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  visit_type text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint templates_visit_type_check
    check (visit_type in ('investor','advisor','consultant','senior_engineer','custom')),
  constraint templates_user_type_unique unique (user_id, visit_type)
);

drop trigger if exists templates_set_updated_at on public.templates;
create trigger templates_set_updated_at
  before update on public.templates
  for each row
  execute function public.set_updated_at();

alter table public.templates enable row level security;

drop policy if exists "templates_select_own" on public.templates;
create policy "templates_select_own" on public.templates for select using (auth.uid() = user_id);
drop policy if exists "templates_insert_own" on public.templates;
create policy "templates_insert_own" on public.templates for insert with check (auth.uid() = user_id);
drop policy if exists "templates_update_own" on public.templates;
create policy "templates_update_own" on public.templates for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "templates_delete_own" on public.templates;
create policy "templates_delete_own" on public.templates for delete using (auth.uid() = user_id);

-- ---------------------------------------------------------------------
-- template_questions: ordered question list belonging to a template
-- ---------------------------------------------------------------------
create table if not exists public.template_questions (
  id uuid primary key default gen_random_uuid(),
  template_id uuid not null references public.templates(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  position int not null default 0,
  label text not null,
  field_type text not null,
  options jsonb,
  max_rating int not null default 5,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint template_questions_field_type_check
    check (field_type in ('text','textarea','checklist','rating')),
  constraint template_questions_max_rating_check
    check (max_rating between 1 and 10)
);

drop trigger if exists template_questions_set_updated_at on public.template_questions;
create trigger template_questions_set_updated_at
  before update on public.template_questions
  for each row
  execute function public.set_updated_at();

create index if not exists template_questions_template_id_idx on public.template_questions (template_id, position);

alter table public.template_questions enable row level security;

drop policy if exists "template_questions_select_own" on public.template_questions;
create policy "template_questions_select_own" on public.template_questions for select using (auth.uid() = user_id);
drop policy if exists "template_questions_insert_own" on public.template_questions;
create policy "template_questions_insert_own" on public.template_questions for insert with check (auth.uid() = user_id);
drop policy if exists "template_questions_update_own" on public.template_questions;
create policy "template_questions_update_own" on public.template_questions for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "template_questions_delete_own" on public.template_questions;
create policy "template_questions_delete_own" on public.template_questions for delete using (auth.uid() = user_id);
