// ========== MOBILE MENU ==========
const mobileToggle = document.getElementById('mobileToggle');
const mobileMenu = document.getElementById('mobileMenu');

mobileToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
  const icon = mobileToggle.querySelector('i');
  icon.classList.toggle('bi-list');
  icon.classList.toggle('bi-x');
});

function closeMobileMenu() {
  mobileMenu.classList.remove('active');
  const icon = mobileToggle.querySelector('i');
  icon.classList.add('bi-list');
  icon.classList.remove('bi-x');
}

// ========== HEADER SCROLL ==========
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll > 100) {
    header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
  } else {
    header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
  }
  lastScroll = currentScroll;
});

// ========== ITINERARY TABS ==========
function showItinerary(destination) {
  // Remove active from all tabs
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.itinerary-content').forEach(content => content.classList.remove('active'));
  
  // Add active to clicked tab
  event.target.classList.add('active');
  document.getElementById(destination + '-itinerary').classList.add('active');
}

// ========== DAY TOGGLE ==========
function toggleDay(btn) {
  const description = btn.parentElement.querySelector('.day-description');
  description.classList.toggle('show');
  btn.textContent = description.classList.contains('show') ? 'Ver menos' : 'Ver mais detalhes';
}

// ========== PRICING TABS ==========
function showPricing(tab) {
  document.querySelectorAll('.pricing-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.pricing-content').forEach(c => c.classList.remove('active'));
  
  event.target.classList.add('active');
  document.getElementById('pricing-' + tab).classList.add('active');
}

// ========== FAQ ACCORDION ==========
function toggleFaq(btn) {
  const faqItem = btn.parentElement;
  const wasActive = faqItem.classList.contains('active');
  
  // Close all
  document.querySelectorAll('.faq-item').forEach(item => item.classList.remove('active'));
  
  // Open clicked if wasn't active
  if (!wasActive) {
    faqItem.classList.add('active');
  }
}

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ========== REVEAL ON SCROLL ==========
const revealElements = document.querySelectorAll('.destination-card, .included-card, .review-card, .step-card');

const revealOnScroll = () => {
  revealElements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (elementTop < windowHeight - 100) {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }
  });
};

revealElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

console.log('🌎 Mutua Xperience - Site carregado!');
