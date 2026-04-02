const hamburger = document.querySelector("#hamburger");
const navMenu = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("open");

  const isOpen = navMenu.classList.contains("open");
  hamburger.setAttribute("aria-expanded", isOpen);
});
