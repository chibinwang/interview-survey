import Link from "next/link";
import type { Visit } from "@/lib/types";
import { PrintButton } from "@/components/visit/print/PrintButton";
import { PrintSection, PrintRow, PrintChecklist, PrintBoolean, PrintRating } from "@/components/visit/print/PrintPrimitives";
import type { Locale } from "@/lib/i18n/dictionary";
import { translate } from "@/lib/i18n/dictionary";
import {
  VISIT_METHOD,
  INTERVIEWEE_TITLE,
  COMPANY_SIZE,
  INDUSTRY_TYPE,
  CURRENT_SYSTEMS,
  AI_OPPORTUNITY,
  SCHEDULER_DISRUPTION_TAGS,
  CAD_BOTTLENECK_TAGS,
  CAD_PAYMENT_WILLINGNESS,
  DOCUMENT_TIME_TAGS,
  CONCERNS,
  DEMO_FEATURES_SHOWN,
  AVAILABLE_DATA_TYPES,
  DATA_SENSITIVITY,
  LEAD_STATUS,
  RECOMMENDED_SOLUTIONS,
  NEXT_ACTIONS,
  FINAL_VERDICT,
  labelOf,
  icpTier,
  tierLabel,
  stageLabel,
} from "@/lib/enums";

export function FactoryPrintView({ v, locale }: { v: Visit; locale: Locale }) {
  const tier = icpTier(v.score_total);
  const t = (key: Parameters<typeof translate>[0]) => translate(key, locale);

  return (
    <div className="mx-auto max-w-3xl bg-white p-6 print:p-0">
      <div className="no-print mb-4 flex items-center justify-between">
        <Link href={`/visits/${v.id}`} className="tap-target rounded-lg px-2 py-1.5 text-sm text-gray-500">
          {t("print.backToEdit")}
        </Link>
        <PrintButton />
      </div>

      <header className="mb-2 border-b-2 border-gray-900 pb-3">
        <h1 className="text-xl font-bold text-gray-900">{v.company_name || t("visitEditor.unnamed")}</h1>
        <p className="mt-1 text-sm text-gray-500">
          {t("print.visitDate")}
          {v.visit_date ?? "—"} ・ {t("print.icpTotal")}
          {v.score_total}（{tierLabel(tier, locale)}）
        </p>
      </header>

      <PrintSection title={t("print.section.basics")}>
        <PrintRow label={t("field.location")} value={v.location} locale={locale} />
        <PrintChecklist
          label={t("field.visitMethod")}
          options={VISIT_METHOD}
          selected={v.visit_method}
          other={v.visit_method_other}
          locale={locale}
        />
        <PrintRow label={t("field.intervieweeName")} value={v.interviewee_name} locale={locale} />
        <PrintRow label={t("field.intervieweeContact")} value={v.interviewee_contact} locale={locale} />
        <PrintChecklist
          label={t("field.intervieweeTitle")}
          options={INTERVIEWEE_TITLE}
          selected={v.interviewee_title}
          other={v.interviewee_title_other}
          locale={locale}
        />
        <PrintChecklist label={t("field.companySize")} options={COMPANY_SIZE} selected={v.company_size} locale={locale} />
        <PrintChecklist
          label={t("field.industryType")}
          options={INDUSTRY_TYPE}
          selected={v.industry_type}
          other={v.industry_type_other}
          locale={locale}
        />
        <PrintBoolean label={t("field.exports")} value={v.exports} locale={locale} />
        <PrintBoolean label={t("field.hasOverseas")} value={v.has_overseas_client_or_plant} locale={locale} />
        <PrintChecklist
          label={t("field.currentSystems")}
          options={CURRENT_SYSTEMS}
          selected={v.current_systems}
          other={v.current_systems_other}
          locale={locale}
        />
        <PrintRow label={t("field.erpBrand")} value={v.erp_brand} locale={locale} />
        <PrintRow label={t("field.firstImpressionNotes")} value={v.first_impression_notes} locale={locale} />
      </PrintSection>

      <PrintSection title={t("print.section.processMap")}>
        <div className="space-y-3">
          {v.process_map.map((stage, i) => (
            <div key={stage.stage} className="rounded border border-gray-200 p-2">
              <p className="font-semibold text-gray-900">
                {i + 1}. {stageLabel(stage.stage, locale)}
              </p>
              <PrintRow label={t("field.owner")} value={stage.owner} locale={locale} />
              <PrintRow label={t("field.toolsUsed")} value={stage.tools_used} locale={locale} />
              <PrintRow label={t("field.biggestPainPoint")} value={stage.biggest_pain_point} locale={locale} />
              <PrintBoolean label={t("field.reliesOnManual")} value={stage.relies_on_manual_experience} locale={locale} />
              <PrintRow
                label={t("field.aiOpportunity")}
                value={stage.ai_opportunity ? labelOf(AI_OPPORTUNITY, stage.ai_opportunity, locale) : undefined}
                locale={locale}
              />
            </div>
          ))}
        </div>
      </PrintSection>

      <PrintSection title={t("print.section.scheduler")}>
        <PrintRow label={t("field.schedulerNotes")} value={v.scheduler_notes} locale={locale} />
        <PrintRating label={t("field.painIntensity")} value={v.scheduler_pain_intensity} />
        <PrintRating label={t("field.frequency")} value={v.scheduler_frequency} />
        <PrintRating label={t("field.schedulerFitScore")} value={v.scheduler_fit_score} />
        <PrintRow label={t("field.currentSolution")} value={v.scheduler_current_solution} locale={locale} />
        <PrintChecklist
          label={t("field.disruptionTags")}
          options={SCHEDULER_DISRUPTION_TAGS}
          selected={v.scheduler_disruption_tags}
          locale={locale}
        />
        <PrintRow label={t("field.quotesVerbatim")} value={v.scheduler_quotes} locale={locale} />
      </PrintSection>

      <PrintSection title={t("print.section.cad")}>
        <PrintChecklist label={t("field.cadBottleneck")} options={CAD_BOTTLENECK_TAGS} selected={v.cad_bottleneck_tags} locale={locale} />
        <PrintBoolean label={t("field.cadSampleAvailable")} value={v.cad_sample_available} locale={locale} />
        <PrintBoolean label={t("field.historicalQuotesAvailable")} value={v.historical_quotes_available} locale={locale} />
        <PrintRating label={t("field.painIntensity")} value={v.cad_pain_intensity} />
        <PrintChecklist
          label={t("field.cadPaymentWillingness")}
          options={CAD_PAYMENT_WILLINGNESS}
          selected={v.cad_payment_willingness}
          locale={locale}
        />
        <PrintRow label={t("field.quotesVerbatim")} value={v.cad_quotes_verbatim} locale={locale} />
      </PrintSection>

      <PrintSection title={t("print.section.procurement")}>
        <PrintRow label={t("field.procurementNotes")} value={v.procurement_notes} locale={locale} />
        <PrintChecklist
          label={t("field.documentTimeTags")}
          options={DOCUMENT_TIME_TAGS}
          selected={v.document_time_tags}
          locale={locale}
        />
        <PrintRow label={t("field.dailyTimeEstimate")} value={v.daily_time_estimate} locale={locale} />
        <PrintRow label={t("field.mostWantedAutomation")} value={v.most_wanted_automation} locale={locale} />
        <PrintBoolean label={t("field.fitsDocumentationAi")} value={v.fits_documentation_ai} locale={locale} />
        <PrintBoolean label={t("field.fitsFreightForwarderAi")} value={v.fits_freight_forwarder_ai} locale={locale} />
        <PrintRow label={t("field.quotesVerbatim")} value={v.procurement_quotes_verbatim} locale={locale} />
      </PrintSection>

      <PrintSection title={t("print.section.aiReadiness")}>
        <PrintRow label={t("field.decisionMaker")} value={v.decision_maker} locale={locale} />
        <PrintRow label={t("field.likelyOpponent")} value={v.likely_opponent} locale={locale} />
        <PrintRow label={t("field.biggestBeneficiary")} value={v.biggest_beneficiary} locale={locale} />
        <PrintBoolean label={t("field.currentlyUsesAiTools")} value={v.currently_uses_ai_tools} locale={locale} />
        <PrintRow label={t("field.aiToolsDetail")} value={v.currently_uses_ai_tools_detail} locale={locale} />
        <PrintBoolean label={t("field.willingToShareData")} value={v.willing_to_share_data} locale={locale} />
        <PrintBoolean label={t("field.willingToDoPoc")} value={v.willing_to_do_2wk_poc} locale={locale} />
        <PrintBoolean label={t("field.willingToPaySymbolic")} value={v.willing_to_pay_symbolic_fee} locale={locale} />
        <PrintChecklist label={t("field.concerns")} options={CONCERNS} selected={v.concerns} other={v.concerns_other} locale={locale} />
        <PrintRow label={t("field.adoptionThreshold")} value={v.adoption_threshold} locale={locale} />
        <PrintRow label={t("field.dealFriction")} value={v.deal_friction} locale={locale} />
        <PrintRow label={t("field.nextDecisionProcess")} value={v.next_decision_process} locale={locale} />
        <PrintRating label={t("field.aiAcceptanceScore")} value={v.ai_acceptance_score} />
        <PrintRating label={t("field.decisionSpeedScore")} value={v.decision_speed_score} />
        <PrintRating label={t("field.dataAvailabilityScore")} value={v.data_availability_score} />
        <PrintRating label={t("field.paymentLikelihoodScore")} value={v.payment_likelihood_score} />
      </PrintSection>

      <PrintSection title={t("print.section.icpScore")}>
        <PrintRow label={t("field.scoreCompanySizeFit")} value={`${v.score_company_size_fit} / 10`} locale={locale} />
        <PrintRow label={t("field.painIntensity")} value={`${v.score_pain_intensity} / 10`} locale={locale} />
        <PrintRow label={t("field.scoreSchedulingComplexity")} value={`${v.score_scheduling_complexity} / 10`} locale={locale} />
        <PrintRow label={t("field.scoreCadQuotingNeed")} value={`${v.score_cad_quoting_need} / 10`} locale={locale} />
        <PrintRow label={t("field.scoreProcurementDocNeed")} value={`${v.score_procurement_doc_need} / 10`} locale={locale} />
        <PrintRow label={t("field.scoreExportLogisticsNeed")} value={`${v.score_export_logistics_need} / 10`} locale={locale} />
        <PrintRow
          label={t("field.scoreDecisionMakerInvolvement")}
          value={`${v.score_decision_maker_involvement} / 10`}
          locale={locale}
        />
        <PrintRow label={t("field.aiAcceptanceScore")} value={`${v.score_ai_acceptance} / 10`} locale={locale} />
        <PrintRow label={t("field.dataAvailabilityScore")} value={`${v.score_data_availability} / 10`} locale={locale} />
        <PrintRow label={t("field.paymentLikelihoodScore")} value={`${v.score_payment_likelihood} / 5`} locale={locale} />
        <PrintRow label={t("field.scoreCaseStudyValue")} value={`${v.score_case_study_value} / 5`} locale={locale} />
        <PrintRow label={t("print.total")} value={`${v.score_total} / 100 （${tierLabel(tier, locale)}）`} locale={locale} />
        <PrintRow label={t("field.scoreNotes")} value={v.score_notes} locale={locale} />
      </PrintSection>

      <PrintSection title={t("print.section.demo")}>
        <PrintChecklist
          label={t("field.demoFeaturesShown")}
          options={DEMO_FEATURES_SHOWN}
          selected={v.demo_features_shown}
          other={v.demo_features_other}
          locale={locale}
        />
        <PrintRow label={t("field.demoBestMoment")} value={v.demo_best_moment} locale={locale} />
        <PrintRow label={t("field.demoConfusionPoints")} value={v.demo_confusion_points} locale={locale} />
        <PrintRow label={t("field.demoObjections")} value={v.demo_objections} locale={locale} />
        <PrintRow label={t("field.demoQuestionsAsked")} value={v.demo_questions_asked} locale={locale} />
        <PrintRow label={t("field.demoFeaturesLiked")} value={v.demo_features_liked} locale={locale} />
        <PrintRow label={t("field.demoFeaturesNotNeeded")} value={v.demo_features_not_needed} locale={locale} />
        <PrintRow label={t("field.demoNextStep")} value={v.demo_next_step} locale={locale} />
        <PrintBoolean label={t("field.needsCustomization")} value={v.needs_customization} locale={locale} />
        <PrintRow label={t("field.customizationDescription")} value={v.customization_description} locale={locale} />
      </PrintSection>

      <PrintSection title={t("print.section.dataPoc")}>
        <PrintChecklist
          label={t("field.availableDataTypes")}
          options={AVAILABLE_DATA_TYPES}
          selected={v.available_data_types}
          locale={locale}
        />
        <PrintChecklist label={t("field.dataSensitivity")} options={DATA_SENSITIVITY} selected={v.data_sensitivity} locale={locale} />
        <PrintBoolean label={t("field.ndaRequired")} value={v.nda_required} locale={locale} />
        <PrintRow label={t("field.pocGoal")} value={v.poc_goal} locale={locale} />
        <PrintRow label={t("field.pocSuccessCriteria")} value={v.poc_success_criteria} locale={locale} />
        <PrintRow label={t("field.ourNextStep")} value={v.our_next_step} locale={locale} />
      </PrintSection>

      <PrintSection title={t("print.section.followup")}>
        <PrintChecklist label={t("field.leadStatus")} options={LEAD_STATUS} selected={v.lead_status} locale={locale} />
        <PrintChecklist
          label={t("field.recommendedSolutions")}
          options={RECOMMENDED_SOLUTIONS}
          selected={v.recommended_solutions}
          locale={locale}
        />
        <PrintChecklist label={t("field.nextActions")} options={NEXT_ACTIONS} selected={v.next_actions} locale={locale} />
        <PrintRow label={t("field.followupDate")} value={v.followup_date} locale={locale} />
        <PrintRow label={t("field.contentToSend")} value={v.content_to_send} locale={locale} />
        <PrintRow label={t("field.internalNotes")} value={v.internal_notes} locale={locale} />
        <PrintRow label={t("field.closingStrategy")} value={v.closing_strategy} locale={locale} />
        <PrintChecklist label={t("field.finalVerdict")} options={FINAL_VERDICT} selected={v.final_verdict} locale={locale} />
      </PrintSection>
    </div>
  );
}
