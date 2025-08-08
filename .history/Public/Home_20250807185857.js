// Home page functionality

// Initialize home page features
document.addEventListener('DOMContentLoaded', function() {
    initQuoteLoader();
    initHeroCTAScroll();
    initHeroParallax();
    // Photo animations handled by app.js to avoid conflicts
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
            
            // Animation steps
            const animationSteps = [
                { delay: TIMING.BACKGROUND, action: () => quoteLoader.classList.add('show-bg') },        
                { delay: TIMING.QUOTE, action: () => quoteLoader.classList.add('show-quote') },
                { delay: TIMING.AUTHOR, action: () => quoteLoader.classList.add('show-author') },        
                { delay: TIMING.FADE_OUT, action: () => quoteLoader.classList.add('fade-out') },
                { delay: TIMING.REMOVE, action: () => {
                    // Check loader state
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
                        // Fallback on error
                        finishLoading();
                    }
                }, step.delay);
            });


        } else {
            finishLoading();
        }
    });
}

// Finish loading
function finishLoading() {
    const quoteLoader = document.querySelector('.quote-loader');
    if (quoteLoader) {
        // Hide loader
        quoteLoader.style.display = 'none';
        quoteLoader.setAttribute('aria-hidden', 'true');
    }

    document.body.classList.remove('loading');
    window.scrollTo(0, 0);
    
    
    // Mark finished
    window.loaderFinished = true;
}


// Hero CTA scroll  
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
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    const heroBackground = document.querySelector('.hero-background');

    // Set initial position immediately
    if (hero && heroContent) {
        const viewportHeight = window.innerHeight;
        const initialOffset = 0 - (viewportHeight / 2);
        heroContent.style.transform = `translateY(${initialOffset}px)`;
    }

    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;

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