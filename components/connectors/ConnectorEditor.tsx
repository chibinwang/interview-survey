"use client";

import Link from "next/link";
import { ConnectorAutosaveProvider, useConnector } from "@/components/connectors/ConnectorAutosaveProvider";
import { SaveIndicator } from "@/components/ui/SaveIndicator";
import { Field } from "@/components/ui/Field";
import { TextInput } from "@/components/ui/TextInput";
import { AutoTextarea } from "@/components/ui/AutoTextarea";
import { BooleanChips } from "@/components/ui/BooleanChips";
import { ChipMultiSelect } from "@/components/ui/ChipGroup";
import { RatingCircles } from "@/components/ui/RatingCircles";
import { CONNECTOR_ROLE, CONNECTOR_SPECIALTY } from "@/lib/enums";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import type { Connector } from "@/lib/types";

export function ConnectorEditor({ initialConnector }: { initialConnector: Connector }) {
  return (
    <ConnectorAutosaveProvider initialConnector={initialConnector}>
      <ConnectorEditorInner />
    </ConnectorAutosaveProvider>
  );
}

function ConnectorEditorInner() {
  const { connector, updateField, saveNow, saveStatus } = useConnector();
  const { t } = useLocale();

  return (
    <div className="min-h-dvh bg-gray-50 pb-10">
      <div className="flex items-center justify-between border-b border-gray-200 bg-white px-3 py-1.5">
        <Link href="/connectors" className="tap-target rounded-lg px-2 py-1.5 text-sm text-gray-500 active:bg-gray-100">
          {t("common.backToList")}
        </Link>
        <SaveIndicator status={saveStatus} onRetry={saveNow} />
      </div>

      <main className="mx-auto max-w-2xl space-y-3 p-3">
        <Field label={t("connectors.field.name")}>
          <TextInput value={connector.name} onChange={(v) => updateField({ name: v })} onBlur={saveNow} />
        </Field>

        <Field label={t("connectors.field.company")}>
          <TextInput
            value={connector.company ?? ""}
            onChange={(v) => updateField({ company: v })}
            onBlur={saveNow}
          />
        </Field>

        <Field label={t("connectors.field.role")}>
          <ChipMultiSelect
            options={CONNECTOR_ROLE}
            value={connector.role}
            onChange={(v) => {
              updateField({ role: v });
              saveNow();
            }}
          />
          {connector.role.includes("other") && (
            <TextInput
              value={connector.role_other ?? ""}
              onChange={(v) => updateField({ role_other: v })}
              onBlur={saveNow}
              placeholder={t("connectors.field.roleOtherPlaceholder")}
            />
          )}
        </Field>

        <Field label={t("connectors.field.specialty")}>
          <ChipMultiSelect
            options={CONNECTOR_SPECIALTY}
            value={connector.specialty}
            onChange={(v) => {
              updateField({ specialty: v });
              saveNow();
            }}
          />
          {connector.specialty.includes("other") && (
            <TextInput
              value={connector.specialty_other ?? ""}
              onChange={(v) => updateField({ specialty_other: v })}
              onBlur={saveNow}
              placeholder={t("connectors.field.specialtyOtherPlaceholder")}
            />
          )}
        </Field>

        <Field label={t("connectors.field.factoryExposureEstimate")}>
          <TextInput
            value={connector.factory_exposure_estimate?.toString() ?? ""}
            onChange={(v) => updateField({ factory_exposure_estimate: v === "" ? null : Number(v) })}
            onBlur={saveNow}
            type="number"
          />
        </Field>

        <Field label={t("connectors.field.linkedin")}>
          <TextInput
            value={connector.linkedin ?? ""}
            onChange={(v) => updateField({ linkedin: v })}
            onBlur={saveNow}
          />
        </Field>

        <Field label={t("connectors.field.warmIntro")} hint={connector.warm_intro === null ? t("connectors.notSure") : undefined}>
          <BooleanChips
            value={connector.warm_intro}
            onChange={(v) => {
              updateField({ warm_intro: v });
              saveNow();
            }}
          />
        </Field>

        <Field label={t("connectors.field.interviewed")} hint={connector.interviewed === null ? t("connectors.notSure") : undefined}>
          <BooleanChips
            value={connector.interviewed}
            onChange={(v) => {
              updateField({ interviewed: v });
              saveNow();
            }}
          />
        </Field>

        <Field label={t("connectors.field.canIntroduceCustomers")}>
          <RatingCircles
            value={connector.can_introduce_customers}
            onChange={(v) => {
              updateField({ can_introduce_customers: v });
              saveNow();
            }}
          />
        </Field>

        <Field label={t("connectors.field.potentialAdvisor")}>
          <RatingCircles
            value={connector.potential_advisor}
            onChange={(v) => {
              updateField({ potential_advisor: v });
              saveNow();
            }}
          />
        </Field>

        <Field label={t("connectors.field.notes")}>
          <AutoTextarea value={connector.notes ?? ""} onChange={(v) => updateField({ notes: v })} onBlur={saveNow} />
        </Field>
      </main>
    </div>
  );
}
