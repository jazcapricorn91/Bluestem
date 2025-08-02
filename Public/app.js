// DOM content loaded event
document.addEventListener('DOMContentLoaded', function() {
    // Navigation handled by navigation.js module
    
    // Mobile debugging helper
    if (window.innerWidth <= 768) {
        initMobileDebug();
    }
    
    // Initialize all modules
    initQuoteLoader();
    initSmoothScrolling();
    initLazyLoading();
    initFormValidation();
    initStoryModalCloseButtons();
    initDataToggle();
    
    // Enhanced modules
    initBackgroundCarousel();
    initEnhancedPhotoAnimations();
    initEnhancedPrincipleCards();
    initEnhancedDynamicBlurbs();
    
    // Generic components
    initHoverToOpen();
    initHoverToPlay();
    initShakeAnimations();
    
    // Additional modules
    initPageLoadControl();
    initHeroCTAScroll();
    initHeroParallax();
    initScrollAnimations();
    
    updateApplyButtonText();
    
    // Program videos
    initProgramVideos();
});


// Quote loader animation - Optimized for mobile and accessibility
function initQuoteLoader() {
    window.addEventListener('load', () => {
        const quoteLoader = document.querySelector('.quote-loader');
        
        // Respect user's motion preferences
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        // Scroll to top for consistent experience
        window.scrollTo(0, 0);
        
        if (quoteLoader) {
            // Named constants for better maintainability
            const TIMING = prefersReducedMotion ? {
                BACKGROUND: 200,
                QUOTE: 1000,
                AUTHOR: 1500,
                FADE_OUT: 3000,
                REMOVE: 4000
            } : {
                BACKGROUND: 500,
                QUOTE: 3500,
                AUTHOR: 5500,
                FADE_OUT: 10000,
                REMOVE: 13000
            };
            
            // Animation sequence with error handling
            const animationSteps = [
                { delay: TIMING.BACKGROUND, action: () => quoteLoader.classList.add('show-bg') },
                { delay: TIMING.QUOTE, action: () => quoteLoader.classList.add('show-quote') },
                { delay: TIMING.AUTHOR, action: () => quoteLoader.classList.add('show-author') },
                { delay: TIMING.FADE_OUT, action: () => quoteLoader.classList.add('fade-out') },
                { delay: TIMING.REMOVE, action: () => {
                    // Only run if loader wasn't manually finished
                    if (!window.loaderFinished) {
                        finishLoading();
                    }
                }}
            ];
            
            // Execute animation steps
            animationSteps.forEach(step => {
                setTimeout(() => {
                    try {
                        step.action();
                    } catch (error) {
                        // Silently handle animation failure in production
                        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                            console.warn('Quote loader animation step failed:', error);
                        }
                        // Fallback: remove loader immediately
                        finishLoading();
                    }
                }, step.delay);
            });
            
            // Skip button for impatient users (especially mobile)
            addSkipButton(quoteLoader);
            
        } else {
            finishLoading();
        }
    });
}

// Helper function for consistent cleanup
function finishLoading() {
    const quoteLoader = document.querySelector('.quote-loader');
    if (quoteLoader) {
        // SEO: Hide instead of remove
        quoteLoader.style.display = 'none';
        quoteLoader.setAttribute('aria-hidden', 'true');
    }
    document.body.classList.remove('loading');
    window.scrollTo(0, 0);
    
    // Mark loader as finished to prevent timer-based scroll resets
    window.loaderFinished = true;
}

// Add skip button for better UX (mobile users are impatient!)
function addSkipButton(quoteLoader) {
    const skipButton = document.createElement('button');
    skipButton.className = 'skip-loader';
    skipButton.textContent = 'Skip';
    skipButton.setAttribute('aria-label', 'Skip loading animation');
    skipButton.addEventListener('click', finishLoading);
    quoteLoader.appendChild(skipButton);
}

// Background image carousel
function initBackgroundCarousel() {
    const images = document.querySelectorAll('.bg-image');
    if (images.length === 0) return;
    
    let currentIndex = 0;
    
    // Show first image
    images[currentIndex].classList.add('active');
    
    // Rotate images every 8 seconds
    setInterval(() => {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add('active');
    }, 8000);
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Lazy loading for images
function initLazyLoading() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Form validation
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (isValid) {
                // Form submission logic here
            }
        });
    });
}


// Modal system
function initStoryModalCloseButtons() {
    // Close modal when clicking outside content
    document.addEventListener('click', function(e) {
        const modal = document.getElementById('storyModal');
        if (modal && e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modal = document.getElementById('storyModal');
            if (modal && modal.classList.contains('active')) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        }
    });
}

// Update apply button text based on screen size
function updateApplyButtonText() {
    const applyBtn = document.querySelector('.enroll-btn-apply');
    if (applyBtn) {
        if (window.innerWidth <= 768) {
            applyBtn.textContent = 'Apply';
        } else {
            applyBtn.textContent = 'Apply Now';
        }
    }
}

