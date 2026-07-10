export type Locale = "zh" | "en";

export const LOCALE_COOKIE = "locale";

type Entry = { zh: string; en: string };

// Flat, namespaced key -> {zh, en} pairs. Namespaces roughly track one
// screen/component each so related strings stay easy to find.
export const dict = {
  // ---- common (shared across many screens) ----
  "common.back": { zh: "← 返回", en: "← Back" },
  "common.backToList": { zh: "← 返回列表", en: "← Back to list" },
  "common.print": { zh: "列印／匯出", en: "Print / Export" },
  "common.save": { zh: "儲存", en: "Save" },
  "common.cancel": { zh: "取消", en: "Cancel" },
  "common.edit": { zh: "編輯", en: "Edit" },
  "common.delete": { zh: "刪除", en: "Delete" },
  "common.add": { zh: "新增", en: "Add" },
  "common.done": { zh: "完成，返回列表", en: "Done, back to list" },
  "common.next": { zh: "下一步 →", en: "Next →" },
  "common.prev": { zh: "← 上一步", en: "← Prev" },
  "common.logout": { zh: "登出", en: "Log out" },
  "common.notFilled": { zh: "未填寫", en: "Not filled in" },
  "common.yes": { zh: "是", en: "Yes" },
  "common.no": { zh: "否", en: "No" },
  "common.retry": { zh: "重試", en: "Retry" },

  // ---- save indicator ----
  "save.saving": { zh: "儲存中…", en: "Saving…" },
  "save.saved": { zh: "已儲存", en: "Saved" },
  "save.error": { zh: "儲存失敗，點此重試", en: "Save failed, tap to retry" },
  "save.pending": { zh: "待儲存", en: "Pending" },

  // ---- login ----
  "login.subtitle": { zh: "請登入以繼續", en: "Please sign in to continue" },
  "login.email": { zh: "電子郵件", en: "Email" },
  "login.password": { zh: "密碼", en: "Password" },
  "login.submit": { zh: "登入", en: "Log in" },
  "login.submitting": { zh: "登入中…", en: "Logging in…" },
  "login.error": { zh: "登入失敗，請確認帳號密碼是否正確。", en: "Login failed. Please check your email and password." },

  // ---- dashboard ----
  "dashboard.title": { zh: "拜訪紀錄", en: "Visit Log" },
  "dashboard.templates": { zh: "範本", en: "Templates" },
  "dashboard.newVisit": { zh: "＋ 新增拜訪", en: "＋ New Visit" },
  "dashboard.searchPlaceholder": { zh: "搜尋公司名稱…", en: "Search by name…" },
  "dashboard.allTypes": { zh: "全部類型", en: "All types" },
  "dashboard.allStatuses": { zh: "全部狀態", en: "All statuses" },
  "dashboard.allTiers": { zh: "全部分級", en: "All tiers" },
  "dashboard.sortDateDesc": { zh: "拜訪日期（新→舊）", en: "Date (newest first)" },
  "dashboard.sortDateAsc": { zh: "拜訪日期（舊→新）", en: "Date (oldest first)" },
  "dashboard.sortScoreDesc": { zh: "ICP分數（高→低）", en: "ICP score (high to low)" },
  "dashboard.sortScoreAsc": { zh: "ICP分數（低→高）", en: "ICP score (low to high)" },
  "dashboard.empty": { zh: "尚無符合條件的拜訪紀錄", en: "No visits match these filters" },
  "dashboard.unnamed": { zh: "未命名紀錄", en: "Untitled" },
  "dashboard.noDate": { zh: "尚未填寫日期", en: "No date yet" },
  "dashboard.followupDate": { zh: "追蹤日：", en: "Follow-up: " },
  "dashboard.confirmDelete": {
    zh: "確定要刪除這筆拜訪紀錄嗎？此動作無法復原。",
    en: "Delete this visit record? This cannot be undone.",
  },

  // ---- not-found / error ----
  "notFound.title": { zh: "找不到這筆資料", en: "This record could not be found" },
  "notFound.body": { zh: "可能已被刪除，或網址不正確。", en: "It may have been deleted, or the link is incorrect." },
  "notFound.cta": { zh: "回到拜訪列表", en: "Back to visit list" },
  "error.title": { zh: "發生錯誤", en: "Something went wrong" },
  "error.body": { zh: "請稍後再試一次。", en: "Please try again shortly." },
  "error.retry": { zh: "重試", en: "Retry" },

  // ---- visit type picker (/visits/new) ----
  "newVisit.heading": { zh: "這次是什麼類型的拜訪／會議？", en: "What kind of visit or meeting is this?" },
  "newVisit.manageTemplates": { zh: "管理自訂問題範本", en: "Manage question templates" },

  // ---- visit type enum (also used elsewhere) ----
  "visitType.potential_client": { zh: "潛在客戶", en: "Potential Client" },
  "visitType.investor": { zh: "投資人", en: "Investor" },
  "visitType.advisor": { zh: "顧問", en: "Advisor" },
  "visitType.consultant": { zh: "外部顧問", en: "Consultant" },
  "visitType.senior_engineer": { zh: "資深工程師", en: "Senior Engineer" },
  "visitType.custom": { zh: "自訂類型", en: "Custom" },

  // ---- visit editor chrome ----
  "visitEditor.unnamed": { zh: "未命名拜訪", en: "Untitled Visit" },

  // ---- tab labels (factory template) ----
  "tab.basics": { zh: "基本資料", en: "Basics" },
  "tab.processMap": { zh: "流程地圖", en: "Process Map" },
  "tab.scheduler": { zh: "排程", en: "Scheduler" },
  "tab.cad": { zh: "CAD/報價", en: "CAD/Quoting" },
  "tab.procurement": { zh: "採購/文件/物流", en: "Procurement/Docs/Logistics" },
  "tab.aiReadiness": { zh: "AI 接受度", en: "AI Readiness" },
  "tab.icpScore": { zh: "ICP 評分", en: "ICP Score" },
  "tab.demo": { zh: "Demo 反應", en: "Demo Reaction" },
  "tab.dataPoc": { zh: "資料/PoC", en: "Data/PoC" },
  "tab.followup": { zh: "Follow-up", en: "Follow-up" },

  // ---- section 1: basics ----
  "field.companyName": { zh: "公司名稱", en: "Company Name" },
  "field.companyNamePlaceholder": { zh: "請輸入公司名稱", en: "Enter company name" },
  "field.visitDate": { zh: "拜訪日期", en: "Visit Date" },
  "field.location": { zh: "地點", en: "Location" },
  "field.visitMethod": { zh: "拜訪方式", en: "Visit Method" },
  "field.visitMethodOtherPlaceholder": { zh: "請說明其他拜訪方式", en: "Please specify other method" },
  "field.intervieweeName": { zh: "受訪者姓名", en: "Interviewee Name" },
  "field.intervieweeContact": { zh: "受訪者聯絡方式", en: "Interviewee Contact" },
  "field.intervieweeTitle": { zh: "受訪者職稱（可複選）", en: "Interviewee Title (multi-select)" },
  "field.intervieweeTitleOtherPlaceholder": { zh: "請說明其他職稱", en: "Please specify other title" },
  "field.companySize": { zh: "公司規模", en: "Company Size" },
  "field.industryType": { zh: "產業類型（可複選）", en: "Industry Type (multi-select)" },
  "field.industryTypeOtherPlaceholder": { zh: "請說明其他產業", en: "Please specify other industry" },
  "field.exports": { zh: "是否有外銷業務", en: "Exports Overseas" },
  "field.hasOverseas": { zh: "是否有海外客戶或廠區", en: "Overseas Client or Plant" },
  "field.currentSystems": { zh: "現有系統（可複選）", en: "Current Systems (multi-select)" },
  "field.erpBrandPlaceholder": { zh: "ERP 品牌／名稱", en: "ERP brand / name" },
  "field.currentSystemsOtherPlaceholder": { zh: "請說明其他系統", en: "Please specify other system" },
  "field.firstImpressionNotes": { zh: "第一印象筆記", en: "First Impression Notes" },
  "field.firstImpressionPlaceholder": { zh: "現場觀察、初步印象…", en: "On-site observations, first impressions…" },

  // ---- section 2: process map ----
  "section.processMapHint": {
    zh: "依序記錄每個生產流程階段的負責人、使用工具與最大痛點。",
    en: "Record the owner, tools used, and biggest pain point for each stage in order.",
  },
  "field.owner": { zh: "負責人", en: "Owner" },
  "field.toolsUsed": { zh: "使用工具", en: "Tools Used" },
  "field.biggestPainPoint": { zh: "最大痛點", en: "Biggest Pain Point" },
  "field.reliesOnManual": { zh: "是否仰賴人工經驗", en: "Relies on Manual Experience" },
  "field.aiOpportunity": { zh: "AI 導入機會", en: "AI Opportunity" },

  // ---- section 3: scheduler ----
  "field.schedulerNotes": { zh: "排程發現筆記", en: "Scheduling Discovery Notes" },
  "field.painIntensity": { zh: "痛點強度", en: "Pain Intensity" },
  "field.frequency": { zh: "發生頻率", en: "Frequency" },
  "field.schedulerFitScore": { zh: "Scheduler 適配度", en: "Scheduler Fit Score" },
  "field.currentSolution": { zh: "目前解決方式", en: "Current Solution" },
  "field.disruptionTags": { zh: "干擾因素（可複選）", en: "Disruption Factors (multi-select)" },
  "field.quotesVerbatim": { zh: "逐字稿 / 客戶原話", en: "Verbatim Quotes" },

  // ---- section 4: CAD ----
  "field.cadBottleneck": { zh: "CAD／報價瓶頸（可複選）", en: "CAD/Quoting Bottlenecks (multi-select)" },
  "field.cadSampleAvailable": { zh: "是否有 CAD 圖檔範例", en: "CAD Sample Available" },
  "field.historicalQuotesAvailable": { zh: "是否有歷史報價單", en: "Historical Quotes Available" },
  "field.cadPaymentWillingness": { zh: "付費意願", en: "Payment Willingness" },

  // ---- section 5: procurement ----
  "field.procurementNotes": { zh: "採購／文件／物流筆記", en: "Procurement/Docs/Logistics Notes" },
  "field.documentTimeTags": { zh: "耗時文件作業（可複選）", en: "Time-consuming Document Work (multi-select)" },
  "field.dailyTimeEstimate": { zh: "每日耗時估計", en: "Daily Time Estimate" },
  "field.dailyTimeEstimatePlaceholder": { zh: "例如：每天約2小時", en: "e.g. About 2 hours per day" },
  "field.mostWantedAutomation": { zh: "最想自動化的項目", en: "Most Wanted Automation" },
  "field.fitsDocumentationAi": { zh: "適合 Documentation AI", en: "Fits Documentation AI" },
  "field.fitsFreightForwarderAi": { zh: "適合 Freight Forwarder AI", en: "Fits Freight Forwarder AI" },

  // ---- section 6: AI readiness ----
  "field.decisionMaker": { zh: "決策者", en: "Decision Maker" },
  "field.likelyOpponent": { zh: "可能反對者", en: "Likely Opponent" },
  "field.biggestBeneficiary": { zh: "最大受益者", en: "Biggest Beneficiary" },
  "field.currentlyUsesAiTools": { zh: "目前是否使用 AI 工具", en: "Currently Uses AI Tools" },
  "field.aiToolsDetailPlaceholder": { zh: "使用哪些 AI 工具？", en: "Which AI tools?" },
  "field.willingToShareData": { zh: "願意分享資料", en: "Willing to Share Data" },
  "field.willingToDoPoc": { zh: "願意進行2週 PoC", en: "Willing to do a 2-week PoC" },
  "field.willingToPaySymbolic": { zh: "願意支付象徵性費用", en: "Willing to Pay a Symbolic Fee" },
  "field.concerns": { zh: "顧慮（可複選）", en: "Concerns (multi-select)" },
  "field.concernsOtherPlaceholder": { zh: "請說明其他顧慮", en: "Please specify other concerns" },
  "field.adoptionThreshold": { zh: "採用門檻", en: "Adoption Threshold" },
  "field.dealFriction": { zh: "成交阻力", en: "Deal Friction" },
  "field.nextDecisionProcess": { zh: "後續決策流程", en: "Next Decision Process" },
  "field.aiAcceptanceScore": { zh: "AI 接受度", en: "AI Acceptance" },
  "field.decisionSpeedScore": { zh: "決策速度", en: "Decision Speed" },
  "field.dataAvailabilityScore": { zh: "資料可取得性", en: "Data Availability" },
  "field.paymentLikelihoodScore": { zh: "付費可能性", en: "Payment Likelihood" },

  // ---- section 7: ICP score ----
  "field.icpTotal": { zh: "ICP 總分", en: "ICP Total Score" },
  "field.scoreCompanySizeFit": { zh: "公司規模適配度", en: "Company Size Fit" },
  "field.scoreSchedulingComplexity": { zh: "排程複雜度", en: "Scheduling Complexity" },
  "field.scoreCadQuotingNeed": { zh: "CAD／報價需求", en: "CAD/Quoting Need" },
  "field.scoreProcurementDocNeed": { zh: "採購文件需求", en: "Procurement Doc Need" },
  "field.scoreExportLogisticsNeed": { zh: "外銷物流需求", en: "Export Logistics Need" },
  "field.scoreDecisionMakerInvolvement": { zh: "決策者參與度", en: "Decision Maker Involvement" },
  "field.scoreCaseStudyValue": { zh: "案例參考價值", en: "Case Study Value" },
  "field.scoreNotes": { zh: "評分備註", en: "Scoring Notes" },

  // ---- section 8: demo ----
  "field.demoFeaturesShown": { zh: "展示的功能（可複選）", en: "Features Shown (multi-select)" },
  "field.demoFeaturesOtherPlaceholder": { zh: "請說明其他展示功能", en: "Please specify other features shown" },
  "field.demoBestMoment": { zh: "最佳反應時刻", en: "Best Reaction Moment" },
  "field.demoConfusionPoints": { zh: "困惑點", en: "Confusion Points" },
  "field.demoObjections": { zh: "異議 / 反對意見", en: "Objections" },
  "field.demoQuestionsAsked": { zh: "提出的問題", en: "Questions Asked" },
  "field.demoFeaturesLiked": { zh: "喜歡的功能", en: "Features Liked" },
  "field.demoFeaturesNotNeeded": { zh: "不需要的功能", en: "Features Not Needed" },
  "field.demoNextStep": { zh: "下一步", en: "Next Step" },
  "field.needsCustomization": { zh: "是否需要客製化", en: "Needs Customization" },
  "field.customizationDescPlaceholder": { zh: "請說明客製化需求", en: "Please describe customization needs" },

  // ---- section 9: data / PoC ----
  "field.availableDataTypes": { zh: "可提供的資料類型（可複選）", en: "Available Data Types (multi-select)" },
  "field.dataSensitivity": { zh: "資料敏感度", en: "Data Sensitivity" },
  "field.ndaRequired": { zh: "是否需要簽署 NDA", en: "NDA Required" },
  "field.pocGoal": { zh: "PoC 目標", en: "PoC Goal" },
  "field.pocSuccessCriteria": { zh: "PoC 成功標準", en: "PoC Success Criteria" },
  "field.ourNextStep": { zh: "我方下一步行動", en: "Our Next Step" },

  // ---- section 10: follow-up ----
  "field.leadStatus": { zh: "潛在客戶狀態", en: "Lead Status" },
  "field.recommendedSolutions": { zh: "推薦方案（可複選）", en: "Recommended Solutions (multi-select)" },
  "field.nextActions": { zh: "下一步行動（可複選）", en: "Next Actions (multi-select)" },
  "field.followupDate": { zh: "追蹤日期", en: "Follow-up Date" },
  "field.contentToSend": { zh: "待傳送內容", en: "Content to Send" },
  "field.internalNotes": { zh: "內部筆記", en: "Internal Notes" },
  "field.closingStrategy": { zh: "成交策略", en: "Closing Strategy" },
  "field.finalVerdict": { zh: "最終結論", en: "Final Verdict" },

  // ---- generic (non-factory) visit editor ----
  "tab.genericQuestions": { zh: "自訂問題", en: "Custom Questions" },
  "generic.objectName": { zh: "對象名稱", en: "Name" },
  "generic.objectNamePlaceholder": { zh: "人名或公司／機構名稱", en: "Person or organization name" },
  "generic.customTopicLabel": { zh: "主題／標題", en: "Topic / Title" },
  "generic.customTopicPlaceholder": {
    zh: "簡短描述這次記錄的內容，方便之後辨識",
    en: "Briefly describe what this record is about, so you recognize it later",
  },
  "generic.date": { zh: "日期", en: "Date" },
  "generic.contactName": { zh: "聯絡人姓名", en: "Contact Name" },
  "generic.contactMethod": { zh: "聯絡方式", en: "Contact Method" },
  "generic.notes": { zh: "筆記", en: "Notes" },
  "generic.noQuestionsYet": { zh: "這個類型還沒有設定問題。", en: "No questions have been set up for this type yet." },
  "generic.goSetupQuestions": { zh: "前往設定自訂問題", en: "Set up custom questions" },
  "generic.nextStepAction": { zh: "下一步行動", en: "Next Step" },
  "generic.unnamed": { zh: "未命名紀錄", en: "Untitled" },

  // ---- templates management ----
  "templates.title": { zh: "自訂問題範本", en: "Custom Question Templates" },
  "templates.intro": {
    zh: "針對非「潛在客戶」的拜訪類型，設定一組固定的問題清單，之後每次建立該類型的紀錄都會沿用同一套問題。",
    en: "For non-“Potential Client” visit types, define a fixed question list once — every new record of that type will reuse the same questions.",
  },
  "templates.notSetUp": { zh: "尚未設定", en: "Not set up" },
  "templates.questionCount": { zh: "個問題", en: "questions" },
  "templates.empty": { zh: "尚未設定任何問題，點下方「新增問題」開始建立。", en: "No questions yet — tap “+ Add Question” below to start." },
  "templates.addQuestion": { zh: "＋ 新增問題", en: "＋ Add Question" },
  "templates.questionLabelZh": { zh: "問題內容（中文）", en: "Question (Chinese)" },
  "templates.questionLabelZhPlaceholder": { zh: "例如：對這個產業的看法？", en: "e.g. What's your view on this industry?" },
  "templates.questionLabelEn": { zh: "問題內容（英文，選填）", en: "Question (English, optional)" },
  "templates.questionLabelEnPlaceholder": { zh: "e.g. What's your view on this industry?", en: "e.g. What's your view on this industry?" },
  "templates.fieldType": { zh: "欄位類型", en: "Field Type" },
  "templates.options": { zh: "選項（用逗號分隔）", en: "Options (comma-separated)" },
  "templates.optionsPlaceholder": { zh: "例如：很滿意, 普通, 不滿意", en: "e.g. Very satisfied, Neutral, Not satisfied" },
  "templates.maxRating": { zh: "最高分數", en: "Max Rating" },
  "templates.moveUp": { zh: "上移", en: "Move up" },
  "templates.moveDown": { zh: "下移", en: "Move down" },
  "templates.confirmDelete": { zh: "確定要刪除這個問題嗎？", en: "Delete this question?" },

  // ---- print / export ----
  "print.saveAsPdf": { zh: "列印／儲存為 PDF", en: "Print / Save as PDF" },
  "print.backToEdit": { zh: "← 返回編輯", en: "← Back to edit" },
  "print.visitDate": { zh: "拜訪日期：", en: "Visit date: " },
  "print.icpTotal": { zh: "ICP 總分：", en: "ICP total: " },
  "print.date": { zh: "日期：", en: "Date: " },
  "print.section.basics": { zh: "1. 基本資料", en: "1. Basics" },
  "print.section.processMap": { zh: "2. 流程地圖", en: "2. Process Map" },
  "print.section.scheduler": { zh: "3. 排程 (Scheduler)", en: "3. Scheduler" },
  "print.section.cad": { zh: "4. CAD Intelligence／報價", en: "4. CAD Intelligence / Quoting" },
  "print.section.procurement": { zh: "5. 採購／文件／物流", en: "5. Procurement / Documentation / Logistics" },
  "print.section.aiReadiness": { zh: "6. AI 接受度／導入條件", en: "6. AI Readiness / Adoption Conditions" },
  "print.section.icpScore": { zh: "7. ICP／潛在客戶評分", en: "7. ICP / Lead Scoring" },
  "print.section.demo": { zh: "8. Demo 反應紀錄", en: "8. Demo Reaction Log" },
  "print.section.dataPoc": { zh: "9. 資料收集／PoC 範圍", en: "9. Data Collection / PoC Scope" },
  "print.section.followup": { zh: "10. Follow-up", en: "10. Follow-up" },
  "print.section.genericBasics": { zh: "基本資料", en: "Basics" },
  "print.section.genericQuestions": { zh: "自訂問題", en: "Custom Questions" },
  "print.section.genericFollowup": { zh: "Follow-up", en: "Follow-up" },
  "print.total": { zh: "總分", en: "Total" },
  "print.noQuestions": { zh: "尚未設定問題", en: "No questions set up yet" },

  // ---- a few print-only label variants ----
  "field.aiToolsDetail": { zh: "使用細節", en: "Usage Details" },
  "field.customizationDescription": { zh: "客製化說明", en: "Customization Description" },
  "field.erpBrand": { zh: "ERP 品牌", en: "ERP Brand" },

  // ---- leads ----
  "leads.title": { zh: "名單", en: "Leads" },
  "leads.new": { zh: "＋ 新增名單", en: "＋ New Lead" },
  "leads.empty": { zh: "尚無名單", en: "No leads yet" },
  "leads.confirmDelete": { zh: "確定要刪除這筆名單嗎？此動作無法復原。", en: "Delete this lead? This cannot be undone." },
  "leads.noFollowup": { zh: "尚未安排跟進", en: "No follow-up scheduled" },
  "leads.field.companyName": { zh: "公司名稱", en: "Company Name" },
  "leads.field.industryType": { zh: "產業類型", en: "Industry Type" },
  "leads.field.address": { zh: "地址", en: "Address" },
  "leads.field.phone": { zh: "電話", en: "Phone" },
  "leads.field.email": { zh: "Email", en: "Email" },
  "leads.field.productType": { zh: "產品類型", en: "Product Type" },
  "leads.field.customQuotePotential": { zh: "是否可能有客製報價", en: "Custom Quote Potential" },
  "leads.field.schedulingPainPotential": { zh: "是否可能有排程痛點", en: "Scheduling Pain Potential" },
  "leads.field.contactStatus": { zh: "聯絡狀態", en: "Contact Status" },
  "leads.field.correctContact": { zh: "正確窗口", en: "Correct Contact" },
  "leads.field.nextFollowupDate": { zh: "下次跟進時間", en: "Next Follow-up" },
  "leads.field.notes": { zh: "備註", en: "Notes" },
  "leads.field.scriptUsed": { zh: "所使用 Script", en: "Script Used" },
  "leads.notSure": { zh: "不確定", en: "Not sure" },
} as const satisfies Record<string, Entry>;

export type DictKey = keyof typeof dict;

export function translate(key: DictKey, locale: Locale): string {
  return dict[key][locale];
}
