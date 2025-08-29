let salesItems = [];
let sampleProducts = [
    {
        id: 1,
        name: "Para Para 650 Tablet",
        unitPack: "10 / 10 Tablet",
        manufacturer: "PERK",
        packing: "1 Strip of 10 Tablet",
        location: "LP",
        batch: "5",
        expiry: "10/26",
        mrp: 89.00,
        content: "Paracetamol (650mg)",
        margin: 0,
        gst: 12
    },
    {
        id: 2,
        name: "Crocin 650 Tablet",
        unitPack: "15 / 15 Tablet", 
        manufacturer: "GSK",
        packing: "1 Strip of 15 Tablet",
        location: "A1",
        batch: "CR001",
        expiry: "12/26",
        mrp: 52.50,
        content: "Paracetamol (650mg)",
        margin: 0,
        gst: 12
    }
];

document.addEventListener('DOMContentLoaded', function() {
    loadHeader();
    initializeSales();
    setupEventListeners();
    updateBillDate();
});

function updateBillDate() {
    const billDateElement = document.getElementById('bill-date');
    if (billDateElement) {
        const today = new Date();
        const formattedDate = today.toLocaleDateString('en-GB');
        billDateElement.textContent = formattedDate;
    }
}

function initializeSales() {
    updateTotals();
    addSampleItems();
}

function addSampleItems() {
    // Add sample items from the image
    addItemRow(sampleProducts[0]);
    addItemRow(sampleProducts[1]);
}

function setupEventListeners() {
    // Add Item Button
    document.getElementById('add-item-btn').addEventListener('click', () => {
        addItemRow();
    });

    // Header controls
    document.getElementById('owner-select').addEventListener('change', updateOwner);
    document.getElementById('payment-type').addEventListener('change', updatePaymentType);
    document.getElementById('set-reminder').addEventListener('click', setReminder);
    document.getElementById('pickup-type').addEventListener('change', updatePickupType);
    document.getElementById('save-btn').addEventListener('click', saveBill);
    document.getElementById('settings-btn').addEventListener('click', openSettings);

    // Customer search
    document.getElementById('customer-search').addEventListener('input', debounce(searchCustomer, 300));
    document.querySelector('.create-counter-bill').addEventListener('click', createCounterBill);

    // Action buttons
    document.getElementById('save-bill').addEventListener('click', saveBill);
    document.getElementById('print-bill').addEventListener('click', printBill);
    document.getElementById('email-bill').addEventListener('click', emailBill);
}

function addItemRow(product = null) {
    const itemsContainer = document.getElementById('items-container');
    const itemIndex = salesItems.length;
    
    const item = product || {
        id: Date.now(),
        name: "",
        unitPack: "",
        location: "",
        batch: "",
        expiry: "",
        mrp: 0,
        quantity: 1,
        discount: 0,
        discountType: "%",
        gst: 0,
        isLIFA: false
    };
    
    salesItems.push(item);
    
    const itemRow = document.createElement('div');
    itemRow.className = 'item-row';
    itemRow.dataset.index = itemIndex;
    
    itemRow.innerHTML = `
        <div class="item-cell">
            <input type="text" 
                   value="${item.name}" 
                   placeholder="Search item name" 
                   onchange="updateItemField(${itemIndex}, 'name', this.value)"
                   oninput="searchProductName(${itemIndex}, this.value)">
        </div>
        <div class="item-cell">
            <div class="lifa-lila-switch">
                <input type="checkbox" 
                       id="switch-${itemIndex}" 
                       ${item.isLIFA ? 'checked' : ''}
                       onchange="toggleLIFALILA(${itemIndex}, this.checked)">
                <label for="switch-${itemIndex}" class="slider">
                    <div class="slider-labels">
                        <span>LILA</span>
                        <span>LIFA</span>
                    </div>
                </label>
            </div>
        </div>
        <div class="item-cell">
            <input type="text" 
                   value="${item.unitPack}" 
                   readonly
                   placeholder="Unit/Pack">
        </div>
        <div class="item-cell">
            <input type="text" 
                   value="${item.location || ''}" 
                   onchange="updateItemField(${itemIndex}, 'location', this.value)"
                   placeholder="Loc.">
        </div>
        <div class="item-cell">
            <input type="text" 
                   value="${item.batch || ''}" 
                   onchange="updateItemField(${itemIndex}, 'batch', this.value)"
                   placeholder="Batch">
        </div>
        <div class="item-cell">
            <input type="text" 
                   value="${item.expiry || ''}" 
                   onchange="updateItemField(${itemIndex}, 'expiry', this.value)"
                   placeholder="MM/YY">
        </div>
        <div class="item-cell">
            <input type="number" 
                   value="${item.mrp}" 
                   step="0.01"
                   onchange="updateItemField(${itemIndex}, 'mrp', parseFloat(this.value))"
                   placeholder="MRP">
        </div>
        <div class="item-cell">
            <input type="number" 
                   value="${item.quantity}" 
                   min="1"
                   onchange="updateItemField(${itemIndex}, 'quantity', parseInt(this.value))"
                   placeholder="Qty">
        </div>
        <div class="item-cell">
            <div class="discount-writer">
                <input type="number" 
                       class="discount-input"
                       value="${item.discount}" 
                       min="0"
                       onchange="updateItemField(${itemIndex}, 'discount', parseFloat(this.value))"
                       placeholder="0">
                <select onchange="updateItemField(${itemIndex}, 'discountType', this.value)">
                    <option value="%" ${item.discountType === '%' ? 'selected' : ''}>%</option>
                    <option value="₹" ${item.discountType === '₹' ? 'selected' : ''}>₹</option>
                </select>
            </div>
        </div>
        <div class="item-cell">
            <span id="d-price-${itemIndex}">₹${calculateDiscountedPrice(item).toFixed(2)}</span>
        </div>
        <div class="item-cell">
            <input type="number" 
                   value="${item.gst}" 
                   min="0"
                   max="100"
                   onchange="updateItemField(${itemIndex}, 'gst', parseFloat(this.value))"
                   placeholder="GST%">
        </div>
        <div class="item-cell">
            <span id="amount-${itemIndex}">₹${calculateItemAmount(item).toFixed(2)}</span>
        </div>
        <div class="item-cell">
            <button class="remove-item-btn" onclick="removeItemRow(${itemIndex})">
                🗑️
            </button>
        </div>
    `;
    
    itemsContainer.appendChild(itemRow);
    updateTotals();
}

