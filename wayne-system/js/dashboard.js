class DashboardManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupMobileMenu();
        this.animateDashboard();
        this.setupProgressBars();
        this.addAnimationStyles();
    }

    setupMobileMenu() {
        const burger = document.querySelector('.burger');
        const navLinks = document.querySelector('.nav-links');
        const overlay = document.getElementById('overlay');

        if (burger) {
            burger.addEventListener('click', () => {
                navLinks.classList.toggle('nav-active');
                overlay.classList.toggle('active');
                burger.classList.toggle('toggle');
            });

            overlay.addEventListener('click', () => {
                navLinks.classList.remove('nav-active');
                overlay.classList.remove('active');
                burger.classList.remove('toggle');
            });
        }
    }

    animateDashboard() {
        const statusCards = document.querySelectorAll('.status-card');
        const statItems = document.querySelectorAll('.stat-item');

        // Animar cards de status
        statusCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.animation = 'slideInUp 0.5s ease forwards';
            }, index * 100);
        });

        // Animar estatísticas rápidas
        statItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.animation = 'slideInRight 0.5s ease forwards';
            }, (index * 150) + 500);
        });

        // Animar indicadores de status
        setTimeout(() => {
            this.animateStatusIndicators();
        }, 1000);
    }

    animateStatusIndicators() {
        const operationalIndicators = document.querySelectorAll('.status-card.operational, .status-card.success');
        operationalIndicators.forEach(indicator => {
            const icon = indicator.querySelector('.status-icon');
            if (icon) {
                icon.style.animation = 'pulse 2s infinite';
            }
        });
    }

    setupProgressBars() {
        const progressBars = document.querySelectorAll('.progress');
        progressBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0%';
            
            setTimeout(() => {
                bar.style.transition = 'width 1.5s ease';
                bar.style.width = width;
            }, 800);
        });
    }

    addAnimationStyles() {
        if (document.getElementById('dashboard-animations')) return;

        const style = document.createElement('style');
        style.id = 'dashboard-animations';
        style.textContent = `
            @keyframes slideInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            @keyframes slideInRight {
                from {
                    opacity: 0;
                    transform: translateX(30px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }

            @keyframes pulse {
                0% {
                    transform: scale(1);
                }
                50% {
                    transform: scale(1.05);
                }
                100% {
                    transform: scale(1);
                }
            }

            .status-card {
                opacity: 0;
                transform: translateY(30px);
            }

            .stat-item {
                opacity: 0;
                transform: translateX(30px);
            }

            /* Efeitos de hover aprimorados */
            .status-card:hover {
                transform: translateY(-8px) scale(1.02);
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
            }

            .stat-item:hover {
                transform: scale(1.05);
                border-color: var(--secondary-color);
            }

            /* Mobile Menu Styles */
            @media screen and (max-width: 768px) {
                .nav-links {
                    position: fixed;
                    right: 0;
                    top: 0;
                    height: 100vh;
                    width: 70%;
                    background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    transform: translateX(100%);
                    transition: transform 0.5s ease-in;
                    z-index: 99;
                    gap: 30px;
                }

                .nav-links.nav-active {
                    transform: translateX(0);
                }

                .nav-link {
                    justify-content: center;
                    width: 200px;
                    font-size: 1.1rem;
                }

                .burger {
                    display: block;
                    z-index: 101;
                    cursor: pointer;
                }

                .burger div {
                    width: 25px;
                    height: 3px;
                    background-color: var(--light-text);
                    margin: 5px;
                    transition: var(--transition);
                }

                .burger.toggle .line1 {
                    transform: rotate(-45deg) translate(-5px, 6px);
                }

                .burger.toggle .line2 {
                    opacity: 0;
                }

                .burger.toggle .line3 {
                    transform: rotate(45deg) translate(-5px, -6px);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Inicializar o Dashboard
document.addEventListener('DOMContentLoaded', () => {
    const dashboard = new DashboardManager();
});