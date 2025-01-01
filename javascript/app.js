// Wait for the DOM to be fully loaded before executing scripts
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    const smoothScroll = (target) => {
        const element = document.querySelector(target);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 80, // Accounting for fixed header
                behavior: 'smooth'
            });
        }
    };

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            smoothScroll(this.getAttribute('href'));
        });
    });

    // Room details modal functionality
    const modal = document.getElementById('room-modal');
    const closeButton = document.querySelector('.close-button');

    window.showRoomDetails = (title, description) => {
        const modalTitle = document.getElementById('room-title');
        const modalDescription = document.getElementById('room-description');
        
        modalTitle.textContent = title;
        modalDescription.textContent = description;
        modal.style.display = 'block';
        
        // Add a class to trigger fade-in animation
        setTimeout(() => modal.classList.add('show'), 10);
    };

    window.closeRoomDetails = () => {
        modal.classList.remove('show');
        setTimeout(() => modal.style.display = 'none', 300);
    };

    if (closeButton) {
        closeButton.addEventListener('click', closeRoomDetails);
    }

    // Close modal when clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeRoomDetails();
        }
    });

    // Reservation form validation and submission
    const reservationForm = document.getElementById('reservation-form');
    if (reservationForm) {
        reservationForm.addEventListener('submit', function (e) {
            e.preventDefault();
            if (validateForm()) {
                submitForm();
            }
        });
    }

    function validateForm() {
        let isValid = true;
        const requiredFields = document.querySelectorAll('#reservation-form [required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                showError(field, 'This field is required');
            } else {
                clearError(field);
            }
        });

        // Additional specific validations
        const emailField = document.getElementById('email');
        if (emailField && !isValidEmail(emailField.value)) {
            isValid = false;
            showError(emailField, 'Please enter a valid email address');
        }

        const phoneField = document.getElementById('phone');
        if (phoneField && !isValidPhone(phoneField.value)) {
            isValid = false;
            showError(phoneField, 'Please enter a valid phone number');
        }

        return isValid;
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function isValidPhone(phone) {
        return /^\+?[\d\s-]{10,}$/.test(phone);
    }

    function showError(field, message) {
        clearError(field);
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        field.parentNode.appendChild(errorElement);
        field.classList.add('error-input');
    }

    function clearError(field) {
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
        field.classList.remove('error-input');
    }

    function submitForm() {
        // In a real application, you would send this data to a server
        // For now, we'll just simulate a submission
        const formData = new FormData(reservationForm);
        const reservationDetails = Object.fromEntries(formData);

        // Simulate an API call
        setTimeout(() => {
            alert('Reservation submitted successfully!\n\nDetails:\n' + JSON.stringify(reservationDetails, null, 2));
            reservationForm.reset();
        }, 1000);

        // Show loading indicator
        const submitButton = reservationForm.querySelector('button[type="submit"]');
        submitButton.textContent = 'Submitting...';
        submitButton.disabled = true;

        // Reset button after simulation
        setTimeout(() => {
            submitButton.textContent = 'Submit Reservation';
            submitButton.disabled = false;
        }, 1000);
    }

    // Dynamic content loading for room descriptions (simulate API call)
    const roomDescriptions = {
        'Luxury Suite': 'Experience unparalleled comfort in our spacious Luxury Suite, featuring a king-size bed, private balcony, and stunning views.',
        'Deluxe Room': 'Our Deluxe Room offers a perfect blend of style and comfort, with modern amenities and a cozy atmosphere.',
        'Family Suite': 'Ideal for families, this suite includes multiple bedrooms, a living area, and all the comforts of home.'
    };

    const roomCards = document.querySelectorAll('.room-card');
    roomCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('h3').textContent;
            const description = roomDescriptions[title] || 'Description not available';
            showRoomDetails(title, description);
        });
    });

    // Animated scroll-to-top button
    const scrollTopButton = document.createElement('button');
    scrollTopButton.textContent = '↑';
    scrollTopButton.className = 'scroll-top-button';
    document.body.appendChild(scrollTopButton);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopButton.classList.add('show');
        } else {
            scrollTopButton.classList.remove('show');
        }
    });

    scrollTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Lazy loading for images
    const lazyImages = document.querySelectorAll('img[data-src]');
    const lazyLoadImage = (image) => {
        image.src = image.dataset.src;
        image.addEventListener('load', () => {
            image.removeAttribute('data-src');
        });
    };

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    lazyLoadImage(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        lazyImages.forEach(lazyLoadImage);
    }

    // Add a simple animation to the hero section
    const heroContent = document.querySelector('.hero h1');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(20px)';
        setTimeout(() => {
            heroContent.style.transition = 'opacity 0.5s, transform 0.5s';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const reviewForm = document.getElementById('review-form');
    const reviewsContainer = document.getElementById('reviews-container');

    reviewForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const rating = document.querySelector('input[name="stars"]:checked').value;
        const comment = document.getElementById('review-text').value;

        if (rating && comment) {
            const newReview = document.createElement('div');
            newReview.className = 'review';

            const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);
            newReview.innerHTML = `
                <div class="stars">${stars}</div>
                <p class="comment">${comment}</p>
                <p class="author">— Anonymous Guest</p>
            `;

            reviewsContainer.appendChild(newReview);
            reviewForm.reset();
        }
    });
});



