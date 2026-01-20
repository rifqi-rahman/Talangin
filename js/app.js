/**
 * Talangin - Combined Application Script
 * Created: 2026-01-20
 * Updated: 2026-01-20 - Combined all modules into single file for file:// compatibility
 * 
 * This file combines all functionality so the site works both:
 * - Via HTTP server (localhost)
 * - Directly opening index.html (file:// protocol)
 */

(function() {
    'use strict';

    // ==========================================
    // CONFIGURATION
    // ==========================================

    const config = {
        animation: {
            duration: { fast: 0.4, normal: 0.6, slow: 0.8 },
            ease: { smooth: 'power2.out', bounce: 'back.out(1.7)', expo: 'expo.out' },
            stagger: { small: 0.1, medium: 0.15, large: 0.2 },
        },
    };

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ==========================================
    // THEME TOGGLE (Dark/Light Mode)
    // ==========================================

    function initThemeToggle() {
        const toggles = [
            document.getElementById('theme-toggle'),
            document.getElementById('mobile-theme-toggle')
        ].filter(Boolean);

        if (!toggles.length) return;

        // Check for saved theme preference or system preference
        const savedTheme = localStorage.getItem('talangin-theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

        // Apply initial theme
        document.documentElement.setAttribute('data-theme', initialTheme);

        // Toggle theme on click for all toggle buttons
        toggles.forEach(toggle => {
            toggle.addEventListener('click', () => {
                const currentTheme = document.documentElement.getAttribute('data-theme');
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                
                document.documentElement.setAttribute('data-theme', newTheme);
                localStorage.setItem('talangin-theme', newTheme);
            });
        });

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('talangin-theme')) {
                document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
            }
        });
    }

    // ==========================================
    // LANGUAGE SWITCHER
    // ==========================================

    const translations = {
        en: {
            // Navigation
            'nav.features': 'Features',
            'nav.how-it-works': 'How It Works',
            'nav.download': 'Download',
            'nav.get-app': 'Get the App',
            
            // Hero
            'hero.badge': 'Now available on iOS',
            'hero.title.line1': 'Split bills with',
            'hero.title.highlight': 'elegance',
            'hero.title.line2': 'and ease',
            'hero.subtitle': 'The smarter way to manage shared expenses. Track who owes what, settle up instantly, and keep friendships intact.',
            'hero.cta.primary': 'Download for iOS',
            'hero.cta.secondary': 'See how it works',
            'hero.stat.users': 'Active Users',
            'hero.stat.bills': 'Bills Split',
            'hero.stat.rating': 'App Store',
            'hero.scroll': 'Scroll to explore',
            
            // App Mockup
            'mockup.title': 'Trip to Bali',
            'mockup.people': '4 people',
            'mockup.total': 'Total Expenses',
            'mockup.owes-you': 'owes you',
            'mockup.you-owe': 'you owe',
            'mockup.settled': 'settled up',
            'mockup.settle-btn': 'Settle Up',
            
            // Features
            'features.label': 'Features',
            'features.title.line1': 'Everything you need to',
            'features.title.highlight': 'split fairly',
            'features.subtitle': 'No more awkward money conversations. Talangin handles the math so you can focus on making memories.',
            'features.realtime.title': 'Real-time Tracking',
            'features.realtime.desc': 'See expenses update instantly as your group adds new bills. Everyone stays in the loop.',
            'features.share.title': 'Share Expenses',
            'features.share.desc': 'Easily share bills with friends and family. Send expense invites and let everyone contribute.',
            'features.smart.title': 'Smart Settlements',
            'features.smart.desc': 'Minimize transactions with our smart algorithm. One payment instead of many.',
            'features.split.title': 'Split Any Way',
            'features.split.desc': 'Equal splits, percentages, or exact amounts. Customize how each expense is divided.',
            'features.ocr.title': 'OCR for Rapid Entry',
            'features.ocr.desc': 'Scan receipts instantly. Our OCR technology captures items and prices in seconds, not minutes.',
            'features.groups.title': 'Trip Groups',
            'features.groups.desc': 'Organize expenses by trip, event, or household. Keep everything neat and tidy.',
            
            // Screenshots
            'screenshots.label': 'Screenshots',
            'screenshots.title.line1': 'See it in',
            'screenshots.title.highlight': 'action',
            'screenshots.subtitle': 'A glimpse of the beautiful and intuitive interface.',
            
            // How It Works
            'how.label': 'How It Works',
            'how.title.line1': 'Three steps to',
            'how.title.highlight': 'financial harmony',
            'how.step1.title': 'Create a Group',
            'how.step1.desc': 'Start a group for your trip, roommates, or any shared expense situation. Invite friends with a simple link.',
            'how.step2.title': 'Add Expenses',
            'how.step2.desc': 'Log bills as they happen. Snap a receipt or enter manually. Choose how to split each one.',
            'how.step3.title': 'Settle Up',
            'how.step3.desc': "When it's time to pay up, see exactly who owes whom. One tap to send payment reminders or mark as settled.",
            'how.step1.card': 'Trip to Bali',
            'how.step2.card.title': 'Dinner at Locavore',
            'how.step2.card.split': 'Split equally',
            'how.step2.card.people': '4 people',
            
            // Testimonials
            'testimonials.label': 'Testimonials',
            'testimonials.title.line1': 'Loved by',
            'testimonials.title.highlight': 'thousands',
            'footer.announcements': 'Announcements',
            'testimonial.1.quote': '"Finally, an expense tracker that doesn\'t make me want to avoid group trips. The smart settlement feature is genius!"',
            'testimonial.1.name': 'Sarah K.',
            'testimonial.1.role': 'Frequent Traveler',
            'testimonial.2.quote': '"We use Talangin for our shared apartment expenses. No more spreadsheets, no more arguments. It just works."',
            'testimonial.2.name': 'Michael T.',
            'testimonial.2.role': 'Shared Apartment',
            'testimonial.3.quote': '"The receipt scanner saves so much time. Way better than Splitwise\'s clunky interface."',
            'testimonial.3.name': 'Diana L.',
            'testimonial.3.role': 'Event Organizer',
            
            // CTA
            'cta.title.line1': 'Ready to split',
            'cta.title.highlight': 'smarter?',
            'cta.subtitle': 'Download Talangin and never stress about shared expenses again.',
            'cta.note': 'Free to download. No credit card required.',
            'cta.store.label': 'Download on the',
            'cta.store.name': 'App Store',
            'cta.check': 'All settled up!',
            
            // Footer
            'footer.tagline': 'Split bills with elegance.',
            'footer.product': 'Product',
            'footer.company': 'Company',
            'footer.legal': 'Legal',
            'footer.announcements': 'Announcements',
            'footer.blog': 'Blog',
            'footer.connect': 'Connect',
            'footer.privacy': 'Privacy Policy',
            'footer.terms': 'Terms of Service',
            'footer.contact': 'Contact',
            'footer.copyright': '© 2026 Talangin. All rights reserved.',
        },
        id: {
            // Navigation
            'nav.features': 'Fitur',
            'nav.how-it-works': 'Cara Kerja',
            'nav.download': 'Unduh',
            'nav.get-app': 'Unduh Aplikasi',
            
            // Hero
            'hero.badge': 'Tersedia di iOS',
            'hero.title.line1': 'Split tagihan dengan',
            'hero.title.highlight': 'elegan',
            'hero.title.line2': 'dan mudah',
            'hero.subtitle': 'Cara cerdas untuk mengelola pengeluaran bersama. Lacak siapa berhutang apa, lunasi seketika, dan jaga persahabatan.',
            'hero.cta.primary': 'Unduh untuk iOS',
            'hero.cta.secondary': 'Lihat cara kerja',
            'hero.stat.users': 'Pengguna Aktif',
            'hero.stat.bills': 'Tagihan Dibagi',
            'hero.stat.rating': 'App Store',
            'hero.scroll': 'Gulir untuk jelajahi',
            
            // App Mockup
            'mockup.title': 'Trip ke Bali',
            'mockup.people': '4 orang',
            'mockup.total': 'Total Pengeluaran',
            'mockup.owes-you': 'berhutang padamu',
            'mockup.you-owe': 'kamu berhutang',
            'mockup.settled': 'lunas',
            'mockup.settle-btn': 'Lunasi',
            
            // Features
            'features.label': 'Fitur',
            'features.title.line1': 'Semua yang kamu butuhkan untuk',
            'features.title.highlight': 'bagi adil',
            'features.subtitle': 'Tidak ada lagi percakapan uang yang canggung. Talangin mengurus perhitungannya agar kamu bisa fokus membuat kenangan.',
            'features.realtime.title': 'Pelacakan Real-time',
            'features.realtime.desc': 'Lihat pengeluaran diperbarui langsung saat grupmu menambah tagihan baru. Semua tetap up-to-date.',
            'features.share.title': 'Bagikan Pengeluaran',
            'features.share.desc': 'Bagikan tagihan dengan mudah ke teman dan keluarga. Kirim undangan dan biarkan semua berkontribusi.',
            'features.smart.title': 'Pelunasan Cerdas',
            'features.smart.desc': 'Minimalkan transaksi dengan algoritma pintar kami. Satu pembayaran alih-alih banyak.',
            'features.split.title': 'Bagi Sesukamu',
            'features.split.desc': 'Bagi rata, persentase, atau jumlah pasti. Sesuaikan cara pembagian setiap pengeluaran.',
            'features.ocr.title': 'OCR Entri Cepat',
            'features.ocr.desc': 'Scan struk secara instan. Teknologi OCR kami menangkap item dan harga dalam hitungan detik.',
            'features.groups.title': 'Grup Perjalanan',
            'features.groups.desc': 'Atur pengeluaran berdasarkan perjalanan, acara, atau rumah tangga. Jaga semuanya tetap rapi.',
            
            // Screenshots
            'screenshots.label': 'Tangkapan Layar',
            'screenshots.title.line1': 'Lihat dalam',
            'screenshots.title.highlight': 'aksi',
            'screenshots.subtitle': 'Sekilas tampilan antarmuka yang indah dan intuitif.',
            
            // How It Works
            'how.label': 'Cara Kerja',
            'how.title.line1': 'Tiga langkah menuju',
            'how.title.highlight': 'harmoni finansial',
            'how.step1.title': 'Buat Grup',
            'how.step1.desc': 'Mulai grup untuk perjalanan, teman sekamar, atau situasi pengeluaran bersama apapun. Undang teman dengan link sederhana.',
            'how.step2.title': 'Tambah Pengeluaran',
            'how.step2.desc': 'Catat tagihan saat terjadi. Foto struk atau masukkan manual. Pilih cara pembagiannya.',
            'how.step3.title': 'Lunasi',
            'how.step3.desc': 'Saat waktunya membayar, lihat persis siapa berhutang kepada siapa. Satu ketuk untuk kirim pengingat atau tandai lunas.',
            'how.step1.card': 'Trip ke Bali',
            'how.step2.card.title': 'Makan di Locavore',
            'how.step2.card.split': 'Bagi rata',
            'how.step2.card.people': '4 orang',
            
            // Testimonials
            'testimonials.label': 'Testimoni',
            'testimonials.title.line1': 'Dicintai',
            'testimonials.title.highlight': 'ribuan orang',
            'footer.announcements': 'Pengumuman',
            'testimonial.1.quote': '"Akhirnya, aplikasi pelacak pengeluaran yang tidak membuat saya malas ikut trip bareng. Fitur smart settlement-nya jenius!"',
            'testimonial.1.name': 'Sarah K.',
            'testimonial.1.role': 'Traveler Aktif',
            'testimonial.2.quote': '"Kami pakai Talangin untuk pengeluaran apartemen bareng. Tidak ada lagi spreadsheet, tidak ada lagi argumen. Simpel!"',
            'testimonial.2.name': 'Michael T.',
            'testimonial.2.role': 'Kos-kosan',
            'testimonial.3.quote': '"Scanner struk menghemat waktu banget. Jauh lebih baik dari interface Splitwise yang ribet."',
            'testimonial.3.name': 'Diana L.',
            'testimonial.3.role': 'Penyelenggara Acara',
            
            // CTA
            'cta.title.line1': 'Siap split lebih',
            'cta.title.highlight': 'cerdas?',
            'cta.subtitle': 'Unduh Talangin dan tidak perlu stres lagi soal pengeluaran bersama.',
            'cta.note': 'Gratis diunduh. Tidak perlu kartu kredit.',
            'cta.store.label': 'Unduh di',
            'cta.store.name': 'App Store',
            'cta.check': 'Semua Lunas!',
            
            // Footer
            'footer.tagline': 'Split tagihan dengan elegan.',
            'footer.product': 'Produk',
            'footer.company': 'Perusahaan',
            'footer.legal': 'Legal',
            'footer.announcements': 'Pengumuman',
            'footer.blog': 'Blog',
            'footer.connect': 'Hubungi',
            'footer.privacy': 'Kebijakan Privasi',
            'footer.terms': 'Syarat Layanan',
            'footer.contact': 'Kontak',
            'footer.copyright': '© 2026 Talangin. Hak cipta dilindungi.',
        },
    };

    let currentLang = 'en';

    function initLanguageSwitcher() {
        const langButtons = document.querySelectorAll('.nav__lang-btn, .mobile-menu__lang-btn');
        if (!langButtons.length) return;

        // Check for saved language preference
        const savedLang = localStorage.getItem('talangin-lang') || 'en';
        currentLang = savedLang;
        updateLanguage(currentLang);
        updateLangButtons(currentLang);

        langButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.dataset.lang;
                if (lang !== currentLang) {
                    currentLang = lang;
                    updateLanguage(lang);
                    updateLangButtons(lang);
                    localStorage.setItem('talangin-lang', lang);
                }
            });
        });
    }

    function updateLangButtons(lang) {
        document.querySelectorAll('.nav__lang-btn, .mobile-menu__lang-btn').forEach(btn => {
            btn.setAttribute('aria-pressed', btn.dataset.lang === lang ? 'true' : 'false');
        });
    }

    function updateLanguage(lang) {
        const t = translations[lang] || translations.en;
        
        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            if (t[key]) {
                el.textContent = t[key];
            }
        });

        // Update html lang attribute
        document.documentElement.lang = lang;
    }

    // ==========================================
    // MOBILE MENU
    // ==========================================

    function initMobileMenu() {
        const toggle = document.querySelector('.nav__mobile-toggle');
        const menu = document.querySelector('.mobile-menu');
        const links = document.querySelectorAll('.mobile-menu__link');

        if (!toggle || !menu) return;

        function closeMenu() {
            toggle.setAttribute('aria-expanded', 'false');
            menu.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }

        function openMenu() {
            toggle.setAttribute('aria-expanded', 'true');
            menu.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }

        function toggleMenu() {
            const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
            isExpanded ? closeMenu() : openMenu();
        }

        toggle.addEventListener('click', toggleMenu);
        links.forEach(link => link.addEventListener('click', closeMenu));

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
                closeMenu();
                toggle.focus();
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768) closeMenu();
        });
    }

    // ==========================================
    // SMOOTH SCROLLING
    // ==========================================

    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href === '#' || !href) return;

                const target = document.querySelector(href);
                if (!target) return;

                e.preventDefault();

                const navHeight = document.querySelector('.nav')?.offsetHeight || 72;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;

                if (prefersReducedMotion) {
                    window.scrollTo(0, targetPosition);
                } else {
                    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                }

                history.pushState(null, '', href);
            });
        });
    }

    // ==========================================
    // SECTION OBSERVER (Active nav highlight)
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
                            link.classList.toggle('nav__link--active', href === `#${id}`);
                        });
                    }
                });
            },
            { rootMargin: '-50% 0px -50% 0px' }
        );

        sections.forEach(section => observer.observe(section));
    }

    // ==========================================
    // NAVBAR SCROLL EFFECT
    // ==========================================

    function initNavbarEffect() {
        const nav = document.querySelector('.nav');
        if (!nav) return;

        const scrollThreshold = 50;
        let ticking = false;

        function handleScroll() {
            if (window.scrollY > scrollThreshold) {
                nav.classList.add('nav--scrolled');
            } else {
                nav.classList.remove('nav--scrolled');
            }
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });

        handleScroll();
    }

    // ==========================================
    // GSAP ANIMATIONS
    // ==========================================

    function initGSAP() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
            console.warn('[Talangin] GSAP or ScrollTrigger not loaded, using CSS fallback');
            return false;
        }

        gsap.registerPlugin(ScrollTrigger);
        gsap.defaults({
            ease: config.animation.ease.smooth,
            duration: config.animation.duration.normal,
        });

        return true;
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

    function initEntranceAnimations() {
        if (prefersReducedMotion) {
            document.querySelectorAll('[data-animate]').forEach(el => {
                el.classList.add('animated');
                el.style.opacity = '1';
                el.style.transform = 'none';
            });
            return;
        }

        const animatedElements = document.querySelectorAll('[data-animate]');

        animatedElements.forEach(el => {
            const animationType = el.dataset.animate;
            const delay = parseFloat(el.dataset.delay) || 0;
            const initialState = getInitialState(animationType);
            const finalState = getFinalState(animationType);

            gsap.set(el, initialState);

            const isInHero = el.closest('.hero') !== null;

            if (isInHero) {
                gsap.to(el, {
                    ...finalState,
                    duration: config.animation.duration.slow,
                    delay: delay + 0.3,
                    ease: config.animation.ease.expo,
                    onComplete: () => el.classList.add('animated'),
                });
            } else {
                ScrollTrigger.create({
                    trigger: el,
                    start: 'top 85%',
                    once: true,
                    onEnter: () => {
                        gsap.to(el, {
                            ...finalState,
                            duration: config.animation.duration.normal,
                            delay: delay,
                            ease: config.animation.ease.smooth,
                            onComplete: () => el.classList.add('animated'),
                        });
                    },
                });
            }
        });
    }

    function initParallaxEffects() {
        if (prefersReducedMotion) return;

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

    function initFeatureCardEffects() {
        if (prefersReducedMotion) return;

        document.querySelectorAll('.feature-card').forEach(card => {
            const icon = card.querySelector('.feature-card__icon');
            
            card.addEventListener('mouseenter', () => {
                gsap.to(icon, {
                    scale: 1.1,
                    rotation: 5,
                    duration: config.animation.duration.fast,
                    ease: config.animation.ease.bounce,
                });
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(icon, {
                    scale: 1,
                    rotation: 0,
                    duration: config.animation.duration.fast,
                    ease: config.animation.ease.smooth,
                });
            });
        });
    }

    function initStepAnimations() {
        if (prefersReducedMotion) return;

        document.querySelectorAll('.step').forEach((step, index) => {
            const card = step.querySelector('.step__card');
            if (!card) return;

            ScrollTrigger.create({
                trigger: step,
                start: 'top 70%',
                once: true,
                onEnter: () => {
                    gsap.from(card, {
                        opacity: 0,
                        y: 30,
                        rotation: index % 2 === 0 ? -5 : 5,
                        duration: config.animation.duration.slow,
                        delay: 0.3,
                        ease: config.animation.ease.expo,
                    });
                },
            });
        });
    }

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
                    stagger: config.animation.stagger.medium,
                    duration: config.animation.duration.normal,
                    ease: config.animation.ease.smooth,
                });
            },
        });
    }

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
                    duration: config.animation.duration.slow,
                    ease: config.animation.ease.bounce,
                });
            },
        });
    }

    // ==========================================
    // INFINITE SCROLL SCREENSHOTS
    // ==========================================

    function initScreenshotsCarousel() {
        const track = document.querySelector('.screenshots__track');
        if (!track) return;

        // Clone items for infinite scroll
        const items = track.querySelectorAll('.screenshots__item');
        if (items.length === 0) return;

        // Clone all items and append
        items.forEach(item => {
            const clone = item.cloneNode(true);
            clone.setAttribute('aria-hidden', 'true');
            track.appendChild(clone);
        });

        // Use CSS animation for smooth infinite scroll
        // The animation is defined in CSS
        
        // Pause on hover
        track.addEventListener('mouseenter', () => {
            track.style.animationPlayState = 'paused';
        });
        
        track.addEventListener('mouseleave', () => {
            track.style.animationPlayState = 'running';
        });

        // Pause when reduced motion is preferred
        if (prefersReducedMotion) {
            track.style.animationPlayState = 'paused';
        }
    }

    function initAllAnimations() {
        const gsapReady = initGSAP();
        
        if (!gsapReady) {
            // CSS fallback - show all elements
            document.querySelectorAll('[data-animate]').forEach(el => {
                el.style.opacity = '1';
                el.style.transform = 'none';
            });
            return;
        }

        initEntranceAnimations();
        initParallaxEffects();
        initFeatureCardEffects();
        initStepAnimations();
        initTestimonialAnimations();
        initCTAAnimation();
        initScreenshotsCarousel();

        // Refresh on resize
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 250);
        });

        window.addEventListener('load', () => ScrollTrigger.refresh());
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
    // MAIN INITIALIZATION
    // ==========================================

    function init() {
        console.log('[Talangin] Initializing...');

        // Core features
        initThemeToggle();
        initLanguageSwitcher();
        initMobileMenu();
        initSmoothScroll();
        initSectionObserver();
        initNavbarEffect();
        initFocusTrap();

        // Animations
        initAllAnimations();

        // Expose API for debugging
        window.Talangin = {
            version: '1.0.0',
            setTheme: (theme) => {
                document.documentElement.setAttribute('data-theme', theme);
                localStorage.setItem('talangin-theme', theme);
            },
            setLanguage: (lang) => {
                if (translations[lang]) {
                    currentLang = lang;
                    updateLanguage(lang);
                    updateLangButtons(lang);
                    localStorage.setItem('talangin-lang', lang);
                }
            },
        };

        console.log('[Talangin] Ready!');
    }

    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
