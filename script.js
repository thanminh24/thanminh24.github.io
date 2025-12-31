/**
 * Portfolio - Interactive Features
 * Theme toggle (auto + manual), scroll tracking, language toggle, complex animations
 */

// ==========================================================================
// THEME MANAGEMENT (Auto by default, manual override with memory)
// ==========================================================================

function getThemePreference() {
    // Check for saved preference
    const saved = localStorage.getItem('theme');
    if (saved) {
        return saved; // 'light', 'dark', or 'auto'
    }
    return 'auto'; // Default to auto
}

function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(preference) {
    const html = document.documentElement;

    if (preference === 'auto') {
        // Remove explicit theme, let CSS media query handle it
        html.removeAttribute('data-theme');
    } else {
        html.setAttribute('data-theme', preference);
    }

    updateThemeIcon(preference);
}

function updateThemeIcon(preference) {
    const icon = document.getElementById('themeIcon');
    if (!icon) return;

    if (preference === 'auto') {
        icon.className = 'fa-solid fa-circle-half-stroke'; // Auto icon
    } else if (preference === 'dark') {
        icon.className = 'fa-solid fa-moon';
    } else {
        icon.className = 'fa-solid fa-sun';
    }
}

function cycleTheme() {
    const current = getThemePreference();
    let next;

    // Cycle: auto → light → dark → auto
    if (current === 'auto') {
        next = 'light';
    } else if (current === 'light') {
        next = 'dark';
    } else {
        next = 'auto';
    }

    localStorage.setItem('theme', next);
    applyTheme(next);
}

// Initialize theme
document.addEventListener('DOMContentLoaded', () => {
    const preference = getThemePreference();
    applyTheme(preference);
});

// Theme toggle button
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', cycleTheme);
    }
});

// Listen for system theme changes (only affects 'auto' mode)
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (getThemePreference() === 'auto') {
        // CSS handles it automatically, just update icon
        updateThemeIcon('auto');
    }
});

// ==========================================================================
// LANGUAGE TOGGLE
// ==========================================================================

function initLanguage() {
    const savedLang = localStorage.getItem('lang') || 'en';
    document.documentElement.setAttribute('data-lang', savedLang);
    updateLanguage(savedLang);
}

function toggleLanguage() {
    const currentLang = document.documentElement.getAttribute('data-lang') || 'en';
    const newLang = currentLang === 'en' ? 'vi' : 'en';

    document.documentElement.setAttribute('data-lang', newLang);
    localStorage.setItem('lang', newLang);
    updateLanguage(newLang);
}

function updateLanguage(lang) {
    // Update the toggle button text
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        const span = langToggle.querySelector('[data-lang-current]');
        if (span) span.textContent = lang.toUpperCase();
    }

    // Update all translatable elements
    const translatables = document.querySelectorAll('[data-en][data-vi]');
    translatables.forEach(el => {
        const text = el.getAttribute(`data-${lang}`);
        if (text) {
            el.textContent = text;
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initLanguage();

    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.addEventListener('click', toggleLanguage);
    }
});

// ==========================================================================
// SCROLL TRACKING - ACTIVE NAV LINK
// ==========================================================================

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = 'home';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink, { passive: true });
document.addEventListener('DOMContentLoaded', updateActiveNavLink);

// ==========================================================================
// SCROLL REVEAL ANIMATIONS
// ==========================================================================

function initScrollReveal() {
    const fadeElements = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px'
    });

    fadeElements.forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', initScrollReveal);

// ==========================================================================
// SMOOTH SCROLLING
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            if (href && href !== '#') {
                e.preventDefault();
                const targetSection = document.getElementById(href.substring(1));

                if (targetSection) {
                    // Close mobile menu if open
                    const navGroup = document.querySelector('.nav-group');
                    if (navGroup) navGroup.classList.remove('active');

                    const headerHeight = document.querySelector('.site-header')?.offsetHeight || 60;
                    const targetPosition = targetSection.offsetTop - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

// ==========================================================================
// MOBILE MENU TOGGLE
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navGroup = document.querySelector('.nav-group');

    if (mobileMenuToggle && navGroup) {
        mobileMenuToggle.addEventListener('click', () => {
            navGroup.classList.toggle('active');

            const icon = mobileMenuToggle.querySelector('i');
            if (icon) {
                icon.className = navGroup.classList.contains('active')
                    ? 'fa-solid fa-xmark'
                    : 'fa-solid fa-bars';
            }
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-group') && !e.target.closest('.mobile-menu-toggle')) {
                navGroup.classList.remove('active');
                const icon = mobileMenuToggle.querySelector('i');
                if (icon) icon.className = 'fa-solid fa-bars';
            }
        });
    }
});

// ==========================================================================
// CONSOLE MESSAGE
// ==========================================================================

console.log('%c👋 Hello!', 'font-size: 18px; font-weight: bold; color: #2563eb;');
console.log('%cBuilt with passion for AI and clean design.', 'font-size: 12px; color: #64748b;');
