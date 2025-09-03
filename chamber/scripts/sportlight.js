async function loadSpotlightMembers() {
  try {
    const response = await fetch("featured-members.json");
    if (!response.ok) throw new Error("Failed to fetch members data");
    const members = await response.json();

    // Filter gold and silver members
    const goldSilverMembers = members.filter(
      (m) => m.membership === "gold" || m.membership === "silver"
    );

    // Shuffle array randomly
    const shuffled = goldSilverMembers.sort(() => 0.5 - Math.random());

    // Take up to 3 members
    const spotlightMembers = shuffled.slice(0, 3);

    // Use correct container id
    const spotlightContainer = document.getElementById("spotlight-container");

    // Clear old content except the h2 heading and paragraph (optional: keep or clear)
    spotlightContainer.innerHTML = "";

    spotlightMembers.forEach((member) => {
      const memberDiv = document.createElement("div");
      memberDiv.classList.add("spotlight-member");
      memberDiv.innerHTML = `
        <img src="${member.image}" alt="${member.name}" width="150" />
        <h3>${member.name}</h3>
        <p>Membership Level: ${member.membership}</p>
        <p>${member.description}</p>
      `;
      spotlightContainer.appendChild(memberDiv);
    });
  } catch (error) {
    console.error("Error loading spotlight members:", error);
  }
}

document.addEventListener("DOMContentLoaded", loadSpotlightMembers);
// spotlight.js

export async function fetchAndDisplaySpotlights() {
  const spotlightContainer = document.querySelector("#spotlight-container");

  try {
    const response = await fetch("data/spotlight.json");
    if (!response.ok) throw new Error("Network response not OK");
    const businesses = await response.json();

    const spotlights = businesses.filter((biz) =>
      ["Gold", "Silver"].includes(biz.membership)
    );

    spotlightContainer.innerHTML = spotlights
      .map(
        (biz) => `
      <section class="spotlight">
        <img src="${biz.logo}" alt="Logo of ${biz.name}" loading="lazy" />
        <h3>${biz.name}</h3>
        <p>${biz.description}</p>
      </section>
    `
      )
      .join("");
  } catch (error) {
    spotlightContainer.textContent = "Failed to load spotlight ads.";
    console.error(error);
  }
}