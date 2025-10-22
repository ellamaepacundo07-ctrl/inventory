import React, { useState } from "react";

export default function InventoryForm({ onAddItem }) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [cost, setCost] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !quantity || !cost) {
      alert("Please fill all fields!");
      return;
    }
    const newItem = {
      id: Date.now(),
      name,
      quantity: parseInt(quantity),
      cost: parseFloat(cost),
    };
    onAddItem(newItem);
    setName("");
    setQuantity("");
    setCost("");
  };

  return (
    <form className="inventory-form" onSubmit={handleSubmit}>
      <input type="text" placeholder="Item Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="number" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
      <input type="number" placeholder="Cost" value={cost} onChange={(e) => setCost(e.target.value)} />
      <button type="submit">Add Item</button>
    </form>
  );
}
