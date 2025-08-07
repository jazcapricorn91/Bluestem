// Contact page functionality

document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
    initContactAnimations();
    initQuickActionCards();
});

function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    // Form validation handlers
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => clearFieldError(input));
    });

    // Form submission handler
    form.addEventListener('submit', handleFormSubmit);
}

function validateField(field) {
    const validationType = field.getAttribute('data-validation');
    const value = field.value.trim();
    const errorElement = document.querySelector(`[data-error-for="${field.id}"]`);
    
    let isValid = true;
    let errorMessage = '';

    switch (validationType) {
        case 'name':
            if (!value) {
                isValid = false;
                errorMessage = 'This field is required.';
            } else if (value.length < 2) {
                isValid = false;
                errorMessage = 'Please enter at least 2 characters.';
            }
            break;

        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value) {
                isValid = false;
                errorMessage = 'Email address is required.';
            } else if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address.';
            }
            break;

        case 'phone':
            // Optional validation
            if (value) {
                const phoneRegex = /^[\d\s\-\(\)\+\.]{10,}$/;
                if (!phoneRegex.test(value.replace(/\s/g, ''))) {
                    isValid = false;
                    errorMessage = 'Please enter a valid phone number.';
                }
            }
            break;

        case 'select':
            if (!value) {
                isValid = false;
                errorMessage = 'Please select an option.';
            }
            break;

        case 'message':
            if (!value) {
                isValid = false;
                errorMessage = 'Please enter your message.';
            } else if (value.length < 10) {
                isValid = false;
                errorMessage = 'Please enter at least 10 characters.';
            }
            break;

        case 'optional':
            // Always valid
            break;
    }

    // Update field state
    if (isValid) {
        field.classList.remove('error');
        if (errorElement) errorElement.textContent = '';
    } else {
        field.classList.add('error');
        if (errorElement) errorElement.textContent = errorMessage;
    }

    return isValid;
}

function clearFieldError(field) {
    field.classList.remove('error');
    const errorElement = document.querySelector(`[data-error-for="${field.id}"]`);
    if (errorElement) errorElement.textContent = '';
}

async function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitButton = form.querySelector('.form-submit-btn');
    const successMessage = document.getElementById('formSuccess');
    
    // Validate form
    let isFormValid = true;
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        if (!validateField(input)) {
            isFormValid = false;
        }
    });

    if (!isFormValid) {
        // Scroll to first error
        const firstError = form.querySelector('.error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            firstError.focus();
        }
        return;
    }

    // Show loading state
    const originalText = submitButton.textContent;
    const loadingText = submitButton.getAttribute('data-loading-text') || 'Sending...';
    submitButton.textContent = loadingText;
    submitButton.disabled = true;

    try {
        // Collect form data
        const formData = new FormData(form);
        const data = {};
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }

        // API call simulation
        await simulateFormSubmission(data);
        
        // Show success message
        successMessage.style.display = 'block';
        form.reset();
        
        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
    } catch (error) {
        console.error('Form submission error:', error);
        alert('There was an error sending your message. Please try again or contact us directly.');
    } finally {
        // Reset button state
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
}

function simulateFormSubmission(data) {
    return new Promise((resolve, reject) => {
        // Simulate network delay
        setTimeout(() => {
            // Validate required fields exist
            if (!data.name || !data.email || !data.message) {
                reject(new Error('Missing required form fields'));
                return;
            }
            
            // Simulate success
            resolve({ success: true, message: 'Thank you for contacting us!' });
        }, 1500);
    });
}

function initContactAnimations() {
    // Contact method hover effects
    const contactMethods = document.querySelectorAll('.contact-method');
    contactMethods.forEach(method => {
        method.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        method.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Smooth scroll for hero CTA
    const heroCtaButton = document.querySelector('.hero-cta');
    if (heroCtaButton) {
        heroCtaButton.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Animate contact methods
    contactMethods.forEach(method => {
        method.style.opacity = '0';
        method.style.transform = 'translateY(20px)';
        method.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(method);
    });

    // Animate form
    const formContainer = document.querySelector('.form-container');
    if (formContainer) {
        formContainer.style.opacity = '0';
        formContainer.style.transform = 'translateY(30px)';
        formContainer.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(formContainer);
    }
}

function initQuickActionCards() {
    const quickActionCards = document.querySelectorAll('[data-action="scroll-to-form"]');
    
    quickActionCards.forEach(card => {
        card.addEventListener('click', function() {
            const inquiryType = this.getAttribute('data-inquiry-type');
            const formSection = document.querySelector('#contact-form, .contact-form-section');
            const inquiryDropdown = document.getElementById('inquiryType');
            
            // Pre-select inquiry type
            if (inquiryDropdown && inquiryType) {
                inquiryDropdown.value = inquiryType;
                
                // Clear error state
                inquiryDropdown.classList.remove('error');
                const errorElement = document.querySelector(`[data-error-for="inquiryType"]`);
                if (errorElement) errorElement.textContent = '';
            }
            
            // Scroll to form
            if (formSection) {
                const yOffset = -20;
                const elementPosition = formSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset + yOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Focus first empty field
                setTimeout(() => {
                    focusFirstEmptyField();
                }, 800);
            }
        });
        
        // Visual feedback
        card.style.cursor = 'pointer';
        
        // Add keyboard support
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        // Accessibility
        if (!card.hasAttribute('tabindex')) {
            card.setAttribute('tabindex', '0');
        }
    });
}

function focusFirstEmptyField() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    // Focus priority
    const fieldSelectors = [
        '#firstName',
        '#lastName', 
        '#email',
        '#phone',
        '#message'
    ];
    
    for (const selector of fieldSelectors) {
        const field = form.querySelector(selector);
        if (field && !field.value.trim()) {
            field.focus();
            break;
        }
    }
}