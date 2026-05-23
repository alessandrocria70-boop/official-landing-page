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
    const overlay = document.querySelector('.mobile-overlay');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            nav.classList.toggle('mobile-open');
            if (overlay) overlay.classList.toggle('active');
            document.body.style.overflow = nav.classList.contains('mobile-open') ? 'hidden' : '';
        });

        if (overlay) {
            overlay.addEventListener('click', () => {
                hamburger.classList.remove('active');
                nav.classList.remove('mobile-open');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        }

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                nav.classList.remove('mobile-open');
                if (overlay) overlay.classList.remove('active');
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
    // 8. Smooth scroll for anchor links
    // =========================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
