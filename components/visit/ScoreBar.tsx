"use client";

import { useVisit, type SaveStatus } from "@/components/visit/VisitAutosaveProvider";
import { SaveIndicator } from "@/components/ui/SaveIndicator";
import { ScoreBadge } from "@/components/badges/ScoreBadge";
import { useLocale } from "@/lib/i18n/LocaleProvider";

export function ScoreBar({ saveStatus, onRetry }: { saveStatus: SaveStatus; onRetry: () => void }) {
  const { visit } = useVisit();
  const { t } = useLocale();

  return (
    <div className="no-print flex items-center justify-between gap-3 border-b border-gray-200 bg-white px-3 py-1.5">
      <div className="flex items-center gap-2 truncate">
        <span className="truncate text-sm font-semibold text-gray-800">
          {visit.company_name || t("visitEditor.unnamed")}
        </span>
        <ScoreBadge score={visit.score_total} />
      </div>
      <SaveIndicator status={saveStatus} onRetry={onRetry} />
    </div>
  );
}
