"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";

export function NumberStepper({
  value,
  onChange,
  min = 0,
  max = 10,
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
}) {
  const { locale } = useLocale();

  function clamp(n: number) {
    return Math.min(max, Math.max(min, n));
  }

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => onChange(clamp(value - 1))}
        className="tap-target flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 bg-white text-base font-semibold text-gray-600 active:bg-gray-100"
        aria-label={locale === "en" ? "Decrease" : "減少"}
      >
        −
      </button>
      <span className="w-8 text-center text-base font-semibold text-gray-900">{value}</span>
      <button
        type="button"
        onClick={() => onChange(clamp(value + 1))}
        className="tap-target flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 bg-white text-base font-semibold text-gray-600 active:bg-gray-100"
        aria-label={locale === "en" ? "Increase" : "增加"}
      >
        ＋
      </button>
      <span className="text-xs text-gray-400">
        ({min}–{max})
      </span>
    </div>
  );
}
