import React, { useState, useEffect } from "react";
import InventoryForm from "./components/InventoryForm";
import InventoryList from "./components/InventoryList";
import InventorySummary from "./components/InventorySummary";
import InventoryDate from "./components/InventoryDate";
import InventoryRecords from "./components/InventoryRecords"; // <-- new import
import "./App.css";

function App() {
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

  const [editingItem, setEditingItem] = useState(null);
  const [showRecords, setShowRecords] = useState(false);

  const saveItems = (newItems) => {
    setItems(newItems);
    localStorage.setItem("inventoryItems", JSON.stringify(newItems));
  };

  const handleAddItem = (item) => saveItems([...items, item]);
  const handleDeleteItem = (id) =>
    saveItems(items.filter((item) => item.id !== id));
  const handleEditItem = (item) => setEditingItem(item);
  const handleUpdateItem = (updatedItem) => {
    const updatedItems = items.map((item) =>
      item.id === updatedItem.id ? updatedItem : item
    );
    saveItems(updatedItems);
    setEditingItem(null);
  };
  const handleCancelEdit = () => setEditingItem(null);

  return (
    <div className="app-container">
      <h1>House Inventory Tracker</h1>
      <InventoryDate />
      <button
        className="records-btn"
        onClick={() => setShowRecords(!showRecords)}
      >
        {showRecords ? "Hide Records" : "Show Records"}
      </button>
      {showRecords && <InventoryRecords items={items} />}{" "}
      {/* Use the new file */}
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
