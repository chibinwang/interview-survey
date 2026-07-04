"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { VisitAutosaveProvider, useVisit } from "@/components/visit/VisitAutosaveProvider";
import { TabBar } from "@/components/visit/TabBar";
import { ScoreBar } from "@/components/visit/ScoreBar";
import { SECTIONS, type SectionId } from "@/components/visit/sections";
import { Section1Basics } from "@/components/visit/sections/Section1Basics";
import { Section2ProcessMap } from "@/components/visit/sections/Section2ProcessMap";
import { Section3Scheduler } from "@/components/visit/sections/Section3Scheduler";
import { Section4Cad } from "@/components/visit/sections/Section4Cad";
import { Section5Procurement } from "@/components/visit/sections/Section5Procurement";
import { Section6AiReadiness } from "@/components/visit/sections/Section6AiReadiness";
import { Section7IcpScore } from "@/components/visit/sections/Section7IcpScore";
import { Section8Demo } from "@/components/visit/sections/Section8Demo";
import { Section9DataPoc } from "@/components/visit/sections/Section9DataPoc";
import { Section10Followup } from "@/components/visit/sections/Section10Followup";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import type { Visit } from "@/lib/types";

const SECTION_COMPONENTS: Record<SectionId, () => React.JSX.Element> = {
  basics: Section1Basics,
  "process-map": Section2ProcessMap,
  scheduler: Section3Scheduler,
  cad: Section4Cad,
  procurement: Section5Procurement,
  "ai-readiness": Section6AiReadiness,
  "icp-score": Section7IcpScore,
  demo: Section8Demo,
  "data-poc": Section9DataPoc,
  followup: Section10Followup,
};

export function VisitEditor({ initialVisit }: { initialVisit: Visit }) {
  return (
    <VisitAutosaveProvider initialVisit={initialVisit}>
      <VisitEditorInner />
    </VisitAutosaveProvider>
  );
}

function VisitEditorInner() {
  const { visit, saveStatus, saveNow } = useVisit();
  const { t } = useLocale();
  const [active, setActive] = useState<SectionId>("basics");
  const router = useRouter();

  const activeIndex = SECTIONS.findIndex((s) => s.id === active);
  const isLastSection = activeIndex === SECTIONS.length - 1;
  const ActiveComponent = SECTION_COMPONENTS[active];

  function goTo(index: number) {
    const clamped = Math.min(SECTIONS.length - 1, Math.max(0, index));
    setActive(SECTIONS[clamped].id);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }

  function handleDone() {
    saveNow();
    router.push("/");
  }

  return (
    <div className="min-h-dvh bg-gray-50 pb-24">
      <div className="no-print flex items-center justify-between border-b border-gray-200 bg-white px-3 py-1.5">
        <Link href="/" className="tap-target rounded-lg px-2 py-1.5 text-sm text-gray-500 active:bg-gray-100">
          {t("common.backToList")}
        </Link>
        <div className="flex items-center gap-1">
          <LanguageToggle />
          <Link
            href={`/visits/${visit.id}/print`}
            className="tap-target rounded-lg px-2 py-1.5 text-sm text-brand-600 active:bg-gray-100"
          >
            {t("common.print")}
          </Link>
        </div>
      </div>

      <ScoreBar saveStatus={saveStatus} onRetry={saveNow} />
      <TabBar active={active} onChange={setActive} />

      <main className="mx-auto max-w-2xl p-3">
        <h2 className="mb-3 text-lg font-bold text-gray-900">{t(SECTIONS[activeIndex].labelKey)}</h2>
        <ActiveComponent />
      </main>

      <div className="no-print fixed inset-x-0 bottom-0 flex items-center justify-between border-t border-gray-200 bg-white px-3 py-2.5">
        <button
          type="button"
          disabled={activeIndex === 0}
          onClick={() => goTo(activeIndex - 1)}
          className="tap-target rounded-lg px-4 py-2 text-sm font-medium text-gray-600 disabled:opacity-30"
        >
          {t("common.prev")}
        </button>
        <span className="text-xs text-gray-400">
          {activeIndex + 1} / {SECTIONS.length}
        </span>
        {isLastSection ? (
          <button
            type="button"
            onClick={handleDone}
            className="tap-target rounded-lg bg-brand-600 px-5 py-2 text-sm font-semibold text-white active:bg-brand-700"
          >
            {t("common.done")}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => goTo(activeIndex + 1)}
            className="tap-target rounded-lg px-4 py-2 text-sm font-medium text-brand-600"
          >
            {t("common.next")}
          </button>
        )}
      </div>
    </div>
  );
}
