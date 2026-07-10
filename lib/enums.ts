// Central source of truth for every enum used in the app.
// DB stores the English snake_case `value`; UI renders `label_zh`/`label_en`
// depending on the active locale (see lib/i18n).

import type { Locale } from "@/lib/i18n/dictionary";

export type EnumOption = { value: string; label_zh: string; label_en: string };

function optionLabel(opt: EnumOption, locale: Locale): string {
  return locale === "en" ? opt.label_en : opt.label_zh;
}

function labelOf(options: EnumOption[], value: string | null | undefined, locale: Locale = "zh"): string {
  if (!value) return "";
  const opt = options.find((o) => o.value === value);
  return opt ? optionLabel(opt, locale) : value;
}

function labelsOf(options: EnumOption[], values: string[] | null | undefined, locale: Locale = "zh"): string {
  if (!values || values.length === 0) return "";
  const sep = locale === "en" ? ", " : "、";
  return values.map((v) => labelOf(options, v, locale)).join(sep);
}

export const VISIT_METHOD: EnumOption[] = [
  { value: "phone", label_zh: "電話", label_en: "Phone" },
  { value: "onsite", label_zh: "現場", label_en: "On-site" },
  { value: "referral", label_zh: "轉介紹", label_en: "Referral" },
  { value: "other", label_zh: "其他", label_en: "Other" },
];

export const INTERVIEWEE_TITLE: EnumOption[] = [
  { value: "owner", label_zh: "老闆", label_en: "Owner" },
  { value: "successor", label_zh: "二代", label_en: "Successor" },
  { value: "plant_manager", label_zh: "廠長", label_en: "Plant Manager" },
  { value: "production_control", label_zh: "生管", label_en: "Production Control" },
  { value: "procurement", label_zh: "採購", label_en: "Procurement" },
  { value: "sales", label_zh: "業務", label_en: "Sales" },
  { value: "engineering", label_zh: "工程", label_en: "Engineering" },
  { value: "other", label_zh: "其他", label_en: "Other" },
];

export const COMPANY_SIZE: EnumOption[] = [
  { value: "<20", label_zh: "20人以下", label_en: "Under 20" },
  { value: "20-50", label_zh: "20–50人", label_en: "20–50" },
  { value: "50-100", label_zh: "50–100人", label_en: "50–100" },
  { value: "100-200", label_zh: "100–200人", label_en: "100–200" },
  { value: "200+", label_zh: "200人以上", label_en: "200+" },
];

export const INDUSTRY_TYPE: EnumOption[] = [
  { value: "precision_machining", label_zh: "精密加工", label_en: "Precision Machining" },
  { value: "hardware", label_zh: "五金", label_en: "Hardware" },
  { value: "mold", label_zh: "模具", label_en: "Mold / Tooling" },
  { value: "auto_parts", label_zh: "汽機車零組件", label_en: "Auto / Motorcycle Parts" },
  { value: "aerospace", label_zh: "航太零件", label_en: "Aerospace Parts" },
  { value: "semiconductor_supply_chain", label_zh: "半導體供應鏈", label_en: "Semiconductor Supply Chain" },
  { value: "electronic_components", label_zh: "電子零組件", label_en: "Electronic Components" },
  { value: "export_packaging", label_zh: "外銷包裝", label_en: "Export Packaging" },
  { value: "other", label_zh: "其他", label_en: "Other" },
];

export const CURRENT_SYSTEMS: EnumOption[] = [
  { value: "erp", label_zh: "ERP", label_en: "ERP" },
  { value: "excel", label_zh: "Excel", label_en: "Excel" },
  { value: "whiteboard", label_zh: "白板", label_en: "Whiteboard" },
  { value: "paper", label_zh: "紙本", label_en: "Paper" },
  { value: "line_app", label_zh: "Line", label_en: "Line" },
  { value: "verbal_experience", label_zh: "口頭/靠經驗", label_en: "Verbal / Experience-based" },
  { value: "other", label_zh: "其他", label_en: "Other" },
];

