// Display the last modified date
const lastModified = document.getElementById("last-modified");
if (lastModified) {
  lastModified.textContent = document.lastModified;
}

// Dark mode toggle functionality
const toggleBtn = document.getElementById("mode-toggle");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    toggleBtn.textContent = "☀️";
  } else {
    toggleBtn.textContent = "🌙";
  }
});