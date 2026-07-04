"use client";

import { useVisit } from "@/components/visit/VisitAutosaveProvider";
import { Field } from "@/components/ui/Field";
import { TextInput } from "@/components/ui/TextInput";
import { AutoTextarea } from "@/components/ui/AutoTextarea";
import { RatingCircles } from "@/components/ui/RatingCircles";
import { ChipMultiSelect } from "@/components/ui/ChipGroup";
import { SCHEDULER_DISRUPTION_TAGS } from "@/lib/enums";
import { useLocale } from "@/lib/i18n/LocaleProvider";

export function Section3Scheduler() {
  const { visit, updateField, saveNow } = useVisit();
  const { t } = useLocale();

  return (
    <div className="space-y-3">
      <Field label={t("field.schedulerNotes")}>
        <AutoTextarea
          value={visit.scheduler_notes ?? ""}
          onChange={(v) => updateField({ scheduler_notes: v })}
          onBlur={saveNow}
        />
      </Field>

      <Field label={t("field.painIntensity")}>
        <RatingCircles
          value={visit.scheduler_pain_intensity}
          onChange={(v) => {
            updateField({ scheduler_pain_intensity: v });
            saveNow();
          }}
        />
      </Field>

      <Field label={t("field.frequency")}>
        <RatingCircles
          value={visit.scheduler_frequency}
          onChange={(v) => {
            updateField({ scheduler_frequency: v });
            saveNow();
          }}
        />
      </Field>

      <Field label={t("field.schedulerFitScore")}>
        <RatingCircles
          value={visit.scheduler_fit_score}
          onChange={(v) => {
            updateField({ scheduler_fit_score: v });
            saveNow();
          }}
        />
      </Field>

      <Field label={t("field.currentSolution")}>
        <TextInput
          value={visit.scheduler_current_solution ?? ""}
          onChange={(v) => updateField({ scheduler_current_solution: v })}
          onBlur={saveNow}
        />
      </Field>

      <Field label={t("field.disruptionTags")}>
        <ChipMultiSelect
          options={SCHEDULER_DISRUPTION_TAGS}
          value={visit.scheduler_disruption_tags}
          onChange={(v) => {
            updateField({ scheduler_disruption_tags: v });
            saveNow();
          }}
        />
      </Field>

      <Field label={t("field.quotesVerbatim")}>
        <AutoTextarea
          value={visit.scheduler_quotes ?? ""}
          onChange={(v) => updateField({ scheduler_quotes: v })}
          onBlur={saveNow}
        />
      </Field>
    </div>
  );
}