export const PROCESS_STAGES = [
  "接單",
  "報價",
  "採購",
  "生產排程",
  "製造",
  "品檢",
  "出貨",
  "文件對帳",
] as const;

// PROCESS_STAGES values are stored verbatim in existing process_map rows,
// so we keep them as the DB "key" and only translate for display.
export const PROCESS_STAGE_EN: Record<string, string> = {
  接單: "Order Intake",
  報價: "Quoting",
  採購: "Procurement",
  生產排程: "Production Scheduling",
  製造: "Manufacturing",
  品檢: "Quality Inspection",
  出貨: "Shipping",
  文件對帳: "Documentation & Reconciliation",
};

export function stageLabel(stage: string, locale: Locale): string {
  return locale === "en" ? PROCESS_STAGE_EN[stage] ?? stage : stage;
}

export const AI_OPPORTUNITY: EnumOption[] = [
  { value: "high", label_zh: "高", label_en: "High" },
  { value: "medium", label_zh: "中", label_en: "Medium" },
  { value: "low", label_zh: "低", label_en: "Low" },
];

export const SCHEDULER_DISRUPTION_TAGS: EnumOption[] = [
  { value: "order_congestion", label_zh: "塞單", label_en: "Order Congestion" },
  { value: "material_shortage", label_zh: "斷料", label_en: "Material Shortage" },
  { value: "machine_breakdown", label_zh: "機台故障", label_en: "Machine Breakdown" },
  { value: "rush_order", label_zh: "插單", label_en: "Rush Order" },
  { value: "understaffed", label_zh: "人手不足", label_en: "Understaffed" },
  { value: "client_change", label_zh: "客戶改單", label_en: "Client Change Request" },
];

export const CAD_BOTTLENECK_TAGS: EnumOption[] = [
  { value: "labor_hours", label_zh: "工時", label_en: "Labor Hours" },
  { value: "material", label_zh: "材料", label_en: "Material" },
  { value: "process", label_zh: "製程", label_en: "Process" },
  { value: "surface_treatment", label_zh: "表面處理", label_en: "Surface Treatment" },
  { value: "tolerance", label_zh: "公差", label_en: "Tolerance" },
  { value: "packaging", label_zh: "包裝", label_en: "Packaging" },
  { value: "testing", label_zh: "測試", label_en: "Testing" },
  { value: "lead_time", label_zh: "交期", label_en: "Lead Time" },
];

export const CAD_PAYMENT_WILLINGNESS: EnumOption[] = [
  { value: "high", label_zh: "高", label_en: "High" },
  { value: "medium", label_zh: "中", label_en: "Medium" },
  { value: "low", label_zh: "低", label_en: "Low" },
  { value: "unclear", label_zh: "看不出來", label_en: "Unclear" },
];

// NOTE: source spec had two conflicting lists for this enum (a 5-value
// summary list and an 8-value field definition list). We used the more
// detailed 8-value field definition list — see deviation notes in README.
export const DOCUMENT_TIME_TAGS: EnumOption[] = [
  { value: "purchase_order", label_zh: "採購單", label_en: "Purchase Order" },
  { value: "shipping_order", label_zh: "出貨單", label_en: "Shipping Order" },
  { value: "customs_declaration", label_zh: "報關文件", label_en: "Customs Declaration" },
  { value: "packing_list", label_zh: "裝箱單", label_en: "Packing List" },
  { value: "invoice", label_zh: "發票", label_en: "Invoice" },
  { value: "reconciliation", label_zh: "對帳", label_en: "Reconciliation" },
  { value: "client_docs", label_zh: "客戶文件", label_en: "Client Documents" },
  { value: "supplier_docs", label_zh: "供應商文件", label_en: "Supplier Documents" },
];

