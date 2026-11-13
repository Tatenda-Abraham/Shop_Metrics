const daysAgo = (days) => new Date(Date.now() - days * 86_400_000).toISOString();

export const seedProducts = [
  { id: "coffee-beans", name: "House Blend Coffee", category: "Grocery", sku: "GR-1042", price: 14.5, cost: 7.2, stock: 38, unitsSold: 284, lastSoldDaysAgo: 0 },
  { id: "ceramic-mug", name: "Stoneware Mug", category: "Home", sku: "HM-2081", price: 22, cost: 10, stock: 16, unitsSold: 176, lastSoldDaysAgo: 1 },
  { id: "olive-oil", name: "Extra Virgin Olive Oil", category: "Grocery", sku: "GR-1170", price: 18.75, cost: 10.4, stock: 27, unitsSold: 143, lastSoldDaysAgo: 2 },
  { id: "cotton-tote", name: "Everyday Cotton Tote", category: "Accessories", sku: "AC-3025", price: 16, cost: 6.5, stock: 45, unitsSold: 121, lastSoldDaysAgo: 3 },
  { id: "linen-napkins", name: "Linen Napkin Set", category: "Home", sku: "HM-2116", price: 28, cost: 14, stock: 19, unitsSold: 94, lastSoldDaysAgo: 4 },
  { id: "honey-jar", name: "Wildflower Honey", category: "Grocery", sku: "GR-1218", price: 12, cost: 6.1, stock: 31, unitsSold: 82, lastSoldDaysAgo: 6 },
  { id: "soy-candle", name: "Cedar Soy Candle", category: "Home", sku: "HM-2230", price: 26, cost: 12.5, stock: 13, unitsSold: 61, lastSoldDaysAgo: 10 },
  { id: "tea-tin", name: "Jasmine Green Tea", category: "Grocery", sku: "GR-1302", price: 11.5, cost: 5.4, stock: 24, unitsSold: 42, lastSoldDaysAgo: 18 },
  { id: "wool-scarf", name: "Merino Wool Scarf", category: "Accessories", sku: "AC-3104", price: 68, cost: 34, stock: 12, unitsSold: 19, lastSoldDaysAgo: 37 },
  { id: "glass-vase", name: "Ribbed Glass Vase", category: "Home", sku: "HM-2308", price: 42, cost: 21, stock: 8, unitsSold: 8, lastSoldDaysAgo: 66 },
  { id: "leather-journal", name: "Leather Bound Journal", category: "Stationery", sku: "ST-4011", price: 32, cost: 15, stock: 14, unitsSold: 2, lastSoldDaysAgo: 104 },
  { id: "brass-hook", name: "Brushed Brass Hook", category: "Home", sku: "HM-2384", price: 19, cost: 8.5, stock: 20, unitsSold: 0, lastSoldDaysAgo: 150 }
].map(({ lastSoldDaysAgo, ...product }) => ({
  ...product,
  revenue: Number((product.unitsSold * product.price).toFixed(2)),
  lastSoldAt: daysAgo(lastSoldDaysAgo)
}));
