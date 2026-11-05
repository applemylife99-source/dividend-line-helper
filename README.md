# 領錢錢｜每月配息回報

繁體中文、手機與桌機適用的 LINE 回報文字工具。純靜態 HTML / CSS / JavaScript，無後端、免安裝套件。

## 功能

- 投入資金、目前價值以「萬」輸入與回報（例如 100 → 100萬、108.25 → 108.25萬）。本月領息、累積領息維持「元」。
- 可切換「單位累積」：投入資金、目前價值、本月累積單位。
- ＋新增任意張保單，各張獨立設定格式，選填保單名稱。
- 多張未命名保單會自動以「保單 1」等編號區分，單張留白不顯示名稱。
- 開場、預計配息入帳日、本月概況、自薦、招募可編輯；空白項目自動省略。
- 共用入帳日放在所有保單資訊之後、市場概況之前，例如「預計配息入帳日：11月15日 前」；只需輸入日期，系統會自動加上「前」。
- 共用文案以 localStorage 保存在目前瀏覽器，夥伴可各自編輯，不會互相覆蓋。
- 保單名稱與金額僅在頁面記憶體中，重新整理或關閉即清空，不會儲存或上傳。
- 自動千分位，單位小數不經浮點數運算、不會被捨入。
- 複製時驗證目前格式使用的欄位，金額或單位允許 0；不完整資料不會複製。
- 「下一位客戶」保留共用文案；未複製先提示，清空後 12 秒內可復原。
- 瀏覽器不支援剪貼簿時，提供手動全選複製。

## 使用

1. 進入「每月共用文案」，填寫預計配息入帳日、貼上當月市場文字，將自薦與招募中的署名改成自己的名字。
2. 在「保單資料」輸入客戶數字：投入資金與目前價值填「萬」，領息金額填「元」；需要時新增保單或切換為單位累積。
3. 查看預覽，按「複製完整訊息」再貼到 LINE。
4. 按「下一位客戶」，輸入下一組數字。

預設市場文字為空白。範例原稿的歷史行情不會被當成最新市場資訊。
本工具只整理輸入內容，不抓取行情、不計算投資報酬、不自動發送 LINE。

## 部署 GitHub Pages

1. 建立新的 repository，例如 `dividend-line-helper`（避免放進既有工具專案）。
2. 將本專案檔案放入 `main` 分支，包含 `.github/workflows/pages.yml`、`dist/`、`tests/`。
3. 在 repository 的 **Settings → Pages → Build and deployment → Source** 選擇 **GitHub Actions**。
4. 在 **Actions → Deploy GitHub Pages → Run workflow** 啟動部署，完成後開啟該次 deployment 回傳的網址即可分享給團隊。

所有資源使用相對路徑，支援 GitHub Pages repository 子路徑。Pages 的可用性依 GitHub 方案與倉庫可見性而定。
官方工作流程說明：https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages

## 本機開發與測試

用任意靜態 HTTP server 將 `dist/` 作為網站根目錄；請透過 HTTP 開啟，勿直接雙擊 HTML（ES modules 需要 HTTP）。

```sh
python3 -m http.server 8080 --directory dist
node --test tests/*.test.mjs
```

需要現代瀏覽器。剪貼簿在 HTTPS 或 localhost 上最可靠；失敗時會提供手動複製。
程式無外部字型、圖片、追蹤碼或 API 請求，執行時僅載入本站靜態檔案。

## 檔案

- `dist/index.html`：頁面結構與對話框。
- `dist/styles.css`：響應式介面。
- `dist/app.js`：輸入、儲存共用文案、剪貼簿與換客戶操作。
- `dist/core.mjs`：數字正規化、訊息組裝與驗證。
- `tests/core.test.mjs`：格式、精度與混合保單測試。
- `.github/workflows/pages.yml`：GitHub Pages 部署設定。
- `.openai/hosting.json`：Sites 部署識別；GitHub Pages 不會上傳此檔。
