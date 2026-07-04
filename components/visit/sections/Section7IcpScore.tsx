"use client";

import { useVisit } from "@/components/visit/VisitAutosaveProvider";
import { Field } from "@/components/ui/Field";
import { AutoTextarea } from "@/components/ui/AutoTextarea";
import { NumberStepper } from "@/components/ui/NumberStepper";
import { ScoreBadge } from "@/components/badges/ScoreBadge";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import type { DictKey } from "@/lib/i18n/dictionary";
import type { Visit } from "@/lib/types";

const SCORE_ITEMS: { key: keyof Visit; labelKey: DictKey; max: number }[] = [
  { key: "score_company_size_fit", labelKey: "field.scoreCompanySizeFit", max: 10 },
  { key: "score_pain_intensity", labelKey: "field.painIntensity", max: 10 },
  { key: "score_scheduling_complexity", labelKey: "field.scoreSchedulingComplexity", max: 10 },
  { key: "score_cad_quoting_need", labelKey: "field.scoreCadQuotingNeed", max: 10 },
  { key: "score_procurement_doc_need", labelKey: "field.scoreProcurementDocNeed", max: 10 },
  { key: "score_export_logistics_need", labelKey: "field.scoreExportLogisticsNeed", max: 10 },
  { key: "score_decision_maker_involvement", labelKey: "field.scoreDecisionMakerInvolvement", max: 10 },
  { key: "score_ai_acceptance", labelKey: "field.aiAcceptanceScore", max: 10 },
  { key: "score_data_availability", labelKey: "field.dataAvailabilityScore", max: 10 },
  { key: "score_payment_likelihood", labelKey: "field.paymentLikelihoodScore", max: 5 },
  { key: "score_case_study_value", labelKey: "field.scoreCaseStudyValue", max: 5 },
];

export function Section7IcpScore() {
  const { visit, updateField, saveNow } = useVisit();
  const { t } = useLocale();

  return (
    <div className="space-y-3">
      <div className="rounded-2xl bg-white p-3 text-center shadow-sm">
        <p className="text-xs text-gray-400">{t("field.icpTotal")}</p>
        <div className="mt-1 flex justify-center">
          <ScoreBadge score={visit.score_total} />
        </div>
      </div>

      {SCORE_ITEMS.map((item) => (
        <Field key={item.key} label={t(item.labelKey)}>
          <NumberStepper
            value={(visit[item.key] as number) ?? 0}
            max={item.max}
            onChange={(v) => {
              updateField({ [item.key]: v });
              saveNow();
            }}
          />
        </Field>
      ))}

      <Field label={t("field.scoreNotes")}>
        <AutoTextarea
          value={visit.score_notes ?? ""}
          onChange={(v) => updateField({ score_notes: v })}
          onBlur={saveNow}
        />
      </Field>
    </div>
  );
}
