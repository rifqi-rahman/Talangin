// ==========================================
// Vanilla JavaScript Animations for Talangin Website
// ==========================================

// ==========================================
// Navigation Animation
// ==========================================
const nav = document.querySelector('.nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        nav.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    }
    
    lastScroll = currentScroll;
});

// ==========================================
// Intersection Observer for Scroll Animations
// ==========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe all animated elements
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.feature-card, .comparison-card, .step, .section-title'
    );
    
    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
});

// ==========================================
// Smooth Scroll for Navigation Links
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// ==========================================
// Floating animation for phone mockup
// ==========================================
function animatePhone() {
    const phone = document.querySelector('.phone-mockup');
    if (phone) {
        let position = 0;
        let direction = 1;
        
        setInterval(() => {
            position += direction * 0.5;
            if (position > 20 || position < 0) {
                direction *= -1;
            }
            phone.style.transform = `translateY(${-position}px)`;
        }, 50);
    }
}

// ==========================================
// Initialize on Load
// ==========================================
window.addEventListener('load', () => {
    // Start phone animation
    animatePhone();
    
    // Fade in the body
    document.body.style.opacity = '1';
});

// Set initial opacity
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease-out';