// Add this to your existing DOMContentLoaded event listener
const hamburgerMenu = document.getElementById('hamburger-menu');
const navLinks = document.querySelector('.nav-links');

hamburgerMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburgerMenu.classList.toggle('hamburger-active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('nav')) {
        navLinks.classList.remove('active');
        hamburgerMenu.classList.remove('hamburger-active');
    }
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburgerMenu.classList.remove('hamburger-active');
    });
});





// === ADD TO app.js ===

// Performance optimization - Debounced scroll handler
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

// Enhanced room filtering system
function initializeRoomFilter() {
    const filterContainer = document.getElementById('room-filters');
    if (!filterContainer) return;

    filterContainer.addEventListener('change', (e) => {
        const rooms = document.querySelectorAll('.room-card');
        const selectedPrice = document.getElementById('price-filter').value;
        const selectedType = document.getElementById('type-filter').value;

        rooms.forEach(room => {
            const price = room.dataset.price;
            const type = room.dataset.type;
            const showByPrice = selectedPrice === 'all' || price <= selectedPrice;
            const showByType = selectedType === 'all' || type === selectedType;
            room.style.display = showByPrice && showByType ? 'block' : 'none';
        });
    });
}

// Room availability checker
function checkRoomAvailability(roomId, startDate, endDate) {
    // In production, this would call your backend API
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                available: true,
                price: 199.99,
                totalNights: 3
            });
        }, 500);
    });
}

// Enhanced form validation
function enhancedFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Clear previous errors
            form.querySelectorAll('.error-message').forEach(err => err.remove());
            
            let isValid = true;
            
            // Enhanced email validation
            const emailInput = form.querySelector('input[type="email"]');
            if (emailInput && !isValidEmail(emailInput.value)) {
                showFieldError(emailInput, 'Please enter a valid email address');
                isValid = false;
            }
            
            // Phone validation
            const phoneInput = form.querySelector('input[type="tel"]');
            if (phoneInput && !isValidPhone(phoneInput.value)) {
                showFieldError(phoneInput, 'Please enter a valid phone number');
                isValid = false;
            }
            
            // Date validation for bookings
            const dateInputs = form.querySelectorAll('input[type="date"]');
            dateInputs.forEach(input => {
                const selectedDate = new Date(input.value);
                const today = new Date();
                if (selectedDate < today) {
                    showFieldError(input, 'Please select a future date');
                    isValid = false;
                }
            });
            
            if (isValid) {
                // Show loading state
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.disabled = true;
                submitBtn.textContent = 'Processing...';
                
                try {
                    // Simulate API call
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    showSuccessMessage(form, 'Successfully submitted!');
                    form.reset();
                } catch (error) {
                    showErrorMessage(form, 'Something went wrong. Please try again.');
                } finally {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                }
            }
        });
    });
}

// Add to the DOMContentLoaded event listener:
document.addEventListener('DOMContentLoaded', () => {
    initializeRoomFilter();
    enhancedFormValidation();
    
    // Initialize tooltips
    const tooltips = document.querySelectorAll('[data-tooltip]');
    tooltips.forEach(element => {
        new Tooltip(element);
    });
    
    // Initialize lazy loading
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
});



// Add these functions to your existing app.js

