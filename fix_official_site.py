from pathlib import Path

index_html = '''<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Official Brasil | Arquitetura Promocional e Marketing</title>
    <meta name="description" content="Official Brasil: stands, feiras e eventos com estratégia, qualidade e inovação desde 1998.">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;600;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="grid-overlay"></div>

    <header class="header" id="header">
        <div class="brand">
            <div class="logo-text">
                <span>official</span><strong> brasil</strong>
            </div>
            <p>Arquitetura Promocional e Marketing</p>
        </div>

        <nav class="nav" id="main-nav">
            <a href="#home" class="nav-link">Início</a>
            <a href="#home" class="nav-link">IN ENGLISH</a>
            <a href="#home" class="nav-link">EN ESPAÑOL</a>
            <a href="#servicos" class="nav-link">Serviços</a>
            <a href="#sobre" class="nav-link">Sobre</a>
            <a href="#contato" class="nav-link">Contato</a>
        </nav>

        <div class="header-actions">
            <a href="https://api.whatsapp.com/send?phone=5519999999999&text=Ol%C3%A1%2C+quero+saber+sobre+a+Official+Brasil" class="header-cta" target="_blank" rel="noreferrer">WhatsApp</a>
            <button class="hamburger" id="hamburger" aria-label="Menu">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    </header>

    <main>
        <section class="hero" id="home">
            <div class="hero-copy">
                <span class="overline">QUEM É A OFFICIAL BRASIL</span>
                <h1>Transformamos feiras e eventos em experiências de vendas memoráveis.</h1>
                <p>Fundada em 1998, a Official Brasil cria stands premium, monta espaços completos e entrega soluções de locação para feiras, eventos e exposições em todo o Brasil.</p>
                <div class="hero-buttons">
                    <a href="#contato" class="btn btn-primary">Vamos conversar</a>
                    <a href="#servicos" class="btn btn-secondary">Ver serviços</a>
                </div>
                <div class="hero-stats">
                    <div><strong>25+</strong><span>Anos de mercado</span></div>
                    <div><strong>54K</strong><span>Projetos realizados</span></div>
                    <div><strong>3</strong><span>Países atendidos</span></div>
                </div>
            </div>

            <div class="hero-media">
                <div class="video-card">
                    <div class="video-label">Vídeo das exposições</div>
                    <iframe src="https://www.youtube.com/embed/3fumBcKC6RE" title="Vídeo de exposições Official Brasil" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <div class="hero-gallery">
                    <img src="stand_3d_render.png" alt="Stand 3D" loading="lazy">
                    <img src="phone_mockup_instagram.png" alt="Instagram destaque" loading="lazy">
                </div>
            </div>
        </section>

        <section class="about" id="sobre">
            <div class="section-header">
                <span class="section-tag">Sobre Nós</span>
                <h2>Official Brasil é sua parceira estratégica em feiras e eventos.</h2>
            </div>
            <div class="about-grid">
                <div class="about-copy">
                    <p>Official Brasil é especialista em arquitetura promocional e marketing para feiras e eventos. Com sede comercial em Guarulhos-SP e espaço fabril em Arujá-SP, atendemos projetos em todo o Brasil com qualidade, inovação e compromisso.</p>
                    <p>Nossa equipe reúne profissionais experientes focados em:</p>
                    <ul>
                        <li>Criação de projetos surpreendentes e funcionais.</li>
                        <li>Montagem precisa dentro dos prazos acordados.</li>
                        <li>Locação de móveis, áudio visual, displays e estruturas para eventos temporários.</li>
                        <li>Atendimento consultivo e suporte dedicado ao cliente.</li>
                    </ul>
                </div>
                <div class="about-cards">
                    <div class="feature-card">
                        <h3>Experiência de 25 anos</h3>
                        <p>Dominamos o ciclo completo de stands e exposições, do briefing ao evento.</p>
                    </div>
                    <div class="feature-card">
                        <h3>Qualidade garantida</h3>
                        <p>Processos rigorosos e entrega com padrão internacional para cada cliente.</p>
                    </div>
                    <div class="feature-card">
                        <h3>Inovação constante</h3>
                        <p>Estamos sempre usando novas tecnologias e métodos para melhorar nossas entregas.</p>
                    </div>
                </div>
            </div>
        </section>

        <section class="services" id="servicos">
            <div class="section-header">
                <span class="section-tag">O que fazemos</span>
                <h2>Serviços completos para seu stand e ativação.</h2>
            </div>
            <div class="services-grid">
                <article class="service-card">
                    <div class="service-icon"><i class="fa-solid fa-drafting-compass"></i></div>
                    <h3>Projeto de Stands</h3>
                    <p>Criamos projetos arrumados, inovadores e funcionais que valorizam sua marca.</p>
                </article>
                <article class="service-card">
                    <div class="service-icon"><i class="fa-solid fa-wrench"></i></div>
                    <h3>Montagem de Stands</h3>
                    <p>Montagem planejada e executada com precisão para garantir que o evento aconteça sem imprevistos.</p>
                </article>
                <article class="service-card">
                    <div class="service-icon"><i class="fa-solid fa-tv"></i></div>
                    <h3>Locação de Equipamentos</h3>
                    <p>Disponibilizamos móveis, áudio visual, estruturas e equipamentos para eventos temporários.</p>
                </article>
                <article class="service-card">
                    <div class="service-icon"><i class="fa-solid fa-handshake-angle"></i></div>
                    <h3>Atendimento e suporte</h3>
                    <p>Suporte consultivo e dedicado para garantir que seu evento gere resultados reais.</p>
                </article>
            </div>
        </section>

        <section class="gallery" id="exposicoes">
            <div class="section-header">
                <span class="section-tag">Exposições</span>
                <h2>Mostramos nosso trabalho em grandes eventos.</h2>
            </div>
            <div class="gallery-grid">
                <div class="gallery-card"><img src="stand_3d_render.png" alt="Stand de evento" loading="lazy"></div>
                <div class="gallery-card"><img src="phone_mockup_instagram.png" alt="Ativação de marca" loading="lazy"></div>
                <div class="gallery-card"><img src="stand_3d_render.png" alt="Espaço corporativo" loading="lazy"></div>
                <div class="gallery-card"><img src="phone_mockup_instagram.png" alt="Projeto de stand" loading="lazy"></div>
            </div>
        </section>

        <section class="clients">
            <div class="section-header">
                <span class="section-tag">Clientes</span>
                <h2>Empresas que já confiaram na Official Brasil.</h2>
            </div>
            <div class="client-grid">
                <span class="client-logo">Maqmundi</span>
                <span class="client-logo">Desematec</span>
                <span class="client-logo">Ambflex</span>
                <span class="client-logo">Global MBL</span>
                <span class="client-logo">Stand Premium</span>
            </div>
        </section>

        <section class="contact" id="contato">
            <div class="section-header">
                <span class="section-tag">Contato</span>
                <h2>Vamos criar sua próxima ativação de alto impacto.</h2>
            </div>
            <div class="contact-grid">
                <div class="contact-copy">
                    <p>Fale diretamente com nossa equipe e receba uma proposta estratégica personalizada para seu evento ou feira.</p>
                    <p><strong>CEO:</strong> Emerson Perlagides</p>
                    <p><strong>Local:</strong> Guarulhos - SP / Arujá - SP</p>
                </div>
                <div class="contact-actions">
                    <a href="https://api.whatsapp.com/send?phone=5519999999999&text=Ol%C3%A1%20Official%20Brasil%2C%20quero%20um%20projeto%20para%20meu%20evento" target="_blank" rel="noreferrer" class="btn btn-primary">Falar no WhatsApp</a>
                    <a href="mailto:contato@officialbrasil.com.br" class="btn btn-secondary">Enviar e-mail</a>
                </div>
            </div>
        </section>
    </main>

    <footer class="footer">
        <p>© 2026 Official Brasil. Arquitetura Promocional e Marketing.</p>
    </footer>

    <script src="script.js"></script>
</body>
</html>
'''

