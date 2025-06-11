document.addEventListener("DOMContentLoaded", () => {
  const toggle_button = document.querySelector(".navbar .toggle");
  const nav_links = document.querySelector(".navbar .nav-links");
  // console.log(nav_links);

  if (toggle_button) {
    toggle_button.addEventListener("click", () => {
      toggle_button.classList.toggle("active");
    });
  }
});
