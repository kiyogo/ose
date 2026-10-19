# KIYO Open Source (English Version)

> Official open-source portal for **KIYO** (`HTML5`, `CSS3`, `ES6+`).  
> Fully supports bilingual presentation: **English** and **Vietnamese**.

🌐 **Documentation Language**: [English](README.en.md) | [Tiếng Việt](README.vi.md)

---

## 📁 Repository Structure

```text
kiyo-opensource/
├── index.html              # Homepage (Hero, Explore work, Technologies, Principles)
├── projects.html           # Project catalog with search and interactive filtering
├── project.html            # Detailed project specification view
├── about.html              # Mission, philosophy, and focus domains
├── 404.html                # Diagnostic not found page
├── CODE_OF_CONDUCT.md      # Code of conduct (English)
├── CODE_OF_CONDUCT.vi.md   # Code of conduct (Vietnamese)
├── assets/
│   ├── css/style.css       # Pure CSS3 styles (Light & Dark theme, responsive design)
│   ├── js/
│   │   ├── i18n.js         # Internationalization engine (Instant VI / EN switching)
│   │   ├── data.js         # Bilingual project dataset & configuration
│   │   ├── main.js         # Core UI interactions, theme toggle, mobile drawer
│   │   └── projects.js     # Project rendering, catalog filtering, detail view
│   ├── images/
│   └── icons/favicon.svg
├── README.md               # Main bilingual README
├── README.en.md            # Pure English README
├── README.vi.md            # Pure Vietnamese README
└── LICENSE
```

## 🚀 Key Features

- **Instant Bilingual Switching (VI / EN)**:
  - Header & mobile drawer language toggle.
  - Automatic persistence via `localStorage` (`kiyo-opensource-lang`).
  - Direct URL parameter support (`?lang=vi` or `?lang=en`).
- **Premium Minimalist Aesthetics**:
  - Calibrated Light & Dark themes.
  - Fully responsive across mobile, tablet, and desktop screens.
- **Interactive Project Catalog**:
  - Search across both English and Vietnamese keywords.
  - Multi-attribute filtering (Language, Category, Status).

## 💻 Usage & Deployment

1. Open `index.html` directly in any web browser.
2. Edit `assets/js/data.js` to add or update projects.
3. Deploy static files directly to GitHub Pages, Vercel, or Cloudflare Pages without any build pipeline.

## 📄 License

Distributed under the [MIT](LICENSE) License.
