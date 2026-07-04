"use client";

import type { EnumOption } from "@/lib/enums";
import { optionLabel } from "@/lib/enums";
import { useLocale } from "@/lib/i18n/LocaleProvider";

function chipClass(active: boolean) {
  return `tap-target rounded-full border px-3 py-1.5 text-sm transition-colors ${
    active
      ? "border-brand-600 bg-brand-600 text-white"
      : "border-gray-300 bg-white text-gray-700 active:bg-gray-100"
  }`;
}

export function ChipMultiSelect({
  options,
  value,
  onChange,
}: {
  options: EnumOption[];
  value: string[];
  onChange: (v: string[]) => void;
}) {
  const { locale } = useLocale();

  function toggle(v: string) {
    onChange(value.includes(v) ? value.filter((x) => x !== v) : [...value, v]);
  }

  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          aria-pressed={value.includes(opt.value)}
          onClick={() => toggle(opt.value)}
          className={chipClass(value.includes(opt.value))}
        >
          {optionLabel(opt, locale)}
        </button>
      ))}
    </div>
  );
}

export function ChipSingleSelect({
  options,
  value,
  onChange,
  clearable = true,
}: {
  options: EnumOption[];
  value: string | null;
  onChange: (v: string | null) => void;
  clearable?: boolean;
}) {
  const { locale } = useLocale();

  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          aria-pressed={value === opt.value}
          onClick={() => onChange(clearable && value === opt.value ? null : opt.value)}
          className={chipClass(value === opt.value)}
        >
          {optionLabel(opt, locale)}
        </button>
      ))}
    </div>
  );
}
