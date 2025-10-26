import React, { useState, useEffect } from "react";

export default function InventoryForm({
  onAddItem,
  onUpdateItem,
  editingItem,
  onCancelEdit,
}) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [cost, setCost] = useState("");

  // Fill form when editing
  useEffect(() => {
    if (editingItem) {
      setName(editingItem.name);
      setQuantity(editingItem.quantity);
      setCost(editingItem.cost);
    } else {
      setName("");
      setQuantity("");
      setCost("");
    }
  }, [editingItem]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !quantity || !cost) {
      alert("Please fill all fields!");
      return;
    }

    if (editingItem) {
      // Update existing item
      const updatedItem = {
        ...editingItem,
        name,
        quantity: Number(quantity) || 0,
        cost: Number(cost) || 0,
      };
      onUpdateItem(updatedItem);
    } else {
      const newItem = {
        id: Date.now(),
        name,
        quantity: Number(quantity) || 0,
        cost: Number(cost) || 0,
        dateAdded: new Date().toLocaleString("en-PH", {
  year: "numeric",
  month: "short",
  day: "numeric",
}),

      };

      onAddItem(newItem);
    }

    // Clear form after maka submit //
    setName("");
    setQuantity("");
    setCost("");
  };

  return (
    <form className="inventory-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Item Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <input
        type="number"
        placeholder="Cost"
        value={cost}
        onChange={(e) => setCost(e.target.value)}
      />
      <button type="submit">{editingItem ? "Update Item" : "Add Item"}</button>
      <button type="button" className="cancel-btn" onClick={onCancelEdit}>
        Cancel
      </button>
    </form>
  );
}
