// Navigation Module
// Handles all navigation functionality:
// - Desktop/tablet glassmorphism dropdown
// - Mobile blooming navigation
// - Hamburger menu interactions
// - Responsive navigation switching

class NavigationController {
    constructor() {
        this.hamburger = null;
        this.floatingMenu = null;
        this.mobileNav = null;
        this.bloomNav = null;
        this.navLinks = null;
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupNavigation());
        } else {
            this.setupNavigation();
        }
    }

    setupNavigation() {
        // Get navigation elements
        this.hamburger = document.getElementById('hamburger-menu');
        this.floatingMenu = document.querySelector('.floating-menu-btn');
        this.mobileNav = document.getElementById('mobile-nav');
        this.bloomNav = document.getElementById('bloom-nav');
        this.navLinks = document.querySelector('.nav-links');

        // Setup event listeners
        this.setupHamburgerMenu();
        this.setupFloatingMenu();
        this.setupNavLinkClicks();
        this.setupBloomNavClicks();
        this.setupClickOutside();
    }

    // Toggle functions
    toggleMobileNav() {
        if (this.mobileNav) {
            this.mobileNav.classList.toggle('open');
        }
    }

    toggleBloomNav() {
        if (this.bloomNav && this.floatingMenu) {
            this.bloomNav.classList.toggle('active');
            this.floatingMenu.classList.toggle('open');
        }
    }

    toggleDesktopNav() {
        if (this.navLinks) {
            this.navLinks.classList.toggle('open');
        }
    }

    // Close functions
    closeMobileNav() {
        if (this.mobileNav) {
            this.mobileNav.classList.remove('open');
        }
    }

    closeBloomNav() {
        if (this.bloomNav && this.floatingMenu) {
            this.bloomNav.classList.remove('active');
            this.floatingMenu.classList.remove('open');
        }
    }

    closeDesktopNav() {
        if (this.navLinks) {
            this.navLinks.classList.remove('open');
        }
    }

    closeAllNavs() {
        this.closeMobileNav();
        this.closeBloomNav();
        this.closeDesktopNav();
    }

    // Setup hamburger menu functionality
    setupHamburgerMenu() {
        if (!this.hamburger) return;

        this.hamburger.addEventListener('click', () => {
            // Use appropriate navigation for screen size
            if (window.innerWidth >= 769) {
                // Desktop/tablet dropdown
                this.toggleDesktopNav();
            } else {
                // Mobile nav
                this.toggleMobileNav();
            }
        });
    }

    // Setup floating menu for mobile
    setupFloatingMenu() {
        if (!this.floatingMenu || !this.bloomNav) return;

        this.floatingMenu.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleBloomNav();
        });
    }

    // Setup navigation link clicks to close menus
    setupNavLinkClicks() {
        // Close desktop dropdown when clicking links
        if (this.navLinks) {
            this.navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    this.closeDesktopNav();
                });
            });
        }

        // Close mobile nav when clicking links
        if (this.mobileNav) {
            this.mobileNav.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    this.closeMobileNav();
                });
            });
        }
    }

    // Setup bloom navigation option clicks
    setupBloomNavClicks() {
        if (!this.bloomNav) return;

        this.bloomNav.querySelectorAll('.bloom-option').forEach(option => {
            option.addEventListener('click', () => {
                this.closeBloomNav();
            });
        });
    }

    // Setup click outside to close bloom navigation
    setupClickOutside() {
        document.addEventListener('click', (event) => {
            const floatingContainer = document.querySelector('.floating-menu-container');
            if (this.bloomNav && this.bloomNav.classList.contains('active') && 
                floatingContainer && !floatingContainer.contains(event.target)) {
                this.closeBloomNav();
            }
        });
    }

    // Close all navigation menus
    closeAll() {
        this.closeAllNavs();
    }
}

// Initialize navigation when script loads
const navigation = new NavigationController();

// Make navigation controller available globally for other scripts
window.NavigationController = navigation;