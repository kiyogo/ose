/**
 * KIYO Open Source — Core UI & Interaction Logic (assets/js/main.js)
 * Handles:
 * - Light/Dark theme persistence and toggle
 * - Sticky header scroll state
 * - Accessible mobile menu drawer
 * - Back-to-top smooth navigation
 * - Subtle section reveal via IntersectionObserver (respecting reduced motion)
 * - 404 diagnostic path display
 */

(function () {
  "use strict";

  const THEME_STORAGE_KEY = "kiyo-opensource-theme";

  /**
   * 1. Theme Management (Light mode default, Dark mode toggle)
   */
  function getInitialTheme() {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === "dark" || saved === "light") {
        return saved;
      }
    } catch (e) {
      /* Ignore storage access errors in strict file:// environments */
    }
    return "light";
  }

  function applyTheme(theme) {
    const root = document.documentElement;
    if (theme === "dark") {
      root.setAttribute("data-theme", "dark");
    } else {
      root.removeAttribute("data-theme");
    }

    const toggleBtns = document.querySelectorAll("[data-theme-toggle]");
    toggleBtns.forEach(function (btn) {
      const isDark = theme === "dark";
      btn.setAttribute("aria-pressed", String(isDark));
      btn.setAttribute(
        "aria-label",
        isDark ? "Switch to light theme" : "Switch to dark theme"
      );
      btn.setAttribute(
        "title",
        isDark ? "Switch to light theme" : "Switch to dark theme"
      );
    });
  }

  function initTheme() {
    const currentTheme = getInitialTheme();
    applyTheme(currentTheme);

    const toggleBtns = document.querySelectorAll("[data-theme-toggle]");
    toggleBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        const isDark = document.documentElement.getAttribute("data-theme") === "dark";
        const nextTheme = isDark ? "light" : "dark";
        applyTheme(nextTheme);
        try {
          localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
        } catch (e) {
          /* Ignore storage errors */
        }
      });
    });
  }

  /**
   * 2. Sticky Header Scroll State (Smooth RAF throttled & jitter-free)
   */
  function initStickyHeader() {
    const header = document.querySelector(".site-header");
    if (!header) return;

    let ticking = false;
    let isScrolled = false;

    function updateHeader() {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
      
      if (!isScrolled && scrollY > 20) {
        isScrolled = true;
        header.classList.add("is-scrolled");
      } else if (isScrolled && scrollY <= 0) {
        isScrolled = false;
        header.classList.remove("is-scrolled");
      }
      ticking = false;
    }

    window.addEventListener("scroll", function () {
      if (!ticking) {
        window.requestAnimationFrame(updateHeader);
        ticking = true;
      }
    }, { passive: true });

    updateHeader();
  }

  /**
   * 3. Accessible Mobile Navigation Drawer
   */
  function initMobileMenu() {
    const menuBtn = document.getElementById("mobile-menu-btn");
    const mobileDrawer = document.getElementById("mobile-nav-drawer");
    if (!menuBtn || !mobileDrawer) return;

    function closeMobileMenu() {
      mobileDrawer.classList.remove("is-open");
      menuBtn.setAttribute("aria-expanded", "false");
    }

    function toggleMobileMenu() {
      const isOpen = mobileDrawer.classList.toggle("is-open");
      menuBtn.setAttribute("aria-expanded", String(isOpen));
    }

    menuBtn.addEventListener("click", toggleMobileMenu);

    /* Close when clicking a link inside mobile drawer */
    const drawerLinks = mobileDrawer.querySelectorAll("a");
    drawerLinks.forEach(function (link) {
      link.addEventListener("click", closeMobileMenu);
    });

    /* Close on Escape key */
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && mobileDrawer.classList.contains("is-open")) {
        closeMobileMenu();
        menuBtn.focus();
      }
    });

    /* Close if viewport resizes above tablet breakpoint */
    window.addEventListener("resize", function () {
      if (window.innerWidth > 768 && mobileDrawer.classList.contains("is-open")) {
        closeMobileMenu();
      }
    });
  }

  /**
   * 4. Back to Top Button
   */
  function initBackToTop() {
    const backToTopBtn = document.getElementById("back-to-top");
    if (!backToTopBtn) return;

    backToTopBtn.addEventListener("click", function (event) {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /**
   * 5. Subtle Section Reveal (IntersectionObserver)
   */
  function initRevealAnimations() {
    const revealNodes = document.querySelectorAll(".reveal");
    if (!revealNodes.length) return;

    const prefersReducedMotion =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      revealNodes.forEach(function (node) {
        node.classList.add("is-visible");
      });
      return;
    }

    const observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -32px 0px",
        threshold: 0.08
      }
    );

    revealNodes.forEach(function (node) {
      observer.observe(node);
    });
  }

  /**
   * 6. 404 Page Requested Path Display
   */
  function init404PathDisplay() {
    const pathEl = document.getElementById("not-found-path");
    if (!pathEl) return;
    const currentPath = window.location.pathname || "/unknown";
    pathEl.textContent = currentPath;
  }

  /* Apply theme immediately to prevent flash, then bind DOM listeners */
  applyTheme(getInitialTheme());

  document.addEventListener("DOMContentLoaded", function () {
    initTheme();
    initStickyHeader();
    initMobileMenu();
    initBackToTop();
    initRevealAnimations();
    init404PathDisplay();
  });
})();
