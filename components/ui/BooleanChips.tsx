"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";

export function BooleanChips({
  value,
  onChange,
  yesLabel,
  noLabel,
}: {
  value: boolean | null;
  onChange: (v: boolean | null) => void;
  yesLabel?: string;
  noLabel?: string;
}) {
  const { t } = useLocale();
  const yes = yesLabel ?? t("common.yes");
  const no = noLabel ?? t("common.no");

  return (
    <div className="flex gap-1.5">
      <button
        type="button"
        aria-pressed={value === true}
        onClick={() => onChange(value === true ? null : true)}
        className={`tap-target rounded-full border px-4 py-1.5 text-sm transition-colors ${
          value === true
            ? "border-emerald-600 bg-emerald-600 text-white"
            : "border-gray-300 bg-white text-gray-700 active:bg-gray-100"
        }`}
      >
        {yes}
      </button>
      <button
        type="button"
        aria-pressed={value === false}
        onClick={() => onChange(value === false ? null : false)}
        className={`tap-target rounded-full border px-4 py-1.5 text-sm transition-colors ${
          value === false
            ? "border-rose-600 bg-rose-600 text-white"
            : "border-gray-300 bg-white text-gray-700 active:bg-gray-100"
        }`}
      >
        {no}
      </button>
    </div>
  );
}