// Listen for window resize
window.addEventListener('resize', updateApplyButtonText);

// Hero CTA scroll functionality
function initHeroCTAScroll() {
    const heroCTA = document.querySelector('.hero-cta');
    if (heroCTA) {
        heroCTA.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollBy({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
    }
}

// Hero parallax effect
function initHeroParallax() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');
        const heroBackground = document.querySelector('.hero-background');
        
        if (hero && heroContent) {
            const heroHeight = hero.offsetHeight;
            const viewportHeight = window.innerHeight;
            const stickyDistance = viewportHeight * 0.5;
            
            if (scrolled <= stickyDistance) {
                const centerOffset = scrolled - (viewportHeight / 2);
                heroContent.style.transform = `translateY(${centerOffset}px)`;
            } else if (scrolled < heroHeight) {
                const parallaxStart = stickyDistance;
                const baseCenterOffset = parallaxStart - (viewportHeight / 2);
                const additionalOffset = (scrolled - parallaxStart) * 0.3;
                const parallaxOffset = baseCenterOffset + additionalOffset;
                heroContent.style.transform = `translateY(${parallaxOffset}px)`;
            } else {
                heroContent.style.transform = '';
            }
        }
        
        // Background parallax
        if (heroBackground) {
            const backgroundOffset = scrolled * 0.5;
            heroBackground.style.transform = `translateY(${backgroundOffset}px)`;
        }
    });
}

// Scroll-based animations
const animateOnScroll = debounce(() => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.classList.add('animated');
        }
    });
}, 100);

function initScrollAnimations() {
    window.addEventListener('scroll', animateOnScroll);
}

// Page load control - ensures page always loads at top
function initPageLoadControl() {
    // Force scroll to top immediately
    window.scrollTo(0, 0);
    // Add loading class to prevent scrolling
    document.body.classList.add('loading');
    // Also force scroll position in case of any cached position
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 10);
}

// Photo animations
function initEnhancedPhotoAnimations() {
    const photoBoxes = document.querySelectorAll('.school-module .photo-box');
    if (photoBoxes.length === 0) return;
    
    let isAnimating = false;
    let currentHovered = null;
    
    // Synchronized photo-1 animations
    const photo1 = document.querySelector('.school-module .photo-1');
    const photo1Duplicate = document.querySelector('.school-module .photo-1-duplicate');
    
    function fadePhotosBackIn(hoveredBox, photoBoxes) {
        photoBoxes.forEach(otherBox => {
            if (otherBox !== hoveredBox) {
                otherBox.style.transition = 'opacity 1.2s ease 0.3s, transform 1.2s ease 0.3s';
                otherBox.classList.remove('fade-others');
            }
        });
    }
    
    function cleanupPhotoAnimations(hoveredBox, photo1, photo1Duplicate, photoBoxes) {
        hoveredBox.classList.remove('animating-down');
        hoveredBox.style.zIndex = '';
        
        // Clean up photo-1 parts
        if (hoveredBox.classList.contains('photo-1') || hoveredBox.classList.contains('photo-1-duplicate')) {
            if (photo1) photo1.classList.remove('animating-down');
            if (photo1Duplicate) photo1Duplicate.classList.remove('animating-down');
        }
        
        // Reset transitions for next hover
        photoBoxes.forEach(otherBox => {
            otherBox.style.transition = '';
        });
        
        if (currentHovered === null) {
            isAnimating = false;
        }
    }
    
    photoBoxes.forEach(box => {
        box.addEventListener('mouseenter', function(e) {
            if (!isAnimating || currentHovered === this) {
                isAnimating = true;
                currentHovered = this;
                this.classList.add('elevated');
                this.classList.remove('animating-down');
                
                // Synchronize photo-1
                if (this.classList.contains('photo-1') || this.classList.contains('photo-1-duplicate')) {
                    if (photo1) {
                        photo1.classList.add('elevated');
                        photo1.classList.remove('animating-down');
                    }
                    if (photo1Duplicate) {
                        photo1Duplicate.classList.add('elevated');
                        photo1Duplicate.classList.remove('animating-down');
                    }
                }
                
                // Fade all other photos
                photoBoxes.forEach(otherBox => {
                    // Hovering photo-1 - fade others
                    if (this.classList.contains('photo-1') || this.classList.contains('photo-1-duplicate')) {
                        if (!otherBox.classList.contains('photo-1') && !otherBox.classList.contains('photo-1-duplicate')) {
                            otherBox.classList.add('fade-others');
                        }
                    } 
                    // Hovering other photo - fade all others
                    else if (otherBox !== this) {
                        otherBox.classList.add('fade-others');
                    }
                });
            }
        });
        
        box.addEventListener('mouseleave', function(e) {
            if (this.classList.contains('elevated')) {
                this.classList.remove('elevated');
                this.classList.add('animating-down');
                currentHovered = null;
                
                // Synchronize photo-1
                if (this.classList.contains('photo-1') || this.classList.contains('photo-1-duplicate')) {
                    if (photo1) {
                        photo1.classList.remove('elevated');
                        photo1.classList.add('animating-down');
                    }
                    if (photo1Duplicate) {
                        photo1Duplicate.classList.remove('elevated');
                        photo1Duplicate.classList.add('animating-down');
                    }
                }
                
                // Fade photos back in
                setTimeout(() => fadePhotosBackIn(this, photoBoxes), 200);
                
                // Clean up animations
                setTimeout(() => cleanupPhotoAnimations(this, photo1, photo1Duplicate, photoBoxes), 800);
            }
        });
    });
}

