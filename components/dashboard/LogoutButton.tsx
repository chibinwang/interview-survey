"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useLocale } from "@/lib/i18n/LocaleProvider";

export function LogoutButton() {
  const router = useRouter();
  const supabase = createClient();
  const { t } = useLocale();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="tap-target rounded-lg px-2 py-1.5 text-sm font-medium text-gray-500 active:bg-gray-100"
    >
      {t("common.logout")}
    </button>
  );
}
