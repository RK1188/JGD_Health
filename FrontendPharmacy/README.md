# JGD Pharmacy Management System

A comprehensive pharmacy management desktop application built with **Electron.js + React.js**.

![Pharmacy System](https://img.shields.io/badge/Electron-React-blue)
![Version](https://img.shields.io/badge/version-1.0.0-green)

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation & Running

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Mode**
   ```bash
   npm run dev
   ```
   This command will:
   - Start React development server on http://localhost:3000
   - Launch Electron desktop application
   - Enable hot reloading for development

3. **Alternative: Run Components Separately**
   ```bash
   # Terminal 1: Start React development server
   npm start
   
   # Terminal 2: Start Electron (after React server is running)
   npx electron .
   ```

4. **Build for Production**
   ```bash
   # Build React app
   npm run build
   
   # Package Electron app
   npm run electron-pack
   ```

## Testing the Application

### 1. **Dashboard Page**
- **Navigation**: Click on different menu items (Dashboard, Sales, etc.)
- **Statistics Cards**: View animated sales statistics
- **Quick Actions**: Test action buttons
- **Recent Sales**: Check sales list display

### 2. **Sales Page - Complete Testing**

#### **Header Controls**
- Change **Owner/Staff** dropdown
- Switch **Payment Type** (Cash/Card/UPI)
- Click **Set Reminder** button
- Toggle **Pickup/Delivery** option
- Test **Save** button
- Click **Settings** button

#### **Bill Information Section**
- **Bill Date**: Automatically shows current date
- **Customer Search**: Type in search field
- **Create Counter Bill**: Click button to auto-fill
- **Billing For**: Change dropdown (Self/Family/Company)
- **Doctor Name**: Enter doctor information

#### **Dynamic Items Table**
- **Add Item**: Click "Add Item" button
- **Product Search**: 
  - Type "Para" - should auto-fill Para Para 650 Tablet
  - Type "Crocin" - should auto-fill Crocin 650 Tablet
- **LIFA/LILA Toggle**: 
  - Red = LILA (default)
  - Green = LIFA (when toggled)
- **Unit/Pack**: Auto-populated from product data
- **Location**: Editable field
- **Batch**: Editable field  
- **Expiry**: MM/YY format
- **MRP**: Editable price field
- **Quantity**: Change quantity (affects calculations)
- **Discount Writer**: 
  - Enter discount value
  - Toggle between % and ₹
  - Watch D.Price update automatically
- **GST**: Enter GST percentage
- **Amount**: Auto-calculated (D.Price × Qty + GST)
- **Remove**: Click delete button to delete row

#### **Real-time Calculations**
- **Subtotal**: Sum of all MRP × Quantity
- **Discount**: Total discount amount
- **GST**: Total GST amount
- **Grand Total**: Subtotal - Discount + GST

#### **Action Buttons**
- **Save Bill**: Saves bill data
- **Print**: Print functionality
- **Email**: Email functionality

## Available Scripts

- `npm start` - Start React development server only
- `npm run dev` - Start React + Electron together (recommended)
- `npm run build` - Build React app for production
- `npm run electron` - Start Electron only (requires built React app)
- `npm run electron-pack` - Package app for distribution
- `npm run dist` - Build and package for distribution

## Project Structure

```
src/
├── components/           # Reusable React components
│   ├── Header.js        # Main navigation header
│   ├── SalesHeader.js   # Sales page header controls
│   ├── BillInfo.js      # Bill and customer information
│   ├── ItemsTable.js    # Dynamic items management table
│   ├── LIFALILAToggle.js # Custom toggle switch
│   ├── DiscountWriter.js # Discount input component
│   └── SalesSummary.js  # Bill totals and actions
├── pages/               # Main application pages
│   ├── Dashboard.js     # Dashboard with statistics
│   └── Sales.js         # Sales management page
├── App.js              # Main app component with routing
└── index.js            # React app entry point

public/                 # Static assets
main.js                # Electron main process
preload.js             # Electron preload script (IPC bridge)
package.json           # Dependencies and scripts
```

## Key Features

### **Dynamic Sales Management**
- Real-time item addition/removal
- Product search with auto-fill
- LIFA/LILA toggle switches
- Smart discount calculations
- GST and total calculations

### **Modern UI/UX**
- Responsive design
- Professional styling
- Smooth animations
- Intuitive navigation

### **Performance**
- React hooks for state management
- Optimized component rendering
- Fast Electron desktop performance

## Troubleshooting

### Port 3000 Already in Use
```bash
# Kill existing process on port 3000
# Windows:
netstat -ano | findstr :3000
taskkill //PID [PID_NUMBER] //F

# Then restart:
npm run dev
```

### Electron Not Starting
```bash
# Ensure React server is running first
npm start
# Then in another terminal:
npx electron .
```

### Build Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Distribution

To create distributable packages:

```bash
# Build and package
npm run dist

# Output will be in dist/ folder:
# - Windows: .exe installer
# - macOS: .dmg file
# - Linux: .AppImage
```

## Security

- Context isolation enabled
- Node integration disabled in renderer
- Secure IPC communication via preload script

## License

MIT License - JGD Health

---

**Your Pharmacy Management System is ready to use!**

Run `npm run dev` to start the application.