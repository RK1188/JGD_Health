import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [currentDate, setCurrentDate] = useState('');
  const [stats, setStats] = useState({
    todaySales: 2450.75,
    productsSold: 143,
    customersServed: 89,
    lowStockItems: 12
  });

  useEffect(() => {
    // Update current date
    const now = new Date();
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    setCurrentDate(now.toLocaleDateString('en-US', options));

    // Animate stat cards
    const timer = setTimeout(() => {
      const statCards = document.querySelectorAll('.stat-card');
      statCards.forEach((card, index) => {
        setTimeout(() => {
          card.classList.add('animate-fadeInUp');
        }, index * 100);
      });
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const statCards = [
    {
      title: "Today's Sales",
      value: `₹${stats.todaySales.toFixed(2)}`,
      icon: '',
      color: 'success',
      trend: '+12.5%'
    },
    {
      title: 'Products Sold',
      value: stats.productsSold.toString(),
      icon: '',
      color: 'primary',
      trend: '+8.3%'
    },
    {
      title: 'Customers Served',
      value: stats.customersServed.toString(),
      icon: '',
      color: 'info',
      trend: '+15.2%'
    },
    {
      title: 'Low Stock Items',
      value: stats.lowStockItems.toString(),
      icon: '',
      color: 'warning',
      trend: '-2 from yesterday'
    }
  ];

  const recentSales = [
    { id: 'INV-001', customer: 'John Doe', amount: 125.50, time: '10:30 AM' },
    { id: 'INV-002', customer: 'Jane Smith', amount: 89.25, time: '11:15 AM' },
    { id: 'INV-003', customer: 'Bob Johnson', amount: 245.75, time: '12:00 PM' },
    { id: 'INV-004', customer: 'Alice Brown', amount: 67.00, time: '12:30 PM' },
    { id: 'INV-005', customer: 'Charlie Wilson', amount: 198.50, time: '1:15 PM' }
  ];

  const topProducts = [
    { name: 'Para Para 650 Tablet', sold: 45, revenue: '₹4,005' },
    { name: 'Crocin 650 Tablet', sold: 38, revenue: '₹1,995' },
    { name: 'Dolo 650 Tablet', sold: 32, revenue: '₹984' },
    { name: 'Amoxicillin 250mg', sold: 28, revenue: '₹2,100' }
  ];

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <div className="header-content">
            <h1 className="dashboard-title">Dashboard</h1>
            <p className="dashboard-subtitle" id="current-date">{currentDate}</p>
          </div>
        </div>

        <div className="stats-grid">
          {statCards.map((stat, index) => (
            <div key={index} className={`stat-card ${stat.color}`}>
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-content">
                <h3 className="stat-title">{stat.title}</h3>
                <p className="stat-value">{stat.value}</p>
                <span className="stat-trend">{stat.trend}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <div className="card-header">
              <h3>Recent Sales</h3>
              <button className="view-all-btn">View All</button>
            </div>
            <div className="card-body">
              <div className="sales-list">
                {recentSales.map(sale => (
                  <div key={sale.id} className="sale-item">
                    <div className="sale-info">
                      <span className="sale-id">{sale.id}</span>
                      <span className="customer-name">{sale.customer}</span>
                    </div>
                    <div className="sale-details">
                      <span className="sale-amount">₹{sale.amount.toFixed(2)}</span>
                      <span className="sale-time">{sale.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-header">
              <h3>Top Selling Products</h3>
              <button className="view-all-btn">View All</button>
            </div>
            <div className="card-body">
              <div className="products-list">
                {topProducts.map((product, index) => (
                  <div key={index} className="product-item">
                    <div className="product-info">
                      <span className="product-name">{product.name}</span>
                      <span className="product-sold">{product.sold} units sold</span>
                    </div>
                    <div className="product-revenue">{product.revenue}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-header">
              <h3>Quick Actions</h3>
            </div>
            <div className="card-body">
              <div className="quick-actions">
                <button className="action-btn primary">
                  <span className="action-icon"></span>
                  <span>New Sale</span>
                </button>
                <button className="action-btn secondary">
                  <span className="action-icon"></span>
                  <span>Add Product</span>
                </button>
                <button className="action-btn success">
                  <span className="action-icon"></span>
                  <span>New Customer</span>
                </button>
                <button className="action-btn info">
                  <span className="action-icon"></span>
                  <span>View Reports</span>
                </button>
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-header">
              <h3>Low Stock Alert</h3>
            </div>
            <div className="card-body">
              <div className="alert-list">
                <div className="alert-item">
                  <div className="alert-icon"></div>
                  <div className="alert-info">
                    <span className="alert-product">Aspirin 75mg</span>
                    <span className="alert-stock">Only 5 units left</span>
                  </div>
                </div>
                <div className="alert-item">
                  <div className="alert-icon"></div>
                  <div className="alert-info">
                    <span className="alert-product">Omeprazole 20mg</span>
                    <span className="alert-stock">Only 8 units left</span>
                  </div>
                </div>
                <div className="alert-item">
                  <div className="alert-icon"></div>
                  <div className="alert-info">
                    <span className="alert-product">Metformin 500mg</span>
                    <span className="alert-stock">Only 3 units left</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;