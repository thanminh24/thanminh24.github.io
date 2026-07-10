/**
 * Portfolio interactions: theme and language preferences, responsive navigation,
 * active-section tracking, and progressive reveal animation.
 */

const MOBILE_NAV_BREAKPOINT = 960;
const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

// ==========================================================================
// THEME MANAGEMENT
// ==========================================================================

function getThemePreference() {
    const savedTheme = localStorage.getItem('theme');
    return ['auto', 'light', 'dark'].includes(savedTheme) ? savedTheme : 'auto';
}

function updateThemeIcon(preference) {
    const icon = document.getElementById('themeIcon');
    const toggle = document.getElementById('themeToggle');
    const language = document.documentElement.getAttribute('data-lang') === 'vi' ? 'vi' : 'en';
    const labels = {
        en: { auto: 'Auto', light: 'Light', dark: 'Dark', prefix: 'Theme' },
        vi: { auto: 'Tự động', light: 'Sáng', dark: 'Tối', prefix: 'Giao diện' }
    };
    const label = labels[language][preference];

    if (icon) icon.textContent = label;
    if (toggle) {
        const accessibleLabel = `${labels[language].prefix}: ${label}`;
        toggle.setAttribute('aria-label', accessibleLabel);
        toggle.setAttribute('title', accessibleLabel);
    }
}

function applyTheme(preference) {
    const html = document.documentElement;
    const systemUsesDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const effectiveTheme = preference === 'auto'
        ? (systemUsesDark ? 'dark' : 'light')
        : preference;

    if (preference === 'auto') {
        html.removeAttribute('data-theme');
    } else {
        html.setAttribute('data-theme', preference);
    }

    const lightThemeColor = document.getElementById('themeColorLight');
    const darkThemeColor = document.getElementById('themeColorDark');
    if (lightThemeColor && darkThemeColor) {
        if (preference === 'auto') {
            lightThemeColor.media = '(prefers-color-scheme: light)';
            darkThemeColor.media = '(prefers-color-scheme: dark)';
        } else {
            lightThemeColor.media = effectiveTheme === 'light' ? 'all' : 'not all';
            darkThemeColor.media = effectiveTheme === 'dark' ? 'all' : 'not all';
        }
    }

    updateThemeIcon(preference);
}

function cycleTheme() {
    const currentTheme = getThemePreference();
    const nextTheme = currentTheme === 'auto'
        ? 'light'
        : currentTheme === 'light' ? 'dark' : 'auto';

    localStorage.setItem('theme', nextTheme);
    applyTheme(nextTheme);
}

function initTheme() {
    applyTheme(getThemePreference());

    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) themeToggle.addEventListener('click', cycleTheme);

    const systemThemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = () => {
        if (getThemePreference() === 'auto') applyTheme('auto');
    };

    if (typeof systemThemeQuery.addEventListener === 'function') {
        systemThemeQuery.addEventListener('change', handleSystemThemeChange);
    } else if (typeof systemThemeQuery.addListener === 'function') {
        systemThemeQuery.addListener(handleSystemThemeChange);
    }
}

// ==========================================================================
// LANGUAGE TOGGLE
// ==========================================================================

function updateLanguage(lang) {
    const html = document.documentElement;
    html.setAttribute('data-lang', lang);
    html.setAttribute('lang', lang);

    document.querySelectorAll('[data-en][data-vi]').forEach(element => {
        const translation = element.getAttribute(`data-${lang}`);
        if (translation !== null) element.textContent = translation;
    });

    const langToggle = document.getElementById('langToggle');
    if (!langToggle) return;

    const currentLanguage = langToggle.querySelector('[data-lang-current]');
    if (currentLanguage) currentLanguage.textContent = lang.toUpperCase();

    const switchLabel = lang === 'en'
        ? 'Switch to Vietnamese'
        : 'Chuyển sang tiếng Anh';
    langToggle.setAttribute('aria-label', switchLabel);
    langToggle.setAttribute('title', switchLabel);
    updateThemeIcon(getThemePreference());
    updateMobileMenuLabel();
}

function initLanguage() {
    const savedLanguage = localStorage.getItem('lang');
    const initialLanguage = savedLanguage === 'vi' ? 'vi' : 'en';
    updateLanguage(initialLanguage);

    const langToggle = document.getElementById('langToggle');
    if (!langToggle) return;

    langToggle.addEventListener('click', () => {
        const currentLanguage = document.documentElement.getAttribute('data-lang') || 'en';
        const nextLanguage = currentLanguage === 'en' ? 'vi' : 'en';
        localStorage.setItem('lang', nextLanguage);
        updateLanguage(nextLanguage);
    });
}

// ==========================================================================
// MOBILE NAVIGATION
// ==========================================================================

function updateMobileMenuLabel() {
    const toggle = document.getElementById('mobileMenuToggle');
    if (!toggle) return;

    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    const isVietnamese = document.documentElement.getAttribute('lang') === 'vi';
    const label = isVietnamese
        ? (isOpen ? 'Đóng menu điều hướng' : 'Mở menu điều hướng')
        : (isOpen ? 'Close navigation menu' : 'Open navigation menu');

    toggle.setAttribute('aria-label', label);
    toggle.setAttribute('title', label);
}

