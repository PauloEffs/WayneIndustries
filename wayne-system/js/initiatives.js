// ===== INITIATIVES WAYNE SYSTEM =====

class InitiativesManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupMobileMenu();
        this.animateInitiatives();
        this.setupProgressBars();
        this.setupTimelineInteractions();
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

    animateInitiatives() {
        const initiativeCards = document.querySelectorAll('.initiative-card');
        const timelineItems = document.querySelectorAll('.timeline-item');

        // Animar cards de iniciativas
        initiativeCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.animation = 'slideInUp 0.6s ease forwards';
            }, index * 200);
        });

        // Animar timeline após as iniciativas
        setTimeout(() => {
            timelineItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.animation = 'fadeInLeft 0.5s ease forwards';
                }, index * 150);
            });
        }, 1000);
    }

    setupProgressBars() {
        setTimeout(() => {
            const progressBars = document.querySelectorAll('.initiative-progress .progress');
            progressBars.forEach((bar, index) => {
                const width = bar.style.width;
                bar.style.width = '0%';
                
                setTimeout(() => {
                    bar.style.transition = 'width 2s ease';
                    bar.style.width = width;
                }, index * 300);
            });
        }, 800);
    }

    setupTimelineInteractions() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach(item => {
            item.addEventListener('click', () => {
                this.showTimelineDetails(item);
            });
        });
    }

    showTimelineDetails(item) {
        const date = item.querySelector('.timeline-date').textContent;
        const title = item.querySelector('h4').textContent;
        const description = item.querySelector('p').textContent;
        const status = item.querySelector('.timeline-status').textContent;
        
        const details = this.getTimelineDetails(title, date);
        
        const modal = document.createElement('div');
        modal.className = 'timeline-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            animation: fadeIn 0.3s ease;
        `;

        modal.innerHTML = `
            <div style="
                background: linear-gradient(135deg, #2a2a2a 0%, #3a3a3a 100%);
                padding: 40px;
                border-radius: 15px;
                max-width: 600px;
                width: 90%;
                border: 2px solid var(--secondary-color);
                animation: slideInUp 0.3s ease;
            ">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <h3 style="color: var(--secondary-color); margin: 0; font-size: 1.6rem;">
                        ${title}
                    </h3>
                    <span style="background-color: ${this.getStatusColor(status)}; color: white; padding: 6px 12px; border-radius: 15px; font-size: 0.8rem; font-weight: 600;">
                        ${status}
                    </span>
                </div>
                <p style="color: rgba(255,255,255,0.7); margin-bottom: 15px; font-size: 0.9rem;">
                    <strong>Período:</strong> ${date}
                </p>
                <p style="color: rgba(255,255,255,0.8); margin-bottom: 25px; line-height: 1.6;">
                    ${description}
                </p>
                <div style="margin-bottom: 25px;">
                    <h4 style="color: var(--secondary-color); margin-bottom: 15px;">Detalhes do Projeto:</h4>
                    <ul style="color: rgba(255,255,255,0.8); padding-left: 20px; line-height: 1.8;">
                        ${details.map(detail => `<li style="margin-bottom: 8px;">${detail}</li>`).join('')}
                    </ul>
                </div>
                <button onclick="this.parentElement.parentElement.remove()" style="
                    background-color: var(--secondary-color);
                    color: var(--dark-bg);
                    border: none;
                    padding: 12px 24px;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: 600;
                    font-size: 1rem;
                    transition: all 0.3s ease;
                ">Fechar</button>
            </div>
        `;

        document.body.appendChild(modal);
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    getStatusColor(status) {
        const colors = {
            'Concluído': 'var(--success-color)',
            'Em Andamento': 'var(--accent-color)',
            'Planejado': '#ff9800'
        };
        return colors[status] || 'var(--accent-color)';
    }

    getTimelineDetails(title, date) {
        const details = {
            'Sistema de Vigilância': [
                'Instalação de 1,247 câmeras inteligentes em pontos estratégicos',
                'Implementação de reconhecimento facial com IA avançada',
                'Sistema de análise comportamental em tempo real',
                'Integração com centro de comando centralizado',
                'Cobertura de 95% da área urbana de Gotham',
                'Redução de 45% nos crimes no distrito financeiro'
            ],
            'Centro de Resposta Rápida': [
                'Construção de central integrada de emergências',
                'Implementação de sistema de despacho automatizado',
                'Treinamento de 200+ operadores especializados',
                'Integração com todas as forças de segurança da cidade',
                'Tempo médio de resposta reduzido para 3 minutos',
                'Sistema de comunicação criptografado implantado'
            ],
            'Análise Preditiva': [
                'Desenvolvimento de algoritmos de machine learning',
                'Coleta e análise de dados criminais históricos',
                'Sistema de predição com 87% de precisão',
                'Interface intuitiva para analistas de segurança',
                'Integração com sistemas de vigilância existentes',
                'Prevenção de mais de 143 incidentes até agora'
            ],
            'Expansão Regional': [
                'Planejamento para expansão para 5 cidades vizinhas',
                'Orçamento aprovado de $2.3 bilhões',
                'Parcerias com governos locais em negociação',
                'Adaptação dos sistemas para diferentes populações',
                'Treinamento de equipes regionais previsto',
                'Impacto estimado: proteção adicional de 15M pessoas'
            ]
        };
        return details[title] || ['Detalhes em desenvolvimento...'];
    }

    addAnimationStyles() {
        if (document.getElementById('initiatives-animations')) return;

        const style = document.createElement('style');
        style.id = 'initiatives-animations';
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }

            @keyframes slideInUp {
                from { opacity: 0; transform: translateY(30px); }
                to { opacity: 1; transform: translateY(0); }
            }

            @keyframes fadeInLeft {
                from { opacity: 0; transform: translateX(-30px); }
                to { opacity: 1; transform: translateX(0); }
            }

            .initiative-card {
                opacity: 0;
                transform: translateY(30px);
            }

            .timeline-item {
                opacity: 0;
                transform: translateX(-30px);
            }

            .initiative-card:hover {
                transform: translateY(-12px);
                border-color: var(--secondary-color);
                box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
            }

            .initiative-stats {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
                gap: 15px;
                margin: 20px 0;
                padding: 15px;
                background-color: rgba(0, 0, 0, 0.2);
                border-radius: 8px;
            }

            .stat {
                text-align: center;
                color: rgba(255, 255, 255, 0.9);
                font-size: 0.85rem;
            }

            .stat strong {
                display: block;
                color: var(--secondary-color);
                margin-bottom: 5px;
            }

            .implementation-timeline {
                margin-top: 50px;
                padding: 30px;
                background: linear-gradient(135deg, #2a2a2a 0%, #3a3a3a 100%);
                border-radius: 15px;
                border: 2px solid rgba(184, 134, 11, 0.2);
            }

            .implementation-timeline h3 {
                color: var(--secondary-color);
                text-align: center;
                margin-bottom: 30px;
                font-size: 1.8rem;
            }

            .timeline {
                position: relative;
                max-width: 900px;
                margin: 0 auto;
            }

            .timeline::before {
                content: '';
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                width: 4px;
                height: 100%;
                background: linear-gradient(to bottom, var(--secondary-color), #d4a82c);
                border-radius: 2px;
            }

            .timeline-item {
                position: relative;
                width: 45%;
                margin-bottom: 30px;
                cursor: pointer;
                transition: var(--transition);
            }

            .timeline-item:nth-child(odd) {
                left: 0;
                text-align: right;
            }

            .timeline-item:nth-child(even) {
                left: 55%;
                text-align: left;
            }

            .timeline-item:hover {
                transform: scale(1.05);
            }

            .timeline-date {
                position: absolute;
                top: 0;
                width: 100px;
                height: 40px;
                background-color: var(--secondary-color);
                color: var(--dark-bg);
                border-radius: 20px;
                text-align: center;
                line-height: 40px;
                font-weight: 700;
                font-size: 0.9rem;
                z-index: 2;
            }

            .timeline-item:nth-child(odd) .timeline-date {
                right: -50px;
            }

            .timeline-item:nth-child(even) .timeline-date {
                left: -50px;
            }

            .timeline-content {
                background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
                padding: 25px;
                border-radius: 12px;
                border: 2px solid rgba(184, 134, 11, 0.3);
                margin-top: 20px;
            }

            .timeline-content h4 {
                color: var(--secondary-color);
                margin-bottom: 10px;
                font-size: 1.2rem;
            }

            .timeline-content p {
                color: rgba(255, 255, 255, 0.8);
                margin-bottom: 15px;
                line-height: 1.5;
            }

            .timeline-status {
                display: inline-block;
                padding: 6px 12px;
                border-radius: 15px;
                font-size: 0.8rem;
                font-weight: 600;
                text-transform: uppercase;
            }

            .timeline-status.completed {
                background-color: var(--success-color);
                color: white;
            }

            .timeline-status.active {
                background-color: var(--accent-color);
                color: white;
                animation: pulse 2s infinite;
            }

            .timeline-status.pending {
                background-color: #ff9800;
                color: white;
            }

            .timeline-item.completed::before {
                content: '✓';
                position: absolute;
                top: 10px;
                width: 20px;
                height: 20px;
                background-color: var(--success-color);
                color: white;
                border-radius: 50%;
                text-align: center;
                line-height: 20px;
                font-size: 12px;
                font-weight: bold;
                z-index: 3;
            }

            .timeline-item:nth-child(odd).completed::before {
                right: -60px;
            }

            .timeline-item:nth-child(even).completed::before {
                left: -60px;
            }

            .timeline-item.active::before {
                content: '●';
                position: absolute;
                top: 15px;
                width: 12px;
                height: 12px;
                background-color: var(--accent-color);
                border-radius: 50%;
                animation: pulse 2s infinite;
                z-index: 3;
            }

            .timeline-item:nth-child(odd).active::before {
                right: -56px;
            }

            .timeline-item:nth-child(even).active::before {
                left: -56px;
            }

            @keyframes pulse {
                0% { transform: scale(1); opacity: 1; }
                50% { transform: scale(1.2); opacity: 0.7; }
                100% { transform: scale(1); opacity: 1; }
            }

            /* Mobile Menu */
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

                .initiatives-grid {
                    grid-template-columns: 1fr;
                }

                .initiative-stats {
                    grid-template-columns: 1fr 1fr;
                }

                .timeline::before {
                    left: 30px;
                }

                .timeline-item {
                    width: 100%;
                    left: 0;
                    text-align: left;
                    padding-left: 70px;
                }

                .timeline-item:nth-child(even) {
                    left: 0;
                    text-align: left;
                }

                .timeline-date {
                    left: -35px !important;
                    right: auto !important;
                    width: 80px;
                    font-size: 0.8rem;
                }

                .timeline-item::before {
                    left: 20px !important;
                    right: auto !important;
                }

                .timeline-item.completed::before,
                .timeline-item.active::before {
                    left: 20px !important;
                    right: auto !important;
                }
            }

            @media screen and (max-width: 480px) {
                .initiative-stats {
                    grid-template-columns: 1fr;
                }

                .implementation-timeline {
                    padding: 20px;
                }

                .timeline-content {
                    padding: 20px;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Inicializar o Initiatives Manager
document.addEventListener('DOMContentLoaded', () => {
    const initiatives = new InitiativesManager();
});