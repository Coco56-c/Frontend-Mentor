document.getElementById('form').addEventListener('submit', function(e) {
    e.preventDefault();
    let hasError = false;

    
    const fields = [
        { id: 'first-name', errorId: 'first-name-error' },
        { id: 'last-name', errorId: 'last-name-error' },
        { id: 'email', errorId: 'email-error' },
        { id: 'password', errorId: 'password-error' }
    ];

    fields.forEach(field => {
        const input = document.getElementById(field.id);
        const errorSpan = document.getElementById(field.errorId);

        
        if (field.id === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!input.value.trim() || !emailRegex.test(input.value.trim())) {
                input.classList.add('error');
                errorSpan.classList.add('active');
                hasError = true;
            } else {
                input.classList.remove('error');
                errorSpan.classList.remove('active');
            }
        } else {
            if (!input.value.trim()) {
                input.classList.add('error');
                errorSpan.classList.add('active');
                hasError = true;
            } else {
                input.classList.remove('error');
                errorSpan.classList.remove('active');
            }
        }
    });

    if (!hasError) {
        alert("Form submitted successfully!");
        this.reset();
    }
});