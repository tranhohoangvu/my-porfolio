# 🌐 Portfolio của **Trần Hồ Hoàng Vũ**

> 🎓 *Sinh viên ngành Computer Science tại Đại học Tôn Đức Thắng (TDTU)*  
> 💼 *Portfolio cá nhân showcase các dự án, kỹ năng lập trình và bài viết kỹ thuật.*

---

## 🏗️ Giới thiệu

Đây là **portfolio cá nhân** của **Trần Hồ Hoàng Vũ**, sinh viên ngành *Computer Science* tại *Đại học Tôn Đức Thắng*.  
Website này được tạo ra để **giới thiệu bản thân, showcase các dự án, kỹ năng, và chia sẻ bài viết blog kỹ thuật**.  

Mục tiêu của portfolio:
- 🧠 Thể hiện năng lực lập trình và tư duy kỹ thuật.
- 💻 Giới thiệu các dự án học tập, nghiên cứu, và cá nhân.
- 📚 Ghi lại quá trình học và chia sẻ kiến thức công nghệ.

---

## 🗂️ Cấu trúc thư mục

```bash
portfolio/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── scripts.js
├── assets/
│   ├── profile.jpg
│   ├── project1.jpg
│   ├── project2.jpg
│   ├── project3.jpg
│   ├── blog1.jpg
│   ├── blog2.jpg
│   ├── blog3.jpg
│   ├── cv.pdf
│   ├── favicon.png
│   └── og-image.jpg
├── .gitignore
└── README.md
```

---

## ⚙️ Công nghệ sử dụng

| 🧩 Công nghệ | 💡 Mục đích sử dụng |
|--------------|----------------------|
| **HTML5, CSS3, JavaScript** | Xây dựng giao diện và logic chính |
| **Tailwind CSS** | Thiết kế UI nhanh, hiện đại và responsive |
| **Google Fonts (Poppins)** | Font chữ chính, mang phong cách hiện đại |
| **GitHub API** | Lấy thông tin commits, hoạt động GitHub |
| **Formspree** | Xử lý biểu mẫu liên hệ qua email (không cần backend) |

---

## 🚀 Cách triển khai

### 🧱 Chuẩn bị

- Thay thế các placeholder (nếu còn) bằng thông tin thật:
  - `yourusername` → `hoangvu04`
  - `your.email@example.com` → `tranhohoangvu04@gmail.com`
  - `your-form-id` → Form ID thực tế từ Formspree
- Tải ảnh đại diện, ảnh dự án, blog, và CV thật vào thư mục `/assets/`.

---

### 🌍 Triển khai với GitHub Pages

1. Tạo repository mới trên GitHub, ví dụ: `hoangvu04.github.io`
2. Đẩy toàn bộ mã nguồn lên repository:
   ```bash
   git add .
   git commit -m "Initial commit - Portfolio by Tran Ho Hoang Vu"
   git push origin main
   ```
3. Vào **Settings → Pages**, chọn branch `main` và folder `/ (root)`.

📍 **Kết quả:**  
Trang web của bạn sẽ hiển thị tại:  
👉 [https://hoangvu04.github.io/](https://hoangvu04.github.io/)

---

### ⚡ Triển khai với Netlify

1. Đăng nhập vào [Netlify](https://www.netlify.com/)
2. Kết nối với repository GitHub của bạn (`hoangvu04/portfolio`)
3. Cấu hình:
   - **Build command:** `none`
   - **Publish directory:** `/`
4. Netlify sẽ tự động build và cung cấp link public ví dụ như:  
   👉 `https://hoangvu-portfolio.netlify.app`

---

## 🧠 Tối ưu hóa

| Hạng mục | Mục tiêu cải thiện |
|-----------|--------------------|
| ⚡ **Hiệu suất** | Dùng Lighthouse để phân tích tốc độ tải trang |
| 🗜️ **Hình ảnh** | Nén ảnh bằng **TinyPNG**, **ImageOptim**, hoặc **Squoosh** |
| 🔍 **SEO** | Thêm meta tags, tiêu đề rõ ràng và ảnh preview `og-image.jpg` |
| 📈 **Phân tích truy cập** | Tích hợp **Google Analytics** |
| 🌙 **Giao diện** | Thêm **Dark mode / Light mode toggle** để tăng trải nghiệm người dùng |

---

## 🧾 Cách cập nhật nội dung

Để cập nhật nội dung cho portfolio:

1. Mở file `index.html`  
2. Cập nhật thông tin cá nhân, dự án hoặc bài viết blog trong các section tương ứng  
3. Sửa file `scripts.js` nếu muốn thay đổi hành vi tương tác  
4. Chạy lệnh build Tailwind (nếu có):
   ```bash
   npx tailwindcss -i ./css/styles.css -o ./dist/styles.min.css --minify
   ```
5. Commit và push lại lên GitHub:
   ```bash
   git add .
   git commit -m "Update content and styles"
   git push origin main
   ```

---

## 💡 Mẹo & Lưu ý

- ✅ Đặt tên ảnh có ý nghĩa (vd: `project-ecommerce.jpg`, `profile-vu.jpg`)  
- 🧭 Thêm favicon để hiển thị biểu tượng trên tab trình duyệt  
- 🧱 Nếu dùng framework khác (Next.js / React), giữ nguyên cấu trúc thư mục `/assets`  
- 🧑‍💻 Kiểm tra giao diện trên nhiều thiết bị: desktop, tablet, mobile  

---

## 📫 Liên hệ

| Thông tin | Liên kết |
|------------|-----------|
| ✉️ **Email** | [tranhohoangvu04@gmail.com](mailto:tranhohoangvu04@gmail.com) |
| 🐙 **GitHub** | [github.com/hoangvu04](https://github.com/hoangvu04) |
| 💼 **LinkedIn** | [linkedin.com/in/tranhohoangvu](https://linkedin.com/in/tranhohoangvu) |
| 🧾 **CV PDF** | [Xem tại đây](./assets/cv.pdf) |

---

## 🏁 Giấy phép & Bản quyền

> © 2025 **Trần Hồ Hoàng Vũ** — All rights reserved.  
> Made with ❤️ using **HTML**, **CSS**, **JavaScript**, and **Tailwind CSS**.  
>  
> 📜 Nếu bạn tham khảo hoặc sử dụng phần code này, vui lòng ghi nguồn:  
> “Portfolio Template by Trần Hồ Hoàng Vũ – TDTU”.

---

> 📍 *Last updated: November 2025*
