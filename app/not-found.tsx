"use client";

import Link from "next/link";
import { useLocale } from "@/lib/i18n/LocaleProvider";

export default function NotFound() {
  const { t } = useLocale();
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-3 bg-gray-50 px-4 text-center">
      <p className="text-lg font-bold text-gray-900">{t("notFound.title")}</p>
      <p className="text-sm text-gray-500">{t("notFound.body")}</p>
      <Link href="/" className="tap-target mt-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white">
        {t("notFound.cta")}
      </Link>
    </div>
  );
}