function updateItemField(itemIndex, field, value) {
    if (salesItems[itemIndex]) {
        salesItems[itemIndex][field] = value;
        updateItemCalculations(itemIndex);
        updateTotals();
    }
}

function toggleLIFALILA(itemIndex, isLIFA) {
    if (salesItems[itemIndex]) {
        salesItems[itemIndex].isLIFA = isLIFA;
        console.log(`Item ${itemIndex} switched to: ${isLIFA ? 'LIFA' : 'LILA'}`);
    }
}

function searchProductName(itemIndex, query) {
    if (query.length < 2) return;
    
    // Search in sample products
    const matchedProducts = sampleProducts.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase())
    );
    
    if (matchedProducts.length > 0) {
        const product = matchedProducts[0];
        // Auto-fill the matched product details
        Object.assign(salesItems[itemIndex], product);
        updateItemRow(itemIndex);
    }
}

function updateItemRow(itemIndex) {
    const item = salesItems[itemIndex];
    const itemRow = document.querySelector(`[data-index="${itemIndex}"]`);
    
    if (itemRow && item) {
        // Update all input fields with the new values
        const inputs = itemRow.querySelectorAll('input');
        inputs[0].value = item.name; // Item name
        inputs[2].value = item.unitPack || ''; // Unit/Pack
        inputs[3].value = item.location || ''; // Location
        inputs[4].value = item.batch || ''; // Batch
        inputs[5].value = item.expiry || ''; // Expiry
        inputs[6].value = item.mrp; // MRP
        inputs[7].value = item.quantity; // Quantity
        inputs[8].value = item.discount; // Discount
        inputs[10].value = item.gst; // GST
        
        updateItemCalculations(itemIndex);
    }
}

function calculateDiscountedPrice(item) {
    if (!item.mrp) return 0;
    
    if (item.discountType === '%') {
        return item.mrp * (1 - item.discount / 100);
    } else {
        return Math.max(0, item.mrp - item.discount);
    }
}

function calculateItemAmount(item) {
    const discountedPrice = calculateDiscountedPrice(item);
    const subtotal = discountedPrice * item.quantity;
    const gstAmount = subtotal * (item.gst / 100);
    return subtotal + gstAmount;
}

function updateItemCalculations(itemIndex) {
    const item = salesItems[itemIndex];
    if (!item) return;
    
    // Update discounted price display
    const dPriceElement = document.getElementById(`d-price-${itemIndex}`);
    if (dPriceElement) {
        dPriceElement.textContent = `₹${calculateDiscountedPrice(item).toFixed(2)}`;
    }
    
    // Update amount display
    const amountElement = document.getElementById(`amount-${itemIndex}`);
    if (amountElement) {
        amountElement.textContent = `₹${calculateItemAmount(item).toFixed(2)}`;
    }
}

