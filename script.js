// Initialize AOS library
AOS.init();

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form validation
const form = document.getElementById('contact-form');
form.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');

    if (validateForm(name, email, message)) {
        form.submit();
    }
});

function validateForm(name, email, message) {
    let valid = true;

    if (name.value.trim() === '') {
        showError(name, 'Name is required');
        valid = false;
    } else {
        clearError(name);
    }

    if (email.value.trim() === '') {
        showError(email, 'Email is required');
        valid = false;
    } else if (!isValidEmail(email.value.trim())) {
        showError(email, 'Email is not valid');
        valid = false;
    } else {
        clearError(email);
    }

    if (message.value.trim() === '') {
        showError(message, 'Message is required');
        valid = false;
    } else {
        clearError(message);
    }

    return valid;
}

function showError(element, message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    if (!element.nextElementSibling) {
        element.parentElement.appendChild(errorElement);
    }
}

function clearError(element) {
    if (element.nextElementSibling) {
        element.parentElement.removeChild(element.nextElementSibling);
    }
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// Hide error messages on input focus
document.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('focus', function() {
        clearError(this);
    });
});
