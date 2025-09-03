const directory = document.getElementById("directory");
const gridView = document.getElementById("gridView");
const listView = document.getElementById("listView");

// Maps numeric membership level to readable text
function getMembershipLevel(level) {
  switch (level) {
    case 1:
      return "Bronze";
    case 2:
      return "Silver";
    case 3:
      return "Gold";
    default:
      return "Standard";
  }
}

// Load business data from local JSON
async function loadDirectory() {
  try {
    directory.innerHTML = '<div class="loading">Loading businesses...</div>';
    const res = await fetch("data/members.json");
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    displayBusinesses(data.companies);
  } catch (err) {
    console.error("Failed to load business listings:", err);
    directory.innerHTML = `
      <div class="error" role="alert">
        <p>⚠️ Unable to load business listings.</p>
        <button id="retry-btn" aria-label="Try loading again">Try Again</button>
      </div>
    `;
    document
      .getElementById("retry-btn")
      .addEventListener("click", loadDirectory);
  }
}

// Create and display member cards
function displayBusinesses(businesses) {
  directory.innerHTML = "";

  if (!Array.isArray(businesses) || businesses.length === 0) {
    directory.innerHTML = '<p class="no-results">No businesses found.</p>';
    return;
  }

  businesses.forEach((biz) => {
    const card = document.createElement("article");
    card.className = "member-card";
    card.tabIndex = 0;
    card.setAttribute("aria-label", `Business listing for ${biz.name}`);

    const logo = biz.logo || "images/default-logo.png";
    const website = biz.website
      ? `<a href="${biz.website}" target="_blank" rel="noopener">Visit Website</a>`
      : "No website available";

    card.innerHTML = `
      <img 
        src="${logo}" 
        alt="${biz.name} logo" 
        loading="lazy" 
        width="150" 
        height="100" 
        onerror="this.src='images/default-logo.png'; this.alt='Default logo';"
      >
      <div class="card-content">
        <h3>${biz.name}</h3>
        <p class="address">${biz.address || "No address provided"}</p>
        <p class="phone">
          ${
            biz.phone
              ? `<a href="tel:${biz.phone}" aria-label="Call ${biz.name}">${biz.phone}</a>`
              : "No phone number"
          }
        </p>
        <p class="website">${website}</p>
        <p class="membership">${getMembershipLevel(
          biz.membershipLevel
        )} Member</p>
        <p class="description">${
          biz.description || "No description available."
        }</p>
      </div>
    `;

    directory.appendChild(card);
  });
}

// Set view mode and save preference
function setViewMode(mode) {
  directory.classList.remove("grid", "list");
  directory.classList.add(mode);
  localStorage.setItem("viewMode", mode);
  gridView.classList.toggle("active", mode === "grid");
  listView.classList.toggle("active", mode === "list");
}

// Get saved mode from localStorage
function initViewMode() {
  const savedMode = localStorage.getItem("viewMode") || "grid";
  setViewMode(savedMode);
}

// Event listeners
gridView.addEventListener("click", () => setViewMode("grid"));
listView.addEventListener("click", () => setViewMode("list"));

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
  initViewMode();
  loadDirectory();
});