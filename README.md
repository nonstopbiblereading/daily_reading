# 每日讀經 · 每天兩章

每月一份讀經進度,每天兩章。純靜態網頁,無需建置與伺服器,打開 `index.html` 即可使用。

**線上版**:https://nonstopbiblereading.github.io/daily_reading/

## 目前收錄

| 月份 | 主題 | 天數 | 背景補充 |
|------|------|------|----------|
| 2026 年 9 月 | 福音如何跨越界線、又如何改變我 | 30 天 60 章 | 162 則 |
| 2026 年 10 月 | 信心如何落地、恩典如何醫治 | 31 天 62 章 | 175 則 |

首頁網址固定不變,預設開啟「今天所在的月份」,沒有就開最新的一個。導覽列左側的月份選單可以切換,切換後網址會帶上 `?m=YYYY-MM`,可直接分享某個月份。

## 頁面

- **本月進度**(`index.html`):月曆總覽,每格顯示當天兩章與主題。可標記已讀,進度以 `localStorage` 保存,每個月分開記。
- **每日內容**(`day.html?m=YYYY-MM&d=N`):六個區塊,可用吸頂頁籤快速切換。
- **背景索引**(`background.html?m=YYYY-MM`):把整月的背景補充集中一頁,可依歷史/地理/人物/文化風俗篩選。

## 每日的六個區塊

| # | 區塊 | 內容 |
|---|------|------|
| ① | 經文重點 | 當天兩章的分段脈絡與節數出處 |
| ② | 亮點經句 | 和合本原文,附「為什麼標記它」 |
| ③ | 讀經心得 | 讀進去之後的思考 |
| ④ | 反思問題 | 三個沒有標準答案、留給自己回答的問題 |
| ⑤ | 今日應用 | 一句總結 + 三個可執行步驟 |
| ⑥ | 背景補充 | 該日經文需要先知道的歷史、地理、人物、文化風俗 |

同一段經文在不同日子重複出現時(例如 9/24 與 10/1 都讀雅各書 1–2),內容會換角度,並在心得中註明對照的日期。

## 新增一個月份

1. 建立資料夾 `data/YYYY-MM/`,放入五個檔案:

   ```
   plan.js        月份主檔(key、label、title、sub、outline)
   days-01.js     1–10 日
   days-11.js     11–20 日
   days-21.js     21 日到月底
   questions.js   反思問題
   ```

   可直接複製 `data/2026-10/` 當範本。

2. 在 [`data/months.js`](data/months.js) 加一行:

   ```js
   { key: "2026-11", label: "2026 年 11 月" },
   ```

月曆的星期排列、天數、每日頁的上下頁都會依月份自動計算。

> 若同時改了 `css/style.css`、`js/common.js` 或 `data/months.js`,請把三個 HTML 檔裡的 `?v=` 版本號一起改掉。GitHub Pages 會快取靜態檔約 10 分鐘,不改版本號的話,回訪的讀者可能拿到新 HTML 配舊 JS,頁面會壞掉。

## 資料格式

每一天是 `days-*.js` 裡的一個物件:

```js
{ d:1, ref:"雅各書 1；雅各書 2", short:"雅 1–2", theme:"讓忍耐做完它的工",
  points:  [{ t:小標, r:出處, p:說明 }],
  verses:  [{ q:經文, r:出處, why:為什麼標記 }],
  reflect: [段落…],
  apply:   { aim:一句總結, steps:[三個步驟] },
  bg:      [{ k:"history|place|person|custom", n:名稱, p:說明, refs:[], link:{} }] }
```

反思問題放在 `questions.js`,以日期為鍵:`window.QUESTIONS = { 1:[…三題], 2:[…] }`。

## 與歷史地理工具的串接

部分背景條目會連到 [bible_explorer](https://github.com/nonstopbiblereading/bible_explorer) 系列的地圖、人物網、時間軸與旅程頁。連結寫在資料裡的 `link.href`,格式為「站台代號:路徑」:

```js
link:{ href:"paul:map.html",         label:"在地圖上看腓立比" }
link:{ href:"paul:timeline.html",    label:"在時間軸看保羅與羅馬皇帝" }
link:{ href:"abraham:",              label:"看亞伯拉罕的旅程與應許" }
link:{ href:"exodus:",               label:"看出埃及主題的路線與西奈山" }
```

站台代號對應表定義在 [`js/common.js`](js/common.js) 的 `SITES`(`hub` / `paul` / `jesus` / `abraham` / `exodus`),要換網域只需改那一處。

## 檔案結構

```
index.html              月曆總覽
day.html                每日內容
background.html         背景索引
css/style.css           樣式(深/淺色主題)
js/common.js            月份載入、導覽列、主題、進度、外站連結解析
data/months.js          月份清單
data/2026-09/           九月資料
data/2026-10/           十月資料
```

每一頁只會載入當前月份的資料,月份再多也不會拖慢頁面。

## 說明

經文引用和合本(公共領域)。背景資料為主流研經之近似整理,年代與地望學界略有出入;心得與應用屬個人領受,僅供參考。