export const DEMO_FEATURES_SHOWN: EnumOption[] = [
  { value: "scheduler", label_zh: "Scheduler AI Worker", label_en: "Scheduler AI Worker" },
  { value: "cad_intelligence", label_zh: "CAD Intelligence", label_en: "CAD Intelligence" },
  { value: "documentation_ai", label_zh: "Documentation AI", label_en: "Documentation AI" },
  { value: "other", label_zh: "其他", label_en: "Other" },
];

export const AVAILABLE_DATA_TYPES: EnumOption[] = [
  { value: "cad_drawings", label_zh: "CAD圖", label_en: "CAD Drawings" },
  { value: "excel_schedule", label_zh: "Excel排程表", label_en: "Excel Schedule" },
  { value: "historical_quotes", label_zh: "歷史報價單", label_en: "Historical Quotes" },
  { value: "work_orders", label_zh: "工單", label_en: "Work Orders" },
  { value: "purchase_orders", label_zh: "採購單", label_en: "Purchase Orders" },
  { value: "shipping_orders", label_zh: "出貨單", label_en: "Shipping Orders" },
  { value: "erp_export", label_zh: "ERP匯出資料", label_en: "ERP Export Data" },
  { value: "machine_list", label_zh: "機台清單", label_en: "Machine List" },
  { value: "routing_rules", label_zh: "Routing rules", label_en: "Routing rules" },
  { value: "capacity_assumptions", label_zh: "Capacity assumptions", label_en: "Capacity assumptions" },
  { value: "factory_floor_notes", label_zh: "Notes from factory floor", label_en: "Notes from factory floor" },
];

export const DATA_SENSITIVITY: EnumOption[] = [
  { value: "low", label_zh: "低", label_en: "Low" },
  { value: "medium", label_zh: "中", label_en: "Medium" },
  { value: "high", label_zh: "高", label_en: "High" },
];

export const LEAD_STATUS: EnumOption[] = [
  { value: "cold", label_zh: "冷", label_en: "Cold" },
  { value: "neutral", label_zh: "普通", label_en: "Neutral" },
  { value: "interested", label_zh: "有興趣", label_en: "Interested" },
  { value: "very_interested", label_zh: "高興趣", label_en: "Very Interested" },
  { value: "ready_to_close", label_zh: "可成交", label_en: "Ready to Close" },
];

export const RECOMMENDED_SOLUTIONS: EnumOption[] = [
  { value: "scheduler", label_zh: "Scheduler", label_en: "Scheduler" },
  { value: "cad_intelligence", label_zh: "CAD Intelligence", label_en: "CAD Intelligence" },
  { value: "documentation_ai", label_zh: "Documentation AI", label_en: "Documentation AI" },
  { value: "procurement_ai", label_zh: "Procurement AI", label_en: "Procurement AI" },
  { value: "freight_forwarder_ai", label_zh: "Freight Forwarder AI", label_en: "Freight Forwarder AI" },
  { value: "custom_workflow", label_zh: "客製化工作流", label_en: "Custom Workflow" },
];

// NOTE: source spec's summary list for next_actions was corrupted (it had
// bled together with final_verdict values). We used the field definition's
// 7-value list and wrote plausible zh-TW labels — see README deviations.
export const NEXT_ACTIONS: EnumOption[] = [
  { value: "send_deck", label_zh: "傳簡報", label_en: "Send Deck" },
  { value: "send_demo_video", label_zh: "傳Demo影片", label_en: "Send Demo Video" },
  { value: "schedule_2nd_meeting", label_zh: "約二次會議", label_en: "Schedule 2nd Meeting" },
  { value: "get_test_data", label_zh: "取得測試資料", label_en: "Get Test Data" },
  { value: "write_poc_report", label_zh: "撰寫PoC報告", label_en: "Write PoC Report" },
  { value: "send_quote", label_zh: "送報價", label_en: "Send Quote" },
  { value: "pitch_to_owner", label_zh: "向老闆提案", label_en: "Pitch to Owner" },
];

