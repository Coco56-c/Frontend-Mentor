document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const allBoxes = document.querySelectorAll(".box");
  const switches = document.querySelectorAll("input[type='checkbox']");
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  const logo = document.getElementById('logo');

  // --- Filtres ---

  function updateBoxStates() {
    allBoxes.forEach((box) => {
      const checkbox = box.querySelector("input[type='checkbox']");
      if (checkbox.checked) {
        box.classList.add("active");
        box.classList.remove("inactive");
      } else {
        box.classList.remove("active");
        box.classList.add("inactive");
      }
    });
  }

  function filterBoxes(filter) {
    updateBoxStates();

    allBoxes.forEach((box) => {
      const checkbox = box.querySelector("input[type='checkbox']");
      const isChecked = checkbox.checked;

      if (filter === "all") {
        box.style.display = "flex";
      } else if (filter === "active") {
        box.style.display = isChecked ? "flex" : "none";
      } else if (filter === "inactive") {
        box.style.display = !isChecked ? "flex" : "none";
      }
    });
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      filterButtons.forEach(btn => btn.classList.remove("selected"));
      button.classList.add("selected");

      filterBoxes(filter);
    });
  });

  switches.forEach((toggle) => {
    toggle.addEventListener("change", () => {
      updateBoxStates();

      const activeFilterBtn = document.querySelector(".filter-btn.selected");
      if (activeFilterBtn) {
        const currentFilter = activeFilterBtn.dataset.filter;
        filterBoxes(currentFilter);
      }
    });
  });

  updateBoxStates();

  // --- Thème clair / sombre ---
  themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('night');

    // Icône lune/soleil
    if (document.body.classList.contains('night')) {
      themeIcon.src = './images/icon-sun.svg';
      themeIcon.alt = 'Mode jour';
      logo.src = './images/logo-night.svg';
    } else {
      themeIcon.src = './images/icon-moon.svg';
      themeIcon.alt = 'Mode nuit';
      logo.src = './images/logo.svg';
    }
  });
});
