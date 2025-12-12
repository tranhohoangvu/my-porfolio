// =======================
// GitHub Activity (Contributions + Graph)
// =======================
const GITHUB_USERNAME = "tranhohoangvu";

function setGitHubActivityImages() {
  const contribImg = document.getElementById("github-contrib-img");
  const activityImg = document.getElementById("github-activity-img");
  if (!contribImg || !activityImg) return;

  const isDark = document.documentElement.classList.contains("dark");
  const v = Date.now(); // bust cache

  // Contributions: local svg do GitHub Actions sinh ra
  contribImg.src = isDark
    ? `assets/github-contrib-dark.svg?v=${v}`
    : `assets/github-contrib-light.svg?v=${v}`;

  // Activity Graph
  const graphTheme = isDark ? "github-dark" : "github-compact";
  activityImg.src =
    `https://github-readme-activity-graph.vercel.app/graph?username=${GITHUB_USERNAME}&theme=${graphTheme}&hide_border=true`;
}

// =======================
// Navbar background (FIX: dark mode scroll không bị trắng)
// =======================
const navbar = document.getElementById("navbar");
const html = document.documentElement;

// NOTE: giữ class ở dạng literal để Tailwind build nhận ra
const NAV_RESET_CLASSES = [
  "bg-white",
  "bg-white/80",
  "bg-white/90",
  "bg-gray-800",
  "bg-gray-900",
  "bg-gray-900/80",
  "bg-gray-900/90",
  "backdrop-blur",
  "backdrop-blur-md",
  "border-b",
  "border-gray-200/60",
  "border-gray-800/60",
];

function updateNavbarBackground() {
  if (!navbar) return;

  const isDark = html.classList.contains("dark");
  const isScrolled = window.scrollY > 50;

  navbar.classList.remove(...NAV_RESET_CLASSES);

  // Bạn có thể chỉnh mức “trong suốt” theo ý thích
  if (isScrolled) {
    if (isDark) {
      navbar.classList.add(
        "bg-gray-900/80",
        "backdrop-blur-md",
        "border-b",
        "border-gray-800/60"
      );
    } else {
      navbar.classList.add(
        "bg-white/80",
        "backdrop-blur-md",
        "border-b",
        "border-gray-200/60"
      );
    }
  } else {
    // Ở đầu trang
    navbar.classList.add(isDark ? "bg-gray-800" : "bg-white");
  }
}

// =======================
// Dark Mode Toggle
// =======================
const themeToggle = document.getElementById("theme-toggle");
const sunIcon = document.getElementById("sun-icon");
const moonIcon = document.getElementById("moon-icon");

function applyTheme(isDark) {
  if (isDark) {
    html.classList.add("dark");
    if (sunIcon) sunIcon.classList.remove("hidden");
    if (moonIcon) moonIcon.classList.add("hidden");
    localStorage.setItem("theme", "dark");
  } else {
    html.classList.remove("dark");
    if (sunIcon) sunIcon.classList.add("hidden");
    if (moonIcon) moonIcon.classList.remove("hidden");
    localStorage.setItem("theme", "light");
  }

  // update UI theo theme
  setGitHubActivityImages();
  updateNavbarBackground();
}

const prefersDark =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

const savedTheme = localStorage.getItem("theme");
applyTheme(savedTheme === "dark" || (!savedTheme && prefersDark));

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    applyTheme(!html.classList.contains("dark"));
  });
}

// =======================
// Mobile Menu Toggle
// =======================
const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

if (mobileMenuToggle && mobileMenu) {
  mobileMenuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
  });
}

// =======================
// Smooth Scroll for Nav Links
// =======================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (!href || href === "#") return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth" });

    if (mobileMenu) mobileMenu.classList.remove("active");
  });
});

// =======================
// Scroll Animation
// =======================
const sections = document.querySelectorAll(".section-hidden");

if (sections.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("section-visible");

          // Animate progress bars
          const progressBars = entry.target.querySelectorAll(".animate-progress");
          progressBars.forEach((bar) => {
            bar.style.width = `${bar.dataset.progress}%`;
          });

          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  sections.forEach((section) => observer.observe(section));
}

// =======================
// Navbar Scroll Effect (đổi sang updateNavbarBackground)
// =======================
window.addEventListener("scroll", () => {
  updateNavbarBackground();
});

// =======================
// Back to Top Button
// =======================
const backToTop = document.getElementById("back-to-top");
if (backToTop) {
  window.addEventListener("scroll", () => {
    backToTop.style.display = window.scrollY > 300 ? "block" : "none";
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// =======================
// Form Submission Feedback
// =======================
const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

if (contactForm && formMessage) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    formMessage.classList.remove("hidden");
    formMessage.classList.remove("text-red-600", "dark:text-red-400");
    formMessage.classList.add("text-green-600", "dark:text-green-400");
    formMessage.textContent = "Đang gửi tin nhắn...";

    const submitButton = contactForm.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.innerHTML =
        '<span class="relative z-10">Đang gửi...</span><span class="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-30 animate-pulse"></span>';
    }

    try {
      const response = await fetch(contactForm.action, {
        method: contactForm.method,
        body: new FormData(contactForm),
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        formMessage.textContent = "Tin nhắn đã được gửi thành công!";
        contactForm.reset();
        setTimeout(() => formMessage.classList.add("hidden"), 3000);
      } else {
        formMessage.classList.remove("text-green-600", "dark:text-green-400");
        formMessage.classList.add("text-red-600", "dark:text-red-400");
        formMessage.textContent = "Có lỗi xảy ra, vui lòng thử lại!";
      }
    } catch (error) {
      formMessage.classList.remove("text-green-600", "dark:text-green-400");
      formMessage.classList.add("text-red-600", "dark:text-red-400");
      formMessage.textContent = "Lỗi kết nối, vui lòng kiểm tra lại!";
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.innerHTML =
          '<span class="relative z-10">Gửi tin nhắn</span><span class="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></span>';
      }
    }
  });
}

// =======================
// Particle.js Initialization
// =======================
if (typeof particlesJS !== "undefined") {
  particlesJS("particles-js", {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: "#ffffff" },
      shape: { type: "circle" },
      opacity: { value: 0.5, random: true },
      size: { value: 3, random: true },
      line_linked: { enable: false },
      move: { enable: true, speed: 2, direction: "none", random: true },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: true, mode: "repulse" },
        onclick: { enable: true, mode: "push" },
      },
      modes: { repulse: { distance: 100 }, push: { particles_nb: 4 } },
    },
    retina_detect: true,
  });
}

// initial navbar state
updateNavbarBackground();
