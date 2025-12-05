// ===== DOM ELEMENTS =====
const header = document.getElementById('header');
const mobileToggle = document.getElementById('mobileToggle');
const mobileMenu = document.getElementById('mobileMenu');
const backToTop = document.getElementById('backToTop');
const progressBar = document.getElementById('progressBar');
const faqItems = document.querySelectorAll('.faq-item');
const reveals = document.querySelectorAll('.reveal');
const contactForm = document.getElementById('contactForm');

// ===== MOBILE MENU =====
if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        const icon = mobileToggle.querySelector('i');
        if (mobileMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            const icon = mobileToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
}

// ===== HEADER SCROLL BEHAVIOR =====
let lastScrollY = window.scrollY;
let ticking = false;

function updateHeader() {
    const currentScrollY = window.scrollY;
    
    // Add scrolled class for shadow
    if (currentScrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Show/hide header based on scroll direction
    if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }
    } else {
        header.classList.remove('hidden');
    }
    
    lastScrollY = currentScrollY;
    ticking = false;
}

// ===== SCROLL EVENT HANDLER =====
function onScroll() {
    const currentScrollY = window.scrollY;
    
    // Progress bar
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = (currentScrollY / scrollHeight) * 100;
    if (progressBar) {
        progressBar.style.width = scrollProgress + '%';
    }
    
    // Back to top button
    if (backToTop) {
        if (currentScrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
    
    // Header update with throttling
    if (!ticking) {
        window.requestAnimationFrame(updateHeader);
        ticking = true;
    }
    
    // Reveal animations
    revealOnScroll();
}

window.addEventListener('scroll', onScroll, { passive: true });

// ===== BACK TO TOP =====
if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== REVEAL ON SCROLL =====
function revealOnScroll() {
    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 80) {
            element.classList.add('active');
        }
    });
}

// Initial check
window.addEventListener('load', revealOnScroll);

// ===== FAQ ACCORDION =====
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    if (question) {
        question.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    }
});

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            const headerHeight = header ? header.offsetHeight : 0;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== FORM HANDLING =====
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Create WhatsApp message
        const message = `Olá! Tenho interesse em viajar com a Mutua Xperience.

*Nome:* ${data.name}
*E-mail:* ${data.email}
*WhatsApp:* ${data.phone}
*Destino:* ${data.destination}
*Mensagem:* ${data.message || 'Não informada'}`;

        // Encode message for URL
        const encodedMessage = encodeURIComponent(message);
        
        // Open WhatsApp with pre-filled message
        window.open(`https://wa.me/message/YZASP7OM735MO1?text=${encodedMessage}`, '_blank');
        
        // Show success feedback
        showFormSuccess();
        
        // Reset form
        this.reset();
    });
}

function showFormSuccess() {
    const submitBtn = contactForm.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-check"></i> Enviado!';
    submitBtn.style.background = '#22C55E';
    
    setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
    }, 3000);
}

// ===== PHONE INPUT MASK =====
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length > 11) {
            value = value.slice(0, 11);
        }
        
        if (value.length > 6) {
            value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
        } else if (value.length > 2) {
            value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
        } else if (value.length > 0) {
            value = `(${value}`;
        }
        
        e.target.value = value;
    });
}

// ===== LAZY LOAD IMAGES =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px'
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== PARALLAX EFFECT ON HERO =====
const heroSection = document.querySelector('.hero');
if (heroSection) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroHeight = heroSection.offsetHeight;
        
        if (scrolled < heroHeight) {
            const parallax = scrolled * 0.4;
            const heroBg = heroSection.querySelector('.hero-bg img');
            if (heroBg) {
                heroBg.style.transform = `translateY(${parallax}px)`;
            }
        }
    }, { passive: true });
}

// ===== ANIMATE COUNTERS =====
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Observe stat numbers
const statNumbers = document.querySelectorAll('.stat-number');
if (statNumbers.length > 0) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const number = entry.target;
                const target = parseInt(number.textContent.replace(/\D/g, ''));
                const suffix = number.textContent.replace(/[0-9]/g, '');
                
                if (target && !number.classList.contains('animated')) {
                    number.classList.add('animated');
                    animateCounter(number, target);
                    if (suffix) {
                        setTimeout(() => {
                            number.textContent = target + suffix;
                        }, 2100);
                    }
                }
                
                statsObserver.unobserve(number);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
}

// ===== CONSOLE BRANDING =====
console.log('%c🌍 Mutua Xperience', 'color: #1D4F91; font-size: 24px; font-weight: bold;');
console.log('%cViagens que transformam', 'color: #F28C28; font-size: 14px;');
console.log('%c✈️ Peru & Guatemala 2025/2026', 'color: #6B7280; font-size: 12px;');
