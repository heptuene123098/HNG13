// Navigation
        document.addEventListener('DOMContentLoaded', function() {
            const navLinks = document.querySelectorAll('.nav-link');
            const pages = document.querySelectorAll('.page');
            
        // Navigation handler
            navLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // Remove active class from all links and pages
                    navLinks.forEach(nl => nl.classList.remove('active'));
                    pages.forEach(page => page.classList.remove('active'));
                    
                    // Add active class to clicked link
                    this.classList.add('active');
                    
                    // Show corresponding page
                    const targetId = this.getAttribute('href').substring(1) + '-page';
                    document.getElementById(targetId).classList.add('active');
                });
            });
            
 // Update current time in milliseconds
        function updateTime() {
            const timeElement = document.getElementById('current-time');
            timeElement.textContent = Date.now();
        }
        
        // Initial update
        updateTime();
        
        // Update time every second for accuracy
        setInterval(updateTime, 1000);
        
// Contact Form Validation
            const contactForm = document.querySelector('.contact-form');
            if (contactForm) {
                contactForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    // Reset previous states
                    resetFormValidation();
                    
                    // Get form values
                    const name = document.getElementById('full-name').value.trim();
                    const email = document.getElementById('email').value.trim();
                    const subject = document.getElementById('subject').value.trim();
                    const message = document.getElementById('message').value.trim();
                    
                    let isValid = true;
                    
                    // Validate name
                    if (!name) {
                        showError('name', 'Please enter your full name');
                        isValid = false;
                    }
                    
                    // Validate email
                    if (!email) {
                        showError('email', 'Please enter your email address');
                        isValid = false;
                    } else if (!isValidEmail(email)) {
                        showError('email', 'Please enter a valid email address');
                        isValid = false;
                    }
                    
                    // Validate subject
                    if (!subject) {
                        showError('subject', 'Please enter a subject');
                        isValid = false;
                    }
                    
                    // Validate message
                    if (!message) {
                        showError('message', 'Please enter a message');
                        isValid = false;
                    } else if (message.length < 10) {
                        showError('message', 'Message must be at least 10 characters long');
                        isValid = false;
                    }
                    
                    // If valid, show success message
                    if (isValid) {
                        const successMessage = document.querySelector('[data-testid="test-contact-success"]');
                        successMessage.classList.add('show');
                        contactForm.reset();
                        
                        // Hide success message after 5 seconds
                        setTimeout(() => {
                            successMessage.classList.remove('show');
                        }, 5000);
                    }
                });
                
// Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
            });
                    
        input.addEventListener('input', function() {
            // Clear error when user starts typing
            if (this.classList.contains('error')) {
                const fieldName = this.id.replace('-', '');
                hideError(fieldName);
                }
            });
        });
    }
            
            // Form validation functions
            function resetFormValidation() {
                const errorMessages = document.querySelectorAll('.error-message');
                const inputs = document.querySelectorAll('.form-input, .form-textarea');
                
                errorMessages.forEach(msg => {
                    msg.classList.remove('show');
                });
                
                inputs.forEach(input => {
                    input.classList.remove('error');
                });
            }
            
            function showError(fieldName, message) {
                const errorElement = document.querySelector(`[data-testid="test-contact-error-${fieldName}"]`);
                const inputElement = document.getElementById(fieldName === 'name' ? 'full-name' : fieldName);
                
                if (errorElement && inputElement) {
                    errorElement.textContent = message;
                    errorElement.classList.add('show');
                    inputElement.classList.add('error');
                    inputElement.focus();
                }
            }
            
            function hideError(fieldName) {
                const errorElement = document.querySelector(`[data-testid="test-contact-error-${fieldName}"]`);
                const inputElement = document.getElementById(fieldName === 'name' ? 'full-name' : fieldName);
                
                if (errorElement && inputElement) {
                    errorElement.classList.remove('show');
                    inputElement.classList.remove('error');
                }
            }
            
            function validateField(field) {
                const value = field.value.trim();
                const fieldName = field.id;
                
                switch (fieldName) {
                    case 'full-name':
                        if (!value) {
                            showError('name', 'Please enter your full name');
                        } else {
                            hideError('name');
                        }
                        break;
                        
                    case 'email':
                        if (!value) {
                            showError('email', 'Please enter your email address');
                        } else if (!isValidEmail(value)) {
                            showError('email', 'Please enter a valid email address');
                        } else {
                            hideError('email');
                        }
                        break;
                        
                    case 'subject':
                        if (!value) {
                            showError('subject', 'Please enter a subject');
                        } else {
                            hideError('subject');
                        }
                        break;
                        
                    case 'message':
                        if (!value) {
                            showError('message', 'Please enter a message');
                        } else if (value.length < 10) {
                            showError('message', 'Message must be at least 10 characters long');
                        } else {
                            hideError('message');
                        }
                        break;
                }
            }
            
            function isValidEmail(email) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(email);
            }
        });