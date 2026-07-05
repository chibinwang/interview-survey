// Field-interview reference content: what to listen for and what to ask
// during a live factory discovery call, so the interviewer can quickly judge
// whether there's an opening for Everyse / AI Request Intake /
// Quote-to-Scheduler. Rendered via <InterviewHint> at the top of each
// section that maps to one of these signals. Not stored on the Visit record
// itself — this is interviewer guidance, not form data.

export type Bilingual = { zh: string; en: string };

export type InterviewSignal = {
  opportunity: Bilingual;
  listenFor: Bilingual[];
  questions: Bilingual[];
};

export const INTERVIEW_SIGNALS: Record<string, InterviewSignal> = {
  processMap: {
    opportunity: {
      zh: "客戶需求入口碎片化 → AI Request Intake 有機會",
      en: "Fragmented customer request intake → opening for AI Request Intake",
    },
    listenFor: [
      { zh: "客戶都打電話來", en: "“Customers just call us”" },
      { zh: "都用 LINE 傳", en: "“It all comes through LINE”" },
      { zh: "有時候 Email、有時候電話、有時候口頭", en: "“Sometimes email, sometimes phone, sometimes just verbal”" },
      { zh: "圖面都散在不同地方", en: "“Drawings are scattered all over”" },
      { zh: "業務自己記", en: "“Sales just keeps their own notes”" },
      { zh: "有時候寫紙上", en: "“Sometimes it's written on paper”" },
    ],
    questions: [
      { zh: "客戶需求通常怎麼進來？（電話、LINE、Email、圖面…）", en: "How do customer requests usually come in? (phone, LINE, email, drawings…)" },
      { zh: "同一個案件的資料最後會集中在哪裡？", en: "Where does all the info for one case end up living?" },
      { zh: "有沒有發生過客戶講過，但內部沒記到？", en: "Has a customer ever said something that never got recorded internally?" },
    ],
  },

  scheduler: {
    opportunity: {
      zh: "排程不是 profit-aware，只靠交期和經驗硬排 → Scheduler AI 有機會",
      en: "Scheduling isn't profit-aware, just deadline + experience-driven → opening for Scheduler AI",
    },
    listenFor: [
      { zh: "排程用 Excel、白板或主管經驗", en: "Scheduling runs on Excel, a whiteboard, or a manager's gut" },
      { zh: "插單常常打亂原本排程", en: "“Rush orders always throw off the schedule”" },
      { zh: "機台、材料、人力常變成瓶頸", en: "Machines, materials, or staffing are recurring bottlenecks" },
    ],
    questions: [
      { zh: "現在排程是用 ERP、Excel、白板，還是主管經驗？", en: "Is scheduling currently done in ERP, Excel, a whiteboard, or by a manager's experience?" },
      { zh: "最常造成排程變動的是什麼？", en: "What most often causes the schedule to change?" },
      { zh: "你們會不會根據訂單毛利來決定優先順序？", en: "Do you prioritize orders based on their margin?" },
    ],
  },

  cad: {
    opportunity: {
      zh: "報價前常缺資料，且報價錯誤曾造成實際損失 → AI Request Intake + Margin-Protected Quotation 有價值",
      en: "Quotes are missing info up front, and pricing mistakes have caused real losses → opening for AI Request Intake + Margin-Protected Quotation",
    },
    listenFor: [
      { zh: "常常要再問客戶", en: "“We often have to go back and ask the customer again”" },
      { zh: "圖面不完整 / 材質沒講清楚", en: "Incomplete drawings / material not specified" },
      { zh: "有時候報太低，後來才發現不划算", en: "“Sometimes we quote too low and realize later it wasn't worth it”" },
      { zh: "客戶改規格但價格沒改", en: "“Customer changes the spec but the price doesn't change”" },
      { zh: "表面處理、包裝、運費、檢驗成本漏算", en: "Surface treatment, packaging, freight, or inspection costs get missed" },
    ],
    questions: [
      { zh: "報價前一定要確認哪些欄位？哪些最常漏？", en: "What fields must be confirmed before quoting? Which ones most often get missed?" },
      { zh: "有沒有發生過做完才發現這張單其實沒什麼賺，或一開始有些成本沒算進去？", en: "Has an order ever turned out to be barely profitable, or had costs left out of the original quote?" },
      { zh: "客戶改規格時，價格會不會跟著更新？", en: "When a customer changes the spec, does the price get updated to match?" },
    ],
  },

  procurement: {
    opportunity: {
      zh: "ERP 只是記錄工具，不是決策工具 → Everyse 可做 ERP 上層的 AI execution layer",
      en: "ERP is just a record-keeper, not a decision tool → opening for Everyse as an AI execution layer on top of ERP",
    },
    listenFor: [
      { zh: "ERP 有資料，但還是要人工查", en: "“The data's in ERP, but someone still has to look it up manually”" },
      { zh: "很多還是在 Excel", en: "“A lot of it is still in Excel”" },
      { zh: "ERP 不好用 / 資料要匯出來整理", en: "“ERP is clunky” / data has to be exported and reorganized" },
      { zh: "現場不太用 ERP，只有財務或行政在用", en: "The shop floor barely touches ERP — only finance or admin use it" },
    ],
    questions: [
      { zh: "你們現在用什麼 ERP？哪些流程明明 ERP 有，但大家還是用 Excel？", en: "What ERP do you use? Which processes exist in ERP but people still use Excel for?" },
      { zh: "ERP 資料查詢會不會麻煩？現場人員會直接用 ERP 嗎？", en: "Is pulling data out of ERP a hassle? Do shop-floor staff use ERP directly?" },
    ],
  },

  aiReadiness: {
    opportunity: {
      zh: "測試對方對解方的反應，判斷導入門檻與付費意願",
      en: "Test their reaction to the proposed solution to gauge adoption threshold and willingness to pay",
    },
    listenFor: [
      { zh: "對「先不報價、只補齊資訊」的反應", en: "Reaction to the idea of AI helping before quoting even happens" },
    ],
    questions: [
      {
        zh: "如果這些資訊可以在一開始就被整理成標準格式，並且自動提醒缺少哪些報價資訊，你覺得這對你們有幫助嗎？",
        en: "If this information could be organized into a standard format from the start, with automatic reminders for missing quote info, would that help you?",
      },
    ],
  },
};
