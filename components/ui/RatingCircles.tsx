"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";

export function RatingCircles({
  value,
  onChange,
  max = 5,
}: {
  value: number | null;
  onChange: (v: number | null) => void;
  max?: number;
}) {
  const { locale } = useLocale();

  return (
    <div className="flex flex-wrap gap-1.5">
      {Array.from({ length: max }, (_, i) => i + 1).map((n) => {
        const active = value !== null && n <= value;
        return (
          <button
            key={n}
            type="button"
            aria-label={locale === "en" ? `${n} points` : `${n} 分`}
            aria-pressed={value === n}
            onClick={() => onChange(value === n ? null : n)}
            className={`tap-target flex h-10 w-10 items-center justify-center rounded-full border-2 text-base font-semibold transition-colors ${
              active
                ? "border-brand-600 bg-brand-600 text-white"
                : "border-gray-300 bg-white text-gray-400 active:bg-gray-100"
            }`}
          >
            {n}
          </button>
        );
      })}
    </div>
  );
}
