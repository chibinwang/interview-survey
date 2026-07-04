"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { VisitAutosaveProvider, useVisit } from "@/components/visit/VisitAutosaveProvider";
import { SaveIndicator } from "@/components/ui/SaveIndicator";
import { Field } from "@/components/ui/Field";
import { TextInput } from "@/components/ui/TextInput";
import { DateInput } from "@/components/ui/DateInput";
import { AutoTextarea } from "@/components/ui/AutoTextarea";
import { DynamicQuestionField } from "@/components/visit/DynamicQuestionField";
import { labelOf, VISIT_TYPES } from "@/lib/enums";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import type { DictKey } from "@/lib/i18n/dictionary";
import type { Visit, TemplateQuestion } from "@/lib/types";

const TABS = ["basics", "questions", "followup"] as const;
type Tab = (typeof TABS)[number];
const TAB_KEYS: Record<Tab, DictKey> = {
  basics: "tab.basics",
  questions: "tab.genericQuestions",
  followup: "tab.followup",
};

export function GenericVisitEditor({
  initialVisit,
  questions,
}: {
  initialVisit: Visit;
  questions: TemplateQuestion[];
}) {
  return (
    <VisitAutosaveProvider initialVisit={initialVisit}>
      <GenericVisitEditorInner questions={questions} />
    </VisitAutosaveProvider>
  );
}

function GenericVisitEditorInner({ questions }: { questions: TemplateQuestion[] }) {
  const { visit, updateField, saveNow, saveStatus } = useVisit();
  const { t, locale } = useLocale();
  const [active, setActive] = useState<Tab>("basics");
  const router = useRouter();
  const activeIndex = TABS.indexOf(active);

  function setAnswer(questionId: string, value: string | string[] | number | null) {
    updateField({ custom_answers: { ...visit.custom_answers, [questionId]: value } });
  }

  function handleDone() {
    saveNow();
    router.push("/");
  }

  return (
    <div className="min-h-dvh bg-gray-50 pb-24">
      <div className="no-print flex items-center justify-between border-b border-gray-200 bg-white px-3 py-1.5">
        <Link href="/" className="tap-target rounded-lg px-2 py-1.5 text-sm text-gray-500 active:bg-gray-100">
          {t("common.backToList")}
        </Link>
        <div className="flex items-center gap-1">
          <LanguageToggle />
          <Link
            href={`/visits/${visit.id}/print`}
            className="tap-target rounded-lg px-2 py-1.5 text-sm text-brand-600 active:bg-gray-100"
          >
            {t("common.print")}
          </Link>
        </div>
      </div>

      <div className="no-print flex items-center justify-between gap-3 border-b border-gray-200 bg-white px-3 py-1.5">
        <div className="min-w-0">
          <span className="truncate font-semibold text-gray-800">{visit.company_name || t("generic.unnamed")}</span>
          <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
            {labelOf(VISIT_TYPES, visit.visit_type, locale)}
          </span>
        </div>
        <SaveIndicator status={saveStatus} onRetry={saveNow} />
      </div>

      <div className="no-print sticky top-0 z-20 flex border-b border-gray-200 bg-white/95 px-2 py-1.5 backdrop-blur">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActive(tab)}
            className={`tap-target flex-1 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
              active === tab ? "bg-brand-600 text-white" : "text-gray-600 active:bg-gray-100"
            }`}
          >
            {t(TAB_KEYS[tab])}
          </button>
        ))}
      </div>

      <main className="mx-auto max-w-2xl p-3">
        <h2 className="mb-3 text-lg font-bold text-gray-900">{t(TAB_KEYS[active])}</h2>

        {active === "basics" && (
          <div className="space-y-3">
            <Field label={visit.visit_type === "custom" ? t("generic.customTopicLabel") : t("generic.objectName")}>
              <TextInput
                value={visit.company_name}
                onChange={(v) => updateField({ company_name: v })}
                onBlur={saveNow}
                placeholder={
                  visit.visit_type === "custom" ? t("generic.customTopicPlaceholder") : t("generic.objectNamePlaceholder")
                }
              />
            </Field>
            <Field label={t("generic.date")}>
              <DateInput value={visit.visit_date} onChange={(v) => updateField({ visit_date: v })} onBlur={saveNow} />
            </Field>
            <Field label={t("field.location")}>
              <TextInput value={visit.location ?? ""} onChange={(v) => updateField({ location: v })} onBlur={saveNow} />
            </Field>
            <Field label={t("generic.contactName")}>
              <TextInput
                value={visit.interviewee_name ?? ""}
                onChange={(v) => updateField({ interviewee_name: v })}
                onBlur={saveNow}
              />
            </Field>
            <Field label={t("generic.contactMethod")}>
              <TextInput
                value={visit.interviewee_contact ?? ""}
                onChange={(v) => updateField({ interviewee_contact: v })}
                onBlur={saveNow}
              />
            </Field>
            <Field label={t("generic.notes")}>
              <AutoTextarea
                value={visit.first_impression_notes ?? ""}
                onChange={(v) => updateField({ first_impression_notes: v })}
                onBlur={saveNow}
              />
            </Field>
          </div>
        )}

        {active === "questions" && (
          <div className="space-y-3">
            {questions.length === 0 ? (
              <div className="rounded-2xl bg-white p-6 text-center text-sm text-gray-400 shadow-sm">
                {t("generic.noQuestionsYet")}
                <br />
                <Link href={`/templates/${visit.visit_type}`} className="text-brand-600 underline">
                  {t("generic.goSetupQuestions")}
                </Link>
              </div>
            ) : (
              questions.map((q) => (
                <DynamicQuestionField
                  key={q.id}
                  question={q}
                  value={visit.custom_answers?.[q.id]}
                  onChange={(v) => setAnswer(q.id, v)}
                  onBlur={saveNow}
                />
              ))
            )}
          </div>
        )}

        {active === "followup" && (
          <div className="space-y-3">
            <Field label={t("field.followupDate")}>
              <DateInput value={visit.followup_date} onChange={(v) => updateField({ followup_date: v })} onBlur={saveNow} />
            </Field>
            <Field label={t("generic.nextStepAction")}>
              <AutoTextarea
                value={visit.content_to_send ?? ""}
                onChange={(v) => updateField({ content_to_send: v })}
                onBlur={saveNow}
              />
            </Field>
            <Field label={t("field.internalNotes")}>
              <AutoTextarea
                value={visit.internal_notes ?? ""}
                onChange={(v) => updateField({ internal_notes: v })}
                onBlur={saveNow}
              />
            </Field>
          </div>
        )}
      </main>

      <div className="no-print fixed inset-x-0 bottom-0 flex items-center justify-between border-t border-gray-200 bg-white px-3 py-2.5">
        <button
          type="button"
          disabled={activeIndex === 0}
          onClick={() => setActive(TABS[activeIndex - 1])}
          className="tap-target rounded-lg px-4 py-2 text-sm font-medium text-gray-600 disabled:opacity-30"
        >
          {t("common.prev")}
        </button>
        <span className="text-xs text-gray-400">
          {activeIndex + 1} / {TABS.length}
        </span>
        {activeIndex === TABS.length - 1 ? (
          <button
            type="button"
            onClick={handleDone}
            className="tap-target rounded-lg bg-brand-600 px-5 py-2 text-sm font-semibold text-white active:bg-brand-700"
          >
            {t("common.done")}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setActive(TABS[activeIndex + 1])}
            className="tap-target rounded-lg px-4 py-2 text-sm font-medium text-brand-600"
          >
            {t("common.next")}
          </button>
        )}
      </div>
    </div>
  );
}
