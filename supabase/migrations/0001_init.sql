-- Manufacturing AI Discovery Notes — initial schema
-- Idempotent: safe to paste into the Supabase SQL editor and re-run.

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------
-- updated_at trigger helper
-- ---------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------
-- visits table
-- ---------------------------------------------------------------------
create table if not exists public.visits (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  -- 1. Visit basics --------------------------------------------------
  company_name text not null,
  visit_date date,
  location text,
  visit_method text,
  visit_method_other text,
  interviewee_name text,
  interviewee_contact text,
  interviewee_title text[] not null default '{}',
  interviewee_title_other text,
  company_size text,
  industry_type text[] not null default '{}',
  industry_type_other text,
  exports boolean,
  has_overseas_client_or_plant boolean,
  current_systems text[] not null default '{}',
  erp_brand text,
  current_systems_other text,
  first_impression_notes text,

  -- 2. Process map ------------------------------------------------------
  process_map jsonb not null default '[
    {"stage":"接單","owner":"","tools_used":"","biggest_pain_point":"","relies_on_manual_experience":false,"ai_opportunity":null},
    {"stage":"報價","owner":"","tools_used":"","biggest_pain_point":"","relies_on_manual_experience":false,"ai_opportunity":null},
    {"stage":"採購","owner":"","tools_used":"","biggest_pain_point":"","relies_on_manual_experience":false,"ai_opportunity":null},
    {"stage":"生產排程","owner":"","tools_used":"","biggest_pain_point":"","relies_on_manual_experience":false,"ai_opportunity":null},
    {"stage":"製造","owner":"","tools_used":"","biggest_pain_point":"","relies_on_manual_experience":false,"ai_opportunity":null},
    {"stage":"品檢","owner":"","tools_used":"","biggest_pain_point":"","relies_on_manual_experience":false,"ai_opportunity":null},
    {"stage":"出貨","owner":"","tools_used":"","biggest_pain_point":"","relies_on_manual_experience":false,"ai_opportunity":null},
    {"stage":"文件對帳","owner":"","tools_used":"","biggest_pain_point":"","relies_on_manual_experience":false,"ai_opportunity":null}
  ]'::jsonb,

  -- 3. Scheduler pain points -------------------------------------------
  scheduler_notes text,
  scheduler_pain_intensity int,
  scheduler_frequency int,
  scheduler_fit_score int,
  scheduler_current_solution text,
  scheduler_quotes text,
  scheduler_disruption_tags text[] not null default '{}',

  -- 4. CAD / quoting pain points ----------------------------------------
  cad_bottleneck_tags text[] not null default '{}',
  cad_sample_available boolean,
  historical_quotes_available boolean,
  cad_pain_intensity int,
  cad_payment_willingness text,
  cad_quotes_verbatim text,

  -- 5. Procurement / documentation / logistics pain points --------------
  procurement_notes text,
  document_time_tags text[] not null default '{}',
  daily_time_estimate text,
  most_wanted_automation text,
  fits_documentation_ai boolean,
  fits_freight_forwarder_ai boolean,
  procurement_quotes_verbatim text,

  -- 6. AI readiness / adoption conditions --------------------------------
  decision_maker text,
  likely_opponent text,
  biggest_beneficiary text,
  currently_uses_ai_tools boolean,
  currently_uses_ai_tools_detail text,
  willing_to_share_data boolean,
  willing_to_do_2wk_poc boolean,
  willing_to_pay_symbolic_fee boolean,
  concerns text[] not null default '{}',
  concerns_other text,
  adoption_threshold text,
  deal_friction text,
  next_decision_process text,
  ai_acceptance_score int,
  decision_speed_score int,
  data_availability_score int,
  payment_likelihood_score int,

  -- 7. ICP / lead scoring -------------------------------------------------
  score_company_size_fit int not null default 0,
  score_pain_intensity int not null default 0,
  score_scheduling_complexity int not null default 0,
  score_cad_quoting_need int not null default 0,
  score_procurement_doc_need int not null default 0,
  score_export_logistics_need int not null default 0,
  score_decision_maker_involvement int not null default 0,
  score_ai_acceptance int not null default 0,
  score_data_availability int not null default 0,
  score_payment_likelihood int not null default 0,
  score_case_study_value int not null default 0,
  score_total int generated always as (
    coalesce(score_company_size_fit, 0) +
    coalesce(score_pain_intensity, 0) +
    coalesce(score_scheduling_complexity, 0) +
    coalesce(score_cad_quoting_need, 0) +
    coalesce(score_procurement_doc_need, 0) +
    coalesce(score_export_logistics_need, 0) +
    coalesce(score_decision_maker_involvement, 0) +
    coalesce(score_ai_acceptance, 0) +
    coalesce(score_data_availability, 0) +
    coalesce(score_payment_likelihood, 0) +
    coalesce(score_case_study_value, 0)
  ) stored,
  score_notes text,

  -- 8. Demo reaction log ----------------------------------------------------
  demo_features_shown text[] not null default '{}',
  demo_features_other text,
  demo_best_moment text,
  demo_confusion_points text,
  demo_objections text,
  demo_questions_asked text,
  demo_features_liked text,
  demo_features_not_needed text,
  demo_next_step text,
  needs_customization boolean,
  customization_description text,

  -- 9. Data collection / PoC scope ------------------------------------------
  available_data_types text[] not null default '{}',
  data_sensitivity text,
  nda_required boolean,
  poc_goal text,
  poc_success_criteria text,
  our_next_step text,

  -- 10. Follow-up --------------------------------------------------------
  lead_status text not null default 'cold',
  recommended_solutions text[] not null default '{}',
  next_actions text[] not null default '{}',
  followup_date date,
  content_to_send text,
  internal_notes text,
  closing_strategy text,
  final_verdict text,

  -- -----------------------------------------------------------------
  -- check constraints
  -- -----------------------------------------------------------------
  constraint visits_visit_method_check
    check (visit_method is null or visit_method in ('phone','onsite','referral','other')),
  constraint visits_interviewee_title_check
    check (interviewee_title <@ array['owner','successor','plant_manager','production_control','procurement','sales','engineering','other']::text[]),
  constraint visits_company_size_check
    check (company_size is null or company_size in ('<20','20-50','50-100','100-200','200+')),
  constraint visits_industry_type_check
    check (industry_type <@ array['precision_machining','hardware','mold','auto_parts','aerospace','semiconductor_supply_chain','electronic_components','export_packaging','other']::text[]),
  constraint visits_current_systems_check
    check (current_systems <@ array['erp','excel','whiteboard','paper','line_app','verbal_experience','other']::text[]),

  constraint visits_scheduler_pain_intensity_check check (scheduler_pain_intensity is null or scheduler_pain_intensity between 1 and 5),
  constraint visits_scheduler_frequency_check check (scheduler_frequency is null or scheduler_frequency between 1 and 5),
  constraint visits_scheduler_fit_score_check check (scheduler_fit_score is null or scheduler_fit_score between 1 and 5),
  constraint visits_scheduler_disruption_tags_check
    check (scheduler_disruption_tags <@ array['order_congestion','material_shortage','machine_breakdown','rush_order','understaffed','client_change']::text[]),

  constraint visits_cad_bottleneck_tags_check
    check (cad_bottleneck_tags <@ array['labor_hours','material','process','surface_treatment','tolerance','packaging','testing','lead_time']::text[]),
  constraint visits_cad_pain_intensity_check check (cad_pain_intensity is null or cad_pain_intensity between 1 and 5),
  constraint visits_cad_payment_willingness_check
    check (cad_payment_willingness is null or cad_payment_willingness in ('high','medium','low','unclear')),

  constraint visits_document_time_tags_check
    check (document_time_tags <@ array['purchase_order','shipping_order','customs_declaration','packing_list','invoice','reconciliation','client_docs','supplier_docs']::text[]),

  constraint visits_concerns_check
    check (concerns <@ array['data_security','staff_resistance','system_complexity','cost','owner_distrust','erp_integration','other']::text[]),
  constraint visits_ai_acceptance_score_check check (ai_acceptance_score is null or ai_acceptance_score between 1 and 5),
  constraint visits_decision_speed_score_check check (decision_speed_score is null or decision_speed_score between 1 and 5),
  constraint visits_data_availability_score_check check (data_availability_score is null or data_availability_score between 1 and 5),
  constraint visits_payment_likelihood_score_check check (payment_likelihood_score is null or payment_likelihood_score between 1 and 5),

  constraint visits_score_company_size_fit_range check (score_company_size_fit between 0 and 10),
  constraint visits_score_pain_intensity_range check (score_pain_intensity between 0 and 10),
  constraint visits_score_scheduling_complexity_range check (score_scheduling_complexity between 0 and 10),
  constraint visits_score_cad_quoting_need_range check (score_cad_quoting_need between 0 and 10),
  constraint visits_score_procurement_doc_need_range check (score_procurement_doc_need between 0 and 10),
  constraint visits_score_export_logistics_need_range check (score_export_logistics_need between 0 and 10),
  constraint visits_score_decision_maker_involvement_range check (score_decision_maker_involvement between 0 and 10),
  constraint visits_score_ai_acceptance_range check (score_ai_acceptance between 0 and 10),
  constraint visits_score_data_availability_range check (score_data_availability between 0 and 10),
  constraint visits_score_payment_likelihood_range check (score_payment_likelihood between 0 and 5),
  constraint visits_score_case_study_value_range check (score_case_study_value between 0 and 5),

  constraint visits_demo_features_shown_check
    check (demo_features_shown <@ array['scheduler','cad_intelligence','documentation_ai','other']::text[]),

  constraint visits_available_data_types_check
    check (available_data_types <@ array['cad_drawings','excel_schedule','historical_quotes','work_orders','purchase_orders','shipping_orders','erp_export','machine_list','routing_rules','capacity_assumptions','factory_floor_notes']::text[]),
  constraint visits_data_sensitivity_check
    check (data_sensitivity is null or data_sensitivity in ('low','medium','high')),

  constraint visits_lead_status_check
    check (lead_status in ('cold','neutral','interested','very_interested','ready_to_close')),
  constraint visits_recommended_solutions_check
    check (recommended_solutions <@ array['scheduler','cad_intelligence','documentation_ai','procurement_ai','freight_forwarder_ai','custom_workflow']::text[]),
  constraint visits_next_actions_check
    check (next_actions <@ array['send_deck','send_demo_video','schedule_2nd_meeting','get_test_data','write_poc_report','send_quote','pitch_to_owner']::text[]),
  constraint visits_final_verdict_check
    check (final_verdict is null or final_verdict in ('paid_founding_customer','free_poc','design_partner','not_pursuing'))
);

