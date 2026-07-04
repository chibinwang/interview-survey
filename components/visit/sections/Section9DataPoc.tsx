"use client";

import { useVisit } from "@/components/visit/VisitAutosaveProvider";
import { Field } from "@/components/ui/Field";
import { AutoTextarea } from "@/components/ui/AutoTextarea";
import { ChipMultiSelect, ChipSingleSelect } from "@/components/ui/ChipGroup";
import { BooleanChips } from "@/components/ui/BooleanChips";
import { AVAILABLE_DATA_TYPES, DATA_SENSITIVITY } from "@/lib/enums";
import { useLocale } from "@/lib/i18n/LocaleProvider";

export function Section9DataPoc() {
  const { visit, updateField, saveNow } = useVisit();
  const { t } = useLocale();

  return (
    <div className="space-y-3">
      <Field label={t("field.availableDataTypes")}>
        <ChipMultiSelect
          options={AVAILABLE_DATA_TYPES}
          value={visit.available_data_types}
          onChange={(v) => {
            updateField({ available_data_types: v });
            saveNow();
          }}
        />
      </Field>

      <Field label={t("field.dataSensitivity")}>
        <ChipSingleSelect
          options={DATA_SENSITIVITY}
          value={visit.data_sensitivity}
          onChange={(v) => {
            updateField({ data_sensitivity: v });
            saveNow();
          }}
        />
      </Field>

      <Field label={t("field.ndaRequired")}>
        <BooleanChips
          value={visit.nda_required}
          onChange={(v) => {
            updateField({ nda_required: v });
            saveNow();
          }}
        />
      </Field>

      <Field label={t("field.pocGoal")}>
        <AutoTextarea
          value={visit.poc_goal ?? ""}
          onChange={(v) => updateField({ poc_goal: v })}
          onBlur={saveNow}
        />
      </Field>

      <Field label={t("field.pocSuccessCriteria")}>
        <AutoTextarea
          value={visit.poc_success_criteria ?? ""}
          onChange={(v) => updateField({ poc_success_criteria: v })}
          onBlur={saveNow}
        />
      </Field>

      <Field label={t("field.ourNextStep")}>
        <AutoTextarea
          value={visit.our_next_step ?? ""}
          onChange={(v) => updateField({ our_next_step: v })}
          onBlur={saveNow}
        />
      </Field>
    </div>
  );
}
