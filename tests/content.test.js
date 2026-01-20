/**
 * Talangin - Content Module Tests
 * Created: 2026-01-20
 * 
 * Unit tests for the content module
 * Run with: node tests/content.test.js
 */

// Simple test runner since we're not using a framework
const tests = [];
let passed = 0;
let failed = 0;

function test(name, fn) {
    tests.push({ name, fn });
}

function assertEqual(actual, expected, message = '') {
    if (actual !== expected) {
        throw new Error(`Expected ${expected}, got ${actual}. ${message}`);
    }
}

function assertTrue(value, message = '') {
    if (!value) {
        throw new Error(`Expected truthy value. ${message}`);
    }
}

function assertDefined(value, message = '') {
    if (value === undefined || value === null) {
        throw new Error(`Expected defined value. ${message}`);
    }
}

// ==========================================
// IMPORT CONTENT MODULE
// ==========================================

// For Node.js testing, we need to handle ES modules
async function runTests() {
    let content;
    
    try {
        // Dynamic import for ES modules
        content = await import('../js/content.js');
    } catch (e) {
        console.log('Note: Running in browser environment or import failed');
        console.log('Error:', e.message);
        return;
    }

    // ==========================================
    // SITE CONFIG TESTS
    // ==========================================

    test('siteConfig should have name', () => {
        assertDefined(content.siteConfig.name);
        assertEqual(content.siteConfig.name, 'Talangin');
    });

    test('siteConfig should have tagline', () => {
        assertDefined(content.siteConfig.tagline);
        assertTrue(content.siteConfig.tagline.length > 0);
    });

    test('siteConfig should have description', () => {
        assertDefined(content.siteConfig.description);
        assertTrue(content.siteConfig.description.length > 20);
    });

    // ==========================================
    // NAVIGATION TESTS
    // ==========================================

    test('navigation should have links array', () => {
        assertTrue(Array.isArray(content.navigation.links));
        assertTrue(content.navigation.links.length > 0);
    });

    test('navigation links should have label and href', () => {
        content.navigation.links.forEach(link => {
            assertDefined(link.label);
            assertDefined(link.href);
            assertTrue(link.href.startsWith('#'));
        });
    });

    test('navigation should have CTA', () => {
        assertDefined(content.navigation.cta);
        assertDefined(content.navigation.cta.label);
        assertDefined(content.navigation.cta.href);
    });

    // ==========================================
    // HERO TESTS
    // ==========================================

    test('hero should have badge', () => {
        assertDefined(content.hero.badge);
        assertTrue(content.hero.badge.length > 0);
    });

    test('hero should have title with parts', () => {
        assertDefined(content.hero.title.line1);
        assertDefined(content.hero.title.highlight);
        assertDefined(content.hero.title.line2);
    });

    test('hero should have stats array with 3 items', () => {
        assertTrue(Array.isArray(content.hero.stats));
        assertEqual(content.hero.stats.length, 3);
    });

    test('hero stats should have value and label', () => {
        content.hero.stats.forEach(stat => {
            assertDefined(stat.value);
            assertDefined(stat.label);
        });
    });

    // ==========================================
    // FEATURES TESTS
    // ==========================================

    test('features should have items array', () => {
        assertTrue(Array.isArray(content.features.items));
        assertTrue(content.features.items.length >= 6);
    });

    test('feature items should have required fields', () => {
        content.features.items.forEach(item => {
            assertDefined(item.id);
            assertDefined(item.icon);
            assertDefined(item.title);
            assertDefined(item.description);
        });
    });

    test('feature items should have unique ids', () => {
        const ids = content.features.items.map(item => item.id);
        const uniqueIds = [...new Set(ids)];
        assertEqual(ids.length, uniqueIds.length, 'Feature IDs should be unique');
    });

    // ==========================================
    // HOW IT WORKS TESTS
    // ==========================================

    test('howItWorks should have steps array', () => {
        assertTrue(Array.isArray(content.howItWorks.steps));
        assertEqual(content.howItWorks.steps.length, 3, 'Should have exactly 3 steps');
    });

    test('howItWorks steps should be numbered correctly', () => {
        content.howItWorks.steps.forEach((step, index) => {
            assertEqual(step.number, `0${index + 1}`);
        });
    });

    // ==========================================
    // TESTIMONIALS TESTS
    // ==========================================

    test('testimonials should have items array', () => {
        assertTrue(Array.isArray(content.testimonials.items));
        assertTrue(content.testimonials.items.length >= 3);
    });

    test('testimonial items should have required fields', () => {
        content.testimonials.items.forEach(item => {
            assertDefined(item.id);
            assertDefined(item.quote);
            assertDefined(item.author);
            assertDefined(item.role);
            assertDefined(item.rating);
        });
    });

    test('testimonials should have one featured item', () => {
        const featured = content.testimonials.items.filter(item => item.featured);
        assertEqual(featured.length, 1, 'Should have exactly one featured testimonial');
    });

    // ==========================================
    // CTA TESTS
    // ==========================================

    test('cta should have title and subtitle', () => {
        assertDefined(content.cta.title);
        assertDefined(content.cta.subtitle);
    });

    test('cta should have appStore config', () => {
        assertDefined(content.cta.appStore);
        assertDefined(content.cta.appStore.label);
        assertDefined(content.cta.appStore.store);
        assertDefined(content.cta.appStore.href);
    });

    // ==========================================
    // FOOTER TESTS
    // ==========================================

    test('footer should have columns array', () => {
        assertTrue(Array.isArray(content.footer.columns));
        assertTrue(content.footer.columns.length >= 3);
    });

    test('footer columns should have heading and links', () => {
        content.footer.columns.forEach(column => {
            assertDefined(column.heading);
            assertTrue(Array.isArray(column.links));
            assertTrue(column.links.length > 0);
        });
    });

    // ==========================================
    // APP MOCKUP TESTS
    // ==========================================

    test('appMockup should have header', () => {
        assertDefined(content.appMockup.header);
        assertDefined(content.appMockup.header.title);
    });

    test('appMockup should have members array', () => {
        assertTrue(Array.isArray(content.appMockup.members));
        assertTrue(content.appMockup.members.length >= 3);
    });

    // ==========================================
    // UTILITY FUNCTION TESTS
    // ==========================================

    test('getAllContent should return all content', () => {
        const allContent = content.getAllContent();
        assertDefined(allContent.siteConfig);
        assertDefined(allContent.navigation);
        assertDefined(allContent.hero);
        assertDefined(allContent.features);
        assertDefined(allContent.howItWorks);
        assertDefined(allContent.testimonials);
        assertDefined(allContent.cta);
        assertDefined(allContent.footer);
    });

    test('updateHeroStats should validate input', () => {
        const originalStats = [...content.hero.stats];
        
        // Should reject invalid input
        const result1 = content.updateHeroStats([1, 2]); // Wrong length
        assertEqual(result1, false);
        
        // Should accept valid input
        const newStats = [
            { value: '100K+', label: 'Users' },
            { value: '$5M+', label: 'Split' },
            { value: '5.0★', label: 'Rating' },
        ];
        const result2 = content.updateHeroStats(newStats);
        assertEqual(result2, true);
        
        // Restore original
        content.updateHeroStats(originalStats);
    });

    test('updateTestimonials should validate input', () => {
        const originalTestimonials = [...content.testimonials.items];
        
        // Should accept array
        const result = content.updateTestimonials([]);
        assertEqual(result, true);
        
        // Restore original
        content.updateTestimonials(originalTestimonials);
    });

    // ==========================================
    // RUN TESTS
    // ==========================================

    console.log('\n🧪 Running Talangin Content Tests...\n');

    for (const { name, fn } of tests) {
        try {
            fn();
            passed++;
            console.log(`  ✅ ${name}`);
        } catch (error) {
            failed++;
            console.log(`  ❌ ${name}`);
            console.log(`     Error: ${error.message}`);
        }
    }

    console.log('\n' + '='.repeat(50));
    console.log(`📊 Results: ${passed} passed, ${failed} failed`);
    console.log('='.repeat(50) + '\n');

    if (failed > 0) {
        process.exit(1);
    }
}

// Run tests
runTests().catch(console.error);
