// =======================
// GitHub Activity (Contributions + Graph)
// =======================
const GITHUB_USERNAME = "tranhohoangvu";

function setGitHubActivityImages() {
  const contribImg = document.getElementById("github-contrib-img");
  const activityImg = document.getElementById("github-activity-img");
  if (!contribImg || !activityImg) return;

  const isDark = document.documentElement.classList.contains("dark");

  // ✅ Contributions: load local svg do GitHub Actions sinh ra
  const v = Date.now(); // bust cache
  contribImg.src = isDark
    ? `assets/github-contrib-dark.svg?v=${v}`
    : `assets/github-contrib-light.svg?v=${v}`;

  // Activity Graph: giữ theme đang dùng
  const graphTheme = isDark ? "github-dark" : "github-compact";
  activityImg.src =
    `https://github-readme-activity-graph.vercel.app/graph?username=${GITHUB_USERNAME}&theme=${graphTheme}&hide_border=true`;
}

// =======================
// Navbar Theme + Scroll Background FIX
// (Fix: dark mode scroll -> navbar KHÔNG bị trắng)
// =======================
const navbar = document.getElementById("navbar");
const html = document.documentElement;

const NAV_SCROLL_Y = 50;

// Những class nền có thể xuất hiện (để remove sạch)
const NAV_BG_CLASSES = [
  "bg-white", "bg-white/80", "bg-white/90",
  "bg-gray-800", "bg-gray-800/80", "bg-gray-800/90",
  "bg-gray-900", "bg-gray-900/80", "bg-gray-900/90",
  "text-gray-900", "text-gray-100",
  "backdrop-blur", "backdrop-blur-sm", "backdrop-blur-md", "backdrop-blur-lg",
  "shadow-lg", "shadow-xl", "shadow-md", "shadow-sm", "shadow-none",
  "scrolled" // nếu CSS cũ đang dùng scrolled thì remove luôn
];

function updateNavbarStyle() {
  if (!navbar) return;

  const isDark = html.classList.contains("dark");
  const scrolled = window.scrollY > NAV_SCROLL_Y;

  // Remove sạch các class nền cũ + scrolled cũ
  navbar.classList.remove(...NAV_BG_CLASSES);

  // Luôn đảm bảo màu chữ theo theme (đỡ bị “mù chữ”)
  navbar.classList.add(isDark ? "text-gray-100" : "text-gray-900");

  // Set nền theo scroll + theme
  if (scrolled) {
    navbar.classList.add(
      isDark ? "bg-gray-900/90" : "bg-white/90",
      "backdrop-blur-md",
      "shadow-lg"
    );
  } else {
    navbar.classList.add(
      isDark ? "bg-gray-800" : "bg-white",
      "shadow-lg"
    );
  }
}

// =======================
// Dark Mode Toggle
// =======================
const themeToggle = document.getElementById('theme-toggle');
const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');

function applyTheme(isDark) {
  if (isDark) {
    html.classList.add('dark');
    if (sunIcon) sunIcon.classList.remove('hidden');
    if (moonIcon) moonIcon.classList.add('hidden');
    localStorage.setItem('theme', 'dark');
  } else {
    html.classList.remove('dark');
    if (sunIcon) sunIcon.classList.add('hidden');
    if (moonIcon) moonIcon.classList.remove('hidden');
    localStorage.setItem('theme', 'light');
  }

  // cập nhật 2 biểu đồ GitHub theo theme
  setGitHubActivityImages();

  // ✅ cập nhật navbar theo theme + scroll hiện tại
  updateNavbarStyle();
}

const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('theme');
applyTheme(savedTheme === 'dark' || (!savedTheme && prefersDark));

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    applyTheme(!html.classList.contains('dark'));
  });
}

// =======================
// Mobile Menu Toggle
// =======================
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuToggle && mobileMenu) {
  mobileMenuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
  });
}

// =======================
// Smooth Scroll for Nav Links
// =======================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (!href || href === '#') return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });

    if (mobileMenu) mobileMenu.classList.remove('active');
  });
});

// =======================
// Scroll Animation
// =======================
const sections = document.querySelectorAll('.section-hidden');

if (sections.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('section-visible');

        // Animate progress bars
        const progressBars = entry.target.querySelectorAll('.animate-progress');
        progressBars.forEach(bar => {
          bar.style.width = `${bar.dataset.progress}%`;
        });

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  sections.forEach(section => observer.observe(section));
}

// =======================
// Navbar Scroll Effect (UPDATED)
// =======================
if (navbar) {
  // chạy ngay 1 lần
  updateNavbarStyle();

  // tối ưu: dùng rAF để tránh giật
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(() => {
        updateNavbarStyle();
        ticking = false;
      });
    }
  }, { passive: true });
}

// =======================
// Back to Top Button
// =======================
const backToTop = document.getElementById('back-to-top');
if (backToTop) {
  window.addEventListener('scroll', () => {
    backToTop.style.display = (window.scrollY > 300) ? 'block' : 'none';
  }, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// =======================
// Form Submission Feedback
// =======================
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

if (contactForm && formMessage) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    formMessage.classList.remove('hidden');
    formMessage.classList.remove('text-red-600', 'dark:text-red-400');
    formMessage.classList.add('text-green-600', 'dark:text-green-400');
    formMessage.textContent = 'Đang gửi tin nhắn...';

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
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        formMessage.textContent = 'Tin nhắn đã được gửi thành công!';
        contactForm.reset();
        setTimeout(() => formMessage.classList.add('hidden'), 3000);
      } else {
        formMessage.classList.remove('text-green-600', 'dark:text-green-400');
        formMessage.classList.add('text-red-600', 'dark:text-red-400');
        formMessage.textContent = 'Có lỗi xảy ra, vui lòng thử lại!';
      }
    } catch (error) {
      formMessage.classList.remove('text-green-600', 'dark:text-green-400');
      formMessage.classList.add('text-red-600', 'dark:text-red-400');
      formMessage.textContent = 'Lỗi kết nối, vui lòng kiểm tra lại!';
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
  particlesJS('particles-js', {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: '#ffffff' },
      shape: { type: 'circle' },
      opacity: { value: 0.5, random: true },
      size: { value: 3, random: true },
      line_linked: { enable: false },
      move: { enable: true, speed: 2, direction: 'none', random: true }
    },
    interactivity: {
      detect_on: 'canvas',
      events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' } },
      modes: { repulse: { distance: 100 }, push: { particles_nb: 4 } }
    },
    retina_detect: true
  });
}
