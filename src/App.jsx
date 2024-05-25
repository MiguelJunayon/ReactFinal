
import React, { useState } from 'react';
import './css.css';

function App() {
  const [items, setItems] = useState([]);

  function handleAddItem() {
    const newItem = document.getElementById('ItemInput').value;
    if (newItem.trim() !== '') {
      setItems((prevItems) => [...prevItems, { text: newItem, isEditing: false }]);
      document.getElementById('ItemInput').value = '';
    }
  }

  function handleRemoveItem(index) {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
  }

  function handleToggleEdit(index) {
    setItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, isEditing: !item.isEditing } : item
      )
    );
  }

  function handleUpdateItem(index, newText) {
    setItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, text: newText, isEditing: false } : item
      )
    );
  }

  return (
    <div className="">
      <h1> ITEMS </h1>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.isEditing ? (
              <input
                type="text"
                value={item.text}
                onChange={(e) => handleUpdateItem(index, e.target.value)}
                onBlur={() => handleToggleEdit(index)}
                autoFocus
              />
            ) : (
              <span onClick={() => handleToggleEdit(index)}>{item.text}</span>
            )}
            <span className="edit-icon" onClick={() => handleRemoveItem(index)}>
              &#10006;
            </span>
          </li>
        ))}
      </ul>
      <input type="text" id="ItemInput" placeholder="Items" />
      <button onClick={handleAddItem}>Add Item</button>
    </div>
  );
}

export default App;
