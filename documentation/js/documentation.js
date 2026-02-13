/* ========================================
   CHATFORGE AI - DOCUMENTATION JS
   Premium AI Chatbot Template v1.0.0
   Design By PriHarsh Design ✦
   ======================================== */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // ---------- THEME TOGGLE (DARK/LIGHT) ----------
  function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;

    if (!themeToggle) return;

    themeToggle.addEventListener('click', function () {
      const icon = this.querySelector('i');
      const currentTheme = html.getAttribute('data-theme');

      if (currentTheme === 'dark') {
        html.setAttribute('data-theme', 'light');
        if (icon) {
          icon.classList.remove('ri-moon-line');
          icon.classList.add('ri-sun-line');
        }
      } else {
        html.setAttribute('data-theme', 'dark');
        if (icon) {
          icon.classList.remove('ri-sun-line');
          icon.classList.add('ri-moon-line');
        }
      }
    });
  }

  // ---------- MOBILE SIDEBAR TOGGLE ----------
  function initMobileSidebar() {
    const sidebar = document.querySelector('.doc-sidebar');
    if (!sidebar) return;

    // Create toggle button
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'doc-sidebar-toggle';
    toggleBtn.innerHTML = '<i class="ri-menu-line"></i>';
    toggleBtn.setAttribute('aria-label', 'Toggle Menu');
    document.body.appendChild(toggleBtn);

    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'doc-overlay';
    document.body.appendChild(overlay);

    // Toggle sidebar function
    function toggleSidebar(show) {
      if (show) {
        sidebar.classList.add('active');
        overlay.classList.add('active');
        toggleBtn.innerHTML = '<i class="ri-close-line"></i>';
      } else {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        toggleBtn.innerHTML = '<i class="ri-menu-line"></i>';
      }
    }

    // Toggle button click
    toggleBtn.addEventListener('click', function (e) {
      e.preventDefault();
      const isActive = sidebar.classList.contains('active');
      toggleSidebar(!isActive);
    });

    // Overlay click
    overlay.addEventListener('click', function () {
      toggleSidebar(false);
    });

    // Close sidebar on nav link click (mobile only)
    const navLinks = document.querySelectorAll('.doc-nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', function () {
        if (window.innerWidth <= 992) {
          toggleSidebar(false);
        }
      });
    });

    // Close sidebar on escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && sidebar.classList.contains('active')) {
        toggleSidebar(false);
      }
    });

    // Handle window resize
    window.addEventListener('resize', function () {
      if (window.innerWidth > 992 && sidebar.classList.contains('active')) {
        toggleSidebar(false);
      }
    });
  }

  // ---------- ACTIVE NAV LINK ON SCROLL ----------
  function initActiveNav() {
    const sections = document.querySelectorAll('.doc-section[id]');
    const navLinks = document.querySelectorAll('.doc-nav-link');

    if (!sections.length || !navLinks.length) return;

    function updateActiveNav() {
      let current = '';
      const scrollPosition = window.scrollY + 100;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${current}`) {
          link.classList.add('active');
        }
      });
    }

    window.addEventListener('scroll', updateActiveNav);
    window.addEventListener('load', updateActiveNav);
  }

  // ---------- SMOOTH SCROLL ----------
  function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.doc-nav-link[href^="#"]');

    navLinks.forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (!target) return;

        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

        // Update URL without jumping
        history.pushState(null, null, targetId);
      });
    });
  }

  // ---------- COPY CODE BLOCKS ----------
  window.copyCode = function (button) {
    const codeBlock = button.closest('.doc-code').querySelector('pre');
    if (!codeBlock) return;

    const text = codeBlock.innerText || codeBlock.textContent;

    // Copy to clipboard
    navigator.clipboard.writeText(text).then(() => {
      // Show success state
      const originalText = button.textContent;
      button.textContent = 'Copied!';
      button.classList.add('copied');

      // Reset button
      setTimeout(() => {
        button.textContent = 'Copy';
        button.classList.remove('copied');
      }, 2000);
    }).catch(err => {
      console.error('Copy failed:', err);
      button.textContent = 'Error!';

      setTimeout(() => {
        button.textContent = 'Copy';
      }, 2000);
    });
  };

  // ---------- INITIALIZE ALL FUNCTIONS ----------
  initThemeToggle();
  initMobileSidebar();
  initActiveNav();
  initSmoothScroll();

  console.log('📘 ChatForge AI Documentation - JS Loaded ✅');
});

// ---------- FALLBACK FOR OLD BROWSERS ----------
if (!window.navigator.clipboard) {
  window.copyCode = function (button) {
    const codeBlock = button.closest('.doc-code').querySelector('pre');
    const text = codeBlock.innerText || codeBlock.textContent;

    // Fallback method
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    button.textContent = 'Copied!';
    setTimeout(() => {
      button.textContent = 'Copy';
    }, 2000);
  };
}