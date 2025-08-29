import React from 'react';
import './SalesSummary.css';

const SalesSummary = ({ totals, onSave, onPrint, onEmail }) => {
  return (
    <div className="summary-section">
      <div className="total-summary">
        <div className="summary-item">
          <span className="summary-label">Subtotal:</span>
          <span className="summary-value">₹{totals.subtotal.toFixed(2)}</span>
        </div>
        
        <div className="summary-item">
          <span className="summary-label">Discount:</span>
          <span className="summary-value discount">₹{totals.discount.toFixed(2)}</span>
        </div>
        
        <div className="summary-item">
          <span className="summary-label">GST:</span>
          <span className="summary-value gst">₹{totals.gst.toFixed(2)}</span>
        </div>
        
        <div className="summary-item total">
          <span className="summary-label">Total:</span>
          <span className="summary-value">₹{totals.total.toFixed(2)}</span>
        </div>
      </div>
      
      <div className="action-buttons">
        <button className="btn primary" onClick={onSave}>
          Save Bill
        </button>
        <button className="btn secondary" onClick={onPrint}>
          Print
        </button>
        <button className="btn secondary" onClick={onEmail}>
          Email
        </button>
      </div>
    </div>
  );
};

export default SalesSummary;