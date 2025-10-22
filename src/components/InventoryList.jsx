import React from 'react';

function InventoryList({ items, onDelete }) {
  if (items.length === 0) {
    return <p>No items in inventory.</p>;
  }

  return (
    <ul className="inventory-list">
      {items.map((item, index) => (
        <li key={index}>
          <strong>{item.name}</strong> — {item.quantity} in {item.room}
          <button onClick={() => onDelete(index)}>❌</button>
        </li>
      ))}
    </ul>
  );
}

export default InventoryList;
