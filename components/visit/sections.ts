import type { Visit } from "@/lib/types";
import type { DictKey } from "@/lib/i18n/dictionary";

export type SectionId =
  | "basics"
  | "process-map"
  | "scheduler"
  | "cad"
  | "procurement"
  | "ai-readiness"
  | "icp-score"
  | "demo"
  | "data-poc"
  | "followup";

export const SECTIONS: { id: SectionId; labelKey: DictKey; isComplete: (v: Visit) => boolean }[] = [
  {
    id: "basics",
    labelKey: "tab.basics",
    isComplete: (v) => !!(v.company_name && v.visit_date && v.interviewee_name),
  },
  {
    id: "process-map",
    labelKey: "tab.processMap",
    isComplete: (v) => (v.process_map ?? []).every((s) => !!s.biggest_pain_point),
  },
  {
    id: "scheduler",
    labelKey: "tab.scheduler",
    isComplete: (v) => !!(v.scheduler_notes || v.scheduler_pain_intensity),
  },
  {
    id: "cad",
    labelKey: "tab.cad",
    isComplete: (v) => !!(v.cad_pain_intensity || v.cad_quotes_verbatim),
  },
  {
    id: "procurement",
    labelKey: "tab.procurement",
    isComplete: (v) => !!(v.procurement_notes || v.document_time_tags?.length),
  },
  {
    id: "ai-readiness",
    labelKey: "tab.aiReadiness",
    isComplete: (v) => !!(v.decision_maker || v.ai_acceptance_score),
  },
  {
    id: "icp-score",
    labelKey: "tab.icpScore",
    isComplete: (v) => v.score_total > 0,
  },
  {
    id: "demo",
    labelKey: "tab.demo",
    isComplete: (v) => !!(v.demo_features_shown?.length || v.demo_best_moment),
  },
  {
    id: "data-poc",
    labelKey: "tab.dataPoc",
    isComplete: (v) => !!(v.available_data_types?.length || v.poc_goal),
  },
  {
    id: "followup",
    labelKey: "tab.followup",
    isComplete: (v) => !!(v.followup_date || v.next_actions?.length || v.final_verdict),
  },
];
