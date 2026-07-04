"use client";

import type { SaveStatus } from "@/components/visit/VisitAutosaveProvider";
import { useLocale } from "@/lib/i18n/LocaleProvider";

export function SaveIndicator({ status, onRetry }: { status: SaveStatus; onRetry: () => void }) {
  const { t } = useLocale();

  if (status === "saving") {
    return (
      <span className="flex items-center gap-1.5 text-xs text-gray-500">
        <span className="h-2 w-2 animate-pulse rounded-full bg-amber-400" />
        {t("save.saving")}
      </span>
    );
  }
  if (status === "error") {
    return (
      <button
        type="button"
        onClick={onRetry}
        className="flex items-center gap-1.5 text-xs font-medium text-rose-600 underline underline-offset-2"
      >
        <span className="h-2 w-2 rounded-full bg-rose-500" />
        {t("save.error")}
      </button>
    );
  }
  if (status === "saved") {
    return (
      <span className="flex items-center gap-1.5 text-xs text-emerald-600">
        <span className="h-2 w-2 rounded-full bg-emerald-500" />
        {t("save.saved")}
      </span>
    );
  }
  return (
    <span className="flex items-center gap-1.5 text-xs text-gray-400">
      <span className="h-2 w-2 rounded-full bg-gray-300" />
      {t("save.pending")}
    </span>
  );
}
