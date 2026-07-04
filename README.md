# Manufacturing AI Discovery Notes

工廠拜訪訪談筆記 — 給 Next-Gen Manufacturing OS 業務開發使用的行動優先數位表單，取代紙本訪談筆記模板。單人使用，手機／平板為主要操作介面，欄位自動儲存。

## 技術棧

- Next.js 15 (App Router) + TypeScript + Tailwind CSS
- Supabase（資料庫 + Auth，`@supabase/supabase-js` + `@supabase/ssr`）
- 部署目標：Vercel

## 本地啟動步驟

### 1. 建立 Supabase 專案

到 [supabase.com](https://supabase.com) 建立一個新專案（免費方案即可）。

### 2. 執行資料庫 migration

打開 Supabase 專案的 **SQL Editor**，貼上並執行 `supabase/migrations/0001_init.sql` 的完整內容。這個檔案是 idempotent 的，重複執行也不會出錯。它會：

- 建立 `visits` 資料表（含所有欄位、check constraints、`score_total` 的 generated column）
- 建立 `updated_at` 自動更新的 trigger
- 建立必要的索引（`user_id`、`company_name`、`lead_status`、`score_total`、`visit_date`）
- 開啟 Row Level Security，並建立「只能存取自己資料」的政策

### 3. 建立你的登入帳號

這是單人使用的工具，沒有註冊頁面。到 Supabase Studio 的 **Authentication → Users → Add user**，直接建立一組 email/密碼（記得勾選 Auto Confirm User，這樣不用收驗證信就能登入）。

### 4. 設定環境變數

```bash
cp .env.local.example .env.local
```

到 Supabase 專案的 **Settings → API**，把 `Project URL` 和 `anon public` key 填入 `.env.local`：

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
```

### 5. 安裝套件並啟動

```bash
npm install
npm run dev
```

打開 http://localhost:3000，會自動導向 `/login`，用步驟 3 建立的帳號登入即可。

## 部署到 Vercel

把 repo 推上 GitHub 後在 Vercel 匯入專案，設定同樣的兩個環境變數（`NEXT_PUBLIC_SUPABASE_URL`、`NEXT_PUBLIC_SUPABASE_ANON_KEY`），即可部署。

## 專案結構重點

- `supabase/migrations/0001_init.sql` — 完整資料庫 schema
- `lib/enums.ts` — 所有 enum 的 `{ value, label_zh }` 對照表，UI 一律顯示 `label_zh`
- `lib/types.ts` — `Visit` TypeScript 型別
- `components/visit/VisitAutosaveProvider.tsx` — 自動儲存核心邏輯（800ms debounce + blur 立即儲存 + 離線重試）
- `components/visit/sections/*` — 10 個分頁對應紙本模板的 10 個區塊
- `app/visits/[id]/print/page.tsx` — 唯讀列印／匯出 PDF 版面

## 與原始需求文件的落差說明

原始需求文件中有幾處貼上時文字明顯毀損或前後矛盾，以下是我的判斷與處理方式：

1. **`document_time_tags`**：文件開頭的摘要清單與第 5 節欄位定義列出的選項不一致（摘要清單看起來被截斷）。我採用第 5 節較完整的 8 個選項（`purchase_order`、`shipping_order`、`customs_declaration`、`packing_list`、`invoice`、`reconciliation`、`client_docs`、`supplier_docs`），並為 `customs_declaration`（原文亂碼）補上「報關文件」這個合理的繁中標籤。
2. **`company_size` 標籤**：摘要清單這段文字被截斷成「com, 100-200=100–200人」，我依常理補上完整 5 個級距：20人以下／20–50人／50–100人／100–200人／200人以上。
3. **`erp_bra` 欄位**：判斷為 `erp_brand`（ERP 品牌／名稱，文字欄位），只在「現有系統」勾選 ERP 時顯示。
4. **`poc_success_ide_contact` 欄位**：原文字串明顯是打字/貼上時黏在一起的殘缺欄位名，我以最合理的單一欄位詮釋為 `poc_success_criteria`（PoC 成功標準）。
5. **`next_actions`**：文件開頭摘要清單的這段內容跟 `final_verdict` 的值混在一起（明顯貼上錯誤）。我採用第 10 節欄位定義的 7 個選項（`send_deck`、`send_demo_video`、`schedule_2nd_meeting`、`get_test_data`、`write_poc_report`、`send_quote`、`pitch_to_owner`），並自行撰寫合理的繁中標籤（摘要清單沒提供對應標籤）。
6. **`concerns`**（原文誤植為 `conces`）：判斷為 AI 導入顧慮的多選欄位。
7. **`available_data_types`** 中的 `routing_rules`／`capacity_assumptions`／`factory_floor_notes` 三項，原文標籤本身就是英文（Routing rules / Capacity assumptions / Notes from factory floor），我依照原文字面保留英文，沒有另外翻譯。
8. **ICP 評分欄位（0–10 / 0–5 分）** 沒有用類似星等的圓圈點選 UI，而是用「−／數字／＋」的步進器：11 個評分項目如果每項都排一列 11 顆圓圈，在手機寬度上會很難點按，步進器比較符合「手機單手操作」的需求。1–5 分的量表欄位（如 `scheduler_pain_intensity` 等）則照需求用可點選圓圈呈現。
9. Dashboard 採用卡片清單（非傳統 HTML `<table>`），原因同上——這是手機為主的工具，卡片在窄螢幕上比表格好操作，功能上仍支援依分數／日期排序、依狀態與分級篩選、依公司名稱搜尋。
10. 沒有註冊頁面（`/login` 只有登入表單），因為是單人工具；帳號直接在 Supabase Studio 後台建立（見上方步驟 3）。
11. 專案目錄名稱含中文與空格，`create-next-app` 的 npm 套件命名檢查會擋掉，所以改為手動撰寫 `package.json`／`next.config.mjs`／`tailwind.config.ts` 等設定檔，功能上與 `create-next-app` 產生的專案等價。
