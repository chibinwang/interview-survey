"use client";

import { Field } from "@/components/ui/Field";
import { TextInput } from "@/components/ui/TextInput";
import { AutoTextarea } from "@/components/ui/AutoTextarea";
import { ChipMultiSelect } from "@/components/ui/ChipGroup";
import { RatingCircles } from "@/components/ui/RatingCircles";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import type { TemplateQuestion } from "@/lib/types";

export function DynamicQuestionField({
  question,
  value,
  onChange,
  onBlur,
}: {
  question: TemplateQuestion;
  value: string | string[] | number | null | undefined;
  onChange: (v: string | string[] | number | null) => void;
  onBlur: () => void;
}) {
  const { locale } = useLocale();
  const label = locale === "en" ? question.label_en || question.label : question.label;

  return (
    <Field label={label}>
      {question.field_type === "text" && (
        <TextInput value={(value as string) ?? ""} onChange={(v) => onChange(v)} onBlur={onBlur} />
      )}
      {question.field_type === "textarea" && (
        <AutoTextarea value={(value as string) ?? ""} onChange={(v) => onChange(v)} onBlur={onBlur} />
      )}
      {question.field_type === "checklist" && (
        <ChipMultiSelect
          options={question.options ?? []}
          value={(value as string[]) ?? []}
          onChange={(v) => {
            onChange(v);
            onBlur();
          }}
        />
      )}
      {question.field_type === "rating" && (
        <RatingCircles
          value={(value as number) ?? null}
          max={question.max_rating}
          onChange={(v) => {
            onChange(v);
            onBlur();
          }}
        />
      )}
    </Field>
  );
}
