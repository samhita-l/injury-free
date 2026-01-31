// ========================================
// Smooth Scroll for Navigation Links
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all internal links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ========================================
    // Sport Filter Functionality (Resources Page)
    // ========================================

    const filterButtons = document.querySelectorAll('.filter-btn');
    const resourceCards = document.querySelectorAll('.resource-card:not(.add-card)');

    if (filterButtons.length > 0 && resourceCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const sport = this.getAttribute('data-sport');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter cards with fade animation
                resourceCards.forEach(card => {
                    const cardSport = card.getAttribute('data-sport');
                    
                    if (sport === 'all' || cardSport === sport) {
                        card.style.animation = 'fadeInUp 0.5s ease both';
                        card.style.display = 'block';
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.95)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // ========================================
    // Intersection Observer for Scroll Animations
    // ========================================

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease both';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all cards and sections
    const animatedElements = document.querySelectorAll(
        '.feature-card, .resource-card, .workshop-card, .connect-card'
    );
    
    animatedElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
        observer.observe(el);
    });

    // ========================================
    // Mobile Menu Toggle (if needed for future)
    // ========================================

    const createMobileMenu = function() {
        const navbar = document.querySelector('.navbar');
        const navMenu = document.querySelector('.nav-menu');
        
        if (window.innerWidth <= 768 && !navbar.querySelector('.mobile-menu-toggle')) {
            const toggleButton = document.createElement('button');
            toggleButton.className = 'mobile-menu-toggle';
            toggleButton.innerHTML = '☰';
            toggleButton.style.cssText = `
                display: block;
                background: none;
                border: none;
                font-size: 1.5rem;
                color: var(--color-primary);
                cursor: pointer;
            `;
            
            navbar.querySelector('.container').appendChild(toggleButton);
            
            toggleButton.addEventListener('click', function() {
                navMenu.classList.toggle('mobile-active');
            });
        }
    };

    // Check on load and resize
    createMobileMenu();
    window.addEventListener('resize', createMobileMenu);

    // ========================================
    // Navbar Scroll Effect
    // ========================================

    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });

    // ========================================
    // Add hover effects to cards
    // ========================================

    const cards = document.querySelectorAll('.feature-card, .resource-card, .workshop-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });

    // ========================================
    // Console Welcome Message
    // ========================================

    console.log('%cWelcome to InjuryFree! 🏃‍♂️', 'color: #E85D04; font-size: 20px; font-weight: bold;');
    console.log('%cStay strong. Run far.', 'color: #003049; font-size: 14px;');
});

// ========================================
// Utility Functions
// ========================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Smooth scroll to top function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}