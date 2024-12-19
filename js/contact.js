function submitContactForm(event) {
    event.preventDefault();
    
    var form = document.getElementById('contactForm');
    var formData = new FormData(form);

    // Field Validation
    var name = document.getElementById('name').value.trim();
    var email = document.getElementById('email').value.trim();
    var phone = document.getElementById('phone').value.trim();
    var message = document.getElementById('message').value.trim();

    if (!name || !email || !phone || !message) {
        Swal.fire({
            icon: 'error',
            title: 'Erreur!',
            text: 'Veuillez remplir tous les champs obligatoires.'
        });
        return;
    }

    // Email Regex Validation
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        Swal.fire({
            icon: 'error',
            title: 'Erreur!',
            text: 'Veuillez saisir une adresse e-mail valide.'
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
                title: 'Message envoyé!',
                text: 'Votre message a été envoyé avec succès.',
                showConfirmButton: false,
                timer: 2000
            });
            setTimeout(() => form.reset(), 2000);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Erreur!',
                text: 'Une erreur s\'est produite. Veuillez réessayer.'
            });
        }
    })
    .catch(() => {
        Swal.fire({
            icon: 'error',
            title: 'Erreur réseau!',
            text: 'Veuillez vérifier votre connexion et réessayer.'
        });
    });
}