"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { LOCALE_COOKIE, translate, type DictKey, type Locale } from "@/lib/i18n/dictionary";

type Ctx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: DictKey) => string;
};

const LocaleCtx = createContext<Ctx | null>(null);

export function useLocale() {
  const ctx = useContext(LocaleCtx);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}

const ONE_YEAR = 60 * 60 * 24 * 365;

export function LocaleProvider({
  initialLocale,
  children,
}: {
  initialLocale: Locale;
  children: React.ReactNode;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const router = useRouter();

  const setLocale = useCallback(
    (l: Locale) => {
      setLocaleState(l);
      document.cookie = `${LOCALE_COOKIE}=${l}; path=/; max-age=${ONE_YEAR}`;
      document.documentElement.lang = l === "en" ? "en" : "zh-Hant";
      // Server Components (page headers, print view, etc.) only pick up the
      // new cookie value on their next render — force one now.
      router.refresh();
    },
    [router]
  );

  const t = useCallback((key: DictKey) => translate(key, locale), [locale]);

  return <LocaleCtx.Provider value={{ locale, setLocale, t }}>{children}</LocaleCtx.Provider>;
}
