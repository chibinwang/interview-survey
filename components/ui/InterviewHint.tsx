"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";
import type { InterviewSignal } from "@/lib/interviewSignals";

export function InterviewHint({ signal }: { signal: InterviewSignal }) {
  const { locale } = useLocale();

  return (
    <details className="group rounded-2xl bg-brand-50 p-3 open:pb-3.5">
      <summary className="cursor-pointer list-none text-sm font-medium text-brand-700 marker:hidden">
        💡 {locale === "en" ? "Interview signals" : "訪談訊號提示"}
        <span className="ml-1 text-brand-400 group-open:hidden">▾</span>
        <span className="ml-1 hidden text-brand-400 group-open:inline">▴</span>
      </summary>

      <div className="mt-2.5 space-y-3 text-sm text-gray-700">
        <p className="font-medium text-brand-800">
          {locale === "en" ? signal.opportunity.en : signal.opportunity.zh}
        </p>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
            {locale === "en" ? "Listen for" : "留意關鍵字"}
          </p>
          <ul className="mt-1 space-y-0.5">
            {signal.listenFor.map((item, i) => (
              <li key={i} className="text-gray-600">
                「{locale === "en" ? item.en : item.zh}」
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
            {locale === "en" ? "Ask" : "可以問"}
          </p>
          <ul className="mt-1 space-y-0.5">
            {signal.questions.map((item, i) => (
              <li key={i} className="text-gray-600">
                {i + 1}. {locale === "en" ? item.en : item.zh}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </details>
  );
}
