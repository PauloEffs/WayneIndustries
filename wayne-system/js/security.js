class SecurityManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupMobileMenu();
        this.setupDistrictInteractions();
        this.animateSecurityStats();
        this.setupReportButtons();
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

    setupDistrictInteractions() {
        const districts = document.querySelectorAll('.district');
        districts.forEach(district => {
            district.addEventListener('click', () => {
                this.showDistrictInfo(district);
            });
        });
    }

    showDistrictInfo(district) {
        const districtName = district.getAttribute('data-district');
        const safetyLevel = district.querySelector('.safety-level').textContent;
        
        const info = this.getDistrictDetails(districtName);
        
        // Criar modal para mostrar informações do distrito
        const modal = document.createElement('div');
        modal.className = 'district-modal';
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
                padding: 30px;
                border-radius: 15px;
                max-width: 500px;
                width: 90%;
                border: 2px solid var(--secondary-color);
                animation: slideInUp 0.3s ease;
            ">
                <h3 style="color: var(--secondary-color); margin-bottom: 20px; font-size: 1.5rem;">
                    ${districtName}
                </h3>
                <p style="color: white; margin-bottom: 15px;">
                    <strong>Nível de Segurança:</strong> ${safetyLevel}
                </p>
                <p style="color: rgba(255,255,255,0.8); margin-bottom: 20px; line-height: 1.6;">
                    ${info.description}
                </p>
                <div style="margin-bottom: 20px;">
                    <h4 style="color: var(--secondary-color); margin-bottom: 10px;">Estatísticas:</h4>
                    <ul style="color: rgba(255,255,255,0.8); padding-left: 20px;">
                        ${info.stats.map(stat => `<li style="margin-bottom: 8px;">${stat}</li>`).join('')}
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
        
        // Fechar ao clicar fora
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    getDistrictDetails(districtName) {
        const details = {
            'Financial': {
                description: 'O distrito financeiro de Gotham abriga as principais instituições bancárias e corporativas da cidade. Altamente monitorado e protegido com sistemas de segurança avançados.',
                stats: [
                    'Taxa de Crime: -45% em relação ao ano anterior',
                    'Patrulhamento: 24/7 com 12 unidades',
                    'Câmeras de segurança: 250 unidades ativas',
                    'Tempo de resposta: 2 minutos',
                    'Incidentes resolvidos: 98.7%'
                ]
            },
            'Industrial': {
                description: 'Área industrial com fábricas e armazéns. Requer atenção especial devido ao movimento de cargas e atividades noturnas. Monitoramento intensificado em horários críticos.',
                stats: [
                    'Taxa de Crime: +12% em relação ao ano anterior',
                    'Patrulhamento: Intensificado com 8 unidades',
                    'Câmeras de segurança: 180 unidades ativas',
                    'Tempo de resposta: 4 minutos',
                    'Alertas ativos: 3 de segurança'
                ]
            },
            'Residential': {
                description: 'Zona residencial de classe média e alta. Área considerada segura com baixos índices de criminalidade e alta satisfação dos moradores.',
                stats: [
                    'Taxa de Crime: -23% em relação aoano anterior',
                    'Patrulhamento: Regular com 6 unidades',
                    'Câmeras de segurança: 320 unidades ativas',
                    'Tempo de resposta: 3 minutos',
                    'Satisfação dos moradores: 94%'
                ]
            },
            'Narrows': {
                description: 'Área problemática com alta densidade populacional e índices elevados de criminalidade. Foco principal das operações de segurança e programas sociais.',
                stats: [
                    'Taxa de Crime: -8% em relação ao ano anterior (melhoria)',
                    'Patrulhamento: Operação especial 24h',
                    'Câmeras de segurança: 150 unidades reforçadas',
                    'Tempo de resposta: 5 minutos',
                    'Programas sociais ativos: 12'
                ]
            }
        };
        return details[districtName] || { description: 'Informações não disponíveis', stats: [] };
    }

    animateSecurityStats() {
        const crimeCards = document.querySelectorAll('.crime-card');
        const reportCards = document.querySelectorAll('.report-card');
        const patrolUnits = document.querySelectorAll('.patrol-unit');

        // Animar cards de crime
        crimeCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.animation = 'fadeInUp 0.5s ease forwards';
            }, index * 150);
        });

        // Animar números das estatísticas
        setTimeout(() => {
            const crimeNumbers = document.querySelectorAll('.crime-number');
            crimeNumbers.forEach(number => {
                const finalValue = number.textContent;
                number.textContent = '0%';
                
                setTimeout(() => {
                    number.style.transition = 'all 1s ease';
                    number.textContent = finalValue;
                }, 300);
            });
        }, 500);

        // Animar relatórios
        reportCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.animation = 'slideInRight 0.5s ease forwards';
            }, (index * 100) + 800);
        });

        // Animar unidades de patrulha
        patrolUnits.forEach((unit, index) => {
            setTimeout(() => {
                unit.style.animation = 'slideInLeft 0.5s ease forwards';
            }, (index * 150) + 1200);
        });

        // Animar barras de progresso das patrulhas
        setTimeout(() => {
            const progressBars = document.querySelectorAll('.patrol-unit .progress');
            progressBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0%';
                
                setTimeout(() => {
                    bar.style.transition = 'width 2s ease';
                    bar.style.width = width;
                }, 200);
            });
        }, 1500);
    }

    setupReportButtons() {
        const reportButtons = document.querySelectorAll('.report-btn');
        reportButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const reportCard = btn.closest('.report-card');
                const reportTitle = reportCard.querySelector('h4').textContent;
                
                this.showReportAction(reportTitle, btn.classList.contains('urgent'));
            });
        });
    }

    showReportAction(reportTitle, isUrgent) {
        const message = isUrgent ? 
            `Alerta de Segurança: ${reportTitle}\n\n3 alertas requerem atenção imediata:\n- Atividade suspeita no Distrito Industrial\n- Falha de câmera no setor 7\n- Patrulha Gamma-3 sem resposta` :
            `Relatório: ${reportTitle}\n\nRelatório carregado com sucesso.\nDados atualizados e disponíveis para análise.`;

        this.showNotification(message, isUrgent ? 'urgent' : 'info');
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `security-notification ${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: ${type === 'urgent' ? 'var(--danger-color)' : 'var(--accent-color)'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            z-index: 1001;
            animation: slideInRight 0.3s ease;
            max-width: 350px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            white-space: pre-line;
            font-weight: 500;
        `;
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, type === 'urgent' ? 6000 : 4000);
    }

    addAnimationStyles() {
        if (document.getElementById('security-animations')) return;

        const style = document.createElement('style');
        style.id = 'security-animations';
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }

            @keyframes slideInUp {
                from { opacity: 0; transform: translateY(30px); }
                to { opacity: 1; transform: translateY(0); }
            }

            @keyframes fadeInUp {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }

            @keyframes slideInRight {
                from { opacity: 0; transform: translateX(30px); }
                to { opacity: 1; transform: translateX(0); }
            }

            @keyframes slideInLeft {
                from { opacity: 0; transform: translateX(-30px); }
                to { opacity: 1; transform: translateX(0); }
            }

            @keyframes slideOutRight {
                from { opacity: 1; transform: translateX(0); }
                to { opacity: 0; transform: translateX(100px); }
            }

            .crime-card, .report-card, .patrol-unit {
                opacity: 0;
            }

            .district:hover {
                transform: scale(1.05);
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
            }

            .report-card:hover {
                transform: translateY(-5px);
                box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
            }

            .patrol-unit {
                background: linear-gradient(135deg, #2a2a2a 0%, #3a3a3a 100%);
                padding: 20px;
                border-radius: 12px;
                border-left: 4px solid var(--secondary-color);
                margin-bottom: 20px;
            }

            .unit-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 15px;
            }

            .unit-header h4 {
                color: var(--secondary-color);
                margin: 0;
            }

            .unit-status {
                padding: 4px 12px;
                border-radius: 12px;
                font-size: 0.8rem;
                font-weight: 600;
                text-transform: uppercase;
            }

            .unit-status.active {
                background-color: var(--success-color);
                color: white;
            }

            .unit-status.maintenance {
                background-color: #ff9800;
                color: white;
            }

            .unit-details p {
                margin: 5px 0;
                color: rgba(255, 255, 255, 0.8);
                font-size: 0.9rem;
            }

            .unit-progress {
                margin-top: 10px;
            }

            .unit-progress span {
                font-size: 0.85rem;
                color: rgba(255, 255, 255, 0.7);
            }

            .security-reports, .patrol-status {
                margin-top: 40px;
            }

            .security-reports h3, .patrol-status h3 {
                color: var(--secondary-color);
                margin-bottom: 25px;
                font-size: 1.5rem;
            }

            .reports-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 20px;
            }

            .report-card {
                background: linear-gradient(135deg, #2a2a2a 0%, #3a3a3a 100%);
                padding: 20px;
                border-radius: 12px;
                display: flex;
                align-items: center;
                gap: 15px;
                transition: var(--transition);
            }

            .report-icon {
                font-size: 2rem;
                padding: 15px;
                border-radius: 50%;
                background-color: rgba(184, 134, 11, 0.1);
                color: var(--secondary-color);
            }

            .report-info {
                flex: 1;
            }

            .report-info h4 {
                margin: 0 0 8px 0;
                color: var(--light-text);
                font-size: 1.1rem;
            }

            .report-info p {
                margin: 0 0 8px 0;
                color: rgba(255, 255, 255, 0.8);
                font-size: 0.9rem;
            }

            .report-date {
                font-size: 0.8rem;
                color: rgba(255, 255, 255, 0.6);
            }

            .report-btn {
                width: 40px;
                height: 40px;
                border: none;
                border-radius: 50%;
                background-color: var(--accent-color);
                color: white;
                cursor: pointer;
                transition: var(--transition);
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .report-btn:hover {
                background-color: var(--secondary-color);
                transform: scale(1.1);
            }

            .report-btn.urgent {
                background-color: var(--danger-color);
                animation: pulse 2s infinite;
            }

            .patrol-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 20px;
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
            }
        `;
        document.head.appendChild(style);
    }
}

// Inicializar o Security Center
document.addEventListener('DOMContentLoaded', () => {
    const security = new SecurityManager();
});