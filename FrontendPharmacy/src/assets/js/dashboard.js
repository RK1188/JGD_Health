document.addEventListener('DOMContentLoaded', function() {
    loadHeader();
    updateCurrentDate();
    initializeDashboard();
});

function updateCurrentDate() {
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        dateElement.textContent = now.toLocaleDateString('en-US', options);
    }
}

function initializeDashboard() {
    animateStatCards();
    updateDashboardData();
}

function animateStatCards() {
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
        card.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s forwards`;
    });
}

function updateDashboardData() {
    const mockData = {
        todaySales: 2450.75,
        productsSold: 143,
        customersServed: 89,
        lowStockItems: 12
    };

    animateCountUp('stat-number', mockData.todaySales, '$');
}

function animateCountUp(className, targetValue, prefix = '') {
    const elements = document.querySelectorAll(`.${className}`);
    elements.forEach(element => {
        const finalValue = parseFloat(element.textContent.replace(/[^\d.-]/g, ''));
        let currentValue = 0;
        const increment = finalValue / 100;
        
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= finalValue) {
                currentValue = finalValue;
                clearInterval(timer);
            }
            
            if (prefix === '$') {
                element.textContent = `$${currentValue.toFixed(2)}`;
            } else {
                element.textContent = `${Math.round(currentValue)}`;
            }
        }, 20);
    });
}