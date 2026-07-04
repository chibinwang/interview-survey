"use client";

import { useVisit } from "@/components/visit/VisitAutosaveProvider";
import { Field } from "@/components/ui/Field";
import { TextInput } from "@/components/ui/TextInput";
import { DateInput } from "@/components/ui/DateInput";
import { AutoTextarea } from "@/components/ui/AutoTextarea";
import { ChipMultiSelect, ChipSingleSelect } from "@/components/ui/ChipGroup";
import { BooleanChips } from "@/components/ui/BooleanChips";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import {
  VISIT_METHOD,
  INTERVIEWEE_TITLE,
  COMPANY_SIZE,
  INDUSTRY_TYPE,
  CURRENT_SYSTEMS,
} from "@/lib/enums";

export function Section1Basics() {
  const { visit, updateField, saveNow } = useVisit();
  const { t } = useLocale();

  return (
    <div className="space-y-3">
      <Field label={t("field.companyName")}>
        <TextInput
          value={visit.company_name}
          onChange={(v) => updateField({ company_name: v })}
          onBlur={saveNow}
          placeholder={t("field.companyNamePlaceholder")}
        />
      </Field>

      <Field label={t("field.visitDate")}>
        <DateInput
          value={visit.visit_date}
          onChange={(v) => updateField({ visit_date: v })}
          onBlur={saveNow}
        />
      </Field>

      <Field label={t("field.location")}>
        <TextInput
          value={visit.location ?? ""}
          onChange={(v) => updateField({ location: v })}
          onBlur={saveNow}
        />
      </Field>

      <Field label={t("field.visitMethod")}>
        <ChipSingleSelect
          options={VISIT_METHOD}
          value={visit.visit_method}
          onChange={(v) => {
            updateField({ visit_method: v });
            saveNow();
          }}
        />
        {visit.visit_method === "other" && (
          <TextInput
            value={visit.visit_method_other ?? ""}
            onChange={(v) => updateField({ visit_method_other: v })}
            onBlur={saveNow}
            placeholder={t("field.visitMethodOtherPlaceholder")}
          />
        )}
      </Field>

      <Field label={t("field.intervieweeName")}>
        <TextInput
          value={visit.interviewee_name ?? ""}
          onChange={(v) => updateField({ interviewee_name: v })}
          onBlur={saveNow}
        />
      </Field>

      <Field label={t("field.intervieweeContact")}>
        <TextInput
          value={visit.interviewee_contact ?? ""}
          onChange={(v) => updateField({ interviewee_contact: v })}
          onBlur={saveNow}
        />
      </Field>

      <Field label={t("field.intervieweeTitle")}>
        <ChipMultiSelect
          options={INTERVIEWEE_TITLE}
          value={visit.interviewee_title}
          onChange={(v) => {
            updateField({ interviewee_title: v });
            saveNow();
          }}
        />
        {visit.interviewee_title.includes("other") && (
          <TextInput
            value={visit.interviewee_title_other ?? ""}
            onChange={(v) => updateField({ interviewee_title_other: v })}
            onBlur={saveNow}
            placeholder={t("field.intervieweeTitleOtherPlaceholder")}
          />
        )}
      </Field>

      <Field label={t("field.companySize")}>
        <ChipSingleSelect
          options={COMPANY_SIZE}
          value={visit.company_size}
          onChange={(v) => {
            updateField({ company_size: v });
            saveNow();
          }}
        />
      </Field>

      <Field label={t("field.industryType")}>
        <ChipMultiSelect
          options={INDUSTRY_TYPE}
          value={visit.industry_type}
          onChange={(v) => {
            updateField({ industry_type: v });
            saveNow();
          }}
        />
        {visit.industry_type.includes("other") && (
          <TextInput
            value={visit.industry_type_other ?? ""}
            onChange={(v) => updateField({ industry_type_other: v })}
            onBlur={saveNow}
            placeholder={t("field.industryTypeOtherPlaceholder")}
          />
        )}
      </Field>

      <Field label={t("field.exports")}>
        <BooleanChips
          value={visit.exports}
          onChange={(v) => {
            updateField({ exports: v });
            saveNow();
          }}
        />
      </Field>

      <Field label={t("field.hasOverseas")}>
        <BooleanChips
          value={visit.has_overseas_client_or_plant}
          onChange={(v) => {
            updateField({ has_overseas_client_or_plant: v });
            saveNow();
          }}
        />
      </Field>

      <Field label={t("field.currentSystems")}>
        <ChipMultiSelect
          options={CURRENT_SYSTEMS}
          value={visit.current_systems}
          onChange={(v) => {
            updateField({ current_systems: v });
            saveNow();
          }}
        />
        {visit.current_systems.includes("erp") && (
          <TextInput
            value={visit.erp_brand ?? ""}
            onChange={(v) => updateField({ erp_brand: v })}
            onBlur={saveNow}
            placeholder={t("field.erpBrandPlaceholder")}
          />
        )}
        {visit.current_systems.includes("other") && (
          <TextInput
            value={visit.current_systems_other ?? ""}
            onChange={(v) => updateField({ current_systems_other: v })}
            onBlur={saveNow}
            placeholder={t("field.currentSystemsOtherPlaceholder")}
          />
        )}
      </Field>

      <Field label={t("field.firstImpressionNotes")}>
        <AutoTextarea
          value={visit.first_impression_notes ?? ""}
          onChange={(v) => updateField({ first_impression_notes: v })}
          onBlur={saveNow}
          placeholder={t("field.firstImpressionPlaceholder")}
        />
      </Field>
    </div>
  );
}
