import React from "react";

export default function InventorySummary({ items }) {
  if (!items || items.length === 0) {
    return (
      <div className="inventory-summary empty">
        <p>No items to summarize yet.</p>
      </div>
    );
  }

  // Compute totals safely
  const totalItems = items.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);
  const totalCost = items.reduce((sum, item) => {
    const qty = Number(item.quantity) || 0;
    const cost = Number(item.cost) || 0;
    return sum + qty * cost;
  }, 0);
  const uniqueProducts = items.length;

  return (
    <div className="inventory-summary">
      <h3> Inventory Summary</h3>
      <p><strong>Total Products:</strong> {uniqueProducts}</p>
      <p><strong>Total Items:</strong> {totalItems}</p>
      <p>
        <strong>Total Cost:</strong>{" "}
        ₱{totalCost.toLocaleString("en-PH", { minimumFractionDigits: 2 })}
      </p>
    </div>
  );
}
