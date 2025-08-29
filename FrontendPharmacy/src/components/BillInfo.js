import React, { useState, useRef, useEffect } from 'react';
import './BillInfo.css';

const BillInfo = ({ customerInfo, onCustomerInfoChange }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const datePickerRef = useRef(null);

  const getCurrentDate = () => {
    return selectedDate.toLocaleDateString('en-GB');
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowDatePicker(false);
    // You can also trigger a callback here if needed
    console.log('Date changed to:', date.toLocaleDateString('en-GB'));
  };

  const formatDateForInput = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Close date picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        setShowDatePicker(false);
      }
    };

    if (showDatePicker) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDatePicker]);

  const handleCreateCounterBill = () => {
    const counterBillNumber = `CB-${Date.now().toString().slice(-6)}`;
    onCustomerInfoChange('search', `Counter Sale - ${counterBillNumber}`);
    onCustomerInfoChange('billingFor', 'self');
    console.log('Counter bill created:', counterBillNumber);
    alert(`Counter bill created: ${counterBillNumber}`);
  };

  return (
    <div className="bill-info-section">
      <div className="bill-date">
        <div className="date-icon"></div>
        <div className="date-info">
          <span className="label">Bill Date</span>
          <div className="date-picker-container" ref={datePickerRef}>
            <span 
              className="date clickable" 
              onClick={() => setShowDatePicker(!showDatePicker)}
              title="Click to open calendar"
            >
              {getCurrentDate()}
            </span>
            {showDatePicker && (
              <div className="date-picker-popup">
                <div className="date-picker-header">
                  <h4>Select Bill Date</h4>
                </div>
                <input
                  type="date"
                  value={formatDateForInput(selectedDate)}
                  onChange={(e) => handleDateChange(new Date(e.target.value))}
                  className="date-input"
                  autoFocus
                />
                <div className="date-picker-buttons">
                  <button 
                    className="date-btn today-btn"
                    onClick={() => handleDateChange(new Date())}
                  >
                    Today
                  </button>
                  <button 
                    className="date-btn yesterday-btn"
                    onClick={() => {
                      const yesterday = new Date();
                      yesterday.setDate(yesterday.getDate() - 1);
                      handleDateChange(yesterday);
                    }}
                  >
                    Yesterday
                  </button>
                  <button 
                    className="date-btn close-btn"
                    onClick={() => setShowDatePicker(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
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
            onChange={(e) => onCustomerInfoChange('search', e.target.value)}
          />
          <button 
            className="create-counter-bill"
            onClick={handleCreateCounterBill}
          >
            Create as Counter Bill
          </button>
        </div>
      </div>
      
      <div className="billing-for">
        <span className="label">Billing for</span>
        <select 
          value={customerInfo.billingFor}
          onChange={(e) => onCustomerInfoChange('billingFor', e.target.value)}
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
            onChange={(e) => onCustomerInfoChange('doctor', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default BillInfo;