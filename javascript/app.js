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