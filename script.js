// Mobile Navigation
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Initialize Leaflet Map
function initMap() {
    // Ushuaia coordinates
    const ushuaiaCoords = [-54.8019, -68.3030];
    
    // Initialize map
    const map = L.map('ushuaia-map').setView(ushuaiaCoords, 13);
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    // Define custom icons
    const museumIcon = L.divIcon({
        className: 'custom-marker museum-marker',
        html: '<div style="background: #dc2626; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 10px rgba(0,0,0,0.3);"></div>',
        iconSize: [20, 20],
        iconAnchor: [10, 10]
    });
    
    const natureIcon = L.divIcon({
        className: 'custom-marker nature-marker',
        html: '<div style="background: #16a34a; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 10px rgba(0,0,0,0.3);"></div>',
        iconSize: [20, 20],
        iconAnchor: [10, 10]
    });
    
    const diningIcon = L.divIcon({
        className: 'custom-marker dining-marker',
        html: '<div style="background: #f59e0b; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 10px rgba(0,0,0,0.3);"></div>',
        iconSize: [20, 20],
        iconAnchor: [10, 10]
    });
    
    const transportIcon = L.divIcon({
        className: 'custom-marker transport-marker',
        html: '<div style="background: #3b82f6; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 10px rgba(0,0,0,0.3);"></div>',
        iconSize: [20, 20],
        iconAnchor: [10, 10]
    });
    
    // Add markers for key locations
    const locations = [
        {
            coords: [-54.8019, -68.3030],
            title: "City Center",
            description: "Main tourist area with shops and restaurants",
            icon: transportIcon
        },
        {
            coords: [-54.8100, -68.3100],
            title: "Maritime & Prison Museum",
            description: "Former prison turned museum complex - $36 per person",
            icon: museumIcon
        },
        {
            coords: [-54.8050, -68.3000],
            title: "End of the World Museum",
            description: "Local history and indigenous culture - $25 per person",
            icon: museumIcon
        },
        {
            coords: [-54.7800, -68.2500],
            title: "Cerro Martial",
            description: "Glacier viewpoint accessible by chairlift",
            icon: natureIcon
        },
        {
            coords: [-54.8500, -68.5500],
            title: "Tierra del Fuego National Park",
            description: "Accessible boardwalks and End of Pan-American Highway",
            icon: natureIcon
        },
        {
            coords: [-54.8020, -68.3020],
            title: "Kaupe Restaurant",
            description: "King crab specialties - recommended dining",
            icon: diningIcon
        },
        {
            coords: [-54.8010, -68.3040],
            title: "Café Tante Sara",
            description: "Traditional tea house and pastries",
            icon: diningIcon
        },
        {
            coords: [-54.8430, -68.2850],
            title: "Malvinas Argentinas Airport",
            description: "Main airport - 5km from city center",
            icon: transportIcon
        },
        {
            coords: [-54.8030, -68.3010],
            title: "Tourist Pier",
            description: "Departure point for Beagle Channel boat tours",
            icon: transportIcon
        }
    ];
    
    // Add markers to map
    locations.forEach(location => {
        const marker = L.marker(location.coords, { icon: location.icon })
            .addTo(map)
            .bindPopup(`
                <div style="font-family: 'Inter', sans-serif;">
                    <h4 style="margin: 0 0 8px 0; color: #1e293b; font-weight: 600;">${location.title}</h4>
                    <p style="margin: 0; color: #64748b; font-size: 14px; line-height: 1.4;">${location.description}</p>
                </div>
            `);
    });
    
    // Add Beagle Channel area highlight
    const beagleChannelBounds = [
        [-54.85, -68.6],
        [-54.75, -68.0]
    ];
    
    L.rectangle(beagleChannelBounds, {
        color: "#0ea5e9",
        weight: 2,
        fillColor: "#0ea5e9",
        fillOpacity: 0.1
    }).addTo(map).bindPopup("Beagle Channel - Boat tour area with wildlife viewing");
}

// Initialize map when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Small delay to ensure the map container is properly rendered
    setTimeout(initMap, 100);
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for scroll animations
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});

// Add click handlers for attraction cards
document.addEventListener('DOMContentLoaded', function() {
    const attractionCards = document.querySelectorAll('.attraction-card');
    
    attractionCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add a subtle click effect
            this.style.transform = 'translateY(-8px) scale(1.02)';
            setTimeout(() => {
                this.style.transform = 'translateY(-5px) scale(1)';
            }, 150);
        });
    });
});

// Weather widget simulation (could be connected to real API)
function updateWeatherInfo() {
    const weatherData = {
        temperature: Math.floor(Math.random() * 7) - 2, // -2 to 5°C
        condition: ['Cloudy', 'Partly Cloudy', 'Light Snow', 'Clear'][Math.floor(Math.random() * 4)],
        windSpeed: Math.floor(Math.random() * 20) + 10 // 10-30 km/h
    };
    
    // This could be expanded to show real weather data
    console.log('Current Ushuaia weather:', weatherData);
}

// Budget calculator
function calculateDailyBudget() {
    const totalBudget = 1517; // From itinerary
    const days = 7;
    const dailyAverage = Math.round(totalBudget / days);
    
    return {
        total: totalBudget,
        daily: dailyAverage,
        perPerson: Math.round(dailyAverage / 2)
    };
}

// Initialize budget display
document.addEventListener('DOMContentLoaded', function() {
    const budget = calculateDailyBudget();
    console.log('Budget breakdown:', budget);
});

// Add loading states for interactive elements
function showLoading(element) {
    element.style.opacity = '0.6';
    element.style.pointerEvents = 'none';
}

function hideLoading(element) {
    element.style.opacity = '1';
    element.style.pointerEvents = 'auto';
}

// Accessibility enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Add keyboard navigation for cards
    const cards = document.querySelectorAll('.attraction-card, .overview-card');
    
    cards.forEach(card => {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Add focus indicators
    const focusableElements = document.querySelectorAll('a, button, [tabindex]');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #0f766e';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
});

// Print functionality
function printHandbook() {
    window.print();
}

// Add print button (could be added to the UI)
document.addEventListener('DOMContentLoaded', function() {
    // This could be expanded to add a print button to the interface
    console.log('Print functionality available');
});

