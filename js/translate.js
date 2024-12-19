const setLanguage = (language) => {
    // Fetch the translation file
    fetch(`languages/${language}.json`)
        .then(response => response.json())
        .then(translations => {
            // Update all elements with the data-i18n attribute
            document.querySelectorAll("[data-i18n]").forEach(el => {
                const keys = el.getAttribute("data-i18n").split('.');
                let translation = translations;

                // Navigate through nested keys
                keys.forEach(key => {
                    if (translation[key]) {
                        translation = translation[key];
                    }
                });

                // Apply translations
                if (el.tagName.toLowerCase() === 'input' || el.tagName.toLowerCase() === 'textarea') {
                    el.setAttribute('placeholder', translation);
                } else {
                    el.textContent = translation;
                }
            });
        })
        .catch(error => console.error("Error loading translations:", error));
};

// Function to update button appearance (active state)
const updateButtonText = (language) => {
    const langSwitchBtn = document.getElementById("langSwitchBtn");
    if (langSwitchBtn) {
        langSwitchBtn.textContent = language === "en" ? "FR" : "EN"; // Toggle button text
    }
};

// Initialize language on page load
document.addEventListener("DOMContentLoaded", () => {
    const storedLanguage = localStorage.getItem('language') || 'fr'; // Default to 'fr'
    setLanguage(storedLanguage);
    updateButtonText(storedLanguage);
});

// Language switcher button
document.getElementById("langSwitchBtn")?.addEventListener("click", () => {
    const currentLang = localStorage.getItem('language') || 'fr';
    const newLang = currentLang === "en" ? "fr" : "en";

    localStorage.setItem('language', newLang); // Save the selected language
    setLanguage(newLang); // Apply translations
    updateButtonText(newLang); // Update button text
});
