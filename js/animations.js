/**
 * Talangin - GSAP Animations Module
 * Created: 2026-01-20
 * 
 * Handles all page animations using GSAP and ScrollTrigger
 * Respects prefers-reduced-motion for accessibility
 * 
 * @module animations
 */

// ==========================================
// REDUCED MOTION CHECK
// ==========================================

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ==========================================
// ANIMATION CONFIGURATION
// ==========================================

const config = {
    duration: {
        fast: 0.4,
        normal: 0.6,
        slow: 0.8,
    },
    ease: {
        smooth: 'power2.out',
        bounce: 'back.out(1.7)',
        expo: 'expo.out',
    },
    stagger: {
        small: 0.1,
        medium: 0.15,
        large: 0.2,
    },
};

// ==========================================
// GSAP DEFAULT SETTINGS
// ==========================================

function initGSAP() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.warn('GSAP or ScrollTrigger not loaded');
        return false;
    }

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Set default ease
    gsap.defaults({
        ease: config.ease.smooth,
        duration: config.duration.normal,
    });

    return true;
}

// ==========================================
// ENTRANCE ANIMATIONS
// ==========================================

function initEntranceAnimations() {
    if (prefersReducedMotion) {
        // Show all elements immediately if reduced motion is preferred
        document.querySelectorAll('[data-animate]').forEach(el => {
            el.classList.add('animated');
        });
        return;
    }

    const animatedElements = document.querySelectorAll('[data-animate]');

    animatedElements.forEach(el => {
        const animationType = el.dataset.animate;
        const delay = parseFloat(el.dataset.delay) || 0;

        // Set initial state based on animation type
        const initialState = getInitialState(animationType);
        const finalState = getFinalState(animationType);

        gsap.set(el, initialState);

        // Check if element is in hero section (animate on load)
        const isInHero = el.closest('.hero') !== null;

        if (isInHero) {
            // Animate hero elements on page load
            gsap.to(el, {
                ...finalState,
                duration: config.duration.slow,
                delay: delay + 0.3, // Add base delay for page load
                ease: config.ease.expo,
                onComplete: () => el.classList.add('animated'),
            });
        } else {
            // Use ScrollTrigger for other sections
            ScrollTrigger.create({
                trigger: el,
                start: 'top 85%',
                once: true,
                onEnter: () => {
                    gsap.to(el, {
                        ...finalState,
                        duration: config.duration.normal,
                        delay: delay,
                        ease: config.ease.smooth,
                        onComplete: () => el.classList.add('animated'),
                    });
                },
            });
        }
    });
}

function getInitialState(type) {
    const states = {
        'fade-up': { opacity: 0, y: 30 },
        'fade-down': { opacity: 0, y: -30 },
        'fade-left': { opacity: 0, x: 50 },
        'fade-right': { opacity: 0, x: -50 },
        'scale-up': { opacity: 0, scale: 0.9 },
        'blur-in': { opacity: 0, filter: 'blur(10px)' },
    };
    return states[type] || { opacity: 0 };
}

function getFinalState(type) {
    const states = {
        'fade-up': { opacity: 1, y: 0 },
        'fade-down': { opacity: 1, y: 0 },
        'fade-left': { opacity: 1, x: 0 },
        'fade-right': { opacity: 1, x: 0 },
        'scale-up': { opacity: 1, scale: 1 },
        'blur-in': { opacity: 1, filter: 'blur(0px)' },
    };
    return states[type] || { opacity: 1 };
}

// ==========================================
// PARALLAX EFFECTS
// ==========================================

function initParallaxEffects() {
    if (prefersReducedMotion) return;

    // Hero gradient parallax
    const heroGradients = document.querySelectorAll('.hero__gradient');
    heroGradients.forEach((gradient, index) => {
        const speed = (index + 1) * 0.1;
        gsap.to(gradient, {
            y: () => window.innerHeight * speed,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true,
            },
        });
    });

    // Phone mockup subtle movement
    const phoneMockup = document.querySelector('.hero__phone-frame');
    if (phoneMockup) {
        gsap.to(phoneMockup, {
            y: 50,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 1,
            },
        });
    }
}

// ==========================================
// SCROLL PROGRESS INDICATOR
// ==========================================

function initScrollProgress() {
    if (prefersReducedMotion) return;

    // Create progress bar if it doesn't exist
    let progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);
    }

    gsap.to(progressBar, {
        width: '100%',
        ease: 'none',
        scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.3,
        },
    });
}

// ==========================================
// NAVBAR SCROLL EFFECT
// ==========================================

