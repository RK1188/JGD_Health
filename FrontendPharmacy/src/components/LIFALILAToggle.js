import React from 'react';
import './LIFALILAToggle.css';

const LIFALILAToggle = ({ itemId, isLIFA, onChange }) => {
  const handleToggle = (e) => {
    onChange(itemId, 'isLIFA', e.target.checked);
  };

  return (
    <div className="lifa-lila-switch">
      <input 
        type="checkbox" 
        id={`switch-${itemId}`}
        checked={isLIFA}
        onChange={handleToggle}
      />
      <label htmlFor={`switch-${itemId}`} className="slider">
        <div className="slider-labels">
          <span className="lila-label">LILA</span>
          <span className="lifa-label">LIFA</span>
        </div>
      </label>
    </div>
  );
};

export default LIFALILAToggle;