function submitContactForm(event) {
    event.preventDefault();
    
    var form = document.getElementById('contactForm');
    var formData = new FormData(form);

    // Field Validation
    var name = document.getElementById('name').value.trim();
    var email = document.getElementById('email').value.trim();
    var phone = document.getElementById('phone').value.trim();
    var message = document.getElementById('message').value.trim();

    // Get translations from localStorage or directly from the setLanguage function
    const currentLang = localStorage.getItem('language') || 'fr';
    let translations = {};

    fetch(`languages/${currentLang}.json`)
        .then(response => response.json())
        .then(data => {
            translations = data; // Store translations from the loaded JSON file

            // Check if fields are empty
            if (!name || !email || !phone || !message) {
                Swal.fire({
                    icon: 'error',
                    title: translations.error,
                    text: translations.fillFields
                });
                return;
            }

            // Email Regex Validation
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                Swal.fire({
                    icon: 'error',
                    title: translations.error,
                    text: translations.invalidEmail
                });
                return;
            }

            // Submit Form
            fetch('https://formspree.io/f/xdkoqgrv', {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            })
            .then(response => {
                if (response.ok) {
                    Swal.fire({
                        icon: 'success',
                        title: translations.messageSent,
                        text: translations.messageSuccess,
                        showConfirmButton: false,
                        timer: 2000
                    });
                    setTimeout(() => form.reset(), 2000);
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: translations.error,
                        text: translations.tryAgain
                    });
                }
            })
            .catch(() => {
                Swal.fire({
                    icon: 'error',
                    title: translations.error,
                    text: translations.networkError
                });
            });
        })
        .catch(error => console.error("Error loading translations:", error));
}
