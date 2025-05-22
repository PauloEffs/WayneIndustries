const CONFIG = {
    ANIMATION_DELAYS: {
        CARD: 100,
        NAV_LINK: 0.3
    }
};

// ===== UTILITÁRIOS =====
class Utils {
    static formatCurrency(value) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'USD'
        }).format(value);
    }

    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    static createElementFromHTML(htmlString) {
        const div = document.createElement('div');
        div.innerHTML = htmlString.trim();
        return div.firstChild;
    }

    static isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return rect.top < window.innerHeight - 50;
    }
}

// ===== GERENCIADOR DE NAVEGAÇÃO =====
class NavigationManager {
    constructor() {
        this.burger = document.querySelector('.burger');
        this.nav = document.querySelector('.nav-links');
        this.navLinks = document.querySelectorAll('.nav-links li');
        this.overlay = document.getElementById('overlay');
        this.isMenuOpen = false;

        this.init();
    }

    init() {
        if (!this.burger) return;
        
        this.burger.addEventListener('click', () => this.toggleMenu());
        
        // Fechar menu ao clicar em links ou overlay
        [...this.navLinks, this.overlay].forEach(element => {
            element.addEventListener('click', () => {
                if (this.isMenuOpen) this.closeMenu();
            });
        });

        // Fechar menu ao pressionar ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMenuOpen) this.closeMenu();
        });
    }

    toggleMenu() {
        this.isMenuOpen ? this.closeMenu() : this.openMenu();
    }

    openMenu() {
        this.nav.classList.add('nav-active');
        this.overlay.classList.add('active');
        this.burger.classList.add('toggle');
        document.body.classList.add('no-scroll');
        this.isMenuOpen = true;

        this.animateNavLinks();
    }

    closeMenu() {
        this.nav.classList.remove('nav-active');
        this.overlay.classList.remove('active');
        this.burger.classList.remove('toggle');
        document.body.classList.remove('no-scroll');
        this.isMenuOpen = false;

        this.resetNavLinks();
    }

    animateNavLinks() {
        this.navLinks.forEach((link, index) => {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + CONFIG.ANIMATION_DELAYS.NAV_LINK}s`;
        });
    }

    resetNavLinks() {
        this.navLinks.forEach(link => {
            link.style.animation = '';
        });
    }
}

// ===== GERENCIADOR DE SLIDES =====
class SlideManager {
    constructor(sliderSelector) {
        this.slider = document.querySelector(sliderSelector);
        if (!this.slider) return;

        this.slides = this.slider.querySelectorAll('.initiative');
        this.prevBtn = document.querySelector('.prev-slide');
        this.nextBtn = document.querySelector('.next-slide');
        this.currentSlide = 0;

        this.init();
    }

    init() {
        if (this.slides.length === 0) return;

        this.showSlide(0);
        this.setupEventListeners();
    }

    setupEventListeners() {
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }
        
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prevSlide());
        }

        // Auto-play (opcional)
        // setInterval(() => this.nextSlide(), 5000);
    }

    showSlide(index) {
        this.slides.forEach((slide, i) => {
            slide.style.display = i === index ? 'block' : 'none';
            if (i === index) {
                slide.style.animation = 'fadeIn 0.5s ease-in';
            }
        });
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.showSlide(this.currentSlide);
    }

    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.showSlide(this.currentSlide);
    }
}

// ===== GERENCIADOR DE TABS =====
class TabManager {
    constructor(tabsSelector) {
        this.tabContainer = document.querySelector(tabsSelector);
        if (!this.tabContainer) return;

        this.tabButtons = this.tabContainer.querySelectorAll('.tab-btn');
        this.tabPanes = document.querySelectorAll('.tab-pane');

        this.init();
    }

    init() {
        this.tabButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.switchTab(e.target));
        });
    }

    switchTab(clickedButton) {
        // Remover classes ativas
        this.tabButtons.forEach(btn => btn.classList.remove('active'));
        this.tabPanes.forEach(pane => pane.classList.remove('active'));

        // Ativar nova tab
        clickedButton.classList.add('active');
        const tabId = clickedButton.getAttribute('data-tab');
        const targetPane = document.getElementById(`${tabId}-tab`);
        
        if (targetPane) {
            targetPane.classList.add('active');
        }
    }
}

// ===== GERENCIADOR DE ANIMAÇÕES =====
class AnimationManager {
    constructor() {
        this.observedElements = new Set();
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.addAnimationStyles();
    }

    setupScrollAnimations() {
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            section.classList.add('animate-on-scroll');
            this.observedElements.add(section);
        });

        const debouncedAnimate = Utils.debounce(() => this.animateOnScroll(), 10);
        window.addEventListener('scroll', debouncedAnimate);
        
        // Animação inicial
        this.animateOnScroll();
    }

    animateOnScroll() {
        this.observedElements.forEach(element => {
            if (Utils.isElementInViewport(element)) {
                element.classList.add('animated');
                this.observedElements.delete(element); // Remove depois de animar
            }
        });
    }

    animateCards(delay = CONFIG.ANIMATION_DELAYS.CARD) {
        const cards = document.querySelectorAll('.item-card, .company-card, .objective-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('card-animated');
            }, index * delay);
        });
    }

    addAnimationStyles() {
        if (document.getElementById('wayne-animations')) return;

        const style = document.createElement('style');
        style.id = 'wayne-animations';
        style.textContent = `
            .animate-on-scroll {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            .animated { 
                opacity: 1; 
                transform: translateY(0); 
            }
            @keyframes fadeIn { 
                from { opacity: 0; } 
                to { opacity: 1; } 
            }
            @keyframes navLinkFade {
                from { opacity: 0; transform: translateX(50px); }
                to { opacity: 1; transform: translateX(0); }
            }
            .card-animated {
                animation: cardSlideIn 0.5s ease forwards;
            }
            @keyframes cardSlideIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .no-scroll { 
                overflow: hidden; 
            }
        `;
        document.head.appendChild(style);
    }
}

// ===== APLICAÇÃO PRINCIPAL =====
class WayneIndustriesApp {
    constructor() {
        this.navigationManager = null;
        this.slideManager = null;
        this.tabManager = null;
        this.animationManager = null;

        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.initializeComponents();
        });
    }

    initializeComponents() {
        // Inicializar componentes básicos
        this.navigationManager = new NavigationManager();
        this.slideManager = new SlideManager('.initiatives-slider');
        this.tabManager = new TabManager('.code-tabs');
        this.animationManager = new AnimationManager();

        setTimeout(() => {
            this.animationManager.animateCards();
        }, 300);
    }
}

// ===== INICIALIZAÇÃO =====
const app = new WayneIndustriesApp();

// ===== EXPORTS PARA COMPATIBILIDADE (se necessário) =====
if (typeof window !== 'undefined') {
    window.WayneIndustriesApp = WayneIndustriesApp;
}