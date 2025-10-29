// src/components/InventoryRecords.jsx
import React from "react";

export default function InventoryRecords({ items }) {
  if (!items || items.length === 0) {
    return <p>No records available.</p>;
  }

  return (
    <div className="records-container">
      <h2>Inventory Records</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - {item.quantity} pcs - ₱
            {item.cost.toLocaleString("en-PH")} - Added: {item.dateAdded}
          </li>
        ))}
      </ul>
    </div>
  );
}
