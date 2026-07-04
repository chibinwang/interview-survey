import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { NON_FACTORY_VISIT_TYPES, optionLabel } from "@/lib/enums";
import { getServerLocale } from "@/lib/i18n/server";
import { translate } from "@/lib/i18n/dictionary";
import { LanguageToggle } from "@/components/ui/LanguageToggle";

export const dynamic = "force-dynamic";

export default async function TemplatesPage() {
  const supabase = await createClient();
  const locale = await getServerLocale();
  const t = (key: Parameters<typeof translate>[0]) => translate(key, locale);

  const { data: templates } = await supabase.from("templates").select("id, visit_type");

  const templateIdByType = new Map((templates ?? []).map((t) => [t.visit_type, t.id]));

  let countByTemplateId = new Map<string, number>();
  if (templates && templates.length > 0) {
    const { data: questions } = await supabase
      .from("template_questions")
      .select("template_id")
      .in(
        "template_id",
        templates.map((t) => t.id)
      );
    countByTemplateId = new Map();
    for (const q of questions ?? []) {
      countByTemplateId.set(q.template_id, (countByTemplateId.get(q.template_id) ?? 0) + 1);
    }
  }

  return (
    <div className="min-h-dvh bg-gray-50 pb-24">
      <header className="sticky top-0 z-10 flex items-center justify-between gap-2 border-b border-gray-200 bg-white px-3 py-2">
        <div className="flex items-center gap-2">
          <Link href="/" className="tap-target rounded-lg px-2 py-1.5 text-sm text-gray-500 active:bg-gray-100">
            {t("common.backToList")}
          </Link>
          <h1 className="text-base font-bold text-gray-900">{t("templates.title")}</h1>
        </div>
        <LanguageToggle />
      </header>

      <main className="mx-auto max-w-2xl space-y-2 p-3">
        <p className="text-sm text-gray-500">{t("templates.intro")}</p>

        <ul className="space-y-2">
          {NON_FACTORY_VISIT_TYPES.map((opt) => {
            const templateId = templateIdByType.get(opt.value);
            const count = templateId ? countByTemplateId.get(templateId) ?? 0 : 0;
            return (
              <li key={opt.value}>
                <Link
                  href={`/templates/${opt.value}`}
                  className="flex items-center justify-between rounded-2xl bg-white p-3 shadow-sm active:bg-gray-50"
                >
                  <span className="font-semibold text-gray-900">{optionLabel(opt, locale)}</span>
                  <span className="text-sm text-gray-400">
                    {count > 0 ? `${count} ${t("templates.questionCount")}` : t("templates.notSetUp")}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}
