// MENU MOBILE
const mobileToggle = document.getElementById('mobileToggle');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileToggle) {
  mobileToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    const icon = mobileToggle.querySelector('i');
    icon.classList.toggle('bi-list');
    icon.classList.toggle('bi-x');
  });
}

function closeMobileMenu() {
  mobileMenu.classList.remove('active');
  mobileToggle.querySelector('i').className = 'bi bi-list';
}

// HEADER SCROLL
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// TABS (Roteiro e Preços)
function showItinerary(destination) {
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  
  document.querySelectorAll('.itinerary-container').forEach(div => div.classList.remove('active'));
  document.getElementById(destination + '-itinerary').classList.add('active');
}

function showPricing(tab) {
  document.querySelectorAll('.pricing-tab').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  
  document.querySelectorAll('.pricing-display').forEach(div => div.classList.remove('active'));
  document.getElementById('pricing-' + tab).classList.add('active');
}

// TOGGLES (Dia a Dia)
function toggleDay(btn) {
  const desc = btn.previousElementSibling;
  desc.classList.toggle('show');
  btn.textContent = desc.classList.contains('show') ? 'Ocultar detalhes' : 'Expandir detalhes';
}

// ACCORDION (FAQ)
function toggleAccordion(btn) {
  const body = btn.nextElementSibling;
  body.classList.toggle('active');
  const icon = btn.querySelector('i');
  icon.classList.toggle('bi-plus');
  icon.classList.toggle('bi-dash');
}

// ANO ATUAL
document.getElementById('year').textContent = new Date().getFullYear();

// UTM TRACKING
let prefix = ["wa.me", "whatsapp.com"];
function getParams() {
    let t = "";
    let url = new URL(window.location.href);
    let params = new URLSearchParams(url.search);
    
    if (params.toString()) {
        t = "?" + params.toString();
    }
    return t;
}

(function() {
    let params = getParams();
    if (params) {
        document.querySelectorAll("a").forEach(function(link) {
            prefix.forEach(p => {
                if (link.href.includes(p)) {
                    link.href += params;
                }
            });
        });
    }
})();

console.log("Mutua Xperience - Premium Loaded 🌎");
