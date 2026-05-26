document.addEventListener('DOMContentLoaded', () => {
    
    // =========================================================
    // 1. Header scroll effect
    // =========================================================
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // =========================================================
    // 2. Mobile hamburger menu
    // =========================================================
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            nav.classList.toggle('mobile-open');
            document.body.style.overflow = nav.classList.contains('mobile-open') ? 'hidden' : '';
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                nav.classList.remove('mobile-open');
                document.body.style.overflow = '';
            });
        });
    }

    // =========================================================
    // 3. Chronogram Tabs
    // =========================================================
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            button.classList.add('active');

            const tabId = button.getAttribute('data-tab');
            const targetPane = document.getElementById(tabId);
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });

    // =========================================================
    // 4. FAQ Accordion
    // =========================================================
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isActive = question.classList.contains('active');

            // Close all other FAQ items
            faqQuestions.forEach(q => {
                if (q !== question) {
                    q.classList.remove('active');
                    q.nextElementSibling.style.maxHeight = null;
                }
            });

            // Toggle current FAQ item
            if (isActive) {
                question.classList.remove('active');
                answer.style.maxHeight = null;
            } else {
                question.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    // =========================================================
    // 5. Scroll Reveal (IntersectionObserver)
    // =========================================================
    const revealElements = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback: show all immediately
        revealElements.forEach(el => el.classList.add('visible'));
    }

    // =========================================================
    // 6. Stat counter animation
    // =========================================================
    const statValues = document.querySelectorAll('.stat-value');
    let statsAnimated = false;

    function animateCounters() {
        if (statsAnimated) return;
        statsAnimated = true;

        statValues.forEach(stat => {
            const text = stat.textContent;
            const hasPlus = text.includes('+');
            const hasK = text.includes('K');
            let target;

            if (hasK) {
                target = parseInt(text.replace('K', '').replace('+', ''));
            } else {
                target = parseInt(text.replace('+', ''));
            }

            if (isNaN(target)) return;

            let current = 0;
            const increment = Math.max(1, Math.floor(target / 50));
            const duration = 1500;
            const stepTime = duration / (target / increment);

            const counter = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(counter);
                }
                
                let display = current.toString();
                if (hasK) display += 'K';
                if (hasPlus) display += '+';
                stat.textContent = display;
            }, stepTime);
        });
    }

    const statsGrid = document.querySelector('.stats-grid');
    if (statsGrid && 'IntersectionObserver' in window) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statsObserver.observe(statsGrid);
    }

    // =========================================================
    // 7. Scrollspy — Active nav highlighting
    // =========================================================
    const sections = document.querySelectorAll('section[id]');

    function highlightNavigation() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavigation);
    highlightNavigation();

    // =========================================================
    // 8. Smooth scroll for anchor links (with header offset)
    // =========================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const targetPos = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({
                    top: targetPos,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// ==================== Chat humanizado (estilo WhatsApp / iMessage) ====================
