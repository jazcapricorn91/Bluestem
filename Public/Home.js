// Home page functionality

// Initialize home page features
document.addEventListener('DOMContentLoaded', function() {
    initQuoteLoader();
    initHeroCTAScroll();
    initHeroParallax();
    initEnhancedPhotoAnimations();
    initScrollIndicatorAlign();
});

// Quote loader
function initQuoteLoader() {
    window.addEventListener('load', () => {
        const quoteLoader = document.querySelector('.quote-loader');

        // Motion preferences
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // Reset scroll
        window.scrollTo(0, 0);

        if (quoteLoader) {
            // Timing constants
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
                {
                    delay: TIMING.REMOVE,
                    action: () => {
                        // Only run if loader wasn't manually finished
                        if (!window.loaderFinished) {
                            finishLoading();
                        }
                    }
                }
            ];

            // Execute animation steps
            animationSteps.forEach(step => {
                setTimeout(() => {
                    try {
                        step.action();
                    } catch (error) {
                        // Handle animation failure gracefully
                        // Fallback: remove loader immediately
                        finishLoading();
                    }
                }, step.delay);
            });


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


// Hero CTA scroll functionality  
function initHeroCTAScroll() {
    const heroCTA = document.querySelector('.hero-section__cta');
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
    const hero = document.querySelector('.hero-section');
    const heroContent = document.querySelector('.hero-section__content');
    const heroBackground = document.querySelector('.hero-section__background');
    const isMobile = () => window.innerWidth <= 768;

    // Set initial position: desktop centered; mobile rests at CSS top (no extra offset)
    if (hero && heroContent) {
        const viewportHeight = window.innerHeight;
        if (isMobile()) {
            heroContent.style.transform = 'translateY(0px)';
        } else {
            const initialOffset = 0 - (viewportHeight / 2);
            heroContent.style.transform = `translateY(${initialOffset}px)`;
        }
    }

    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        if (hero && heroContent) {
            const heroHeight = hero.offsetHeight;
            const viewportHeight = window.innerHeight;
            if (isMobile()) {
                // Hold at CSS position, then release upward slowly
                const HOLD_RATIO = 0.35; // portion of viewport to hold
                const RELEASE_SPEED = 0.35; // lower = slower upward move
                const holdDistance = viewportHeight * HOLD_RATIO;
                if (scrolled <= holdDistance) {
                    heroContent.style.transform = 'translateY(0px)';
                } else if (scrolled < heroHeight) {
                    const progress = scrolled - holdDistance;
                    const offset = -progress * RELEASE_SPEED;
                    heroContent.style.transform = `translateY(${offset}px)`;
                } else {
                    heroContent.style.transform = '';
                }
            } else {
                // Desktop original behavior
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
        }
        // Background parallax (unchanged; only affects carousel images)
        if (heroBackground) {
            const backgroundOffset = scrolled * 0.5;
            heroBackground.style.transform = `translateY(${backgroundOffset}px)`;
        }
    });
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

// Align scroll indicator horizontally with outlined word
function initScrollIndicatorAlign() {
    const section = document.querySelector('.hero-section');
    const indicator = document.querySelector('.hero-section__scroll-indicator');
    const outlined = document.querySelector('.hero-section__outlined-text');
    if (!section || !indicator || !outlined) return;

    const align = () => {
        try {
            const sectionRect = section.getBoundingClientRect();
            const wordRect = outlined.getBoundingClientRect();
            const centerX = wordRect.left + wordRect.width / 2;
            const localLeft = centerX - sectionRect.left;
            indicator.style.setProperty('left', `${localLeft}px`, 'important');
            indicator.style.setProperty('right', 'auto', 'important');
            indicator.style.setProperty('transform', 'translateX(-50%)', 'important');
        } catch (_) {}
    };

    // Initial and post-load (fonts/layout) alignment
    align();
    window.addEventListener('load', align, { passive: true });
    window.addEventListener('resize', align, { passive: true });
    window.addEventListener('orientationchange', align, { passive: true });
    // Re-run after short delay to catch late font/layout shifts
    setTimeout(align, 120);
    setTimeout(align, 400);

    // Throttled on-scroll alignment in case layout shifts affect centering
    let ticking = false;
    const onScroll = () => {
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(() => {
                align();
                ticking = false;
            });
        }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
}