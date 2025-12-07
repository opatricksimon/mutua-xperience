/* ============================================
   EXPEDIÇÕES 2026 - SCRIPT.JS
   Interatividade e Animações
   ============================================ */

// ============================================
// DOM ELEMENTS
// ============================================
const navbar = document.getElementById('navbar');
const navbarToggle = document.getElementById('navbarToggle');
const mobileMenu = document.getElementById('mobileMenu');
const scrollProgress = document.getElementById('scrollProgress');
const heroMouseGlow = document.getElementById('heroMouseGlow');
const hero = document.getElementById('hero');
const backToTopBtn = document.getElementById('backToTop');

// ============================================
// SCROLL PROGRESS BAR
// ============================================
function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  
  if (scrollProgress) {
    scrollProgress.style.width = scrollPercent + '%';
  }
}

// ============================================
// NAVBAR VISIBILITY ON SCROLL
// ============================================
let lastScrollTop = 0;
const scrollThreshold = 100;

function handleNavbarVisibility() {
  const scrollTop = window.scrollY;
  
  if (scrollTop > scrollThreshold) {
    navbar.classList.add('visible');
  } else {
    navbar.classList.remove('visible');
  }
  
  lastScrollTop = scrollTop;
}

// ============================================
// MOBILE MENU TOGGLE
// ============================================
function toggleMobileMenu() {
  mobileMenu.classList.toggle('active');
  document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  
  // Change icon
  const icon = navbarToggle.querySelector('i');
  if (mobileMenu.classList.contains('active')) {
    icon.classList.remove('bi-list');
    icon.classList.add('bi-x-lg');
  } else {
    icon.classList.remove('bi-x-lg');
    icon.classList.add('bi-list');
  }
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.mobile-nav-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
    const icon = navbarToggle.querySelector('i');
    icon.classList.remove('bi-x-lg');
    icon.classList.add('bi-list');
  });
});

if (navbarToggle) {
  navbarToggle.addEventListener('click', toggleMobileMenu);
}

// ============================================
// MOUSE TRACKING EFFECT (HERO)
// ============================================
function handleMouseMove(e) {
  if (!heroMouseGlow || !hero) return;
  
  const rect = hero.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  heroMouseGlow.style.left = x + 'px';
  heroMouseGlow.style.top = y + 'px';
}

if (hero) {
  hero.addEventListener('mousemove', handleMouseMove);
}

// ============================================
// REVEAL ON SCROLL (Intersection Observer)
// ============================================
function initRevealOnScroll() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -100px 0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Optional: unobserve after revealing
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  revealElements.forEach(element => {
    observer.observe(element);
  });
}

// ============================================
// BACK TO TOP BUTTON
// ============================================
function handleBackToTopVisibility() {
  if (!backToTopBtn) return;
  
  if (window.scrollY > 500) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

if (backToTopBtn) {
  backToTopBtn.addEventListener('click', scrollToTop);
}

// ============================================
// ITINERARY TABS
// ============================================
function initItineraryTabs() {
  const tabs = document.querySelectorAll('.itinerary-tab');
  const panels = document.querySelectorAll('.itinerary-panel');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.dataset.tab;
      
      // Remove active from all tabs and panels
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      
      // Add active to clicked tab and corresponding panel
      tab.classList.add('active');
      const targetPanel = document.getElementById(`itinerary-${targetTab}`);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });
}

// ============================================
// ACCOMMODATION TABS
// ============================================
function initAccommodationTabs() {
  const tabs = document.querySelectorAll('.accommodation-tab');
  const panels = document.querySelectorAll('.accommodation-panel');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.dataset.accom;
      
      // Remove active from all tabs and panels
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      
      // Add active to clicked tab and corresponding panel
      tab.classList.add('active');
      const targetPanel = document.getElementById(`accom-${targetTab}`);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });
}

// ============================================
// FAQ ACCORDION
// ============================================
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all FAQ items
      faqItems.forEach(faq => faq.classList.remove('active'));
      
      // If it wasn't active, open it
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

// ============================================
// MODALS
// ============================================
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Open Itinerary Modal
function openItineraryModal(destination) {
  openModal(`modal-itinerary-${destination}`);
}

