# JGD Pharmacy - Testing Checklist

## Application Startup Test
- [ ] Run `npm install` (should complete without errors)
- [ ] Run `npm run dev` (should start React + Electron)
- [ ] Desktop window opens (1400x900px)
- [ ] Application shows JGD Pharmacy header
- [ ] No console errors in developer tools

## Navigation Test
- [ ] Click **Dashboard** - shows statistics page
- [ ] Click **Sales** - shows sales management page
- [ ] Click **Inventory** - placeholder (not implemented)
- [ ] Click **Customers** - placeholder (not implemented)
- [ ] Click **Reports** - placeholder (not implemented)
- [ ] Click **Settings** - placeholder (not implemented)

## Dashboard Page Test
- [ ] **Date Display**: Shows current date correctly
- [ ] **Statistics Cards**: All 4 cards visible and animated
  - [ ] Today's Sales: ₹2,450.75
  - [ ] Products Sold: 143
  - [ ] Customers Served: 89
  - [ ] Low Stock Items: 12
- [ ] **Recent Sales**: List shows 5 sample sales
- [ ] **Top Products**: Shows 4 sample products
- [ ] **Quick Actions**: 4 action buttons present
- [ ] **Low Stock Alerts**: Shows 3 warning items

## Sales Page - Header Controls Test
- [ ] **Breadcrumb**: Shows "Sales > New"
- [ ] **Owner Dropdown**: Switch between Owner/Staff
- [ ] **Payment Type**: Switch between Cash/Card/UPI icons
- [ ] **Set Reminder**: Click shows "coming soon" alert
- [ ] **Pickup/Delivery**: Toggle between options
- [ ] **Save Button**: Blue save button with dropdown arrow
- [ ] **Settings Button**: Gear icon, shows "coming soon" alert

## Sales Page - Bill Info Test
- [ ] **Bill Date**: Shows current date (28/08/2025 format)
- [ ] **Customer Search**: Input field accepts text
- [ ] **Create Counter Bill**: Green button, sets customer to "Counter Sale"
- [ ] **Billing For**: Dropdown with Self/Family/Company options
- [ ] **Doctor Field**: Input accepts doctor name

## Sales Page - Items Table Test (CRITICAL)
- [ ] **Table Headers**: All 13 columns visible
  - Item Name | LIFA/LILA | Unit/Pack | Loc. | Batch | Expiry | MRP | Qty. | D% | D.Price | GST% | Amount | Action
- [ ] **Sample Items**: 2 pre-loaded items (Para Para 650, Crocin 650)

### LIFA/LILA Toggle Test
- [ ] **Default State**: Shows red background (LILA)
- [ ] **Toggle Click**: Changes to green background (LIFA)
- [ ] **Labels**: "LILA" and "LIFA" text visible
- [ ] **Smooth Animation**: Toggle slides smoothly

### Product Search Test
- [ ] **Type "Para"**: Auto-fills Para Para 650 Tablet details
- [ ] **Type "Crocin"**: Auto-fills Crocin 650 Tablet details
- [ ] **Type "Dolo"**: Auto-fills Dolo 650 Tablet details
- [ ] **Unit/Pack**: Auto-populated (read-only)
- [ ] **Location**: Auto-populated (editable)
- [ ] **Batch**: Auto-populated (editable)
- [ ] **Expiry**: Auto-populated (editable)
- [ ] **MRP**: Auto-populated (editable)
- [ ] **GST**: Auto-populated (editable)

### Dynamic Calculations Test
- [ ] **Change MRP**: D.Price updates automatically
- [ ] **Change Quantity**: Amount updates automatically
- [ ] **Discount % Test**: 
  - Set discount to 10%
  - D.Price = MRP × (1 - 10/100)
  - Amount = (D.Price × Qty) + GST
- [ ] **Discount ₹ Test**:
  - Switch to ₹ mode
  - Set discount to ₹5
  - D.Price = MRP - ₹5
- [ ] **GST Calculation**: Amount includes GST percentage
- [ ] **All Totals Update**: Subtotal, Discount, GST, Grand Total

### Item Management Test
- [ ] **Add Item**: "Add Item" creates new empty row
- [ ] **Remove Item**: delete button removes row
- [ ] **Multiple Items**: Can add 5+ items
- [ ] **Each Row Independent**: Changes don't affect other rows

## Sales Summary Test
- [ ] **Subtotal**: Sum of all MRP × Quantity
- [ ] **Total Discount**: Sum of all discount amounts
- [ ] **Total GST**: Sum of all GST amounts  
- [ ] **Grand Total**: Subtotal - Discount + GST
- [ ] **Save Bill**: Shows success message with invoice ID
- [ ] **Print Button**: Shows "coming soon" alert
- [ ] **Email Button**: Shows "coming soon" alert

## Responsive Design Test
- [ ] **Resize Window**: Content adapts to smaller sizes
- [ ] **Mobile View**: Table scrolls horizontally if needed
- [ ] **All Buttons**: Remain clickable at all sizes

## Performance Test
- [ ] **Add 10 Items**: Application remains responsive
- [ ] **Rapid Calculations**: No lag when changing values quickly
- [ ] **Memory Usage**: No memory leaks (check task manager)

## How to Test

1. **Start Application**:
   ```bash
   cd "D:\vscode_workspace\JGD_Health\FrontendPharmacy"
   npm run dev
   ```

2. **Open Developer Tools**: Press F12 to check for errors

3. **Go Through Checklist**: Test each item systematically

4. **Report Issues**: Note any failing tests

## Success Criteria
- [ ] All navigation works
- [ ] LIFA/LILA toggles work perfectly
- [ ] Product search auto-fills correctly
- [ ] Discount calculations are accurate
- [ ] Real-time totals update
- [ ] Items can be added/removed dynamically
- [ ] No JavaScript errors in console
- [ ] Application runs as desktop app

## Expected Results
When fully working, you should see:
- **Professional desktop application** with JGD Pharmacy branding
- **Fully functional sales page** matching your reference image
- **Dynamic item rows** that calculate in real-time
- **LIFA/LILA switches** that toggle red ↔ green
- **Product search** that auto-fills medicine details
- **Responsive design** that works at any window size

**If all tests pass, your Electron.js + React.js pharmacy system is production-ready!**