import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { LeadsClient, type LeadListItem } from "@/components/leads/LeadsClient";
import { getServerLocale } from "@/lib/i18n/server";
import { translate } from "@/lib/i18n/dictionary";

export const dynamic = "force-dynamic";

export default async function LeadsPage() {
  const supabase = await createClient();
  const locale = await getServerLocale();
  const t = (key: Parameters<typeof translate>[0]) => translate(key, locale);

  const { data: leads } = await supabase
    .from("leads")
    .select("id, company_name, industry_type, contact_status, next_followup_date")
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-dvh bg-gray-50 pb-24">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-4 py-2.5">
        <div className="flex items-center gap-2">
          <Link href="/" className="tap-target rounded-lg px-2 py-1.5 text-sm text-gray-500 active:bg-gray-100">
            {t("common.backToList")}
          </Link>
          <h1 className="text-base font-bold text-gray-900">{t("leads.title")}</h1>
        </div>
      </header>

      <main className="mx-auto max-w-2xl space-y-3 p-3">
        <LeadsClient leads={(leads ?? []) as LeadListItem[]} />
      </main>

      <Link
        href="/leads/new"
        className="tap-target fixed bottom-5 right-5 flex items-center gap-2 rounded-full bg-brand-600 px-5 py-3 text-base font-medium text-white shadow-lg active:bg-brand-700"
      >
        {t("leads.new")}
      </Link>
    </div>
  );
}
