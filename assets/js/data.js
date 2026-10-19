/**
 * KIYO Open Source — Shared Data Source (assets/js/data.js)
 * Supports bilingual metadata (Vietnamese & English)
 * Dynamically synchronizes with https://github.com/kiyogo
 */

const KIYO_CONFIG = {
  organizationName: "KIYO Open Source",
  tagline: "Building technology, together.",
  tagline_vi: "Cùng nhau phát triển công nghệ.",
  githubOrgUrl: "https://github.com/kiyogo",
  websiteUrl: "https://kiyovn.com",
  contactUrl: "https://kiyovn.com/contact",
  codeOfConductUrl: "CODE_OF_CONDUCT.md",
  licenseName: "Apache-2.0 / MIT"
};

const defaultProjects = [
  {
    id: "zploy",
    name: "Zploy",
    name_vi: "Zploy",
    description: "Blazing-fast, ultra-lightweight, zero-config static web & docs hosting engine in Rust with atomic zero-downtime rollbacks, smart subpath routing, and an Apple-inspired admin dashboard.",
    description_vi: "Hệ thống máy chủ lưu trữ web tĩnh và tài liệu siêu nhanh, siêu nhẹ viết bằng Rust với cơ chế hoàn tác phiên bản không gián đoạn, định tuyến đường dẫn con thông minh và giao diện quản trị phong cách Apple.",
    overview: "Zploy is an enterprise-grade, lightweight static web hosting server engineered in Rust. It eliminates the traditional headache of configuring Nginx, Caddy, Docker containers, DNS records, or slow CI/CD pipelines for static web projects. Simply drag and drop an HTML file or ZIP archive, choose your route, and publish instantly with zero configuration.",
    overview_vi: "Zploy là hệ thống máy chủ lưu trữ web tĩnh và tài liệu cấp doanh nghiệp được phát triển hoàn toàn bằng Rust. Zploy loại bỏ hoàn toàn sự phức tạp khi cấu hình Nginx, Caddy, Docker hay quy trình CI/CD nặng nề. Bạn chỉ cần kéo thả file HTML hoặc file nén ZIP, chọn đường dẫn và website sẽ được phát hành ngay lập tức với độ trễ tính bằng mili-giây.",
    category: "Web Infrastructure",
    category_vi: "Hạ tầng Web",
    language: "Rust",
    language_vi: "Rust",
    status: "verified",
    status_vi: "Đã phát hành",
    iconType: "zploy",
    logo: "assets/icons/projects/zploy.svg",
    logoFallbackUrl: "https://raw.githubusercontent.com/kiyogo/zploy/main/assets/logo.svg",
    repository: "https://github.com/kiyogo/zploy",
    website: "https://github.com/kiyogo/zploy",
    documentation: "https://github.com/kiyogo/zploy#readme",
    license: "MIT",
    technologies: ["Rust", "Axum", "Tokio", "MySQL", "Docker", "Jamstack", "Markdown"],
    features: [
      "Instant drag & drop ZIP or HTML publishing in milliseconds",
      "Atomic multi-version releases with 1-click rollback and zero downtime",
      "Smart trailing slash routing & relative asset path preservation",
      "Full Markdown & modern asset support (VitePress, Astro, Docusaurus)",
      "High-performance ETag caching & HTTP 206 partial streaming",
      "Comprehensive Zip-Slip & security mitigation architecture",
      "Apple-inspired minimalist web management dashboard"
    ],
    features_vi: [
      "Tải lên và phát hành website tức thì qua thao tác kéo thả ZIP hoặc HTML",
      "Phát hành đa phiên bản nguyên tử và hoàn tác 1-click không gián đoạn",
      "Tự động chuẩn hóa dấu gạch chéo cuối và bảo toàn đường dẫn tương đối",
      "Hỗ trợ toàn diện Markdown và tài sản web hiện đại (VitePress, Astro, Docusaurus)",
      "Bộ nhớ đệm ETag tốc độ cao và phát media qua HTTP 206 partial streaming",
      "Kiến trúc bảo mật đa lớp chống tấn công Zip-Slip và kiểm tra mã độc",
      "Bảng điều khiển quản trị tối giản, hiện đại lấy cảm hứng từ Apple"
    ],
    gettingStarted: "git clone https://github.com/kiyogo/zploy.git\ncd zploy\ndocker compose up -d\n# Access administration console at http://localhost:3000/admin",
    button1_text_en: "Details",
    button1_text_vi: "Chi tiết",
    button2_text_en: "GitHub",
    button2_text_vi: "GitHub",
    button2_url: "https://github.com/kiyogo/zploy"
  },
  {
    id: "catchim",
    name: "Catchim",
    name_vi: "Catchim",
    description: "High-performance video editing suite with native C++ desktop engine, WebAssembly compilation, and modern web video editor.",
    description_vi: "Bộ công cụ chỉnh sửa video hiệu năng cao với engine C++ native cho desktop, biên dịch WebAssembly và trình biên tập video web hiện đại.",
    overview: "Catchim is a next-generation open-source video editing platform. Powered by a high-performance native C++ core with hardware acceleration, Catchim compiles cross-platform to native desktop applications and browser-based WebAssembly environments with GPU-accelerated video rendering.",
    overview_vi: "Catchim là nền tảng biên tập video mã nguồn mở thế hệ mới. Được vận hành bởi lõi C++ native hiệu năng cao hỗ trợ tăng tốc phần cứng, Catchim có khả năng biên dịch đa nền tảng cho máy tính để bàn và môi trường WebAssembly trên trình duyệt với khả năng render video bằng GPU.",
    category: "Media & Video",
    category_vi: "Đa phương tiện & Video",
    language: "C++ / WebAssembly",
    language_vi: "C++ / WebAssembly",
    status: "verified",
    status_vi: "Đã phát hành",
    iconType: "catchim",
    logo: "assets/icons/projects/catchim.svg",
    logoFallbackUrl: "https://raw.githubusercontent.com/kiyogo/catchim/main/logo.svg",
    repository: "https://github.com/kiyogo/catchim",
    website: "https://github.com/kiyogo/catchim",
    documentation: "https://github.com/kiyogo/catchim#readme",
    license: "GPL-3.0",
    technologies: ["C++", "WebAssembly", "FFmpeg", "Qt6", "WebGPU", "React", "Next.js"],
    features: [
      "Native C++ high-performance timeline engine",
      "Cross-compiled to WebAssembly for seamless in-browser video editing",
      "Hardware-accelerated encoding & decoding via FFmpeg",
      "Modern non-linear multi-track audio & video timeline",
      "Real-time GPU visual filters, color grading & transitions"
    ],
    features_vi: [
      "Engine timeline hiệu năng cao viết bằng C++ native",
      "Biên dịch chéo sang WebAssembly để chỉnh sửa video mượt mà ngay trên web",
      "Tăng tốc phần cứng giải mã và xuất video thông qua FFmpeg",
      "Timeline đa track phi tuyến tính hiện đại cho cả âm thanh và video",
      "Bộ lọc hình ảnh, chỉnh màu và chuyển cảnh thời gian thực hỗ trợ GPU"
    ],
    gettingStarted: "git clone https://github.com/kiyogo/catchim.git\ncd catchim\nRun_Web.bat",
    button1_text_en: "Details",
    button1_text_vi: "Chi tiết",
    button2_text_en: "GitHub",
    button2_text_vi: "GitHub",
    button2_url: "https://github.com/kiyogo/catchim"
  },
  {
    id: "nom",
    name: "Nom",
    name_vi: "Nom",
    description: "Fast, lightweight, native desktop office suite built with Rust, document editing, and high-performance GPU UI.",
    description_vi: "Bộ ứng dụng văn phòng desktop siêu nhẹ, tốc độ cao viết bằng Rust, hỗ trợ soạn thảo văn bản, bảng tính và giao diện đồ họa GPU.",
    overview: "Nom is a hyper-fast, zero-bloat native desktop office suite developed in Rust. Utilizing immediate mode GUI with wgpu hardware rendering, Nom delivers instant application startup, fluid spreadsheets, rich document editing, and complete local privacy without cloud lock-in.",
    overview_vi: "Nom là bộ ứng dụng văn phòng desktop siêu tốc, không phần mềm rác được phát triển bằng Rust. Sử dụng giao diện đồ họa tăng tốc phần cứng wgpu, Nom mang lại khả năng khởi động tức thì, xử lý bảng tính mượt mà, soạn thảo văn bản phong phú và bảo mật dữ liệu cục bộ tuyệt đối.",
    category: "Productivity",
    category_vi: "Văn phòng & Hiệu suất",
    language: "Rust",
    language_vi: "Rust",
    status: "verified",
    status_vi: "Đã phát hành",
    iconType: "nom",
    logo: "assets/icons/projects/nom.svg",
    repository: "https://github.com/kiyogo/nom",
    website: "https://github.com/kiyogo/nom",
    documentation: "https://github.com/kiyogo/nom#readme",
    license: "Apache-2.0",
    technologies: ["Rust", "eframe", "egui", "wgpu", "Excel/XLSX", "Document Editor", "TypeScript"],
    features: [
      "Instant native startup time with minimal memory footprint",
      "GPU-accelerated text & spreadsheet rendering engine via wgpu",
      "Full support for modern XLSX spreadsheets and rich text documents",
      "Offline-first architecture with 100% local privacy",
      "Cross-platform compilation for Windows, Linux, and macOS"
    ],
    features_vi: [
      "Thời gian khởi động tức thì với dung lượng bộ nhớ cực thấp",
      "Engine render văn bản và bảng tính tăng tốc bằng GPU qua wgpu",
      "Hỗ trợ đầy đủ định dạng bảng tính XLSX và văn bản phong phú",
      "Kiến trúc ưu tiên offline với bảo mật dữ liệu cục bộ 100%",
      "Biên dịch đa nền tảng cho Windows, Linux và macOS"
    ],
    gettingStarted: "git clone https://github.com/kiyogo/nom.git\ncd nom\ncargo run --release",
    button1_text_en: "Details",
    button1_text_vi: "Chi tiết",
    button2_text_en: "GitHub",
    button2_text_vi: "GitHub",
    button2_url: "https://github.com/kiyogo/nom"
  }
];

