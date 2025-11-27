// Animation des chiffres au scroll - compteur
function initCounterAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const monitoringNumber = document.querySelector('.monitor-counter');
    const allCounters = Array.from(statNumbers);
    if (monitoringNumber) {
        allCounters.push(monitoringNumber);
    }

    let currentAnimation = null;

    function animateCounter(element) {
        // Arrêter l'animation précédente si elle existe
        if (currentAnimation && currentAnimation.element === element) {
            clearInterval(currentAnimation.interval);
        }

        const text = element.dataset.value || element.textContent.trim();
        // Sauvegarder la valeur originale si ce n'est pas déjà fait
        if (!element.dataset.value) {
            element.dataset.value = text;
        }
        
        let finalValue = text;
        let numericValue = 0;
        let suffix = '';
        
        // Extraire le nombre et le suffixe (M, B, %, /7, ms)
        const match = text.match(/^([\d.]+)([A-Za-z%\/]*)$/);
        if (match) {
            numericValue = parseFloat(match[1]);
            suffix = match[2];
        }
        
        // Durée de l'animation en ms
        const duration = 1500;
        const steps = 60;
        const stepDuration = duration / steps;
        let currentStep = 0;
        
        const interval = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;
            
            // Easing function pour un démarrage rapide puis ralentissement
            const easeOutQuad = 1 - (1 - progress) * (1 - progress);
            
            let displayValue;
            if (suffix === '/7') {
                // Pour 24/7, afficher juste le nombre qui augmente jusqu'à 24
                displayValue = Math.round(24 * easeOutQuad);
                element.textContent = displayValue + suffix;
            } else if (suffix === 'M' || suffix === 'B') {
                displayValue = (numericValue * easeOutQuad).toFixed(1);
                element.textContent = displayValue + suffix;
            } else if (suffix === '%') {
                displayValue = (numericValue * easeOutQuad).toFixed(1);
                element.textContent = displayValue + suffix;
            } else if (suffix === 'ms') {
                displayValue = Math.round(numericValue * easeOutQuad);
                element.textContent = displayValue + suffix;
            } else {
                displayValue = Math.round(numericValue * easeOutQuad);
                element.textContent = displayValue + suffix;
            }
            
            if (currentStep >= steps) {
                clearInterval(interval);
                element.textContent = finalValue;
                currentAnimation = null;
            }
        }, stepDuration);

        currentAnimation = { element, interval };
    }

    const statsObserverOptions = {
        threshold: 0.3,
        rootMargin: '0px'
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
            }
        });
    }, statsObserverOptions);

    allCounters.forEach(number => {
        statsObserver.observe(number);
    });
}

// Initialiser quand le DOM est prêt
document.addEventListener('DOMContentLoaded', initCounterAnimation);

// Bouton CTA (Call To Action)
const ctaButton = document.getElementById('cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'solutions.html#plans';
    });
}

// Trust Us Button - Scam Modal
const trustUsButton = document.getElementById('cta-button-2');
if (trustUsButton) {
    trustUsButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'solutions.html#plans';
    });
}

// Show scam modal and play video
function showScamModal() {
    const modal = document.getElementById('scam-modal');
    if (!modal) return;
    modal.style.display = 'flex';

    const video = document.getElementById('scam-video');
    if (video) {
        // Ensure audio is on by default
        video.muted = false;
        video.volume = 1.0;
        video.currentTime = 0;
        const playPromise = video.play();
        if (playPromise && typeof playPromise.then === 'function') {
            playPromise.catch(() => {
                // Autoplay may be blocked; user can press play via controls
            });
        }
    }
}

// Close scam modal and stop video
function closeScamModal() {
    const modal = document.getElementById('scam-modal');
    if (!modal) return;
    modal.style.display = 'none';

    const video = document.getElementById('scam-video');
    if (video) {
        video.pause();
        video.currentTime = 0;
    }
}

// Fermer le modal en cliquant en dehors
window.addEventListener('click', (event) => {
    const modal = document.getElementById('scam-modal');
    if (event.target === modal) {
        closeScamModal();
    }
});

// Subscribe buttons - Scam Modal
const subscribeButtons = document.querySelectorAll('.pricing-card .btn.btn-primary');
subscribeButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        showScamModal();
    });
});

// Animation au scroll pour les cartes
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

// Observer tous les éléments avec la classe 'card'
document.querySelectorAll('.card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Menu mobile (bonus - pour la responsive)
function createMobileMenu() {
    const navbar = document.querySelector('.navbar');
    const navMenu = document.querySelector('.nav-menu');
    
    // Créer le bouton hamburger
    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = '☰';
    hamburger.style.display = 'none';
    hamburger.style.background = 'none';
    hamburger.style.border = 'none';
    hamburger.style.color = 'white';
    hamburger.style.fontSize = '1.5rem';
    hamburger.style.cursor = 'pointer';
    
    navbar.appendChild(hamburger);
    
    // Gestion du menu mobile
    hamburger.addEventListener('click', () => {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        navMenu.style.flexDirection = 'column';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '60px';
        navMenu.style.left = '0';
        navMenu.style.right = '0';
        navMenu.style.backgroundColor = 'var(--secondary-color)';
        navMenu.style.zIndex = '999';
    });
    
    // Afficher/masquer le hamburger selon la taille de l'écran
    function handleResize() {
        if (window.innerWidth <= 768) {
            hamburger.style.display = 'block';
            if (navMenu.style.display === 'flex') {
                navMenu.style.display = 'none';
            }
        } else {
            hamburger.style.display = 'none';
            navMenu.style.display = 'flex';
            navMenu.style.position = 'static';
            navMenu.style.backgroundColor = 'transparent';
        }
    }
    
    window.addEventListener('resize', handleResize);
    handleResize();
}

// Initialiser le menu mobile au chargement de la page
document.addEventListener('DOMContentLoaded', createMobileMenu);

// Logo bigger at top, normal on scroll with hysteresis to avoid flicker
let isAtTop = null;
let tickingAtTop = false;
const ENTER_TOP_Y = 10;   // become 'at-top' when <= this
const EXIT_TOP_Y  = 80;   // leave 'at-top' when > this

function computeAtTopState(y) {
    if (isAtTop === null) {
        return y <= ENTER_TOP_Y;
    }
    if (isAtTop) {
        return y <= EXIT_TOP_Y; // stay at-top until we pass EXIT_TOP_Y
    }
    return y <= ENTER_TOP_Y; // only re-enter when we cross back under ENTER_TOP_Y
}

function updateAtTop() {
    const y = window.scrollY || document.documentElement.scrollTop || 0;
    const nextState = computeAtTopState(y);
    if (nextState !== isAtTop) {
        isAtTop = nextState;
        document.body.classList.toggle('at-top', isAtTop);
    }
}

function onScrollAtTop() {
    if (tickingAtTop) return;
    tickingAtTop = true;
    requestAnimationFrame(() => {
        updateAtTop();
        tickingAtTop = false;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    updateAtTop();
});
window.addEventListener('scroll', onScrollAtTop, { passive: true });
window.addEventListener('resize', onScrollAtTop);
