// Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');
const html = document.documentElement;

if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  html.classList.add('dark');
  sunIcon.classList.remove('hidden');
  moonIcon.classList.add('hidden');
} else {
  html.classList.remove('dark');
  sunIcon.classList.add('hidden');
  moonIcon.classList.remove('hidden');
}

themeToggle.addEventListener('click', () => {
  html.classList.toggle('dark');
  if (html.classList.contains('dark')) {
    localStorage.setItem('theme', 'dark');
    sunIcon.classList.remove('hidden');
    moonIcon.classList.add('hidden');
  } else {
    localStorage.setItem('theme', 'light');
    sunIcon.classList.add('hidden');
    moonIcon.classList.remove('hidden');
  }
});

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
});

// Smooth Scroll for Nav Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
    mobileMenu.classList.remove('active');
  });
});

// Scroll Animation
const sections = document.querySelectorAll('.section-hidden');
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

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Back to Top Button
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTop.style.display = 'block';
  } else {
    backToTop.style.display = 'none';
  }
});
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// GitHub API for Commits
async function fetchGitHubCommits() {
  const commitsContainer = document.getElementById('github-commits');
  const loading = document.getElementById('github-loading');
  try {
    const response = await fetch('https://api.github.com/repos/tranhohoangvu/your-repo/commits?per_page=5');
    const commits = await response.json();
    commitsContainer.innerHTML = '';
    loading.style.display = 'none';
    if (commits.length === 0) {
      commitsContainer.innerHTML = '<p class="text-gray-600 dark:text-gray-300">Không có commit nào để hiển thị.</p>';
      return;
    }
    commits.forEach((commit, index) => {
      const commitElement = document.createElement('div');
      commitElement.className = `mb-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm animate-slide-in-${index % 2 === 0 ? 'left' : 'right'}`;
      commitElement.innerHTML = `
        <p class="text-gray-900 dark:text-gray-100 font-semibold">${commit.commit.message}</p>
        <p class="text-gray-600 dark:text-gray-300 text-sm">Commit bởi ${commit.commit.author.name} vào ${new Date(commit.commit.author.date).toLocaleDateString()}</p>
        <a href="${commit.html_url}" target="_blank" class="text-indigo-600 dark:text-indigo-400 hover:underline text-sm">Xem commit</a>
      `;
      commitsContainer.appendChild(commitElement);
    });
  } catch (error) {
    loading.style.display = 'none';
    commitsContainer.innerHTML = '<p class="text-gray-600 dark:text-gray-300">Lỗi khi tải commit từ GitHub.</p>';
  }
}

fetchGitHubCommits();

// Form Submission Feedback
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  formMessage.classList.remove('hidden');
  formMessage.classList.add('text-green-600', 'dark:text-green-400');
  formMessage.textContent = 'Đang gửi tin nhắn...';
  const submitButton = contactForm.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  submitButton.innerHTML = '<span class="relative z-10">Đang gửi...</span><span class="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-30 animate-pulse"></span>';

  try {
    const response = await fetch(contactForm.action, {
      method: contactForm.method,
      body: new FormData(contactForm),
      headers: { 'Accept': 'application/json' }
    });
    if (response.ok) {
      formMessage.textContent = 'Tin nhắn đã được gửi thành công!';
      contactForm.reset();
      setTimeout(() => {
        formMessage.classList.add('hidden');
      }, 3000);
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
    submitButton.disabled = false;
    submitButton.innerHTML = '<span class="relative z-10">Gửi tin nhắn</span><span class="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></span>';
  }
});

// Particle.js Initialization
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