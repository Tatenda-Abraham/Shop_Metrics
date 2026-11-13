import { daysSince } from "./format.js";

export function analyzeProducts(products) {
  const ranked = [...products];
  const topSellers = [...ranked].sort((a, b) => b.unitsSold - a.unitsSold).slice(0, 5);
  const slowMovers = [...ranked]
    .sort((a, b) => daysSince(b.lastSoldAt) - daysSince(a.lastSoldAt) || a.unitsSold - b.unitsSold)
    .slice(0, 5);
  const fastest = [...ranked].sort((a, b) => b.unitsSold - a.unitsSold)[0] || null;
  const slowest = slowMovers[0] || null;

  return {
    totalRevenue: products.reduce((sum, product) => sum + product.revenue, 0),
    fastest,
    slowest,
    tiedUpCapital: products.reduce((sum, product) => sum + product.stock * product.cost, 0),
    topSellers,
    slowMovers,
    stockValue: [...products].sort((a, b) => b.stock * b.cost - a.stock * a.cost).slice(0, 7)
  };
}
