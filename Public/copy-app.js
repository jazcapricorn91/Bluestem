// DOM content loaded event
document.addEventListener('DOMContentLoaded', function() {
    // Navigation is now handled by navigation.js module
    
    // Initialize all modules
    initSmoothScrolling();
    initLazyLoading();
    initFormValidation();
    
    // Initialize enhanced modules (replaces basic versions)
    initEnhancedQuoteLoader();
    initBackgroundCarousel();
    initEnhancedPhotoAnimations();
    initEnhancedPrincipleCards();
    initEnhancedDynamicBlurbs();
    
    // Initialize new modules
    initPageLoadControl();
    initHeroCTAScroll();
    initHeroParallax();
    
    updateApplyButtonText();
    
    // Initialize program videos
    initProgramVideos();
});

// Navigation functionality is now handled by navigation.js module

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

// Background image carousel
function initBackgroundCarousel() {
    const images = document.querySelectorAll('.bg-image');
    if (images.length === 0) return;
    
    let currentIndex = 0;
    
    // Show first image
    images[currentIndex].classList.add('active');
    
    // Rotate images every 8 seconds (matches HTML carousel timing)
    setInterval(() => {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add('active');
    }, 8000);
}

// Photo collage animations
function initPhotoAnimations() {
    const photoBoxes = document.querySelectorAll('.photo-box');
    
    photoBoxes.forEach(box => {
        box.addEventListener('click', function() {
            // Remove any existing animations
            photoBoxes.forEach(b => {
                b.classList.remove('elevated', 'animating-down', 'fade-others');
            });
            
            // Elevate clicked box
            this.classList.add('elevated');
            
            // Fade other boxes
            photoBoxes.forEach(b => {
                if (b !== this) {
                    b.classList.add('fade-others');
                }
            });
            
            // Reset after delay
            setTimeout(() => {
                this.classList.remove('elevated');
                this.classList.add('animating-down');
                
                photoBoxes.forEach(b => {
                    if (b !== this) {
                        b.classList.remove('fade-others');
                    }
                });
                
                setTimeout(() => {
                    this.classList.remove('animating-down');
                }, 500);
            }, 3000);
        });
    });
}

// Principle cards sliding functionality
function initPrincipleCards() {
    const principleBlocks = document.querySelectorAll('.principle-block');
    
    principleBlocks.forEach(block => {
        const title = block.querySelector('.principle-title');
        const visual = block.querySelector('.principle-visual');
        const arrow = block.querySelector('.slide-arrow');
        const textBox = block.querySelector('.text-content-box');
        
        function toggleCard() {
            block.classList.toggle('card-visible');
        }
        
        function openCard() {
            block.classList.add('card-visible');
        }
        
        function closeCard() {
            block.classList.remove('card-visible');
        }
        
        // Title click to toggle
        if (title) {
            title.addEventListener('click', toggleCard);
        }
        
        // Visual hover to open (desktop only)
        if (visual) {
            visual.addEventListener('mouseenter', function() {
                if (!block.classList.contains('card-visible')) {
                    openCard();
                }
            });
            
            // Visual click to close when open
            visual.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                if (block.classList.contains('card-visible')) {
                    closeCard();
                } else {
                    openCard();
                }
            });
        }
        
        // Text box click to close
        if (textBox) {
            textBox.addEventListener('click', function(e) {
                if (e.target === textBox || e.target.classList.contains('principle-text')) {
                    closeCard();
                }
            });
        }
        
        // Arrow click to open
        if (arrow) {
            arrow.addEventListener('click', openCard);
        }
    });
}

// Dynamic blurb touch support
function initDynamicBlurbs() {
    const blurbs = document.querySelectorAll('.dynamic-blurb');
    
    blurbs.forEach(blurb => {
        blurb.addEventListener('touchstart', function() {
            this.classList.add('touch-active');
        });
        
        blurb.addEventListener('touchend', function() {
            setTimeout(() => {
                this.classList.remove('touch-active');
            }, 300);
        });
    });
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
                console.log('Form submitted successfully');
            }
        });
    });
}

