// ===== INVENTORY WAYNE SYSTEM =====

class InventoryManager {
    constructor() {
        this.currentCategory = 'all';
        this.items = this.getInitialItems();
        this.editingItemId = null;

        this.init();
    }

    init() {
        this.setupMobileMenu();
        this.setupEventListeners();
        this.setupModal();
        this.refreshDisplay();
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

    getInitialItems() {
        return [
            {
                id: 1,
                name: 'Batsuit Mark VII',
                category: 'equipment',
                quantity: 1,
                status: 'operational',
                location: 'Batcaverna - Arsenal',
                description: 'Traje avançado com proteção balística e sistemas integrados de comunicação e navegação.'
            },
            {
                id: 2,
                name: 'Batmobile',
                category: 'vehicles',
                quantity: 1,
                status: 'operational',
                location: 'Batcaverna - Garagem',
                description: 'Veículo blindado com capacidades táticas avançadas, motor híbrido e sistemas defensivos.'
            },
            {
                id: 3,
                name: 'Grappling Gun',
                category: 'equipment',
                quantity: 5,
                status: 'operational',
                location: 'Batcaverna - Arsenal',
                description: 'Dispositivo de grappling com cabo de alta resistência e alcance de 200 metros.'
            },
            {
                id: 4,
                name: 'Sistema de Vigilância',
                category: 'security',
                quantity: 50,
                status: 'operational',
                location: 'Gotham City - Distribuído',
                description: 'Câmeras de segurança com IA integrada em pontos estratégicos da cidade.'
            },
            {
                id: 5,
                name: 'Batwing',
                category: 'vehicles',
                quantity: 1,
                status: 'maintenance',
                location: 'Batcaverna - Hangar',
                description: 'Aeronave stealth para patrulhamento aéreo com capacidades de combate.'
            },
            {
                id: 6,
                name: 'Detector de Explosivos',
                category: 'security',
                quantity: 20,
                status: 'operational',
                location: 'Wayne Tower - Ala de Segurança',
                description: 'Equipamento portátil para detecção de materiais explosivos e químicos perigosos.'
            },
            {
                id: 7,
                name: 'Batarangs',
                category: 'equipment',
                quantity: 25,
                status: 'operational',
                location: 'Batcaverna - Arsenal',
                description: 'Projéteis não letais em formato de morcego com diferentes funcionalidades.'
            },
            {
                id: 8,
                name: 'Batboat',
                category: 'vehicles',
                quantity: 1,
                status: 'operational',
                location: 'Batcaverna - Doca',
                description: 'Embarcação aquática para operações nos rios e costas de Gotham.'
            },
            {
                id: 9,
                name: 'Cinto Multiuso',
                category: 'equipment',
                quantity: 3,
                status: 'operational',
                location: 'Batcaverna - Arsenal',
                description: 'Cinto utilitário com compartimentos para diversos equipamentos táticos.'
            },
            {
                id: 10,
                name: 'Scanner de Evidências',
                category: 'security',
                quantity: 30,
                status: 'operational',
                location: 'Batcaverna - Laboratório',
                description: 'Dispositivo avançado para análise forense e coleta de evidências.'
            }
        ];
    }

    setupEventListeners() {
        // Botões de categoria
        const categoryBtns = document.querySelectorAll('.inventory-tabs .tab-btn');
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.setActiveCategory(btn);
                this.currentCategory = btn.getAttribute('data-category');
                this.refreshDisplay();
            });
        });

        // Botão adicionar item
        const addBtn = document.getElementById('addItemBtn');
        if (addBtn) {
            addBtn.addEventListener('click', () => {
                this.openModal();
            });
        }
    }

    setActiveCategory(activeBtn) {
        const categoryBtns = document.querySelectorAll('.inventory-tabs .tab-btn');
        categoryBtns.forEach(btn => btn.classList.remove('active'));
        activeBtn.classList.add('active');
    }

    refreshDisplay() {
        const inventoryGrid = document.getElementById('inventoryGrid');
        if (!inventoryGrid) return;

        const filteredItems = this.currentCategory === 'all' 
            ? this.items 
            : this.items.filter(item => item.category === this.currentCategory);

        inventoryGrid.innerHTML = '';

        if (filteredItems.length === 0) {
            inventoryGrid.innerHTML = `
                <div class="no-items">
                    <i class="fas fa-box-open"></i>
                    <h3>Nenhum item encontrado</h3>
                    <p>Não há itens nesta categoria.</p>
                </div>
            `;
            return;
        }

        filteredItems.forEach((item, index) => {
            const itemElement = this.createItemElement(item);
            inventoryGrid.appendChild(itemElement);

            // Animação escalonada
            setTimeout(() => {
                itemElement.style.animation = 'slideInUp 0.5s ease forwards';
            }, index * 100);
        });
    }

    createItemElement(item) {
        const itemDiv = document.createElement('div');
        itemDiv.className = `inventory-item ${item.category}`;
        itemDiv.innerHTML = `
            <div class="item-header">
                <div class="item-info">
                    <div class="item-category ${item.category}">${this.getCategoryName(item.category)}</div>
                    <h4>${item.name}</h4>
                </div>
                <div class="item-actions">
                    <button class="action-btn edit-btn" onclick="inventoryManager.editItem(${item.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete-btn" onclick="inventoryManager.deleteItem(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <div class="item-details">
                <p><strong>Localização:</strong> ${item.location}</p>
                <p><strong>Descrição:</strong> ${item.description}</p>
            </div>
            <div class="item-status">
                <span class="status-indicator ${item.status}">${this.getStatusName(item.status)}</span>
                <span class="item-quantity">Qty: ${item.quantity}</span>
            </div>
        `;
        return itemDiv;
    }

    getCategoryName(category) {
        const names = {
            'equipment': 'Equipamento',
            'vehicles': 'Veículo',
            'security': 'Segurança'
        };
        return names[category] || category;
    }

    getStatusName(status) {
        const names = {
            'operational': 'Operacional',
            'maintenance': 'Manutenção',
            'inactive': 'Inativo'
        };
        return names[status] || status;
    }

    setupModal() {
        const modal = document.getElementById('itemModal');
        const closeBtn = document.getElementById('closeModal');
        const cancelBtn = document.getElementById('cancelBtn');
        const form = document.getElementById('itemForm');

        // Fechar modal
        [closeBtn, cancelBtn].forEach(btn => {
            if (btn) {
                btn.addEventListener('click', () => {
                    this.closeModal();
                });
            }
        });

        // Fechar modal clicando fora
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal();
                }
            });
        }

        // Submit do formulário
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveItem();
            });
        }
    }

    openModal(item = null) {
        const modal = document.getElementById('itemModal');
        const modalTitle = document.getElementById('modalTitle');
        
        if (item) {
            modalTitle.textContent = 'Editar Item';
            this.editingItemId = item.id;
            this.populateForm(item);
        } else {
            modalTitle.textContent = 'Adicionar Item';
            this.editingItemId = null;
            this.clearForm();
        }

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        const modal = document.getElementById('itemModal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
        this.clearForm();
        this.editingItemId = null;
    }

    populateForm(item) {
        document.getElementById('itemName').value = item.name;
        document.getElementById('itemCategory').value = item.category;
        document.getElementById('itemQuantity').value = item.quantity;
        document.getElementById('itemStatus').value = item.status;
        document.getElementById('itemLocation').value = item.location;
        document.getElementById('itemDescription').value = item.description;
    }

    clearForm() {
        document.getElementById('itemForm').reset();
    }

    saveItem() {
        const formData = {
            name: document.getElementById('itemName').value,
            category: document.getElementById('itemCategory').value,
            quantity: parseInt(document.getElementById('itemQuantity').value),
            status: document.getElementById('itemStatus').value,
            location: document.getElementById('itemLocation').value,
            description: document.getElementById('itemDescription').value
        };

        if (this.editingItemId) {
            // Editar item existente
            const itemIndex = this.items.findIndex(item => item.id === this.editingItemId);
            if (itemIndex !== -1) {
                this.items[itemIndex] = { ...this.items[itemIndex], ...formData };
            }
        } else {
            // Adicionar novo item
            const newItem = {
                id: this.getNextId(),
                ...formData
            };
            this.items.push(newItem);
        }

        this.closeModal();
        this.refreshDisplay();
        this.showNotification(this.editingItemId ? 'Item atualizado com sucesso!' : 'Item adicionado com sucesso!');
    }

    editItem(id) {
        const item = this.items.find(item => item.id === id);
        if (item) {
            this.openModal(item);
        }
    }

    deleteItem(id) {
        const item = this.items.find(item => item.id === id);
        if (confirm(`Tem certeza que deseja excluir "${item.name}"?`)) {
            this.items = this.items.filter(item => item.id !== id);
            this.refreshDisplay();
            this.showNotification('Item excluído com sucesso!');
        }
    }

    getNextId() {
        return this.items.length > 0 ? Math.max(...this.items.map(item => item.id)) + 1 : 1;
    }

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `inventory-notification ${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: ${type === 'success' ? 'var(--success-color)' : 'var(--danger-color)'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            z-index: 1001;
            animation: slideInRight 0.3s ease;
            font-weight: 600;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
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
        }, 3000);
    }

    addAnimationStyles() {
        if (document.getElementById('inventory-animations')) return;

        const style = document.createElement('style');
        style.id = 'inventory-animations';
        style.textContent = `
            @keyframes slideInUp {
                from { opacity: 0; transform: translateY(30px); }
                to { opacity: 1; transform: translateY(0); }
            }

            @keyframes slideInRight {
                from { opacity: 0; transform: translateX(100px); }
                to { opacity: 1; transform: translateX(0); }
            }

            @keyframes slideOutRight {
                from { opacity: 1; transform: translateX(0); }
                to { opacity: 0; transform: translateX(100px); }
            }

            .inventory-item {
                opacity: 0;
                transform: translateY(30px);
            }

            .inventory-item:hover {
                transform: translateY(-8px);
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
            }

            .no-items {
                grid-column: 1 / -1;
                text-align: center;
                padding: 60px 20px;
                color: rgba(255, 255, 255, 0.6);
                background: linear-gradient(135deg, #2a2a2a 0%, #3a3a3a 100%);
                border-radius: 15px;
                border: 2px dashed rgba(184, 134, 11, 0.3);
            }

            .no-items i {
                font-size: 4rem;
                margin-bottom: 20px;
                color: rgba(184, 134, 11, 0.5);
            }

            .no-items h3 {
                margin-bottom: 10px;
                color: rgba(255, 255, 255, 0.8);
                font-size: 1.5rem;
            }

            .no-items p {
                color: rgba(255, 255, 255, 0.6);
                font-size: 1.1rem;
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

// Disponibilizar globalmente para os event handlers inline
let inventoryManager;

// Inicializar o Inventory Manager
document.addEventListener('DOMContentLoaded', () => {
    inventoryManager = new InventoryManager();
});