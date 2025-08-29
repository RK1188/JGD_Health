import React, { useState, useRef } from 'react';
import './Purchase.css';

const Purchase = () => {
  const [formData, setFormData] = useState({
    distributor: 'Qwertyuio',
    billNo: '123456789',
    billDate: '29/08/2025',
    dueDate: '05/09/2025',
    poSelection: 'PO/s',
    owner: 'Owner',
    credit: 'Credit'
  });

  const [items, setItems] = useState([
    {
      id: 1,
      itemName: 'Para Para 650 Tablet',
      lifa: false,
      lila: false,
      batch: 'BT001',
      expiry: '12/2025',
      mrp: '12.50',
      ptr: '10.00',
      qty: '100',
      free: '0',
      schAmt: '0.00',
      discPercent: '5',
      base: '950.00',
      gstPercent: '12',
      amount: '1064.00',
      manufacturer: 'PERK',
      packing: '1 Strip of 10 Tablet',
      location: '-',
      content: 'Paracetamol (650mg)'
    }
  ]);

  const [newItem, setNewItem] = useState({
    itemName: '',
    lifa: false,
    lila: false,
    batch: '',
    expiry: '',
    mrp: '',
    ptr: '',
    qty: '',
    free: '',
    schAmt: '',
    discPercent: '',
    base: '',
    gstPercent: '',
    amount: ''
  });

  const [showAllFields, setShowAllFields] = useState(false);
  const itemInputRefs = useRef({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNewItemChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewItem(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const toggleLIFA = (itemId) => {
    setItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, lifa: !item.lifa } : item
    ));
  };

  const toggleLILA = (itemId) => {
    setItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, lila: !item.lila } : item
    ));
  };

  const addItem = () => {
    if (newItem.itemName) {
      const item = {
        ...newItem,
        id: Date.now(),
        manufacturer: 'PERK',
        packing: '1 Strip of 10 Tablet',
        location: '-',
        content: 'Paracetamol (650mg)'
      };
      setItems(prev => [...prev, item]);
      setNewItem({
        itemName: '',
        lifa: false,
        lila: false,
        batch: '',
        expiry: '',
        mrp: '',
        ptr: '',
        qty: '',
        free: '',
        schAmt: '',
        discPercent: '',
        base: '',
        gstPercent: '',
        amount: ''
      });
      setShowAllFields(false);
    }
  };

  const handleKeyDown = (e, currentField) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      
      if (currentField === 'itemName') {
        if (newItem.itemName.trim()) {
          setShowAllFields(true);
          // Focus next field (lifa toggle)
          setTimeout(() => {
            const nextInput = itemInputRefs.current['batch'];
            if (nextInput) nextInput.focus();
          }, 100);
        }
      } else {
        const fieldOrder = ['batch', 'expiry', 'mrp', 'ptr', 'qty', 'free', 'schAmt', 'discPercent', 'base', 'gstPercent'];
        const currentIndex = fieldOrder.indexOf(currentField);
        
        if (currentIndex < fieldOrder.length - 1) {
          const nextField = fieldOrder[currentIndex + 1];
          const nextInput = itemInputRefs.current[nextField];
          if (nextInput) nextInput.focus();
        } else {
          // Last field, add item and start new row
          addItem();
          setTimeout(() => {
            const itemNameInput = itemInputRefs.current['itemName'];
            if (itemNameInput) itemNameInput.focus();
          }, 100);
        }
      }
    }
  };

  return (
    <div className="purchase-page">
      {/* Header Section */}
      <div className="purchase-header">
        <div className="breadcrumb">
          <span className="breadcrumb-item">Purchase</span>
          <span className="breadcrumb-separator">{">"}</span>
          <span className="breadcrumb-item active">New</span>
        </div>
      </div>

      {/* Warning Message */}
      <div className="warning-banner">
        <div className="warning-content">
          <div className="warning-icon">!</div>
          <div className="warning-text">
            This Purchase Bill contains Expired/will be Expiring in 6 months item(s)
          </div>
        </div>
      </div>

      {/* Control Bar */}
      <div className="control-bar">
        <div className="control-left">
          <select 
            className="control-dropdown"
            value={formData.poSelection}
            onChange={handleInputChange}
            name="poSelection"
          >
            <option>PO/s</option>
          </select>
          <select 
            className="control-dropdown"
            value={formData.owner}
            onChange={handleInputChange}
            name="owner"
          >
            <option>Owner</option>
          </select>
          <select 
            className="control-dropdown"
            value={formData.credit}
            onChange={handleInputChange}
            name="credit"
          >
            <option>Credit</option>
          </select>
        </div>
        <div className="control-right">
          <button className="btn btn-success control-btn">Save</button>
          <button className="btn btn-secondary control-btn">Settings</button>
        </div>
      </div>

      {/* Form Section */}
      <div className="purchase-form">
        <div className="form-row">
          <div className="form-group">
            <label>Distributor</label>
            <div className="distributor-field">
              <input
                type="text"
                className="form-control"
                value={formData.distributor}
                onChange={handleInputChange}
                name="distributor"
              />
              <button className="emails-btn">Emails</button>
            </div>
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Bill No./Order No.</label>
            <input
              type="text"
              className="form-control"
              value={formData.billNo}
              onChange={handleInputChange}
              name="billNo"
            />
          </div>
          <div className="form-group">
            <label>Bill Date</label>
            <input
              type="text"
              className="form-control"
              value={formData.billDate}
              onChange={handleInputChange}
              name="billDate"
            />
          </div>
          <div className="form-group">
            <label>Due Date</label>
            <input
              type="text"
              className="form-control"
              value={formData.dueDate}
              onChange={handleInputChange}
              name="dueDate"
            />
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="items-table-container">
        <table className="items-table">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>LIFA</th>
              <th>LILA</th>
              <th>Batch</th>
              <th>Expiry</th>
              <th>MRP</th>
              <th>PTR</th>
              <th>Qty</th>
              <th>Free</th>
              <th>Sch.Amt</th>
              <th>Disc%</th>
              <th>Base</th>
              <th>GST%</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id} className="item-row">
                <td>{item.itemName}</td>
                <td>
                  <label className="lifa-toggle">
                    <input
                      type="checkbox"
                      checked={item.lifa}
                      onChange={() => toggleLIFA(item.id)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </td>
                <td>
                  <label className="lila-toggle">
                    <input
                      type="checkbox"
                      checked={item.lila}
                      onChange={() => toggleLILA(item.id)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </td>
                <td>{item.batch}</td>
                <td>{item.expiry}</td>
                <td>{item.mrp}</td>
                <td>{item.ptr}</td>
                <td>{item.qty}</td>
                <td>{item.free}</td>
                <td>{item.schAmt}</td>
                <td>{item.discPercent}</td>
                <td>{item.base}</td>
                <td>{item.gstPercent}</td>
                <td>{item.amount}</td>
              </tr>
            ))}
            
            {/* Add Item Row */}
            <tr className="add-item-row">
              <td>
                <input
                  ref={el => itemInputRefs.current['itemName'] = el}
                  type="text"
                  className="table-input"
                  placeholder="Enter item name"
                  value={newItem.itemName}
                  onChange={handleNewItemChange}
                  onKeyDown={(e) => handleKeyDown(e, 'itemName')}
                  name="itemName"
                />
              </td>
              {showAllFields && (
                <>
                  <td>
                    <label className="lifa-toggle">
                      <input
                        type="checkbox"
                        checked={newItem.lifa}
                        onChange={handleNewItemChange}
                        name="lifa"
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </td>
                  <td>
                    <label className="lila-toggle">
                      <input
                        type="checkbox"
                        checked={newItem.lila}
                        onChange={handleNewItemChange}
                        name="lila"
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </td>
                  <td>
                    <input
                      ref={el => itemInputRefs.current['batch'] = el}
                      type="text"
                      className="table-input"
                      value={newItem.batch}
                      onChange={handleNewItemChange}
                      onKeyDown={(e) => handleKeyDown(e, 'batch')}
                      name="batch"
                    />
                  </td>
                  <td>
                    <input
                      ref={el => itemInputRefs.current['expiry'] = el}
                      type="text"
                      className="table-input"
                      value={newItem.expiry}
                      onChange={handleNewItemChange}
                      onKeyDown={(e) => handleKeyDown(e, 'expiry')}
                      name="expiry"
                    />
                  </td>
                  <td>
                    <input
                      ref={el => itemInputRefs.current['mrp'] = el}
                      type="text"
                      className="table-input"
                      value={newItem.mrp}
                      onChange={handleNewItemChange}
                      onKeyDown={(e) => handleKeyDown(e, 'mrp')}
                      name="mrp"
                    />
                  </td>
                  <td>
                    <input
                      ref={el => itemInputRefs.current['ptr'] = el}
                      type="text"
                      className="table-input"
                      value={newItem.ptr}
                      onChange={handleNewItemChange}
                      onKeyDown={(e) => handleKeyDown(e, 'ptr')}
                      name="ptr"
                    />
                  </td>
                  <td>
                    <input
                      ref={el => itemInputRefs.current['qty'] = el}
                      type="text"
                      className="table-input"
                      value={newItem.qty}
                      onChange={handleNewItemChange}
                      onKeyDown={(e) => handleKeyDown(e, 'qty')}
                      name="qty"
                    />
                  </td>
                  <td>
                    <input
                      ref={el => itemInputRefs.current['free'] = el}
                      type="text"
                      className="table-input"
                      value={newItem.free}
                      onChange={handleNewItemChange}
                      onKeyDown={(e) => handleKeyDown(e, 'free')}
                      name="free"
                    />
                  </td>
                  <td>
                    <input
                      ref={el => itemInputRefs.current['schAmt'] = el}
                      type="text"
                      className="table-input"
                      value={newItem.schAmt}
                      onChange={handleNewItemChange}
                      onKeyDown={(e) => handleKeyDown(e, 'schAmt')}
                      name="schAmt"
                    />
                  </td>
                  <td>
                    <input
                      ref={el => itemInputRefs.current['discPercent'] = el}
                      type="text"
                      className="table-input"
                      value={newItem.discPercent}
                      onChange={handleNewItemChange}
                      onKeyDown={(e) => handleKeyDown(e, 'discPercent')}
                      name="discPercent"
                    />
                  </td>
                  <td>
                    <input
                      ref={el => itemInputRefs.current['base'] = el}
                      type="text"
                      className="table-input"
                      value={newItem.base}
                      onChange={handleNewItemChange}
                      onKeyDown={(e) => handleKeyDown(e, 'base')}
                      name="base"
                    />
                  </td>
                  <td>
                    <input
                      ref={el => itemInputRefs.current['gstPercent'] = el}
                      type="text"
                      className="table-input"
                      value={newItem.gstPercent}
                      onChange={handleNewItemChange}
                      onKeyDown={(e) => handleKeyDown(e, 'gstPercent')}
                      name="gstPercent"
                    />
                  </td>
                  <td>
                    <input
                      ref={el => itemInputRefs.current['amount'] = el}
                      type="text"
                      className="table-input"
                      value={newItem.amount}
                      onChange={handleNewItemChange}
                      onKeyDown={(e) => handleKeyDown(e, 'amount')}
                      name="amount"
                    />
                  </td>
                </>
              )}
              {!showAllFields && (
                <>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </>
              )}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Product Details */}
      {items.length > 0 && (
        <div className="product-details">
          <div className="details-row">
            <span><strong>Manf.</strong> {items[0].manufacturer}</span>
            <span><strong>Packing</strong> {items[0].packing}</span>
            <span><strong>Loc.</strong> {items[0].location}</span>
            <span><strong>Content</strong> {items[0].content}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Purchase;