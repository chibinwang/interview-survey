"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const { t } = useLocale();
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-3 bg-gray-50 px-4 text-center">
      <p className="text-lg font-bold text-gray-900">{t("error.title")}</p>
      <p className="text-sm text-gray-500">{t("error.body")}</p>
      <button
        type="button"
        onClick={() => reset()}
        className="tap-target mt-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white"
      >
        {t("error.retry")}
      </button>
    </div>
  );
}
