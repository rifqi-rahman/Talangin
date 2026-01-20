/**
 * Talangin - Main Application Entry Point
 * Created: 2026-01-20
 * 
 * Initializes all modules and handles global functionality
 * Mobile menu, smooth scrolling, and interactive features
 * 
 * @module main
 */

import animations from './animations.js';
import content from './content.js';

// ==========================================
// DOM READY CHECK
// ==========================================

function domReady(callback) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', callback);
    } else {
        callback();
    }
}

// ==========================================
// MOBILE MENU
// ==========================================

function initMobileMenu() {
    const toggle = document.querySelector('.nav__mobile-toggle');
    const menu = document.querySelector('.mobile-menu');
    const links = document.querySelectorAll('.mobile-menu__link');

    if (!toggle || !menu) return;

    function openMenu() {
        toggle.setAttribute('aria-expanded', 'true');
        menu.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        toggle.setAttribute('aria-expanded', 'false');
        menu.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    function toggleMenu() {
        const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
        if (isExpanded) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    // Toggle button click
    toggle.addEventListener('click', toggleMenu);

    // Close menu on link click
    links.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
            closeMenu();
            toggle.focus();
        }
    });

    // Close menu on resize to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            closeMenu();
        }
    });
}

// ==========================================
// SMOOTH SCROLLING
// ==========================================

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Skip if just "#" or empty
            if (href === '#' || !href) return;

            const target = document.querySelector(href);
            if (!target) return;

            e.preventDefault();

            const navHeight = document.querySelector('.nav')?.offsetHeight || 72;
            const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;

            // Use native smooth scroll if reduced motion not preferred
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            
            if (prefersReducedMotion) {
                window.scrollTo(0, targetPosition);
            } else {
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth',
                });
            }

            // Update URL hash without jumping
            history.pushState(null, '', href);
        });
    });
}

// ==========================================
// INTERSECTION OBSERVER FOR SECTIONS
// ==========================================

function initSectionObserver() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');

    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    
                    navLinks.forEach(link => {
                        const href = link.getAttribute('href');
                        if (href === `#${id}`) {
                            link.classList.add('nav__link--active');
                        } else {
                            link.classList.remove('nav__link--active');
                        }
                    });
                }
            });
        },
        {
            rootMargin: '-50% 0px -50% 0px',
        }
    );

    sections.forEach(section => {
        observer.observe(section);
    });
}

// ==========================================
// LAZY LOAD IMAGES
// ==========================================

function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if (!images.length) return;

    const imageObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        },
        {
            rootMargin: '50px 0px',
        }
    );

    images.forEach(img => imageObserver.observe(img));
}

// ==========================================
// FOCUS TRAP FOR MOBILE MENU
// ==========================================

function initFocusTrap() {
    const menu = document.querySelector('.mobile-menu');
    if (!menu) return;

    const focusableElements = menu.querySelectorAll(
        'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    menu.addEventListener('keydown', (e) => {
        if (e.key !== 'Tab') return;

        if (e.shiftKey) {
            if (document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            }
        } else {
            if (document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    });
}

// ==========================================
// PRELOAD CRITICAL RESOURCES
// ==========================================

function preloadResources() {
    // Fonts are preloaded via Google Fonts link in HTML head
    // Additional preloading can be added here as needed
}

// ==========================================
// PERFORMANCE MONITORING (DEV ONLY)
// ==========================================

function initPerformanceMonitoring() {
    if (process?.env?.NODE_ENV === 'production') return;

    // Log Largest Contentful Paint
    if ('PerformanceObserver' in window) {
        try {
            const lcpObserver = new PerformanceObserver((entryList) => {
                const entries = entryList.getEntries();
                const lastEntry = entries[entries.length - 1];
                console.log('[Performance] LCP:', lastEntry.startTime.toFixed(2), 'ms');
            });
            lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
        } catch (e) {
            // Observer not supported
        }
    }
}

// ==========================================
// ERROR HANDLING
// ==========================================

function initErrorHandling() {
    window.addEventListener('error', (e) => {
        console.error('[Talangin] Error:', e.message);
    });

    window.addEventListener('unhandledrejection', (e) => {
        console.error('[Talangin] Unhandled Promise Rejection:', e.reason);
    });
}

// ==========================================
// EXPOSE GLOBAL API (for debugging)
// ==========================================

function exposeAPI() {
    window.Talangin = {
        content,
        animations,
        version: '1.0.0',
    };
}

// ==========================================
// MAIN INITIALIZATION
// ==========================================

function init() {
    console.log('[Talangin] Initializing...');

    // Initialize error handling first
    initErrorHandling();

    // Preload resources
    preloadResources();

    // Initialize core features
    initMobileMenu();
    initSmoothScroll();
    initSectionObserver();
    initLazyLoading();
    initFocusTrap();

    // Initialize animations
    animations.init();

    // Expose API for debugging
    exposeAPI();

    // Performance monitoring (dev only)
    try {
        initPerformanceMonitoring();
    } catch (e) {
        // Ignore in production
    }

    console.log('[Talangin] Ready!');
}

// ==========================================
// START APPLICATION
// ==========================================

domReady(init);

// ==========================================
// EXPORTS
// ==========================================

export { init };
export default { init };
