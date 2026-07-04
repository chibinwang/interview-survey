"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { QUESTION_FIELD_TYPES, VISIT_TYPES, labelOf, optionLabel } from "@/lib/enums";
import { ChipSingleSelect } from "@/components/ui/ChipGroup";
import { NumberStepper } from "@/components/ui/NumberStepper";
import { TextInput } from "@/components/ui/TextInput";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import type { TemplateQuestion } from "@/lib/types";

type FormState = {
  label: string;
  labelEn: string;
  field_type: TemplateQuestion["field_type"];
  optionsText: string;
  optionsTextEn: string;
  max_rating: number;
};

const BLANK_FORM: FormState = {
  label: "",
  labelEn: "",
  field_type: "text",
  optionsText: "",
  optionsTextEn: "",
  max_rating: 5,
};

function splitOptions(s: string) {
  return s
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
}

function questionToForm(q: TemplateQuestion): FormState {
  return {
    label: q.label,
    labelEn: q.label_en ?? "",
    field_type: q.field_type,
    optionsText: (q.options ?? []).map((o) => o.label_zh).join(", "),
    optionsTextEn: (q.options ?? []).map((o) => o.label_en).join(", "),
    max_rating: q.max_rating,
  };
}

function formToPayload(form: FormState) {
  const zhOptions = splitOptions(form.optionsText);
  const enOptions = splitOptions(form.optionsTextEn);
  return {
    label: form.label.trim(),
    label_en: form.labelEn.trim() || null,
    field_type: form.field_type,
    options:
      form.field_type === "checklist"
        ? zhOptions.map((label_zh, i) => ({ value: label_zh, label_zh, label_en: enOptions[i] || label_zh }))
        : null,
    max_rating: form.field_type === "rating" ? form.max_rating : 5,
  };
}

