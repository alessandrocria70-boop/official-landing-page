let contentData = null;

document.addEventListener('content:ready', (e) => {
  contentData = e.detail;
  initApp();
});

if (document.readyState === 'complete' || document.readyState === 'interactive') {
  setTimeout(() => {
    if (!contentData) initApp();
  }, 2000);
}

function initApp() {
  initHeader();
  initMobileMenu();
  initReveal();
  initCounters();
  initScrollspy();
  initSmoothScroll();
  initScrollIndicator();
  initTestimonialsAutoplay();
  initServiceVideos();
  initChat();
  initLightbox();
  initExitPopup();
  initParallax();
}

// Utilitário debounce
function debounce(fn, ms) {
  let timer;
  return function() {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, arguments), ms);
  };
}

function initHeader() {
  const header = document.querySelector('.header');
  if (!header) return;
  const onScroll = debounce(() => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  }, 10);
  window.addEventListener('scroll', onScroll, { passive: true });
}

function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.nav');
  if (!hamburger || !nav) return;
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('mobile-open');
    document.body.style.overflow = nav.classList.contains('mobile-open') ? 'hidden' : '';
  });
  nav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      nav.classList.remove('mobile-open');
      document.body.style.overflow = '';
    });
  });
}

function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach(el => { el.classList.add('visible');
    staggerChildren(el); });
    return;
  }
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        staggerChildren(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
  els.forEach(el => obs.observe(el));
}

function staggerChildren(container) {
  const items = container.querySelectorAll('.service-card, .step-card, .step-glass, .bento-item, .testimonial-card, .feature-card');
  items.forEach((el, i) => {
    const delay = el.classList.contains('service-card--featured') ? 0 : i * 0.12;
    el.style.setProperty('--stagger-delay', `${delay}s`);
  });
}

function initCounters() {
  const statValues = document.querySelectorAll('.stat-value');
  if (!statValues.length) return;
  let animated = false;

  function animate() {
    if (animated) return;
    animated = true;
    statValues.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'));
      if (isNaN(target)) return;
      const text = stat.textContent;
      const suffix = text.replace(/[\d]/g, '');
      const duration = 1800;
      const startTime = performance.now();

      function easeOutExpo(t) {
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      }

      function step(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.round(easeOutExpo(progress) * target);
        stat.textContent = current + suffix;
        if (progress < 1) requestAnimationFrame(step);
      }

      requestAnimationFrame(step);
    });
  }

  const hero = document.querySelector('.hero');
  if (!hero) { animate(); return; }
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) { animate(); obs.unobserve(entries[0].target); }
    }, { threshold: 0.5 });
    obs.observe(hero);
  } else { animate(); }
}

function initScrollspy() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  if (!sections.length) return;

  function highlight() {
    const scrollY = window.pageYOffset;
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollY > top && scrollY <= top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) link.classList.add('active');
        });
      }
    });
  }
  window.addEventListener('scroll', highlight);
  highlight();
}

function initSmoothScroll() {
  const DURATION = 900;
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      const targetY = target.getBoundingClientRect().top + window.pageYOffset - 80;
      const startY = window.pageYOffset;
      const startTime = performance.now();

      function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      }

      function step(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / DURATION, 1);
        window.scrollTo(0, startY + (targetY - startY) * easeInOutCubic(progress));
        if (progress < 1) requestAnimationFrame(step);
      }

      requestAnimationFrame(step);
    });
  });
}

function initScrollIndicator() {
  const indicator = document.querySelector('.scroll-indicator');
  if (!indicator) return;
  window.addEventListener('scroll', () => {
    indicator.style.opacity = window.scrollY > 120 ? '0' : '';
    indicator.style.pointerEvents = window.scrollY > 120 ? 'none' : '';
  });
}

function initTestimonialsAutoplay() {
  if (!('IntersectionObserver' in window)) return;
  const videos = document.querySelectorAll('.testimonial-video');
  if (!videos.length) {
    document.addEventListener('content:ready', () => {
      const els = document.querySelectorAll('.testimonial-video');
      if (els.length) observeAll(els);
    });
    return;
  }
  observeAll(videos);

  function observeAll(els) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.play().catch(() => {});
        } else {
          entry.target.pause();
        }
      });
    }, { threshold: 0.5 });
    els.forEach(v => obs.observe(v));
  }
}