// Load any cached dynamic projects from localStorage if available
let initialProjects = defaultProjects;
try {
  const cachedJson = localStorage.getItem("kiyo_synced_projects");
  if (cachedJson) {
    const parsed = JSON.parse(cachedJson);
    if (Array.isArray(parsed) && parsed.length > 0) {
      initialProjects = parsed;
    }
  }
} catch (e) {
  console.warn("Could not read cached projects:", e);
}

const technologiesList = [
  { name: "Rust", badge: "Rs" },
  { name: "C++", badge: "C++" },
  { name: "WebAssembly", badge: "Wasm" },
  { name: "TypeScript", badge: "TS" },
  { name: "JavaScript", badge: "JS" },
  { name: "Python", badge: "Py" },
  { name: "Swift", badge: "Sw" },
  { name: "Docker", badge: "Dk" }
];

/**
 * Returns a localized copy of the project based on the active language ('vi' or 'en')
 */
function getLocalizedProject(project, lang) {
  if (!project) return null;
  const currentLang =
    lang ||
    (window.KIYO_I18N && window.KIYO_I18N.getCurrentLanguage && window.KIYO_I18N.getCurrentLanguage()) ||
    "vi";
  const isVi = currentLang === "vi";

  return {
    ...project,
    name: isVi && project.name_vi ? project.name_vi : project.name,
    language: isVi && project.language_vi ? project.language_vi : project.language,
    description: isVi && project.description_vi ? project.description_vi : project.description,
    category: isVi && project.category_vi ? project.category_vi : project.category,
    status: isVi && project.status_vi ? project.status_vi : project.status,
    overview: isVi && project.overview_vi ? project.overview_vi : project.overview,
    features: isVi && project.features_vi ? project.features_vi : project.features
  };
}

window.KIYO_CONFIG = KIYO_CONFIG;
window.KIYO_DEFAULT_PROJECTS = defaultProjects;
window.KIYO_PROJECTS = initialProjects;
window.KIYO_TECHNOLOGIES = technologiesList;
window.getLocalizedProject = getLocalizedProject;
