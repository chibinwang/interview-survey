"use client";

import { SECTIONS, type SectionId } from "@/components/visit/sections";
import { useVisit } from "@/components/visit/VisitAutosaveProvider";
import { useLocale } from "@/lib/i18n/LocaleProvider";

export function TabBar({
  active,
  onChange,
}: {
  active: SectionId;
  onChange: (id: SectionId) => void;
}) {
  const { visit } = useVisit();
  const { t } = useLocale();

  return (
    <div className="no-print sticky top-0 z-20 overflow-x-auto border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="flex min-w-max gap-1 px-2 py-1.5">
        {SECTIONS.map((s) => {
          const done = s.isComplete(visit);
          const isActive = s.id === active;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => onChange(s.id)}
              className={`tap-target flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-brand-600 text-white"
                  : "text-gray-600 active:bg-gray-100"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  done ? (isActive ? "bg-white" : "bg-emerald-500") : "bg-gray-300"
                }`}
              />
              {t(s.labelKey)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