function initMobileNavigation() {
    const toggle = document.getElementById('mobileMenuToggle');
    if (!toggle) return;

    const controlledNavId = toggle.getAttribute('aria-controls');
    const nav = (controlledNavId && document.getElementById(controlledNavId))
        || document.querySelector('.nav-group');
    if (!nav) return;

    const icon = toggle.querySelector('i');

    function isOpen() {
        return nav.classList.contains('active');
    }

    function setOpen(open, options = {}) {
        const { focusFirst = false, restoreFocus = false } = options;

        nav.classList.toggle('active', open);
        toggle.setAttribute('aria-expanded', String(open));
        updateMobileMenuLabel();

        if (icon) {
            icon.classList.toggle('fa-bars', !open);
            icon.classList.toggle('fa-xmark', open);
        }

        if (open && focusFirst) {
            const firstNavItem = nav.querySelector(
                'a[href]:not([href="#"]), button:not([disabled]), [tabindex]:not([tabindex="-1"])'
            );
            if (firstNavItem) firstNavItem.focus();
        } else if (!open && restoreFocus) {
            toggle.focus();
        }
    }

    setOpen(false);

    toggle.addEventListener('click', () => {
        const open = !isOpen();
        setOpen(open, { focusFirst: open });
    });

    nav.addEventListener('click', event => {
        const link = event.target.closest('a[href]');
        if (!link) return;

        setOpen(false);

        const href = link.getAttribute('href');
        if (!href?.startsWith('#') || href.length === 1) return;

        const targetSection = document.getElementById(href.slice(1));
        const focusTarget = targetSection?.querySelector('h1, h2') || targetSection;
        if (!focusTarget) return;

        window.requestAnimationFrame(() => {
            focusTarget.setAttribute('tabindex', '-1');
            focusTarget.focus({ preventScroll: true });
            focusTarget.addEventListener('blur', () => focusTarget.removeAttribute('tabindex'), { once: true });
        });
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && isOpen()) {
            setOpen(false, { restoreFocus: true });
        }
    });

    document.addEventListener('click', event => {
        if (!isOpen()) return;
        if (!nav.contains(event.target) && !toggle.contains(event.target)) setOpen(false);
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > MOBILE_NAV_BREAKPOINT && isOpen()) setOpen(false);
    }, { passive: true });
}

// ==========================================================================
// ACTIVE SECTION TRACKING
// ==========================================================================

function initActiveNavigation() {
    const navLinks = Array.from(document.querySelectorAll('.nav-link[href^="#"]'))
        .filter(link => link.getAttribute('href').length > 1);

    const sectionLinks = navLinks
        .map(link => ({
            link,
            section: document.getElementById(link.getAttribute('href').slice(1))
        }))
        .filter(item => item.section);

    if (sectionLinks.length === 0) return;

    let updatePending = false;

    function updateActiveNavLink() {
        const headerHeight = document.querySelector('.site-header')?.offsetHeight || 0;
        const marker = window.scrollY + headerHeight + Math.min(window.innerHeight * 0.2, 160);
        let currentSection = sectionLinks[0].section;

        sectionLinks.forEach(({ section }) => {
            if (section.offsetTop <= marker) currentSection = section;
        });

        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
            currentSection = sectionLinks[sectionLinks.length - 1].section;
        }

        sectionLinks.forEach(({ link, section }) => {
            const active = section === currentSection;
            link.classList.toggle('active', active);
            if (active) {
                link.setAttribute('aria-current', 'location');
            } else {
                link.removeAttribute('aria-current');
            }
        });

        updatePending = false;
    }

    function requestActiveNavUpdate() {
        if (updatePending) return;
        updatePending = true;
        window.requestAnimationFrame(updateActiveNavLink);
    }

    window.addEventListener('scroll', requestActiveNavUpdate, { passive: true });
    window.addEventListener('resize', requestActiveNavUpdate, { passive: true });
    requestActiveNavUpdate();
}

// ==========================================================================
// PROGRESSIVE REVEAL
// ==========================================================================

function initScrollReveal() {
    const html = document.documentElement;
    const fadeElements = Array.from(document.querySelectorAll('.fade-in'));
    if (fadeElements.length === 0) return;

    function showAllContent() {
        html.classList.remove('reveal-ready');
        fadeElements.forEach(element => element.classList.add('visible'));
    }

    if (!('IntersectionObserver' in window) || reducedMotionQuery.matches) {
        showAllContent();
        return;
    }

    html.classList.add('reveal-ready');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px'
    });

    fadeElements.forEach(element => observer.observe(element));

    const handleMotionPreferenceChange = event => {
        if (!event.matches) return;
        observer.disconnect();
        showAllContent();
    };

    if (typeof reducedMotionQuery.addEventListener === 'function') {
        reducedMotionQuery.addEventListener('change', handleMotionPreferenceChange, { once: true });
    } else if (typeof reducedMotionQuery.addListener === 'function') {
        reducedMotionQuery.addListener(handleMotionPreferenceChange);
    }
}

function initPortfolio() {
    initTheme();
    initLanguage();
    initMobileNavigation();
    initActiveNavigation();
    initScrollReveal();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPortfolio, { once: true });
} else {
    initPortfolio();
}
