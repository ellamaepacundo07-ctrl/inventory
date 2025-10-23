import React, { useState, useEffect } from "react";
import InventoryForm from "./components/InventoryForm";
import InventoryList from "./components/InventoryList";
import "./App.css";

function App() {
  // localStorage para save sa inventorylist  //
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem("inventoryItems");
    return savedItems ? JSON.parse(savedItems) : [];
  });
  // Save items og maalisdan  //
  useEffect(() => {
    localStorage.setItem("inventoryItems", JSON.stringify(items));
  }, [items]);

  // pag mag add new item //
  const handleAddItem = (item) => setItems([...items, item]);

  // Delete item //
  const handleDeleteItem = (id) =>
    setItems(items.filter((item) => item.id !== id));

  // STATE STATE STATE for editing //
  const [editingItem, setEditingItem] = useState(null);

  // Start PAG MAG EDIT, BEFORE SAVE EDITED ITEM //
  const handleEditItem = (item) => {
    setEditingItem(item);
  };

  // Save edited item //
  const handleUpdateItem = (updatedItem) => {
    setItems(
      items.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
    setEditingItem(null); // clear edit mode
  };

  return (
    <div className="app-container">
      <h1>House Inventory Tracker</h1>
      <InventoryForm
        onAddItem={handleAddItem}
        onUpdateItem={handleUpdateItem}
        editingItem={editingItem}
      />
      <InventoryList
        items={items}
        onEdit={handleEditItem}
        onDelete={handleDeleteItem}
      />
    </div>
  );
}

export default App;