// Chatbot functionality
function initializeChatbot() {
    const chatTrigger = document.getElementById('chat-trigger');
    const chatbot = document.getElementById('chatbot');
    const closeChat = document.getElementById('close-chat');
    const sendMessage = document.getElementById('send-message');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chatbot-messages');

    const responses = {
        'booking': 'To make a booking, please click the "Book Now" button or call us at +233 555-555-555.',
        'location': 'We are located near St. Paul\'s Catholic Parish. You can find directions on our website.',
        'pricing': 'Our room rates start from $100 per night. Special offers are available!',
        'default': 'Thank you for your message. Our staff will get back to you shortly.'
    };

    chatTrigger.addEventListener('click', () => {
        chatbot.style.display = 'flex';
        chatTrigger.style.display = 'none';
    });

    closeChat.addEventListener('click', () => {
        chatbot.style.display = 'none';
        chatTrigger.style.display = 'block';
    });

    function addMessage(message, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = isUser ? 'user-message' : 'bot-message';
        messageDiv.textContent = message;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function getResponse(message) {
        const lowerMessage = message.toLowerCase();
        if (lowerMessage.includes('book') || lowerMessage.includes('reservation')) {
            return responses.booking;
        } else if (lowerMessage.includes('where') || lowerMessage.includes('location')) {
            return responses.location;
        } else if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
            return responses.pricing;
        }
        return responses.default;
    }

    sendMessage.addEventListener('click', () => {
        const message = chatInput.value.trim();
        if (message) {
            addMessage(message, true);
            chatInput.value = '';
            setTimeout(() => {
                addMessage(getResponse(message));
            }, 500);
        }
    });

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage.click();
        }
    });
}

// Enhanced Form Validation
function validateForm(formElement) {
    const fields = formElement.querySelectorAll('input, textarea');
    let isValid = true;

    fields.forEach(field => {
        const value = field.value.trim();
        const validationMessage = field.parentElement.querySelector('.validation-message');
        
        if (validationMessage) {
            validationMessage.remove();
        }

        if (field.required && !value) {
            showValidationMessage(field, 'This field is required');
            isValid = false;
        } else if (field.type === 'email' && !isValidEmail(value)) {
            showValidationMessage(field, 'Please enter a valid email address');
            isValid = false;
        }
    });

    return isValid;
}

function showValidationMessage(field, message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'validation-message';
    messageDiv.textContent = message;
    field.parentElement.appendChild(messageDiv);
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Social Media Sharing
function shareOnSocial(platform) {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('Check out my stay at AMASSAH LODGE!');
    let shareUrl;

    switch(platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
            break;
        case 'instagram':
            // Instagram doesn't support direct sharing via URL
            showToast('Open Instagram app to share your experience');
            return;
    }

    window.open(shareUrl, '_blank', 'width=600,height=400');
}

// Toast Notification System
function showToast(message, duration = 3000) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, duration);
    }, 100);
}

