import React, { useState, useEffect } from "react";
import InventoryForm from "./components/InventoryForm";
import InventoryList from "./components/InventoryList";
import InventorySummary from "./components/InventorySummary";
import InventoryDate from "./components/InventoryDate";
import "./App.css";

// ----------------- Dashboard Component -----------------
function Dashboard({ items }) {
  const totalItems = items.reduce((sum, item) => sum + Number(item.quantity), 0);
  const totalCost = items.reduce(
    (sum, item) => sum + Number(item.quantity) * Number(item.cost),
    0
  );
  const avgCost = totalItems > 0 ? (totalCost / totalItems).toFixed(2) : 0;

  return (
    <div className="dashboard-container">
      <h2>Inventory Dashboard</h2>
      <div className="dashboard-cards">
        <div className="card">
          <h3>Total Items</h3>
          <p>{totalItems}</p>
        </div>
        <div className="card">
          <h3>Total Cost</h3>
          <p>${totalCost.toFixed(2)}</p>
        </div>
        <div className="card">
          <h3>Average Cost per Item</h3>
          <p>${avgCost}</p>
        </div>
      </div>
    </div>
  );
}

// ----------------- Main App Component -----------------
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

  useEffect(() => {
    localStorage.setItem("inventoryItems", JSON.stringify(items));
  }, [items]);

  const handleAddItem = (item) => setItems([...items, item]);

  const handleDeleteItem = (id) =>
    setItems(items.filter((item) => item.id !== id));

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

      {/* -------- Dashboard Inserted Here -------- */}
      <Dashboard items={items} />

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