export const FINAL_VERDICT: EnumOption[] = [
  { value: "paid_founding_customer", label_zh: "付費創始客戶", label_en: "Paid Founding Customer" },
  { value: "free_poc", label_zh: "免費PoC", label_en: "Free PoC" },
  { value: "design_partner", label_zh: "Design Partner", label_en: "Design Partner" },
  { value: "not_pursuing", label_zh: "暫不追蹤", label_en: "Not Pursuing" },
];

export const CONCERNS: EnumOption[] = [
  { value: "data_security", label_zh: "資料安全", label_en: "Data Security" },
  { value: "staff_resistance", label_zh: "員工抗拒", label_en: "Staff Resistance" },
  { value: "system_complexity", label_zh: "系統複雜度", label_en: "System Complexity" },
  { value: "cost", label_zh: "成本", label_en: "Cost" },
  { value: "owner_distrust", label_zh: "老闆不信任", label_en: "Owner Distrust" },
  { value: "erp_integration", label_zh: "ERP整合", label_en: "ERP Integration" },
  { value: "other", label_zh: "其他", label_en: "Other" },
];

export const ICP_TIERS = [
  { min: 80, max: 100, label_zh: "優先追蹤／付費創始客戶候選", label_en: "Priority / Paid Founding Candidate", color: "emerald" },
  { min: 60, max: 79, label_zh: "免費 PoC／Design Partner", label_en: "Free PoC / Design Partner", color: "blue" },
  { min: 40, max: 59, label_zh: "保持關係暫不優先", label_en: "Maintain Relationship, Not Priority", color: "amber" },
  { min: 0, max: 39, label_zh: "不適合", label_en: "Not a Fit", color: "gray" },
] as const;

export function icpTier(score: number | null | undefined) {
  const s = score ?? 0;
  return ICP_TIERS.find((t) => s >= t.min && s <= t.max) ?? ICP_TIERS[ICP_TIERS.length - 1];
}

export function tierLabel(tier: (typeof ICP_TIERS)[number], locale: Locale): string {
  return locale === "en" ? tier.label_en : tier.label_zh;
}

export const VISIT_TYPES: EnumOption[] = [
  { value: "potential_client", label_zh: "潛在客戶", label_en: "Potential Client" },
  { value: "investor", label_zh: "投資人", label_en: "Investor" },
  { value: "advisor", label_zh: "顧問", label_en: "Advisor" },
  { value: "consultant", label_zh: "外部顧問", label_en: "Consultant" },
  { value: "senior_engineer", label_zh: "資深工程師", label_en: "Senior Engineer" },
  { value: "custom", label_zh: "自訂類型", label_en: "Custom" },
];

// visit_type values that use the generic template-driven editor
// (potential_client keeps the fixed 10-tab factory template).
export const NON_FACTORY_VISIT_TYPES = VISIT_TYPES.filter((t) => t.value !== "potential_client");

export const CONTACT_STATUS: EnumOption[] = [
  { value: "not_contacted", label_zh: "未聯絡", label_en: "Not Contacted" },
  { value: "awaiting_reply", label_zh: "已聯絡待回覆", label_en: "Contacted, Awaiting Reply" },
  { value: "meeting_scheduled", label_zh: "已預約會議", label_en: "Meeting Scheduled" },
  { value: "quoted", label_zh: "已報價", label_en: "Quoted" },
  { value: "closed_won", label_zh: "已成交", label_en: "Closed Won" },
  { value: "not_interested", label_zh: "不考慮", label_en: "Not Interested" },
];

export const QUESTION_FIELD_TYPES: EnumOption[] = [
  { value: "text", label_zh: "單行文字", label_en: "Single-line Text" },
  { value: "textarea", label_zh: "長文字", label_en: "Long Text" },
  { value: "checklist", label_zh: "核選清單", label_en: "Checklist" },
  { value: "rating", label_zh: "評分", label_en: "Rating" },
];

export { labelOf, labelsOf, optionLabel };
