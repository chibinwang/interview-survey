"use client";

import { useVisit } from "@/components/visit/VisitAutosaveProvider";
import { Field } from "@/components/ui/Field";
import { TextInput } from "@/components/ui/TextInput";
import { AutoTextarea } from "@/components/ui/AutoTextarea";
import { ChipMultiSelect } from "@/components/ui/ChipGroup";
import { BooleanChips } from "@/components/ui/BooleanChips";
import { DOCUMENT_TIME_TAGS } from "@/lib/enums";
import { useLocale } from "@/lib/i18n/LocaleProvider";

export function Section5Procurement() {
  const { visit, updateField, saveNow } = useVisit();
  const { t } = useLocale();

  return (
    <div className="space-y-3">
      <Field label={t("field.procurementNotes")}>
        <AutoTextarea
          value={visit.procurement_notes ?? ""}
          onChange={(v) => updateField({ procurement_notes: v })}
          onBlur={saveNow}
        />
      </Field>

      <Field label={t("field.documentTimeTags")}>
        <ChipMultiSelect
          options={DOCUMENT_TIME_TAGS}
          value={visit.document_time_tags}
          onChange={(v) => {
            updateField({ document_time_tags: v });
            saveNow();
          }}
        />
      </Field>

      <Field label={t("field.dailyTimeEstimate")}>
        <TextInput
          value={visit.daily_time_estimate ?? ""}
          onChange={(v) => updateField({ daily_time_estimate: v })}
          onBlur={saveNow}
          placeholder={t("field.dailyTimeEstimatePlaceholder")}
        />
      </Field>

      <Field label={t("field.mostWantedAutomation")}>
        <TextInput
          value={visit.most_wanted_automation ?? ""}
          onChange={(v) => updateField({ most_wanted_automation: v })}
          onBlur={saveNow}
        />
      </Field>

      <Field label={t("field.fitsDocumentationAi")}>
        <BooleanChips
          value={visit.fits_documentation_ai}
          onChange={(v) => {
            updateField({ fits_documentation_ai: v });
            saveNow();
          }}
        />
      </Field>

      <Field label={t("field.fitsFreightForwarderAi")}>
        <BooleanChips
          value={visit.fits_freight_forwarder_ai}
          onChange={(v) => {
            updateField({ fits_freight_forwarder_ai: v });
            saveNow();
          }}
        />
      </Field>

      <Field label={t("field.quotesVerbatim")}>
        <AutoTextarea
          value={visit.procurement_quotes_verbatim ?? ""}
          onChange={(v) => updateField({ procurement_quotes_verbatim: v })}
          onBlur={saveNow}
        />
      </Field>
    </div>
  );
}
