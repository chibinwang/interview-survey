"use client";

import { useVisit } from "@/components/visit/VisitAutosaveProvider";
import { Field } from "@/components/ui/Field";
import { TextInput } from "@/components/ui/TextInput";
import { AutoTextarea } from "@/components/ui/AutoTextarea";
import { ChipMultiSelect } from "@/components/ui/ChipGroup";
import { BooleanChips } from "@/components/ui/BooleanChips";
import { DEMO_FEATURES_SHOWN } from "@/lib/enums";
import { useLocale } from "@/lib/i18n/LocaleProvider";

export function Section8Demo() {
  const { visit, updateField, saveNow } = useVisit();
  const { t } = useLocale();

  return (
    <div className="space-y-3">
      <Field label={t("field.demoFeaturesShown")}>
        <ChipMultiSelect
          options={DEMO_FEATURES_SHOWN}
          value={visit.demo_features_shown}
          onChange={(v) => {
            updateField({ demo_features_shown: v });
            saveNow();
          }}
        />
        {visit.demo_features_shown.includes("other") && (
          <TextInput
            value={visit.demo_features_other ?? ""}
            onChange={(v) => updateField({ demo_features_other: v })}
            onBlur={saveNow}
            placeholder={t("field.demoFeaturesOtherPlaceholder")}
          />
        )}
      </Field>

      <Field label={t("field.demoBestMoment")}>
        <AutoTextarea
          value={visit.demo_best_moment ?? ""}
          onChange={(v) => updateField({ demo_best_moment: v })}
          onBlur={saveNow}
        />
      </Field>

      <Field label={t("field.demoConfusionPoints")}>
        <AutoTextarea
          value={visit.demo_confusion_points ?? ""}
          onChange={(v) => updateField({ demo_confusion_points: v })}
          onBlur={saveNow}
        />
      </Field>

      <Field label={t("field.demoObjections")}>
        <AutoTextarea
          value={visit.demo_objections ?? ""}
          onChange={(v) => updateField({ demo_objections: v })}
          onBlur={saveNow}
        />
      </Field>

      <Field label={t("field.demoQuestionsAsked")}>
        <AutoTextarea
          value={visit.demo_questions_asked ?? ""}
          onChange={(v) => updateField({ demo_questions_asked: v })}
          onBlur={saveNow}
        />
      </Field>

      <Field label={t("field.demoFeaturesLiked")}>
        <AutoTextarea
          value={visit.demo_features_liked ?? ""}
          onChange={(v) => updateField({ demo_features_liked: v })}
          onBlur={saveNow}
        />
      </Field>

      <Field label={t("field.demoFeaturesNotNeeded")}>
        <AutoTextarea
          value={visit.demo_features_not_needed ?? ""}
          onChange={(v) => updateField({ demo_features_not_needed: v })}
          onBlur={saveNow}
        />
      </Field>

      <Field label={t("field.demoNextStep")}>
        <TextInput
          value={visit.demo_next_step ?? ""}
          onChange={(v) => updateField({ demo_next_step: v })}
          onBlur={saveNow}
        />
      </Field>

      <Field label={t("field.needsCustomization")}>
        <BooleanChips
          value={visit.needs_customization}
          onChange={(v) => {
            updateField({ needs_customization: v });
            saveNow();
          }}
        />
        {visit.needs_customization && (
          <AutoTextarea
            value={visit.customization_description ?? ""}
            onChange={(v) => updateField({ customization_description: v })}
            onBlur={saveNow}
            placeholder={t("field.customizationDescPlaceholder")}
          />
        )}
      </Field>
    </div>
  );
}
