import React, { useState, useEffect, useRef } from 'react';
import './Sales.css';

const Sales = () => {
  const [salesItems, setSalesItems] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({
    search: '',
    billingFor: 'self',
    doctor: ''
  });
  const [headerControls, setHeaderControls] = useState({
    owner: 'owner',
    paymentType: 'cash',
    pickupType: 'pickup'
  });
  const [currentNewItem, setCurrentNewItem] = useState({
    name: '',
    lifa: true,
    unitPack: '',
    location: '',
    batch: '',
    expiry: '',
    mrp: '',
    qty: 1,
    discountPercent: 0,
    discountedPrice: '',
    gstPercent: 0,
    amount: 0
  });
  const [showAllFields, setShowAllFields] = useState(false);
  const itemInputRefs = useRef({});

  const addItem = () => {
    const newItem = {
      id: Date.now(),
      ...currentNewItem
    };
    setSalesItems([...salesItems, newItem]);
    
    // Reset for new item
    setCurrentNewItem({
      name: '',
      lifa: true,
      unitPack: '',
      location: '',
      batch: '',
      expiry: '',
      mrp: '',
      qty: 1,
      discountPercent: 0,
      discountedPrice: '',
      gstPercent: 0,
      amount: 0
    });
    setShowAllFields(false);
  };

  const handleNewItemChange = (field, value) => {
    setCurrentNewItem(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Show all fields when user enters item name
    if (field === 'name' && value.trim() && !showAllFields) {
      setShowAllFields(true);
    }
  };

  const handleKeyDown = (e, currentField) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      
      const fieldOrder = ['name', 'unitPack', 'location', 'batch', 'expiry', 'mrp', 'qty', 'discountPercent', 'gstPercent'];
      const currentIndex = fieldOrder.indexOf(currentField);
      
      if (currentIndex < fieldOrder.length - 1) {
        // Move to next field
        const nextField = fieldOrder[currentIndex + 1];
        if (itemInputRefs.current[nextField]) {
          itemInputRefs.current[nextField].focus();
        }
      } else {
        // Last field - add item and reset
        if (currentNewItem.name.trim()) {
          addItem();
        }
      }
    }
  };

  const removeItem = (itemId) => {
    setSalesItems(prev => prev.filter(item => item.id !== itemId));
  };

  const updateItem = (itemId, field, value) => {
    setSalesItems(prev => prev.map(item => {
      if (item.id === itemId) {
        const updatedItem = { ...item, [field]: value };
        
        // Calculate amount when relevant fields change
        if (['mrp', 'qty', 'discountPercent', 'gstPercent'].includes(field)) {
          const mrp = parseFloat(updatedItem.mrp) || 0;
          const qty = parseInt(updatedItem.qty) || 0;
          const discountPercent = parseFloat(updatedItem.discountPercent) || 0;
          const gstPercent = parseFloat(updatedItem.gstPercent) || 0;
          
          const subtotal = mrp * qty;
          const discount = (subtotal * discountPercent) / 100;
          const afterDiscount = subtotal - discount;
          const gst = (afterDiscount * gstPercent) / 100;
          updatedItem.amount = (afterDiscount + gst).toFixed(2);
          updatedItem.discountedPrice = (mrp - (mrp * discountPercent / 100)).toFixed(2);
        }
        
        return updatedItem;
      }
      return item;
    }));
  };

  const calculateTotals = () => {
    let subtotal = 0;
    let totalDiscount = 0;
    let totalGst = 0;
    
    salesItems.forEach(item => {
      const mrp = parseFloat(item.mrp) || 0;
      const qty = parseInt(item.qty) || 0;
      const discountPercent = parseFloat(item.discountPercent) || 0;
      const gstPercent = parseFloat(item.gstPercent) || 0;
      
      const itemSubtotal = mrp * qty;
      const discount = (itemSubtotal * discountPercent) / 100;
      const afterDiscount = itemSubtotal - discount;
      const gst = (afterDiscount * gstPercent) / 100;
      
      subtotal += itemSubtotal;
      totalDiscount += discount;
      totalGst += gst;
    });
    
    const grandTotal = subtotal - totalDiscount + totalGst;
    
    return {
      subtotal: subtotal.toFixed(2),
      totalDiscount: totalDiscount.toFixed(2),
      totalGst: totalGst.toFixed(2),
      grandTotal: grandTotal.toFixed(2)
    };
  };

  const handleSave = () => {
    const salesData = {
      customer: customerInfo,
      controls: headerControls,
      items: salesItems,
      date: new Date().toISOString()
    };
    
    console.log('Saving sales:', salesData);
    alert('Sales saved successfully!');
  };

  const handlePrint = () => {
    if (salesItems.length === 0) {
      alert('Please add items to print the bill');
      return;
    }
    alert('Print functionality - Bill would be printed');
  };

  const handleEmail = () => {
    if (salesItems.length === 0) {
      alert('Please add items to email the bill');
      return;
    }
    const email = prompt('Enter email address:');
    if (email) {
      alert(`Bill will be sent to: ${email}`);
    }
  };

  const totals = calculateTotals();

  // Update current new item totals in real-time
  useEffect(() => {
    if (currentNewItem.mrp && currentNewItem.qty) {
      const mrp = parseFloat(currentNewItem.mrp) || 0;
      const qty = parseInt(currentNewItem.qty) || 0;
      const discountPercent = parseFloat(currentNewItem.discountPercent) || 0;
      const gstPercent = parseFloat(currentNewItem.gstPercent) || 0;
      
      const subtotal = mrp * qty;
      const discount = (subtotal * discountPercent) / 100;
      const afterDiscount = subtotal - discount;
      const gst = (afterDiscount * gstPercent) / 100;
      
      setCurrentNewItem(prev => ({
        ...prev,
        amount: (afterDiscount + gst).toFixed(2),
        discountedPrice: (mrp - (mrp * discountPercent / 100)).toFixed(2)
      }));
    }
  }, [currentNewItem.mrp, currentNewItem.qty, currentNewItem.discountPercent, currentNewItem.gstPercent]);

  return (
    <div className="main-content">
      <div className="sales-container">
        <div className="page-header">
          <div className="breadcrumb">Sales &gt; New</div>
          <div className="header-controls">
            <select 
              className="control-select" 
              value={headerControls.owner}
              onChange={(e) => setHeaderControls(prev => ({ ...prev, owner: e.target.value }))}
            >
              <option value="owner">Owner</option>
              <option value="staff">Staff</option>
            </select>
            <select 
              className="control-select payment-type" 
              value={headerControls.paymentType}
              onChange={(e) => setHeaderControls(prev => ({ ...prev, paymentType: e.target.value }))}
            >
              <option value="cash">Cash</option>
              <option value="card">Card</option>
              <option value="upi">UPI</option>
            </select>
            <button className="control-btn reminder-btn">
              Set Reminder
            </button>
            <select 
              className="control-select" 
              value={headerControls.pickupType}
              onChange={(e) => setHeaderControls(prev => ({ ...prev, pickupType: e.target.value }))}
            >
              <option value="pickup">Pickup</option>
              <option value="delivery">Delivery</option>
            </select>
            <button className="save-btn" onClick={handleSave}>
              Save
            </button>
            <button className="settings-btn">
              Settings
            </button>
          </div>
        </div>

        <div className="sales-content">
          <div className="bill-info-section">
            <div className="bill-date">
              <div className="date-icon"></div>
              <div className="date-info">
                <span className="label">Bill Date</span>
                <span className="date">{new Date().toLocaleDateString('en-GB')}</span>
              </div>
            </div>
            <div className="customer-info">
              <div className="customer-icon"></div>
              <div className="customer-details">
                <span className="label">Customer Mobile / Name</span>
                <input 
                  type="text" 
                  placeholder="Search by Mobile, Name" 
                  value={customerInfo.search}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, search: e.target.value }))}
                />
                <button className="create-counter-bill">Create as Counter Bill</button>
              </div>
            </div>
            <div className="billing-for">
              <span className="label">Billing for</span>
              <select 
                value={customerInfo.billingFor}
                onChange={(e) => setCustomerInfo(prev => ({ ...prev, billingFor: e.target.value }))}
              >
                <option value="self">Self</option>
                <option value="family">Family</option>
                <option value="company">Company</option>
              </select>
            </div>
            <div className="doctor-info">
              <div className="doctor-icon"></div>
              <div className="doctor-details">
                <span className="label">Doctor</span>
                <input 
                  type="text" 
                  placeholder="Enter Doctor Name" 
                  value={customerInfo.doctor}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, doctor: e.target.value }))}
                />
              </div>
            </div>
          </div>

          <div className="items-table-section">
            <div className="table-header">
              <div className="header-cell">Item Name</div>
              <div className="header-cell">LIFA/LILA</div>
              <div className="header-cell">Unit/Pack</div>
              <div className="header-cell">Loc.</div>
              <div className="header-cell">Batch</div>
              <div className="header-cell">Expiry</div>
              <div className="header-cell">MRP</div>
              <div className="header-cell">Qty.</div>
              <div className="header-cell">D%</div>
              <div className="header-cell">D.Price</div>
              <div className="header-cell">GST%</div>
              <div className="header-cell">Amount</div>
              <div className="header-cell">Action</div>
            </div>
            <div className="items-container">
              {salesItems.map((item) => (
                <div key={item.id} className="item-row">
                  <div className="item-cell">
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                      placeholder="Enter item name"
                    />
                  </div>
                  <div className="item-cell">
                    <label className="lifa-lila-switch">
                      <input
                        type="checkbox"
                        checked={item.lifa}
                        onChange={(e) => updateItem(item.id, 'lifa', e.target.checked)}
                      />
                      <span className="slider">
                        <div className="slider-labels">
                          <span>LILA</span>
                          <span>LIFA</span>
                        </div>
                      </span>
                    </label>
                  </div>
                  <div className="item-cell">
                    <input
                      type="text"
                      value={item.unitPack}
                      onChange={(e) => updateItem(item.id, 'unitPack', e.target.value)}
                      placeholder="Unit/Pack"
                    />
                  </div>
                  <div className="item-cell">
                    <input
                      type="text"
                      value={item.location}
                      onChange={(e) => updateItem(item.id, 'location', e.target.value)}
                      placeholder="Loc."
                    />
                  </div>
                  <div className="item-cell">
                    <input
                      type="text"
                      value={item.batch}
                      onChange={(e) => updateItem(item.id, 'batch', e.target.value)}
                      placeholder="Batch"
                    />
                  </div>
                  <div className="item-cell">
                    <input
                      type="text"
                      value={item.expiry}
                      onChange={(e) => updateItem(item.id, 'expiry', e.target.value)}
                      placeholder="MM/YY"
                    />
                  </div>
                  <div className="item-cell">
                    <input
                      type="number"
                      value={item.mrp}
                      onChange={(e) => updateItem(item.id, 'mrp', e.target.value)}
                      placeholder="MRP"
                    />
                  </div>
                  <div className="item-cell">
                    <input
                      type="number"
                      value={item.qty}
                      onChange={(e) => updateItem(item.id, 'qty', e.target.value)}
                      min="1"
                    />
                  </div>
                  <div className="item-cell">
                    <div className="discount-writer">
                      <input
                        type="number"
                        className="discount-input"
                        value={item.discountPercent}
                        onChange={(e) => updateItem(item.id, 'discountPercent', e.target.value)}
                        min="0"
                        max="100"
                      />
                      <span className="discount-type">%</span>
                    </div>
                  </div>
                  <div className="item-cell">
                    <input
                      type="number"
                      value={item.discountedPrice}
                      readOnly
                      placeholder="D.Price"
                    />
                  </div>
                  <div className="item-cell">
                    <input
                      type="number"
                      value={item.gstPercent}
                      onChange={(e) => updateItem(item.id, 'gstPercent', e.target.value)}
                      placeholder="GST%"
                    />
                  </div>
                  <div className="item-cell">
                    <span>₹{item.amount}</span>
                  </div>
                  <div className="item-cell">
                    <button
                      className="remove-item-btn"
                      onClick={() => removeItem(item.id)}
                      title="Remove Item"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              
              {/* Dynamic Add Item Row */}
              <div className="item-row add-item-dynamic">
                <div className="item-cell">
                  <input
                    ref={el => itemInputRefs.current['name'] = el}
                    type="text"
                    value={currentNewItem.name}
                    onChange={(e) => handleNewItemChange('name', e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, 'name')}
                    placeholder="Enter item name"
                  />
                </div>
                
                {showAllFields && (
                  <>
                    <div className="item-cell">
                      <label className="lifa-lila-switch">
                        <input
                          type="checkbox"
                          checked={currentNewItem.lifa}
                          onChange={(e) => handleNewItemChange('lifa', e.target.checked)}
                        />
                        <span className="slider">
                          <div className="slider-labels">
                            <span>LILA</span>
                            <span>LIFA</span>
                          </div>
                        </span>
                      </label>
                    </div>
                    <div className="item-cell">
                      <input
                        ref={el => itemInputRefs.current['unitPack'] = el}
                        type="text"
                        value={currentNewItem.unitPack}
                        onChange={(e) => handleNewItemChange('unitPack', e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, 'unitPack')}
                        placeholder="Unit/Pack"
                      />
                    </div>
                    <div className="item-cell">
                      <input
                        ref={el => itemInputRefs.current['location'] = el}
                        type="text"
                        value={currentNewItem.location}
                        onChange={(e) => handleNewItemChange('location', e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, 'location')}
                        placeholder="Loc."
                      />
                    </div>
                    <div className="item-cell">
                      <input
                        ref={el => itemInputRefs.current['batch'] = el}
                        type="text"
                        value={currentNewItem.batch}
                        onChange={(e) => handleNewItemChange('batch', e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, 'batch')}
                        placeholder="Batch"
                      />
                    </div>
                    <div className="item-cell">
                      <input
                        ref={el => itemInputRefs.current['expiry'] = el}
                        type="text"
                        value={currentNewItem.expiry}
                        onChange={(e) => handleNewItemChange('expiry', e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, 'expiry')}
                        placeholder="MM/YY"
                      />
                    </div>
                    <div className="item-cell">
                      <input
                        ref={el => itemInputRefs.current['mrp'] = el}
                        type="number"
                        value={currentNewItem.mrp}
                        onChange={(e) => handleNewItemChange('mrp', e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, 'mrp')}
                        placeholder="MRP"
                      />
                    </div>
                    <div className="item-cell">
                      <input
                        ref={el => itemInputRefs.current['qty'] = el}
                        type="number"
                        value={currentNewItem.qty}
                        onChange={(e) => handleNewItemChange('qty', e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, 'qty')}
                        min="1"
                      />
                    </div>
                    <div className="item-cell">
                      <div className="discount-writer">
                        <input
                          ref={el => itemInputRefs.current['discountPercent'] = el}
                          type="number"
                          className="discount-input"
                          value={currentNewItem.discountPercent}
                          onChange={(e) => handleNewItemChange('discountPercent', e.target.value)}
                          onKeyDown={(e) => handleKeyDown(e, 'discountPercent')}
                          min="0"
                          max="100"
                        />
                        <span className="discount-type">%</span>
                      </div>
                    </div>
                    <div className="item-cell">
                      <input
                        type="number"
                        value={currentNewItem.discountedPrice}
                        readOnly
                        placeholder="D.Price"
                      />
                    </div>
                    <div className="item-cell">
                      <input
                        ref={el => itemInputRefs.current['gstPercent'] = el}
                        type="number"
                        value={currentNewItem.gstPercent}
                        onChange={(e) => handleNewItemChange('gstPercent', e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, 'gstPercent')}
                        placeholder="GST%"
                      />
                    </div>
                    <div className="item-cell">
                      <span>₹{currentNewItem.amount}</span>
                    </div>
                    <div className="item-cell">
                      <button
                        className="add-btn"
                        onClick={addItem}
                        disabled={!currentNewItem.name.trim()}
                      >
                        Add
                      </button>
                    </div>
                  </>
                )}
                
                {!showAllFields && (
                  <>
                    <div className="item-cell empty-cell"></div>
                    <div className="item-cell empty-cell"></div>
                    <div className="item-cell empty-cell"></div>
                    <div className="item-cell empty-cell"></div>
                    <div className="item-cell empty-cell"></div>
                    <div className="item-cell empty-cell"></div>
                    <div className="item-cell empty-cell"></div>
                    <div className="item-cell empty-cell"></div>
                    <div className="item-cell empty-cell"></div>
                    <div className="item-cell empty-cell"></div>
                    <div className="item-cell empty-cell"></div>
                    <div className="item-cell empty-cell"></div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="summary-section">
            <div className="total-summary">
              <div className="summary-item">
                <span>Subtotal:</span>
                <span>₹{totals.subtotal}</span>
              </div>
              <div className="summary-item">
                <span>Discount:</span>
                <span>₹{totals.totalDiscount}</span>
              </div>
              <div className="summary-item">
                <span>GST:</span>
                <span>₹{totals.totalGst}</span>
              </div>
              <div className="summary-item total">
                <span>Total:</span>
                <span>₹{totals.grandTotal}</span>
              </div>
            </div>
            <div className="action-buttons">
              <button className="btn primary" onClick={handleSave}>Save Bill</button>
              <button className="btn secondary" onClick={handlePrint}>Print</button>
              <button className="btn secondary" onClick={handleEmail}>Email</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sales;