document.querySelector("button").addEventListener("click", function () {
  const dayInput = document.getElementById("day");
  const monthInput = document.getElementById("month");
  const yearInput = document.getElementById("years");

  const resultYear = document.querySelector(".resultat p:nth-child(1) span");
  const resultMonth = document.querySelector(".resultat p:nth-child(2) span");
  const resultDay = document.querySelector(".resultat p:nth-child(3) span");

  const today = new Date();
  const day = parseInt(dayInput.value, 10);
  const month = parseInt(monthInput.value, 10);
  const year = parseInt(yearInput.value, 10);

  document.querySelectorAll(".inputtype span").forEach((span) => {
    span.style.display = "none";
  });

  let hasError = false;

  if (!dayInput.value) {
    showError(dayInput, 0);
    hasError = true;
  }
  if (!monthInput.value) {
    showError(monthInput, 0);
    hasError = true;
  }
  if (!yearInput.value) {
    showError(yearInput, 0);
    hasError = true;
  }

  if (dayInput.value && (day < 1 || day > 31)) {
    showError(dayInput, 1);
    hasError = true;
  }

  if (monthInput.value && (month < 1 || month > 12)) {
    showError(monthInput, 1);
    hasError = true;
  }

  if (yearInput.value && year > today.getFullYear()) {
    showError(yearInput, 1);
    hasError = true;
  }

  const birthDate = new Date(year, month - 1, day);
  const isValidDate =
    birthDate.getFullYear() === year &&
    birthDate.getMonth() === month - 1 &&
    birthDate.getDate() === day;

  if (
    dayInput.value &&
    monthInput.value &&
    yearInput.value &&
    !hasError &&
    !isValidDate
  ) {
    showError(dayInput, 2);
    hasError = true;
  }

  if (hasError) {
    resultYear.textContent = "--";
    resultMonth.textContent = "--";
    resultDay.textContent = "--";
    return;
  }

  let ageYears = today.getFullYear() - year;
  let ageMonths = today.getMonth() - (month - 1);
  let ageDays = today.getDate() - day;

  if (ageDays < 0) {
    ageMonths -= 1;
    const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    ageDays += lastMonth.getDate();
  }

  if (ageMonths < 0) {
    ageYears -= 1;
    ageMonths += 12;
  }
  resultYear.textContent = ageYears;
  resultMonth.textContent = ageMonths;
  resultDay.textContent = ageDays;
});

function showError(inputElement, spanIndex) {
  const spans = inputElement.parentElement.querySelectorAll("span");
  spans[spanIndex].style.display = "block";
}