(function () {
    const chatToggle = document.getElementById('chat-toggle');
    const chatWindow = document.getElementById('chat-window');
    const chatClose = document.getElementById('chat-close');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    const chatTyping = document.getElementById('chat-typing');
    const quickReply = document.getElementById('chat-quick-reply');

    if (!chatToggle || !chatWindow) return;

    let conversationStep = 0;
    let isProcessing = false;

    function formatTime() {
        const d = new Date();
        return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
    }

    function addMessage(text, from = 'bot') {
        const wrapper = document.createElement('div');
        wrapper.className = 'chat-msg chat-msg--' + from;

        const bubble = document.createElement('div');
        bubble.className = 'msg-content';
        bubble.textContent = text;

        const time = document.createElement('div');
        time.className = 'msg-time';
        time.textContent = formatTime();

        wrapper.appendChild(bubble);
        wrapper.appendChild(time);
        chatMessages.appendChild(wrapper);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function showTyping(show) {
        chatTyping.classList.toggle('active', show);
        if (show) chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function botReply(userText) {
        const lower = userText.toLowerCase();

        if (lower.includes('show') || lower.includes('palco') || lower.includes('iluminação') || lower.includes('iluminacao')) {
            return 'Trabalhamos com shows completos: montagem de palcos, estruturas metálicas, iluminação cênica, grades, bastidores, tendas, banheiros químicos e containers. Qual a data do seu evento?';
        }
        if (lower.includes('projeto') || lower.includes('personalizado') || lower.includes('stand') || lower.includes('3d') || lower.includes('gratuito')) {
            return 'Somos a única empresa que entrega projetos em 3 dias e alterações em 1 dia útil! E mais: projetos de stands são GRATUITOS para contratos de montagem. Quer solicitar o seu?';
        }
        if (lower.includes('feira') || lower.includes('evento') || lower.includes('congresso') || lower.includes('exposição') || lower.includes('exposicao')) {
            return 'Fazemos montagem de stands, cenários, showrooms, congressos, displays e quiosques de fábrica para todo o Brasil. Me conte mais sobre o seu evento!';
        }
        if (lower.includes('buffet') || lower.includes('comida') || lower.includes('finger') || lower.includes('coffee') || lower.includes('bebida') || lower.includes('gastronomia')) {
            return 'Oferecemos buffet completo: finger foods, menus personalizados, bebidas e staff especializado. Tudo para seu evento corporativo ou festa!';
        }
        if (lower.includes('mobiliário') || lower.includes('movel') || lower.includes('cadeira') || lower.includes('mesa') || lower.includes('frigobar') || lower.includes('ar condicionado') || lower.includes('locação') || lower.includes('aluguel')) {
            return 'Locamos mesas, cadeiras, sofás, frigobar, ar condicionado, bistrôs, lounges e equipamentos de áudio e vídeo. Temos estoque para eventos de todos os portes!';
        }
        if (lower.includes('orçamento') || lower.includes('orcamento') || lower.includes('quero') || lower.includes('contratar')) {
            return 'Ótimo! Vou conectar você com nosso time comercial. Nosso prazo de resposta é de até 24 horas. Enquanto isso, qual o tipo de evento que você precisa?';
        }
        if (lower.includes('prazo') || lower.includes('entrega') || lower.includes('tempo')) {
            return 'Projetos em 3 dias e alterações em 1 dia útil — somos os mais rápidos do mercado! A montagem depende do porte, mas fazemos urgências. Qual a data do seu evento?';
        }
        if (lower.includes('consultor') || lower.includes('falar') || lower.includes('humano') || lower.includes('telefone') || lower.includes('whatsapp')) {
            return 'Claro! Me liga no (+55 11) 93439-3753 ou envia um email para vendas@officialbrasil.com.br. O Emerson ou alguém da equipe vai atender você hoje!';
        }
        if (lower.includes('contato') || lower.includes('email') || lower.includes('endereço') || lower.includes('endereco') || lower.includes('guarulhos') || lower.includes('aruja')) {
            return 'Sede comercial: Guarulhos-SP. Espaço fabril: Arujá-SP. Email: vendas@officialbrasil.com.br | atendimento@officialbrasil.com.br. WhatsApp: (+55 11) 93439-3753.';
        }

        const fallbacks = [
            'Entendi! Pode me contar mais sobre o que você precisa? Shows, stands, cenografia, buffet, mobiliário ou promoção de eventos?',
            'Boa pergunta! Vou passar para o time comercial responder com detalhes. Pode deixar seu WhatsApp?',
            'Trabalhamos com 6 áreas principais: Shows, Projetos Personalizados, Feiras e Eventos, Buffet, Mobiliário e Promoção de Eventos. Qual te interessa?',
        ];
        return fallbacks[Math.floor(Math.random() * fallbacks.length)];
    }

    function simulateResponse(userText) {
        isProcessing = true;
        showTyping(true);
        quickReply.style.display = 'none';

        setTimeout(() => {
            showTyping(false);
            const reply = botReply(userText);
            addMessage(reply, 'bot');
            isProcessing = false;
            conversationStep++;
            quickReply.style.display = 'flex';
        }, 1200 + Math.random() * 800);
    }

    function sendMessage(text) {
        if (isProcessing || !text.trim()) return;
        addMessage(text.trim(), 'user');
        chatInput.value = '';
        quickReply.style.display = 'none';
        simulateResponse(text.trim());
    }

    chatToggle.addEventListener('click', () => {
        chatWindow.classList.toggle('open');
        if (chatWindow.classList.contains('open')) {
            chatInput.focus();
            quickReply.style.display = 'flex';
        }
    });

    chatClose.addEventListener('click', () => {
        chatWindow.classList.remove('open');
    });

    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        sendMessage(chatInput.value);
    });

    quickReply.addEventListener('click', (e) => {
        const btn = e.target.closest('.quick-btn');
        if (!btn) return;
        sendMessage(btn.getAttribute('data-msg'));
    });

    window.addEventListener('keydown', (e) => {
        if (e.shiftKey && e.key === '?') {
            chatWindow.classList.add('open');
            chatInput.focus();
        }
    });
})();

// ==================== Scroll indicator hide ====================
(function () {
    const indicator = document.querySelector('.scroll-indicator');
    if (!indicator) return;
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 120) {
            indicator.style.opacity = '0';
            indicator.style.pointerEvents = 'none';
        } else {
            indicator.style.opacity = '';
            indicator.style.pointerEvents = '';
        }
    });
})();

// ==================== Parallax tilt on service cards ====================
(function () {
    const cards = document.querySelectorAll('.service-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / centerY * -4;
            const rotateY = (x - centerX) / centerX * 4;
            card.style.transform =
                `translateY(-8px) perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
})();

// ==================== Gallery lightbox (for real images) ====================
(function () {
    const gallery = document.querySelector('.bento-grid');
    const lightbox = document.querySelector('.lightbox');
    const lbImg = lightbox ? lightbox.querySelector('.lightbox-image') : null;
    if (!gallery || !lightbox || !lbImg) return;

    gallery.querySelectorAll('.bento-item').forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            const img = card.querySelector('.bento-image');
            if (img) {
                lbImg.src = img.src;
                lbImg.alt = img.alt;
                lbImg.style.display = 'block';
            }
            lightbox.classList.add('open');
        });
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target.classList.contains('lightbox') || e.target.classList.contains('lightbox-close')) {
            lightbox.classList.remove('open');
        }
    });
})();
