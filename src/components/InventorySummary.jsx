import React from "react";

export default function InventorySummary({ items }) {
  if (!items || items.length === 0) {
    return (
      <div className="inventory-summary">
        <div className="summary-box" style={{ backgroundColor: "#9e9e9e" }}>
          <p>No items to summarize yet.</p>
        </div>
      </div>
    );
  }

  const totalItems = items.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);
  const totalCost = items.reduce((sum, item) => sum + (Number(item.cost) || 0), 0);
  const uniqueProducts = items.length;

  return (
    <div className="inventory-summary">
      <div className="summary-box" style={{ backgroundColor: "#4caf50" }}>
        <h3>Total Products</h3>
        <p>{uniqueProducts}</p>
      </div>

      <div className="summary-box" style={{ backgroundColor: "#2196f3" }}>
        <h3>Total Items</h3>
        <p>{totalItems}</p>
      </div>

      <div className="summary-box" style={{ backgroundColor: "#ff9800" }}>
        <h3>Total Cost</h3>
        <p>₱{totalCost.toLocaleString("en-PH")}</p>
      </div>
    </div>
  );
}
