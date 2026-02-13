// ========================================
// 🚀 CHATFORGE AI - MAIN APP JS
// ========================================

// ---------- HEADER SCROLL EFFECT ----------
function initHeaderScroll() {
	const header = document.querySelector('.chatforge-header');
	if (!header) return;

	window.addEventListener('scroll', function () {
		if (window.scrollY > 50) {
			header.classList.add('scrolled');
		} else {
			header.classList.remove('scrolled');
		}
	});
}

// ---------- THEME TOGGLE (DARK/LIGHT) ----------
function initThemeToggle() {
	const desktopToggle = document.getElementById('themeToggleDesktop');
	const mobileToggle = document.getElementById('themeToggleMobile');

	function toggleTheme(clickedToggle) {
		const html = document.documentElement;
		const currentTheme = html.getAttribute('data-theme');
		const desktopIcon = desktopToggle?.querySelector('i');
		const mobileIcon = mobileToggle?.querySelector('i');

		if (currentTheme === 'dark') {
			// Switch to Light
			html.setAttribute('data-theme', 'light');

			if (desktopIcon) {
				desktopIcon.classList.remove('ri-moon-line');
				desktopIcon.classList.add('ri-sun-line');
			}
			if (mobileIcon) {
				mobileIcon.classList.remove('ri-moon-line');
				mobileIcon.classList.add('ri-sun-line');
			}
		} else {
			// Switch to Dark
			html.setAttribute('data-theme', 'dark');

			if (desktopIcon) {
				desktopIcon.classList.remove('ri-sun-line');
				desktopIcon.classList.add('ri-moon-line');
			}
			if (mobileIcon) {
				mobileIcon.classList.remove('ri-sun-line');
				mobileIcon.classList.add('ri-moon-line');
			}
		}
	}

	// Add event listeners
	if (desktopToggle) {
		desktopToggle.addEventListener('click', function (e) {
			e.preventDefault();
			toggleTheme(this);
		});
	}

	if (mobileToggle) {
		mobileToggle.addEventListener('click', function (e) {
			e.preventDefault();
			toggleTheme(this);
		});
	}
}

// ---------- ACTIVE NAV LINK ON SCROLL ----------
function initActiveNav() {
	const sections = document.querySelectorAll('section[id]');
	const navLinks = document.querySelectorAll('.nav-link');

	if (!sections.length || !navLinks.length) return;

	window.addEventListener('scroll', function () {
		let current = '';
		const scrollPosition = window.scrollY + 120; // Offset for header

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
			if (href === `#${current}` || (current === '' && href === '#home')) {
				link.classList.add('active');
			}
		});
	});
}

// ---------- CLOSE MOBILE MENU ON LINK CLICK ----------
function initMobileMenuClose() {
	const navbarCollapse = document.getElementById('navbarMain');
	const navLinks = document.querySelectorAll('.nav-link');

	if (!navbarCollapse || !navLinks.length) return;

	navLinks.forEach(link => {
		link.addEventListener('click', function (e) {
			if (navbarCollapse.classList.contains('show')) {
				// Bootstrap 5 collapse toggle
				const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
				if (bsCollapse) {
					bsCollapse.hide();
				} else {
					navbarCollapse.classList.remove('show');
				}
			}
		});
	});
}

// ---------- SMOOTH SCROLL FOR ANCHOR LINKS ----------
function initSmoothScroll() {
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			const href = this.getAttribute('href');

			if (href !== '#') {
				e.preventDefault();
				const target = document.querySelector(href);

				if (target) {
					target.scrollIntoView({
						behavior: 'smooth',
						block: 'start'
					});
				}
			}
		});
	});
}

// ---------- AOS ANIMATION INIT ----------
function initAOS() {
	if (typeof AOS !== 'undefined') {
		AOS.init({
			duration: 600,
			once: true,
			offset: 50,
			easing: 'ease-out-cubic'
		});
	}
}

// ---------- FEATURE CARDS HOVER EFFECT (Optional) ----------
function initFeatureCards() {
	const cards = document.querySelectorAll('.feature-card');

	cards.forEach(card => {
		card.addEventListener('mouseenter', function () {
			this.style.transform = 'translateY(-5px)';
		});

		card.addEventListener('mouseleave', function () {
			this.style.transform = 'translateY(0)';
		});
	});
}

// ---------- INITIALIZE ALL FUNCTIONS ----------
document.addEventListener('DOMContentLoaded', function () {
	initHeaderScroll();
	initThemeToggle();
	initActiveNav();
	initMobileMenuClose();
	initSmoothScroll();
	initAOS();
	initFeatureCards();

	console.log('ChatForge AI - JS Loaded ✅');
});

// Billing Toggle Script
document.addEventListener('DOMContentLoaded', function () {
	const toggle = document.getElementById('billingToggle');
	const monthlyOption = document.querySelector('.billing-option:first-child');
	const annualOption = document.querySelector('.billing-option:last-child');

	toggle.addEventListener('click', function () {
		this.classList.toggle('active');

		if (this.classList.contains('active')) {
			monthlyOption.classList.remove('active');
			annualOption.classList.add('active');
			// Update prices to annual
			updatePrices('annual');
		} else {
			monthlyOption.classList.add('active');
			annualOption.classList.remove('active');
			// Update prices to monthly
			updatePrices('monthly');
		}
	});

	function updatePrices(period) {
		const starterPrice = document.querySelector('.pricing-card.popular .amount');
		const proPrice = document.querySelectorAll('.pricing-card')[2].querySelector('.amount');

		if (period === 'annual') {
			if (starterPrice) starterPrice.textContent = '15';
			if (proPrice) proPrice.textContent = '39';
		} else {
			if (starterPrice) starterPrice.textContent = '19';
			if (proPrice) proPrice.textContent = '49';
		}
	}
});
// FAQ Accordion Toggle Function
    function toggleFaq(element) {
      const faqItem = element.closest('.faq-item');
      const answer = faqItem.querySelector('.faq-answer');
      const icon = element.querySelector('i');
      
      // Close other open FAQs
      document.querySelectorAll('.faq-item.active').forEach(item => {
        if (item !== faqItem) {
          item.classList.remove('active');
          item.querySelector('.faq-answer').classList.remove('show');
          item.querySelector('.faq-question i').classList.remove('ri-subtract-line');
          item.querySelector('.faq-question i').classList.add('ri-add-line');
        }
      });
      
      // Toggle current FAQ
      faqItem.classList.toggle('active');
      answer.classList.toggle('show');
      
      if (faqItem.classList.contains('active')) {
        icon.classList.remove('ri-add-line');
        icon.classList.add('ri-subtract-line');
      } else {
        icon.classList.remove('ri-subtract-line');
        icon.classList.add('ri-add-line');
      }
    }
// ---------- WINDOW LOAD (For any after-load tasks) ----------
window.addEventListener('load', function () {
	// Preloader hide (if any)
	// Additional init if needed
});