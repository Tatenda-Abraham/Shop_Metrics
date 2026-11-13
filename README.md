# ShopMetrics — Retail Inventory Velocity & Sales Analytics Dashboard

A modular, vanilla JavaScript web application designed to analyze retail sales, inventory turnover, and product velocity, featuring a decoupled multi-file architecture to ensure 100% JavaScript language detection on GitHub.

## Features

- **Modular Analytics Engine:** Pure JavaScript calculation logic (`analytics.js`, `inventory.js`, `sales.js`) processing product data, turnover ratios, and slow-moving stock identification.
- **Dynamic UI & Chart Rendering:** Real-time DOM updates (`ui.js`, `app.js`, `insights.js`) paired with custom HTML5 Canvas chart visualizations (`charts.js`).
- **Data Formatting & Storage:** Persistent client-side storage management (`storage.js`, `data.js`) with standardized text and currency formatting (`format.js`).
- **Language-Optimized Repository:** Configured with `.gitattributes` to exclude structural HTML and CSS from GitHub's Linguist statistics, maintaining a clean 100% JavaScript repository profile.

## Tech Stack

- **Frontend:** Vanilla JavaScript (ES6 Modules), HTML5, CSS3
- **Data Visualization:** HTML5 Canvas API
- **Storage & State:** Browser `localStorage`

## Project Structure

```text
ShopMetrics/
├── .gitattributes
├── index.html
├── styles.css
└── js/
    ├── analytics.js
    ├── app.js
    ├── charts.js
    ├── data.js
    ├── format.js
    ├── insights.js
    ├── inventory.js
    ├── sales.js
    ├── storage.js
    └── ui.js
