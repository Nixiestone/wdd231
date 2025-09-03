document.addEventListener("DOMContentLoaded", fetchWeather); // Run after page loads

async function fetchWeather() {
  const latitude = 6.34; // Benin City
  const longitude = 5.62;
  const timezone = "Africa/Lagos";

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=${timezone}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Response not OK");

    const data = await response.json();

    const weatherInfo = document.getElementById("weather-info");
    const current = data.current_weather;
    weatherInfo.innerHTML = `
      🌡️ ${current.temperature}°C | Weather code: ${current.weathercode}
    `;

    displayForecast(data.daily);
  } catch (error) {
    console.error("Weather fetch error:", error);
    const weatherInfo = document.getElementById("weather-info");
    if (weatherInfo) {
      weatherInfo.textContent = "Unable to fetch weather data.";
    }
  }
}

function displayForecast(daily) {
  const forecastContainer = document.getElementById("forecast");
  if (!forecastContainer) return;

  forecastContainer.innerHTML = "<h3>3-Day Forecast</h3>";

  for (let i = 0; i < 3; i++) {
    const date = new Date(daily.time[i]).toLocaleDateString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
    });

    const card = document.createElement("div");
    card.classList.add("forecast-day");
    card.innerHTML = `
      <strong>${date}</strong><br>
      High: ${daily.temperature_2m_max[i]}°C<br>
      Low: ${daily.temperature_2m_min[i]}°C<br>
      Code: ${daily.weathercode[i]}
    `;
    forecastContainer.appendChild(card);
  }
}

async function fetchWeather() {
  console.log("Fetching weather data...");
  const latitude = 6.34;
  const longitude = 5.62;
  const timezone = "Africa/Lagos";

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=${timezone}`;
  console.log("Using URL:", url);

  try {
    const response = await fetch(url);
    console.log("Response status:", response.status);

    if (!response.ok)
      throw new Error(`Response not OK, status: ${response.status}`);

    const data = await response.json();
    console.log("Weather data received:", data);

    const weatherInfo = document.getElementById("weather-info");
    const current = data.current_weather;
    weatherInfo.innerHTML = `
      🌡️ ${current.temperature}°C | Weather code: ${current.weathercode}
    `;

    displayForecast(data.daily);
  } catch (error) {
    console.error("Weather fetch error:", error);
    const weatherInfo = document.getElementById("weather-info");
    if (weatherInfo) {
      weatherInfo.textContent = "Unable to fetch weather data.";
    }
  }
}
const menuToggle = document.getElementById("menu-toggle");
const nav = document.querySelector("nav");

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("open");
});
 