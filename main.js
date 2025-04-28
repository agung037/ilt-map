
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
    const cafes = [
        { name: "Cafe One", coords: [-6.175110, 106.827080], address: "Jl. Medan Merdeka, Jakarta" },
        { name: "Cafe Two", coords: [-6.176655, 106.828611], address: "Jl. Medan Merdeka Selatan, Jakarta" },
        { name: "Cafe Three", coords: [-6.174456, 106.826789], address: "Jl. Medan Merdeka Utara, Jakarta" },
        { name: "Cafe Four", coords: [-6.177123, 106.829456], address: "Jl. Medan Merdeka Timur, Jakarta" },
        { name: "Cafe Five", coords: [-6.173789, 106.825678], address: "Jl. Medan Merdeka Barat, Jakarta" }
    ];

    // Add markers for each café
    cafes.forEach(cafe => {
        L.marker(cafe.coords)
            .addTo(map)
            .bindPopup(`<b>${cafe.name}</b><br>${cafe.address}`);
    });
});