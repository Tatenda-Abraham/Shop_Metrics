import { escapeHTML } from "./format.js";

export function renderInventory(products) {
  document.querySelector("#inventory-rows").innerHTML = [...products]
    .sort((a, b) => a.stock - b.stock)
    .map((product) => {
      const low = product.stock <= 10;
      return `<tr><td><strong>${escapeHTML(product.name)}</strong></td><td>${escapeHTML(product.category)}</td><td>${product.stock}</td><td><span class="stock-status${low ? " low" : ""}">${low ? "Low stock" : "In stock"}</span></td></tr>`;
    }).join("");
}
