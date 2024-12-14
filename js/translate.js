const langSwitchBtn = document.getElementById("langSwitchBtn");

    langSwitchBtn.addEventListener("click", () => {
        const currentText = langSwitchBtn.textContent.trim();
        langSwitchBtn.textContent = currentText === "EN" ? "FR" : "EN";
    });