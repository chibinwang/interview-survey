-- Manufacturing AI Discovery Notes — bilingual custom questions
-- Adds an optional English label alongside each custom template
-- question's existing (Chinese) label. Idempotent: safe to re-run.

alter table public.template_questions
  add column if not exists label_en text;