-- ---------------------------------------------------------------------
-- updated_at trigger
-- ---------------------------------------------------------------------
drop trigger if exists visits_set_updated_at on public.visits;
create trigger visits_set_updated_at
  before update on public.visits
  for each row
  execute function public.set_updated_at();

-- ---------------------------------------------------------------------
-- indexes
-- ---------------------------------------------------------------------
create index if not exists visits_user_id_idx on public.visits (user_id);
create index if not exists visits_company_name_idx on public.visits (company_name);
create index if not exists visits_lead_status_idx on public.visits (lead_status);
create index if not exists visits_score_total_idx on public.visits (score_total);
create index if not exists visits_visit_date_idx on public.visits (visit_date);

-- ---------------------------------------------------------------------
-- row level security
-- ---------------------------------------------------------------------
alter table public.visits enable row level security;

drop policy if exists "visits_select_own" on public.visits;
create policy "visits_select_own"
  on public.visits for select
  using (auth.uid() = user_id);

drop policy if exists "visits_insert_own" on public.visits;
create policy "visits_insert_own"
  on public.visits for insert
  with check (auth.uid() = user_id);

drop policy if exists "visits_update_own" on public.visits;
create policy "visits_update_own"
  on public.visits for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "visits_delete_own" on public.visits;
create policy "visits_delete_own"
  on public.visits for delete
  using (auth.uid() = user_id);
