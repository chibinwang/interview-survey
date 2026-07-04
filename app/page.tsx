import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { DashboardClient, type DashboardVisit } from "@/components/dashboard/DashboardClient";
import { LogoutButton } from "@/components/dashboard/LogoutButton";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { getServerLocale } from "@/lib/i18n/server";
import { translate } from "@/lib/i18n/dictionary";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = await createClient();
  const locale = await getServerLocale();
  const t = (key: Parameters<typeof translate>[0]) => translate(key, locale);

  const { data: visits } = await supabase
    .from("visits")
    .select("id, company_name, visit_date, lead_status, score_total, industry_type, followup_date, visit_type")
    .order("visit_date", { ascending: false, nullsFirst: false });

  return (
    <div className="min-h-dvh bg-gray-50 pb-24">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-4 py-2.5">
        <h1 className="text-base font-bold text-gray-900">{t("dashboard.title")}</h1>
        <div className="flex items-center gap-1">
          <LanguageToggle />
          <Link href="/templates" className="tap-target rounded-lg px-2 py-1.5 text-sm text-gray-500 active:bg-gray-100">
            {t("dashboard.templates")}
          </Link>
          <LogoutButton />
        </div>
      </header>

      <main className="mx-auto max-w-2xl space-y-3 p-3">
        <DashboardClient visits={(visits ?? []) as DashboardVisit[]} />
      </main>

      <Link
        href="/visits/new"
        className="tap-target fixed bottom-5 right-5 flex items-center gap-2 rounded-full bg-brand-600 px-5 py-3 text-base font-medium text-white shadow-lg active:bg-brand-700"
      >
        {t("dashboard.newVisit")}
      </Link>
    </div>
  );
}
