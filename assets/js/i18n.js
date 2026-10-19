/**
 * KIYO Open Source — Internationalization Engine (assets/js/i18n.js)
 * Supports full bilingual switching: Vietnamese (vi) and English (en)
 * Features:
 * - Instant in-page translation without reloading
 * - localStorage persistence ('kiyo-opensource-lang')
 * - URL query parameter support (?lang=vi or ?lang=en)
 * - Event-driven dispatch ('kiyo:langchange') for dynamic modules (projects.js)
 */

(function () {
  "use strict";

  const LANG_STORAGE_KEY = "kiyo-opensource-lang";
  const LANG_MANUAL_KEY = "kiyo-opensource-lang-manual";
  const GEO_CACHE_KEY = "kiyo-opensource-geo-country";
  const DEFAULT_LANG = "vi"; // Default to Vietnamese per user requirement

  const I18N_DICTIONARY = {
    en: {
      // Brand & Nav
      brand_sub: "Open Source",
      skip_content: "Skip to content",
      nav_home: "Home",
      nav_projects: "Projects",
      nav_community: "Community",
      nav_about: "About",
      theme_switch_light: "Switch to light theme",
      theme_switch_dark: "Switch to dark theme",
      mobile_menu_label: "Menu",
      mobile_lang_label: "Language",

      // Home - Hero
      hero_eyebrow: "",
      hero_title: "Developing together.",
      hero_desc: "",
      hero_explore: "Explore Projects",
      hero_github: "View on GitHub",
      hero_note: "",
      code_window_title: "py.main",

      // Home - Sections
      explore_heading: "",
      explore_view_all: "View all projects",
      tech_heading: "Technologies we work with",
      principles_heading: "Built in the open.",
      principle_collab_title: "Open Collaboration",
      principle_collab_desc: "Build and improve software together.",
      principle_sharing_title: "Knowledge Sharing",
      principle_sharing_desc: "Make technology accessible to everyone.",
      principle_inno_title: "Continuous Innovation",
      principle_inno_desc: "Experiment, learn, and keep improving.",
      featured_heading: "Featured Project",
      community_heading: "Open source is better together.",
      comm_explore_repos: "Explore repositories",
      comm_report_issue: "Report an issue",
      comm_contribute: "Contribute to a project",
      comm_discussions: "Join discussions",
      cta_title: "Let's build something great.",
      cta_button: "Explore KIYO on GitHub →",

      // Projects Page
      projects_page_title: "Projects — KIYO Open Source",
      projects_meta_desc: "Explore KIYO open-source projects across operating systems, AI, developer tools, and infrastructure.",
      projects_heading: "",
      search_placeholder: "Search projects...",
      filter_lang_all: "All Languages",
      filter_cat_all: "All Categories",
      filter_status_all: "All Statuses",
      filter_status_soon: "Coming soon",
      filter_status_sample: "Sample",
      filter_status_verified: "Verified",
      projects_count_empty: "",
      projects_count_paged: "",
      projects_empty_title: "No matching projects",
      projects_empty_home: "No projects available yet.",
      projects_reset_btn: "Reset",
      projects_load_more: "Load more",
      card_view: "View",
      card_source_details: "Source & Details",

      // Project Detail Page
      detail_page_title: "Project — KIYO Open Source",
      detail_meta_desc: "Detailed documentation and technical specifications for KIYO open-source project.",
      detail_breadcrumb_back: "Projects",
      detail_overview_title: "Overview",
      detail_features_title: "Features",
      detail_quickstart_title: "Quick Start",
      detail_loading_readme: "Loading documentation from GitHub...",
      detail_readme_fallback: "Could not load documentation from GitHub.",
      detail_btn_github: "GitHub",
      detail_btn_docs: "Docs",
      detail_btn_contribute: "Contribute",
      sidebar_repository: "Repository",
      sidebar_stars: "Stars",
      sidebar_forks: "Forks",
      sidebar_issues: "Open Issues",
      sidebar_language: "Language",
      sidebar_category: "Category",
      sidebar_status: "Status",
      sidebar_license: "License",
      sidebar_tech: "Tech",
      project_not_found_title: "Project Not Found",
      project_not_found_btn: "Back to Projects",

      // Community Page
      community_page_title: "Community — KIYO Open Source",
      community_meta_desc: "Join the KIYO open-source community, report issues, and contribute to our codebase.",
      community_heading: "Community",
      step_1_title: "Inspect Issues",
      step_2_title: "Fork & Branch",
      step_3_title: "Report Bugs",
      step_4_title: "Submit PR",
      comm_btn_contrib: "https://github.com/kiyogo",
      comm_btn_coc: "CODE_OF_CONDUCT.md",
      comm_btn_github: "GitHub →",

      // About Page
      about_page_title: "About — KIYO Open Source",
      about_meta_desc: "Learn about the mission, philosophy, and focus areas behind KIYO Open Source.",
      about_hero_title: "Technology should be open, accessible, and built together.",
      about_mission_heading: "Mission",
      mission_1: "Software Development",
      mission_2: "Technology Research",
      mission_3: "Open Source",
      mission_4: "Knowledge Sharing",
      mission_5: "Community",
      about_focus_heading: "Focus Areas",
      focus_1: "Software Engineering",
      focus_2: "Artificial Intelligence",
      focus_3: "Operating Systems",
      focus_4: "Developer Tools",
      focus_5: "Infrastructure",
      focus_6: "Automation",

      // 404 Page
      not_found_page_title: "404 — KIYO Open Source",
      not_found_meta_desc: "The requested page was not found.",
      not_found_heading: "Page not found",
      not_found_btn_home: "Home",
      not_found_btn_projects: "Projects",

      // Categories
      cat_os: "Operating Systems",
      cat_tools: "Developer Tools",
      cat_ai: "AI",
      cat_infra: "Infrastructure",
      cat_software: "Software",

      // Statuses
      status_soon: "Coming soon",
      status_sample: "Sample",
      status_active: "Active",
      status_verified: "Verified",

      // Footer
      footer_tagline: "\"Developing together.\"",
      footer_explore_title: "Explore",
      footer_projects: "Projects",
      footer_technologies: "Technologies",
      footer_community: "Community",
      footer_resources_title: "Resources",
      footer_github: "GitHub",
      footer_documentation: "Documentation",
      footer_contributing: "Contributing",
      footer_org_title: "Organization",
      footer_about: "About",
      footer_kiyo: "KIYO",
      footer_contact: "Contact",
      footer_copyright: "© 2026 KIYO. Open source, open future.",
      footer_top: "Top"
    },
    vi: {
      // Brand & Nav
      brand_sub: "Mã Nguồn Mở",
      skip_content: "Chuyển đến nội dung chính",
      nav_home: "Trang chủ",
      nav_projects: "Dự án",
      nav_community: "Cộng đồng",
      nav_about: "Giới thiệu",
      theme_switch_light: "Chuyển sang chế độ sáng",
      theme_switch_dark: "Chuyển sang chế độ tối",
      mobile_menu_label: "Menu điều hướng",
      mobile_lang_label: "Ngôn ngữ",

      // Home - Hero
      hero_eyebrow: "",
      hero_title: "Cùng nhau phát triển.",
      hero_desc: "",
      hero_explore: "Khám phá dự án",
      hero_github: "Xem trên GitHub",
      hero_note: "",
      code_window_title: "py.main",

      // Home - Sections
      explore_heading: "",
      explore_view_all: "Xem tất cả dự án",
      tech_heading: "Công nghệ chúng tôi sử dụng",
      principles_heading: "Phát triển minh bạch & cởi mở.",
      principle_collab_title: "Hợp tác mở",
      principle_collab_desc: "Cùng nhau xây dựng và hoàn thiện phần mềm.",
      principle_sharing_title: "Chia sẻ tri thức",
      principle_sharing_desc: "Đưa công nghệ đến gần hơn với mọi người.",
      principle_inno_title: "Đổi mới liên tục",
      principle_inno_desc: "Thử nghiệm, học hỏi và không ngừng cải tiến.",
      featured_heading: "Dự án nổi bật",
      community_heading: "Mã nguồn mở tốt hơn khi cùng nhau.",
      comm_explore_repos: "Khám phá kho mã nguồn",
      comm_report_issue: "Báo cáo vấn đề",
      comm_contribute: "Đóng góp cho dự án",
      comm_discussions: "Tham gia thảo luận",
      cta_title: "Hãy cùng tạo nên điều tuyệt vời.",
      cta_button: "Khám phá KIYO trên GitHub →",

      // Projects Page
      projects_page_title: "Dự án — KIYO Open Source",
      projects_meta_desc: "Khám phá các dự án mã nguồn mở của KIYO trong các lĩnh vực hệ điều hành, AI, công cụ phát triển và hạ tầng mạng.",
      projects_heading: "",
      search_placeholder: "Tìm kiếm dự án...",
      filter_lang_all: "Tất cả ngôn ngữ",
      filter_cat_all: "Tất cả danh mục",
      filter_status_all: "Tất cả trạng thái",
      filter_status_soon: "Sắp ra mắt",
      filter_status_sample: "Bản mẫu",
      filter_status_verified: "Đã xác thực",
      projects_count_empty: "",
      projects_count_paged: "",
      projects_empty_title: "Không tìm thấy dự án phù hợp",
      projects_empty_home: "Chưa có dự án nào.",
      projects_reset_btn: "Đặt lại bộ lọc",
      projects_load_more: "Xem thêm",
      card_view: "Chi tiết",
      card_source_details: "Mã nguồn & Chi tiết",

      // Project Detail Page
      detail_page_title: "Chi tiết dự án — KIYO Open Source",
      detail_meta_desc: "Tài liệu kỹ thuật chi tiết và thông số cho dự án mã nguồn mở KIYO.",
      detail_breadcrumb_back: "Danh sách dự án",
      detail_overview_title: "Tổng quan",
      detail_features_title: "Tính năng nổi bật",
      detail_quickstart_title: "Bắt đầu nhanh",
      detail_loading_readme: "Đang tải tài liệu từ GitHub...",
      detail_readme_fallback: "Không thể tải tài liệu từ GitHub.",
      detail_btn_github: "GitHub",
      detail_btn_docs: "Tài liệu",
      detail_btn_contribute: "Đóng góp",
      sidebar_repository: "Kho lưu trữ",
      sidebar_stars: "Stars",
      sidebar_forks: "Forks",
      sidebar_issues: "Vấn đề mở",
      sidebar_language: "Ngôn ngữ",
      sidebar_category: "Danh mục",
      sidebar_status: "Trạng thái",
      sidebar_license: "Giấy phép",
      sidebar_tech: "Công nghệ",
      project_not_found_title: "Không tìm thấy dự án",
      project_not_found_btn: "Quay lại danh sách",

      // Community Page
      community_page_title: "Cộng đồng — KIYO Open Source",
      community_meta_desc: "Tham gia cộng đồng mã nguồn mở KIYO, báo cáo lỗi và đóng góp vào mã nguồn của chúng tôi.",
      community_heading: "Cộng đồng",
      step_1_title: "Xem xét vấn đề",
      step_2_title: "Fork & Tạo nhánh",
      step_3_title: "Báo cáo lỗi",
      step_4_title: "Gửi Pull Request",
      comm_btn_contrib: "https://github.com/kiyogo",
      comm_btn_coc: "CODE_OF_CONDUCT.md",
      comm_btn_github: "GitHub →",

      // About Page
      about_page_title: "Giới thiệu — KIYO Open Source",
      about_meta_desc: "Tìm hiểu về sứ mệnh, triết lý phát triển và các lĩnh vực trọng tâm của KIYO Open Source.",
      about_hero_title: "Công nghệ cần được cởi mở, dễ tiếp cận và cùng nhau phát triển.",
      about_mission_heading: "Sứ mệnh",
      mission_1: "Phát triển phần mềm",
      mission_2: "Nghiên cứu công nghệ",
      mission_3: "Mã nguồn mở",
      mission_4: "Chia sẻ tri thức",
      mission_5: "Xây dựng cộng đồng",
      about_focus_heading: "Lĩnh vực trọng tâm",
      focus_1: "Kỹ thuật phần mềm",
      focus_2: "Trí tuệ nhân tạo (AI)",
      focus_3: "Hệ điều hành",
      focus_4: "Công cụ lập trình viên",
      focus_5: "Hạ tầng hệ thống",
      focus_6: "Tự động hóa",

      // 404 Page
      not_found_page_title: "404 — KIYO Open Source",
      not_found_meta_desc: "Không tìm thấy trang yêu cầu.",
      not_found_heading: "Không tìm thấy trang",
      not_found_btn_home: "Trang chủ",
      not_found_btn_projects: "Dự án",

      // Categories
      cat_os: "Hệ điều hành",
      cat_tools: "Công cụ phát triển",
      cat_ai: "Trí tuệ nhân tạo (AI)",
      cat_infra: "Hạ tầng mạng",
      cat_software: "Phần mềm",

      // Statuses
      status_soon: "Sắp ra mắt",
      status_sample: "Bản mẫu",
      status_active: "Hoạt động",
      status_verified: "Đã xác thực",

      // Footer
      footer_tagline: "\"Cùng nhau phát triển.\"",
      footer_explore_title: "Khám phá",
      footer_projects: "Dự án",
      footer_technologies: "Công nghệ",
      footer_community: "Cộng đồng",
      footer_resources_title: "Tài nguyên",
      footer_github: "GitHub",
      footer_documentation: "Tài liệu",
      footer_contributing: "Đóng góp",
      footer_org_title: "Tổ chức",
      footer_about: "Giới thiệu",
      footer_kiyo: "KIYO",
      footer_contact: "Liên hệ",
      footer_copyright: "© 2026 KIYO. Mã nguồn mở, tương lai rộng mở.",
      footer_top: "Lên đầu trang"
    }
  };

  function hasManualSelection() {
    try {
      return localStorage.getItem(LANG_MANUAL_KEY) === "true";
    } catch (e) {
      return false;
    }
  }

  /**
   * Determine initial language:
   * 1. URL search param ?lang=vi or ?lang=en (marks manual)
   * 2. User manual selection if previously saved
   * 3. Session-cached detected IP country
   * 4. Previously saved language
   * 5. Browser language
   * 6. Default: 'vi'
   */
  function getInitialLanguage() {
    try {
      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get("lang");
      if (urlLang === "vi" || urlLang === "en") {
        try {
          localStorage.setItem(LANG_MANUAL_KEY, "true");
          localStorage.setItem(LANG_STORAGE_KEY, urlLang);
        } catch (e) {}
        return urlLang;
      }

      if (hasManualSelection()) {
        const saved = localStorage.getItem(LANG_STORAGE_KEY);
        if (saved === "vi" || saved === "en") {
          return saved;
        }
      }

      const cachedCountry = sessionStorage.getItem(GEO_CACHE_KEY);
      if (cachedCountry) {
        return (cachedCountry === "VN" || cachedCountry === "VNM") ? "vi" : "en";
      }

      const saved = localStorage.getItem(LANG_STORAGE_KEY);
      if (saved === "vi" || saved === "en") {
        return saved;
      }
    } catch (e) {
      /* Ignore storage errors */
    }

    if (navigator.language) {
      const navLang = navigator.language.toLowerCase();
      if (navLang.startsWith("vi")) return "vi";
      if (navLang.startsWith("en")) return "en";
    }

    return DEFAULT_LANG;
  }

  let currentLang = getInitialLanguage();

  function t(key, fallback) {
    const dict = I18N_DICTIONARY[currentLang] || I18N_DICTIONARY.vi;
    if (Object.prototype.hasOwnProperty.call(dict, key)) {
      return dict[key];
    }
    const enDict = I18N_DICTIONARY.en;
    if (Object.prototype.hasOwnProperty.call(enDict, key)) {
      return enDict[key];
    }
    return fallback !== undefined ? fallback : key;
  }

  function applyLanguage(lang, isManual) {
    if (lang !== "vi" && lang !== "en") {
      lang = DEFAULT_LANG;
    }
    currentLang = lang;

    try {
      localStorage.setItem(LANG_STORAGE_KEY, lang);
      if (isManual === true) {
        localStorage.setItem(LANG_MANUAL_KEY, "true");
      }
    } catch (e) {
      /* Ignore storage errors */
    }

    // Set document lang attribute
    document.documentElement.lang = lang;

    // Update text nodes with data-i18n
    const textNodes = document.querySelectorAll("[data-i18n]");
    textNodes.forEach(function (el) {
      const key = el.getAttribute("data-i18n");
      const translation = t(key);
      if (translation !== undefined) {
        el.textContent = translation;
      }
    });

    // Update placeholders
    const placeholderNodes = document.querySelectorAll("[data-i18n-placeholder]");
    placeholderNodes.forEach(function (el) {
      const key = el.getAttribute("data-i18n-placeholder");
      const translation = t(key);
      if (translation !== undefined) {
        el.setAttribute("placeholder", translation);
      }
    });

    // Update titles & aria-labels
    const titleNodes = document.querySelectorAll("[data-i18n-title]");
    titleNodes.forEach(function (el) {
      const key = el.getAttribute("data-i18n-title");
      const translation = t(key);
      if (translation !== undefined) {
        el.setAttribute("title", translation);
        el.setAttribute("aria-label", translation);
      }
    });

    // Update page title & meta description if defined on page
    const pageTitleKey = document.querySelector("meta[name='page-title-key']");
    if (pageTitleKey) {
      const key = pageTitleKey.getAttribute("content");
      if (key && I18N_DICTIONARY[lang][key]) {
        document.title = I18N_DICTIONARY[lang][key];
      }
    }

    const pageDescKey = document.querySelector("meta[name='page-desc-key']");
    if (pageDescKey) {
      const key = pageDescKey.getAttribute("content");
      if (key && I18N_DICTIONARY[lang][key]) {
        const metaDesc = document.querySelector("meta[name='description']");
        if (metaDesc) metaDesc.setAttribute("content", I18N_DICTIONARY[lang][key]);
        const ogDesc = document.querySelector("meta[property='og:description']");
        if (ogDesc) ogDesc.setAttribute("content", I18N_DICTIONARY[lang][key]);
      }
    }

    // Synchronize footer language select dropdown
    const footerSelect = document.getElementById("footer-lang-select");
    if (footerSelect && footerSelect.value !== lang) {
      footerSelect.value = lang;
    }

    // Update language switcher active states if any exist
    const langBtns = document.querySelectorAll("[data-lang]");
    langBtns.forEach(function (btn) {
      const btnLang = btn.getAttribute("data-lang");
      if (btnLang === lang) {
        btn.classList.add("is-active");
        btn.setAttribute("aria-pressed", "true");
      } else {
        btn.classList.remove("is-active");
        btn.setAttribute("aria-pressed", "false");
      }
    });

    // Dispatch event for other scripts (e.g., projects.js)
    window.dispatchEvent(
      new CustomEvent("kiyo:langchange", { detail: { lang: lang } })
    );
  }

  /**
   * Detect visitor country by IP address and set language:
   * - Visitors from Vietnam (VN) -> 'vi'
   * - Visitors from other countries -> 'en'
   * - Preserves user's manual preference if they already chose one
   */
  function detectLanguageByIp() {
    if (hasManualSelection()) {
      return;
    }

    function fetchWithTimeout(url, ms) {
      if (typeof AbortController === "undefined") {
        return fetch(url).then(function (r) {
          if (!r.ok) throw new Error("HTTP " + r.status);
          return r.json();
        });
      }
      const ctrl = new AbortController();
      const tid = setTimeout(function () {
        ctrl.abort();
      }, ms);
      return fetch(url, { signal: ctrl.signal }).then(function (res) {
        clearTimeout(tid);
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json();
      });
    }

    function applyCountry(countryCode) {
      if (!countryCode) return;
      const code = String(countryCode).trim().toUpperCase();
      try {
        sessionStorage.setItem(GEO_CACHE_KEY, code);
      } catch (e) {}

      if (hasManualSelection()) return;

      const detectedLang = (code === "VN" || code === "VNM") ? "vi" : "en";
      if (detectedLang !== currentLang) {
        applyLanguage(detectedLang, false);
      }
    }

    // Primary: https://api.country.is/
    fetchWithTimeout("https://api.country.is/", 3500)
      .then(function (data) {
        if (data && data.country) {
          applyCountry(data.country);
        }
      })
      .catch(function () {
        // Fallback: https://get.geojs.io/v1/ip/country.json
        fetchWithTimeout("https://get.geojs.io/v1/ip/country.json", 3500)
          .then(function (data) {
            if (data && (data.country || data.country_3)) {
              applyCountry(data.country || data.country_3);
            }
          })
          .catch(function () {
            /* Offline or error - keep initial language */
          });
      });
  }

  function initI18n() {
    // Initial application to catch any static nodes
    applyLanguage(currentLang, false);

    // Bind footer select change event
    const footerSelect = document.getElementById("footer-lang-select");
    if (footerSelect) {
      footerSelect.value = currentLang;
      footerSelect.addEventListener("change", function (event) {
        const selectedLang = event.target.value;
        if (selectedLang && selectedLang !== currentLang) {
          applyLanguage(selectedLang, true);
        }
      });
    }

    // Bind click events on any language toggle buttons (if present)
    document.addEventListener("click", function (event) {
      const btn = event.target.closest("[data-lang]");
      if (btn) {
        event.preventDefault();
        const selectedLang = btn.getAttribute("data-lang");
        if (selectedLang && selectedLang !== currentLang) {
          applyLanguage(selectedLang, true);
        }
      }
    });

    // Detect language from visitor's IP in background
    detectLanguageByIp();
  }

  // Expose I18N API globally
  window.KIYO_I18N = {
    getCurrentLanguage: function () {
      return currentLang;
    },
    setLanguage: function (lang) {
      applyLanguage(lang, true);
    },
    t: t,
    dictionary: I18N_DICTIONARY,
    detectLanguageByIp: detectLanguageByIp
  };

  // Immediate execution for fast FOUC-free localization
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initI18n);
  } else {
    initI18n();
  }
})();
