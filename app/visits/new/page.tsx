import Link from "next/link";
import { VISIT_TYPES, optionLabel } from "@/lib/enums";
import { getServerLocale } from "@/lib/i18n/server";
import { translate } from "@/lib/i18n/dictionary";

export const dynamic = "force-dynamic";

export default async function NewVisitTypePicker() {
  const locale = await getServerLocale();
  const t = (key: Parameters<typeof translate>[0]) => translate(key, locale);

  return (
    <div className="flex min-h-dvh flex-col bg-gray-50">
      <header className="flex items-center gap-2 border-b border-gray-200 bg-white px-4 py-2.5">
        <Link href="/" className="tap-target rounded-lg px-2 py-1.5 text-sm text-gray-500 active:bg-gray-100">
          {t("common.backToList")}
        </Link>
        <h1 className="text-base font-bold text-gray-900">{t("newVisit.heading")}</h1>
      </header>

      <main className="mx-auto w-full max-w-2xl space-y-2 p-3">
        {VISIT_TYPES.map((opt) => (
          <Link
            key={opt.value}
            href={`/visits/new/${opt.value}`}
            className="tap-target block rounded-2xl bg-white p-3 text-center text-base font-semibold text-gray-900 shadow-sm active:bg-gray-50"
          >
            {optionLabel(opt, locale)}
          </Link>
        ))}

        <Link
          href="/templates"
          className="tap-target block rounded-2xl border-2 border-dashed border-gray-300 p-2.5 text-center text-sm text-gray-500 active:bg-gray-100"
        >
          {t("newVisit.manageTemplates")}
        </Link>
      </main>
    </div>
  );
}