// Open Reservation Modal
function openReservationModal(destination) {
  const destinationText = document.getElementById('reservation-destination');
  const whatsappLink = document.getElementById('whatsapp-link');
  
  // Close any open itinerary modal first
  document.querySelectorAll('.modal').forEach(modal => {
    modal.classList.remove('active');
  });
  
  // Set destination name
  const destinationNames = {
    'guatemala': 'Expedição Guatemala',
    'peru': 'Expedição Peru',
    'tailandia': 'Expedição Tailândia'
  };
  
  if (destinationText) {
    destinationText.textContent = destinationNames[destination] || 'Expedição 2026';
  }
  
  // Update WhatsApp link with destination
  if (whatsappLink) {
    const message = encodeURIComponent(`Olá! Tenho interesse na ${destinationNames[destination] || 'expedição'}. Gostaria de mais informações.`);
    whatsappLink.href = `https://wa.me/5500000000000?text=${message}`;
  }
  
  openModal('modal-reservation');
}

// Close modal when pressing ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal.active').forEach(modal => {
      modal.classList.remove('active');
    });
    document.body.style.overflow = '';
  }
});

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const navbarHeight = navbar ? navbar.offsetHeight : 0;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ============================================
// CURRENT YEAR FOR FOOTER
// ============================================
function setCurrentYear() {
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

// ============================================
// PARALLAX EFFECT FOR CARDS (Optional)
// ============================================
function initCardParallax() {
  const cards = document.querySelectorAll('.destination-card, .pricing-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  });
}

// ============================================
// MAGNETIC BUTTON EFFECT (Optional)
// ============================================
function initMagneticButtons() {
  const buttons = document.querySelectorAll('.btn-glow');
  
  buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
    });
  });
}

// ============================================
// TYPING EFFECT (Optional - for hero title)
// ============================================
function initTypingEffect(element, text, speed = 50) {
  if (!element) return;
  
  element.textContent = '';
  let i = 0;
  
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// ============================================
// COUNTER ANIMATION
// ============================================
function animateCounter(element, target, duration = 2000) {
  if (!element) return;
  
  let start = 0;
  const increment = target / (duration / 16);
  
  function update() {
    start += increment;
    if (start < target) {
      element.textContent = Math.floor(start);
      requestAnimationFrame(update);
    } else {
      element.textContent = target;
    }
  }
  
  update();
}

// ============================================
// PRELOADER (Optional)
// ============================================
function hidePreloader() {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.style.opacity = '0';
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500);
  }
}

// ============================================
// CAROUSEL PAUSE ON HOVER
// ============================================
function initCarouselPause() {
  const carouselTracks = document.querySelectorAll('.carousel-track, .testimonials-track');
  
  carouselTracks.forEach(track => {
    track.addEventListener('mouseenter', () => {
      track.style.animationPlayState = 'paused';
    });
    
    track.addEventListener('mouseleave', () => {
      track.style.animationPlayState = 'running';
    });
  });
}

// ============================================
// LAZY LOAD IMAGES
// ============================================
function initLazyLoad() {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
}

// ============================================
// SCROLL EVENT HANDLER (Throttled)
// ============================================
let ticking = false;

function handleScroll() {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateScrollProgress();
      handleNavbarVisibility();
      handleBackToTopVisibility();
      ticking = false;
    });
    ticking = true;
  }
}

// ============================================
// INITIALIZE ALL FUNCTIONS
// ============================================
function init() {
  // Set current year
  setCurrentYear();
  
  // Initialize components
  initRevealOnScroll();
  initItineraryTabs();
  initAccommodationTabs();
  initFaqAccordion();
  initSmoothScroll();
  initCarouselPause();
  initLazyLoad();
  
  // Optional effects (uncomment if desired)
  // initCardParallax();
  // initMagneticButtons();
  
  // Add scroll event listener
  window.addEventListener('scroll', handleScroll, { passive: true });
  
  // Initial calls
  handleNavbarVisibility();
  updateScrollProgress();
  handleBackToTopVisibility();
  
  // Hide preloader after page load
  window.addEventListener('load', hidePreloader);
  
  console.log('🌍 Expedições 2026 - Site Initialized');
}

// ============================================
// START
// ============================================
document.addEventListener('DOMContentLoaded', init);

// ============================================
// EXPOSE FUNCTIONS TO GLOBAL SCOPE (for onclick handlers)
// ============================================
window.openItineraryModal = openItineraryModal;
window.openReservationModal = openReservationModal;
window.closeModal = closeModal;
window.openModal = openModal;
