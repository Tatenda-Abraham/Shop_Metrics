import { money } from "./format.js";

const BLUE = "#1E3A8A";
const GOLD = "#D97706";
const MUTED = "#8792a6";
const GRID = "#edf0f5";

export function drawBarChart(canvas, items, valueFor, { color = BLUE, formatValue = String } = {}) {
  const context = canvas.getContext("2d");
  if (!context) throw new Error("This browser does not support canvas charts.");
  const bounds = canvas.getBoundingClientRect();
  const ratio = window.devicePixelRatio || 1;
  const width = Math.max(bounds.width, 240);
  const height = 220;
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  context.clearRect(0, 0, width, height);

  const values = items.map(valueFor);
  const maxValue = Math.max(...values, 1);
  const left = 35;
  const right = 8;
  const top = 14;
  const bottom = 49;
  const plotHeight = height - top - bottom;
  const plotWidth = width - left - right;

  context.font = "10px Segoe UI, Arial";
  context.textBaseline = "middle";
  for (let tick = 0; tick <= 3; tick += 1) {
    const y = top + plotHeight * tick / 3;
    const value = maxValue * (1 - tick / 3);
    context.strokeStyle = GRID;
    context.beginPath();
    context.moveTo(left, y);
    context.lineTo(width - right, y);
    context.stroke();
    context.fillStyle = MUTED;
    context.textAlign = "right";
    context.fillText(formatValue(value), left - 7, y);
  }

  const slot = plotWidth / Math.max(items.length, 1);
  items.forEach((item, index) => {
    const value = values[index];
    const barHeight = Math.max(2, value / maxValue * (plotHeight - 3));
    const barWidth = Math.min(28, slot * 0.52);
    const x = left + slot * index + (slot - barWidth) / 2;
    const y = top + plotHeight - barHeight;
    context.fillStyle = index === 0 ? GOLD : color;
    context.beginPath();
    context.roundRect(x, y, barWidth, barHeight, [4, 4, 0, 0]);
    context.fill();
    context.fillStyle = MUTED;
    context.textAlign = "center";
    context.textBaseline = "top";
    context.fillText(item.name.split(" ").slice(0, 2).join(" "), x + barWidth / 2, top + plotHeight + 9, slot);
    context.fillStyle = "#52617d";
    context.font = "9px Segoe UI, Arial";
    context.fillText(formatValue(value), x + barWidth / 2, Math.max(top, y - 13), slot);
    context.font = "10px Segoe UI, Arial";
  });
}

export function drawDashboardCharts(analytics) {
  drawBarChart(document.querySelector("#sales-chart"), analytics.topSellers, (product) => product.unitsSold, {
    formatValue: (value) => Math.round(value).toString()
  });
  drawBarChart(document.querySelector("#stock-chart"), analytics.stockValue, (product) => product.stock * product.cost, {
    color: BLUE,
    formatValue: (value) => money(value).replace(/\.00$/, "")
  });
}
