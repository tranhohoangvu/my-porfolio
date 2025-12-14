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
// Navbar background
// =======================
const navbar = document.getElementById("navbar");
const html = document.documentElement;

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
    navbar.classList.add(isDark ? "bg-gray-800" : "bg-white");
  }
}

// =======================
// Theme (dark/light) - recommended default + still static
// localStorage.theme -> else OS preference
// only persist when user toggles
// =======================
const themeToggle = document.getElementById("theme-toggle");
const themeToggleMobile = document.getElementById("theme-toggle-mobile");
const sunIcon = document.getElementById("sun-icon");
const moonIcon = document.getElementById("moon-icon");

function setThemeIcons(isDark) {
  if (sunIcon) sunIcon.classList.toggle("hidden", !isDark);
  if (moonIcon) moonIcon.classList.toggle("hidden", isDark);
}

function applyTheme(theme, persist = true) {
  const isDark = theme === "dark";
  html.classList.toggle("dark", isDark);
  setThemeIcons(isDark);

  // update dependent UI
  setGitHubActivityImages();
  updateNavbarBackground();

  if (persist) localStorage.setItem("theme", theme);
}

function getDefaultTheme() {
  const saved = localStorage.getItem("theme");
  if (saved === "dark" || saved === "light") return saved;

  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  return prefersDark ? "dark" : "light";
}

// Init theme: do NOT save on first load
applyTheme(getDefaultTheme(), false);

// Toggle => save
function toggleTheme() {
  const next = html.classList.contains("dark") ? "light" : "dark";
  applyTheme(next, true);
}

if (themeToggle) themeToggle.addEventListener("click", toggleTheme);
if (themeToggleMobile) themeToggleMobile.addEventListener("click", toggleTheme);

// Follow OS theme changes only when user hasn't chosen a theme
const themeMQ = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)");
if (themeMQ && themeMQ.addEventListener) {
  themeMQ.addEventListener("change", (e) => {
    const saved = localStorage.getItem("theme");
    if (saved) return; // user already chose
    applyTheme(e.matches ? "dark" : "light", false);
  });
}

