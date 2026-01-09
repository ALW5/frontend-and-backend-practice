document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const submitStatus = document.getElementById('submit-status');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        if (validateForm()) {
            showStatus('Сообщение отправлено!Спасибо за ваше сообщение.', 'success');
            form.reset();
        } else {
            showStatus('Пожалуйста, заполните всеобязательные поля правильно.', 'error');
        }
    });

    form.addEventListener('input', function(event) {
        validateField(event.target);
    });

    function validateField(field) {
        const errorElement = document.getElementById(field.id + '-error');
        if (!errorElement) return;

        errorElement.textContent = '';

        if (field.hasAttribute('required') && !field.value.trim()) {
            errorElement.textContent = 'Это поле обязательно';
            return;
        }

        if (field.type === 'email' && field.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                errorElement.textContent = 'Введите корректный email';
            }
        }

        if (field.id === 'message' && field.value.trim().length < 10) {
            errorElement.textContent = 'Сообщение должно быть не короче 10 символов';
        }
    }

    function validateForm() {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');

        requiredFields.forEach(field => {
            validateField(field);
            const errorElement = document.getElementById(field.id + '-error');
            if (errorElement && errorElement.textContent) {
                isValid = false;
            }
        });

        return isValid;
    }

    function showStatus(message, type) {
        submitStatus.textContent = message;
        submitStatus.className = `status-message ${type}`;
        
        setTimeout(() => {
            submitStatus.textContent = '';
            submitStatus.className = 'status-message';
        }, 5000);
    }
});