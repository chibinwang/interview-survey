"use client";

import { LEAD_STATUS, labelOf } from "@/lib/enums";
import { useLocale } from "@/lib/i18n/LocaleProvider";

const COLORS: Record<string, string> = {
  cold: "bg-gray-100 text-gray-600",
  neutral: "bg-slate-100 text-slate-600",
  interested: "bg-blue-100 text-blue-700",
  very_interested: "bg-violet-100 text-violet-700",
  ready_to_close: "bg-emerald-100 text-emerald-700",
};

export function LeadStatusBadge({ status }: { status: string | null }) {
  const { locale } = useLocale();
  if (!status) return null;
  const cls = COLORS[status] ?? "bg-gray-100 text-gray-600";
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${cls}`}>
      {labelOf(LEAD_STATUS, status, locale)}
    </span>
  );
}
