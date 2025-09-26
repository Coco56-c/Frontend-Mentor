document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("emailform");
  const emailInput = document.getElementById("email");
  const errorMessage = document.getElementById("error-message");

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();

    if (!isValidEmail(email)) {
      emailInput.classList.add("error");
      errorMessage.textContent = "Please provide a valid email address";
    } else {
      emailInput.classList.remove("error");
      errorMessage.textContent = "";
      // Optionally, show a success message or perform form submission
      alert("Thank you! You'll be notified.");
      form.reset(); // Clear form
    }
  });

  // Remove error style on input
  emailInput.addEventListener("input", () => {
    if (emailInput.classList.contains("error")) {
      emailInput.classList.remove("error");
      errorMessage.textContent = "";
    }
  });
});
