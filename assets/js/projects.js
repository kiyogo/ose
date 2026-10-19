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
   * Pure vector SVG / image logo rendering with NO background box
   * If the project has no logo on GitHub, strictly returns empty string ""
   */
  function getProjectIconSvg(iconType, project) {
    if (!project) return "";

    // 1. Cleaned direct inline SVG (without background canvas box)
    if (typeof project.logoSvg === "string" && project.logoSvg.trim().startsWith("<svg")) {
      return project.logoSvg;
    }

    // 2. Direct logo URL (SVG / PNG)
    const logoUrl = project.logo || project.logoUrl;
    if (logoUrl) {
      return `<img src="${logoUrl}" alt="${project.name || 'Project'}" width="48" height="48" style="width: 48px; height: 48px; object-fit: contain; display: block; background: transparent !important; border: none !important; box-shadow: none !important;" onerror="this.onerror=null; if(this.parentElement) this.parentElement.style.display='none';">`;
    }

    // 3. STRICT: No logo on GitHub -> return empty string!
    return "";
  }

  /**
   * Build project card:
   * - Flat transparent card, no border, no shadow
   * - App Icon directly above title (only rendered if the project has a logo on GitHub!)
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

    // Direct App Icon (Only added if the project actually has a logo on GitHub!)
    const hasLogo = Boolean(project.logoSvg || project.logo);
    if (hasLogo) {
      const iconWrap = document.createElement("div");
      iconWrap.className = "project-card__icon";
      iconWrap.innerHTML = getProjectIconSvg(project.iconType, project);
      article.appendChild(iconWrap);
    }

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
      if (project.logoSvg || project.logo) {
        logoEl.style.display = "inline-flex";
        logoEl.innerHTML = getProjectIconSvg(project.iconType, project);
      } else {
        logoEl.style.display = "none";
        logoEl.innerHTML = "";
      }
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
   * Formats raw SVG for 48x48 display while preserving 100% of the SVG elements,
   * including any background squircle or canvas as designed on GitHub.
   */
  function formatSvgForDisplay(svgText) {
    if (!svgText || typeof svgText !== "string") return "";
    return svgText.replace(/<svg\b([^>]*?)>/i, function (match, attrs) {
      let mod = attrs.replace(/\bwidth=["'][^"']*?["']/gi, 'width="48"').replace(/\bheight=["'][^"']*?["']/gi, 'height="48"');
      if (!/width=/i.test(mod)) mod += ' width="48"';
      if (!/height=/i.test(mod)) mod += ' height="48"';
      return `<svg ${mod} style="display: block; width: 48px; height: 48px; object-fit: contain;">`;
    });
  }

  /**
   * Probes candidate SVG logo URLs on GitHub raw CDN for a repository.
   * If an SVG is found, fetches and returns its raw SVG code as-is from GitHub.
   * If NO SVG logo exists on GitHub, strictly returns null.
   */
  async function detectAndFetchRepoSvgLogo(repoName, branch) {
    const br = branch || "main";
    const nameLower = repoName.toLowerCase();

    // Check GitHub raw CDN candidates
    const candidates = [
      `https://raw.githubusercontent.com/kiyogo/${repoName}/${br}/logo.svg`,
      `https://raw.githubusercontent.com/kiyogo/${repoName}/${br}/assets/logo.svg`,
      `https://raw.githubusercontent.com/kiyogo/${repoName}/${br}/public/assets/logo.svg`,
      `https://raw.githubusercontent.com/kiyogo/${repoName}/${br}/docs/logo.svg`,
      `https://raw.githubusercontent.com/kiyogo/${repoName}/${br}/icon.svg`,
      `https://raw.githubusercontent.com/kiyogo/${repoName}/${br}/assets/icon.svg`
    ];

    for (const url of candidates) {
      try {
        const res = await fetch(url);
        if (res.ok) {
          const text = await res.text();
          if (text && text.includes("<svg")) {
            return {
              url: url,
              svg: formatSvgForDisplay(text)
            };
          }
        }
      } catch (e) {}
    }

    // Check bundled local icons (only for repos that have an official logo)
    if (nameLower !== "nom") {
      const localIcon = `assets/icons/projects/${nameLower}.svg`;
      try {
        const res = await fetch(localIcon);
        if (res.ok) {
          const text = await res.text();
          if (text && text.includes("<svg")) {
            return {
              url: localIcon,
              svg: formatSvgForDisplay(text)
            };
          }
        }
      } catch (e) {}
    }

    // STRICT: No logo found on GitHub -> return null
    return null;
  }

  /**
   * Real-time GitHub Synchronizer:
   * Dynamically queries all repositories of https://github.com/kiyogo:
   * - Automatically adds new projects added on GitHub
   * - Automatically updates renamed projects
   * - Automatically prunes deleted projects
   * - Auto-detects .svg logos directly from GitHub with zero background box
   * - If no logo on GitHub, strictly shows NO logo on the web
   */
  async function syncProjectsFromGitHub() {
    const GITHUB_API_URL = "https://api.github.com/users/kiyogo/repos?sort=updated&per_page=100";
    try {
      let repos = [];
      try {
        const res = await fetch(GITHUB_API_URL, {
          headers: { Accept: "application/vnd.github.v3+json" }
        });
        if (res.ok) {
          repos = await res.json();
        }
      } catch (e) {
        console.warn("Primary GitHub API fetch failed, trying orgs endpoint:", e);
      }

      if (!Array.isArray(repos) || repos.length === 0) {
        try {
          const res2 = await fetch("https://api.github.com/orgs/kiyogo/repos?sort=updated&per_page=100", {
            headers: { Accept: "application/vnd.github.v3+json" }
          });
          if (res2.ok) {
            repos = await res2.json();
          }
        } catch (e2) {}
      }

      if (!Array.isArray(repos) || repos.length === 0) {
        return; // Offline or rate limited, keep current state
      }

      // Filter out internal metadata repos (.github, etc.)
      const softwareRepos = repos.filter(function (r) {
        return r && r.name && !r.name.startsWith(".") && !r.fork && r.name.toLowerCase() !== "kiyogo";
      });

      // Build dictionary of base / rich details from defaultProjects & KIYO_PROJECTS
      const baseMap = new Map();
      if (typeof defaultProjects !== "undefined" && Array.isArray(defaultProjects)) {
        defaultProjects.forEach(function (p) {
          if (p.id) baseMap.set(p.id.toLowerCase(), p);
          if (p.name) baseMap.set(p.name.toLowerCase(), p);
        });
      }
      if (Array.isArray(window.KIYO_PROJECTS)) {
        window.KIYO_PROJECTS.forEach(function (p) {
          const key = (p.id || p.name || "").toLowerCase();
          if (key && !baseMap.has(key)) baseMap.set(key, p);
        });
      }

      // Build synced projects strictly from softwareRepos:
      // - Deleted repos on GitHub -> naturally pruned (disappear from web!)
      // - Renamed repos on GitHub -> updated with new repo.name!
      // - Added repos on GitHub -> automatically added to the list!
      const syncedList = [];

      for (const repo of softwareRepos) {
        const repoNameLower = repo.name.toLowerCase();
        const base = baseMap.get(repoNameLower) || {};

        // Probe GitHub for actual SVG logo in the repo
        const logoData = await detectAndFetchRepoSvgLogo(repo.name, repo.default_branch || "main");

        const displayName = base.name || (repo.name.charAt(0).toUpperCase() + repo.name.slice(1));

        const project = {
          ...base,
          id: repoNameLower,
          name: displayName,
          name_vi: base.name_vi || displayName,
          description: repo.description || base.description || "Open source project from KIYO",
          description_vi: base.description_vi || repo.description || base.description || "Dự án mã nguồn mở từ KIYO",
          overview: base.overview || repo.description || "Open source project from KIYO",
          overview_vi: base.overview_vi || repo.description || "Dự án mã nguồn mở từ KIYO",
          category: (repo.topics && repo.topics.length) ? repo.topics[0] : (base.category || "Open Source"),
          category_vi: base.category_vi || ((repo.topics && repo.topics.length) ? repo.topics[0] : "Mã nguồn mở"),
          language: repo.language || base.language || "Open Source",
          language_vi: base.language_vi || repo.language || "Mã nguồn mở",
          status: base.status || "verified",
          status_vi: base.status_vi || "Đã phát hành",
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          repository: repo.html_url,
          website: repo.homepage || base.website || repo.html_url,
          documentation: `${repo.html_url}#readme`,
          license: repo.license ? (repo.license.spdx_id || repo.license.name) : (base.license || "MIT"),
          technologies: (repo.topics && repo.topics.length) ? repo.topics : (base.technologies || [repo.language || "Open Source"]),
          features: base.features || [repo.description || "High-performance open-source project from KIYO"],
          features_vi: base.features_vi || [repo.description || "Dự án mã nguồn mở hiệu năng cao từ KIYO"],
          gettingStarted: base.gettingStarted || `git clone ${repo.html_url}.git\ncd ${repo.name}`,
          button1_text_en: "Details",
          button1_text_vi: "Chi tiết",
          button2_text_en: "GitHub",
          button2_text_vi: "GitHub",
          button2_url: repo.html_url,
          // STRICT LOGO RULE:
          // If GitHub has an SVG logo, use it (cleaned of any background canvas)
          // If GitHub does NOT have an SVG logo, strictly set to null!
          logo: logoData ? logoData.url : (base.logo && !base.logo.includes("nom") ? base.logo : null),
          logoSvg: logoData ? logoData.svg : null
        };

        syncedList.push(project);
      }

      window.KIYO_PROJECTS = syncedList;
      try {
        localStorage.setItem("kiyo_synced_projects", JSON.stringify(syncedList));
      } catch (e) {}

      // Dynamically re-render all project views
      initHomeProjects();
      if (typeof catalogRerender === "function") catalogRerender();
      if (typeof detailRerender === "function") detailRerender();
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
