// Scroll Suave para Links de Âncora
document.addEventListener('DOMContentLoaded', function() {
    // Função para scroll suave
    function smoothScroll(target) {
        const element = document.querySelector(target);
        if (element) {
            const offsetTop = element.offsetTop - 80; // Compensar altura do header fixo
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    // Adicionar evento de click aos links de âncora
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            smoothScroll(target);
        });
    });

    // Animação de Reveal ao Scroll
    function reveal() {
        const reveals = document.querySelectorAll('.reveal');
        
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }

    // Adicionar classe reveal aos elementos que devem animar
    function addRevealClasses() {
        const elementsToReveal = [
            '.hero-content',
            '.servico-card',
            '.beneficio-item',
            '.contato-content',
            '.section-title'
        ];
        
        elementsToReveal.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach((element, index) => {
                element.classList.add('reveal');
                element.style.transitionDelay = `${index * 0.1}s`;
            });
        });
    }

    // Inicializar
    addRevealClasses();
    reveal();

    // Event Listeners
    window.addEventListener('scroll', reveal);
    
    // Header scroll effect
    function headerScroll() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(13, 13, 13, 0.98)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.background = 'rgba(13, 13, 13, 0.95)';
            header.style.boxShadow = 'none';
        }
    }

    window.addEventListener('scroll', headerScroll);

    // Animação de números para estatísticas (se necessário no futuro)
    function animateNumbers() {
        const numbers = document.querySelectorAll('[data-number]');
        
        numbers.forEach(number => {
            const target = parseInt(number.getAttribute('data-number'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                number.textContent = Math.floor(current);
            }, 16);
        });
    }

    // Validação de formulário (se necessário no futuro)
    function validateForm(form) {
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });
        
        return isValid;
    }

    // Efeito parallax sutil no hero
    function parallaxEffect() {
        const hero = document.querySelector('.hero');
        const scrolled = window.pageYOffset;
        
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    }

    // Throttle function para performance
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    // Aplicar throttling nas funções de scroll
    window.addEventListener('scroll', throttle(reveal, 100));
    window.addEventListener('scroll', throttle(headerScroll, 100));
    window.addEventListener('scroll', throttle(parallaxEffect, 16));

    // Lazy loading para imagens (se necessário no futuro)
    function lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // Inicializar lazy loading
    lazyLoadImages();

    // Detectar quando elementos entram em viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Adicionar efeito de digitação ao título hero (opcional)
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Menu mobile (se necessário no futuro)
    function toggleMobileMenu() {
        const navMenu = document.querySelector('.nav-menu');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                mobileMenuBtn.classList.toggle('active');
            });
        }
    }

    // Inicializar menu mobile
    toggleMobileMenu();

    // Performance optimization
    function optimizePerformance() {
        // Preload critical resources
        const criticalResources = [
            'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap'
        ];
        
        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'style';
            link.href = resource;
            document.head.appendChild(link);
        });
    }

    // Inicializar otimizações
    optimizePerformance();

    console.log('RK Assessoria - Script inicializado com sucesso');
});
