const form = document.getElementById('form');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    let hasError = false;

    // First name
    const firstName = document.getElementById('first-name');
    const firstNameError = document.getElementById('first-name-error');

    if (!firstName.value.trim()) {
        firstName.classList.add('error');
        firstNameError.classList.add('active');
        hasError = true;
    } else {
        firstName.classList.remove('error');
        firstNameError.classList.remove('active');
    }


    // Last name
    const lastName = document.getElementById('last-name');
    const lastNameError = document.getElementById('last-name-error');

    if (!lastName.value.trim()) {
        lastName.classList.add('error');
        lastNameError.classList.add('active');
        hasError = true;
    } else {
        lastName.classList.remove('error');
        lastNameError.classList.remove('active');
    }


    // Email
    const email = document.getElementById('email');
    const emailError = document.getElementById('email-error');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
        email.classList.add('error');
        emailError.classList.add('active');
        hasError = true;
    } else {
        email.classList.remove('error');
        emailError.classList.remove('active');
    }


    // Query type
    const queryError = document.getElementById('query-error');
    const querySelected = document.querySelector(
        'input[name="choix"]:checked'
    );

    if (!querySelected) {
        queryError.classList.add('active');
        hasError = true;
    } else {
        queryError.classList.remove('active');
    }


    // Message
    const message = document.getElementById('message');
    const messageError = document.getElementById('message-error');

    if (!message.value.trim()) {
        message.classList.add('error');
        messageError.classList.add('active');
        hasError = true;
    } else {
        message.classList.remove('error');
        messageError.classList.remove('active');
    }


    // Consent
    const consent = document.getElementById('consent-contacted');
    const consentError = document.getElementById('consent-error');

    if (!consent.checked) {
        consentError.classList.add('active');
        hasError = true;
    } else {
        consentError.classList.remove('active');
    }


    // Everything is valid
    if (!hasError) {
        document.querySelector('.messagesent').style.display = 'flex';

        form.reset();
    }
});
