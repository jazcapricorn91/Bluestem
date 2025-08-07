// Navigation Module
// Handles desktop dropdown, mobile nav, bloom navigation, hamburger menu

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
        // DOM ready check
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupNavigation());
        } else {
            this.setupNavigation();
        }
    }

    setupNavigation() {
        // Get elements
        this.hamburger = document.getElementById('hamburger-menu');
        this.floatingMenu = document.querySelector('.floating-menu-btn');
        this.mobileNav = document.getElementById('mobile-nav');
        this.bloomNav = document.getElementById('bloom-nav');
        this.navLinks = document.querySelector('.nav-links');

        // Setup listeners
        this.setupHamburgerMenu();
        this.setupFloatingMenu();
        this.setupNavLinkClicks();
        this.setupBloomNavClicks();
        this.setupClickOutside();
    }

    // Toggle methods
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

    // Close methods
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

    // Hamburger menu
    setupHamburgerMenu() {
        if (!this.hamburger) return;

        this.hamburger.addEventListener('click', () => {
            // Choose nav by screen size
            if (window.innerWidth >= 769) {
                // Desktop dropdown
                this.toggleDesktopNav();
            } else {
                // Mobile nav
                this.toggleMobileNav();
            }
        });
    }

    // Floating menu
    setupFloatingMenu() {
        if (!this.floatingMenu || !this.bloomNav) return;

        this.floatingMenu.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleBloomNav();
        });
    }

    // Nav link clicks
    setupNavLinkClicks() {
        // Desktop dropdown
        if (this.navLinks) {
            this.navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    this.closeDesktopNav();
                });
            });
        }

        // Mobile nav
        if (this.mobileNav) {
            this.mobileNav.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    this.closeMobileNav();
                });
            });
        }
    }

    // Bloom nav clicks
    setupBloomNavClicks() {
        if (!this.bloomNav) return;

        this.bloomNav.querySelectorAll('.bloom-option').forEach(option => {
            option.addEventListener('click', () => {
                this.closeBloomNav();
            });
        });
    }

    // Click outside to close
    setupClickOutside() {
        document.addEventListener('click', (event) => {
            const floatingContainer = document.querySelector('.floating-menu-container');
            if (this.bloomNav && this.bloomNav.classList.contains('active') && 
                floatingContainer && !floatingContainer.contains(event.target)) {
                this.closeBloomNav();
            }
        });
    }

    // Close all menus
    closeAll() {
        this.closeAllNavs();
    }
}

// Initialize navigation
const navigation = new NavigationController();

// Global access
window.NavigationController = navigation;