// Generic hover-to-open component
function initHoverToOpen() {
    // Elements with data-hover-open attribute
    const hoverElements = document.querySelectorAll('[data-hover-open]');
    
    hoverElements.forEach(element => {
        const targetSelector = element.dataset.hoverOpen;
        const targetClass = element.dataset.hoverClass || 'card-visible';
        const mobileTouch = element.dataset.hoverMobile !== 'false';
        
        let targetElement;
        if (targetSelector) {
            targetElement = document.querySelector(targetSelector);
        } else {
            // Find target element
            const classBase = targetClass.replace('-visible', '').replace('active', 'modal');
            targetElement = element.closest(`.${classBase}`) || element.closest('[class*="block"]');
        }
        
        if (!targetElement) return;
        
        // Hover behavior
        element.addEventListener('mouseenter', function() {
            if (!targetElement.classList.contains(targetClass)) {
                targetElement.classList.add(targetClass);
            }
        });
        
        // Click behavior - toggle the target
        element.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            targetElement.classList.toggle(targetClass);
        });
        
        // Touch behavior
        if (mobileTouch) {
            element.addEventListener('touchstart', function(e) {
                e.preventDefault();
                if (!targetElement.classList.contains(targetClass)) {
                    targetElement.classList.add(targetClass);
                }
            }, { passive: false });
            
            element.addEventListener('touchend', function(e) {
                if (targetElement.classList.contains(targetClass)) {
                    e.preventDefault();
                    e.stopPropagation();
                    setTimeout(() => {
                        targetElement.classList.remove(targetClass);
                    }, 100);
                }
            });
        }
    });
}

// Generic hover-to-play component
function initHoverToPlay() {
    // Elements with data-hover-play attribute
    const hoverPlayElements = document.querySelectorAll('[data-hover-play]');
    
    hoverPlayElements.forEach(element => {
        const videoSelector = element.dataset.hoverPlay || 'video';
        const video = element.querySelector(videoSelector);
        
        if (!video) return;
        
        // Play video on hover
        element.addEventListener('mouseenter', () => {
            video.play().catch(() => {});
        });
        
        // Pause video when hover ends
        element.addEventListener('mouseleave', () => {
            video.pause();
            video.currentTime = 0; // Reset to beginning
        });
        
        // Touch handling
        element.addEventListener('touchstart', (e) => {
            // Toggle video playback
            if (video.paused) {
                video.play().catch(() => {});
            } else {
                video.pause();
                video.currentTime = 0;
            }
        });
    });
}

// Generic shake animation component
function initShakeAnimations() {
    // Elements with data-shake attribute
    const shakeContainers = document.querySelectorAll('[data-shake]');
    
    shakeContainers.forEach(container => {
        const targetSelector = container.dataset.shake;
        const excludeClass = container.dataset.shakeExclude || 'active';
        const animationName = container.dataset.shakeAnimation || 'shake';
        const minDelay = parseInt(container.dataset.shakeMinDelay) || 8000;
        const maxDelay = parseInt(container.dataset.shakeMaxDelay) || 15000;
        const duration = parseInt(container.dataset.shakeDuration) || 500;
        
        function addShakeAnimation() {
            const elements = container.querySelectorAll(`${targetSelector}:not(.${excludeClass})`);
            elements.forEach(element => {
                const block = element.closest('.principle-block');
                if (block && !block.classList.contains(excludeClass)) {
                    const blockIndex = Array.from(block.parentNode.children).indexOf(block);
                    const isEven = blockIndex % 2 === 1;
                    const animation = isEven ? 'shakeLeft' : animationName;
                    element.style.animation = `${animation} ${duration}ms ease-in-out`;
                    
                    setTimeout(() => {
                        element.style.animation = '';
                    }, duration);
                }
            });
        }
        
        function scheduleShake() {
            const delay = Math.random() * (maxDelay - minDelay) + minDelay;
            setTimeout(() => {
                addShakeAnimation();
                scheduleShake();
            }, delay);
        }
        
        // Start shake schedule
        scheduleShake();
    });
}

