"use client";

import Link from "next/link";
import { LeadAutosaveProvider, useLead } from "@/components/leads/LeadAutosaveProvider";
import { SaveIndicator } from "@/components/ui/SaveIndicator";
import { Field } from "@/components/ui/Field";
import { TextInput } from "@/components/ui/TextInput";
import { DateInput } from "@/components/ui/DateInput";
import { AutoTextarea } from "@/components/ui/AutoTextarea";
import { BooleanChips } from "@/components/ui/BooleanChips";
import { ChipSingleSelect } from "@/components/ui/ChipGroup";
import { CONTACT_STATUS } from "@/lib/enums";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import type { Lead } from "@/lib/types";

export function LeadEditor({ initialLead }: { initialLead: Lead }) {
  return (
    <LeadAutosaveProvider initialLead={initialLead}>
      <LeadEditorInner />
    </LeadAutosaveProvider>
  );
}

function LeadEditorInner() {
  const { lead, updateField, saveNow, saveStatus } = useLead();
  const { t } = useLocale();

  return (
    <div className="min-h-dvh bg-gray-50 pb-10">
      <div className="flex items-center justify-between border-b border-gray-200 bg-white px-3 py-1.5">
        <Link href="/leads" className="tap-target rounded-lg px-2 py-1.5 text-sm text-gray-500 active:bg-gray-100">
          {t("common.backToList")}
        </Link>
        <SaveIndicator status={saveStatus} onRetry={saveNow} />
      </div>

      <main className="mx-auto max-w-2xl space-y-3 p-3">
        <Field label={t("leads.field.companyName")}>
          <TextInput value={lead.company_name} onChange={(v) => updateField({ company_name: v })} onBlur={saveNow} />
        </Field>

        <Field label={t("leads.field.industryType")}>
          <TextInput
            value={lead.industry_type ?? ""}
            onChange={(v) => updateField({ industry_type: v })}
            onBlur={saveNow}
          />
        </Field>

        <Field label={t("leads.field.address")}>
          <TextInput value={lead.address ?? ""} onChange={(v) => updateField({ address: v })} onBlur={saveNow} />
        </Field>

        <Field label={t("leads.field.phone")}>
          <TextInput value={lead.phone ?? ""} onChange={(v) => updateField({ phone: v })} onBlur={saveNow} type="tel" />
        </Field>

        <Field label={t("leads.field.email")}>
          <TextInput value={lead.email ?? ""} onChange={(v) => updateField({ email: v })} onBlur={saveNow} type="email" />
        </Field>

        <Field label={t("leads.field.productType")}>
          <TextInput
            value={lead.product_type ?? ""}
            onChange={(v) => updateField({ product_type: v })}
            onBlur={saveNow}
          />
        </Field>

        <Field label={t("leads.field.customQuotePotential")} hint={lead.custom_quote_potential === null ? t("leads.notSure") : undefined}>
          <BooleanChips
            value={lead.custom_quote_potential}
            onChange={(v) => {
              updateField({ custom_quote_potential: v });
              saveNow();
            }}
          />
        </Field>

        <Field label={t("leads.field.schedulingPainPotential")} hint={lead.scheduling_pain_potential === null ? t("leads.notSure") : undefined}>
          <BooleanChips
            value={lead.scheduling_pain_potential}
            onChange={(v) => {
              updateField({ scheduling_pain_potential: v });
              saveNow();
            }}
          />
        </Field>

        <Field label={t("leads.field.contactStatus")}>
          <ChipSingleSelect
            options={CONTACT_STATUS}
            value={lead.contact_status}
            clearable={false}
            onChange={(v) => {
              if (v) updateField({ contact_status: v });
              saveNow();
            }}
          />
        </Field>

        <Field label={t("leads.field.correctContact")}>
          <TextInput
            value={lead.correct_contact ?? ""}
            onChange={(v) => updateField({ correct_contact: v })}
            onBlur={saveNow}
          />
        </Field>

        <Field label={t("leads.field.nextFollowupDate")}>
          <DateInput
            value={lead.next_followup_date}
            onChange={(v) => {
              updateField({ next_followup_date: v });
              saveNow();
            }}
          />
        </Field>

        <Field label={t("leads.field.scriptUsed")}>
          <TextInput
            value={lead.script_used ?? ""}
            onChange={(v) => updateField({ script_used: v })}
            onBlur={saveNow}
          />
        </Field>

        <Field label={t("leads.field.notes")}>
          <AutoTextarea value={lead.notes ?? ""} onChange={(v) => updateField({ notes: v })} onBlur={saveNow} />
        </Field>
      </main>
    </div>
  );
}