export function TemplateEditorClient({
  templateId,
  visitType,
  initialQuestions,
}: {
  templateId: string;
  visitType: string;
  initialQuestions: TemplateQuestion[];
}) {
  const supabase = createClient();
  const { t, locale } = useLocale();
  const [questions, setQuestions] = useState<TemplateQuestion[]>(initialQuestions);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<FormState>(BLANK_FORM);
  const [adding, setAdding] = useState(false);
  const [addForm, setAddForm] = useState<FormState>(BLANK_FORM);
  const [busy, setBusy] = useState(false);

  async function handleAdd() {
    if (!addForm.label.trim()) return;
    setBusy(true);
    const nextPosition = questions.length > 0 ? Math.max(...questions.map((q) => q.position)) + 1 : 0;
    const { data, error } = await supabase
      .from("template_questions")
      .insert({
        template_id: templateId,
        user_id: (await supabase.auth.getUser()).data.user?.id,
        position: nextPosition,
        ...formToPayload(addForm),
      })
      .select("*")
      .single();
    setBusy(false);
    if (!error && data) {
      setQuestions((prev) => [...prev, data as TemplateQuestion]);
      setAddForm(BLANK_FORM);
      setAdding(false);
    }
  }

  async function handleSaveEdit(id: string) {
    setBusy(true);
    const { data, error } = await supabase
      .from("template_questions")
      .update(formToPayload(editForm))
      .eq("id", id)
      .select("*")
      .single();
    setBusy(false);
    if (!error && data) {
      setQuestions((prev) => prev.map((q) => (q.id === id ? (data as TemplateQuestion) : q)));
      setEditingId(null);
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm(t("templates.confirmDelete"))) return;
    setBusy(true);
    const { error } = await supabase.from("template_questions").delete().eq("id", id);
    setBusy(false);
    if (!error) {
      setQuestions((prev) => prev.filter((q) => q.id !== id));
    }
  }

  async function handleMove(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= questions.length) return;
    const a = questions[index];
    const b = questions[target];
    setBusy(true);
    await Promise.all([
      supabase.from("template_questions").update({ position: b.position }).eq("id", a.id),
      supabase.from("template_questions").update({ position: a.position }).eq("id", b.id),
    ]);
    setBusy(false);
    const next = [...questions];
    next[index] = { ...b, position: a.position };
    next[target] = { ...a, position: b.position };
    setQuestions(next);
  }

  function QuestionForm({
    form,
    setForm,
    onSave,
    onCancel,
    saveLabel,
  }: {
    form: FormState;
    setForm: (f: FormState) => void;
    onSave: () => void;
    onCancel: () => void;
    saveLabel: string;
  }) {
    return (
      <div className="space-y-3 rounded-xl border border-brand-200 bg-brand-50 p-3">
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-gray-700">{t("templates.questionLabelZh")}</label>
          <TextInput
            value={form.label}
            onChange={(v) => setForm({ ...form, label: v })}
            placeholder={t("templates.questionLabelZhPlaceholder")}
          />
        </div>
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-gray-700">{t("templates.questionLabelEn")}</label>
          <TextInput
            value={form.labelEn}
            onChange={(v) => setForm({ ...form, labelEn: v })}
            placeholder={t("templates.questionLabelEnPlaceholder")}
          />
        </div>
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-gray-700">{t("templates.fieldType")}</label>
          <ChipSingleSelect
            options={QUESTION_FIELD_TYPES}
            value={form.field_type}
            clearable={false}
            onChange={(v) => setForm({ ...form, field_type: (v ?? "text") as FormState["field_type"] })}
          />
        </div>
        {form.field_type === "checklist" && (
          <>
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-700">{t("templates.options")}</label>
              <TextInput
                value={form.optionsText}
                onChange={(v) => setForm({ ...form, optionsText: v })}
                placeholder={t("templates.optionsPlaceholder")}
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-700">
                {t("templates.options")} (EN, optional)
              </label>
              <TextInput value={form.optionsTextEn} onChange={(v) => setForm({ ...form, optionsTextEn: v })} />
            </div>
          </>
        )}
        {form.field_type === "rating" && (
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">{t("templates.maxRating")}</label>
            <NumberStepper value={form.max_rating} min={1} max={10} onChange={(v) => setForm({ ...form, max_rating: v })} />
          </div>
        )}
        <div className="flex gap-2">
          <button
            type="button"
            disabled={busy || !form.label.trim()}
            onClick={onSave}
            className="tap-target rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-40"
          >
            {saveLabel}
          </button>
          <button type="button" onClick={onCancel} className="tap-target rounded-lg px-4 py-2 text-sm text-gray-500">
            {t("common.cancel")}
          </button>
        </div>
      </div>
    );
  }

  const typeLabel = labelOf(VISIT_TYPES, visitType, locale);

  return (
    <div className="min-h-dvh bg-gray-50 pb-24">
      <header className="sticky top-0 z-10 flex items-center justify-between gap-2 border-b border-gray-200 bg-white px-3 py-2">
        <div className="flex min-w-0 items-center gap-2">
          <Link href="/templates" className="tap-target shrink-0 rounded-lg px-2 py-1.5 text-sm text-gray-500 active:bg-gray-100">
            {t("common.back")}
          </Link>
          <h1 className="truncate text-base font-bold text-gray-900">
            {typeLabel}｜{t("tab.genericQuestions")}
          </h1>
        </div>
        <LanguageToggle />
      </header>

      <main className="mx-auto max-w-2xl space-y-2 p-3">
        {questions.length === 0 && !adding && (
          <p className="rounded-2xl bg-white p-6 text-center text-sm text-gray-400 shadow-sm">{t("templates.empty")}</p>
        )}

        <ul className="space-y-2">
          {questions.map((q, i) =>
            editingId === q.id ? (
              <li key={q.id}>
                <QuestionForm
                  form={editForm}
                  setForm={setEditForm}
                  onSave={() => handleSaveEdit(q.id)}
                  onCancel={() => setEditingId(null)}
                  saveLabel={t("common.save")}
                />
              </li>
            ) : (
              <li key={q.id} className="rounded-2xl bg-white p-3 shadow-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-medium text-gray-900">{locale === "en" ? q.label_en || q.label : q.label}</p>
                    <p className="mt-0.5 text-xs text-gray-400">
                      {labelOf(QUESTION_FIELD_TYPES, q.field_type, locale)}
                      {q.field_type === "checklist" &&
                        q.options &&
                        `｜${q.options.map((o) => optionLabel(o, locale)).join("、")}`}
                      {q.field_type === "rating" && `｜1–${q.max_rating}`}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-1">
                    <button
                      type="button"
                      disabled={i === 0 || busy}
                      onClick={() => handleMove(i, -1)}
                      className="tap-target flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 disabled:opacity-20"
                      aria-label={t("templates.moveUp")}
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      disabled={i === questions.length - 1 || busy}
                      onClick={() => handleMove(i, 1)}
                      className="tap-target flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 disabled:opacity-20"
                      aria-label={t("templates.moveDown")}
                    >
                      ↓
                    </button>
                  </div>
                </div>
                <div className="mt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(q.id);
                      setEditForm(questionToForm(q));
                    }}
                    className="tap-target text-sm text-brand-600"
                  >
                    {t("common.edit")}
                  </button>
                  <button type="button" onClick={() => handleDelete(q.id)} className="tap-target text-sm text-rose-600">
                    {t("common.delete")}
                  </button>
                </div>
              </li>
            )
          )}
        </ul>

        {adding ? (
          <QuestionForm
            form={addForm}
            setForm={setAddForm}
            onSave={handleAdd}
            onCancel={() => {
              setAdding(false);
              setAddForm(BLANK_FORM);
            }}
            saveLabel={t("common.add")}
          />
        ) : (
          <button
            type="button"
            onClick={() => setAdding(true)}
            className="tap-target w-full rounded-2xl border-2 border-dashed border-gray-300 py-2.5 text-sm font-medium text-gray-500 active:bg-gray-100"
          >
            {t("templates.addQuestion")}
          </button>
        )}
      </main>
    </div>
  );
}
