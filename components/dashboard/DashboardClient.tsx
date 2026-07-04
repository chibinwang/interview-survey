"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { LEAD_STATUS, ICP_TIERS, INDUSTRY_TYPE, VISIT_TYPES, icpTier, tierLabel, labelsOf, labelOf, optionLabel } from "@/lib/enums";
import { LeadStatusBadge } from "@/components/badges/LeadStatusBadge";
import { ScoreBadge } from "@/components/badges/ScoreBadge";
import { useLocale } from "@/lib/i18n/LocaleProvider";

export type DashboardVisit = {
  id: string;
  company_name: string;
  visit_date: string | null;
  lead_status: string;
  score_total: number;
  industry_type: string[];
  followup_date: string | null;
  visit_type: string;
};

type SortKey = "score_desc" | "score_asc" | "date_desc" | "date_asc";

export function DashboardClient({ visits }: { visits: DashboardVisit[] }) {
  const { locale, t } = useLocale();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [tierFilter, setTierFilter] = useState<number | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [sort, setSort] = useState<SortKey>("date_desc");

  const filtered = useMemo(() => {
    let list = visits;

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter((v) => v.company_name.toLowerCase().includes(q));
    }
    if (typeFilter) {
      list = list.filter((v) => v.visit_type === typeFilter);
    }
    if (statusFilter) {
      list = list.filter((v) => v.lead_status === statusFilter);
    }
    if (tierFilter !== null) {
      list = list.filter((v) => icpTier(v.score_total).min === tierFilter);
    }

    const sorted = [...list].sort((a, b) => {
      switch (sort) {
        case "score_desc":
          return b.score_total - a.score_total;
        case "score_asc":
          return a.score_total - b.score_total;
        case "date_asc":
          return (a.visit_date ?? "").localeCompare(b.visit_date ?? "");
        case "date_desc":
        default:
          return (b.visit_date ?? "").localeCompare(a.visit_date ?? "");
      }
    });

    return sorted;
  }, [visits, search, typeFilter, statusFilter, tierFilter, sort]);

  return (
    <div className="space-y-3">
      <div className="space-y-2 rounded-2xl bg-white p-3 shadow-sm">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t("dashboard.searchPlaceholder")}
          className="tap-target w-full rounded-lg border border-gray-300 px-3 py-1.5 text-base focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
        />

        <div className="flex flex-wrap gap-2">
          <select
            value={typeFilter ?? ""}
            onChange={(e) => setTypeFilter(e.target.value || null)}
            className="tap-target rounded-lg border border-gray-300 px-2 py-1.5 text-sm"
          >
            <option value="">{t("dashboard.allTypes")}</option>
            {VISIT_TYPES.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {optionLabel(opt, locale)}
              </option>
            ))}
          </select>

          <select
            value={statusFilter ?? ""}
            onChange={(e) => setStatusFilter(e.target.value || null)}
            className="tap-target rounded-lg border border-gray-300 px-2 py-1.5 text-sm"
          >
            <option value="">{t("dashboard.allStatuses")}</option>
            {LEAD_STATUS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {optionLabel(opt, locale)}
              </option>
            ))}
          </select>

          <select
            value={tierFilter ?? ""}
            onChange={(e) => setTierFilter(e.target.value ? Number(e.target.value) : null)}
            className="tap-target rounded-lg border border-gray-300 px-2 py-1.5 text-sm"
          >
            <option value="">{t("dashboard.allTiers")}</option>
            {ICP_TIERS.map((tier) => (
              <option key={tier.min} value={tier.min}>
                {tierLabel(tier, locale)}
              </option>
            ))}
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="tap-target rounded-lg border border-gray-300 px-2 py-1.5 text-sm"
          >
            <option value="date_desc">{t("dashboard.sortDateDesc")}</option>
            <option value="date_asc">{t("dashboard.sortDateAsc")}</option>
            <option value="score_desc">{t("dashboard.sortScoreDesc")}</option>
            <option value="score_asc">{t("dashboard.sortScoreAsc")}</option>
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl bg-white p-6 text-center text-sm text-gray-400 shadow-sm">
          {t("dashboard.empty")}
        </div>
      ) : (
        <ul className="space-y-2">
          {filtered.map((v) => (
            <li key={v.id}>
              <Link
                href={`/visits/${v.id}`}
                className="block rounded-2xl bg-white p-3 shadow-sm transition-colors active:bg-gray-50"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-gray-900">
                      {v.company_name || t("dashboard.unnamed")}
                    </p>
                    <p className="mt-0.5 text-xs text-gray-400">
                      {v.visit_date ?? t("dashboard.noDate")}
                      {v.visit_type === "potential_client" &&
                        v.industry_type.length > 0 &&
                        ` ・ ${labelsOf(INDUSTRY_TYPE, v.industry_type, locale)}`}
                    </p>
                  </div>
                  {v.visit_type === "potential_client" && <ScoreBadge score={v.score_total} showLabel={false} />}
                </div>
                <div className="mt-2 flex items-center justify-between gap-2">
                  {v.visit_type === "potential_client" ? (
                    <LeadStatusBadge status={v.lead_status} />
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                      {labelOf(VISIT_TYPES, v.visit_type, locale)}
                    </span>
                  )}
                  {v.followup_date && (
                    <span className="text-xs text-gray-400">
                      {t("dashboard.followupDate")}
                      {v.followup_date}
                    </span>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
