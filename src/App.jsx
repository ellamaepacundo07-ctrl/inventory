import React, { useState, useEffect } from "react";
import InventoryForm from "./components/InventoryForm";
import InventoryList from "./components/InventoryList";
import InventorySummary from "./components/InventorySummary";
import InventoryDate from "./components/InventoryDate";
import "./App.css";

function App() {
  // Load inventory from localStorage
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem("inventoryItems");
    if (!savedItems) return [];

    const parsed = JSON.parse(savedItems);
    return parsed.map((item) => ({
      ...item,
      quantity: Number(item.quantity) || 0,
      cost: Number(item.cost) || 0,
    }));
  });

  // Clean old localStorage data on first load (optional)
  useEffect(() => {
    const saved = localStorage.getItem("inventoryItems");
    if (saved) {
      const parsed = JSON.parse(saved);
      const cleaned = parsed.map((item) => ({
        ...item,
        quantity: Number(item.quantity) || 0,
        cost: Number(item.cost) || 0,
      }));
      localStorage.setItem("inventoryItems", JSON.stringify(cleaned));
    }
  }, []);

  // Save items to localStorage when changed
  useEffect(() => {
    localStorage.setItem("inventoryItems", JSON.stringify(items));
  }, [items]);

  // Add new item
  const handleAddItem = (item) => setItems([...items, item]);

  // Delete item
  const handleDeleteItem = (id) =>
    setItems(items.filter((item) => item.id !== id));

  // Edit item logic
  const [editingItem, setEditingItem] = useState(null);

  const handleEditItem = (item) => setEditingItem(item);

  const handleUpdateItem = (updatedItem) => {
    setItems(
      items.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
    setEditingItem(null);
  };

  const handleCancelEdit = () => setEditingItem(null);

  return (
    <div className="app-container">
      <h1>House Inventory Tracker</h1>

      <InventoryDate />

      <InventoryForm
        onAddItem={handleAddItem}
        onUpdateItem={handleUpdateItem}
        editingItem={editingItem}
        onCancelEdit={handleCancelEdit}
      />

      <InventorySummary items={items} />

      <InventoryList
        items={items}
        onEdit={handleEditItem}
        onDelete={handleDeleteItem}
      />
    </div>
  );
}

export default App;
