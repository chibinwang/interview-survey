"use client";

import { useVisit } from "@/components/visit/VisitAutosaveProvider";
import { Field } from "@/components/ui/Field";
import { DateInput } from "@/components/ui/DateInput";
import { AutoTextarea } from "@/components/ui/AutoTextarea";
import { ChipMultiSelect, ChipSingleSelect } from "@/components/ui/ChipGroup";
import { LEAD_STATUS, RECOMMENDED_SOLUTIONS, NEXT_ACTIONS, FINAL_VERDICT } from "@/lib/enums";
import { useLocale } from "@/lib/i18n/LocaleProvider";

export function Section10Followup() {
  const { visit, updateField, saveNow } = useVisit();
  const { t } = useLocale();

  return (
    <div className="space-y-3">
      <Field label={t("field.leadStatus")}>
        <ChipSingleSelect
          options={LEAD_STATUS}
          value={visit.lead_status}
          clearable={false}
          onChange={(v) => {
            updateField({ lead_status: v ?? "cold" });
            saveNow();
          }}
        />
      </Field>

      <Field label={t("field.recommendedSolutions")}>
        <ChipMultiSelect
          options={RECOMMENDED_SOLUTIONS}
          value={visit.recommended_solutions}
          onChange={(v) => {
            updateField({ recommended_solutions: v });
            saveNow();
          }}
        />
      </Field>

      <Field label={t("field.nextActions")}>
        <ChipMultiSelect
          options={NEXT_ACTIONS}
          value={visit.next_actions}
          onChange={(v) => {
            updateField({ next_actions: v });
            saveNow();
          }}
        />
      </Field>

      <Field label={t("field.followupDate")}>
        <DateInput
          value={visit.followup_date}
          onChange={(v) => updateField({ followup_date: v })}
          onBlur={saveNow}
        />
      </Field>

      <Field label={t("field.contentToSend")}>
        <AutoTextarea
          value={visit.content_to_send ?? ""}
          onChange={(v) => updateField({ content_to_send: v })}
          onBlur={saveNow}
        />
      </Field>

      <Field label={t("field.internalNotes")}>
        <AutoTextarea
          value={visit.internal_notes ?? ""}
          onChange={(v) => updateField({ internal_notes: v })}
          onBlur={saveNow}
        />
      </Field>

      <Field label={t("field.closingStrategy")}>
        <AutoTextarea
          value={visit.closing_strategy ?? ""}
          onChange={(v) => updateField({ closing_strategy: v })}
          onBlur={saveNow}
        />
      </Field>

      <Field label={t("field.finalVerdict")}>
        <ChipSingleSelect
          options={FINAL_VERDICT}
          value={visit.final_verdict}
          onChange={(v) => {
            updateField({ final_verdict: v });
            saveNow();
          }}
        />
      </Field>
    </div>
  );
}