function removeItemRow(itemIndex) {
    const itemRow = document.querySelector(`[data-index="${itemIndex}"]`);
    if (itemRow) {
        itemRow.remove();
        salesItems.splice(itemIndex, 1);
        // Re-index remaining items
        reindexItems();
        updateTotals();
    }
}

function reindexItems() {
    const itemRows = document.querySelectorAll('.item-row');
    itemRows.forEach((row, index) => {
        row.dataset.index = index;
        // Update all onclick handlers to use new index
        updateRowHandlers(row, index);
    });
}

function updateRowHandlers(row, newIndex) {
    const inputs = row.querySelectorAll('input, select');
    const button = row.querySelector('.remove-item-btn');
    
    inputs.forEach(input => {
        const onchange = input.getAttribute('onchange');
        const oninput = input.getAttribute('oninput');
        
        if (onchange) {
            input.setAttribute('onchange', onchange.replace(/\d+/, newIndex));
        }
        if (oninput) {
            input.setAttribute('oninput', oninput.replace(/\d+/, newIndex));
        }
    });
    
    if (button) {
        button.setAttribute('onclick', `removeItemRow(${newIndex})`);
    }
    
    // Update IDs
    const switch_input = row.querySelector('input[type="checkbox"]');
    const label = row.querySelector('label');
    if (switch_input && label) {
        switch_input.id = `switch-${newIndex}`;
        label.setAttribute('for', `switch-${newIndex}`);
    }
    
    // Update display element IDs
    const dPriceElement = row.querySelector('[id^="d-price-"]');
    const amountElement = row.querySelector('[id^="amount-"]');
    if (dPriceElement) dPriceElement.id = `d-price-${newIndex}`;
    if (amountElement) amountElement.id = `amount-${newIndex}`;
}

function updateTotals() {
    let subtotal = 0;
    let totalDiscount = 0;
    let totalGST = 0;
    
    salesItems.forEach(item => {
        const itemSubtotal = (item.mrp || 0) * item.quantity;
        subtotal += itemSubtotal;
        
        if (item.discountType === '%') {
            totalDiscount += itemSubtotal * (item.discount / 100);
        } else {
            totalDiscount += item.discount * item.quantity;
        }
        
        const discountedPrice = calculateDiscountedPrice(item);
        totalGST += (discountedPrice * item.quantity) * (item.gst / 100);
    });
    
    const grandTotal = subtotal - totalDiscount + totalGST;
    
    // Update summary display
    document.getElementById('subtotal').textContent = `₹${subtotal.toFixed(2)}`;
    document.getElementById('total-discount').textContent = `₹${totalDiscount.toFixed(2)}`;
    document.getElementById('total-gst').textContent = `₹${totalGST.toFixed(2)}`;
    document.getElementById('grand-total').textContent = `₹${grandTotal.toFixed(2)}`;
}

// Header control functions
function updateOwner(event) {
    console.log('Owner changed to:', event.target.value);
}

function updatePaymentType(event) {
    console.log('Payment type changed to:', event.target.value);
}

function setReminder() {
    alert('Reminder feature coming soon!');
}

function updatePickupType(event) {
    console.log('Pickup type changed to:', event.target.value);
}

function openSettings() {
    alert('Settings panel coming soon!');
}

// Customer functions
function searchCustomer(event) {
    const query = event.target.value;
    console.log('Searching customer:', query);
    // Implement customer search logic here
}

function createCounterBill() {
    console.log('Creating counter bill...');
}

// Action functions
function saveBill() {
    if (salesItems.length === 0) {
        alert('Please add items to save the bill');
        return;
    }
    
    const billData = {
        items: salesItems,
        customer: {
            search: document.getElementById('customer-search').value,
            billingFor: document.getElementById('billing-for').value
        },
        doctor: document.getElementById('doctor-name').value,
        totals: {
            subtotal: parseFloat(document.getElementById('subtotal').textContent.replace('₹', '')),
            discount: parseFloat(document.getElementById('total-discount').textContent.replace('₹', '')),
            gst: parseFloat(document.getElementById('total-gst').textContent.replace('₹', '')),
            total: parseFloat(document.getElementById('grand-total').textContent.replace('₹', ''))
        },
        date: new Date().toISOString()
    };
    
    console.log('Saving bill:', billData);
    alert('Bill saved successfully!');
}

function printBill() {
    console.log('Printing bill...');
    alert('Print functionality coming soon!');
}

function emailBill() {
    console.log('Emailing bill...');
    alert('Email functionality coming soon!');
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}