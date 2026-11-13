import { analyzeProducts } from "./analytics.js";
import { drawDashboardCharts } from "./charts.js";
import { renderInventory } from "./inventory.js";
import { generateInsights } from "./insights.js";
import { attachSaleForm } from "./sales.js";
import { loadState, resetState, saveState } from "./storage.js";
import { renderInsights, renderLeaderboards, renderOverview, renderProductOptions } from "./ui.js";
import { escapeHTML } from "./format.js";

let state;

function refreshDashboard() {
  const analytics = analyzeProducts(state.products);
  renderOverview(analytics);
  renderLeaderboards(analytics);
  renderInsights(generateInsights(state.products));
  renderProductOptions(state.products);
  renderInventory(state.products);
  drawDashboardCharts(analytics);
}

function recordSale({ productId, quantity, discount }) {
  const product = state.products.find((item) => item.id === productId);
  if (!product) throw new Error("Select a valid product.");
  if (!Number.isInteger(quantity) || quantity < 1) throw new Error("Quantity must be a whole number greater than zero.");
  if (!Number.isFinite(discount) || discount < 0 || discount > 80) throw new Error("Discount must be between 0% and 80%.");
  if (quantity > product.stock) throw new Error(`Only ${product.stock} units of ${product.name} are in stock.`);

  const updatedState = structuredClone(state);
  const updatedProduct = updatedState.products.find((item) => item.id === productId);
  const unitPrice = Number((updatedProduct.price * (1 - discount / 100)).toFixed(2));
  updatedProduct.stock -= quantity;
  updatedProduct.unitsSold += quantity;
  updatedProduct.revenue = Number((updatedProduct.revenue + unitPrice * quantity).toFixed(2));
  updatedProduct.lastSoldAt = new Date().toISOString();
  updatedState.sales.push({ productId, quantity, discount, unitPrice, soldAt: updatedProduct.lastSoldAt });
  saveState(updatedState);
  state = updatedState;
  refreshDashboard();
}

function start() {
  state = loadState();
  refreshDashboard();
  attachSaleForm(recordSale);
  const updateNavigation = () => {
    const currentSection = window.location.hash || "#overview";
    document.querySelectorAll(".nav-link").forEach((link) => {
      const active = link.getAttribute("href") === currentSection;
      link.classList.toggle("active", active);
      if (active) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
  };
  window.addEventListener("hashchange", updateNavigation);
  updateNavigation();
  document.querySelector("#reset-data").addEventListener("click", () => {
    if (!window.confirm("Reset all saved demo sales and inventory?")) return;
    state = resetState();
    refreshDashboard();
  });
  window.addEventListener("resize", refreshDashboard);
}

try {
  start();
} catch (error) {
  document.querySelector("main").innerHTML = `<section class="card sale-card"><h1>Dashboard unavailable</h1><p class="muted">${escapeHTML(error.message)}</p><p class="muted">Check browser storage permissions, then reload.</p></section>`;
}
