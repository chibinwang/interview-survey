import type { EnumOption } from "@/lib/enums";
import { optionLabel } from "@/lib/enums";
import type { Locale } from "@/lib/i18n/dictionary";
import { translate } from "@/lib/i18n/dictionary";

export function PrintSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="break-inside-avoid space-y-2 border-b border-gray-300 py-4">
      <h2 className="text-base font-bold text-gray-900">{title}</h2>
      <div className="space-y-2.5 text-sm text-gray-800">{children}</div>
    </section>
  );
}

export function PrintRow({
  label,
  value,
  locale = "zh",
}: {
  label: string;
  value?: React.ReactNode;
  locale?: Locale;
}) {
  return (
    <div className="flex flex-wrap gap-x-2 gap-y-0.5">
      <span className="min-w-[7rem] shrink-0 text-gray-500">{label}</span>
      <span className="flex-1 whitespace-pre-wrap break-words text-gray-900">
        {value || value === 0 ? value : <span className="text-gray-300">{translate("common.notFilled", locale)}</span>}
      </span>
    </div>
  );
}

export function PrintChecklist({
  label,
  options,
  selected,
  other,
  locale = "zh",
}: {
  label: string;
  options: EnumOption[];
  selected: string[] | string | null;
  other?: string | null;
  locale?: Locale;
}) {
  const selectedArr = Array.isArray(selected) ? selected : selected ? [selected] : [];
  return (
    <div className="space-y-1">
      <span className="text-gray-500">{label}</span>
      <div className="flex flex-wrap gap-x-3 gap-y-1">
        {options.map((opt) => (
          <span key={opt.value} className="whitespace-nowrap text-gray-900">
            {selectedArr.includes(opt.value) ? "☑" : "☐"} {optionLabel(opt, locale)}
          </span>
        ))}
      </div>
      {other && (
        <p className="text-xs text-gray-500">
          {locale === "en" ? "Other: " : "其他："}
          {other}
        </p>
      )}
    </div>
  );
}

export function PrintBoolean({
  label,
  value,
  locale = "zh",
}: {
  label: string;
  value: boolean | null;
  locale?: Locale;
}) {
  const yes = translate("common.yes", locale);
  const no = translate("common.no", locale);
  return (
    <div className="flex gap-3">
      <span className="min-w-[7rem] shrink-0 text-gray-500">{label}</span>
      <span className="text-gray-900">
        {value === true ? "☑" : "☐"} {yes}　{value === false ? "☑" : "☐"} {no}
      </span>
    </div>
  );
}

export function PrintRating({
  label,
  value,
  max = 5,
}: {
  label: string;
  value: number | null;
  max?: number;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="min-w-[7rem] shrink-0 text-gray-500">{label}</span>
      <span className="tracking-widest text-gray-900">
        {Array.from({ length: max }, (_, i) => i + 1)
          .map((n) => (value !== null && n <= value ? "●" : "○"))
          .join(" ")}
      </span>
      <span className="text-xs text-gray-400">
        {value ?? "—"}/{max}
      </span>
    </div>
  );
}