// =======================
// i18n (VI / EN) - recommended default + still static friendly
// localStorage.lang -> else navigator.language (vi* => vi, else en)
// only persist when user toggles
// =======================
const I18N = {
  vi: {
    meta_title: "Trần Hồ Hoàng Vũ - Portfolio",
    meta_description:
      "Portfolio cá nhân của Trần Hồ Hoàng Vũ, sinh viên ngành Computer Science, showcase các dự án và kỹ năng lập trình.",
    og_title: "Trần Hồ Hoàng Vũ - Portfolio",
    og_description:
      "Portfolio cá nhân của Trần Hồ Hoàng Vũ, sinh viên ngành Computer Science, showcase các dự án và kỹ năng lập trình.",

    nav_home: "Trang chủ",
    nav_about: "Giới thiệu",
    nav_projects: "Dự án",
    nav_skills: "Kỹ năng",
    nav_github: "GitHub",
    nav_contact: "Liên hệ",

    hero_name: "Trần Hồ Hoàng Vũ",
    hero_subtitle: "Sinh viên ngành Computer Science | Chuyên về phát triển phần mềm & AI",
    hero_btn_projects: "Xem dự án",
    hero_btn_cv: "Tải CV",

    about_title: "Giới thiệu",
    about_text:
      "Tôi tên là Trần Hồ Hoàng Vũ, hiện là sinh viên năm 4 ngành Computer Science tại Trường Đại học Tôn Đức Thắng. Với đam mê mãnh liệt trong lập trình và công nghệ, tôi đã tham gia nhiều dự án liên quan đến phát triển web, trí tuệ nhân tạo, và ứng dụng di động. Mục tiêu của tôi là xây dựng các giải pháp công nghệ sáng tạo, mang lại giá trị thực tiễn. Tôi luôn học hỏi và phát triển kỹ năng để trở thành một kỹ sư phần mềm xuất sắc.",

    projects_title: "Dự án",
    projects_view_all: "Xem tất cả trên GitHub →",
    view_on_github: "Xem trên GitHub →",

    p1_meta: "Sep 2025 – Dec 2025 • Dự án môn học",
    p1_desc:
      "Nền tảng thương mại điện tử full-stack, tập trung backend: REST API, xác thực người dùng và luồng giỏ hàng/đơn hàng.",

    p2_meta: "Sep 2024 – Dec 2024 • Dự án môn học",
    p2_desc: "Phần mềm quản lý kho tòa nhà: theo dõi tồn kho, nhập/xuất và báo cáo vận hành.",
    p2_tag1: "Tồn kho",
    p2_tag2: "Nhập/Xuất",
    p2_tag3: "Báo cáo",
    p2_tag4: "Tài liệu",

    p3_meta: "Jan 2024 – May 2024 • Dự án môn học",
    p3_desc: "Hệ thống POS nội bộ cho cửa hàng điện thoại: bán hàng/checkout, quản lý kho và xuất hóa đơn PDF.",
    p3_tag4: "Xuất hóa đơn",

    skills_title: "Kỹ năng",
    skills_lang_front: "Ngôn ngữ & Frontend",
    skills_backend_db: "Backend & Database",
    skills_devops: "DevOps / Tools",
    skills_note_auth: "(Auth/Phân quyền: mức cơ bản)",

    github_title: "Hoạt động GitHub",
    github_contrib: "Contributions",
    github_contrib_tip: "Contributions được tạo tự động từ GitHub GraphQL (Actions) và cập nhật định kỳ.",
    github_activity: "Activity Graph",
    github_activity_tip: "Biểu đồ số lượng commit theo thời gian (tổng hợp từ dữ liệu GitHub).",
    github_profile_link: "Xem GitHub profile →",

    contact_title: "Liên hệ",
    contact_intro: "Hãy liên hệ với tôi qua email hoặc các nền tảng sau:",
    contact_email: "Email:",
    contact_github: "GitHub:",
    contact_linkedin: "LinkedIn:",
    form_name: "Họ tên: *",
    form_email: "Email: *",
    form_message: "Tin nhắn: *",
    form_send_btn: "Gửi tin nhắn",

    form_sending: "Đang gửi tin nhắn...",
    form_success: "Tin nhắn đã được gửi thành công!",
    form_error: "Có lỗi xảy ra, vui lòng thử lại!",
    form_network_error: "Lỗi kết nối, vui lòng kiểm tra lại!",
    form_btn_sending: "Đang gửi...",

    footer_tagline: "Tạo giá trị qua mã nguồn - Trần Hồ Hoàng Vũ",
    footer_rights: "© 2025 Trần Hồ Hoàng Vũ. All rights reserved.",
  },

  en: {
    meta_title: "Tran Ho Hoang Vu - Portfolio",
    meta_description:
      "Personal portfolio of Tran Ho Hoang Vu, a Computer Science student, showcasing projects and technical skills.",
    og_title: "Tran Ho Hoang Vu - Portfolio",
    og_description:
      "Personal portfolio of Tran Ho Hoang Vu, a Computer Science student, showcasing projects and technical skills.",

    nav_home: "Home",
    nav_about: "About",
    nav_projects: "Projects",
    nav_skills: "Skills",
    nav_github: "GitHub",
    nav_contact: "Contact",

    hero_name: "Tran Ho Hoang Vu",
    hero_subtitle: "Computer Science Student | Software Engineering & AI",
    hero_btn_projects: "View projects",
    hero_btn_cv: "Download CV",

    about_title: "About",
    about_text:
      "My name is Tran Ho Hoang Vu. I am a 4th-year Computer Science student at Ton Duc Thang University. Passionate about programming and technology, I have worked on multiple projects in web development, AI, and mobile applications. My goal is to build practical, innovative solutions and continuously grow into a strong software engineer.",

    projects_title: "Projects",
    projects_view_all: "View all on GitHub →",
    view_on_github: "View on GitHub →",

    p1_meta: "Sep 2025 – Dec 2025 • Course project",
    p1_desc:
      "Full-stack e-commerce platform with backend focus: REST APIs, user authentication, and cart/order flows.",

    p2_meta: "Sep 2024 – Dec 2024 • Course project",
    p2_desc: "Building warehouse management: inventory tracking, inbound/outbound, and operational reporting.",
    p2_tag1: "Inventory",
    p2_tag2: "Inbound/Outbound",
    p2_tag3: "Reporting",
    p2_tag4: "Documentation",

    p3_meta: "Jan 2024 – May 2024 • Course project",
    p3_desc: "Internal POS for phone store: checkout, inventory management, and PDF invoice generation.",
    p3_tag4: "Invoice PDF",

    skills_title: "Skills",
    skills_lang_front: "Languages & Frontend",
    skills_backend_db: "Backend & Database",
    skills_devops: "DevOps / Tools",
    skills_note_auth: "(Auth/Authorization: basic)",

    github_title: "GitHub Activity",
    github_contrib: "Contributions",
    github_contrib_tip: "Contributions are generated automatically via GitHub GraphQL (Actions) and updated periodically.",
    github_activity: "Activity Graph",
    github_activity_tip: "Commit activity over time (aggregated from GitHub data).",
    github_profile_link: "View GitHub profile →",

    contact_title: "Contact",
    contact_intro: "Feel free to reach out via email or these platforms:",
    contact_email: "Email:",
    contact_github: "GitHub:",
    contact_linkedin: "LinkedIn:",
    form_name: "Full name: *",
    form_email: "Email: *",
    form_message: "Message: *",
    form_send_btn: "Send message",

    form_sending: "Sending message...",
    form_success: "Your message has been sent successfully!",
    form_error: "Something went wrong. Please try again!",
    form_network_error: "Network error. Please check your connection!",
    form_btn_sending: "Sending...",

    footer_tagline: "Building value through code - Tran Ho Hoang Vu",
    footer_rights: "© 2025 Tran Ho Hoang Vu. All rights reserved.",
  },
};

