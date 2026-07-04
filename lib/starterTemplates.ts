// Starter question sets seeded the first time a non-factory template is
// created (see app/templates/[type]/page.tsx). These are an interview log,
// not a planning form: every question records what the OTHER PERSON asked,
// said, or reacted with — mirroring the factory template's Demo Reaction Log
// section — never the user's own plans. Ratings are the one exception:
// those are the user's own read on the other person's reaction, same as
// scheduler_pain_intensity / ai_acceptance_score in the factory template.
// Users can freely edit/delete/reorder these afterward via /templates/[type].

export type StarterQuestion = {
  label: string;
  label_en: string;
  field_type: "text" | "textarea" | "checklist" | "rating";
  options: { value: string; label_zh: string; label_en: string }[] | null;
  max_rating: number;
};

function opt(label_zh: string, label_en: string) {
  return { value: label_zh, label_zh, label_en };
}

export const STARTER_TEMPLATES: Record<string, StarterQuestion[]> = {
  investor: [
    {
      label: "投資人問了哪些問題",
      label_en: "What questions did the investor ask",
      field_type: "textarea",
      options: null,
      max_rating: 5,
    },
    {
      label: "投資人在意的重點",
      label_en: "What the investor focused on / cared about",
      field_type: "textarea",
      options: null,
      max_rating: 5,
    },
    {
      label: "投資人提出的疑慮或反對意見",
      label_en: "Concerns or objections raised",
      field_type: "textarea",
      options: null,
      max_rating: 5,
    },
    {
      label: "投資人的興趣程度",
      label_en: "Investor's level of interest",
      field_type: "rating",
      options: null,
      max_rating: 5,
    },
    {
      label: "投資人提到的類似案例或競品",
      label_en: "Similar deals / competitors they mentioned",
      field_type: "textarea",
      options: null,
      max_rating: 5,
    },
    {
      label: "投資人要求的後續資料",
      label_en: "Follow-up materials they asked for",
      field_type: "textarea",
      options: null,
      max_rating: 5,
    },
    {
      label: "投資人的下一步／時間表",
      label_en: "Next steps or timeline they stated",
      field_type: "text",
      options: null,
      max_rating: 5,
    },
  ],

  advisor: [
    {
      label: "顧問問了哪些問題",
      label_en: "What questions did the advisor ask",
      field_type: "textarea",
      options: null,
      max_rating: 5,
    },
    {
      label: "顧問給的關鍵建議",
      label_en: "Key advice they gave",
      field_type: "textarea",
      options: null,
      max_rating: 5,
    },
    {
      label: "顧問提出的疑慮",
      label_en: "Concerns they raised",
      field_type: "textarea",
      options: null,
      max_rating: 5,
    },
    {
      label: "建議的急迫性／可行性",
      label_en: "Urgency / feasibility of their advice",
      field_type: "rating",
      options: null,
      max_rating: 5,
    },
    {
      label: "顧問是否有推薦人脈或資源",
      label_en: "Did they offer to refer contacts or resources",
      field_type: "checklist",
      options: [opt("有", "Yes"), opt("沒有", "No"), opt("待確認", "To be confirmed")],
      max_rating: 5,
    },
    {
      label: "顧問提到的類似案例",
      label_en: "Similar cases they mentioned",
      field_type: "textarea",
      options: null,
      max_rating: 5,
    },
    {
      label: "後續追蹤事項",
      label_en: "Follow-up items",
      field_type: "textarea",
      options: null,
      max_rating: 5,
    },
  ],

  consultant: [
    {
      label: "顧問問了哪些問題",
      label_en: "What questions did the consultant ask",
      field_type: "textarea",
      options: null,
      max_rating: 5,
    },
    {
      label: "顧問的專業建議／方案",
      label_en: "Their professional advice / proposal",
      field_type: "textarea",
      options: null,
      max_rating: 5,
    },
    {
      label: "顧問提出的風險或疑慮",
      label_en: "Risks or concerns they raised",
      field_type: "textarea",
      options: null,
      max_rating: 5,
    },
    {
      label: "專業度／可信度評分",
      label_en: "Professionalism / credibility rating",
      field_type: "rating",
      options: null,
      max_rating: 5,
    },
    {
      label: "顧問報價／費用結構",
      label_en: "What they quoted / fee structure",
      field_type: "text",
      options: null,
      max_rating: 5,
    },
    {
      label: "顧問提到的類似案例",
      label_en: "Similar cases they mentioned",
      field_type: "textarea",
      options: null,
      max_rating: 5,
    },
    {
      label: "後續行動",
      label_en: "Next steps",
      field_type: "textarea",
      options: null,
      max_rating: 5,
    },
  ],

  senior_engineer: [
    {
      label: "工程師問了哪些技術問題",
      label_en: "What technical questions did they ask",
      field_type: "textarea",
      options: null,
      max_rating: 5,
    },
    {
      label: "工程師的技術回饋／建議",
      label_en: "Their technical feedback / advice",
      field_type: "textarea",
      options: null,
      max_rating: 5,
    },
    {
      label: "工程師指出的技術風險或疑慮",
      label_en: "Technical risks or concerns they raised",
      field_type: "textarea",
      options: null,
      max_rating: 5,
    },
    {
      label: "技術可行性評估",
      label_en: "Technical feasibility assessment",
      field_type: "rating",
      options: null,
      max_rating: 5,
    },
    {
      label: "工程師對我們技術棧的熟悉度",
      label_en: "Their familiarity with our tech stack",
      field_type: "checklist",
      options: [opt("完全熟悉", "Fully familiar"), opt("部分熟悉", "Partially familiar"), opt("不熟悉", "Not familiar")],
      max_rating: 5,
    },
    {
      label: "工程師的興趣／合作意願",
      label_en: "Their interest in getting involved",
      field_type: "rating",
      options: null,
      max_rating: 5,
    },
    {
      label: "後續行動",
      label_en: "Next steps",
      field_type: "textarea",
      options: null,
      max_rating: 5,
    },
  ],

  // "custom" intentionally has no starter set — stays blank until the user
  // builds it via /templates/custom.
};
