import { daysSince, escapeHTML, money } from "./format.js";

export function renderOverview(analytics) {
  const cards = [
    { label: "Total Revenue", value: money(analytics.totalRevenue), note: "Lifetime product sales", icon: "$" },
    { label: "Fastest Moving Item", value: analytics.fastest?.name || "—", note: `${analytics.fastest?.unitsSold || 0} units sold`, icon: "↗" },
    { label: "Slowest Moving Item", value: analytics.slowest?.name || "—", note: `${daysSince(analytics.slowest?.lastSoldAt) ?? "—"} days since last purchase`, icon: "↘", gold: true },
    { label: "Capital Tied Up", value: money(analytics.tiedUpCapital), note: "Current stock valued at cost", icon: "◎", gold: true }
  ];
  document.querySelector("#kpi-cards").innerHTML = cards.map((card) => `
    <article class="kpi-card${card.gold ? " gold" : ""}">
      <div class="kpi-top">${card.label}<span class="kpi-icon">${card.icon}</span></div>
      <div class="kpi-value" title="${escapeHTML(card.value)}">${escapeHTML(card.value)}</div>
      <div class="kpi-sub">${escapeHTML(card.note)}</div>
    </article>`).join("");
}

export function renderLeaderboards(analytics) {
  const renderRows = (products, slow) => products.map((product, index) => {
    const days = daysSince(product.lastSoldAt);
    return `<div class="leader-row">
      <span class="rank">${String(index + 1).padStart(2, "0")}</span>
      <div><div class="product-name">${escapeHTML(product.name)}</div><div class="product-detail">${escapeHTML(product.category)} · ${product.unitsSold} units sold</div></div>
      <div class="leader-value">${slow ? `${days} days` : `${product.unitsSold} units`}<small>${slow ? "since last purchase" : money(product.revenue)}</small></div>
    </div>`;
  }).join("");
  document.querySelector("#leaderboards").innerHTML = `
    <article class="card leader-card"><div class="section-heading"><div><p class="eyebrow">HIGH DEMAND</p><h2>Top sellers</h2></div><span class="chart-note">By units sold</span></div><div class="leader-list">${renderRows(analytics.topSellers, false)}</div></article>
    <article class="card leader-card"><div class="section-heading"><div><p class="eyebrow">LOW DEMAND</p><h2>Slow movers</h2></div><span class="chart-note">Days since last purchase</span></div><div class="leader-list">${renderRows(analytics.slowMovers, true)}</div></article>`;
}

export function renderInsights(insights) {
  document.querySelector("#insight-count").textContent = `${insights.length} ${insights.length === 1 ? "recommendation" : "recommendations"}`;
  document.querySelector("#insights").innerHTML = insights.length
    ? insights.map((insight) => `<article class="insight ${insight.type}"><span class="insight-badge">${insight.icon}</span><div><div class="insight-title">${escapeHTML(insight.title)}</div><p class="insight-text">${escapeHTML(insight.text)}</p></div></article>`).join("")
    : '<p class="muted">Everything looks balanced — no urgent actions right now.</p>';
}

export function renderProductOptions(products) {
  const select = document.querySelector("#sale-product");
  const selected = select.value;
  select.innerHTML = products.map((product) => `<option value="${escapeHTML(product.id)}" ${product.stock < 1 ? "disabled" : ""}>${escapeHTML(product.name)} (${product.stock} in stock)</option>`).join("");
  if (products.some((product) => product.id === selected && product.stock > 0)) select.value = selected;
}
