# 每日讀經 · 2026 年 9 月

每天兩章、三十天六十章的讀經工具。純靜態網頁,無需建置與伺服器,打開 `index.html` 即可使用。

**線上版**:https://nonstopbiblereading.github.io/daily_reading_202609/

## 這是什麼

從使徒行傳的外邦大門,走到羅馬書的彼此接納——一條「福音如何跨越界線、又如何改變我」的三十天路線。

- **本月進度**(`index.html`):九月月曆總覽,每格顯示當天兩章與主題。可標記已讀,進度以 `localStorage` 保存。
- **每日內容**(`day.html?d=N`):六個區塊,可用吸頂頁籤快速切換。
- **背景索引**(`background.html`):把全月 162 則背景補充集中一頁,可依歷史/地理/人物/文化風俗篩選。

## 每日的六個區塊

| # | 區塊 | 內容 |
|---|------|------|
| ① | 經文重點 | 當天兩章的分段脈絡與節數出處 |
| ② | 亮點經句 | 和合本原文,附「為什麼標記它」 |
| ③ | 讀經心得 | 讀進去之後的思考 |
| ④ | 反思問題 | 三個沒有標準答案、留給自己回答的問題 |
| ⑤ | 今日應用 | 一句總結 + 三個可執行步驟 |
| ⑥ | 背景補充 | 該日經文需要先知道的歷史、地理、人物、文化風俗 |

「背景補充」是這個工具的重點:第一世紀的地名、官職、幣值、節期與禮俗,不解釋就容易讀過去或讀錯。全月共 162 則,分佈為歷史 41、地理 28、人物 25、文化風俗 68。

## 與歷史地理工具的串接

部分背景條目會連到 [bible_explorer](https://github.com/nonstopbiblereading/bible_explorer) 系列的地圖、人物網與旅程頁。連結寫在資料裡的 `link.href`,格式為「站台代號:路徑」:

```js
link:{ href:"paul:map.html",       label:"在地圖上看腓立比" }
link:{ href:"paul:journey.html?j=4", label:"看第四段旅程" }
link:{ href:"abraham:",             label:"看亞伯拉罕主題" }
```

站台代號對應表定義在 [`js/common.js`](js/common.js) 的 `SITES`(`hub` / `paul` / `jesus` / `abraham` / `exodus`),要換網域只需改那一處。

## 檔案結構

```
index.html          月曆總覽
day.html            每日內容(?d=1..30)
background.html     背景索引
css/style.css       樣式(深/淺色主題)
js/common.js        導覽列、主題切換、進度、外站連結解析
data/plan.js        月份設定與 PLAN 骨架
data/days-01.js     9/1–9/10
data/days-11.js     9/11–9/20
data/days-21.js     9/21–9/30
data/questions.js   反思問題
```

## 改內容

每一天是 `data/days-*.js` 裡的一個物件:

```js
{ d:1, ref:"使徒行傳 10；11", short:"徒 10–11", theme:"福音跨過那道牆",
  points:  [{ t:小標, r:出處, p:說明 }],
  verses:  [{ q:經文, r:出處, why:為什麼標記 }],
  reflect: [段落…],
  apply:   { aim:一句總結, steps:[三個步驟] },
  bg:      [{ k:"history|place|person|custom", n:名稱, p:說明, refs:[], link:{} }] }
```

反思問題另外放在 `data/questions.js`,以日期為鍵。

換月份時修改 `data/plan.js` 的 `month` / `monthLabel`,並替換 `data/days-*.js`。`index.html` 的月曆會依 `month` 自動排列星期。

## 說明

經文引用和合本(公共領域)。背景資料為主流研經之近似整理,年代與地望學界略有出入;心得與應用屬個人領受,僅供參考。