function initServiceVideos() {
  if (!('IntersectionObserver' in window)) return;
  const videos = document.querySelectorAll('.service-card-visual video');
  if (!videos.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.play().catch(() => {});
      } else {
        entry.target.pause();
      }
    });
  }, { threshold: 0.3 });
  videos.forEach(v => obs.observe(v));
}

function initChat() {
  const chatToggle = document.getElementById('chat-toggle');
  const chatWindow = document.getElementById('chat-window');
  const chatClose = document.getElementById('chat-close');
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const chatMessages = document.getElementById('chat-messages');
  const chatTyping = document.getElementById('chat-typing');
  const quickReply = document.getElementById('chat-quick-reply');

  if (!chatToggle || !chatWindow) return;

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

  const welcomeMessages = [
    'Olá! Bem-vindo à Official Brasil. Como posso ajudar seu evento?',
    'Fala aí! Official Brasil na escuta. Me conta sobre seu evento!',
    'Opa, tudo bem? Aqui é da Official. Como posso ajudar no seu evento?',
  ];

  function getRandomWelcome() {
    return welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
  }

  // Substitui a mensagem inicial por uma variavel
  const firstMsg = chatMessages.querySelector('.chat-msg--bot .msg-content');
  if (firstMsg) firstMsg.textContent = getRandomWelcome();

  function redirectToWhatsApp(msg) {
    const phone = '5511934393753';
    const text = encodeURIComponent(msg);
    window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${text}`, '_blank');
  }

  function botReply(userText) {
    const lower = userText.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    if (lower.includes('show') || lower.includes('palco') || lower.includes('ilumina') || lower.includes('musica') || lower.includes('banda')) {
      return 'Fechou! Montamos palco, iluminacao, estrutura e tenda. Qual a data do evento?';
    }
    if (lower.includes('projeto') || lower.includes('stand') || lower.includes('3d') || lower.includes('render') || lower.includes('cenografia')) {
      return 'Projeto em 3 dias e alteracao em 1 dia util. E de graca se voce fechar a montagem com a gente. Quer solicitar?';
    }
    if (lower.includes('feira') || lower.includes('evento') || lower.includes('congresso') || lower.includes('exposicao')) {
      return 'Fazemos stands completos para feiras no Brasil todo. Me conta mais sobre o seu evento!';
    }
    if (lower.includes('buffet') || lower.includes('comida') || lower.includes('coffee') || lower.includes('bebida') || lower.includes('garcom')) {
      return 'Temos buffet completo: finger food, menu personalizado, coffee break e staff. Corporativo ou festa?';
    }
    if (lower.includes('mobiliario') || lower.includes('movel') || lower.includes('cadeira') || lower.includes('aluguel') || lower.includes('locacao') || lower.includes('sofa') || lower.includes('mesa')) {
      return 'Locamos mesas, cadeiras, sofa, frigobar, ar condicionado, lounge. Temos estoque pra tudo.';
    }
    if (lower.includes('orcamento') || lower.includes('quero') || lower.includes('contratar') || lower.includes('preco') || lower.includes('valor') || lower.includes('custo')) {
      return 'Bora! Qual o tipo de evento que voce precisa? A gente responde em ate 24h.';
    }
    if (lower.includes('whatsapp') || lower.includes('telefone') || lower.includes('falar') || lower.includes('humano') || lower.includes('ligar') || lower.includes('consultor')) {
      const msg = 'Ola Lucas! Quero falar com um consultor da Official Brasil sobre meu evento.';
      redirectToWhatsApp(msg);
      return 'Vou te redirecionar pro WhatsApp agora!';
    }
    if (lower.includes('obrigado') || lower.includes('valeu') || lower.includes('obrigada')) {
      return 'Por nada! Se precisar, so chamar. Quer falar com a gente no WhatsApp?';
    }

    const fallbacks = [
      'Pode me contar mais? Show, stand, buffet, mobiliario... o que voce precisa?',
      'Trabalhamos com 6 areas: Shows, Projetos, Feiras, Buffet, Mobiliario e Promocao. Qual te interessa?',
      'Pode deixar seu contato que o time comercial liga hoje ainda?',
      'Nao entendi direito \u2014 pode explicar melhor? Show, feira, buffet... qual sua ideia?',
    ];
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  }

  function simulateResponse(userText) {
    isProcessing = true;
    showTyping(true);
    if (quickReply) quickReply.style.display = 'none';

    setTimeout(() => {
      showTyping(false);
      const reply = botReply(userText);
      addMessage(reply, 'bot');

      const lower = userText.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const wantsRedirect = lower.includes('whatsapp') || lower.includes('telefone') || lower.includes('sim') || lower.includes('quero falar');

      if (wantsRedirect) {
        setTimeout(() => {
          const msg = `Ola Lucas! Quero falar com um consultor da Official Brasil sobre meu evento. Conversamos pelo site.`;
          redirectToWhatsApp(msg);
          addMessage('Redirecionando pro WhatsApp...', 'bot');
        }, 1000);
      } else {
        setTimeout(() => {
          addMessage('Quer que eu te passe pro WhatsApp pra falar com o time comercial? E rapidinho.', 'bot');
          if (quickReply) {
            quickReply.innerHTML = `
              <button class="quick-btn" data-msg="Sim, quero falar no WhatsApp">Sim, quero!</button>
              <button class="quick-btn" data-msg="Ainda estou pesquisando">Ainda to vendo</button>
            `;
            quickReply.style.display = 'flex';
          }
        }, 1500);
      }
      isProcessing = false;
    }, 800 + Math.random() * 600);
  }

  function sendMessage(text) {
    if (isProcessing || !text.trim()) return;
    addMessage(text.trim(), 'user');
    chatInput.value = '';
    if (quickReply) quickReply.style.display = 'none';
    simulateResponse(text.trim());
  }

  chatToggle.addEventListener('click', () => {
    chatWindow.classList.toggle('open');
    if (chatWindow.classList.contains('open')) {
      chatInput.focus();
      if (quickReply) quickReply.style.display = 'flex';
    }
  });

  if (chatClose) {
    chatClose.addEventListener('click', () => chatWindow.classList.remove('open'));
  }

  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    sendMessage(chatInput.value);
  });

  if (quickReply) {
    quickReply.addEventListener('click', (e) => {
      const btn = e.target.closest('.quick-btn');
      if (!btn) return;
      sendMessage(btn.getAttribute('data-msg'));
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.shiftKey && e.key === '?') {
      chatWindow.classList.add('open');
      chatInput.focus();
    }
  });
}

function initLightbox() {
  const lightbox = document.querySelector('.lightbox');
  if (!lightbox) return;
  const lbImg = lightbox.querySelector('.lightbox-image');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');
  let galleryItems = [];
  let currentIndex = -1;

  function openAtIndex(index) {
    const items = galleryItems.filter(item => !item.closest('.bento-item--hidden'));
    if (!items.length) return;
    currentIndex = Math.max(0, Math.min(index, items.length - 1));
    const card = items[currentIndex];
    const img = card.querySelector('.bento-image');
    if (img && lbImg) {
      lbImg.src = img.src;
      lbImg.alt = img.alt;
      lbImg.style.display = 'block';
    }
    lightbox.classList.add('open');
  }

  function navigate(direction) {
    const items = galleryItems.filter(item => !item.closest('.bento-item--hidden'));
    if (!items.length) return;
    const filteredIndex = items.indexOf(galleryItems[currentIndex]);
    if (filteredIndex < 0) { openAtIndex(0); return; }
    const newFilteredIndex = (filteredIndex + direction + items.length) % items.length;
    const newGlobalIndex = galleryItems.indexOf(items[newFilteredIndex]);
    if (newGlobalIndex >= 0) openAtIndex(newGlobalIndex);
  }

  function bindGallery() {
    const grid = document.querySelector('.bento-grid');
    if (!grid) return;
    galleryItems = [...grid.querySelectorAll('.bento-item')];
    galleryItems.forEach((card, i) => {
      card.style.cursor = 'pointer';
      card.addEventListener('click', () => openAtIndex(i));
    });
    lightbox.addEventListener('click', (e) => {
      if (e.target.classList.contains('lightbox') || e.target.classList.contains('lightbox-close')) {
        lightbox.classList.remove('open');
      }
    });
    if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); navigate(-1); });
    if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); navigate(1); });
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') lightbox.classList.remove('open');
      if (e.key === 'ArrowLeft') navigate(-1);
      if (e.key === 'ArrowRight') navigate(1);
    });
  }

  if (document.querySelector('.bento-grid')) {
    bindGallery();
  } else {
    document.addEventListener('content:ready', bindGallery);
  }
}

function initExitPopup() {
  const popup = document.getElementById('exit-popup');
  if (!popup) return;

  const closeBtn = popup.querySelector('.exit-popup-close');
  const overlay = popup.querySelector('.exit-popup-overlay');

  function showPopup() {
    if (sessionStorage.getItem('exitPopupShown')) return;
    sessionStorage.setItem('exitPopupShown', 'true');
    popup.classList.add('open');
  }

  function hidePopup() {
    popup.classList.remove('open');
  }

  if (closeBtn) closeBtn.addEventListener('click', hidePopup);
  if (overlay) overlay.addEventListener('click', hidePopup);

  let exitTriggered = false;
  document.addEventListener('mouseleave', (e) => {
    if (exitTriggered) return;
    if (e.clientY > 0) return;
    exitTriggered = true;
    setTimeout(showPopup, 300);
  });
}

function initGalleryFilters() {
  const grid = document.querySelector('.bento-grid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  if (!grid || !filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      filterBtns.forEach(b => b.classList.remove('filter-btn--active'));
      btn.classList.add('filter-btn--active');

      const items = grid.querySelectorAll('.bento-item');
      items.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.classList.remove('bento-item--hidden');
        } else {
          item.classList.add('bento-item--hidden');
        }
      });
    });
  });
}

document.addEventListener('content:ready', initGalleryFilters);

function initDynamicWhatsApp() {
  const waLinks = document.querySelectorAll('a[href*="api.whatsapp.com"]');
  if (!waLinks.length) return;

  const sections = [
    { id: 'home', msg: 'Olá Official Brasil, quero saber mais sobre seus serviços' },
    { id: 'servicos', msg: 'Olá Official Brasil, quero um orçamento para meu evento' },
    { id: 'como-funciona', msg: 'Olá Official Brasil, quero entender como funciona o processo' },
    { id: 'galeria', msg: 'Olá Official Brasil, quero ver mais projetos no portfólio' },
    { id: 'contato', msg: 'Olá Official Brasil, quero uma proposta personalizada' },
  ];

  const lang = document.documentElement.lang || 'pt-BR';
  const enMsgs = {
    'home': 'Hello Official Brasil, I want to know more about your services',
    'servicos': 'Hello Official Brasil, I would like a quote for my event',
    'como-funciona': 'Hello Official Brasil, I want to understand how the process works',
    'galeria': 'Hello Official Brasil, I want to see more portfolio projects',
    'contato': 'Hello Official Brasil, I would like a personalized proposal',
  };
  const esMsgs = {
    'home': 'Hola Official Brasil, quiero saber más sobre sus servicios',
    'servicos': 'Hola Official Brasil, quiero un presupuesto para mi evento',
    'como-funciona': 'Hola Official Brasil, quiero entender cómo funciona el proceso',
    'galeria': 'Hola Official Brasil, quiero ver más proyectos en el portafolio',
    'contato': 'Hola Official Brasil, quiero una propuesta personalizada',
  };

  const isEN = lang.startsWith('en');
  const isES = lang.startsWith('es');

  function getMsg(sectionId) {
    if (isEN) return enMsgs[sectionId] || enMsgs.home;
    if (isES) return esMsgs[sectionId] || esMsgs.home;
    const found = sections.find(s => s.id === sectionId);
    return found ? found.msg : sections[0].msg;
  }

  const obs = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        const msg = getMsg(id);
        waLinks.forEach(link => {
          const base = link.href.split('&text=')[0];
          link.href = `${base}&text=${encodeURIComponent(msg)}`;
        });
        break;
      }
    }
  }, { threshold: 0.3 });

  sections.forEach(s => {
    const el = document.getElementById(s.id);
    if (el) obs.observe(el);
  });
}

/* PARALLAX — profundidade sutil no hero */
function initParallax() {
  const hero = document.querySelector('.hero--cinematic');
  if (!hero) return;
  const video = hero.querySelector('.hero-video-bg');
  const content = hero.querySelector('.hero-content');
  if (!video && !content) return;

  window.addEventListener('scroll', () => {
    requestAnimationFrame(() => {
      const scrolled = window.scrollY;
      const heroH = hero.offsetHeight;
      if (scrolled < heroH) {
        const p = Math.min(scrolled / heroH, 1);
        if (video) {
          video.style.transform = `translateZ(-50px) scale(${1.1 - p * 0.08})`;
          video.style.opacity = 1 - p * 0.3;
        }
        if (content) {
          content.style.transform = `translateY(${p * 20}px)`;
        }
      }
    });
  }, { passive: true });
}

initDynamicWhatsApp();