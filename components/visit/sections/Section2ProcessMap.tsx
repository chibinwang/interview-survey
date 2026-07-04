"use client";

import { useVisit } from "@/components/visit/VisitAutosaveProvider";
import { Field } from "@/components/ui/Field";
import { TextInput } from "@/components/ui/TextInput";
import { AutoTextarea } from "@/components/ui/AutoTextarea";
import { ChipSingleSelect } from "@/components/ui/ChipGroup";
import { BooleanChips } from "@/components/ui/BooleanChips";
import { AI_OPPORTUNITY, stageLabel } from "@/lib/enums";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import type { ProcessMapStage } from "@/lib/types";

export function Section2ProcessMap() {
  const { visit, updateField, saveNow } = useVisit();
  const { t, locale } = useLocale();

  function patchStage(index: number, patch: Partial<ProcessMapStage>) {
    const next = visit.process_map.map((s, i) => (i === index ? { ...s, ...patch } : s));
    updateField({ process_map: next });
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-500">{t("section.processMapHint")}</p>

      {visit.process_map.map((stage, i) => (
        <div key={stage.stage} className="space-y-2.5 rounded-2xl bg-white p-3 shadow-sm">
          <h3 className="text-base font-bold text-brand-700">
            {i + 1}. {stageLabel(stage.stage, locale)}
          </h3>

          <Field label={t("field.owner")}>
            <TextInput
              value={stage.owner}
              onChange={(v) => patchStage(i, { owner: v })}
              onBlur={saveNow}
            />
          </Field>

          <Field label={t("field.toolsUsed")}>
            <TextInput
              value={stage.tools_used}
              onChange={(v) => patchStage(i, { tools_used: v })}
              onBlur={saveNow}
            />
          </Field>

          <Field label={t("field.biggestPainPoint")}>
            <AutoTextarea
              value={stage.biggest_pain_point}
              onChange={(v) => patchStage(i, { biggest_pain_point: v })}
              onBlur={saveNow}
              rows={2}
            />
          </Field>

          <Field label={t("field.reliesOnManual")}>
            <BooleanChips
              value={stage.relies_on_manual_experience}
              onChange={(v) => {
                patchStage(i, { relies_on_manual_experience: v ?? false });
                saveNow();
              }}
            />
          </Field>

          <Field label={t("field.aiOpportunity")}>
            <ChipSingleSelect
              options={AI_OPPORTUNITY}
              value={stage.ai_opportunity}
              onChange={(v) => {
                patchStage(i, { ai_opportunity: v as ProcessMapStage["ai_opportunity"] });
                saveNow();
              }}
            />
          </Field>
        </div>
      ))}
    </div>
  );
}
