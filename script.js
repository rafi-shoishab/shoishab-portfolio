// -------------------- Smooth Scroll --------------------
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    const target = document.querySelector(targetId);

    if (!target) return;

    e.preventDefault();
    const headerOffset = 76;
    const offsetPosition = target.offsetTop - headerOffset;

    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
  });
});

// -------------------- Active Nav Link on Scroll --------------------
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    if (window.pageYOffset >= sectionTop) currentSection = section.getAttribute("id");
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (currentSection && link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
});

// -------------------- Rotating Typing Effect --------------------
const words = [
  "Full Stack Web Developer",
  "Researcher",
  "Data Science & Machine Learning Enthusiast",
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

const rotateText = document.getElementById("rotateText");

function typeEffect() {
  if (!rotateText) return;

  const currentWord = words[wordIndex];

  if (!deleting) {
    rotateText.textContent = currentWord.substring(0, charIndex++);
    if (charIndex > currentWord.length) {
      deleting = true;
      setTimeout(typeEffect, 900);
      return;
    }
  } else {
    rotateText.textContent = currentWord.substring(0, charIndex--);
    if (charIndex === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }

  setTimeout(typeEffect, deleting ? 45 : 90);
}

// -------------------- Project Filters --------------------
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
const noProjects = document.getElementById("noProjects");

function setActiveFilter(btn) {
  filterButtons.forEach((b) => {
    b.classList.remove("active");
    b.setAttribute("aria-selected", "false");
  });
  btn.classList.add("active");
  btn.setAttribute("aria-selected", "true");
}

function applyFilter(filter) {
  let visibleCount = 0;

  projectCards.forEach((card) => {
    const category = card.getAttribute("data-category");
    const show = filter === "all" || category === filter;

    if (show) {
      card.classList.remove("is-hidden");
      visibleCount++;
    } else {
      card.classList.add("is-hidden");
    }
  });

  if (noProjects) noProjects.hidden = visibleCount !== 0;
}

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const filter = btn.getAttribute("data-filter");
    setActiveFilter(btn);
    applyFilter(filter);
  });
});

// -------------------- DOM Ready --------------------
document.addEventListener("DOMContentLoaded", () => {
  typeEffect();

  // View My Work → scroll to projects
  const viewBtn = document.getElementById("viewWork");
  viewBtn?.addEventListener("click", () => {
    const projects = document.getElementById("projects");
    if (!projects) return;
    window.scrollTo({ top: projects.offsetTop - 76, behavior: "smooth" });
  });

  // default filter
  applyFilter("all");
});
