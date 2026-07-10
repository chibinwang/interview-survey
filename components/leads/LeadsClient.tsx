"use client";

import Link from "next/link";
import { useState } from "react";
import { SwipeableRow } from "@/components/dashboard/SwipeableRow";
import { createClient } from "@/lib/supabase/client";
import { CONTACT_STATUS, labelOf } from "@/lib/enums";
import { useLocale } from "@/lib/i18n/LocaleProvider";

export type LeadListItem = {
  id: string;
  company_name: string;
  industry_type: string | null;
  contact_status: string;
  next_followup_date: string | null;
};

const STATUS_COLORS: Record<string, string> = {
  not_contacted: "bg-gray-100 text-gray-600",
  awaiting_reply: "bg-blue-100 text-blue-700",
  meeting_scheduled: "bg-violet-100 text-violet-700",
  quoted: "bg-amber-100 text-amber-700",
  closed_won: "bg-emerald-100 text-emerald-700",
  not_interested: "bg-rose-100 text-rose-700",
};

export function LeadsClient({ leads: initialLeads }: { leads: LeadListItem[] }) {
  const { t, locale } = useLocale();
  const supabase = createClient();
  const [leads, setLeads] = useState(initialLeads);

  async function handleDelete(id: string) {
    if (!window.confirm(t("leads.confirmDelete"))) return;
    const { error } = await supabase.from("leads").delete().eq("id", id);
    if (!error) setLeads((prev) => prev.filter((l) => l.id !== id));
  }

  if (leads.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-6 text-center text-sm text-gray-400 shadow-sm">{t("leads.empty")}</div>
    );
  }

  return (
    <ul className="space-y-1.5">
      {leads.map((lead) => (
        <li key={lead.id}>
          <SwipeableRow onDelete={() => handleDelete(lead.id)} deleteLabel={t("common.delete")}>
            <div className="flex items-center gap-2 rounded-2xl bg-white py-2 pl-3 pr-1.5 shadow-sm">
              <Link href={`/leads/${lead.id}`} className="block min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <p className="truncate text-sm font-semibold text-gray-900">{lead.company_name || t("dashboard.unnamed")}</p>
                  {lead.industry_type && <span className="truncate text-xs text-gray-400">· {lead.industry_type}</span>}
                </div>
                <div className="mt-0.5 flex items-center gap-1.5">
                  <span
                    className={`inline-flex shrink-0 items-center rounded-full px-1.5 py-0.5 text-[11px] font-medium ${
                      STATUS_COLORS[lead.contact_status] ?? "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {labelOf(CONTACT_STATUS, lead.contact_status, locale)}
                  </span>
                  <span className="truncate text-xs text-gray-400">
                    {lead.next_followup_date || t("leads.noFollowup")}
                  </span>
                </div>
              </Link>

              <div className="flex shrink-0 items-center">
                <Link
                  href={`/leads/${lead.id}`}
                  aria-label={t("common.edit")}
                  className="tap-target flex items-center justify-center rounded-lg text-gray-400 active:bg-gray-100"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                  </svg>
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(lead.id)}
                  aria-label={t("common.delete")}
                  className="tap-target flex items-center justify-center rounded-lg text-gray-400 active:bg-rose-50 active:text-rose-600"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m-8 0 1 12a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1l1-12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </SwipeableRow>
        </li>
      ))}
    </ul>
  );
}
