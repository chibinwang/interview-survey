"use client";

import { icpTier, tierLabel } from "@/lib/enums";
import { useLocale } from "@/lib/i18n/LocaleProvider";

const COLORS: Record<string, string> = {
  emerald: "bg-emerald-100 text-emerald-700",
  blue: "bg-blue-100 text-blue-700",
  amber: "bg-amber-100 text-amber-700",
  gray: "bg-gray-100 text-gray-600",
};

export function ScoreBadge({ score, showLabel = true }: { score: number; showLabel?: boolean }) {
  const { locale } = useLocale();
  const tier = icpTier(score);
  const cls = COLORS[tier.color] ?? COLORS.gray;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ${cls}`}>
      <span className="font-semibold">{score}</span>
      {showLabel && <span>{tierLabel(tier, locale)}</span>}
    </span>
  );
}
