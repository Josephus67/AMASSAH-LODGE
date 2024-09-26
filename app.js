
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Reservation form validation
    const reservationForm = document.getElementById('reservation-form');
    reservationForm.addEventListener('submit', function (e) {
        e.preventDefault();
        let isValid = true;

        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const dateInput = document.getElementById('date');

        // Clear previous errors
        clearErrors();

        if (!nameInput.value.trim()) {
            showError('name-error', 'Name is required');
            isValid = false;
        }

        if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
            showError('email-error', 'Valid email is required');
            isValid = false;
        }

        if (!dateInput.value) {
            showError('date-error', 'Please select a date');
            isValid = false;
        }

        if (isValid) {
            alert('Reservation submitted successfully!');
            reservationForm.reset();
        }
    });

    function isValidEmail(email) {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return re.test(String(email).toLowerCase());
    }

    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }

    function clearErrors() {
        document.querySelectorAll('.error').forEach(error => {
            error.style.display = 'none';
        });
    }

    // Car details modal
    window.showCarDetails = function (title, description) {
        const modal = document.getElementById('car-modal');
        const carTitle = document.getElementById('car-title');
        const carDescription = document.getElementById('car-description');

        carTitle.textContent = title;
        carDescription.textContent = description;

        modal.style.display = 'flex';
    };

    window.closeCarDetails = function () {
        const modal = document.getElementById('car-modal');
        modal.style.display = 'none';
    };
});
