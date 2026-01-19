// ==========================================
// GSAP Animations for Talangin Website
// ==========================================

// Initialize GSAP and ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

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
// Hero Section Animations
// ==========================================
gsap.from('.hero-title', {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: 'power3.out',
    delay: 0.2
});

gsap.from('.hero-subtitle', {
    duration: 1,
    y: 30,
    opacity: 0,
    ease: 'power3.out',
    delay: 0.4
});

gsap.from('.hero-cta', {
    duration: 1,
    y: 30,
    opacity: 0,
    ease: 'power3.out',
    delay: 0.6
});

gsap.from('.phone-mockup', {
    duration: 1.2,
    scale: 0.8,
    opacity: 0,
    ease: 'power3.out',
    delay: 0.3
});

// Floating animation for phone mockup
gsap.to('.phone-mockup', {
    y: -20,
    duration: 2,
    ease: 'power1.inOut',
    repeat: -1,
    yoyo: true
});

// ==========================================
// Feature Cards Scroll Animation
// ==========================================
gsap.utils.toArray('.feature-card').forEach((card, index) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.1,
        ease: 'power3.out'
    });
});

// ==========================================
// Comparison Cards Scroll Animation
// ==========================================
gsap.utils.toArray('.comparison-card').forEach((card, index) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        x: index % 2 === 0 ? -60 : 60,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.1,
        ease: 'power3.out'
    });
});

// ==========================================
// Steps Animation
// ==========================================
gsap.utils.toArray('.step').forEach((step, index) => {
    gsap.from(step, {
        scrollTrigger: {
            trigger: step,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.2,
        ease: 'back.out(1.7)'
    });
});

// Animate step numbers with rotation
gsap.utils.toArray('.step-number').forEach((number, index) => {
    gsap.from(number, {
        scrollTrigger: {
            trigger: number,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        rotation: 360,
        scale: 0,
        duration: 1,
        delay: index * 0.2,
        ease: 'back.out(1.7)'
    });
});

// ==========================================
// Download Section Animation
// ==========================================
gsap.from('.download-content h2', {
    scrollTrigger: {
        trigger: '.download-content',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
    },
    y: 40,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
});

gsap.from('.download-content p', {
    scrollTrigger: {
        trigger: '.download-content',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
    },
    y: 30,
    opacity: 0,
    duration: 0.8,
    delay: 0.2,
    ease: 'power3.out'
});

gsap.from('.btn-download', {
    scrollTrigger: {
        trigger: '.download-content',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
    },
    scale: 0.8,
    opacity: 0,
    duration: 0.8,
    delay: 0.4,
    ease: 'back.out(1.7)'
});

// ==========================================
// Section Titles Animation
// ==========================================
gsap.utils.toArray('.section-title').forEach(title => {
    gsap.from(title, {
        scrollTrigger: {
            trigger: title,
            start: 'top 85%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    });
});

// ==========================================
// Smooth Scroll for Navigation Links
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const navHeight = document.querySelector('.nav').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// Button Hover Effects
// ==========================================
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        gsap.to(this, {
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    button.addEventListener('mouseleave', function() {
        gsap.to(this, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// ==========================================
// Parallax Effect for Hero Background
// ==========================================
gsap.to('.hero', {
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
    },
    backgroundPosition: '50% 100%',
    ease: 'none'
});

// ==========================================
// Footer Reveal Animation
// ==========================================
gsap.from('.footer', {
    scrollTrigger: {
        trigger: '.footer',
        start: 'top 90%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
    },
    y: 60,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
});

// ==========================================
// Performance Optimization
// ==========================================
// Refresh ScrollTrigger on window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
    }, 250);
});

// ==========================================
// Loading Animation
// ==========================================
window.addEventListener('load', () => {
    // Fade in the body after everything is loaded
    gsap.to('body', {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out'
    });
    
    // Refresh ScrollTrigger after load
    ScrollTrigger.refresh();
});

// Set initial opacity
document.body.style.opacity = '0';