// Laura's Story Modal Functions
function openStoryModal() {
    const modal = document.getElementById('storyModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeStoryModal() {
    const modal = document.getElementById('storyModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Make modal functions available globally
window.openStoryModal = openStoryModal;
window.closeStoryModal = closeStoryModal;

// Close modal when clicking outside content
document.addEventListener('click', function(e) {
    const modal = document.getElementById('storyModal');
    if (modal && e.target === modal) {
        closeStoryModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeStoryModal();
    }
});

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
        
        if (hero && heroContent && scrolled < hero.offsetHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
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

// Enhanced photo animations with synchronized duplicates
function initEnhancedPhotoAnimations() {
    const photoBoxes = document.querySelectorAll('.school-module .photo-box');
    if (photoBoxes.length === 0) return;
    
    let isAnimating = false;
    let currentHovered = null;
    
    // Link photo-1 and photo-1-duplicate for synchronized animations
    const photo1 = document.querySelector('.school-module .photo-1');
    const photo1Duplicate = document.querySelector('.school-module .photo-1-duplicate');
    
    photoBoxes.forEach(box => {
        box.addEventListener('mouseenter', function(e) {
            if (!isAnimating || currentHovered === this) {
                isAnimating = true;
                currentHovered = this;
                this.classList.add('elevated');
                this.classList.remove('animating-down');
                
                // Synchronize photo-1 and photo-1-duplicate
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
                    // If hovering photo-1 or photo-1-duplicate, fade all others except both photo-1 parts
                    if (this.classList.contains('photo-1') || this.classList.contains('photo-1-duplicate')) {
                        if (!otherBox.classList.contains('photo-1') && !otherBox.classList.contains('photo-1-duplicate')) {
                            otherBox.classList.add('fade-others');
                        }
                    } 
                    // If hovering any other photo, fade everything else including both photo-1 parts
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
                
                // Synchronize photo-1 and photo-1-duplicate
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
                
                // Start fading other photos back in with delay
                setTimeout(() => {
                    photoBoxes.forEach(otherBox => {
                        if (otherBox !== this) {
                            otherBox.style.transition = 'opacity 1.2s ease 0.3s, transform 1.2s ease 0.3s';
                            otherBox.classList.remove('fade-others');
                        }
                    });
                }, 200);
                
                // Clean up after all animations complete
                setTimeout(() => {
                    this.classList.remove('animating-down');
                    this.style.zIndex = '';
                    
                    // Clean up both photo-1 parts
                    if (this.classList.contains('photo-1') || this.classList.contains('photo-1-duplicate')) {
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
                }, 800);
            }
        });
    });
}

// Enhanced principle cards with shake animations
function initEnhancedPrincipleCards() {
    const principleBlocks = document.querySelectorAll('.principle-block');
    
    principleBlocks.forEach(block => {
        const content = block.querySelector('.principle-content');
        const visual = block.querySelector('.principle-visual');
        const title = content?.querySelector('.principle-title');
        const arrow = content?.querySelector('.slide-arrow');
        const textBox = content?.querySelector('.text-content-box');
        
        function toggleCard() {
            block.classList.toggle('card-visible');
        }
        
        function openCard() {
            block.classList.add('card-visible');
        }
        
        function closeCard() {
            block.classList.remove('card-visible');
        }
        
        // Title click to toggle
        if (title) {
            title.addEventListener('click', toggleCard);
        }
        
        // Visual (green box/picture) interactions
        if (visual) {
            // Hover on desktop to open
            visual.addEventListener('mouseenter', function() {
                if (!block.classList.contains('card-visible')) {
                    openCard();
                }
            });
            
            // Click visual to toggle (for both open and close)
            visual.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                if (block.classList.contains('card-visible')) {
                    closeCard();
                } else {
                    openCard();
                }
            });
            
            // Touch events for mobile
            visual.addEventListener('touchstart', function(e) {
                e.preventDefault();
                if (!block.classList.contains('card-visible')) {
                    openCard();
                }
            }, { passive: false });
            
            visual.addEventListener('touchend', function(e) {
                if (block.classList.contains('card-visible')) {
                    e.preventDefault();
                    e.stopPropagation();
                    setTimeout(() => {
                        closeCard();
                    }, 100);
                }
            });
        }
        
        // Text box click to close
        if (textBox) {
            textBox.addEventListener('click', function(e) {
                if (e.target === textBox || e.target.classList.contains('principle-text')) {
                    e.preventDefault();
                    e.stopPropagation();
                    closeCard();
                }
            });
        }
        
        // Arrow click to open
        if (arrow) {
            arrow.addEventListener('click', openCard);
        }
    });
    
    // Periodic shake animation for hidden cards
    function addShakeAnimation() {
        const hiddenBlocks = document.querySelectorAll('.principle-block:not(.card-visible)');
        hiddenBlocks.forEach(block => {
            const textBox = block.querySelector('.text-content-box');
            if (textBox && !block.classList.contains('card-visible')) {
                const isEven = Array.from(block.parentNode.children).indexOf(block) % 2 === 1;
                const animationName = isEven ? 'shakeLeft' : 'shake';
                textBox.style.animation = `${animationName} 0.5s ease-in-out`;
                
                setTimeout(() => {
                    textBox.style.animation = '';
                }, 500);
            }
        });
    }
    
    // Schedule random shake animations
    function scheduleShake() {
        const delay = Math.random() * 7000 + 8000; // 8-15 seconds
        setTimeout(() => {
            addShakeAnimation();
            scheduleShake();
        }, delay);
    }
    
    // Start shake animation schedule
    scheduleShake();
}

// Enhanced dynamic blurbs with better touch support
function initEnhancedDynamicBlurbs() {
    const blurbs = document.querySelectorAll('.dynamic-blurb');
    
    blurbs.forEach(blurb => {
        let touchTimer;
        
        // Touch start - begin timer
        blurb.addEventListener('touchstart', (e) => {
            // Prevent default to avoid scrolling
            e.preventDefault();
            
            // Add touch-active class immediately for visual feedback
            blurb.classList.add('touch-active');
            
            // Clear any existing timer
            clearTimeout(touchTimer);
        }, { passive: false });
        
        // Touch end - remove class
        blurb.addEventListener('touchend', () => {
            blurb.classList.remove('touch-active');
            clearTimeout(touchTimer);
        });
        
        // Touch cancel - remove class
        blurb.addEventListener('touchcancel', () => {
            blurb.classList.remove('touch-active');
            clearTimeout(touchTimer);
        });
        
        // Touch move - if user moves finger, cancel the effect
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

// Program videos hover functionality
function initProgramVideos() {
    const programCards = document.querySelectorAll('.card-video');
    
    programCards.forEach(card => {
        const video = card.querySelector('.program-video');
        
        if (video) {
            // Play video on hover
            card.addEventListener('mouseenter', () => {
                video.play().catch(err => {
                    console.log('Video play failed:', err);
                });
            });
            
            // Pause video when hover ends
            card.addEventListener('mouseleave', () => {
                video.pause();
                video.currentTime = 0; // Reset to beginning
            });
            
            // Handle touch devices
            card.addEventListener('touchstart', (e) => {
                // Check if video is playing
                if (video.paused) {
                    video.play().catch(err => {
                        console.log('Video play failed:', err);
                    });
                } else {
                    video.pause();
                    video.currentTime = 0;
                }
            });
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

window.addEventListener('scroll', animateOnScroll);