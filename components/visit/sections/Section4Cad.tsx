"use client";

import { useVisit } from "@/components/visit/VisitAutosaveProvider";
import { Field } from "@/components/ui/Field";
import { AutoTextarea } from "@/components/ui/AutoTextarea";
import { RatingCircles } from "@/components/ui/RatingCircles";
import { ChipMultiSelect, ChipSingleSelect } from "@/components/ui/ChipGroup";
import { BooleanChips } from "@/components/ui/BooleanChips";
import { InterviewHint } from "@/components/ui/InterviewHint";
import { CAD_BOTTLENECK_TAGS, CAD_PAYMENT_WILLINGNESS } from "@/lib/enums";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { INTERVIEW_SIGNALS } from "@/lib/interviewSignals";

export function Section4Cad() {
  const { visit, updateField, saveNow } = useVisit();
  const { t } = useLocale();

  return (
    <div className="space-y-3">
      <InterviewHint signal={INTERVIEW_SIGNALS.cad} />

      <Field label={t("field.cadBottleneck")}>
        <ChipMultiSelect
          options={CAD_BOTTLENECK_TAGS}
          value={visit.cad_bottleneck_tags}
          onChange={(v) => {
            updateField({ cad_bottleneck_tags: v });
            saveNow();
          }}
        />
      </Field>

      <Field label={t("field.cadSampleAvailable")}>
        <BooleanChips
          value={visit.cad_sample_available}
          onChange={(v) => {
            updateField({ cad_sample_available: v });
            saveNow();
          }}
        />
      </Field>

      <Field label={t("field.historicalQuotesAvailable")}>
        <BooleanChips
          value={visit.historical_quotes_available}
          onChange={(v) => {
            updateField({ historical_quotes_available: v });
            saveNow();
          }}
        />
      </Field>

      <Field label={t("field.painIntensity")}>
        <RatingCircles
          value={visit.cad_pain_intensity}
          onChange={(v) => {
            updateField({ cad_pain_intensity: v });
            saveNow();
          }}
        />
      </Field>

      <Field label={t("field.cadPaymentWillingness")}>
        <ChipSingleSelect
          options={CAD_PAYMENT_WILLINGNESS}
          value={visit.cad_payment_willingness}
          onChange={(v) => {
            updateField({ cad_payment_willingness: v });
            saveNow();
          }}
        />
      </Field>

      <Field label={t("field.quotesVerbatim")}>
        <AutoTextarea
          value={visit.cad_quotes_verbatim ?? ""}
          onChange={(v) => updateField({ cad_quotes_verbatim: v })}
          onBlur={saveNow}
        />
      </Field>
    </div>
  );
}
