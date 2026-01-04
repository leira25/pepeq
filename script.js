// ========================
// FAQ ACCORDION
// ========================
function initFAQ() {
    const faqBoxes = document.querySelectorAll('.faq-box');
    
    faqBoxes.forEach(box => {
        const question = box.querySelector('.faq-q');
        
        question.addEventListener('click', () => {
            const isActive = box.classList.contains('active');
            
            // Close all FAQ boxes
            faqBoxes.forEach(b => b.classList.remove('active'));
            
            // Open clicked box if it wasn't active
            if (!isActive) {
                box.classList.add('active');
            }
        });
    });
}

// ========================
// COPY CONTRACT ADDRESS
// ========================
function copyContract() {
    const contractText = document.getElementById('contractAddress').textContent;
    
    navigator.clipboard.writeText(contractText).then(() => {
        const button = document.querySelector('.copy-btn');
        const originalHTML = button.innerHTML;
        
        // Change button text
        button.innerHTML = '<i class="fas fa-check"></i> COPIED!';
        button.style.background = 'var(--accent-green)';
        button.style.color = 'var(--black)';
        
        // Reset after 2 seconds
        setTimeout(() => {
            button.innerHTML = originalHTML;
            button.style.background = '';
            button.style.color = '';
        }, 2000);
    }).catch(err => {
        console.error('Copy failed:', err);
        alert('Please copy manually!');
    });
}

// ========================
// SMOOTH SCROLL
// ========================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                target.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ========================
// COMIC SOUND EFFECTS (Fun!)
// ========================
function addComicSounds() {
    const buttons = document.querySelectorAll('.btn-comic, .buy-btn, .social-btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Visual effect
            btn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                btn.style.transform = '';
            }, 100);
        });
    });
}

// ========================
// RANDOM PANEL TILT
// ========================
function addPanelTilt() {
    const panels = document.querySelectorAll('.comic-panel, .feature-box');
    
    panels.forEach((panel, index) => {
        const tilt = (index % 2 === 0) ? -0.5 : 0.5;
        panel.style.transform = `rotate(${tilt}deg)`;
    });
}

// ========================
// INITIALIZE EVERYTHING
// ========================
document.addEventListener('DOMContentLoaded', () => {
    initFAQ();
    initSmoothScroll();
    addComicSounds();
    addPanelTilt();
    
    console.log('🎨 PEPIQ Comic Loaded!');
    console.log('💚 402X Integration Active!');
});

// Make copyContract available globally
window.copyContract = copyContract;