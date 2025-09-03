// --- Navigation functionality ---

function setupMenuToggle() {
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");

  if (menuToggle && menu) {
    menuToggle.addEventListener("click", () => {
      const isShown = menu.classList.toggle("show");
      menuToggle.textContent = isShown ? "✖" : "☰";
      menuToggle.setAttribute("aria-expanded", isShown);
    });
  }
}

function setupActiveNavLink() {
  const navLinks = document.querySelectorAll("#nav-list a");
  const currentPage = window.location.pathname.split("/").pop();

  navLinks.forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });
}

// --- Date functionality ---

function updateFooterDate() {
  const yearSpan = document.getElementById("current-year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}

function updateLastModified() {
  const lastModifiedSpan = document.getElementById("last-modified");
  if (lastModifiedSpan) {
    const modified = new Date(document.lastModified);
    if (!isNaN(modified)) {
      lastModifiedSpan.textContent = `Last updated: ${modified.toLocaleString()}`;
    } else {
      lastModifiedSpan.textContent = "Last updated: Unknown";
    }
  }
}

function updateTimestamp() {
  const timestampField = document.getElementById("timestamp");
  if (timestampField) {
    timestampField.value = new Date().toISOString();
  }
}

// --- Weather forecast display ---
function displayForecastOpenMeteo(data) {
  const forecastContainer = document.getElementById("forecast");
  if (!forecastContainer || !data.daily) return;

  const { time, temperature_2m_max, temperature_2m_min, weathercode } =
    data.daily;

  forecastContainer.innerHTML = "<h3>3-Day Forecast</h3>";

  for (let i = 0; i < 3; i++) {
    const date = new Date(time[i]).toLocaleDateString(undefined, {
      weekday: "long",
      month: "short",
      day: "numeric",
    });

    const card = document.createElement("div");
    card.classList.add("forecast-day");
    card.innerHTML = `
      <strong>${date}</strong><br>
      🌡️ ${temperature_2m_min[i]}–${temperature_2m_max[i]}°C<br>
      ${mapWeatherCode(weathercode[i])}
    `;
    forecastContainer.appendChild(card);
  }
}

function mapWeatherCode(code) {
  const mapping = {
    0: "☀️ Clear sky",
    1: "🌤️ Mainly clear",
    2: "⛅ Partly cloudy",
    3: "☁️ Overcast",
    45: "🌫️ Fog",
    51: "🌦️ Light drizzle",
    61: "🌧️ Rain",
    71: "🌨️ Snow",
    95: "⛈️ Thunderstorm",
  };
  return mapping[code] || "🌡️ Unknown";
}

// --- Banner ---

function showMeetAndGreetBanner() {
  const today = new Date().getDay(); // Sunday=0, Monday=1, ...
  if (today >= 1 && today <= 3) {
    // Monday to Wednesday
    // Check if banner already exists to avoid duplicates
    if (document.getElementById("meet-greet-banner")) return;

    const banner = document.createElement("div");
    banner.id = "meet-greet-banner";
    banner.innerHTML = `
      <p>
        Join us for our <strong>Chamber of Commerce meet & greet</strong> on 
        <strong>Wednesday at 7:00 p.m.</strong>
      </p>
      <button aria-label="Close banner" id="close-banner-btn">❌</button>
    `;
    document.body.prepend(banner);

    // Add event listener for close button
    document
      .getElementById("close-banner-btn")
      .addEventListener("click", () => {
        banner.style.display = "none";
        // Optional: store dismissal in localStorage to keep it hidden on reload
        localStorage.setItem("meetGreetDismissed", "true");
      });

    // Check if user dismissed previously
    if (localStorage.getItem("meetGreetDismissed") === "true") {
      banner.style.display = "none";
    }
  }
}

// --- Members directory ---

async function fetchMembers() {
  const response = await fetch("data/members.json");
  return await response.json();
}

function displayMembers(members) {
  const directory = document.querySelector("#directory");
  if (!directory) return;

  directory.innerHTML = "";
  members.forEach((member) => {
    const card = document.createElement("div");
    card.classList.add("member");
    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name}">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank" rel="noopener">Visit Website</a>
      <p class="membership">${member.membership} Member</p>
    `;
    directory.appendChild(card);
  });
}

async function loadDirectoryMembers() {
  const directory = document.querySelector("#directory");
  const gridViewBtn = document.querySelector("#gridView");
  const listViewBtn = document.querySelector("#listView");
  if (!directory) return;

  const members = await fetchMembers();
  displayMembers(members);

  if (gridViewBtn && listViewBtn) {
    gridViewBtn.addEventListener("click", () => {
      directory.classList.add("grid");
      directory.classList.remove("list");
    });

    listViewBtn.addEventListener("click", () => {
      directory.classList.add("list");
      directory.classList.remove("grid");
    });
  }
}

// --- Password confirmation ---

function handlePasswordConfirmation() {
  const password = document.getElementById("password");
  const confirm = document.getElementById("confirm-password");
  if (password && confirm) {
    confirm.addEventListener("input", () => {
      confirm.setCustomValidity(
        password.value !== confirm.value ? "Passwords do not match." : ""
      );
    });
  }
}

// --- Rating input display ---

function handleRatingInput() {
  const ratingInput = document.getElementById("rating");
  const ratingValue = document.getElementById("rating-value");
  if (ratingInput && ratingValue) {
    ratingInput.addEventListener("input", () => {
      ratingValue.textContent = ratingInput.value;
    });
  }
}

// --- Spotlight ads ---

async function displaySpotlightAds() {
  try {
    const response = await fetch("data/featured-members.json");
    const data = await response.json();

    // Filter for only gold and silver members
    const goldSilver = data.filter(
      (member) =>
        member.membership.toLowerCase() === "gold" ||
        member.membership.toLowerCase() === "silver"
    );

    // Randomly shuffle and pick 2 or 3
    const selected = getRandomSubset(
      goldSilver,
      2 + Math.floor(Math.random() * 2)
    );
    function getRandomSubset(array, count) {
      const shuffled = array.slice().sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    }

    const spotlightContainer = document.querySelector("#spotlight-container");

    if (!spotlightContainer) {
      console.error("No #spotlight-container element found in HTML.");
      return;
    }

    spotlightContainer.innerHTML = ""; // Clear existing content

    selected.forEach((member) => {
      const card = document.createElement("section");
      card.classList.add("spotlight-card");

      card.innerHTML = `
        <img src="${member.image}" alt="Logo of ${member.name}" loading="lazy">
        <h4>${member.name}</h4>
        <p>${member.description}</p>
      `;

      spotlightContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Spotlight failed:", error);
  }
}

function getRandomSubset(array, count) {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function getRandomSubset(array, count) {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function getRandomSubset(array, count) {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

document.addEventListener("DOMContentLoaded", () => {
  showMeetAndGreetBanner();
});

async function fetchAndDisplayOpenMeteoForecast() {
  const latitude = 6.335; // Benin City
  const longitude = 5.6037;
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    displayForecastOpenMeteo(data);
  } catch (error) {
    console.error("Forecast fetch failed:", error);
  }
}

function displayForecastOpenMeteo(data) {
  const forecastContainer = document.getElementById("forecast");
  if (!forecastContainer || !data.daily) return;

  const { time, temperature_2m_max, temperature_2m_min, weathercode } =
    data.daily;

  forecastContainer.innerHTML = "<h3>3-Day Forecast</h3>";

  for (let i = 0; i < 3; i++) {
    const date = new Date(time[i]).toLocaleDateString(undefined, {
      weekday: "long",
      month: "short",
      day: "numeric",
    });

    const card = document.createElement("div");
    card.classList.add("forecast-day");
    card.innerHTML = `
      <strong>${date}</strong><br>
      🌡️ ${temperature_2m_min[i]}–${temperature_2m_max[i]}°C<br>
      ${mapWeatherCode(weathercode[i])}
    `;
    forecastContainer.appendChild(card);
  }
}
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("timestamp").value = new Date().toISOString();
});
const menuBtn = document.getElementById("menu-toggle");
const navMenu = document.getElementById("menu");

menuBtn.addEventListener("click", () => {
  navMenu.classList.toggle("open");
});

function mapWeatherCode(code) {
  const mapping = {
    0: "☀️ Clear sky",
    1: "🌤️ Mainly clear",
    2: "⛅ Partly cloudy",
    3: "☁️ Overcast",
    45: "🌫️ Fog",
    51: "🌦️ Light drizzle",
    61: "🌧️ Rain",
    71: "🌨️ Snow",
    95: "⛈️ Thunderstorm",
  };
  return mapping[code] || "🌡️ Unknown";
}

// --- Initialization on DOMContentLoaded ---

document.addEventListener("DOMContentLoaded", () => {
  showMeetAndGreetBanner();
  displaySpotlightAds(); // ✅ Load spotlight
  updateFooterDate();
  updateLastModified();
  updateTimestamp();
  setupMenuToggle();
  setupActiveNavLink();
  handlePasswordConfirmation();
  handleRatingInput();
  loadDirectoryMembers();
  fetchAndDisplayOpenMeteoForecast();
});