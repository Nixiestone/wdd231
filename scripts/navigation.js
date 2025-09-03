const hamburger = document.querySelector("#hamburger");
const navMenu = document.querySelector("nav ul");

hamburger.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  hamburger.classList.toggle("open");
  hamburger.setAttribute("aria-expanded", isOpen);
});