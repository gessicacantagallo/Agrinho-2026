// MOBILE MENU TOGGLE
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    
    // Posicionar menu mobile corretamente
    if (navLinks.style.display === 'flex') {
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.flexDirection = 'column';
        navLinks.style.gap = '0';
        navLinks.style.backgroundColor = 'white';
        navLinks.style.boxShadow = '0 5px 10px rgba(0,0,0,0.1)';
    }
});

// Fechar menu ao clicar em um link
navItems.forEach(item => {
    item.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.style.display = 'none';
    });
});

// FORMULÁRIO DE CONTATO
const formulario = document.getElementById('formulario');

if (formulario) {
    formulario.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const mensagem = document.getElementById('mensagem').value;
        
        // Validação básica
        if (nome.trim() === '' || email.trim() === '' || mensagem.trim() === '') {
            showAlert('Por favor, preencha todos os campos!', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showAlert('Por favor, insira um email válido!', 'error');
            return;
        }
        
        // Simular envio (em produção, integrar com backend)
        showAlert('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
        formulario.reset();
    });
}

// Função para validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Função para mostrar alertas
function showAlert(message, type) {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    alert.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background-color: ${type === 'success' ? '#27ae60' : '#e74c3c'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 9999;
        animation: slideIn 0.3s ease-in-out;
    `;
    
    document.body.appendChild(alert);
    
    // Remover alerta após 3 segundos
    setTimeout(() => {
        alert.style.animation = 'slideOut 0.3s ease-in-out';
        setTimeout(() => alert.remove(), 300);
    }, 3000);
}

// Adicionar estilos de animação
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// SCROLL ANIMATION
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-in-out';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Aplicar animação aos cards
const cards = document.querySelectorAll('.card-info, .pratica-card, .beneficio-item');
cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    observer.observe(card);
});

// Adicionar estilos de fade-in-up
const fadeInStyle = document.createElement('style');
fadeInStyle.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(fadeInStyle);

// SMOOTH SCROLL para navegação
const scrollLinks = document.querySelectorAll('a[href^="#"]');
scrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

console.log('✓ Site de Agricultura Sustentável carregado com sucesso!');