// DOM ready initialization
document.addEventListener('DOMContentLoaded', () => {
    // Navigation handled by navigation.js
    
    // Mobile debugging
    if (window.innerWidth <= 768) {
        initMobileDebug();
    }
    
    // Core modules
    initSmoothScrolling();
    initLazyLoading();
    initPerformanceObserver();
    initFormValidation();
    initStoryModalCloseButtons();
    initDataToggle();
    
    // Enhanced components
    initBackgroundCarousel();
    initEnhancedDynamicBlurbs();
    
    // Hover behaviors
    initHoverToOpen();
    initHoverToPlay();
    initShakeAnimations();
    
    // Page controls
    initPageLoadControl();
    initScrollAnimations();
    
    updateResponsiveButtonText();
    
    // Program videos use hover behavior
});



// Background carousel
function initBackgroundCarousel() {
    const images = document.querySelectorAll('.bg-image');
    if (images.length === 0) return;
    
    let currentIndex = 0;
    
    // Load first image
    loadBackgroundImage(images[currentIndex]);
    images[currentIndex].classList.add('active');
    
    // Preload next
    if (images.length > 1) {
        loadBackgroundImage(images[1]);
    }
    
    // 8-second rotation
    setInterval(() => {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add('active');
        
        // Preload next
        const nextIndex = (currentIndex + 1) % images.length;
        loadBackgroundImage(images[nextIndex]);
    }, 8000);
}

// Lazy load background images
function loadBackgroundImage(imageElement) {
    if (!imageElement.dataset.loaded && imageElement.dataset.bgSrc) {
        imageElement.style.backgroundImage = `url(${imageElement.dataset.bgSrc})`;
        imageElement.dataset.loaded = 'true';
    }
}

// Smooth scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

// Lazy loading
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

// Performance optimization
function initPerformanceObserver() {
    const performanceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                // Pause off-screen videos
                const videos = entry.target.querySelectorAll('video');
                videos.forEach(video => {
                    if (!video.paused) {
                        video.pause();
                        video.dataset.wasPlaying = 'true';
                    }
                });
                
                // Disable hover on hidden elements
                entry.target.style.pointerEvents = 'none';
                
            } else {
                // Resume videos
                const videos = entry.target.querySelectorAll('video');
                videos.forEach(video => {
                    if (video.dataset.wasPlaying === 'true') {
                        video.play().catch(() => {});
                        delete video.dataset.wasPlaying;
                    }
                });
                
                // Re-enable hover
                entry.target.style.pointerEvents = '';
            }
        });
    }, {
        rootMargin: '50px'
    });
    
    // Observe performance-sensitive elements
    document.querySelectorAll('[data-hover-play], .dynamic-blurb, .photo-box').forEach(element => {
        performanceObserver.observe(element);
    });
}

// EMERGENCY OPTIMIZATIONS - Uncomment if needed
/*
// Animation culling
function initAnimationCulling() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                entry.target.style.animationPlayState = 'paused';
            } else {
                entry.target.style.animationPlayState = 'running';
            }
        });
    });
    
    // Observe animated elements
    document.querySelectorAll('[class*="animate"], [class*="fade"], [class*="slide"]').forEach(el => {
        observer.observe(el);
    });
}

// DOM removal optimization
function enableAggressiveOptimization() {
    // Remove modal when closed
    const originalCloseModal = window.closeModal;
    window.closeModal = function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            // Store template
            const modalTemplate = modal.outerHTML;
            window.modalTemplates = window.modalTemplates || {};
            window.modalTemplates[modalId] = modalTemplate;
            modal.remove();
        }
    };
    
    // Recreate when needed
    window.openModal = function(modalId) {
        if (window.modalTemplates && window.modalTemplates[modalId]) {
            document.body.insertAdjacentHTML('beforeend', window.modalTemplates[modalId]);
            // Re-initialize events
            initStoryModalCloseButtons();
        }
    };
}
*/

// Form validation
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Validation
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
                // Submit form
            }
        });
    });
}


// Modal system
function initStoryModalCloseButtons() {
    // Close on outside click
    document.addEventListener('click', (e) => {
        const modal = document.querySelector('#storyModal');
        if (modal && e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const modal = document.querySelector('#storyModal');
            if (modal && modal.classList.contains('active')) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        }
    });
}

// Update responsive button text based on screen size
function updateResponsiveButtonText() {
    const responsiveButtons = document.querySelectorAll('[data-text-mobile]');
    responsiveButtons.forEach(button => {
        if (window.innerWidth <= 768) {
            button.textContent = button.dataset.textMobile;
        } else {
            button.textContent = button.dataset.textDesktop || button.dataset.textMobile;
        }
    });
}

