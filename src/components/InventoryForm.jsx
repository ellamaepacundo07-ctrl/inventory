import React, { useState } from 'react';

function InventoryForm({ onAdd }) {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !room || quantity <= 0) return;
    onAdd({ name, room, quantity });
    setName('');
    setRoom('');
    setQuantity(1);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Item name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Room"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        min="1"
        onChange={(e) => setQuantity(e.target.value)}
      />
      <button type="submit">Add Item</button>
    </form>
  );
}

export default InventoryForm;
