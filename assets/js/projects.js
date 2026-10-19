/**
 * KIYO Open Source — Projects Rendering & Filtering Engine (assets/js/projects.js)
 * Clean, flat, borderless Apple Open Source card design with squircle floating app icons
 * No dark fuzzy shadows, no hover jump/movement, vibrant blue color scheme
 * Supports dynamic bilingual rendering (Vietnamese / English)
 */

(function () {
  "use strict";

  function t(key, fallback) {
    if (window.KIYO_I18N && typeof window.KIYO_I18N.t === "function") {
      return window.KIYO_I18N.t(key, fallback);
    }
    return fallback !== undefined ? fallback : key;
  }

  function getProject(p) {
    if (typeof window.getLocalizedProject === "function") {
      return window.getLocalizedProject(p);
    }
    return p;
  }

  /**
   * Crisp, flat SVG Squircle App Icons matching Apple Open Source (Zero box-shadow)
   * Supports local and remote SVG logos with automatic fallback
   */
  function getProjectIconSvg(iconType, project) {
    if (project) {
      if (typeof project.logoSvg === "string" && project.logoSvg.trim().startsWith("<svg")) {
        return project.logoSvg;
      }
      const logoUrl = project.logo || project.logoUrl || project.logoFallbackUrl;
      if (logoUrl) {
        return `<img src="${logoUrl}" alt="${project.name || 'Project'}" width="56" height="56" style="width: 56px; height: 56px; border-radius: 7px; object-fit: contain; display: block;" onerror="this.onerror=null; this.src='assets/icons/kiyo.svg';">`;
      }
    }

    const type = String(iconType || (project && project.id) || "").toLowerCase();

    if (type === "zploy") {
      return `<img src="assets/icons/projects/zploy.svg" alt="Zploy" width="56" height="56" style="width: 56px; height: 56px; border-radius: 7px; object-fit: contain; display: block;">`;
    }
    if (type === "catchim") {
      return `<img src="assets/icons/projects/catchim.svg" alt="Catchim" width="56" height="56" style="width: 56px; height: 56px; border-radius: 7px; object-fit: contain; display: block;">`;
    }
    if (type === "nom") {
      return `<img src="assets/icons/projects/nom.svg" alt="Nom" width="56" height="56" style="width: 56px; height: 56px; border-radius: 7px; object-fit: contain; display: block;">`;
    }

    if (type === "swift") {
      return `<svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" style="border-radius: 7px;">
        <defs>
          <linearGradient id="swiftGrad" x1="0" y1="0" x2="56" y2="56" gradientUnits="userSpaceOnUse">
            <stop stop-color="#FF633E"/>
            <stop offset="1" stop-color="#F02B1D"/>
          </linearGradient>
        </defs>
        <rect width="56" height="56" rx="7" fill="url(#swiftGrad)"/>
        <path d="M43.2 36.4C40.6 40.5 36.1 44.2 30.5 46.2C25 48.1 18.5 47.7 13.2 45.3C20.1 44 26.3 40.2 30 34.9C31.2 33.2 32.1 31.2 32.5 29.2C27.8 31.7 22.3 32.8 16.9 32.3C23 28.9 27.9 23.6 30.6 17.2C31 16.2 31.3 15.1 31.6 14C26.4 16.4 20.7 17.3 15.1 16.5C20.9 12.7 25.5 6.9 28 0.4C17.3 7 10 17.5 8.7 30.2C10.5 36.2 14.9 41.4 20.7 44.2C27.2 47.3 35.1 47.2 41.4 44C42.7 43.3 43.9 42.5 45 41.6C43.8 37.7 42.8 33.7 43.8 29.5C42.8 31.9 42.5 34.3 43.2 36.4Z" fill="white"/>
      </svg>`;
    }

    if (type === "container") {
      return `<svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" style="border-radius: 7px;">
        <defs>
          <linearGradient id="containerGrad" x1="0" y1="0" x2="0" y2="56" gradientUnits="userSpaceOnUse">
            <stop stop-color="#8896A6"/>
            <stop offset="1" stop-color="#5C6877"/>
          </linearGradient>
        </defs>
        <rect width="56" height="56" rx="7" fill="url(#containerGrad)"/>
        <!-- 3 server rack units -->
        <g fill="#2D3540" fill-opacity="0.88">
          <rect x="9.5" y="11" width="37" height="9.5" rx="4.5"/>
          <rect x="9.5" y="23.25" width="37" height="9.5" rx="4.5"/>
          <rect x="9.5" y="35.5" width="37" height="9.5" rx="4.5"/>
        </g>
        <!-- LED indicator dots & ventilation lines -->
        <circle cx="15.5" cy="15.75" r="1.8" fill="#93C5FD"/>
        <circle cx="21" cy="15.75" r="1.8" fill="#94A3B8"/>
        <rect x="27" y="14.25" width="15" height="3" rx="1.5" fill="#64748B"/>

        <circle cx="15.5" cy="28" r="1.8" fill="#6EE7B7"/>
        <circle cx="21" cy="28" r="1.8" fill="#94A3B8"/>
        <rect x="27" y="26.5" width="15" height="3" rx="1.5" fill="#64748B"/>

        <circle cx="15.5" cy="40.25" r="1.8" fill="#93C5FD"/>
        <circle cx="21" cy="40.25" r="1.8" fill="#94A3B8"/>
        <rect x="27" y="38.75" width="15" height="3" rx="1.5" fill="#64748B"/>
      </svg>`;
    }

    if (type === "webkit") {
      return `<svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" style="border-radius: 7px;">
        <defs>
          <linearGradient id="webkitCompass" x1="14" y1="5" x2="42" y2="33" gradientUnits="userSpaceOnUse">
            <stop stop-color="#38A2FF"/>
            <stop offset="1" stop-color="#0066CC"/>
          </linearGradient>
        </defs>
        <!-- Stepped isometric layers in warm gold/yellow -->
        <path d="M28 35L45 42.5L28 50L11 42.5L28 35Z" fill="#D97706"/>
        <path d="M28 29L45 36.5L28 44L11 36.5L28 29Z" fill="#F59E0B"/>
        <path d="M28 23L45 30.5L28 38L11 30.5L28 23Z" fill="#FBBF24"/>
        <!-- Blue circular compass -->
        <circle cx="28" cy="18" r="14.5" fill="url(#webkitCompass)"/>
        <circle cx="28" cy="18" r="13" stroke="rgba(255,255,255,0.3)" stroke-width="1.2"/>
        <!-- Compass star pointer -->
        <polygon points="28,7.5 30.8,15.5 38.5,18 30.8,20.5 28,28.5 25.2,20.5 17.5,18 25.2,15.5" fill="#FFFFFF"/>
        <polygon points="28,7.5 30.8,15.5 28,18 25.2,15.5" fill="#EF4444"/>
        <circle cx="28" cy="18" r="2.2" fill="#FFFFFF"/>
      </svg>`;
    }

    if (type === "kernel" || type === "cpu") {
      return `<svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" style="border-radius: 7px;">
        <defs>
          <linearGradient id="kernelGrad" x1="0" y1="0" x2="56" y2="56" gradientUnits="userSpaceOnUse">
            <stop stop-color="#6366F1"/>
            <stop offset="1" stop-color="#4338CA"/>
          </linearGradient>
        </defs>
        <rect width="56" height="56" rx="7" fill="url(#kernelGrad)"/>
        <rect x="16" y="16" width="24" height="24" rx="5" stroke="white" stroke-width="2.5"/>
        <rect x="22" y="22" width="12" height="12" rx="2" fill="white"/>
        <path d="M22 10v4M28 10v4M34 10v4M22 42v4M28 42v4M34 42v4M10 22h4M10 28h4M10 34h4M42 22h4M42 28h4M42 34h4" stroke="white" stroke-width="2" stroke-linecap="round"/>
      </svg>`;
    }

    if (type === "cli" || type === "terminal") {
      return `<svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" style="border-radius: 7px;">
        <defs>
          <linearGradient id="cliGrad" x1="0" y1="0" x2="56" y2="56" gradientUnits="userSpaceOnUse">
            <stop stop-color="#334155"/>
            <stop offset="1" stop-color="#0F172A"/>
          </linearGradient>
        </defs>
        <rect width="56" height="56" rx="7" fill="url(#cliGrad)"/>
        <path d="M18 20l8 8-8 8M30 36h10" stroke="#38BDF8" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`;
    }

    // Default AI
    return `<svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" style="border-radius: 7px;">
      <defs>
        <linearGradient id="aiGrad" x1="0" y1="0" x2="56" y2="56" gradientUnits="userSpaceOnUse">
          <stop stop-color="#A855F7"/>
          <stop offset="1" stop-color="#7C3AED"/>
        </linearGradient>
      </defs>
      <rect width="56" height="56" rx="7" fill="url(#aiGrad)"/>
      <path d="M28 12v32M12 28h32M16.7 16.7l22.6 22.6M39.3 16.7L16.7 39.3" stroke="white" stroke-width="3" stroke-linecap="round"/>
    </svg>`;
  }

  /**
   * Build project card matching the layout from user screenshot:
   * - Flat white card, no border, no shadow
   * - Protruding squircle app icon
   * - Bold title, clean subtitle, description
   * - Blue pill action buttons (Chi tiết, Trang web / GitHub)
   */
  function buildProjectCard(rawProject) {
    const isVi =
      (window.KIYO_I18N &&
        window.KIYO_I18N.getCurrentLanguage &&
        window.KIYO_I18N.getCurrentLanguage()) === "vi";
    const project = getProject(rawProject);

    const article = document.createElement("article");
    article.className = "project-card";

    // Protruding Squircle App Icon
    const iconWrap = document.createElement("div");
    iconWrap.className = "project-card__icon";
    iconWrap.innerHTML = getProjectIconSvg(project.iconType, project);

    // Card Content Wrapper
    const content = document.createElement("div");
    content.className = "project-card__content";

    // Title
    const title = document.createElement("h3");
    title.className = "project-card__title";
    const titleLink = document.createElement("a");
    titleLink.href = "project.html?id=" + encodeURIComponent(project.id);
    titleLink.textContent = isVi && project.name_vi ? project.name_vi : project.name;
    title.appendChild(titleLink);

    // Description
    const desc = document.createElement("p");
    desc.className = "project-card__desc";
    desc.textContent =
      isVi && project.description_vi ? project.description_vi : project.description;

    // Actions Row (Blue pill buttons)
    const actions = document.createElement("div");
    actions.className = "project-card__actions";

    // Button 1: Chi tiết / Details
    const btn1 = document.createElement("a");
    btn1.className = "card-btn";
    btn1.href = "project.html?id=" + encodeURIComponent(project.id);
    btn1.textContent = isVi
      ? project.button1_text_vi || "Chi tiết"
      : project.button1_text_en || "Details";
    actions.appendChild(btn1);

    // Button 2: Trang web / GitHub / Website
    const btn2 = document.createElement("a");
    btn2.className = "card-btn";
    const btn2Url =
      project.button2_url ||
      project.website ||
      project.repository ||
      (window.KIYO_CONFIG && window.KIYO_CONFIG.githubOrgUrl);
    btn2.href = btn2Url;
    btn2.target = "_blank";
    btn2.rel = "noopener noreferrer";
    btn2.textContent = isVi
      ? project.button2_text_vi || "Trang web"
      : project.button2_text_en || "Website";
    actions.appendChild(btn2);

    content.appendChild(title);
    content.appendChild(desc);
    content.appendChild(actions);

    article.appendChild(iconWrap);
    article.appendChild(content);

    return article;
  }

  /**
   * Synchronize all project cards in every .projects-grid to have 100% equal height
   */
  function syncCardHeights() {
    requestAnimationFrame(function () {
      const grids = document.querySelectorAll(".projects-grid");
      grids.forEach(function (grid) {
        const cards = grid.querySelectorAll(".project-card");
        if (!cards || cards.length === 0) return;

        // Reset inline min-height to compute natural heights
        cards.forEach(function (card) {
          card.style.minHeight = "";
        });

        // Measure maximum height across all cards in this grid
        let maxHeight = 0;
        cards.forEach(function (card) {
          const cardHeight = card.offsetHeight;
          if (cardHeight > maxHeight) {
            maxHeight = cardHeight;
          }
        });

        // Apply max height so 100% of cards are equal
        if (maxHeight > 0) {
          cards.forEach(function (card) {
            card.style.minHeight = maxHeight + "px";
          });
        }
      });
    });
  }

  function initHomeProjects() {
    const grid = document.getElementById("home-projects-grid");
    if (!grid) return;

    const allProjects = Array.isArray(window.KIYO_PROJECTS) ? window.KIYO_PROJECTS : [];
    grid.textContent = "";

    if (allProjects.length === 0) {
      const emptyWrap = document.createElement("div");
      emptyWrap.className = "empty-state";
      emptyWrap.style.gridColumn = "1 / -1";
      emptyWrap.style.padding = "48px 24px";
      emptyWrap.innerHTML = `
        <div class="empty-state__icon" style="margin-bottom: 12px;">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </div>
        <p style="color: var(--text-muted); font-size: 0.9375rem;" data-i18n="projects_empty_home">${t("projects_empty_home", "Chưa có dự án nào.")}</p>
      `;
      grid.appendChild(emptyWrap);
      return;
    }

    allProjects.slice(0, 6).forEach(function (project) {
      grid.appendChild(buildProjectCard(project));
    });
    syncCardHeights();
  }

  function initFeaturedProject() {
    const section = document.getElementById("featured-project-section");
    if (section) {
      section.remove();
    }
  }

  let catalogRerender = null;

  function initProjectsCatalog() {
    const catalogGrid = document.getElementById("projects-catalog-grid");
    const searchInput = document.getElementById("project-search");
    const langSelect = document.getElementById("language-filter");
    const categorySelect = document.getElementById("category-filter");
    const statusSelect = document.getElementById("status-filter");
    const countLabel = document.getElementById("projects-count-label");
    const emptyState = document.getElementById("projects-empty-state");
    const resetBtn = document.getElementById("reset-filters-btn");
    const loadMoreWrap = document.getElementById("load-more-wrap");
    const loadMoreBtn = document.getElementById("load-more-btn");

    if (!catalogGrid) return;

    const allProjects = Array.isArray(window.KIYO_PROJECTS) ? window.KIYO_PROJECTS : [];
    const PAGE_SIZE = 6;
    let visibleLimit = PAGE_SIZE;

    const languages = [];
    const categories = [];
    allProjects.forEach(function (p) {
      if (p.language && languages.indexOf(p.language) === -1) {
        languages.push(p.language);
      }
      if (p.category && categories.indexOf(p.category) === -1) {
        categories.push(p.category);
      }
    });

    function populateFilterDropdowns() {
      if (langSelect) {
        const curVal = langSelect.value;
        langSelect.innerHTML = "";
        const allLangOpt = document.createElement("option");
        allLangOpt.value = "all";
        allLangOpt.textContent = t("filter_lang_all", "All Languages");
        langSelect.appendChild(allLangOpt);

        languages.sort().forEach(function (lang) {
          const opt = document.createElement("option");
          opt.value = lang;
          opt.textContent = lang;
          langSelect.appendChild(opt);
        });
        langSelect.value = curVal || "all";
      }

      if (categorySelect) {
        const curCat = categorySelect.value;
        categorySelect.innerHTML = "";
        const allCatOpt = document.createElement("option");
        allCatOpt.value = "all";
        allCatOpt.textContent = t("filter_cat_all", "All Categories");
        categorySelect.appendChild(allCatOpt);

        categories.sort().forEach(function (cat) {
          const opt = document.createElement("option");
          opt.value = cat;
          const sampleProj = allProjects.find(function (p) {
            return p.category === cat;
          });
          const locProj = getProject(sampleProj);
          opt.textContent = (locProj && locProj.category) || cat;
          categorySelect.appendChild(opt);
        });
        categorySelect.value = curCat || "all";
      }

      if (statusSelect) {
        const curStatus = statusSelect.value;
        statusSelect.innerHTML = "";

        const allOpt = document.createElement("option");
        allOpt.value = "all";
        allOpt.textContent = t("filter_status_all", "All Statuses");
        statusSelect.appendChild(allOpt);

        const soonOpt = document.createElement("option");
        soonOpt.value = "Coming soon";
        soonOpt.textContent = t("filter_status_soon", "Coming soon");
        statusSelect.appendChild(soonOpt);

        const sampleOpt = document.createElement("option");
        sampleOpt.value = "Sample";
        sampleOpt.textContent = t("filter_status_sample", "Sample");
        statusSelect.appendChild(sampleOpt);

        const verOpt = document.createElement("option");
        verOpt.value = "Active";
        verOpt.textContent = t("filter_status_verified", "Verified");
        statusSelect.appendChild(verOpt);

        statusSelect.value = curStatus || "all";
      }

      if (searchInput) {
        searchInput.setAttribute("placeholder", t("search_placeholder", "Search projects..."));
      }

      if (resetBtn) {
        resetBtn.textContent = t("projects_reset_btn", "Reset");
      }
    }

    populateFilterDropdowns();

    function getFilteredProjects() {
      const query = searchInput ? searchInput.value.trim().toLowerCase() : "";
      const selectedLang = langSelect ? langSelect.value : "all";
      const selectedCat = categorySelect ? categorySelect.value : "all";
      const selectedStatus = statusSelect ? statusSelect.value : "all";

      return allProjects.filter(function (project) {
        const matchesQuery =
          !query ||
          project.name.toLowerCase().indexOf(query) !== -1 ||
          (project.name_vi && project.name_vi.toLowerCase().indexOf(query) !== -1) ||
          project.description.toLowerCase().indexOf(query) !== -1 ||
          (project.description_vi && project.description_vi.toLowerCase().indexOf(query) !== -1) ||
          (Array.isArray(project.technologies) &&
            project.technologies.some(function (t) {
              return t.toLowerCase().indexOf(query) !== -1;
            }));

        const matchesLang =
          selectedLang === "all" || project.language.indexOf(selectedLang) !== -1;

        const matchesCat =
          selectedCat === "all" || project.category === selectedCat;

        const matchesStatus =
          selectedStatus === "all" ||
          project.status.toLowerCase() === selectedStatus.toLowerCase();

        return matchesQuery && matchesLang && matchesCat && matchesStatus;
      });
    }

    function renderCatalog() {
      const filtered = getFilteredProjects();
      catalogGrid.textContent = "";

      if (filtered.length === 0) {
        catalogGrid.hidden = true;
        if (emptyState) emptyState.hidden = false;
        if (loadMoreWrap) loadMoreWrap.hidden = true;
        if (countLabel) countLabel.textContent = t("projects_count_empty", "0 projects");
        return;
      }

      catalogGrid.hidden = false;
      if (emptyState) emptyState.hidden = true;

      const slice = filtered.slice(0, visibleLimit);
      slice.forEach(function (project) {
        catalogGrid.appendChild(buildProjectCard(project));
      });
      syncCardHeights();

      if (countLabel) {
        const pattern = t("projects_count_paged", "{shown} / {total} projects");
        countLabel.textContent = pattern
          .replace("{shown}", slice.length)
          .replace("{total}", filtered.length);
      }

      if (loadMoreWrap && loadMoreBtn) {
        if (filtered.length > visibleLimit) {
          loadMoreWrap.hidden = false;
          loadMoreBtn.textContent = t("projects_load_more", "Load more");
        } else {
          loadMoreWrap.hidden = true;
        }
      }
    }

    function onFilterChange() {
      visibleLimit = PAGE_SIZE;
      renderCatalog();
    }

    if (searchInput) searchInput.addEventListener("input", onFilterChange);
    if (langSelect) langSelect.addEventListener("change", onFilterChange);
    if (categorySelect) categorySelect.addEventListener("change", onFilterChange);
    if (statusSelect) statusSelect.addEventListener("change", onFilterChange);
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener("click", function () {
        visibleLimit += PAGE_SIZE;
        renderCatalog();
      });
    }
    if (resetBtn) {
      resetBtn.addEventListener("click", function () {
        if (searchInput) searchInput.value = "";
        if (langSelect) langSelect.value = "all";
        if (categorySelect) categorySelect.value = "all";
        if (statusSelect) statusSelect.value = "all";
        visibleLimit = PAGE_SIZE;
        renderCatalog();
        if (searchInput) searchInput.focus();
      });
    }

    catalogRerender = function () {
      populateFilterDropdowns();
      renderCatalog();
    };

    renderCatalog();
  }

  function getRepoCoords(url) {
    if (!url) return null;
    const m = url.match(/github\.com\/([^\/]+)\/([^\/\?\#]+)/);
    if (!m) return null;
    return { owner: m[1], repo: m[2] };
  }

  function resolveMarkdownUrls(text, owner, repo, branch) {
    if (!text) return "";
    const b = branch || "main";
    const rawBase = "https://raw.githubusercontent.com/" + owner + "/" + repo + "/" + b + "/";
    const blobBase = "https://github.com/" + owner + "/" + repo + "/blob/" + b + "/";

    let out = text;

    // Markdown images: ![alt](relative_path)
    out = out.replace(/!\[([^\]]*)\]\((?!https?:\/\/|data:|#|\/)([^)]+)\)/g, function (match, alt, url) {
      const cleanUrl = url.replace(/^\.?\//, "");
      return "![" + alt + "](" + rawBase + cleanUrl + ")";
    });

    // HTML images: <img ... src="relative_path" ...>
    out = out.replace(/<img\b([^>]*?)\bsrc=["'](?!https?:\/\/|data:|#|\/)([^"']+)["']([^>]*?)>/gi, function (match, before, src, after) {
      const cleanSrc = src.replace(/^\.?\//, "");
      return "<img" + before + 'src="' + rawBase + cleanSrc + '"' + after + ">";
    });

    // Markdown links: [text](relative_path)
    out = out.replace(/\[([^\]]+)\]\((?!https?:\/\/|mailto:|#|\/)([^)]+)\)/g, function (match, text, href) {
      const cleanHref = href.replace(/^\.?\//, "");
      return "[" + text + "](" + blobBase + cleanHref + ")";
    });

    // HTML links: <a ... href="relative_path" ...>
    out = out.replace(/<a\b([^>]*?)\bhref=["'](?!https?:\/\/|mailto:|#|\/)([^"']+)["']([^>]*?)>/gi, function (match, before, href, after) {
      const cleanHref = href.replace(/^\.?\//, "");
      return "<a" + before + 'href="' + blobBase + cleanHref + '"' + after + ">";
    });

    return out;
  }

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function hideReadmeLoading() {
    const loadingEl = document.getElementById("detail-readme-loading");
    if (loadingEl) {
      loadingEl.classList.remove("is-active");
      loadingEl.hidden = true;
      loadingEl.style.display = "none";
    }
  }

  function showReadmeLoading() {
    const loadingEl = document.getElementById("detail-readme-loading");
    if (loadingEl) {
      loadingEl.classList.add("is-active");
      loadingEl.hidden = false;
      loadingEl.style.display = "flex";
    }
  }

  function renderReadmeHtml(rawMarkdown, owner, repo, branch) {
    hideReadmeLoading();

    const readmeBlock = document.getElementById("detail-readme-block");
    const readmeEl = document.getElementById("detail-readme");
    const fallbackBlock = document.getElementById("detail-fallback-blocks");

    if (!readmeEl) return;

    if (fallbackBlock) fallbackBlock.hidden = true;
    if (readmeBlock) readmeBlock.hidden = false;

    const resolved = resolveMarkdownUrls(rawMarkdown, owner, repo, branch || "main");

    let html = "";
    if (window.marked && typeof window.marked.parse === "function") {
      try {
        html = window.marked.parse(resolved, { gfm: true, breaks: false });
      } catch (err) {
        html = escapeHtml(resolved).replace(/\n/g, "<br>");
      }
    } else {
      html = escapeHtml(resolved).replace(/\n/g, "<br>");
    }

    readmeEl.innerHTML = html;
  }

  function showReadmeFallback() {
    hideReadmeLoading();

    const readmeBlock = document.getElementById("detail-readme-block");
    if (readmeBlock) readmeBlock.hidden = true;

    const fallbackBlock = document.getElementById("detail-fallback-blocks");
    if (fallbackBlock) fallbackBlock.hidden = false;
  }

  function fetchGitHubRepoData(project) {
    const coords = getRepoCoords(project && project.repository);
    if (!coords) {
      showReadmeFallback();
      return;
    }

    const cacheKey = "kiyo_gh_readme_" + coords.owner + "_" + coords.repo;
    let cached = null;
    try {
      cached = sessionStorage.getItem(cacheKey);
    } catch (e) {}

    if (cached) {
      hideReadmeLoading();
      renderReadmeHtml(cached, coords.owner, coords.repo, "main");
      return;
    }

    const readmeBlock = document.getElementById("detail-readme-block");
    const fallbackBlock = document.getElementById("detail-fallback-blocks");

    if (readmeBlock) readmeBlock.hidden = false;
    if (fallbackBlock) fallbackBlock.hidden = true;
    showReadmeLoading();

    // Strategy 1: GitHub API readme endpoint with raw accept header
    fetch("https://api.github.com/repos/" + coords.owner + "/" + coords.repo + "/readme", {
      headers: { Accept: "application/vnd.github.v3.raw" }
    })
      .then(function (res) {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.text();
      })
      .then(function (markdown) {
        if (markdown && markdown.trim().length > 0) {
          try {
            sessionStorage.setItem(cacheKey, markdown);
          } catch (e) {}
          renderReadmeHtml(markdown, coords.owner, coords.repo, "main");
          return;
        }
        throw new Error("Empty readme");
      })
      .catch(function () {
        // Strategy 2: Fallback to raw.githubusercontent.com candidates
        const candidates = [
          "https://raw.githubusercontent.com/" + coords.owner + "/" + coords.repo + "/main/README.md",
          "https://raw.githubusercontent.com/" + coords.owner + "/" + coords.repo + "/main/ReadMe.md",
          "https://raw.githubusercontent.com/" + coords.owner + "/" + coords.repo + "/main/readme.md",
          "https://raw.githubusercontent.com/" + coords.owner + "/" + coords.repo + "/master/README.md",
          "https://raw.githubusercontent.com/" + coords.owner + "/" + coords.repo + "/master/ReadMe.md"
        ];

        function tryNext(index) {
          if (index >= candidates.length) {
            showReadmeFallback();
            return;
          }
          const url = candidates[index];
          fetch(url)
            .then(function (res) {
              if (!res.ok) throw new Error("HTTP " + res.status);
              return res.text();
            })
            .then(function (text) {
              if (text && text.trim().length > 0) {
                const branch = url.indexOf("/master/") !== -1 ? "master" : "main";
                try {
                  sessionStorage.setItem(cacheKey, text);
                } catch (e) {}
                renderReadmeHtml(text, coords.owner, coords.repo, branch);
              } else {
                tryNext(index + 1);
              }
            })
            .catch(function () {
              tryNext(index + 1);
            });
        }

        tryNext(0);
      });
  }

  let detailRerender = null;

  function initProjectDetail() {
    const detailContainer = document.getElementById("project-detail-view");
    const notFoundContainer = document.getElementById("project-not-found");
    if (!detailContainer || !notFoundContainer) return;

    const params = new URLSearchParams(window.__KIYO_TEST_SEARCH || window.location.search);
    const projectId = params.get("id");
    const allProjects = Array.isArray(window.KIYO_PROJECTS) ? window.KIYO_PROJECTS : [];

    const rawProject = allProjects.find(function (p) {
      return p.id === projectId;
    });

    if (!rawProject) {
      detailContainer.hidden = true;
      notFoundContainer.hidden = false;
      document.title = t("project_not_found_title", "Project Not Found") + " — KIYO";
      return;
    }

    const project = getProject(rawProject);

    detailContainer.hidden = false;
    notFoundContainer.hidden = true;
    document.title = project.name + " — KIYO";

    const breadcrumbName = document.getElementById("detail-breadcrumb-name");
    if (breadcrumbName) breadcrumbName.textContent = project.name;

    const titleEl = document.getElementById("detail-title");
    if (titleEl) titleEl.textContent = project.name;

    const logoEl = document.getElementById("detail-logo");
    if (logoEl) {
      logoEl.innerHTML = getProjectIconSvg(project.iconType, project);
    }

    const statusEl = document.getElementById("detail-status-badge");
    if (statusEl) {
      statusEl.textContent = project.status;
    }

    const actionsEl = document.getElementById("detail-header-actions");
    if (actionsEl) {
      actionsEl.textContent = "";

      const repoBtn = document.createElement("a");
      repoBtn.className = "card-btn";
      repoBtn.href =
        project.repository && project.repository.trim() !== ""
          ? project.repository
          : (window.KIYO_CONFIG && window.KIYO_CONFIG.githubOrgUrl) ||
            "https://github.com/kiyogo";
      repoBtn.target = "_blank";
      repoBtn.rel = "noopener noreferrer";
      repoBtn.textContent = "GitHub";
      actionsEl.appendChild(repoBtn);

      if (project.website) {
        const webBtn = document.createElement("a");
        webBtn.className = "card-btn";
        webBtn.href = project.website;
        webBtn.target = "_blank";
        webBtn.rel = "noopener noreferrer";
        webBtn.textContent = t("button2_text_en", "Website");
        actionsEl.appendChild(webBtn);
      }

      if (project.documentation) {
        const docBtn = document.createElement("a");
        docBtn.className = "card-btn";
        docBtn.href = project.documentation;
        docBtn.target = "_blank";
        docBtn.rel = "noopener noreferrer";
        docBtn.textContent = t("detail_btn_docs", "Docs");
        actionsEl.appendChild(docBtn);
      }
    }

    const overviewEl = document.getElementById("detail-overview");
    if (overviewEl) {
      overviewEl.textContent = project.overview || project.description;
    }

    const featuresBlock = document.getElementById("detail-features-block");
    const featuresList = document.getElementById("detail-features-list");
    if (featuresBlock && featuresList) {
      if (Array.isArray(project.features) && project.features.length > 0) {
        featuresBlock.hidden = false;
        featuresList.textContent = "";
        project.features.forEach(function (feat) {
          const li = document.createElement("li");
          const span = document.createElement("span");
          span.textContent = feat;
          li.appendChild(span);
          featuresList.appendChild(li);
        });
      } else {
        featuresBlock.hidden = true;
      }
    }

    const gettingStartedBlock = document.getElementById("detail-getting-started-block");
    const gettingStartedCode = document.getElementById("detail-getting-started-code");
    if (gettingStartedBlock && gettingStartedCode) {
      if (project.gettingStarted) {
        gettingStartedBlock.hidden = false;
        gettingStartedCode.textContent = project.gettingStarted;
      } else {
        gettingStartedBlock.hidden = true;
      }
    }

    fetchGitHubRepoData(project);

    const langVal = document.getElementById("sidebar-language");
    if (langVal) langVal.textContent = project.language || "—";

    const catVal = document.getElementById("sidebar-category");
    if (catVal) catVal.textContent = project.category || "—";

    const statusVal = document.getElementById("sidebar-status");
    if (statusVal) statusVal.textContent = project.status || "Active";

    const licenseVal = document.getElementById("sidebar-license");
    if (licenseVal) licenseVal.textContent = project.license || "Apache-2.0";

    const repoVal = document.getElementById("sidebar-repo");
    if (repoVal) {
      if (project.repository) {
        const repoDisplay = project.repository.replace(/^https?:\/\/(www\.)?github\.com\//, "");
        repoVal.innerHTML = '<a href="' + project.repository + '" target="_blank" rel="noopener noreferrer" style="color: var(--accent); text-decoration: underline;">' + repoDisplay + "</a>";
      } else {
        repoVal.textContent = "—";
      }
    }

    const techContainer = document.getElementById("sidebar-technologies");
    if (techContainer) {
      techContainer.textContent = "";
      const techs = Array.isArray(project.technologies) ? project.technologies : [];
      techs.forEach(function (t) {
        const tag = document.createElement("span");
        tag.className = "tech-tag";
        tag.textContent = t;
        techContainer.appendChild(tag);
      });
    }

    detailRerender = function () {
      initProjectDetail();
    };
  }

  // Listen to language switch events
  window.addEventListener("kiyo:langchange", function () {
    initHomeProjects();
    initFeaturedProject();
    if (typeof catalogRerender === "function") {
      catalogRerender();
    }
    if (typeof detailRerender === "function") {
      detailRerender();
    }
    syncCardHeights();
  });

  // Re-synchronize card heights only when screen width actually changes (ignore mobile address bar scroll resize)
  let lastWindowWidth = typeof window !== "undefined" ? window.innerWidth : 0;
  let resizeTimer = null;
  window.addEventListener("resize", function () {
    if (window.innerWidth === lastWindowWidth) {
      return;
    }
    lastWindowWidth = window.innerWidth;
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      syncCardHeights();
    }, 100);
  });

  window.addEventListener("load", function () {
    syncCardHeights();
  });

  /**
   * Probes candidate SVG logo URLs for a repository.
   * If an SVG is found, returns its URL.
   */
  async function detectRepoSvgLogo(repoName, branch) {
    const br = branch || "main";
    const nameLower = repoName.toLowerCase();

    // Check if we have a bundled local icon first
    const localIcon = `assets/icons/projects/${nameLower}.svg`;
    try {
      const res = await fetch(localIcon, { method: "HEAD" });
      if (res.ok) return localIcon;
    } catch (e) {}

    const candidates = [
      `https://raw.githubusercontent.com/kiyogo/${repoName}/${br}/logo.svg`,
      `https://raw.githubusercontent.com/kiyogo/${repoName}/${br}/assets/logo.svg`,
      `https://raw.githubusercontent.com/kiyogo/${repoName}/${br}/assets/icons/logo.svg`,
      `https://raw.githubusercontent.com/kiyogo/${repoName}/${br}/public/assets/logo.svg`,
      `https://raw.githubusercontent.com/kiyogo/${repoName}/${br}/public/logo.svg`
    ];

    for (const url of candidates) {
      try {
        const res = await fetch(url, { method: "HEAD" });
        if (res.ok) {
          return url;
        }
      } catch (e) {}
    }
    return `assets/icons/projects/${nameLower}.svg`;
  }

  /**
   * Real-time GitHub Synchronizer:
   * Dynamically fetches all repositories from https://github.com/kiyogo,
   * auto-discovers .svg logos, merges them into KIYO_PROJECTS, and updates the UI live.
   */
  async function syncProjectsFromGitHub() {
    const GITHUB_API_URL = "https://api.github.com/users/kiyogo/repos?sort=updated&per_page=100";
    try {
      const res = await fetch(GITHUB_API_URL, {
        headers: { Accept: "application/vnd.github.v3+json" }
      });
      if (!res.ok) return;

      const repos = await res.json();
      if (!Array.isArray(repos)) return;

      const softwareRepos = repos.filter(function (r) {
        return r && r.name && r.name !== ".github" && !r.fork && r.name.toLowerCase() !== "kiyogo";
      });

      let currentList = Array.isArray(window.KIYO_PROJECTS) ? [...window.KIYO_PROJECTS] : [];
      let hasChanges = false;

      for (const repo of softwareRepos) {
        const repoNameLower = repo.name.toLowerCase();
        let existingIndex = currentList.findIndex(function (p) {
          return (p.id && p.id.toLowerCase() === repoNameLower) || (p.name && p.name.toLowerCase() === repoNameLower);
        });

        const detectedLogo = await detectRepoSvgLogo(repo.name, repo.default_branch);

        if (existingIndex !== -1) {
          const p = currentList[existingIndex];
          if (repo.description && (!p.description || p.description.length < repo.description.length)) {
            p.description = repo.description;
            hasChanges = true;
          }
          p.stars = repo.stargazers_count;
          p.forks = repo.forks_count;
          p.repository = repo.html_url;
          if (repo.homepage) p.website = repo.homepage;
          if (detectedLogo && (!p.logo || p.logo !== detectedLogo)) {
            p.logo = detectedLogo;
            hasChanges = true;
          }
        } else {
          // Auto-add new repository
          const newProject = {
            id: repoNameLower,
            name: repo.name,
            name_vi: repo.name,
            description: repo.description || "Open source project from KIYO",
            description_vi: repo.description || "Dự án mã nguồn mở từ KIYO",
            overview: repo.description || "Open source project from KIYO",
            overview_vi: repo.description || "Dự án mã nguồn mở từ KIYO",
            category: repo.topics && repo.topics.length ? repo.topics[0] : "Open Source",
            category_vi: repo.topics && repo.topics.length ? repo.topics[0] : "Mã nguồn mở",
            language: repo.language || "Open Source",
            language_vi: repo.language || "Mã nguồn mở",
            status: "verified",
            status_vi: "Đã phát hành",
            iconType: repoNameLower,
            logo: detectedLogo,
            repository: repo.html_url,
            website: repo.homepage || repo.html_url,
            documentation: `${repo.html_url}#readme`,
            license: repo.license ? repo.license.spdx_id || repo.license.name : "MIT",
            technologies: repo.topics && repo.topics.length ? repo.topics : [repo.language || "Open Source"],
            features: [repo.description || "High-performance open-source project from KIYO"],
            features_vi: [repo.description || "Dự án mã nguồn mở hiệu năng cao từ KIYO"],
            gettingStarted: `git clone ${repo.html_url}.git\ncd ${repo.name}`,
            button1_text_en: "Details",
            button1_text_vi: "Chi tiết",
            button2_text_en: "GitHub",
            button2_text_vi: "GitHub",
            button2_url: repo.html_url
          };
          currentList.push(newProject);
          hasChanges = true;
        }
      }

      window.KIYO_PROJECTS = currentList;
      try {
        localStorage.setItem("kiyo_synced_projects", JSON.stringify(currentList));
      } catch (e) {}

      // Live re-render
      initHomeProjects();
      if (typeof catalogRerender === "function") {
        catalogRerender();
      }
      if (typeof detailRerender === "function") {
        detailRerender();
      }
      syncCardHeights();
    } catch (err) {
      console.warn("GitHub dynamic sync notice:", err);
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    initHomeProjects();
    initFeaturedProject();
    initProjectsCatalog();
    initProjectDetail();
    syncCardHeights();
    // Auto sync live projects & SVG logos from GitHub
    syncProjectsFromGitHub();
  });
})();
