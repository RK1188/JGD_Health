import React from 'react';
import './Header.css';

const Header = ({ currentPage, onNavigate }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '' },
    { id: 'sales', label: 'Sales', icon: '' },
    { id: 'purchase', label: 'Purchase', icon: '' },
    { id: 'inventory', label: 'Inventory', icon: '' },
    { id: 'customers', label: 'Customers', icon: '' },
    { id: 'reports', label: 'Reports', icon: '' },
    { id: 'settings', label: 'Settings', icon: '' }
  ];

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <div className="logo">
            <span className="logo-icon"></span>
            <span className="logo-text">JGD Pharmacy</span>
          </div>
        </div>
        
        <nav className="header-nav">
          {navItems.map(item => (
            <button
              key={item.id}
              className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
              onClick={() => onNavigate(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </nav>
        
        <div className="header-right">
          <div className="user-info">
            <span className="user-name">Admin</span>
            <span className="user-avatar"></span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;