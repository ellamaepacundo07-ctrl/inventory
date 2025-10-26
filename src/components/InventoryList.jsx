import React from "react";

export default function InventoryList({ items, onEdit, onDelete }) {
  return (
    <div className="inventory-list">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Cost (₱)</th>
            <th>Date Added</th>
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
                <td>₱{Number(item.cost).toLocaleString("en-PH", {})}</td>
                <td>{item.dateAdded}</td>
                <td>
                  <button className="edit-btn" onClick={() => onEdit(item)}>
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => {
                      const confirmDelete = window.confirm(
                        `Are you sure you want to delete "${item.name}" ?`
                      );
                      if (confirmDelete) {
                        onDelete(item.id);
                      }
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
