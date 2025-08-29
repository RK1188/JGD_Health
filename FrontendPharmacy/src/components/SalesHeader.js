import React from 'react';
import './SalesHeader.css';

const SalesHeader = ({ controls, onControlChange, onSave }) => {
  const handleSetReminder = () => {
    const reminderTime = prompt('Set reminder time (format: HH:MM)', '10:00');
    if (reminderTime) {
      const reminderDate = prompt('Set reminder date (format: DD/MM/YYYY)', new Date().toLocaleDateString('en-GB'));
      if (reminderDate) {
        alert(`Reminder set for ${reminderDate} at ${reminderTime}`);
        // Here you could integrate with a real reminder system
        console.log('Reminder set:', { date: reminderDate, time: reminderTime });
      }
    }
  };

  const handleSettings = () => {
    const settings = [
      'Auto-save: ON',
      'Print format: A4',
      'Currency: ₹ (INR)',
      'Tax calculation: Inclusive',
      'Inventory update: Real-time'
    ];
    alert('Current Settings:\n\n' + settings.join('\n'));
  };

  return (
    <div className="sales-header">
      <div className="breadcrumb">Sales {'>'} New</div>
      
      <div className="header-controls">
        <select 
          className="control-select" 
          value={controls.owner}
          onChange={(e) => onControlChange('owner', e.target.value)}
        >
          <option value="owner">Owner</option>
          <option value="staff">Staff</option>
        </select>
        
        <select 
          className="control-select payment-type" 
          value={controls.paymentType}
          onChange={(e) => onControlChange('paymentType', e.target.value)}
        >
          <option value="cash">Cash</option>
          <option value="card">Card</option>
          <option value="upi">UPI</option>
        </select>
        
        <button 
          className="control-btn reminder-btn" 
          onClick={handleSetReminder}
        >
          Set Reminder
        </button>
        
        <select 
          className="control-select" 
          value={controls.pickupType}
          onChange={(e) => onControlChange('pickupType', e.target.value)}
        >
          <option value="pickup">Pickup</option>
          <option value="delivery">Delivery</option>
        </select>
        
        <button 
          className="save-btn" 
          onClick={onSave}
        >
          Save
        </button>
        
        <button 
          className="settings-btn" 
          onClick={handleSettings}
        >
          Settings
        </button>
      </div>
    </div>
  );
};

export default SalesHeader;