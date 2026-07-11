"use client";

import Link from "next/link";
import { useState } from "react";
import { SwipeableRow } from "@/components/dashboard/SwipeableRow";
import { createClient } from "@/lib/supabase/client";
import { CONNECTOR_ROLE, labelsOf } from "@/lib/enums";
import { useLocale } from "@/lib/i18n/LocaleProvider";

export type ConnectorListItem = {
  id: string;
  name: string;
  company: string | null;
  role: string[];
  interviewed: boolean | null;
  can_introduce_customers: number | null;
};

export function ConnectorsClient({ connectors: initialConnectors }: { connectors: ConnectorListItem[] }) {
  const { t, locale } = useLocale();
  const supabase = createClient();
  const [connectors, setConnectors] = useState(initialConnectors);

  async function handleDelete(id: string) {
    if (!window.confirm(t("connectors.confirmDelete"))) return;
    const { error } = await supabase.from("connectors").delete().eq("id", id);
    if (!error) setConnectors((prev) => prev.filter((c) => c.id !== id));
  }

  if (connectors.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-6 text-center text-sm text-gray-400 shadow-sm">
        {t("connectors.empty")}
      </div>
    );
  }

  return (
    <ul className="space-y-1.5">
      {connectors.map((connector) => (
        <li key={connector.id}>
          <SwipeableRow onDelete={() => handleDelete(connector.id)} deleteLabel={t("common.delete")}>
            <div className="flex items-center gap-2 rounded-2xl bg-white py-2 pl-3 pr-1.5 shadow-sm">
              <Link href={`/connectors/${connector.id}`} className="block min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <p className="truncate text-sm font-semibold text-gray-900">
                    {connector.name || t("dashboard.unnamed")}
                  </p>
                  {connector.company && <span className="truncate text-xs text-gray-400">· {connector.company}</span>}
                </div>
                <div className="mt-0.5 flex items-center gap-1.5">
                  {connector.role.length > 0 && (
                    <span className="inline-flex shrink-0 items-center rounded-full bg-brand-50 px-1.5 py-0.5 text-[11px] font-medium text-brand-700">
                      {labelsOf(CONNECTOR_ROLE, connector.role, locale)}
                    </span>
                  )}
                  {connector.interviewed && (
                    <span className="inline-flex shrink-0 items-center rounded-full bg-emerald-100 px-1.5 py-0.5 text-[11px] font-medium text-emerald-700">
                      {t("connectors.field.interviewed")}
                    </span>
                  )}
                  {connector.can_introduce_customers != null && (
                    <span className="truncate text-xs text-gray-400">
                      {"⭐".repeat(connector.can_introduce_customers)}
                    </span>
                  )}
                </div>
              </Link>

              <div className="flex shrink-0 items-center">
                <Link
                  href={`/connectors/${connector.id}`}
                  aria-label={t("common.edit")}
                  className="tap-target flex items-center justify-center rounded-lg text-gray-400 active:bg-gray-100"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                  </svg>
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(connector.id)}
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
