"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";

export function PrintButton() {
  const { t } = useLocale();
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="tap-target rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white active:bg-brand-700"
    >
      {t("print.saveAsPdf")}
    </button>
  );
}
