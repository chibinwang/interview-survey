"use client";

import { useVisit } from "@/components/visit/VisitAutosaveProvider";
import { Field } from "@/components/ui/Field";
import { TextInput } from "@/components/ui/TextInput";
import { RatingCircles } from "@/components/ui/RatingCircles";
import { ChipMultiSelect } from "@/components/ui/ChipGroup";
import { BooleanChips } from "@/components/ui/BooleanChips";
import { CONCERNS } from "@/lib/enums";
import { useLocale } from "@/lib/i18n/LocaleProvider";

export function Section6AiReadiness() {
  const { visit, updateField, saveNow } = useVisit();
  const { t } = useLocale();

  return (
    <div className="space-y-3">
      <Field label={t("field.decisionMaker")}>
        <TextInput
          value={visit.decision_maker ?? ""}
          onChange={(v) => updateField({ decision_maker: v })}
          onBlur={saveNow}
        />
      </Field>

      <Field label={t("field.likelyOpponent")}>
        <TextInput
          value={visit.likely_opponent ?? ""}
          onChange={(v) => updateField({ likely_opponent: v })}
          onBlur={saveNow}
        />
      </Field>

      <Field label={t("field.biggestBeneficiary")}>
        <TextInput
          value={visit.biggest_beneficiary ?? ""}
          onChange={(v) => updateField({ biggest_beneficiary: v })}
          onBlur={saveNow}
        />
      </Field>

      <Field label={t("field.currentlyUsesAiTools")}>
        <BooleanChips
          value={visit.currently_uses_ai_tools}
          onChange={(v) => {
            updateField({ currently_uses_ai_tools: v });
            saveNow();
          }}
        />
        {visit.currently_uses_ai_tools && (
          <TextInput
            value={visit.currently_uses_ai_tools_detail ?? ""}
            onChange={(v) => updateField({ currently_uses_ai_tools_detail: v })}
            onBlur={saveNow}
            placeholder={t("field.aiToolsDetailPlaceholder")}
          />
        )}
      </Field>

      <Field label={t("field.willingToShareData")}>
        <BooleanChips
          value={visit.willing_to_share_data}
          onChange={(v) => {
            updateField({ willing_to_share_data: v });
            saveNow();
          }}
        />
      </Field>

      <Field label={t("field.willingToDoPoc")}>
        <BooleanChips
          value={visit.willing_to_do_2wk_poc}
          onChange={(v) => {
            updateField({ willing_to_do_2wk_poc: v });
            saveNow();
          }}
        />
      </Field>

      <Field label={t("field.willingToPaySymbolic")}>
        <BooleanChips
          value={visit.willing_to_pay_symbolic_fee}
          onChange={(v) => {
            updateField({ willing_to_pay_symbolic_fee: v });
            saveNow();
          }}
        />
      </Field>

      <Field label={t("field.concerns")}>
        <ChipMultiSelect
          options={CONCERNS}
          value={visit.concerns}
          onChange={(v) => {
            updateField({ concerns: v });
            saveNow();
          }}
        />
        {visit.concerns.includes("other") && (
          <TextInput
            value={visit.concerns_other ?? ""}
            onChange={(v) => updateField({ concerns_other: v })}
            onBlur={saveNow}
            placeholder={t("field.concernsOtherPlaceholder")}
          />
        )}
      </Field>

      <Field label={t("field.adoptionThreshold")}>
        <TextInput
          value={visit.adoption_threshold ?? ""}
          onChange={(v) => updateField({ adoption_threshold: v })}
          onBlur={saveNow}
        />
      </Field>

      <Field label={t("field.dealFriction")}>
        <TextInput
          value={visit.deal_friction ?? ""}
          onChange={(v) => updateField({ deal_friction: v })}
          onBlur={saveNow}
        />
      </Field>

      <Field label={t("field.nextDecisionProcess")}>
        <TextInput
          value={visit.next_decision_process ?? ""}
          onChange={(v) => updateField({ next_decision_process: v })}
          onBlur={saveNow}
        />
      </Field>

      <Field label={t("field.aiAcceptanceScore")}>
        <RatingCircles
          value={visit.ai_acceptance_score}
          onChange={(v) => {
            updateField({ ai_acceptance_score: v });
            saveNow();
          }}
        />
      </Field>

      <Field label={t("field.decisionSpeedScore")}>
        <RatingCircles
          value={visit.decision_speed_score}
          onChange={(v) => {
            updateField({ decision_speed_score: v });
            saveNow();
          }}
        />
      </Field>

      <Field label={t("field.dataAvailabilityScore")}>
        <RatingCircles
          value={visit.data_availability_score}
          onChange={(v) => {
            updateField({ data_availability_score: v });
            saveNow();
          }}
        />
      </Field>

      <Field label={t("field.paymentLikelihoodScore")}>
        <RatingCircles
          value={visit.payment_likelihood_score}
          onChange={(v) => {
            updateField({ payment_likelihood_score: v });
            saveNow();
          }}
        />
      </Field>
    </div>
  );
}
