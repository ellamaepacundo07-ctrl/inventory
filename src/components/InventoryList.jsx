import React from "react";

export default function InventoryList({ items, onEdit, onDelete }) {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalCost = items.reduce(
    (sum, item) => sum + item.quantity * item.cost,
    0
  );

  return (
    <div className="inventory-list">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Cost</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan="5">No items added yet</td>
            </tr>
          ) : (
            items.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>₱{item.cost.toFixed(2)}</td>
                <td>
                  <button className="edit-btn" onClick={() => onEdit(item)}>
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => onDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <p className="totalitems">
        Total Items: {totalItems}
      <p className="totalcost">
        Total Cost: ₱{totalCost.toFixed(2)}
      </p>
      </p>
    </div>
  );
}
