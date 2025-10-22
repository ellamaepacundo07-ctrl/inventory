import React, { useState } from 'react';
import InventoryForm from './components/InventoryForm';
import InventoryList from './components/InventoryList';
import './App.css';

function App() {
  const [items, setItems] = useState([]);

  const addItem = (item) => {
    setItems([...items, item]);
  };

  const deleteItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  return (
    <div className="container">
      <h1>House Inventory Tracker</h1>
      <InventoryForm onAdd={addItem} />
      <InventoryList items={items} onDelete={deleteItem} />
    </div>
  );
}

export default App;