function initNavbarEffect() {
    const nav = document.querySelector('.nav');
    if (!nav) return;

    let lastScrollY = 0;
    const scrollThreshold = 50;

    function handleScroll() {
        const currentScrollY = window.scrollY;

        // Add/remove scrolled class
        if (currentScrollY > scrollThreshold) {
            nav.classList.add('nav--scrolled');
        } else {
            nav.classList.remove('nav--scrolled');
        }

        lastScrollY = currentScrollY;
    }

    // Throttle scroll handler
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // Initial check
    handleScroll();
}

// ==========================================
// FEATURE CARDS HOVER EFFECT
// ==========================================

function initFeatureCardEffects() {
    if (prefersReducedMotion) return;

    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        const icon = card.querySelector('.feature-card__icon');
        
        card.addEventListener('mouseenter', () => {
            gsap.to(icon, {
                scale: 1.1,
                rotation: 5,
                duration: config.duration.fast,
                ease: config.ease.bounce,
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(icon, {
                scale: 1,
                rotation: 0,
                duration: config.duration.fast,
                ease: config.ease.smooth,
            });
        });
    });
}

// ==========================================
// STEP CARDS ANIMATION
// ==========================================

function initStepAnimations() {
    if (prefersReducedMotion) return;

    const steps = document.querySelectorAll('.step');
    
    steps.forEach((step, index) => {
        const visual = step.querySelector('.step__visual');
        const card = step.querySelector('.step__card');
        
        if (!visual || !card) return;

        ScrollTrigger.create({
            trigger: step,
            start: 'top 70%',
            once: true,
            onEnter: () => {
                gsap.from(card, {
                    opacity: 0,
                    y: 30,
                    rotation: index % 2 === 0 ? -5 : 5,
                    duration: config.duration.slow,
                    delay: 0.3,
                    ease: config.ease.expo,
                });
            },
        });
    });
}

// ==========================================
// TESTIMONIAL CARDS STAGGER
// ==========================================

function initTestimonialAnimations() {
    if (prefersReducedMotion) return;

    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    ScrollTrigger.create({
        trigger: '.testimonials',
        start: 'top 70%',
        once: true,
        onEnter: () => {
            gsap.from(testimonialCards, {
                opacity: 0,
                y: 40,
                stagger: config.stagger.medium,
                duration: config.duration.normal,
                ease: config.ease.smooth,
            });
        },
    });
}

// ==========================================
// CTA SECTION ANIMATION
// ==========================================

function initCTAAnimation() {
    if (prefersReducedMotion) return;

    const ctaCheck = document.querySelector('.cta__check');
    if (!ctaCheck) return;

    ScrollTrigger.create({
        trigger: '.cta',
        start: 'top 60%',
        once: true,
        onEnter: () => {
            gsap.from(ctaCheck, {
                scale: 0,
                rotation: -180,
                duration: config.duration.slow,
                ease: config.ease.bounce,
            });
        },
    });
}

// ==========================================
// TEXT SPLITTING FOR HERO TITLE
// ==========================================

function initTextSplitting() {
    if (prefersReducedMotion) return;

    const heroTitle = document.querySelector('.hero__title');
    if (!heroTitle) return;

    // Simple word-by-word animation for the hero title
    const words = heroTitle.querySelectorAll('.hero__title-highlight');
    
    words.forEach(word => {
        gsap.from(word, {
            opacity: 0,
            y: 20,
            duration: config.duration.normal,
            delay: 0.8,
            ease: config.ease.expo,
        });
    });
}

// ==========================================
// REFRESH SCROLL TRIGGERS
// ==========================================

function refreshScrollTriggers() {
    ScrollTrigger.refresh();
}

// ==========================================
// CLEANUP
// ==========================================

function cleanup() {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
}

// ==========================================
// INITIALIZATION
// ==========================================

function init() {
    const gsapReady = initGSAP();
    
    if (!gsapReady) {
        // Fallback: show all elements
        document.querySelectorAll('[data-animate]').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
        return;
    }

    // Initialize all animation modules
    initEntranceAnimations();
    initParallaxEffects();
    initScrollProgress();
    initNavbarEffect();
    initFeatureCardEffects();
    initStepAnimations();
    initTestimonialAnimations();
    initCTAAnimation();
    initTextSplitting();

    // Refresh on window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(refreshScrollTriggers, 250);
    });

    // Refresh on images load
    window.addEventListener('load', refreshScrollTriggers);
}

// ==========================================
// EXPORTS
// ==========================================

export {
    init,
    cleanup,
    refreshScrollTriggers,
    config,
    prefersReducedMotion,
};

export default {
    init,
    cleanup,
    refreshScrollTriggers,
    config,
    prefersReducedMotion,
};