// Principle cards
function initEnhancedPrincipleCards() {
    // Handled by generic functions
}

// Dynamic blurbs
function initEnhancedDynamicBlurbs() {
    const blurbs = document.querySelectorAll('.dynamic-blurb');
    
    blurbs.forEach(blurb => {
        let touchTimer;
        
        // Touch start
        blurb.addEventListener('touchstart', (e) => {
            // Only prevent default if we're actually interacting with the blurb content
            if (e.target === blurb || blurb.contains(e.target)) {
                e.preventDefault();
            }
            
            // Visual feedback
            blurb.classList.add('touch-active');
            
            // Clear timer
            clearTimeout(touchTimer);
        }, { passive: false });
        
        // Touch end
        blurb.addEventListener('touchend', () => {
            blurb.classList.remove('touch-active');
            clearTimeout(touchTimer);
        });
        
        // Touch cancel
        blurb.addEventListener('touchcancel', () => {
            blurb.classList.remove('touch-active');
            clearTimeout(touchTimer);
        });
        
        // Touch move
        blurb.addEventListener('touchmove', () => {
            blurb.classList.remove('touch-active');
            clearTimeout(touchTimer);
        });
    });
}

// Utility function for debouncing
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

// Data toggle system
function initDataToggle() {
    // Handle data-toggle elements
    document.addEventListener('click', function(e) {
        const toggleElement = e.target.closest('[data-toggle]');
        if (!toggleElement) return;
        
        const toggleClass = toggleElement.dataset.toggle;
        const targetSelector = toggleElement.dataset.target;
        const action = toggleElement.dataset.action || 'toggle'; // toggle, add, remove
        
        let targetElement;
        
        if (targetSelector) {
            // Target specified
            targetElement = document.querySelector(targetSelector);
        } else {
            // No target - find element
            if (toggleElement.dataset.toggleSelf !== undefined) {
                targetElement = toggleElement;
            } else {
                // Find parent element
                targetElement = toggleElement.closest(`.${toggleClass.replace('card-visible', 'principle-block').replace('active', 'modal')}`);
                if (!targetElement) targetElement = toggleElement;
            }
        }
        
        if (!targetElement) return;
        
        // Perform action
        switch (action) {
            case 'add':
                targetElement.classList.add(toggleClass);
                break;
            case 'remove':
                targetElement.classList.remove(toggleClass);
                break;
            case 'toggle':
            default:
                targetElement.classList.toggle(toggleClass);
                break;
        }
        
        // Special cases
        if (toggleClass === 'active' && targetElement.id === 'storyModal') {
            // Story modal handling
            if (targetElement.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        } else if (toggleClass === 'card-visible') {
            // Principle card handling
            let principleBlock = targetElement.closest('.principle-block');
            if (!principleBlock && toggleElement !== targetElement) {
                principleBlock = toggleElement.closest('.principle-block');
            }
            if (principleBlock) {
                // Perform action on the principle block
                switch (action) {
                    case 'add':
                        principleBlock.classList.add('card-visible');
                        break;
                    case 'remove':
                        principleBlock.classList.remove('card-visible');
                        break;
                    case 'toggle':
                    default:
                        principleBlock.classList.toggle('card-visible');
                        break;
                }
                return; // Handled on principleBlock
            }
        }
        
        e.preventDefault();
    });
}

// Program videos
function initProgramVideos() {
    // Handled by initHoverToPlay()
}

// Scroll-based animations - moved to initHeroParallax to prevent duplicate listeners

// Mobile debugging helper
function initMobileDebug() {
    // Track what's preventing button clicks
    let debugInfo = {
        touchEvents: 0,
        clickEvents: 0,
        blockedElements: []
    };
    
    // Monitor all touch events
    document.addEventListener('touchstart', function(e) {
        debugInfo.touchEvents++;
        
        // Check if something is blocking the touch
        const element = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY);
        if (element && element !== e.target) {
            debugInfo.blockedElements.push({
                target: e.target.className || e.target.tagName,
                blocker: element.className || element.tagName,
                zIndex: window.getComputedStyle(element).zIndex
            });
        }
    }, { capture: true });
    
    // Monitor click events (should fire after touch on mobile)
    document.addEventListener('click', function(e) {
        debugInfo.clickEvents++;
    }, { capture: true });
    
    // Log debug info every 5 seconds
    setInterval(() => {
        if (debugInfo.touchEvents > 0 || debugInfo.blockedElements.length > 0) {
            console.log('Mobile Debug:', debugInfo);
            // Reset for next interval
            debugInfo.touchEvents = 0;
            debugInfo.clickEvents = 0;
            debugInfo.blockedElements = [];
        }
    }, 5000);
}
