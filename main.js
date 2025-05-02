
// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.getElementById('nav-menu');

mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('show');
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Close mobile menu if open
        navMenu.classList.remove('show');
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Testimonial Slider
const testimonials = document.querySelectorAll('.testimonial');
const dots = document.querySelectorAll('.testimonial-dot');
let currentTestimonial = 0;

function showTestimonial(index) {
    testimonials.forEach(testimonial => testimonial.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    testimonials[index].classList.add('active');
    dots[index].classList.add('active');
    currentTestimonial = index;
}

dots.forEach(dot => {
    dot.addEventListener('click', function() {
        showTestimonial(parseInt(this.getAttribute('data-index')));
    });
});

// Auto-rotate testimonials
setInterval(() => {
    let nextTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(nextTestimonial);
}, 5000);

// Form Submission
const form = document.getElementById('message-form');
form.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    form.reset();
});


// map
document.addEventListener("DOMContentLoaded", () => {
   
   // Initialize the map centered near Monas, Jakarta
   const map = L.map('map').setView([-6.175392, 106.827153], 15); // Monas coordinates

    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

  

    // Café locations near Monas
    const cafesGeoJson = {
        type: "FeatureCollection",
        features: [
            {
                type: "Feature",
                properties: {
                    name: "Cafe One",
                    address: "Jl. Medan Merdeka, Jakarta"
                },
                geometry: {
                    type: "Point",
                    coordinates: [106.827080, -6.175110] // GeoJSON uses [lng, lat]
                }
            },
            {
                type: "Feature",
                properties: {
                    name: "Cafe Two",
                    address: "Jl. Medan Merdeka Selatan, Jakarta"
                },
                geometry: {
                    type: "Point",
                    coordinates: [106.828611, -6.176655]
                }
            },
            {
                type: "Feature",
                properties: {
                    name: "Cafe Three",
                    address: "Jl. Medan Merdeka Utara, Jakarta"
                },
                geometry: {
                    type: "Point",
                    coordinates: [106.826789, -6.174456]
                }
            },
            {
                type: "Feature",
                properties: {
                    name: "Cafe Four",
                    address: "Jl. Medan Merdeka Timur, Jakarta"
                },
                geometry: {
                    type: "Point",
                    coordinates: [106.829456, -6.177123]
                }
            },
            {
                type: "Feature",
                properties: {
                    name: "Cafe Agung",
                    address: "alamat rahasia"
                },
                geometry: {
                    type: "Point",
                    coordinates: [104.129097, 1.104848]
                }
            }
        ]
    };

    // make me function that randomize the coordinates but still around jakarta


    function randomizeCoordinates() {
        const latRange = 0.01;
        const lngRange = 0.01;
        return [
            106.827080 + (Math.random() * lngRange - lngRange / 2),
            -6.175110 + (Math.random() * latRange - latRange / 2)
        ];
    }

    // refresh the map
    
    const [lng, lat] = randomizeCoordinates();
    L.marker([lat, lng]).addTo(map).bindPopup('Randomized Location');

    navigator.geolocation.getCurrentPosition(pos => {
        console.log(pos.coords.latitude, pos.coords.longitude);
      });


   // Add café markers to the map
    L.geoJSON(cafesGeoJson).addTo(map)
});