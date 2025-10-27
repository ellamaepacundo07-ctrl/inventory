import React from "react";

export default function InventoryDate() {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-PH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="inventory-date">
      <p>
        <strong>Date:</strong> {formattedDate}
      </p>
    </div>
  );
}