style_css = '''/* Official Brasil — Landing Page */
:root {
    --bg: #050607;
    --surface: rgba(10, 10, 12, 0.96);
    --surface-strong: rgba(255, 255, 255, 0.08);
    --text: #f8fafc;
    --muted: #94a3b8;
    --accent: #2dd4bf;
    --accent-strong: #38bdf8;
    --gold: #fbbf24;
    --shadow: 0 32px 80px rgba(0, 0, 0, 0.35);
    --radius: 28px;
    --radius-sm: 14px;
    --transition: 0.35s ease;
}

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

html {
    scroll-behavior: smooth;
}

body {
    min-height: 100vh;
    background: radial-gradient(circle at top, rgba(45, 212, 191, 0.09), transparent 25%),
                linear-gradient(180deg, #050607 0%, #020203 100%);
    color: var(--text);
    overflow-x: hidden;
}

img {
    max-width: 100%;
    display: block;
}

a {
    color: inherit;
    text-decoration: none;
}

button {
    cursor: pointer;
}

.grid-overlay {
    position: fixed;
    inset: 0;
    background-image: linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
    background-size: 64px 64px;
    pointer-events: none;
    z-index: -1;
}

header.header {
    position: fixed;
    inset: 0 0 auto 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24px 32px;
    gap: 24px;
    z-index: 30;
    background: rgba(5, 6, 7, 0.7);
    backdrop-filter: blur(18px);
    border-bottom: 1px solid rgba(255,255,255,0.06);
}

.header.scrolled {
    background: rgba(5, 6, 7, 0.95);
}

.brand {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.logo-text {
    text-transform: uppercase;
    font-size: 1.3rem;
    letter-spacing: 0.22em;
    font-weight: 700;
}

.logo-text strong {
    color: var(--accent);
}

.brand p {
    color: var(--muted);
    font-size: 0.9rem;
}

.nav {
    display: flex;
    align-items: center;
    gap: 22px;
    flex-wrap: wrap;
}

.nav-link {
    color: var(--muted);
    font-size: 0.85rem;
    font-weight: 600;
    transition: color var(--transition);
}

.nav-link:hover,
.nav-link.active {
    color: var(--text);
}

.header-actions {
    display: flex;
    align-items: center;
    gap: 16px;
}

.header-cta,
.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 14px 26px;
    border-radius: 999px;
    border: 1px solid transparent;
    font-weight: 700;
    transition: transform var(--transition), background var(--transition), border-color var(--transition);
}

.header-cta {
    background: var(--accent);
    color: #020617;
}

.header-cta:hover {
    transform: translateY(-2px);
}

.hamburger {
    display: none;
    width: 44px;
    height: 44px;
    padding: 10px;
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 16px;
    background: rgba(255,255,255,0.06);
    align-items: center;
    justify-content: center;
}

.hamburger span {
    display: block;
    width: 100%;
    height: 2px;
    background: var(--text);
    border-radius: 999px;
    transition: transform var(--transition);
}

.hamburger span:nth-child(2) {
    margin: 6px 0;
}

main {
    padding-top: 110px;
}

.hero {
    min-height: calc(100vh - 110px);
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
    gap: 32px;
    align-items: center;
    padding: 100px 32px 64px;
}

.hero-copy {
    max-width: 660px;
}

.overline {
    display: inline-flex;
    text-transform: uppercase;
    letter-spacing: 0.24em;
    color: var(--accent);
    font-size: 0.8rem;
    font-weight: 700;
    margin-bottom: 20px;
}

.hero h1 {
    font-size: clamp(3.2rem, 4.5vw, 5.2rem);
    line-height: 0.98;
    max-width: 680px;
    margin-bottom: 24px;
}

.hero p {
    max-width: 600px;
    color: var(--muted);
    font-size: 1.05rem;
    line-height: 1.8;
    margin-bottom: 32px;
}

.hero-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    margin-bottom: 36px;
}

.btn.btn-primary {
    background: var(--accent);
    color: #050607;
}

.btn.btn-secondary {
    background: transparent;
    border: 1px solid rgba(255,255,255,0.14);
    color: var(--text);
}

.btn:hover {
    transform: translateY(-2px);
}

.hero-stats {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 18px;
}

.hero-stats div {
    padding: 20px;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 24px;
    background: rgba(255,255,255,0.03);
}

.hero-stats strong {
    display: block;
    font-size: 1.35rem;
    margin-bottom: 8px;
    color: #ffffff;
}

.hero-stats span {
    color: var(--muted);
    font-size: 0.95rem;
}

.hero-media {
    display: grid;
    gap: 24px;
}

.video-card {
    border-radius: 28px;
    overflow: hidden;
    background: rgba(255,255,255,0.03);
    box-shadow: var(--shadow);
    border: 1px solid rgba(255,255,255,0.08);
}

.video-label {
    padding: 20px;
    background: rgba(255,255,255,0.04);
    color: var(--muted);
    font-size: 0.95rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
}

.video-card iframe {
    width: 100%;
    height: 335px;
    border: none;
}

.hero-gallery {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 18px;
}

.hero-gallery img {
    width: 100%;
    height: 240px;
    object-fit: cover;
    border-radius: 24px;
    border: 1px solid rgba(255,255,255,0.08);
}

.section-header {
    max-width: 960px;
    margin: 0 auto 40px;
    text-align: center;
}

.section-tag {
    display: inline-flex;
    text-transform: uppercase;
    letter-spacing: 0.24em;
    color: var(--accent);
    font-size: 0.75rem;
    font-weight: 700;
    margin-bottom: 18px;
}

.section-header h2 {
    font-size: clamp(2.4rem, 3vw, 3.4rem);
    line-height: 1.05;
    margin-bottom: 18px;
}

.about,
.services,
.gallery,
.clients,
.contact {
    padding: 80px 32px;
}

.about-grid {
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
    gap: 32px;
    align-items: flex-start;
    max-width: 1180px;
    margin: 0 auto;
}

.about-copy p {
    color: var(--muted);
    margin-bottom: 20px;
    line-height: 1.8;
}

.about-copy ul {
    display: grid;
    gap: 14px;
    list-style: none;
    padding-left: 0;
}

.about-copy li {
    position: relative;
    padding-left: 28px;
    color: var(--muted);
}

.about-copy li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 10px;
    width: 10px;
    height: 10px;
    border-radius: 999px;
    background: var(--accent);
}

.about-cards {
    display: grid;
    gap: 20px;
}

.feature-card {
    padding: 28px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 24px;
    box-shadow: var(--shadow);
}

.feature-card h3 {
    margin-bottom: 12px;
    font-size: 1.2rem;
}

.feature-card p {
    color: var(--muted);
    line-height: 1.75;
}

.services-grid,
.gallery-grid,
.client-grid,
.contact-grid {
    display: grid;
    gap: 24px;
    max-width: 1180px;
    margin: 0 auto;
}

.services-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
}

.service-card {
    padding: 32px;
    border-radius: 28px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
    box-shadow: var(--shadow);
}

.service-icon {
    width: 52px;
    height: 52px;
    display: grid;
    place-items: center;
    margin-bottom: 20px;
    border-radius: 18px;
    background: rgba(45,212,191,0.14);
    color: var(--accent);
}

.service-card h3 {
    margin-bottom: 14px;
}

.service-card p {
    color: var(--muted);
    line-height: 1.8;
}

.gallery-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
}

.gallery-card {
    border-radius: 24px;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,0.08);
    box-shadow: var(--shadow);
    background: rgba(255,255,255,0.02);
}

.gallery-card img {
    height: 280px;
    object-fit: cover;
}

.client-grid {
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    align-items: center;
    text-align: center;
}

.client-logo {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 96px;
    padding: 20px;
    border-radius: 20px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
    color: var(--text);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
}

.contact-grid {
    grid-template-columns: 1.1fr 0.9fr;
    align-items: center;
}

.contact-copy p {
    color: var(--muted);
    margin-bottom: 18px;
    line-height: 1.8;
}

.contact-actions {
    display: grid;
    gap: 18px;
}

.footer {
    padding: 32px 32px 42px;
    text-align: center;
    color: var(--muted);
    font-size: 0.95rem;
}

@media (max-width: 1100px) {
    .hero {
        grid-template-columns: 1fr;
    }
    .about-grid,
    .contact-grid {
        grid-template-columns: 1fr;
    }
    .services-grid,
    .gallery-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

@media (max-width: 760px) {
    header.header {
        flex-wrap: wrap;
        align-items: flex-start;
    }
    .nav {
        position: fixed;
        inset: 0 0 auto auto;
        flex-direction: column;
        align-items: flex-start;
        padding: 100px 24px 24px;
        gap: 20px;
        width: 100%;
        max-width: 320px;
        transform: translateX(120%);
        background: rgba(5, 6, 7, 0.98);
        border-left: 1px solid rgba(255,255,255,0.08);
        transition: transform var(--transition);
        z-index: 40;
    }
    .nav.mobile-open {
        transform: translateX(0);
    }
    .hamburger {
        display: inline-flex;
    }
    .header-actions {
        width: 100%;
        justify-content: space-between;
    }
    .hero {
        padding-top: 80px;
    }
    .hero-gallery {
        grid-template-columns: 1fr;
    }
    .hero-gallery img {
        height: 220px;
    }
    .hero-stats {
        grid-template-columns: 1fr;
    }
    .services-grid,
    .gallery-grid {
        grid-template-columns: 1fr;
    }
}
'''

Path('index.html').write_text(index_html, encoding='utf-8')
Path('style.css').write_text(style_css, encoding='utf-8')
print('Files overwritten successfully.')
