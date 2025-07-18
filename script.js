// Mobile Navigation
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
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
    }
});

// Tab functionality for itineraries
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(targetTab + '-tab').classList.add('active');
        });
    });
});

// Category filtering for attractions
document.addEventListener('DOMContentLoaded', function() {
    const categoryButtons = document.querySelectorAll('.category-button');
    const attractionCards = document.querySelectorAll('.attraction-card');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetCategory = this.getAttribute('data-category');
            
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter cards
            attractionCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (targetCategory === 'all' || cardCategory === targetCategory) {
                    card.classList.remove('hidden');
                    card.style.display = 'block';
                } else {
                    card.classList.add('hidden');
                    setTimeout(() => {
                        if (card.classList.contains('hidden')) {
                            card.style.display = 'none';
                        }
                    }, 300);
                }
            });
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

// Initialize Leaflet Map with enhanced markers
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
        html: '<div style="background: #dc2626; width: 25px; height: 25px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 10px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 12px;">M</div>',
        iconSize: [25, 25],
        iconAnchor: [12, 12]
    });
    
    const natureIcon = L.divIcon({
        className: 'custom-marker nature-marker',
        html: '<div style="background: #16a34a; width: 25px; height: 25px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 10px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 12px;">N</div>',
        iconSize: [25, 25],
        iconAnchor: [12, 12]
    });
    
    const diningIcon = L.divIcon({
        className: 'custom-marker dining-marker',
        html: '<div style="background: #f59e0b; width: 25px; height: 25px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 10px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 12px;">R</div>',
        iconSize: [25, 25],
        iconAnchor: [12, 12]
    });
    
    const barsIcon = L.divIcon({
        className: 'custom-marker bars-marker',
        html: '<div style="background: #8b5cf6; width: 25px; height: 25px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 10px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 12px;">B</div>',
        iconSize: [25, 25],
        iconAnchor: [12, 12]
    });
    
    const transportIcon = L.divIcon({
        className: 'custom-marker transport-marker',
        html: '<div style="background: #3b82f6; width: 25px; height: 25px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 10px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 12px;">T</div>',
        iconSize: [25, 25],
        iconAnchor: [12, 12]
    });
    
    // Add markers for key locations
    const locations = [
        // Museums & Attractions
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
            description: "Boardwalks and End of Pan-American Highway",
            icon: natureIcon
        },
        
        // Restaurants
        {
            coords: [-54.8020, -68.3020],
            title: "Kaupe Restaurant",
            description: "Premium king crab and Patagonian cuisine - $60-90",
            icon: diningIcon
        },
        {
            coords: [-54.8015, -68.3025],
            title: "Chez Manu",
            description: "French-Patagonian fusion with wine pairings - $50-80",
            icon: diningIcon
        },
        {
            coords: [-54.8010, -68.3040],
            title: "Tante Sara",
            description: "Traditional tea house and local specialties - $30-50",
            icon: diningIcon
        },
        {
            coords: [-54.8025, -68.3015],
            title: "Volver Restaurant",
            description: "Contemporary Argentine cuisine with gin cocktails - $40-70",
            icon: diningIcon
        },
        
        // Bars & Breweries
        {
            coords: [-54.8005, -68.3035],
            title: "Cervecería Beagle",
            description: "Local craft brewery with tours and tastings - $15-25",
            icon: barsIcon
        },
        {
            coords: [-54.8030, -68.3005],
            title: "Dublin Pub Ushuaia",
            description: "Irish pub with beer, whiskey, and gin selection - $20-35",
            icon: barsIcon
        },
        {
            coords: [-54.8012, -68.3028],
            title: "Kuar Wine Bar",
            description: "Argentine wines from Mendoza and Patagonia - $25-45",
            icon: barsIcon
        },
        {
            coords: [-54.8018, -68.3022],
            title: "Laguna Negra",
            description: "Trendy cocktail bar with gin-based drinks - $18-30",
            icon: barsIcon
        },
        
        // Transportation
        {
            coords: [-54.8019, -68.3030],
            title: "City Center",
            description: "Main tourist area with shops and restaurants",
            icon: transportIcon
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
                <div style="font-family: 'Inter', sans-serif; max-width: 250px;">
                    <h4 style="margin: 0 0 8px 0; color: #1e293b; font-weight: 600; font-size: 16px;">${location.title}</h4>
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
    }).addTo(map).bindPopup(`
        <div style="font-family: 'Inter', sans-serif;">
            <h4 style="margin: 0 0 8px 0; color: #1e293b; font-weight: 600;">Beagle Channel</h4>
            <p style="margin: 0; color: #64748b; font-size: 14px;">Boat tour area with wildlife viewing</p>
        </div>
    `);
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

// Budget calculator for different itineraries
function calculateItineraryBudget(itineraryType) {
    const budgets = {
        nature: 1610,
        culture: 1440,
        local: 1620
    };
    
    return {
        total: budgets[itineraryType],
        daily: Math.round(budgets[itineraryType] / 7),
        perPerson: Math.round(budgets[itineraryType] / 2)
    };
}

// Accessibility enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Add keyboard navigation for interactive elements
    const interactiveElements = document.querySelectorAll('.tab-button, .category-button, .attraction-card');
    
    interactiveElements.forEach(element => {
        element.setAttribute('tabindex', '0');
        element.setAttribute('role', 'button');
        
        element.addEventListener('keydown', function(e) {
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

// Local storage for user preferences
function saveUserPreferences() {
    const preferences = {
        preferredItinerary: document.querySelector('.tab-button.active')?.getAttribute('data-tab'),
        preferredCategory: document.querySelector('.category-button.active')?.getAttribute('data-category')
    };
    
    localStorage.setItem('ushuaiaPreferences', JSON.stringify(preferences));
}

function loadUserPreferences() {
    const saved = localStorage.getItem('ushuaiaPreferences');
    if (saved) {
        const preferences = JSON.parse(saved);
        
        // Restore itinerary tab
        if (preferences.preferredItinerary) {
            const tabButton = document.querySelector(`[data-tab="${preferences.preferredItinerary}"]`);
            if (tabButton) {
                tabButton.click();
            }
        }
        
        // Restore category filter
        if (preferences.preferredCategory) {
            const categoryButton = document.querySelector(`[data-category="${preferences.preferredCategory}"]`);
            if (categoryButton) {
                categoryButton.click();
            }
        }
    }
}

// Save preferences when user makes selections
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.tab-button, .category-button').forEach(button => {
        button.addEventListener('click', saveUserPreferences);
    });
    
    // Load preferences on page load
    setTimeout(loadUserPreferences, 500);
});

