// discover.js

document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.querySelector(".gallery");
  const visitMessage = document.getElementById("visit-message");
  const lastModifiedElem = document.getElementById("last-modified");
  const DATA_URL = "data/item.json";

  // --- LOCALSTORAGE VISIT MESSAGE LOGIC ---
  function updateVisitMessage() {
    const now = Date.now();
    const lastVisit = localStorage.getItem("lastVisit");

    if (!lastVisit) {
      // First visit
      visitMessage.textContent =
        "Welcome! Let us know if you have any questions.";
    } else {
      const diffMs = now - Number(lastVisit);
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      if (diffDays < 1) {
        visitMessage.textContent = "Back so soon! Awesome!";
      } else {
        visitMessage.textContent = `You last visited ${diffDays} day${
          diffDays === 1 ? "" : "s"
        } ago.`;
      }
    }
    // Update lastVisit to now
    localStorage.setItem("lastVisit", now.toString());
  }

  // --- SET LAST MODIFIED DATE ---
  function updateLastModified() {
    const lastMod = document.lastModified;
    lastModifiedElem.textContent = lastMod;
  }

  // --- FETCH JSON DATA AND BUILD CARDS ---
  async function fetchItems() {
    try {
      const response = await fetch(DATA_URL);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const items = await response.json();
      buildCards(items);
    } catch (error) {
      gallery.innerHTML = "<p>Sorry, failed to load items of interest.</p>";
      console.error("Failed to fetch items:", error);
    }
  }

  // --- BUILD CARDS ---
  function buildCards(items) {
    gallery.innerHTML = ""; // clear any existing content
    items.forEach((item, index) => {
      const card = document.createElement("article");
      card.className = "card";
      card.setAttribute("tabindex", "0"); // keyboard accessible

      // Title
      const h2 = document.createElement("h2");
      h2.textContent = item.name;

      // Figure and image with lazy loading
      const figure = document.createElement("figure");
      const img = document.createElement("img");
      img.src = item.photo;
      img.alt = `Photo of ${item.name}`;
      img.loading = "lazy"; // lazy loading offscreen images
      img.width = 300;
      img.height = 200;
      figure.appendChild(img);

      // Address
      const address = document.createElement("address");
      address.textContent = item.address;

      // Description
      const p = document.createElement("p");
      p.textContent = item.description;

      // Learn More button
      const btn = document.createElement("button");
      btn.textContent = "Learn More";
      btn.type = "button";
      btn.setAttribute("aria-label", `Learn more about ${item.name}`);
      // Optional: add event to show modal or link elsewhere here
      // For now, just alert with name
      btn.addEventListener("click", () => {
        alert(`More info about ${item.name}:\n\n${item.description}`);
      });

      // Append all elements to card
      card.append(h2, figure, address, p, btn);

      // Append card to gallery
      gallery.appendChild(card);
    });
  }

  // Run all initialization
  updateVisitMessage();
  updateLastModified();
  fetchItems();
});

async function loadItems() {
  try {
    const response = await fetch("data/item.json");
    if (!response.ok) throw new Error("Network response was not ok");

    const items = await response.json();

    itemsContainer.innerHTML = ""; // Clear any existing content

    items.forEach((item) => {
      const itemElement = document.createElement("div");
      itemElement.classList.add("item");

      itemElement.innerHTML = `
        <img src="${item.photo}" alt="${item.name}" loading="lazy" />
        <div class="item-info">
          <h3>${item.name}</h3>
          <p><strong>Address:</strong> ${item.address}</p>
          <p>${item.description}</p>
        </div>
      `;

      itemsContainer.appendChild(itemElement);
    });
  } catch (error) {
    console.error("Failed to load items:", error);
    itemsContainer.innerHTML =
      "<p>Sorry, failed to load items at this time.</p>";
  }
}
 