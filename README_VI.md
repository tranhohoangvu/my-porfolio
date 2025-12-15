# 🌐 Portfolio của **Trần Hồ Hoàng Vũ**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Open-success)](https://tranhohoangvu.github.io/my-portfolio/)

> 🎓 Sinh viên năm cuối ngành Computer Science tại Đại học Tôn Đức Thắng (TDTU)  
> 💼 Portfolio cá nhân showcase dự án, kỹ năng và hoạt động GitHub (có thể mở rộng sang blog kỹ thuật).

Đây là website **static** được xây dựng bằng **HTML + Tailwind CSS + Vanilla JS**, có **Dark/Light mode** và chuyển ngôn ngữ **VI/EN**.

- 🔗 **Website:** [https://tranhohoangvu.github.io/my-portfolio/](https://tranhohoangvu.github.io/my-portfolio/)
- 📄 **CV (PDF):** [`assets/TranHoHoangVu_CV.pdf`](./assets/TranHoHoangVu_CV.pdf)
- 📄 **CV (Online):** [https://tranhohoangvu.github.io/my-portfolio/assets/TranHoHoangVu_CV.pdf](https://tranhohoangvu.github.io/my-portfolio/assets/TranHoHoangVu_CV.pdf)

---

## 📌 Mục lục

- [✨ Tính năng nổi bật](#-tính-năng-nổi-bật)
- [⚙️ Công nghệ sử dụng](#️-công-nghệ-sử-dụng)
- [🗂️ Cấu trúc thư mục](#️-cấu-trúc-thư-mục)
- [🚀 Chạy local](#-chạy-local)
- [✅ Quick Customize](#-quick-customize)
- [🎨 Build Tailwind](#-build-tailwind-tuỳ-chọn)
- [🤖 Auto cập nhật GitHub Contributions SVG](#-auto-cập-nhật-github-contributions-svg)
- [🌍 Deploy lên GitHub Pages](#-deploy-lên-github-pages)
- [🧠 Tối ưu hoá](#-tối-ưu-hoá-performance--seo)
- [🛠️ Cách cập nhật nội dung](#️-cách-cập-nhật-nội-dung)
- [📫 Liên hệ](#-liên-hệ)
- [📄 Bản quyền](#-bản-quyền)

---

## ✨ Tính năng nổi bật

- Giao diện responsive (mobile-first)
- Chế độ Dark / Light (lưu trong `localStorage`, tự fallback theo tuỳ chọn hệ điều hành)
- Đa ngôn ngữ VI / EN qua `data-i18n` (lưu trong `localStorage.lang`, bao gồm cả metadata của trang)
- Showcase dự án kèm hình ảnh và liên kết nhanh
- Các mục Kỹ năng & Chứng chỉ
- Khu vực GitHub
  - SVG heatmap contributions tự động tạo cho Light/Dark và tự động commit bằng GitHub Actions
  - Activity Graph hiển thị bằng `github-readme-activity-graph`
- Form liên hệ dùng Formspree (không cần backend)
- Cuộn mượt + hiệu ứng hiện section + nút back-to-top
- SEO cơ bản: meta tags + ảnh OG (`assets/og-image.png`), kèm `robots.txt`, `sitemap.xml`, và trang `404.html` tùy chỉnh

---

## ⚙️ Công nghệ sử dụng

| 🧩 Công nghệ | 💡 Mục đích sử dụng |
|---|---|
| HTML5 | Cấu trúc nội dung |
| Tailwind CSS (CLI) | Styling + responsive layout |
| Vanilla JavaScript | Tương tác, theme toggle, i18n |
| GitHub Actions | Deploy GitHub Pages + cập nhật SVG hằng ngày |
| Formspree | Xử lý form liên hệ |

---

## 🗂️ Cấu trúc thư mục

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

## 🚀 Chạy local

### Cách 1: Mở trực tiếp
Mở `index.html` bằng trình duyệt.

### Cách 2: Chạy local server (khuyên dùng)
```bash
python -m http.server 5500
```
Truy cập: `http://localhost:5500`

> Gợi ý: dùng VS Code extension **Live Server** cũng OK.

---

## ✅ Quick Customize

### 1) GitHub username
Sửa trong `js/scripts.js`:
```js
const GITHUB_USERNAME = "tranhohoangvu";
```

### 2) Endpoint Formspree
Trong `index.html`, sửa:
```html
<form action="https://formspree.io/f/xxxxxxx" method="POST">
```

### 3) Link MXH / nội dung
Chỉnh trong `index.html` và phần i18n trong `js/scripts.js`.

### 4) Assets
Thay ảnh/CV trong `assets/` (giữ nguyên tên file nếu không muốn sửa HTML).

---

## 🎨 Build Tailwind (Tuỳ chọn)

Repo đã có sẵn CSS đã build ở `css/tailwind.css`.

Build lại:
```bash
npm install
npx @tailwindcss/cli -i ./css/tailwind-input.css -o ./css/tailwind.css --minify
```

Watch:
```bash
npx @tailwindcss/cli -i ./css/tailwind-input.css -o ./css/tailwind.css --watch
```

---

## 🤖 Auto cập nhật GitHub Contributions SVG

Workflow: `.github/workflows/update-github-contrib.yml`

- Chạy mỗi ngày (00:00 UTC)
- Gọi GitHub GraphQL API trong `js/build_github_contrib_svgs.py`
- Cập nhật:
  - `assets/github-contrib-light.svg`
  - `assets/github-contrib-dark.svg`
- Tự commit thay đổi vào repo

Nếu bạn fork/clone, hãy bật GitHub Actions và đảm bảo workflow có quyền write contents.

---

## 🌍 Deploy lên GitHub Pages

Deploy được xử lý bởi `.github/workflows/static.yml` (workflow GitHub Pages).

1. Push lên nhánh `main`
2. Vào **Settings → Pages**
3. Chọn deploy từ **GitHub Actions**
4. Khi workflow chạy xong, trang sẽ lên tại:
   - `https://<username>.github.io/<repo>/`

✅ **Website hiện đang chạy tại:** [https://tranhohoangvu.github.io/my-portfolio/](https://tranhohoangvu.github.io/my-portfolio/)

> 📄 CV (online): [https://tranhohoangvu.github.io/my-portfolio/assets/TranHoHoangVu_CV.pdf](https://tranhohoangvu.github.io/my-portfolio/assets/TranHoHoangVu_CV.pdf)

---

## 🧠 Tối ưu hoá (Performance & SEO)

- Nén ảnh (Squoosh/TinyPNG) để tải nhanh hơn
- Ảnh hero nên dưới ~300–500KB nếu có thể
- Đảm bảo `og-image.jpg` tồn tại và được khai báo trong meta tags
- Dùng Lighthouse để kiểm tra performance/SEO/accessibility
- (Tuỳ chọn) tích hợp Google Analytics nếu muốn theo dõi truy cập

---

## 🛠️ Cách cập nhật nội dung

1. Sửa `index.html` để cập nhật thông tin, project, section
2. Update translation trong `js/scripts.js` (I18N object + `data-i18n` keys)
3. Thay ảnh/CV trong `assets/`
4. (Tuỳ chọn) build lại Tailwind
5. Commit và push:
```bash
git add .
git commit -m "Update content"
git push origin main
```

---

## 📫 Liên hệ

- 🐙 GitHub: [https://github.com/tranhohoangvu](https://github.com/tranhohoangvu)
- 💼 LinkedIn: [https://linkedin.com/in/tranhohoangvu/](https://linkedin.com/in/tranhohoangvu/)
- 🌐 Website: [https://tranhohoangvu.github.io/my-portfolio/](https://tranhohoangvu.github.io/my-portfolio/)
- 📄 CV (online): [https://tranhohoangvu.github.io/my-portfolio/assets/TranHoHoangVu_CV.pdf](https://tranhohoangvu.github.io/my-portfolio/assets/TranHoHoangVu_CV.pdf)
- 📄 CV (repo): `./assets/TranHoHoangVu_CV.pdf`

---

## 📄 Bản quyền

Dự án portfolio cá nhân.  
Nếu bạn tham khảo hoặc reuse template, vui lòng giữ attribution hoặc link về repo gốc.

---

> Last updated: 12/2025
