import React from 'react';
import LIFALILAToggle from './LIFALILAToggle';
import DiscountWriter from './DiscountWriter';
import './ItemsTable.css';

const ItemsTable = ({ 
  items, 
  onAddItem, 
  onUpdateItem, 
  onRemoveItem, 
  onSearchProduct,
  calculateDiscountedPrice,
  calculateItemAmount 
}) => {
  
  const handleProductSearch = (itemId, query) => {
    if (query.length < 2) return;
    
    const product = onSearchProduct(query);
    if (product) {
      // Update all fields with product data
      Object.keys(product).forEach(key => {
        if (key !== 'id') {
          onUpdateItem(itemId, key, product[key]);
        }
      });
    }
  };

  const handleInputChange = (itemId, field, value) => {
    onUpdateItem(itemId, field, value);
  };

  return (
    <div className="items-table-section">
      <div className="table-controls">
        <div className="gst-controls">
          <label>Common GST%:</label>
          <input 
            type="number" 
            className="common-gst-input"
            min="0" 
            max="100" 
            placeholder="GST%"
            onChange={(e) => {
              const gst = parseFloat(e.target.value) || 0;
              items.forEach(item => {
                handleInputChange(item.id, 'gst', gst);
              });
            }}
          />
          <button 
            className="apply-gst-btn"
            onClick={() => {
              const gstInput = document.querySelector('.common-gst-input');
              const gst = parseFloat(gstInput.value) || 0;
              items.forEach(item => {
                handleInputChange(item.id, 'gst', gst);
              });
            }}
          >
            Apply to All
          </button>
        </div>
      </div>
      
      <div className="table-wrapper">
        <div className="table-header">
          <div className="header-cell">Item Name <i className="info-icon">ℹ️</i></div>
          <div className="header-cell">LIFA/LILA</div>
          <div className="header-cell">Unit/Pack</div>
          <div className="header-cell">Loc.</div>
          <div className="header-cell">Batch</div>
          <div className="header-cell">Expiry</div>
          <div className="header-cell">MRP</div>
          <div className="header-cell">Qty. <i className="info-icon">ℹ️</i></div>
          <div className="header-cell">D% <i className="info-icon">ℹ️</i></div>
          <div className="header-cell">D.Price</div>
          <div className="header-cell">GST% <i className="info-icon">ℹ️</i></div>
          <div className="header-cell">Amount</div>
          <div className="header-cell">Action</div>
        </div>
        
        <div className="items-container">
        {items.map((item, index) => (
          <div key={item.id} className="item-row">
            <div className="item-cell">
              <input
                type="text"
                value={item.name || ''}
                placeholder="Search item name"
                onChange={(e) => handleInputChange(item.id, 'name', e.target.value)}
                onBlur={(e) => handleProductSearch(item.id, e.target.value)}
              />
            </div>
            
            <div className="item-cell">
              <LIFALILAToggle
                itemId={item.id}
                isLIFA={item.isLIFA || false}
                onChange={onUpdateItem}
              />
            </div>
            
            <div className="item-cell">
              <input
                type="text"
                value={item.unitPack || ''}
                readOnly
                placeholder="Unit/Pack"
              />
            </div>
            
            <div className="item-cell">
              <input
                type="text"
                value={item.location || ''}
                placeholder="Loc."
                onChange={(e) => handleInputChange(item.id, 'location', e.target.value)}
              />
            </div>
            
            <div className="item-cell">
              <input
                type="text"
                value={item.batch || ''}
                placeholder="Batch"
                onChange={(e) => handleInputChange(item.id, 'batch', e.target.value)}
              />
            </div>
            
            <div className="item-cell">
              <input
                type="text"
                value={item.expiry || ''}
                placeholder="MM/YY"
                onChange={(e) => handleInputChange(item.id, 'expiry', e.target.value)}
              />
            </div>
            
            <div className="item-cell">
              <input
                type="number"
                value={item.mrp || ''}
                step="0.01"
                placeholder="MRP"
                onChange={(e) => handleInputChange(item.id, 'mrp', parseFloat(e.target.value) || 0)}
              />
            </div>
            
            <div className="item-cell">
              <input
                type="number"
                value={item.quantity || 1}
                min="1"
                placeholder="Qty"
                onChange={(e) => handleInputChange(item.id, 'quantity', parseInt(e.target.value) || 1)}
              />
            </div>
            
            <div className="item-cell">
              <DiscountWriter
                itemId={item.id}
                discount={item.discount || 0}
                discountType={item.discountType || '%'}
                onChange={onUpdateItem}
              />
            </div>
            
            <div className="item-cell">
              <span className="calculated-value">
                ₹{calculateDiscountedPrice(item).toFixed(2)}
              </span>
            </div>
            
            <div className="item-cell">
              <input
                type="number"
                value={item.gst || 0}
                min="0"
                max="100"
                placeholder="GST%"
                className="gst-input"
                onChange={(e) => handleInputChange(item.id, 'gst', parseFloat(e.target.value) || 0)}
              />
            </div>
            
            <div className="item-cell">
              <span className="calculated-value amount">
                ₹{calculateItemAmount(item).toFixed(2)}
              </span>
            </div>
            
            <div className="item-cell">
              <button
                className="remove-item-btn"
                onClick={() => onRemoveItem(item.id)}
                title="Remove Item"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        </div>
      </div>
      
      <div className="add-item-row">
        <button className="add-item-btn" onClick={() => onAddItem()}>
          Add Item
        </button>
      </div>
    </div>
  );
};

export default ItemsTable;