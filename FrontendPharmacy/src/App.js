import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Sales from './pages/Sales';
import Purchase from './pages/Purchase';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for navigation events from Electron menu
    if (window.electronAPI) {
      window.electronAPI.onNavigate((page) => {
        setCurrentPage(page);
        navigate(`/${page}`);
      });
    }
  }, [navigate]);

  const handleNavigation = (page) => {
    setCurrentPage(page);
    navigate(`/${page}`);
  };

  return (
    <div className="App">
      <Header currentPage={currentPage} onNavigate={handleNavigation} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/purchase" element={<Purchase />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;