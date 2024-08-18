function loadHTML(id, file) {
  return fetch(file)
    .then((response) => response.text())
    .then((data) => (document.getElementById(id).innerHTML = data))
    .catch((error) => console.log("Error:", error, id));
}

// Array of promises for each section
const sections = [
  loadHTML("sidebar", "./sections/sidebar/sidebar.html"),
  loadHTML("about", "./sections/about/about.html"),
  loadHTML("service", "./sections/about/service.html"),
  loadHTML("testimonials", "./sections/about/testimonials.html"),
  loadHTML("testimonials-modal", "./sections/about/testimonials-modal.html"),
  loadHTML("education", "./sections/resume/education.html"),
  loadHTML("experience", "./sections/resume/experience.html"),
  loadHTML("skills", "./sections/resume/skills.html"),
  loadHTML("portfolio", "./sections/portfolio/portfolio.html"),
  loadHTML("map", "./sections/contact/map.html"),
  loadHTML("contact-form", "./sections/contact/contact-form.html"),
];

// Function to load skills from the JSON file
function loadSkillsFromJSON() {
  fetch("./assets/json/skills.json")
    .then((response) => response.json())
    .then((skills) => {
      const skillsList = document.getElementById("skills-list");
      skills.forEach((skill) => {
        const skillItem = document.createElement("li");
        skillItem.className = "skills-item";

        skillItem.innerHTML = `
          <div class="title-wrapper">
            <h5 class="h5">${skill.name}</h5>
            <data value="${skill.value}">${skill.value}%</data>
          </div>
          <div class="skill-progress-bg">
            <div class="skill-progress-fill" style="width: ${skill.value}%"></div>
          </div>
        `;

        skillsList.appendChild(skillItem);
      });
    })
    .catch((error) => console.error("Error loading skills:", error));
}

// Wait until all sections are loaded before running script.js
Promise.all(sections).then(() => {
  // Call the function to load skills
  loadSkillsFromJSON();
  const script = document.createElement("script");
  script.src = "./assets/js/script.js";
  document.body.appendChild(script);
});
