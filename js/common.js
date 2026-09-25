// ── 共用:月份載入、主題、導覽列、進度記錄、渲染工具 ──────

// -- 外部參照:聖經歷史地理人物工具(bible_explorer 系列) --
// hub: https://github.com/nonstopbiblereading/bible_explorer
const SITES = {
  hub:     "https://nonstopbiblereading.github.io/bible_explorer/",
  paul:    "https://nonstopbiblereading.github.io/paul_journey/",
  jesus:   "https://nonstopbiblereading.github.io/jesus_life/",
  abraham: "https://nonstopbiblereading.github.io/abraham_journey/",
  exodus:  "https://nonstopbiblereading.github.io/exodus-journey/",
};
// 背景補充的 link.href 寫成「站台:路徑」,例如 "paul:map.html"、"abraham:"
function routeUrl(token) {
  const i = String(token).indexOf(":");
  const site = i < 0 ? "hub" : token.slice(0, i);
  const path = i < 0 ? token : token.slice(i + 1);
  return (SITES[site] || SITES.hub) + path;
}

(function () {
  let saved = "dark";
  try { saved = localStorage.getItem("br-theme") || "dark"; } catch (e) {}
  document.documentElement.setAttribute("data-theme", saved);
})();
function toggleTheme() {
  const html = document.documentElement;
  const next = html.getAttribute("data-theme") === "light" ? "dark" : "light";
  html.setAttribute("data-theme", next);
  try { localStorage.setItem("br-theme", next); } catch (e) {}
}

// ── 月份 ────────────────────────────────────────────────
// 網址帶 ?m=YYYY-MM 就開那個月;沒帶就開今天所在的月份,沒有則開最新的。
let MONTH_KEY = null;

function pickMonth() {
  const q = new URLSearchParams(location.search).get("m");
  if (q && MONTHS.some(m => m.key === q)) return q;
  const t = new Date();
  const now = `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}`;
  if (MONTHS.some(m => m.key === now)) return now;
  return MONTHS[MONTHS.length - 1].key;
}
function monthNum() { return Number(MONTH_KEY.split("-")[1]); }
function monthYear() { return Number(MONTH_KEY.split("-")[0]); }
// 站內連結都要帶著月份走
function withMonth(href, key) {
  return href + (href.includes("?") ? "&" : "?") + "m=" + (key || MONTH_KEY);
}

function inject(src) {
  return new Promise((ok, fail) => {
    const s = document.createElement("script");
    s.src = src;
    s.onload = ok;
    s.onerror = () => fail(new Error("載入失敗:" + src));
    document.head.appendChild(s);
  });
}
const MONTH_FILES = ["days-01", "days-11", "days-21", "questions"];

// 每頁的進入點:決定月份 → 載入該月資料 → 畫導覽列
async function boot(active) {
  MONTH_KEY = pickMonth();
  try {
    await inject(`data/${MONTH_KEY}/plan.js`);
    await Promise.all(MONTH_FILES.map(f => inject(`data/${MONTH_KEY}/${f}.js`)));
  } catch (e) {
    document.body.insertAdjacentHTML("afterbegin",
      `<p style="padding:20px;color:var(--red)">${e.message}</p>`);
    throw e;
  }
  PLAN.days.sort((a, b) => a.d - b.d);
  renderNav(active);
  return PLAN;
}

// 切換月份:每日頁內容整個不同,所以回該月總覽;其他頁留在原頁
function switchMonth(key) {
  const page = location.pathname.split("/").pop() || "index.html";
  const target = page === "day.html" ? "index.html" : page;
  location.href = withMonth(target, key);
}

function renderNav(active) {
  const links = [
    ["index.html", "本月進度", "home"],
    ["day.html?d=1", "每日內容", "day"],
    ["background.html", "背景索引", "bg"],
  ];
  const opts = MONTHS.map(m =>
    `<option value="${m.key}"${m.key === MONTH_KEY ? " selected" : ""}>${m.label}</option>`).join("");
  document.getElementById("nav-slot").innerHTML = `<nav class="nav">
    <a class="nav-brand" href="${withMonth("index.html")}">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H19v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H19v3H6.5"/></svg>
      每日讀經
    </a>
    <label class="m-pick" title="切換月份">
      <span class="sr">月份</span>
      <select onchange="switchMonth(this.value)" aria-label="切換月份">${opts}</select>
    </label>
    <span class="nav-links">
      ${links.map(([href, label, key]) =>
        `<a href="${withMonth(href)}" class="${key === active ? "active" : ""}">${label}</a>`).join("")}
      <a href="${SITES.hub}" target="_blank" rel="noopener" title="開啟聖經歷史地理人物工具">歷史地理工具 ↗</a>
    </span>
    <button class="theme-btn" onclick="toggleTheme()" aria-label="切換深淺色主題" title="切換深淺色">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
    </button>
  </nav>`;
}
function renderFooter() {
  document.getElementById("footer-slot").innerHTML =
    `<footer class="site">每日讀經 · ${PLAN.label}　經文引用和合本(公共領域);背景資料為主流研經之近似整理,年代與地望學界略有出入。<br>「背景補充」與 <a href="${SITES.hub}" target="_blank" rel="noopener">聖經歷史地理人物工具</a> 互相參照。</footer>`;
}

// ── 進度(localStorage,每個月分開記) ──
function doneKey() { return "read-done-" + MONTH_KEY; }
function getDone() {
  try { return JSON.parse(localStorage.getItem(doneKey())) || {}; }
  catch (e) { return {}; }
}
function setDone(d, val) {
  const m = getDone();
  if (val) m[d] = 1; else delete m[d];
  try { localStorage.setItem(doneKey(), JSON.stringify(m)); } catch (e) {}
}
function isDone(d) { return !!getDone()[d]; }
function doneCount() { return Object.keys(getDone()).length; }

// ── 小工具 ──
function refsHtml(refs) {
  return (refs || []).map(r => `<span class="ref">${r}</span>`).join("");
}
const TAG_LABEL = { person:"人物", place:"地理", history:"歷史", custom:"文化風俗" };
function getDay(n) { return PLAN.days.find(x => x.d === Number(n)); }
function weekday(n) { return new Date(monthYear(), monthNum() - 1, n).getDay(); }
function md(n) { return `${monthNum()}/${n}`; }
const WD = ["日", "一", "二", "三", "四", "五", "六"];
