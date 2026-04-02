// scripts/course.js

const courses = [
  { code: "WDD 130", name: "Web Fundamentals", credits: 3, completed: true },
  {
    code: "WDD 131",
    name: "Dynamic Web Fundamentals",
    credits: 3,
    completed: true,
  },
  {
    code: "WDD 230",
    name: "Web Frontend Development I",
    credits: 3,
    completed: true,
  },
  {
    code: "WDD 330",
    name: "Web Frontend Development II",
    credits: 3,
    completed: false,
  },
  {
    code: "WDD 430",
    name: "Web Full-Stack Development",
    credits: 3,
    completed: false,
  },
  {
    code: "CSE 121b",
    name: "JavaScript Language",
    credits: 3,
    completed: true,
  },
  {
    code: "CSE 210",
    name: "Programming with Classes",
    credits: 3,
    completed: false,
  },
  { code: "CSE 222a", name: "Data Structures", credits: 3, completed: false },
  {
    code: "CSE 341",
    name: "Web Backend Development",
    credits: 3,
    completed: false,
  },
];

const courseListContainer = document.querySelector(".course-list");
const creditCount = document.querySelector("#creditCount");
const filterButtons = document.querySelectorAll(".filters button");

// 🧠 Render filtered courses and update total credits using reduce
function renderCourses(filteredCourses) {
  courseListContainer.innerHTML = "";

  filteredCourses.forEach((course) => {
    const div = document.createElement("div");
    div.className = `course ${course.completed ? "completed" : "light"}`;
    div.innerHTML = `
      <strong>${course.code}</strong><br>
      ${course.name}<br>
      Credits: ${course.credits}
    `;
    courseListContainer.appendChild(div);
  });

  const totalCredits = filteredCourses.reduce(
    (sum, course) => sum + course.credits,
    0
  );
  creditCount.textContent = `Total Credits: ${totalCredits}`;
}

// 🗂️ Filter courses by subject area
function filterCourses(filter) {
  if (filter === "WDD") {
    return courses.filter((course) => course.code.startsWith("WDD"));
  } else if (filter === "CSE") {
    return courses.filter((course) => course.code.startsWith("CSE"));
  } else {
    return courses;
  }
}

// 🖱️ Add event listeners to filter buttons
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;
    localStorage.setItem("selectedFilter", selectedFilter);
    updateUI(selectedFilter);
  });
});

// ✅ Highlight active filter button
function updateFilterButtonStyles(activeFilter) {
  filterButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.filter === activeFilter);
  });
}

// 🎯 Main function to apply filter and render courses
function updateUI(filter) {
  const filteredCourses = filterCourses(filter);
  renderCourses(filteredCourses);
  updateFilterButtonStyles(filter);
}

// ⏪ Load last used filter from localStorage
const savedFilter = localStorage.getItem("selectedFilter") || "all";
updateUI(savedFilter);
