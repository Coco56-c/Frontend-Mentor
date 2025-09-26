document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("emailform");
  const emailInput = document.getElementById("email");
  const errorMessage = document.getElementById("error-message");
  const errorIcon = document.getElementById("error-icon");

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();

    if (!isValidEmail(email)) {
      emailInput.classList.add("error");
      errorMessage.textContent = "Please provide a valid email";
      errorIcon.style.display = "block";
    } else {
      emailInput.classList.remove("error");
      errorMessage.textContent = "";
      errorIcon.style.display = "none";
      alert("Thank you! You'll be notified.");
      form.reset();
    }
  });

  emailInput.addEventListener("input", () => {
    if (emailInput.classList.contains("error")) {
      emailInput.classList.remove("error");
      errorMessage.textContent = "";
      errorIcon.style.display = "none";
    }
  });
});