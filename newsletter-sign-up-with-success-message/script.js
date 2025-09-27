document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form");
  const emailInput = document.getElementById("email");
  const errorMessage = document.querySelector(".error-message");
  const mainCard = document.querySelector(".main-card");
  const subCard = document.querySelector(".sub-card");
  const emailUserSpan = document.querySelector(".email-user");
  const dismissBtn = document.querySelector(".dismiss");

  // Cacher la carte de succès et le message d'erreur au début
  subCard.style.display = "none";
  errorMessage.style.display = "none";

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      errorMessage.style.display = "block";
      emailInput.classList.add("invalid");
    } else {
      errorMessage.style.display = "none";
      emailInput.classList.remove("invalid");

      mainCard.style.display = "none";
      subCard.style.display = "flex";
      emailUserSpan.textContent = email;
    }
  });

  dismissBtn.addEventListener("click", function () {
    emailInput.value = "";
    emailInput.classList.remove("invalid");
    errorMessage.style.display = "none";

    subCard.style.display = "none";
    mainCard.style.display = "flex";
  });

  emailInput.addEventListener("input", () => {
    errorMessage.style.display = "none";
    emailInput.classList.remove("invalid");
  });
});
