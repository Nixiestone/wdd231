// Set current year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Toggle and persist dark mode
const darkToggleBtn = document.getElementById("dark-mode-toggle");
const prefersDark = localStorage.getItem("darkMode") === "true";
if (prefersDark) document.body.classList.add("dark-mode");

darkToggleBtn?.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem(
    "darkMode",
    document.body.classList.contains("dark-mode")
  );
});

// Menu toggle with accessibility support
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("menu");
menuToggle?.setAttribute("aria-controls", "menu");
menuToggle?.setAttribute("aria-expanded", "false");

menuToggle?.addEventListener("click", () => {
  const expanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!expanded));
  navMenu.classList.toggle("hidden");
});

// Save and display last visit
const lastVisit = localStorage.getItem("lastVisited");
if (lastVisit && document.getElementById("last-visited")) {
  document.getElementById(
    "last-visited"
  ).textContent = `Last visited: ${lastVisit}`;
}
localStorage.setItem("lastVisited", new Date().toLocaleString());

// Show current date and time
if (document.getElementById("datetime")) {
  document.getElementById(
    "datetime"
  ).textContent = `Current Time: ${new Date().toLocaleString()}`;
}

// Get and display current weather using Open-Meteo API
async function getWeather() {
  const lat = 6.335; // Benin City
  const lon = 5.6037;
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weathercode&timezone=auto`
    );
    const data = await response.json();
    const temp = data.current.temperature_2m;
    if (document.getElementById("weather")) {
      document.getElementById(
        "weather"
      ).textContent = `Current Weather: ${temp}°C`;
    }
  } catch (error) {
    console.error("Weather fetch failed:", error);
  }
}
getWeather();