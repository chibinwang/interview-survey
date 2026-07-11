export type ProcessMapStage = {
  stage: string;
  owner: string;
  tools_used: string;
  biggest_pain_point: string;
  relies_on_manual_experience: boolean;
  ai_opportunity: "high" | "medium" | "low" | null;
};

export interface Visit {
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;

  // conversation type: "potential_client" uses the fixed factory template
  // below; other types use a user-defined template (see Template/TemplateQuestion)
  // and store answers in custom_answers, keyed by template_question id.
  visit_type: string;
  custom_answers: Record<string, string | string[] | number | null>;

  // 1. Visit basics
  company_name: string;
  visit_date: string | null;
  location: string | null;
  visit_method: string | null;
  visit_method_other: string | null;
  interviewee_name: string | null;
  interviewee_contact: string | null;
  interviewee_title: string[];
  interviewee_title_other: string | null;
  company_size: string | null;
  industry_type: string[];
  industry_type_other: string | null;
  exports: boolean | null;
  has_overseas_client_or_plant: boolean | null;
  current_systems: string[];
  erp_brand: string | null;
  current_systems_other: string | null;
  first_impression_notes: string | null;

  // 2. Process map
  process_map: ProcessMapStage[];

  // 3. Scheduler
  scheduler_notes: string | null;
  scheduler_pain_intensity: number | null;
  scheduler_frequency: number | null;
  scheduler_fit_score: number | null;
  scheduler_current_solution: string | null;
  scheduler_quotes: string | null;
  scheduler_disruption_tags: string[];

  // 4. CAD / quoting
  cad_bottleneck_tags: string[];
  cad_sample_available: boolean | null;
  historical_quotes_available: boolean | null;
  cad_pain_intensity: number | null;
  cad_payment_willingness: string | null;
  cad_quotes_verbatim: string | null;

  // 5. Procurement / documentation / logistics
  procurement_notes: string | null;
  document_time_tags: string[];
  daily_time_estimate: string | null;
  most_wanted_automation: string | null;
  fits_documentation_ai: boolean | null;
  fits_freight_forwarder_ai: boolean | null;
  procurement_quotes_verbatim: string | null;

  // 6. AI readiness
  decision_maker: string | null;
  likely_opponent: string | null;
  biggest_beneficiary: string | null;
  currently_uses_ai_tools: boolean | null;
  currently_uses_ai_tools_detail: string | null;
  willing_to_share_data: boolean | null;
  willing_to_do_2wk_poc: boolean | null;
  willing_to_pay_symbolic_fee: boolean | null;
  concerns: string[];
  concerns_other: string | null;
  adoption_threshold: string | null;
  deal_friction: string | null;
  next_decision_process: string | null;
  ai_acceptance_score: number | null;
  decision_speed_score: number | null;
  data_availability_score: number | null;
  payment_likelihood_score: number | null;

  // 7. ICP scoring
  score_company_size_fit: number;
  score_pain_intensity: number;
  score_scheduling_complexity: number;
  score_cad_quoting_need: number;
  score_procurement_doc_need: number;
  score_export_logistics_need: number;
  score_decision_maker_involvement: number;
  score_ai_acceptance: number;
  score_data_availability: number;
  score_payment_likelihood: number;
  score_case_study_value: number;
  score_total: number;
  score_notes: string | null;

  // 8. Demo reaction log
  demo_features_shown: string[];
  demo_features_other: string | null;
  demo_best_moment: string | null;
  demo_confusion_points: string | null;
  demo_objections: string | null;
  demo_questions_asked: string | null;
  demo_features_liked: string | null;
  demo_features_not_needed: string | null;
  demo_next_step: string | null;
  needs_customization: boolean | null;
  customization_description: string | null;

  // 9. Data / PoC scope
  available_data_types: string[];
  data_sensitivity: string | null;
  nda_required: boolean | null;
  poc_goal: string | null;
  poc_success_criteria: string | null;
  our_next_step: string | null;

  // 10. Follow-up
  lead_status: string;
  recommended_solutions: string[];
  next_actions: string[];
  followup_date: string | null;
  content_to_send: string | null;
  internal_notes: string | null;
  closing_strategy: string | null;
  final_verdict: string | null;
}

export type VisitUpdate = Partial<Omit<Visit, "id" | "user_id" | "created_at" | "updated_at" | "score_total">>;

export const SCORE_FIELDS = [
  "score_company_size_fit",
  "score_pain_intensity",
  "score_scheduling_complexity",
  "score_cad_quoting_need",
  "score_procurement_doc_need",
  "score_export_logistics_need",
  "score_decision_maker_involvement",
  "score_ai_acceptance",
  "score_data_availability",
  "score_payment_likelihood",
  "score_case_study_value",
] as const;

export interface Lead {
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;

  company_name: string;
  industry_type: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  product_type: string | null;
  custom_quote_potential: boolean | null;
  scheduling_pain_potential: boolean | null;
  contact_status: string;
  correct_contact: string | null;
  next_followup_date: string | null;
  notes: string | null;
  script_used: string | null;
}

export type LeadUpdate = Partial<Omit<Lead, "id" | "user_id" | "created_at" | "updated_at">>;

export interface Connector {
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;

  name: string;
  company: string | null;
  role: string[];
  role_other: string | null;
  specialty: string[];
  specialty_other: string | null;
  factory_exposure_estimate: number | null;
  linkedin: string | null;
  warm_intro: boolean | null;
  interviewed: boolean | null;
  can_introduce_customers: number | null;
  potential_advisor: number | null;
  notes: string | null;
}

export type ConnectorUpdate = Partial<Omit<Connector, "id" | "user_id" | "created_at" | "updated_at">>;

export interface Template {
  id: string;
  user_id: string;
  visit_type: string;
  created_at: string;
  updated_at: string;
}

export interface TemplateQuestion {
  id: string;
  template_id: string;
  user_id: string;
  position: number;
  label: string;
  label_en: string | null;
  field_type: "text" | "textarea" | "checklist" | "rating";
  options: { value: string; label_zh: string; label_en: string }[] | null;
  max_rating: number;
  created_at: string;
  updated_at: string;
}
