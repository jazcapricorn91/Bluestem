// Quote Loader Functions Comparison
// =================================
// This file contains all quote loader functions found in the Bluestem project

// FROM: Public/app.js (line 4)
// STATUS: Currently active in main app.js
// =====================================
// Quote loader animation
function initQuoteLoader() {
    window.addEventListener('load', () => {
        const quoteLoader = document.querySelector('.quote-loader');
        
        if (quoteLoader) {
            // Step 1: Fade background from white to red (starts at 500ms, takes 3s)
            setTimeout(() => {
                quoteLoader.classList.add('show-bg');
            }, 500);
            
            // Step 2: Show quote text slowly (starts at 3500ms, takes 2s)
            setTimeout(() => {
                quoteLoader.classList.add('show-quote');
            }, 3500);
            
            // Step 3: Show author slowly (starts at 5500ms, takes 2s)
            setTimeout(() => {
                quoteLoader.classList.add('show-author');
            }, 5500);
            
            // Step 4: Fade out loader and allow scrolling (starts at 10s, takes 3s)
            setTimeout(() => {
                quoteLoader.classList.add('fade-out');
                document.body.style.overflow = 'auto';
                
                // Remove loader from DOM after fade completes
                setTimeout(() => {
                    quoteLoader.remove();
                }, 3000);
            }, 10000);
        }
    });
}

// FROM: Public/copy-app.js (line 31)
// STATUS: Backup copy - same as above
// ===================================
// Quote loader animation
function initQuoteLoader_copy() {
    window.addEventListener('load', () => {
        const quoteLoader = document.querySelector('.quote-loader');
        
        if (quoteLoader) {
            // Step 1: Fade background from white to red (starts at 500ms, takes 3s)
            setTimeout(() => {
                quoteLoader.classList.add('show-bg');
            }, 500);
            
            // Step 2: Show quote text slowly (starts at 3500ms, takes 2s)
            setTimeout(() => {
                quoteLoader.classList.add('show-quote');
            }, 3500);
            
            // Step 3: Show author slowly (starts at 5500ms, takes 2s)
            setTimeout(() => {
                quoteLoader.classList.add('show-author');
            }, 5500);
            
            // Step 4: Fade out loader and allow scrolling (starts at 10s, takes 3s)
            setTimeout(() => {
                quoteLoader.classList.add('fade-out');
                document.body.style.overflow = 'auto';
                
                // Remove loader from DOM after fade completes
                setTimeout(() => {
                    quoteLoader.remove();
                }, 3000);
            }, 10000);
        }
    });
}

// FROM: Public/copy-app.js (line 359)
// STATUS: Enhanced version with scroll prevention
// ===============================================
// Enhanced quote loader with scroll prevention
function initEnhancedQuoteLoader() {
    window.addEventListener('load', () => {
        const loader = document.querySelector('.quote-loader');
        
        // Force scroll to top again on full load
        window.scrollTo(0, 0);
        
        if (loader) {
            // Step 1: Fade background from white to red (starts at 500ms, takes 3s)
            setTimeout(() => {
                loader.classList.add('show-bg');
            }, 500);
            
            // Step 2: Show quote text slowly (starts at 3500ms, takes 2s)
            setTimeout(() => {
                loader.classList.add('show-quote');
            }, 3500);
            
            // Step 3: Show author slowly (starts at 5500ms, takes 2s)
            setTimeout(() => {
                loader.classList.add('show-author');
            }, 5500);
            
            // Step 4: Hold for delay, then fade everything out slowly (starts at 10s, takes 3s)
            setTimeout(() => {
                loader.classList.add('fade-out');
            }, 10000);
            
            // Remove the loader from DOM after fade completes and allow scrolling
            setTimeout(() => {
                loader.remove();
                // Re-enable scrolling after loader animation completes
                document.body.classList.remove('loading');
                // Final scroll to top to ensure hero is visible
                window.scrollTo(0, 0);
            }, 13000);
        } else {
            // If no loader, just remove the loading class after a short delay
            setTimeout(() => {
                document.body.classList.remove('loading');
            }, 100);
        }
    });
}

// DIFFERENCES BETWEEN VERSIONS:
// ============================
// 
// 1. Basic initQuoteLoader():
//    - Uses document.body.style.overflow = 'auto' to re-enable scrolling
//    - Total duration: 13 seconds (10s + 3s fade)
//    - No scroll position management
//    - No else clause for missing loader
//
// 2. Enhanced initEnhancedQuoteLoader():
//    - Uses document.body.classList.remove('loading') for scroll control
//    - Total duration: 13 seconds (explicit)
//    - Forces scroll to top at start and end
//    - Has else clause to handle missing loader
//    - More robust scroll prevention system
//
// NOTE: Only found 3 quote loader functions total (2 unique implementations)
// The current app.js only contains the basic version