/**
 * Talangin - Content Module
 * Created: 2026-01-20
 * 
 * Centralized content configuration for the website
 * Makes content updates easy without touching HTML
 * 
 * @module content
 */

// ==========================================
// SITE METADATA
// ==========================================

export const siteConfig = {
    name: 'Talangin',
    tagline: 'Split bills with elegance and ease',
    description: 'The smarter way to manage shared expenses. Track who owes what, settle up instantly, and keep friendships intact.',
    url: 'https://talangin.app',
    appStoreUrl: '#', // Replace with actual App Store URL
    socialLinks: {
        twitter: 'https://twitter.com/talangin',
        instagram: 'https://instagram.com/talangin',
    },
};

// ==========================================
// NAVIGATION
// ==========================================

export const navigation = {
    links: [
        { label: 'Features', href: '#features' },
        { label: 'How It Works', href: '#how-it-works' },
        { label: 'Download', href: '#download' },
    ],
    cta: {
        label: 'Get the App',
        href: '#download',
    },
};

// ==========================================
// HERO SECTION
// ==========================================

export const hero = {
    badge: 'Now available on iOS',
    title: {
        line1: 'Split bills with',
        highlight: 'elegance',
        line2: 'and ease',
    },
    subtitle: 'The smarter way to manage shared expenses. Track who owes what, settle up instantly, and keep friendships intact.',
    cta: {
        primary: {
            label: 'Download for iOS',
            href: '#download',
        },
        secondary: {
            label: 'See how it works',
            href: '#how-it-works',
        },
    },
    stats: [
        { value: '50K+', label: 'Active Users' },
        { value: '$2M+', label: 'Bills Split' },
        { value: '4.9★', label: 'App Store' },
    ],
};

// ==========================================
// FEATURES SECTION
// ==========================================

export const features = {
    label: 'Features',
    title: 'Everything you need to split fairly',
    subtitle: 'No more awkward money conversations. Talangin handles the math so you can focus on making memories.',
    items: [
        {
            id: 'realtime',
            icon: 'clock',
            title: 'Real-time Tracking',
            description: 'See expenses update instantly as your group adds new bills. Everyone stays in the loop.',
        },
        {
            id: 'currency',
            icon: 'card',
            title: 'Multiple Currencies',
            description: 'Traveling abroad? Split bills in any currency with automatic conversion rates.',
        },
        {
            id: 'settlements',
            icon: 'check',
            title: 'Smart Settlements',
            description: 'Minimize transactions with our smart algorithm. One payment instead of many.',
        },
        {
            id: 'split',
            icon: 'chart',
            title: 'Split Any Way',
            description: 'Equal splits, percentages, or exact amounts. Customize how each expense is divided.',
        },
        {
            id: 'scanner',
            icon: 'receipt',
            title: 'Receipt Scanner',
            description: 'Snap a photo of your receipt. Our AI extracts items and prices automatically.',
        },
        {
            id: 'groups',
            icon: 'location',
            title: 'Trip Groups',
            description: 'Organize expenses by trip, event, or household. Keep everything neat and tidy.',
        },
    ],
};

// ==========================================
// HOW IT WORKS SECTION
// ==========================================

export const howItWorks = {
    label: 'How It Works',
    title: 'Three steps to financial harmony',
    steps: [
        {
            number: '01',
            title: 'Create a Group',
            description: 'Start a group for your trip, roommates, or any shared expense situation. Invite friends with a simple link.',
            visual: 'group',
        },
        {
            number: '02',
            title: 'Add Expenses',
            description: 'Log bills as they happen. Snap a receipt or enter manually. Choose how to split each one.',
            visual: 'expense',
        },
        {
            number: '03',
            title: 'Settle Up',
            description: "When it's time to pay up, see exactly who owes whom. One tap to send payment reminders or mark as settled.",
            visual: 'settle',
        },
    ],
};

// ==========================================
// TESTIMONIALS SECTION
// ==========================================

export const testimonials = {
    label: 'Testimonials',
    title: 'Loved by thousands',
    items: [
        {
            id: 1,
            quote: "Finally, an expense tracker that doesn't make me want to avoid group trips. The smart settlement feature is genius!",
            author: 'Sarah K.',
            role: 'Frequent Traveler',
            rating: 5,
            featured: false,
        },
        {
            id: 2,
            quote: 'We use Talangin for our shared apartment expenses. No more spreadsheets, no more arguments. It just works.',
            author: 'Michael T.',
            role: 'Shared Apartment',
            rating: 5,
            featured: true,
        },
        {
            id: 3,
            quote: "The receipt scanner saves so much time. Way better than Splitwise's clunky interface.",
            author: 'Diana L.',
            role: 'Event Organizer',
            rating: 5,
            featured: false,
        },
    ],
};

// ==========================================
// CTA SECTION
// ==========================================

export const cta = {
    title: 'Ready to split smarter?',
    subtitle: 'Download Talangin and never stress about shared expenses again.',
    note: 'Free to download. No credit card required.',
    appStore: {
        label: 'Download on the',
        store: 'App Store',
        href: '#', // Replace with actual App Store URL
    },
};

// ==========================================
// FOOTER
// ==========================================

export const footer = {
    tagline: 'Split bills with elegance.',
    columns: [
        {
            heading: 'Product',
            links: [
                { label: 'Features', href: '#features' },
                { label: 'How It Works', href: '#how-it-works' },
                { label: 'Download', href: '#download' },
            ],
        },
        {
            heading: 'Company',
            links: [
                { label: 'About Us', href: '#' },
                { label: 'Blog', href: '#' },
                { label: 'Careers', href: '#' },
            ],
        },
        {
            heading: 'Legal',
            links: [
                { label: 'Privacy Policy', href: '#' },
                { label: 'Terms of Service', href: '#' },
                { label: 'Contact', href: '#' },
            ],
        },
    ],
    copyright: '© 2026 Talangin. All rights reserved.',
};

// ==========================================
// APP MOCKUP DATA
// ==========================================

export const appMockup = {
    header: {
        title: 'Trip to Bali',
        badge: '4 people',
    },
    total: {
        label: 'Total Expenses',
        value: 'Rp 12,450,000',
    },
    members: [
        {
            initial: 'R',
            name: 'Rifqi',
            status: 'owes you',
            amount: '+Rp 850,000',
            type: 'positive',
        },
        {
            initial: 'A',
            name: 'Ayu',
            status: 'you owe',
            amount: '-Rp 320,000',
            type: 'negative',
        },
        {
            initial: 'B',
            name: 'Budi',
            status: 'settled up',
            amount: 'Rp 0',
            type: 'neutral',
        },
    ],
};

// ==========================================
// UTILITY: Get all content
// ==========================================

export function getAllContent() {
    return {
        siteConfig,
        navigation,
        hero,
        features,
        howItWorks,
        testimonials,
        cta,
        footer,
        appMockup,
    };
}

// ==========================================
// UTILITY: Update content dynamically
// ==========================================

export function updateHeroStats(newStats) {
    if (Array.isArray(newStats) && newStats.length === 3) {
        hero.stats = newStats;
        return true;
    }
    return false;
}

export function updateTestimonials(newTestimonials) {
    if (Array.isArray(newTestimonials)) {
        testimonials.items = newTestimonials;
        return true;
    }
    return false;
}

// Default export
export default {
    siteConfig,
    navigation,
    hero,
    features,
    howItWorks,
    testimonials,
    cta,
    footer,
    appMockup,
    getAllContent,
    updateHeroStats,
    updateTestimonials,
};
