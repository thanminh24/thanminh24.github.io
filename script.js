/**
 * Portfolio Website - Interactive Features
 * Theme toggle, scroll animations, spotlight effect, mobile menu
 */

// ==========================================================================
// THEME MANAGEMENT
// ==========================================================================

/**
 * Get the user's preferred theme
 * Priority: 1) localStorage 2) system preference 3) default to dark
 */
function getTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        return savedTheme;
    }

    // Check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
}

/**
 * Apply theme to the document
 */
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    // Update theme toggle icon (Font Awesome)
    const themeIcon = document.getElementById('themeIcon');
    if (themeIcon) {
        if (theme === 'dark') {
            themeIcon.className = 'fa-solid fa-sun'; // Sun for dark mode
        } else {
            themeIcon.className = 'fa-solid fa-moon'; // Moon for light mode
        }
    }
}

/**
 * Toggle between light and dark themes
 */
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
}

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', () => {
    const theme = getTheme();
    applyTheme(theme);
});

// Theme toggle button event listener
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    // Only auto-update if user hasn't manually set a preference
    if (!localStorage.getItem('theme')) {
        applyTheme(e.matches ? 'dark' : 'light');
    }
});

// ==========================================================================
// SPOTLIGHT EFFECT (Dark Mode Only)
// ==========================================================================

/**
 * Track mouse position for spotlight effect
 * Only active in dark mode
 */
document.addEventListener('mousemove', (e) => {
    // Only apply spotlight in dark mode
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
        document.body.style.setProperty('--mouse-x', e.clientX + 'px');
        document.body.style.setProperty('--mouse-y', e.clientY + 'px');
    }
});

// ==========================================================================
// SCROLL ANIMATIONS
// ==========================================================================

/**
 * Intersection Observer for scroll-triggered animations
 */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Optional: stop observing after animation triggers once
            // observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        // Don't animate the hero section (it's already visible)
        if (!section.classList.contains('visible')) {
            observer.observe(section);
        }
    });
});

// ==========================================================================
// SCROLL TRACKING FOR ACTIVE NAVIGATION
// ==========================================================================

/**
 * Update active navigation link based on scroll position
 */
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        // Check if section is in viewport
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    // Update active class
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Listen for scroll events
window.addEventListener('scroll', updateActiveNavLink, { passive: true });

// Initialize on load
document.addEventListener('DOMContentLoaded', updateActiveNavLink);

// ==========================================================================
// SMOOTH SCROLLING
// ==========================================================================

/**
 * Smooth scroll to section when clicking nav links
 */
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            // Handle hash links
            if (href && href !== '#') {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    // Close mobile menu if open
                    const sidebar = document.getElementById('sidebar');
                    if (sidebar) {
                        sidebar.classList.remove('active');
                    }

                    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
                    if (mobileMenuToggle) {
                        mobileMenuToggle.textContent = '☰';
                    }

                    // Smooth scroll to target
                    const headerOffset = 0; // No header offset needed with sidebar
                    const elementPosition = targetSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

// ==========================================================================
// MOBILE MENU TOGGLE (SIDEBAR)
// ==========================================================================

/**
 * Toggle sidebar on mobile
 */
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const sidebar = document.getElementById('sidebar');

    if (mobileMenuToggle && sidebar) {
        mobileMenuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');

            // Update button icon
            const isActive = sidebar.classList.contains('active');
            mobileMenuToggle.textContent = isActive ? '✕' : '☰';
        });

        // Close sidebar when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.sidebar') && !e.target.closest('.mobile-menu-toggle')) {
                sidebar.classList.remove('active');
                mobileMenuToggle.textContent = '☰';
            }
        });
    }
});

// ==========================================================================
// RESUME DOWNLOAD
// ==========================================================================

/**
 * Resume download is now handled directly via the HTML link
 * The download attribute triggers an automatic download when clicked
 * No JavaScript handler needed - keeping this section for documentation
 */

// Header scroll effect removed - using sidebar navigation instead

// ==========================================================================
// DYNAMIC TYPING EFFECT (Optional Enhancement)
// ==========================================================================

/**
 * Add subtle typing animation to hero subtitle (optional)
 */
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    element.style.opacity = '1';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Uncomment to enable typing effect
// document.addEventListener('DOMContentLoaded', () => {
//   const subtitle = document.querySelector('.hero-subtitle');
//   if (subtitle) {
//     const text = subtitle.textContent;
//     subtitle.style.opacity = '0';
//     setTimeout(() => typeWriter(subtitle, text, 30), 800);
//   }
// });

// ==========================================================================
// PERFORMANCE OPTIMIZATIONS
// ==========================================================================

/**
 * Lazy load images (if images are added later)
 */
document.addEventListener('DOMContentLoaded', () => {
    if ('loading' in HTMLImageElement.prototype) {
        // Native lazy loading supported
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src || img.src;
        });
    } else {
        // Fallback for browsers that don't support native lazy loading
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }
});

// ==========================================================================
// ACCESSIBILITY ENHANCEMENTS
// ==========================================================================

/**
 * Keyboard navigation support
 */
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const navLinks = document.getElementById('navLinks');
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');

        if (navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            if (mobileMenuToggle) {
                mobileMenuToggle.textContent = '☰';
            }
        }
    }
});

/**
 * Focus visible for keyboard users
 */
document.addEventListener('DOMContentLoaded', () => {
    // Add focus-visible class for keyboard navigation
    document.body.addEventListener('mousedown', () => {
        document.body.classList.add('using-mouse');
    });

    document.body.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.remove('using-mouse');
        }
    });
});

// ==========================================================================
// ANALYTICS & TRACKING (Optional)
// ==========================================================================

/**
 * Track section visibility for analytics
 */
function trackSectionView(sectionId) {
    // You can integrate with Google Analytics, Plausible, or other tools here
    console.log(`Section viewed: ${sectionId}`);

    // Example for Google Analytics (if integrated):
    // gtag('event', 'section_view', { 'section_id': sectionId });
}

// Track when sections become visible
const analyticsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            trackSectionView(entry.target.id);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
        analyticsObserver.observe(section);
    });
});

// ==========================================================================
// EASTER EGGS & FUN INTERACTIONS
// ==========================================================================

/**
 * Konami code easter egg (optional fun feature)
 */
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Easter egg activated!
        console.log('🎉 Konami code activated! You found the secret!');
        document.body.style.transform = 'rotate(360deg)';
        document.body.style.transition = 'transform 2s ease';
        setTimeout(() => {
            document.body.style.transform = '';
        }, 2000);
    }
});

// ==========================================================================
// CONSOLE MESSAGE
// ==========================================================================

/**
 * Fun console message for developers who inspect the site
 */
console.log(
    '%c👋 Hello, fellow developer!',
    'font-size: 20px; font-weight: bold; color: #6366f1;'
);
console.log(
    '%cThanks for checking out my portfolio! If you\'re interested in collaborating or have questions about the code, feel free to reach out at minhthan189@gmail.com',
    'font-size: 14px; color: #a1a1aa;'
);
console.log(
    '%c🚀 Built with: HTML, CSS, JavaScript',
    'font-size: 12px; color: #52525b;'
);
