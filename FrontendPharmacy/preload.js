const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // Navigation
  navigateTo: (page) => ipcRenderer.invoke('navigate-to', page),
  onNavigate: (callback) => {
    ipcRenderer.on('navigate-to', (event, page) => callback(page));
    return () => ipcRenderer.removeAllListeners('navigate-to');
  },
  
  // Products
  getProducts: () => ipcRenderer.invoke('get-products'),
  searchProducts: (query) => ipcRenderer.invoke('search-products', query),
  
  // Sales
  saveSale: (saleData) => ipcRenderer.invoke('save-sale', saleData),
  
  // Customers
  getCustomers: (query) => ipcRenderer.invoke('get-customers', query),
  saveCustomer: (customerData) => ipcRenderer.invoke('save-customer', customerData)
});