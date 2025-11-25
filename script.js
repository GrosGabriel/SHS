// Scroll smooth pour les liens de navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Bouton CTA (Call To Action)
const ctaButton = document.getElementById('cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', () => {
        const contactSection = document.getElementById('contact');
        contactSection.scrollIntoView({ behavior: 'smooth' });
    });
}

// Gestion du formulaire de contact
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Récupération des données du formulaire
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // Validation basique
        if (!name || !email || !message) {
            displayMessage('Veuillez remplir tous les champs', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            displayMessage('Veuillez entrer une adresse email valide', 'error');
            return;
        }

        // Simulation d'envoi (dans une vraie application, vous enverriez les données à un serveur)
        console.log('Données du formulaire:', { name, email, message });
        
        // Afficher le message de succès
        displayMessage('✓ Merci ! Votre message a été envoyé avec succès.', 'success');

        // Réinitialiser le formulaire
        contactForm.reset();

        // Effacer le message après 5 secondes
        setTimeout(() => {
            formStatus.textContent = '';
            formStatus.classList.remove('success', 'error');
        }, 5000);
    });
}

// Fonction pour afficher les messages de statut
function displayMessage(message, type) {
    formStatus.textContent = message;
    formStatus.classList.add(type);
}

// Fonction de validation email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

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
