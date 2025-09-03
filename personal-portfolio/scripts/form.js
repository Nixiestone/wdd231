// scripts/form.js
document.getElementById("contactForm").addEventListener("submit", function (e) {
  const theme = document.querySelector('input[name="theme"]:checked').value;
  localStorage.setItem("preferredTheme", theme);
});
// scripts/form.js
const menuBtn = document.getElementById("menu-toggle");
const navMenu = document.getElementById("menu");

menuBtn?.addEventListener("click", () => {
  navMenu.classList.toggle("hidden");
});

document.getElementById("year").textContent = new Date().getFullYear();

// Optional: Enhance client-side validation
document.querySelector("form")?.addEventListener("submit", (e) => {
  if (!e.target.checkValidity()) {
    e.preventDefault();
    alert("Please fill out all required fields correctly.");
  }
});
const params = new URLSearchParams(window.location.search);
document.getElementById("name").textContent = params.get("fullname");
document.getElementById("email").textContent = params.get("email");
document.getElementById("subject").textContent = params.get("subject");
document.getElementById("message").textContent = params.get("message");