import React, { useState } from 'react';
import './FilterBar.css';

function FilterBar({ onFilter }) {
  const [category, setCategory] = useState('');

  const handleFilter = () => {
    onFilter(category.trim());
  };

  const handleReset = () => {
    setCategory('');
    onFilter('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleFilter();
    }
  };

  return (
    <div className="filter-bar">
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Filter by category (e.g., Electronics, Clothing)"
        className="input-field"
      />
      <button onClick={handleFilter} className="btn btn-primary">
        Filter
      </button>
      <button onClick={handleReset} className="btn btn-secondary">
        Reset
      </button>
    </div>
  );
}

export default FilterBar;