// Blog Post Modal
function showBlogPost(postId) {
    const posts = {
        1: {
            title: 'Top 5 Local Attractions',
            content: `<h2>Must-Visit Places Near AMASSAH LODGE</h2>
                     <p>1. St. Paul's Catholic Parish - A historic landmark...</p>
                     <p>2. Local Market - Experience authentic culture...</p>
                     <p>3. Nature Reserve - Perfect for hiking...</p>
                     <p>4. Cultural Center - Learn about local traditions...</p>
                     <p>5. Sunset Point - Best views in town...</p>`
        },
        2: {
            title: 'New Room Service Menu',
            content: `<h2>Enhanced Dining Experience</h2>
                     <p>We're excited to introduce our new international menu...</p>
                     <p>Featuring local delicacies and global cuisine...</p>
                     <p>24/7 room service available...</p>`
        }
    };

    const modal = document.createElement('div');
    modal.className = 'modal fade-in';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-button" onclick="this.parentElement.parentElement.remove()">&times;</span>
            <h2>${posts[postId].title}</h2>
            ${posts[postId].content}
        </div>
    `;
    document.body.appendChild(modal);
}

// Special Offers Booking Modal
function showBookingModal(offerId) {
    const offers = {
        'weekend-getaway': {
            title: 'Weekend Getaway Special',
            discount: '20% OFF',
            description: 'Book a weekend stay and enjoy 20% off plus complimentary breakfast'
        },
        'stay3pay2': {
            title: 'Stay 3, Pay 2 Deal',
            discount: 'FREE NIGHT',
            description: 'Book 3 nights and get the third night absolutely free'
        }
    };

    const offer = offers[offerId];
    const modal = document.createElement('div');
    modal.className = 'modal fade-in';
    modal.innerHTML = `
        <div class="modal-content booking-modal">
            <span class="close-button" onclick="this.parentElement.parentElement.remove()">&times;</span>
            <h2>${offer.title}</h2>
            <div class="offer-details">
                <span class="discount-badge">${offer.discount}</span>
                <p>${offer.description}</p>
            </div>
            <form id="special-offer-form" onsubmit="handleSpecialOfferBooking(event, '${offerId}')">
                <div class="form-group">
                    <label for="check-in">Check-in Date</label>
                    <input type="date" id="check-in" required>
                </div>
                <div class="form-group">
                    <label for="check-out">Check-out Date</label>
                    <input type="date" id="check-out" required>
                </div>
                <button type="submit" class="submit-button">Book Now</button>
            </form>
        </div>
    `;
    document.body.appendChild(modal);
}

// Analytics Integration
function initializeAnalytics() {
    // Track page views
    logPageView();
    
    // Track user interactions
    document.addEventListener('click', (e) => {
        const target = e.target;
        
        if (target.classList.contains('offer-button')) {
            logEvent('offer_click', {
                offer_id: target.dataset.offerId
            });
        }
        
        if (target.classList.contains('share-btn')) {
            logEvent('social_share', {
                platform: target.dataset.platform
            });
        }
    });

    // Track form submissions
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', (e) => {
            logEvent('form_submission', {
                form_id: form.id
            });
        });
    });
}

function logPageView() {
    // Implementation for page view tracking
    console.log('Page view logged:', window.location.pathname);
}

function logEvent(eventName, params = {}) {
    // Implementation for event tracking
    console.log('Event logged:', eventName, params);
}

// Initialize all features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeChatbot();
    initializeAnalytics();
    
    // Form validation
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (validateForm(form)) {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Form submitted successfully!';
                form.appendChild(successMessage);
                
                // Reset form after delay
                setTimeout(() => {
                    form.reset();
                    successMessage.remove();
                }, 3000);
            }
        });
    });
});






// Add this JavaScript to your app.js
class ChatSupport {
    constructor() {
        this.widget = document.querySelector('.chat-widget');
        this.trigger = document.querySelector('.chat-trigger');
        this.closeBtn = document.querySelector('.chat-close');
        this.input = document.querySelector('.chat-input');
        this.sendBtn = document.querySelector('.chat-send');
        this.messagesContainer = document.querySelector('.chat-messages');
        this.badge = document.querySelector('.chat-badge');
        
        this.isOpen = false;
        this.responses = {
            'hello': 'Hi there! How can I help you today?',
            'rooms': 'We have Luxury Suites, Deluxe Rooms, and Family Suites available. Would you like to know more about any specific room?',
            'booking': 'You can book a room through our website or call us at +233 555-555-555. Would you like me to help you with the booking process?',
            'location': 'We are located near St. Paul\'s Catholic Parish. Would you like directions?',
            'price': 'Our room rates start from $100 per night. We also have special offers available. Would you like to know more?',
            'default': 'Thank you for your message. Let me help you with that. Could you please provide more details?'
        };

        this.initializeEventListeners();
    }

    initializeEventListeners() {
        this.trigger.addEventListener('click', () => this.toggleChat());
        this.closeBtn.addEventListener('click', () => this.toggleChat());
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });

        // Close chat if clicked outside
        document.addEventListener('click', (e) => {
            if (!this.widget.contains(e.target) && 
                !this.trigger.contains(e.target) && 
                this.isOpen) {
                this.toggleChat();
            }
        });
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        this.widget.classList.toggle('active');
        this.trigger.style.display = this.isOpen ? 'none' : 'flex';
        
        if (this.isOpen) {
            this.input.focus();
            this.badge.style.display = 'none';
        }
    }

    sendMessage() {
        const message = this.input.value.trim();
        if (!message) return;

        // Add user message
        this.addMessage(message, true);
        this.input.value = '';

        // Generate and add bot response
        setTimeout(() => {
            const response = this.generateResponse(message);
            this.addMessage(response, false);
        }, 500);
    }

    addMessage(text, isUser) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
        messageDiv.textContent = text;
        
        this.messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();

        // Add typing animation for bot messages
        if (!isUser) {
            messageDiv.style.opacity = '0';
            setTimeout(() => {
                messageDiv.style.opacity = '1';
            }, 100);
        }
    }

    generateResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // Check for keywords in the message
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
            return this.responses.hello;
        } else if (lowerMessage.includes('room') || lowerMessage.includes('suite')) {
            return this.responses.rooms;
        } else if (lowerMessage.includes('book') || lowerMessage.includes('reservation')) {
            return this.responses.booking;
        } else if (lowerMessage.includes('where') || lowerMessage.includes('location')) {
            return this.responses.location;
        } else if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
            return this.responses.price;
        }
        
        return this.responses.default;
    }

    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }
}

// Initialize chat support when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const chatSupport = new ChatSupport();
});