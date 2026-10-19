# KIYO Open Source (Bản Tiếng Việt)

> Cổng thông tin mã nguồn mở chính thức của **KIYO** (`HTML5`, `CSS3`, `ES6+`).  
> Dự án hỗ trợ song ngữ đầy đủ: **Tiếng Việt** và **Tiếng Anh**.

🌐 **Ngôn ngữ tài liệu**: [Tiếng Việt](README.vi.md) | [English](README.en.md)

---

## 📁 Cấu trúc dự án

```text
kiyo-opensource/
├── index.html              # Trang chủ (Hero, Giới thiệu sản phẩm, Công nghệ, Giá trị cốt lõi)
├── projects.html           # Danh mục toàn bộ dự án & bộ lọc tìm kiếm
├── project.html            # Trang xem chi tiết thông số từng dự án
├── about.html              # Giới thiệu sứ mệnh & lĩnh vực trọng tâm
├── 404.html                # Trang thông báo liên kết không tồn tại
├── CODE_OF_CONDUCT.md      # Quy tắc ứng xử (Tiếng Anh)
├── CODE_OF_CONDUCT.vi.md   # Quy tắc ứng xử (Tiếng Việt)
├── assets/
│   ├── css/style.css       # Toàn bộ CSS thuần (Hỗ trợ Dark/Light mode, Giao diện chuẩn mực)
│   ├── js/
│   │   ├── i18n.js         # Bộ máy đa ngôn ngữ (Tiếng Việt / English, chuyển đổi tức thì)
│   │   ├── data.js         # Dữ liệu dự án song ngữ
│   │   ├── main.js         # Xử lý giao diện, theme sáng/tối, thanh điều hướng
│   │   └── projects.js     # Đổ dữ liệu dự án, tìm kiếm, lọc theo danh mục
│   ├── images/
│   └── icons/favicon.svg
├── README.md               # Tài liệu chính (Song ngữ)
├── README.en.md            # Tài liệu Tiếng Anh
├── README.vi.md            # Tài liệu Tiếng Việt
└── LICENSE
```

## 🚀 Tính năng nổi bật

- **Chuyển đổi 2 bản ngôn ngữ (VI / EN) tức thì**:
  - Nút chuyển ngữ trực quan trên thanh Menu (Header) và Mobile Drawer.
  - Tự động ghi nhớ thiết lập qua `localStorage` (`kiyo-opensource-lang`).
  - Hỗ trợ tham số URL trực tiếp: `?lang=vi` hoặc `?lang=en`.
- **Giao diện hiện đại & tối giản**:
  - Chế độ Sáng / Tối (Light & Dark theme) chuyển đổi mượt mà.
  - Tương thích tốt trên máy tính để bàn, máy tính bảng và điện thoại di động.
- **Bộ lọc & Tìm kiếm thông minh**:
  - Tìm kiếm linh hoạt theo từ khóa tiếng Việt và tiếng Anh.
  - Lọc theo ngôn ngữ lập trình, danh mục và trạng thái.

## 💻 Cách sử dụng & Triển khai

1. Mở trực tiếp `index.html` trong bất kỳ trình duyệt web nào.
2. Tùy chỉnh danh sách dự án tại `assets/js/data.js` (hỗ trợ trường song ngữ `description_vi`, `overview_vi`, `features_vi`).
3. Đẩy lên GitHub Pages, Vercel hoặc Cloudflare Pages mà không cần bất kỳ bước biên dịch phức tạp nào.

## 📄 Giấy phép

Được phân phối dưới giấy phép [MIT](LICENSE).