function getDefaultLang() {
  const saved = localStorage.getItem("lang");
  if (saved === "vi" || saved === "en") return saved;

  const navLang = (navigator.language || "").toLowerCase();
  return navLang.startsWith("vi") ? "vi" : "en";
}

let currentLang = getDefaultLang();

function t(key) {
  const pack = I18N[currentLang] || I18N.vi;
  return pack[key] ?? key;
}

function applyLanguage(lang, persist = true) {
  currentLang = (lang === "vi") ? "vi" : "en";

  // update html lang
  document.documentElement.setAttribute("lang", currentLang);

  // update texts
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const value = t(key);
    if (value == null) return;
    el.textContent = value;

    // restart typing animation for hero name (optional)
    const heroNameEl = document.querySelector('[data-i18n="hero_name"]');
    if (heroNameEl) {
      heroNameEl.classList.remove("animate-type");
      // force reflow
      void heroNameEl.offsetWidth;
      heroNameEl.classList.add("animate-type");
    }
  });

  // meta + title
  document.title = t("meta_title");

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute("content", t("meta_description"));

  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute("content", t("og_title"));

  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute("content", t("og_description"));

  // update language toggle label (show the "other" language)
  const desktopBtn = document.getElementById("lang-toggle");
  const mobileBtn = document.getElementById("lang-toggle-mobile");
  const nextLabel = currentLang === "vi" ? "EN" : "VI";
  if (desktopBtn) desktopBtn.textContent = nextLabel;
  if (mobileBtn) mobileBtn.textContent = nextLabel;

  if (persist) localStorage.setItem("lang", currentLang);
}

function toggleLanguage() {
  applyLanguage(currentLang === "vi" ? "en" : "vi", true);
}

// Init language: do NOT save on first load
applyLanguage(currentLang, false);

// Events
const langToggle = document.getElementById("lang-toggle");
const langToggleMobile = document.getElementById("lang-toggle-mobile");

if (langToggle) langToggle.addEventListener("click", toggleLanguage);
if (langToggleMobile) langToggleMobile.addEventListener("click", toggleLanguage);

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
// Navbar Scroll Effect
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
// Form Submission Feedback (localized)
// =======================
const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

if (contactForm && formMessage) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    formMessage.classList.remove("hidden");
    formMessage.classList.remove("text-red-600", "dark:text-red-400");
    formMessage.classList.add("text-green-600", "dark:text-green-400");
    formMessage.textContent = t("form_sending");

    const submitButton = contactForm.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.innerHTML =
        `<span class="relative z-10">${t("form_btn_sending")}</span>
         <span class="absolute inset-0 bg-linear-to-r from-indigo-600 to-purple-600 opacity-30 animate-pulse"></span>`;
    }

    try {
      const response = await fetch(contactForm.action, {
        method: contactForm.method,
        body: new FormData(contactForm),
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        formMessage.textContent = t("form_success");
        contactForm.reset();
        setTimeout(() => formMessage.classList.add("hidden"), 3000);
      } else {
        formMessage.classList.remove("text-green-600", "dark:text-green-400");
        formMessage.classList.add("text-red-600", "dark:text-red-400");
        formMessage.textContent = t("form_error");
      }
    } catch (error) {
      formMessage.classList.remove("text-green-600", "dark:text-green-400");
      formMessage.classList.add("text-red-600", "dark:text-red-400");
      formMessage.textContent = t("form_network_error");
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.innerHTML =
          `<span class="relative z-10">${t("form_send_btn")}</span>
           <span class="absolute inset-0 bg-linear-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></span>`;
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

// init navbar state (also ensures correct on load)
updateNavbarBackground();
setGitHubActivityImages();
