const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');

let mainWindow;
let isDev;

try {
  isDev = require('electron-is-dev');
} catch (e) {
  isDev = process.env.NODE_ENV === 'development' || process.env.ELECTRON_IS_DEV === 'true';
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1200,
    minHeight: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
      webSecurity: false
    },
    icon: path.join(__dirname, 'assets/icon.png'),
    show: false
  });

  // Load React app
  const startUrl = isDev 
    ? 'http://localhost:3000' 
    : `file://${path.join(__dirname, '../build/index.html')}`;
  
  mainWindow.loadURL(startUrl);

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    
    if (isDev) {
      mainWindow.webContents.openDevTools();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Dashboard',
          click: () => {
            mainWindow.webContents.send('navigate-to', 'dashboard');
          }
        },
        {
          label: 'Sales',
          click: () => {
            mainWindow.webContents.send('navigate-to', 'sales');
          }
        },
        {
          label: 'Purchase',
          click: () => {
            mainWindow.webContents.send('navigate-to', 'purchase');
          }
        },
        { type: 'separator' },
        {
          label: 'Exit',
          accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q',
          click: () => {
            app.quit();
          }
        }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forcereload' },
        { role: 'toggledevtools' },
        { type: 'separator' },
        { role: 'resetzoom' },
        { role: 'zoomin' },
        { role: 'zoomout' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      label: 'Window',
      submenu: [
        { role: 'minimize' },
        { role: 'close' }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// IPC Handlers for React components
ipcMain.handle('navigate-to', async (event, page) => {
  return { success: true };
});

ipcMain.handle('get-products', async () => {
  return [
    { 
      id: 1, 
      name: 'Para Para 650 Tablet', 
      unitPack: '10 / 10 Tablet',
      manufacturer: 'PERK',
      packing: '1 Strip of 10 Tablet',
      location: 'LP',
      batch: '5',
      expiry: '10/26',
      mrp: 89.00,
      content: 'Paracetamol (650mg)',
      margin: 0,
      gst: 12
    },
    { 
      id: 2, 
      name: 'Crocin 650 Tablet', 
      unitPack: '15 / 15 Tablet',
      manufacturer: 'GSK',
      packing: '1 Strip of 15 Tablet',
      location: 'A1',
      batch: 'CR001',
      expiry: '12/26',
      mrp: 52.50,
      content: 'Paracetamol (650mg)',
      margin: 0,
      gst: 12
    },
    { 
      id: 3, 
      name: 'Dolo 650 Tablet', 
      unitPack: '15 / 15 Tablet',
      manufacturer: 'Micro Labs',
      packing: '1 Strip of 15 Tablet',
      location: 'B2',
      batch: 'DL123',
      expiry: '08/26',
      mrp: 30.75,
      content: 'Paracetamol (650mg)',
      margin: 0,
      gst: 12
    }
  ];
});

ipcMain.handle('search-products', async (event, query) => {
  const products = await ipcMain.emit('get-products');
  return products.filter(product => 
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.manufacturer.toLowerCase().includes(query.toLowerCase())
  );
});

ipcMain.handle('save-sale', async (event, saleData) => {
  console.log('Sale saved:', saleData);
  // Here you would typically save to database
  return { success: true, saleId: `INV-${Date.now()}` };
});

ipcMain.handle('get-customers', async (event, query) => {
  // Mock customer data
  const customers = [
    { id: 1, name: 'John Doe', phone: '+91 9876543210', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', phone: '+91 8765432109', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', phone: '+91 7654321098', email: 'bob@example.com' }
  ];
  
  if (!query) return customers;
  
  return customers.filter(customer => 
    customer.name.toLowerCase().includes(query.toLowerCase()) ||
    customer.phone.includes(query)
  );
});

ipcMain.handle('save-customer', async (event, customerData) => {
  console.log('Customer saved:', customerData);
  return { success: true, customerId: Date.now() };
});