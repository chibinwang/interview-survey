import Link from "next/link";
import type { Visit, TemplateQuestion } from "@/lib/types";
import { PrintButton } from "@/components/visit/print/PrintButton";
import { PrintSection, PrintRow, PrintChecklist, PrintRating } from "@/components/visit/print/PrintPrimitives";
import { VISIT_TYPES, labelOf } from "@/lib/enums";
import type { Locale } from "@/lib/i18n/dictionary";
import { translate } from "@/lib/i18n/dictionary";

export function GenericPrintView({ v, questions, locale }: { v: Visit; questions: TemplateQuestion[]; locale: Locale }) {
  const t = (key: Parameters<typeof translate>[0]) => translate(key, locale);

  return (
    <div className="mx-auto max-w-3xl bg-white p-6 print:p-0">
      <div className="no-print mb-4 flex items-center justify-between">
        <Link href={`/visits/${v.id}`} className="tap-target rounded-lg px-2 py-1.5 text-sm text-gray-500">
          {t("print.backToEdit")}
        </Link>
        <PrintButton />
      </div>

      <header className="mb-2 border-b-2 border-gray-900 pb-3">
        <h1 className="text-xl font-bold text-gray-900">{v.company_name || t("generic.unnamed")}</h1>
        <p className="mt-1 text-sm text-gray-500">
          {labelOf(VISIT_TYPES, v.visit_type, locale)} ・ {t("print.date")}
          {v.visit_date ?? "—"}
        </p>
      </header>

      <PrintSection title={t("print.section.genericBasics")}>
        <PrintRow label={t("field.location")} value={v.location} locale={locale} />
        <PrintRow label={t("generic.contactName")} value={v.interviewee_name} locale={locale} />
        <PrintRow label={t("generic.contactMethod")} value={v.interviewee_contact} locale={locale} />
        <PrintRow label={t("generic.notes")} value={v.first_impression_notes} locale={locale} />
      </PrintSection>

      <PrintSection title={t("print.section.genericQuestions")}>
        {questions.length === 0 ? (
          <p className="text-gray-400">{t("print.noQuestions")}</p>
        ) : (
          questions.map((q) => {
            const answer = v.custom_answers?.[q.id];
            const label = locale === "en" ? q.label_en || q.label : q.label;
            if (q.field_type === "checklist") {
              return (
                <PrintChecklist
                  key={q.id}
                  label={label}
                  options={q.options ?? []}
                  selected={(answer as string[]) ?? []}
                  locale={locale}
                />
              );
            }
            if (q.field_type === "rating") {
              return <PrintRating key={q.id} label={label} value={(answer as number) ?? null} max={q.max_rating} />;
            }
            return <PrintRow key={q.id} label={label} value={(answer as string) ?? undefined} locale={locale} />;
          })
        )}
      </PrintSection>

      <PrintSection title={t("print.section.genericFollowup")}>
        <PrintRow label={t("field.followupDate")} value={v.followup_date} locale={locale} />
        <PrintRow label={t("generic.nextStepAction")} value={v.content_to_send} locale={locale} />
        <PrintRow label={t("field.internalNotes")} value={v.internal_notes} locale={locale} />
      </PrintSection>
    </div>
  );
}
