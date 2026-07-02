const CONTENT_PATH = '/content.json';

function detectLanguage() {
  const path = window.location.pathname;
  if (path.startsWith('/en/')) return 'en';
  if (path.startsWith('/es/')) return 'es';
  return 'pt';
}

async function loadContent() {
  try {
    const res = await fetch(CONTENT_PATH);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const lang = detectLanguage();
    return data[lang] || data.pt;
  } catch (err) {
    console.error('Erro ao carregar content.json:', err);
    return null;
  }
}

function renderHero(data) {
  const h = data.hero;
  if (!h) return;
  const el = (s) => document.querySelector(`[data-content="${s}"]`);

  const span = el('hero-overline');
  if (span) span.textContent = h.overline;

  const title = el('hero-title');
  if (title) title.textContent = h.title;

  const sub = el('hero-subtitle');
  if (sub) sub.textContent = h.subtitle;

  const bg = el('hero-bg-image');
  if (bg) bg.style.backgroundImage = `url('${h.bgImage}')`;

  const vs = el('hero-bg-video source');
  if (vs) { vs.src = h.bgVideo; }

  const v = el('hero-bg-video');
  if (v) { v.setAttribute('poster', h.bgImage); v.load(); }

  const btns = el('hero-buttons');
  if (btns && Array.isArray(h.buttons)) {
    btns.innerHTML = h.buttons.map(b => `<a href="${b.href}" class="btn btn-${b.style}">${b.label}</a>`).join('');
  }

  const stats = el('hero-stats');
  if (stats && Array.isArray(h.stats)) {
    stats.innerHTML = h.stats.map(s => `<div><strong class="stat-value" data-target="${s.target}">${s.target}${s.suffix}</strong><span>${s.label}</span></div>`).join('');
  }
}

function renderAbout(data) {
  const a = data.about;
  if (!a) return;
  const el = (s) => document.querySelector(`[data-content="${s}"]`);

  const tag = el('about-tag');
  if (tag) tag.textContent = a.tag;
  const title = el('about-title');
  if (title) title.textContent = a.title;

  const copy = el('about-copy');
  if (copy) {
    copy.innerHTML = a.paragraphs.map(p => `<p>${p}</p>`).join('') + `<ul>${a.bullets.map(b => `<li>${b}</li>`).join('')}</ul>`;
  }

  const cards = el('about-cards');
  if (cards && Array.isArray(a.cards)) {
    cards.innerHTML = a.cards.map(c => `<div class="feature-card"><h3>${c.title}</h3><p>${c.text}</p></div>`).join('');
  }

  const stats = el('about-stats');
  if (stats && Array.isArray(a.stats) && a.stats.length) {
    stats.innerHTML = a.stats.map(s => `<div class="about-stat"><strong class="stat-value" data-target="${s.target}">${s.target}${s.suffix}</strong><span>${s.label}</span></div>`).join('');
  }
}

const VISUAL_CLASSES = {
  'fa-music': 'service-card-visual--shows',
  'fa-pen-ruler': 'service-card-visual--projetos',
  'fa-people-group': 'service-card-visual--feiras',
  'fa-utensils': 'service-card-visual--buffet',
  'fa-couch': 'service-card-visual--mobiliario',
  'fa-bullhorn': 'service-card-visual--promocao',
};

function renderServices(data) {
  const s = data.services;
  if (!s) return;
  const el = (s) => document.querySelector(`[data-content="${s}"]`);

  const tag = el('services-tag');
  if (tag) tag.textContent = s.tag;
  const title = el('services-title');
  if (title) title.textContent = s.title;
  const sub = el('services-subtitle');
  if (sub) sub.textContent = s.subtitle;

  const grid = el('services-grid');
  if (grid && Array.isArray(s.items)) {
    grid.innerHTML = s.items.map(item => {
      const feat = item.featured ? ' service-card--featured' : '';
      const vs = VISUAL_CLASSES[item.icon] || '';
      const badge = item.badge ? `<div class="service-badge">${item.badge}</div>` : '';
      const body = item.highlight ? `<p class="service-highlight">${item.highlight}</p>` : item.text ? `<p>${item.text}</p>` : '';
      const tags = item.tags.map(t => `<span class="service-tag">${t}</span>`).join('');
      return `<article class="service-card${feat}"><div class="service-card-visual ${vs}" style="background-image: url('${item.poster}');background-size:cover;background-position:center;"><video autoplay muted loop playsinline preload="auto" poster="${item.poster}"><source src="${item.video}" type="video/mp4"></video>${badge}</div><div class="service-card-body"><span class="service-category"><i class="${item.icon}"></i> ${item.category}</span><h3>${item.title}</h3>${body}<div class="service-tags">${tags}</div></div></article>`;
    }).join('');
    // Forçar play() em todos os vídeos (autoplay via innerHTML é instável)
    Array.from(grid.querySelectorAll('.service-card-visual video')).forEach(function(vid) {
      vid.play().catch(function(){});
    });
  }
}

function renderSteps(data) {
  const st = data.steps;
  if (!st) return;
  const el = (s) => document.querySelector(`[data-content="${s}"]`);

  const tag = el('steps-tag');
  if (tag) tag.textContent = st.tag;
  const title = el('steps-title');
  if (title) title.textContent = st.title;

  const grid = el('steps-grid');
  if (grid && Array.isArray(st.items)) {
    grid.innerHTML = st.items.map((step, idx) => {
      const isLast = idx === st.items.length - 1;
      return `<div class="step-card"><div class="step-number">${step.number}</div><div class="step-glass"><div class="step-icon"><i class="${step.icon}"></i></div><h3>${step.title}</h3><p>${step.text}</p><div class="step-result"><span class="step-label"><i class="fa-regular fa-circle-check"></i> ${step.result}</span></div></div></div>${isLast ? '' : '<div class="step-connector"><i class="fa-solid fa-arrow-right"></i></div>'}`;
    }).join('');
  }
}

