// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeTabs();
    initializeFilters();
    initializeMap();
    initializeSmoothScrolling();
    initializeMobileMenu();
});

// Tab functionality for itinerary
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// Filter functionality for attractions
function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const attractionCards = document.querySelectorAll('.attraction-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Remove active class from all filter buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Show/hide cards based on filter
            attractionCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'flex';
                    card.classList.remove('hidden');
                } else {
                    card.style.display = 'none';
                    card.classList.add('hidden');
                }
            });
        });
    });
}

// Initialize Leaflet map
function initializeMap() {
    try {
        // Initialize map centered on Ushuaia
        const map = L.map('map').setView([-54.8019, -68.3030], 13);

        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 18
        }).addTo(map);

        // Define custom icons
        const icons = {
            museum: L.divIcon({
                html: '<div style="background: #ef4444; color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 12px;">M</div>',
                iconSize: [30, 30],
                className: 'custom-div-icon'
            }),
            nature: L.divIcon({
                html: '<div style="background: #22c55e; color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 12px;">N</div>',
                iconSize: [30, 30],
                className: 'custom-div-icon'
            }),
            restaurant: L.divIcon({
                html: '<div style="background: #f97316; color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 12px;">R</div>',
                iconSize: [30, 30],
                className: 'custom-div-icon'
            }),
            bar: L.divIcon({
                html: '<div style="background: #8b5cf6; color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 12px;">B</div>',
                iconSize: [30, 30],
                className: 'custom-div-icon'
            }),
            transport: L.divIcon({
                html: '<div style="background: #3b82f6; color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 12px;">T</div>',
                iconSize: [30, 30],
                className: 'custom-div-icon'
            })
        };

        // Add markers for attractions
        const locations = [
            // Museums & Historical Sites
            {
                name: "Maritime & Prison Museum",
                lat: -54.8066,
                lng: -68.3031,
                type: "museum",
                description: "Historic prison turned museum with maritime exhibits"
            },
            {
                name: "End of the World Museum",
                lat: -54.8019,
                lng: -68.3030,
                type: "museum",
                description: "Local history and indigenous culture museum"
            },
            
            // Nature & Scenic Spots
            {
                name: "Tierra del Fuego National Park",
                lat: -54.8467,
                lng: -68.6167,
                type: "nature",
                description: "National park with hiking trails and scenic views"
            },
            {
                name: "Glaciar Martial",
                lat: -54.7833,
                lng: -68.3167,
                type: "nature",
                description: "Glacier viewpoint accessible by chairlift"
            },
            {
                name: "Beagle Channel",
                lat: -54.8500,
                lng: -68.2000,
                type: "nature",
                description: "Scenic channel for boat tours and wildlife viewing"
            },
            
            // Restaurants
            {
                name: "Kaupe Restaurant",
                lat: -54.8019,
                lng: -68.3030,
                type: "restaurant",
                description: "Premium seafood restaurant with Beagle Channel views"
            },
            {
                name: "Chez Manu",
                lat: -54.8010,
                lng: -68.3020,
                type: "restaurant",
                description: "French-Patagonian fusion cuisine"
            },
            {
                name: "Tante Sara",
                lat: -54.8025,
                lng: -68.3035,
                type: "restaurant",
                description: "Traditional tea house and restaurant"
            },
            {
                name: "Volver Restaurant",
                lat: -54.8015,
                lng: -68.3025,
                type: "restaurant",
                description: "Contemporary Argentine cuisine"
            },
            {
                name: "La Cabaña Tea House",
                lat: -54.8020,
                lng: -68.3040,
                type: "restaurant",
                description: "Traditional Patagonian tea house"
            },
            
            // Bars & Breweries
            {
                name: "Cervecería Beagle",
                lat: -54.8030,
                lng: -68.3010,
                type: "bar",
                description: "Local craft brewery with tours and tastings"
            },
            {
                name: "Dublin Pub Ushuaia",
                lat: -54.8005,
                lng: -68.3015,
                type: "bar",
                description: "Irish-style pub with wide beer and gin selection"
            },
            {
                name: "Kuar Wine Bar",
                lat: -54.8012,
                lng: -68.3028,
                type: "bar",
                description: "Sophisticated wine bar with Argentine wines"
            },
            {
                name: "Laguna Negra",
                lat: -54.8022,
                lng: -68.3032,
                type: "bar",
                description: "Trendy cocktail bar with creative gin drinks"
            },
            {
                name: "Jeremy Button Gin Bar",
                lat: -54.8018,
                lng: -68.3038,
                type: "bar",
                description: "Premium gin bar with extensive gin selection"
            },
            {
                name: "Cervecería Grut '84",
                lat: -54.8028,
                lng: -68.3012,
                type: "bar",
                description: "Local craft brewery with cozy atmosphere"
            },
            
            // Transportation
            {
                name: "Ushuaia Airport",
                lat: -54.8433,
                lng: -68.2958,
                type: "transport",
                description: "Malvinas Argentinas Ushuaia Airport"
            },
            {
                name: "Port of Ushuaia",
                lat: -54.8066,
                lng: -68.3031,
                type: "transport",
                description: "Main port for boat tours and cruises"
            }
        ];

        // Add markers to map
        locations.forEach(location => {
            const marker = L.marker([location.lat, location.lng], {
                icon: icons[location.type]
            }).addTo(map);

            marker.bindPopup(`
                <div style="font-family: Inter, sans-serif;">
                    <h3 style="margin: 0 0 8px 0; color: #2c3e50; font-size: 14px; font-weight: 600;">${location.name}</h3>
                    <p style="margin: 0; color: #64748b; font-size: 12px; line-height: 1.4;">${location.description}</p>
                </div>
            `);
        });

        console.log('Map initialized successfully');
    } catch (error) {
        console.error('Error initializing map:', error);
        
        // Fallback: show a message if map fails to load
        const mapContainer = document.getElementById('map');
        if (mapContainer) {
            mapContainer.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: #f8fafc; color: #64748b; text-align: center; padding: 2rem;">
                    <div>
                        <h3 style="margin-bottom: 1rem;">Interactive Map</h3>
                        <p>Map is loading... Please check your internet connection.</p>
                        <p style="margin-top: 1rem; font-size: 0.9rem;">All locations are marked with Google Maps links in the attractions section above.</p>
                    </div>
                </div>
            `;
        }
    }
}

// Smooth scrolling for navigation links
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = 70; // Height of fixed header
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Mobile menu functionality
function initializeMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileToggle.classList.remove('active');
            });
        });
    }
}

// Add some CSS for mobile menu via JavaScript
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .nav-links {
            position: fixed;
            top: 70px;
            left: -100%;
            width: 100%;
            height: calc(100vh - 70px);
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(10px);
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            padding-top: 2rem;
            transition: left 0.3s ease;
            z-index: 999;
        }
        
        .nav-links.active {
            left: 0;
        }
        
        .nav-links a {
            padding: 1rem 0;
            font-size: 1.1rem;
        }
        
        .mobile-menu-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .mobile-menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
`;
document.head.appendChild(style);