// Listen for window resize
window.addEventListener('resize', updateResponsiveButtonText);

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
    // Ensure scroll position after initial render
    requestAnimationFrame(() => {
        window.scrollTo(0, 0);
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
        element.addEventListener('mouseenter', () => {
            if (!targetElement.classList.contains(targetClass)) {
                targetElement.classList.add(targetClass);
            }
        });
        
        // Click behavior - toggle the target
        element.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            targetElement.classList.toggle(targetClass);
        });
        
        // Touch behavior
        if (mobileTouch) {
            element.addEventListener('touchstart', (e) => {
                e.preventDefault();
                if (!targetElement.classList.contains(targetClass)) {
                    targetElement.classList.add(targetClass);
                }
            }, { passive: false });
            
            element.addEventListener('touchend', (e) => {
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
        
        element.addEventListener('mouseenter', () => {
            video.play().catch(() => {}); // Graceful fallback for autoplay restrictions
        });
        
        element.addEventListener('mouseleave', () => {
            video.pause();
            video.currentTime = 0;
        });
        
        element.addEventListener('touchstart', (e) => {
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

// Data toggle system - modular approach
function initDataToggle() {
    document.addEventListener('click', (e) => {
        const toggleElement = e.target.closest('[data-toggle]');
        if (!toggleElement) return;
        
        const config = getToggleConfig(toggleElement);
        const targetElement = findToggleTarget(toggleElement, config);
        
        if (!targetElement) return;
        
        performToggleAction(targetElement, config);
        handleSpecialCases(targetElement, toggleElement, config);
        
        e.preventDefault();
    });
}

// Extract toggle configuration from element
function getToggleConfig(toggleElement) {
    return {
        toggleClass: toggleElement.dataset.toggle,
        targetSelector: toggleElement.dataset.target,
        action: toggleElement.dataset.action || 'toggle'
    };
}

// Find the target element for toggle action
function findToggleTarget(toggleElement, config) {
    if (config.targetSelector) {
        return document.querySelector(config.targetSelector);
    }
    
    if (toggleElement.dataset.toggleSelf !== undefined) {
        return toggleElement;
    }
    
    // Find parent element
    const parentSelector = `.${config.toggleClass.replace('card-visible', 'principle-block').replace('active', 'modal')}`;
    return toggleElement.closest(parentSelector) || toggleElement;
}

// Perform the toggle action
function performToggleAction(targetElement, config) {
    switch (config.action) {
        case 'add':
            targetElement.classList.add(config.toggleClass);
            break;
        case 'remove':
            targetElement.classList.remove(config.toggleClass);
            break;
        case 'toggle':
        default:
            targetElement.classList.toggle(config.toggleClass);
            break;
    }
}

// Handle special cases for specific components
function handleSpecialCases(targetElement, toggleElement, config) {
    if (config.toggleClass === 'active' && targetElement.id === 'storyModal') {
        handleStoryModal(targetElement);
    } else if (config.toggleClass === 'card-visible') {
        handlePrincipleCard(targetElement, toggleElement, config);
    }
}

// Story modal specific handling
function handleStoryModal(targetElement) {
    if (targetElement.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}

// Principle card specific handling
function handlePrincipleCard(targetElement, toggleElement, config) {
    let principleBlock = targetElement.closest('.principle-block');
    if (!principleBlock && toggleElement !== targetElement) {
        principleBlock = toggleElement.closest('.principle-block');
    }
    
    if (principleBlock) {
        performToggleAction(principleBlock, { ...config, toggleClass: 'card-visible' });
    }
}


// Scroll-based animations

// Mobile interaction monitoring
function initMobileDebug() {
    let touchMetrics = {
        touchEvents: 0,
        clickEvents: 0,
        blockedElements: []
    };
    
    document.addEventListener('touchstart', (e) => {
        touchMetrics.touchEvents++;
        
        const element = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY);
        if (element && element !== e.target) {
            touchMetrics.blockedElements.push({
                target: e.target.className || e.target.tagName,
                blocker: element.className || element.tagName,
                zIndex: window.getComputedStyle(element).zIndex
            });
        }
    }, { capture: true });
    
    document.addEventListener('click', (e) => {
        touchMetrics.clickEvents++;
    }, { capture: true });
    
    // Reset metrics periodically
    setInterval(() => {
        if (touchMetrics.touchEvents > 0 || touchMetrics.blockedElements.length > 0) {
            touchMetrics.touchEvents = 0;
            touchMetrics.clickEvents = 0;
            touchMetrics.blockedElements = [];
        }
    }, 5000);
}
