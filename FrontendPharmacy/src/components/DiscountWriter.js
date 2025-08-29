import React from 'react';
import './DiscountWriter.css';

const DiscountWriter = ({ itemId, discount, discountType, onChange }) => {
  const handleDiscountChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    onChange(itemId, 'discount', value);
  };

  const handleDiscountTypeChange = (e) => {
    onChange(itemId, 'discountType', e.target.value);
  };

  return (
    <div className="discount-writer">
      <input
        type="number"
        className="discount-input"
        value={discount}
        min="0"
        step="0.01"
        placeholder="0"
        onChange={handleDiscountChange}
      />
      <select 
        className="discount-type-select"
        value={discountType}
        onChange={handleDiscountTypeChange}
      >
        <option value="%">%</option>
        <option value="₹">₹</option>
      </select>
    </div>
  );
};

export default DiscountWriter;