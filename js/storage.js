import { seedProducts } from "./data.js";

const STORAGE_KEY = "shopmetrics-state-v1";

export function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return createInitialState();
  try {
    const state = JSON.parse(saved);
    if (!Array.isArray(state.products) || !Array.isArray(state.sales)) {
      throw new Error("Saved ShopMetrics data has an invalid shape.");
    }
    return state;
  } catch (error) {
    throw new Error(`Could not load saved ShopMetrics data: ${error.message}`);
  }
}

export function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function resetState() {
  const state = createInitialState();
  saveState(state);
  return state;
}

function createInitialState() {
  return { products: structuredClone(seedProducts), sales: [] };
}