function renderGalleryCta(data) {
  const g = data.galleryCta;
  if (!g) return;
  const el = (s) => document.querySelector(`[data-content="${s}"]`);

  const tag = el('gallery-cta-tag');
  if (tag) tag.textContent = g.tag;
  const title = el('gallery-cta-title');
  if (title) title.textContent = g.title;
  const text = el('gallery-cta-text');
  if (text) text.textContent = g.text;
  const btn = el('gallery-cta-button');
  if (btn) { btn.textContent = g.buttonLabel; btn.setAttribute('href', g.buttonHref); }
}

function renderGalleryPage(data) {
  const g = data.gallery;
  if (!g) return;
  const el = (s) => document.querySelector(`[data-content="${s}"]`);

  const pt = el('gallery-page-title');
  if (pt) pt.textContent = g.pageTitle;
  const ps = el('gallery-page-subtitle');
  if (ps) ps.textContent = g.pageSubtitle;
  const tag = el('gallery-tag');
  if (tag) tag.textContent = g.tag;
  const title = el('gallery-title');
  if (title) title.textContent = g.title;

  const grid = el('gallery-bento-grid');
  if (grid && Array.isArray(g.items)) {
    const sizeMap = { wide: ' bento-item--wide', tall: ' bento-item--tall', normal: '' };
    grid.innerHTML = g.items.map(item => `<div class="bento-item${sizeMap[item.size] || ''}" data-category="${item.category || 'stands'}"><img class="bento-image" src="${item.image}" alt="${item.alt}" loading="lazy"><div class="bento-label">${item.label}</div></div>`).join('');
  }
}

function renderTestimonials(data) {
  const t = data.testimonials;
  if (!t) return;
  const el = (s) => document.querySelector(`[data-content="${s}"]`);

  const tag = el('testimonials-tag');
  if (tag) tag.textContent = t.tag;
  const title = el('testimonials-title');
  if (title) title.textContent = t.title;

  const grid = el('testimonials-grid');
  if (grid && Array.isArray(t.items)) {
    grid.innerHTML = t.items.map(item => `<div class="testimonial-card"><div class="testimonial-video-wrapper"><video class="testimonial-video" controls playsinline preload="auto"><source src="${item.video}" type="video/mp4"></video></div><div class="testimonial-body"><span class="testimonial-name">${item.name}</span><span class="testimonial-role">${item.role}</span></div></div>`).join('');
  }
}

function renderPartners(data) {
  const p = data.partners;
  if (!p) return;
  const el = (s) => document.querySelector(`[data-content="${s}"]`);

  const tag = el('partners-tag');
  if (tag) tag.textContent = p.tag;
  const title = el('partners-title');
  if (title) title.textContent = p.title;

  const track = el('partners-track');
  if (track && Array.isArray(p.items)) {
    const single = p.items.map(item => `<div class="partner-logo"><img src="${item.logo}" alt="${item.alt}" loading="lazy"></div>`).join('');
    track.innerHTML = single + single + single;
  }
}

function renderContact(data) {
  const c = data.contact;
  if (!c) return;
  const el = (s) => document.querySelector(`[data-content="${s}"]`);

  const tag = el('contact-tag');
  if (tag) tag.textContent = c.tag;
  const title = el('contact-title');
  if (title) title.textContent = c.title;
  const intro = el('contact-intro');
  if (intro) intro.textContent = c.intro;

  const details = el('contact-details');
  if (details) {
    details.innerHTML = `<p><strong>Sede Comercial:</strong> ${c.officeAddress}</p><p><strong>Espaço Fabril:</strong> ${c.factoryAddress}</p><p><strong>WhatsApp:</strong> ${c.whatsappDisplay}</p><p><strong>Atendimento:</strong> ${c.supportEmail}</p>`;
  }

  const wa = el('contact-whatsapp-btn');
  if (wa) wa.setAttribute('href', `https://api.whatsapp.com/send?phone=${c.whatsapp}&text=${encodeURIComponent('Olá Official Brasil, quero um projeto para meu evento')}`);

  const em = el('contact-email-btn');
  if (em) em.setAttribute('href', `mailto:${c.supportEmail}`);
}

function renderFooter(data) {
  const f = data.footer;
  if (!f) return;
  const el = document.querySelector('[data-content="footer-text"]');
  if (el) el.innerHTML = `${f.text}<br>${f.contactLine}`;
}

function renderMeta(data) {
  const m = data.meta;
  if (!m) return;
  if (m.title) document.title = m.title;
  const md = document.querySelector('meta[name="description"]');
  if (md && m.description) md.setAttribute('content', m.description);
}

async function initContent() {
  const lang = detectLanguage();
  const data = await loadContent();
  if (!data) return;
  renderMeta(data);
  renderHero(data);
  renderAbout(data);
  renderServices(data);
  renderSteps(data);
  renderGalleryCta(data);
  renderGalleryPage(data);
  renderTestimonials(data);
  renderPartners(data);
  renderContact(data);
  renderFooter(data);
  document.dispatchEvent(new CustomEvent('content:ready', { detail: { lang, content: data } }));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initContent);
} else {
  initContent();
}
