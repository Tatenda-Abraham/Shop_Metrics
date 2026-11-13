import { daysSince } from "./format.js";

export function generateInsights(products) {
  const insights = [];
  for (const product of products) {
    const inactiveDays = daysSince(product.lastSoldAt) ?? 0;
    if (product.stock > 0 && inactiveDays >= 60) {
      const discount = inactiveDays >= 100 ? 25 : 15;
      insights.push({
        type: "clearance",
        icon: "↘",
        title: `Consider a ${discount}% clearance`,
        text: `${product.name} has had no recent movement for ${inactiveDays} days. A targeted discount can free up ${product.stock} units.`
      });
    } else if (product.stock <= 10 && product.unitsSold > 40) {
      insights.push({
        type: "restock",
        icon: "↑",
        title: "Restock alert",
        text: `${product.name} is down to ${product.stock} units and has sold ${product.unitsSold} to date. Replenish before it sells out.`
      });
    }
  }
  return insights.sort((a, b) => (a.type === "clearance" ? -1 : 1) - (b.type === "clearance" ? -1 : 1));
}
