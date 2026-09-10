// Mobile nav toggle
const toggle = document.querySelector(".nav__toggle");
const menu = document.querySelector("#nav-menu");

if (toggle && menu) {
  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  // Close the menu after choosing a link
  menu.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

// Current year in the footer
const yearEl = document.querySelector("#year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
