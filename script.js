// ==================
// COPY CONTRACT ADDRESS
// ==================
function copyContract() {
    const contractInput = document.getElementById('contractAddress');
    const button = document.querySelector('.copy-btn');
    
    // Select and copy
    contractInput.select();
    contractInput.setSelectionRange(0, 99999);
    
    navigator.clipboard.writeText(contractInput.value).then(() => {
        // Show success feedback
        const originalHTML = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i>';
        button.style.background = 'var(--accent-green)';
        
        setTimeout(() => {
            button.innerHTML = originalHTML;
            button.style.background = '';
        }, 2000);
    }).catch(err => {
        console.error('Copy failed:', err);
    });
}

// ==================
// SMOOTH SCROLL
// ==================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ==================
// NAVBAR SCROLL EFFECT
// ==================
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.3)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// ==================
// MOBILE MENU TOGGLE
// ==================
const mobileToggle = document.querySelector('.mobile-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        if (navLinks.classList.contains('active')) {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.right = '0';
            navLinks.style.background = 'var(--black)';
            navLinks.style.padding = '20px';
            navLinks.style.borderTop = '1px solid rgba(144, 238, 144, 0.2)';
        } else {
            navLinks.style.display = '';
            navLinks.style.flexDirection = '';
            navLinks.style.position = '';
            navLinks.style.top = '';
            navLinks.style.left = '';
            navLinks.style.right = '';
            navLinks.style.background = '';
            navLinks.style.padding = '';
            navLinks.style.borderTop = '';
        }
    });
}

// ==================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ==================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animate elements on scroll
document.querySelectorAll('.about-card, .feature-item, .timeline-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ==================
// STATS COUNTER ANIMATION
// ==================
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        
        if (element.textContent.includes('%')) {
            element.textContent = Math.floor(progress * (end - start) + start) + '%';
        } else if (element.textContent.includes('X')) {
            element.textContent = Math.floor(progress * (end - start) + start) + 'X';
        } else {
            element.textContent = Math.floor(progress * (end - start) + start);
        }
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    
    window.requestAnimationFrame(step);
}

// Trigger counter animation when stats are visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const values = entry.target.querySelectorAll('.stat-value');
            
            values.forEach(value => {
                const text = value.textContent;
                if (text.includes('402X')) {
                    animateValue(value, 0, 402, 2000);
                } else if (text.includes('%')) {
                    const num = parseInt(text);
                    animateValue(value, 0, num, 2000);
                }
            });
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// ==================
// CONSOLE MESSAGE
// ==================
console.log('%c🚀 PEPIQ - The 402X Integration Protocol', 'font-size: 20px; color: #90EE90; font-weight: bold;');
console.log('%cMeme + Project = Revolution', 'font-size: 14px; color: #90EE90;');
console.log('%cJoin us: https://t.me/PEPIQ_SOL', 'font-size: 12px; color: #90EE90;');

// Make copyContract available globally
window.copyContract = copyContract;