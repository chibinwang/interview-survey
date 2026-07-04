"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";

export function LanguageToggle() {
  const { locale, setLocale } = useLocale();

  return (
    <div className="flex shrink-0 rounded-lg border border-gray-200 p-0.5 text-xs font-medium">
      <button
        type="button"
        onClick={() => setLocale("zh")}
        className={`rounded-md px-2 py-1 ${locale === "zh" ? "bg-brand-600 text-white" : "text-gray-500"}`}
      >
        中文
      </button>
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={`rounded-md px-2 py-1 ${locale === "en" ? "bg-brand-600 text-white" : "text-gray-500"}`}
      >
        EN
      </button>
    </div>
  );
}
