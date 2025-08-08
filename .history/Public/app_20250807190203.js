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
    // Photo animations handled by page-specific JS files
    
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
    const images = document.querySelectorAll('.hero-carousel__image');
    if (images.length === 0) return;
    
    let currentIndex = 0;
    
    // Load first image
    loadBackgroundImage(images[currentIndex]);
    images[currentIndex].classList.add('hero-carousel__image--active');
    
    // Preload next
    if (images.length > 1) {
        loadBackgroundImage(images[1]);
    }
    
    // 8-second rotation
    setInterval(() => {
        images[currentIndex].classList.remove('hero-carousel__image--active');
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add('hero-carousel__image--active');
        
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

    // Close on Escape
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

// Responsive button text
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

// Resize listener
window.addEventListener('resize', updateResponsiveButtonText);

// Scroll animations
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

// Page load control
function initPageLoadControl() {
    // Force scroll to top
    window.scrollTo(0, 0);
    // Prevent scrolling during load
    document.body.classList.add('loading');
    // Ensure position after render
    requestAnimationFrame(() => {
        window.scrollTo(0, 0);
    });
}

// Hover to open
function initHoverToOpen() {
    // Find hover elements
    const hoverElements = document.querySelectorAll('[data-hover-open]');
    
    hoverElements.forEach(element => {
        const targetSelector = element.dataset.hoverOpen;
        const targetClass = element.dataset.hoverClass || 'card-visible';
        const mobileTouch = element.dataset.hoverMobile !== 'false';
        
        let targetElement;
        if (targetSelector) {
            targetElement = document.querySelector(targetSelector);
        } else {
            // Find target
            const classBase = targetClass.replace('-visible', '').replace('active', 'modal');
            targetElement = element.closest(`.${classBase}`) || element.closest('[class*="block"]');
        }
        
        if (!targetElement) return;
        
        // Hover
        element.addEventListener('mouseenter', () => {
            if (!targetElement.classList.contains(targetClass)) {
                targetElement.classList.add(targetClass);
            }
        });
        
        // Click toggle
        element.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            targetElement.classList.toggle(targetClass);
        });
        
        // Touch
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

// Hover to play
function initHoverToPlay() {
    // Find video elements
    const hoverPlayElements = document.querySelectorAll('[data-hover-play]');
    
    hoverPlayElements.forEach(element => {
        const videoSelector = element.dataset.hoverPlay || 'video';
        const video = element.querySelector(videoSelector);
        
        if (!video) return;
        
        element.addEventListener('mouseenter', () => {
            video.play().catch(() => {});
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

// Shake animations
function initShakeAnimations() {
    // Find shake containers
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
        
        // Start schedule
        scheduleShake();
    });
}


// Dynamic blurbs
function initEnhancedDynamicBlurbs() {
    const blurbs = document.querySelectorAll('.dynamic-blurb');
    
    blurbs.forEach(blurb => {
        let touchTimer;
        
        // Touch events
        blurb.addEventListener('touchstart', (e) => {
            // Prevent default for blurb interaction
            if (e.target === blurb || blurb.contains(e.target)) {
                e.preventDefault();
            }
            
            // Visual feedback
            blurb.classList.add('touch-active');
            
            // Clear timer
            clearTimeout(touchTimer);
        }, { passive: false });
        
        blurb.addEventListener('touchend', () => {
            blurb.classList.remove('touch-active');
            clearTimeout(touchTimer);
        });
        
        blurb.addEventListener('touchcancel', () => {
            blurb.classList.remove('touch-active');
            clearTimeout(touchTimer);
        });
        
        blurb.addEventListener('touchmove', () => {
            blurb.classList.remove('touch-active');
            clearTimeout(touchTimer);
        });
    });
}

// Debounce utility
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

// Get toggle config
function getToggleConfig(toggleElement) {
    return {
        toggleClass: toggleElement.dataset.toggle,
        targetSelector: toggleElement.dataset.target,
        action: toggleElement.dataset.action || 'toggle'
    };
}

// Find toggle target
function findToggleTarget(toggleElement, config) {
    if (config.targetSelector) {
        return document.querySelector(config.targetSelector);
    }
    
    if (toggleElement.dataset.toggleSelf !== undefined) {
        return toggleElement;
    }
    
    // Find parent
    const parentSelector = `.${config.toggleClass.replace('card-visible', 'principle-block').replace('active', 'modal')}`;
    return toggleElement.closest(parentSelector) || toggleElement;
}

// Perform toggle
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

// Handle special cases
function handleSpecialCases(targetElement, toggleElement, config) {
    if (config.toggleClass === 'active' && targetElement.id === 'storyModal') {
        handleStoryModal(targetElement);
    } else if (config.toggleClass === 'card-visible') {
        handlePrincipleCard(targetElement, toggleElement, config);
    }
}

// Story modal handling
function handleStoryModal(targetElement) {
    if (targetElement.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}

// Principle card handling
function handlePrincipleCard(targetElement, toggleElement, config) {
    let principleBlock = targetElement.closest('.principle-block');
    if (!principleBlock && toggleElement !== targetElement) {
        principleBlock = toggleElement.closest('.principle-block');
    }
    
    if (principleBlock) {
        performToggleAction(principleBlock, { ...config, toggleClass: 'card-visible' });
    }
}


// Mobile debugging
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
    
    // Reset metrics
    setInterval(() => {
        if (touchMetrics.touchEvents > 0 || touchMetrics.blockedElements.length > 0) {
            touchMetrics.touchEvents = 0;
            touchMetrics.clickEvents = 0;
            touchMetrics.blockedElements = [];
        }
    }, 5000);
}
