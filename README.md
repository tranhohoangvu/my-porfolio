# 🌐 My Portfolio — Trần Hồ Hoàng Vũ

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Open-success)](https://tranhohoangvu.github.io/my-portfolio/)

> 🎓 Final-year Computer Science student at Ton Duc Thang University (TDTU)  
> 💼 Personal portfolio showcasing projects, skills, and GitHub activity (and optionally technical blog posts).

A **static** portfolio website built with **HTML + Tailwind CSS + Vanilla JS**, featuring **Dark/Light mode** and **VI/EN** language toggle.

- 🔗 **Live site:** [https://tranhohoangvu.github.io/my-portfolio/](https://tranhohoangvu.github.io/my-portfolio/)
- 📄 **CV (PDF):** [`assets/TranHoHoangVu_CV.pdf`](./assets/TranHoHoangVu_CV.pdf)
- 📄 **CV (Online):** [https://tranhohoangvu.github.io/my-portfolio/assets/TranHoHoangVu_CV.pdf](https://tranhohoangvu.github.io/my-portfolio/assets/TranHoHoangVu_CV.pdf)

---

## 📌 Table of Contents

- [✨ Highlights](#-highlights)
- [🧰 Tech Stack](#-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🚀 Run Locally](#-run-locally)
- [⚙️ Quick Customize](#️-quick-customize)
- [🎨 Tailwind Build](#-tailwind-build-optional)
- [🤖 GitHub Contributions SVG](#-github-contributions-svg-auto-update)
- [🌍 Deploy to GitHub Pages](#-deploy-to-github-pages)
- [🧠 Performance & SEO Tips](#-performance--seo-tips)
- [🛠️ Updating Content](#️-updating-content)
- [📫 Contact](#-contact)
- [📄 License](#-license)

---

## ✨ Highlights

- Responsive UI (mobile-first)
- Dark / Light mode (persisted in `localStorage`, falls back to OS preference)
- VI / EN i18n via `data-i18n` (saved in `localStorage.lang`, includes page metadata)
- Projects showcase with images and quick links
- Skills & Certificates sections
- GitHub section
  - Contributions heatmap SVG auto-generated (Light/Dark) and auto-committed by GitHub Actions
  - Activity Graph rendered via `github-readme-activity-graph`
- Contact form via Formspree (no backend required)
- Smooth scroll + section reveal animations + back-to-top button
- SEO essentials: meta tags + OG image (`assets/og-image.png`), plus `robots.txt`, `sitemap.xml`, and a custom `404.html`

---

## 🧰 Tech Stack

| Tech | Usage |
|---|---|
| HTML5 | Page structure |
| Tailwind CSS (CLI) | Styling + responsive layout |
| Vanilla JavaScript | Interactions, theme toggle, i18n |
| GitHub Actions | GitHub Pages deploy + daily SVG updates |
| Formspree | Contact form handling |

---

## 📁 Project Structure

```txt
my-portfolio/
├─ index.html
├─ assets/
│  ├─ projects/
│  ├─ github-contrib-light.svg
│  ├─ github-contrib-dark.svg
│  ├─ profile.jpg
│  ├─ TranHoHoangVu_CV.pdf
│  ├─ og-image.jpg
│  └─ favicon.*
├─ css/
│  ├─ tailwind-input.css
│  ├─ tailwind.css
│  └─ styles.css
├─ js/
│  ├─ scripts.js
│  └─ build_github_contrib_svgs.py
├─ .github/workflows/
│  ├─ static.yml
│  └─ update-github-contrib.yml
├─ package.json
└─ package-lock.json
```

---

## 🚀 Run Locally

### Option 1: Open directly
Open `index.html` in your browser.

### Option 2: Local server (recommended)
```bash
python -m http.server 5500
```
Visit: `http://localhost:5500`

> Tip: VS Code **Live Server** also works well.

---

## ⚙️ Quick Customize

### 1) GitHub username
Update in `js/scripts.js`:
```js
const GITHUB_USERNAME = "tranhohoangvu";
```

### 2) Contact form (Formspree)
In `index.html`, update:
```html
<form action="https://formspree.io/f/xxxxxxx" method="POST">
```

### 3) Social links / content
Edit directly in `index.html` and the i18n content inside `js/scripts.js`.

### 4) Assets
Replace images/CV in `assets/` (keep filenames if you don’t want to edit HTML).

---

## 🎨 Tailwind Build (Optional)

Compiled CSS is already committed at `css/tailwind.css`.

Rebuild:
```bash
npm install
npx @tailwindcss/cli -i ./css/tailwind-input.css -o ./css/tailwind.css --minify
```

Watch:
```bash
npx @tailwindcss/cli -i ./css/tailwind-input.css -o ./css/tailwind.css --watch
```

---

## 🤖 GitHub Contributions SVG (Auto Update)

Workflow: `.github/workflows/update-github-contrib.yml`

- Runs daily (00:00 UTC)
- Uses GitHub GraphQL API in `js/build_github_contrib_svgs.py`
- Updates:
  - `assets/github-contrib-light.svg`
  - `assets/github-contrib-dark.svg`
- Commits changes back to the repo automatically

If you fork/clone, ensure Actions are enabled and workflows have permission to write contents.

---

## 🌍 Deploy to GitHub Pages

Deployment is handled by `.github/workflows/static.yml` (GitHub Pages official workflow).

1. Push to branch `main`
2. Go to **Settings → Pages**
3. Set Pages to deploy from **GitHub Actions**
4. After the workflow completes, your site is live at:
   - `https://<username>.github.io/<repo>/`

✅ **This repo is currently deployed here:** [https://tranhohoangvu.github.io/my-portfolio/](https://tranhohoangvu.github.io/my-portfolio/)

> 📄 CV (online): [https://tranhohoangvu.github.io/my-portfolio/assets/TranHoHoangVu_CV.pdf](https://tranhohoangvu.github.io/my-portfolio/assets/TranHoHoangVu_CV.pdf)

---

## 🧠 Performance & SEO Tips

- Compress images (e.g., Squoosh/TinyPNG) and prefer modern formats when possible
- Keep hero images under ~300–500KB
- Make sure `og-image.jpg` exists and is referenced in meta tags
- Run Lighthouse to check performance/SEO/accessibility
- (Optional) Add analytics (e.g., Google Analytics) if you want traffic insights

---

## 🛠️ Updating Content

1. Edit `index.html` for text/sections/projects
2. Update translations in `js/scripts.js` (I18N object + `data-i18n` keys)
3. Replace images/CV under `assets/`
4. (Optional) rebuild Tailwind
5. Commit & push:
```bash
git add .
git commit -m "Update content"
git push origin main
```

---

## 📫 Contact

- 🐙 GitHub: [https://github.com/tranhohoangvu](https://github.com/tranhohoangvu)
- 💼 LinkedIn: [https://linkedin.com/in/tranhohoangvu/](https://linkedin.com/in/tranhohoangvu/)
- 🌐 Live site: [https://tranhohoangvu.github.io/my-portfolio/](https://tranhohoangvu.github.io/my-portfolio/)
- 📄 CV (online): [https://tranhohoangvu.github.io/my-portfolio/assets/TranHoHoangVu_CV.pdf](https://tranhohoangvu.github.io/my-portfolio/assets/TranHoHoangVu_CV.pdf)
- 📄 CV (repo): `./assets/TranHoHoangVu_CV.pdf`

---

## 📄 License

Personal portfolio project.  
If you reuse the template, please keep attribution or link back to the original repo.

---

> Last updated: December 2025
