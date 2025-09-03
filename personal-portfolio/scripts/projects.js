import { formatTools } from "./utils.js";

const projectList = document.getElementById("project-list");
const modal = document.getElementById("projectModal");
const modalContent = document.getElementById("modalContent");
const closeModal = document.getElementById("closeModal");

// Set accessibility attributes
modal.setAttribute("aria-labelledby", "modalTitle");
modalContent.setAttribute("role", "document");

async function loadProjects() {
  try {
    const response = await fetch("./data/projects.json");
    if (!response.ok) throw new Error("Failed to fetch project data");

    const projects = await response.json();

    // Render project cards
    projectList.innerHTML = projects
      .map(
        (project, i) => `
        <div class="card" data-index="${i}">
          <img src="${project.image}" alt="${project.name}" loading="lazy" />
          <h2>${project.name}</h2>
          <p>${project.description}</p>
          <p class="tools">${formatTools(project.tools)}</p>
          <button class="more-info" data-index="${i}">View More</button>
        </div>
      `
      )
      .join("");

    // Add modal trigger listeners
    document.querySelectorAll(".more-info").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");
        const p = projects[index];

        modalContent.innerHTML = `
          <h2 id="modalTitle">${p.name}</h2>
          <p>${p.description}</p>
          <p><strong>Tools:</strong> ${formatTools(p.tools)}</p>
          <a href="${p.link}" target="_blank" rel="noopener">Visit Project</a>
          <button id="closeModalInner" aria-label="Close dialog">Close</button>
        `;

        modal.showModal();

        // Attach close listener to dynamic close button
        document
          .getElementById("closeModalInner")
          .addEventListener("click", () => modal.close());
      });
    });
  } catch (err) {
    projectList.innerHTML = `<p class="error">Error loading projects: ${err.message}</p>`;
  }
}

// External close button (if present outside modalContent)
if (closeModal) {
  closeModal.addEventListener("click", () => modal.close());
}

loadProjects();