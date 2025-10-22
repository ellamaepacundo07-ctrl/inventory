import React, { useState } from "react";
import InventoryForm from "./components/InventoryForm";
import InventoryList from "./components/InventoryList";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);

  const handleAddItem = (item) => setItems([...items, item]);
  const handleDeleteItem = (id) =>
    setItems(items.filter((item) => item.id !== id));
  const handleEditItem = (itemToEdit) =>
    setItems(items.filter((item) => item.id !== itemToEdit.id));

  return (
    <div className="app-container">
      <h1>House Inventory Tracker</h1>
      <InventoryForm onAddItem={handleAddItem} />
      <InventoryList
        items={items}
        onEdit={handleEditItem}
        onDelete={handleDeleteItem}
      />
    </div>
  );
}

export default App;
