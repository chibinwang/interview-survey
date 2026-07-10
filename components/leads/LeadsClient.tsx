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
    <ul className="space-y-2">
      {leads.map((lead) => (
        <li key={lead.id}>
          <SwipeableRow onDelete={() => handleDelete(lead.id)} deleteLabel={t("common.delete")}>
            <div className="rounded-2xl bg-white p-3 shadow-sm">
              <Link href={`/leads/${lead.id}`} className="block">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-gray-900">{lead.company_name || t("dashboard.unnamed")}</p>
                    {lead.industry_type && <p className="mt-0.5 truncate text-xs text-gray-400">{lead.industry_type}</p>}
                  </div>
                  <span
                    className={`inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                      STATUS_COLORS[lead.contact_status] ?? "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {labelOf(CONTACT_STATUS, lead.contact_status, locale)}
                  </span>
                </div>
                <p className="mt-1.5 text-xs text-gray-400">
                  {lead.next_followup_date ? `${t("leads.field.nextFollowupDate")}: ${lead.next_followup_date}` : t("leads.noFollowup")}
                </p>
              </Link>

              <div className="mt-2.5 flex gap-2">
                <Link
                  href={`/leads/${lead.id}`}
                  className="tap-target flex-1 rounded-lg bg-gray-100 py-1.5 text-center text-sm font-medium text-gray-700 active:bg-gray-200"
                >
                  {t("common.edit")}
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(lead.id)}
                  className="tap-target flex-1 rounded-lg bg-rose-50 py-1.5 text-sm font-medium text-rose-600 active:bg-rose-100"
                >
                  {t("common.delete")}
                </button>
              </div>
            </div>
          </SwipeableRow>
        </li>
      ))}
    </ul>
  );
}
