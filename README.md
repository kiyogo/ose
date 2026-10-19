# KIYO Open Source

> Official open-source portal for **KIYO** (`HTML5`, `CSS3`, `ES6+`).  
> Cổng thông tin mã nguồn mở chính thức của **KIYO**.

🌐 **Ngôn ngữ / Languages**: [🇻🇳 Tiếng Việt](README.vi.md) | [🇬🇧 English](README.en.md)

---

## 🇻🇳 Tiếng Việt (Vietnamese)

Hệ thống giao diện cổng mã nguồn mở KIYO được xây dựng bằng công nghệ web tĩnh thuần túy (`HTML5`, `CSS3`, `JavaScript ES6+`), hỗ trợ đầy đủ 2 bản ngôn ngữ **Tiếng Việt** và **Tiếng Anh**.

- **Chuyển ngữ tức thì**: Nút bấm `[ VI / EN ]` trên thanh điều hướng cho phép người dùng đổi ngôn ngữ nhanh chóng mà không cần tải lại trang.
- **Tự động lưu**: Hệ thống tự động ghi nhớ tùy chọn ngôn ngữ qua `localStorage` và hỗ trợ tham số URL `?lang=vi` hoặc `?lang=en`.
- **Tài liệu đầy đủ**: Xem chi tiết hướng dẫn tại [README.vi.md](README.vi.md), quy tắc ứng xử tại [CODE_OF_CONDUCT.vi.md](CODE_OF_CONDUCT.vi.md).

---

## 🇬🇧 English

KIYO Open Source portal is built with clean vanilla web technologies (`HTML5`, `CSS3`, `JavaScript ES6+`), featuring full bilingual support for **English** and **Vietnamese**.

- **Instant Switching**: Integrated `[ VI / EN ]` button group in the header and mobile drawer for zero-reload language toggling.
- **Persistence & Direct Linking**: Automatic language preference saving via `localStorage` and URL parameter support (`?lang=en` or `?lang=vi`).
- **Complete Documentation**: Read the full English guide at [README.en.md](README.en.md), and code of conduct at [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

---

## 📁 Structure

```text
kiyo-opensource/
├── index.html              # Homepage
├── projects.html           # Project catalog & filters
├── project.html            # Project detail view
├── about.html              # About & mission
├── 404.html                # 404 page
├── CODE_OF_CONDUCT.md      # Code of conduct (EN)
├── CODE_OF_CONDUCT.vi.md   # Code of conduct (VI)
├── assets/
│   ├── css/style.css       # Styles (Light/Dark themes)
│   ├── js/
│   │   ├── i18n.js         # Internationalization (VI / EN)
│   │   ├── data.js         # Bilingual project dataset
│   │   ├── main.js         # UI & navigation
│   │   └── projects.js     # Project filtering & rendering
│   └── icons/favicon.svg
├── README.md               # Main bilingual README
├── README.en.md            # English README
├── README.vi.md            # Vietnamese README
└── LICENSE
```

## 📄 License

Distributed under the [MIT](LICENSE) License.
