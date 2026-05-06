document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initHeaderScroll();
    initRevealAnimations();
    initSmoothScrolling();
    initMagneticButtons();
    initBackToTop();
    initMenuImageHover();
    initModalsAndSidebar();
    initMobileMenu();
});

/**
 * Premium Loader: Simulates loading and then reveals content.
 */
function initLoader() {
    const loader = document.getElementById('loader');
    const progressBar = document.querySelector('.loader-progress');
    const body = document.body;

    if (!loader || !progressBar) return;

    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 25;
        if (progress > 100) progress = 100;
        
        progressBar.style.width = `${progress}%`;

        if (progress === 100) {
            clearInterval(interval);
            setTimeout(() => {
                gsap.to(loader, {
                    opacity: 0,
                    duration: 0.8,
                    ease: "power2.inOut",
                    onComplete: () => {
                        loader.style.visibility = 'hidden';
                        body.classList.remove('loading');
                    }
                });
            }, 500);
        }
    }, 150);
}

/**
 * Header scroll effect: Changes background on scroll.
 */
function initHeaderScroll() {
    const header = document.getElementById('main-header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/**
 * Reveal Animation: Elements with 'reveal' class fade in on scroll.
 */
function initRevealAnimations() {
    const revealElements = document.querySelectorAll('.reveal');
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));
}


/**
 * Modals and Sidebar: GSAP powered transitions.
 */
function initModalsAndSidebar() {
    const triggers = [
        { btn: 'btn-opening', target: 'modal-opening', type: 'modal' },
        { btn: 'btn-findus', target: 'modal-findus', type: 'modal' },
        { btn: 'btn-order', target: 'sidebar-order', type: 'sidebar' }
    ];

    triggers.forEach(item => {
        const btn = document.getElementById(item.btn);
        const overlay = document.getElementById(item.target);
        if (!btn || !overlay) return;

        const backdrop = overlay.querySelector('.modal-backdrop') || overlay.querySelector('.sidebar-backdrop');
        const content = overlay.querySelector('.modal-content') || overlay.querySelector('.sidebar-content');
        const closeBtn = overlay.querySelector('.close-modal') || overlay.querySelector('.close-sidebar');

        const tl = gsap.timeline({ paused: true });

        if (item.type === 'modal') {
            tl.to(backdrop, { opacity: 1, duration: 0.4 })
              .to(content, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.5)" }, "-=0.2");
        } else {
            tl.to(backdrop, { opacity: 1, duration: 0.4 })
              .to(content, { x: 0, duration: 0.6, ease: "power3.out" }, "-=0.3");
        }

        btn.addEventListener('click', (e) => {
            e.preventDefault();
            overlay.style.pointerEvents = 'auto';
            tl.play();
            document.body.style.overflow = 'hidden';
        });

        const close = () => {
            tl.reverse().then(() => {
                overlay.style.pointerEvents = 'none';
            });
            document.body.style.overflow = '';
        };

        if (closeBtn) closeBtn.addEventListener('click', close);
        if (backdrop) backdrop.addEventListener('click', close);
    });
}

/**
 * Menu Image Hover: Following image effect for menu items.
 */
function initMenuImageHover() {
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        const wrapper = item.querySelector('.floating-img-wrapper');
        if (!wrapper) return;

        item.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            
            gsap.to(wrapper, {
                x: clientX - 125,
                y: clientY - 90,
                duration: 0.6,
                ease: "power3.out"
            });
        });
        
        item.addEventListener('mouseenter', () => {
            gsap.to(wrapper, {
                scale: 1,
                opacity: 1,
                duration: 0.4,
                ease: "back.out(1.7)"
            });
        });
        
        item.addEventListener('mouseleave', () => {
            gsap.to(wrapper, {
                scale: 0,
                opacity: 0,
                duration: 0.4,
                ease: "power3.inOut"
            });
        });
    });
}

/**
 * Magnetic Buttons: Subtle interaction for CTA.
 */
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
            const y = (e.clientY - rect.top - rect.height / 2) * 0.3;

            gsap.to(btn, {
                x: x,
                y: y,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: "elastic.out(1, 0.3)"
            });
        });
    });
}

/**
 * Smooth Scrolling: For all internal links.
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#modal') || targetId.startsWith('#sidebar')) return;
            
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Back to Top: Simple visibility toggle.
 */
function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 800) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/**
 * Mobile Menu Logic: Handle full-screen menu overlay.
 */
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger-menu');
    const overlay = document.getElementById('mobile-menu-overlay');
    const closeBtn = document.getElementById('menu-close-btn');
    const menuLinks = document.querySelectorAll('.menu-link');

    if (!hamburger || !overlay) return;

    hamburger.addEventListener('click', () => {
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    const closeMenu = () => {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    
    menuLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}

/**
 * Hero Slideshow: Auto-change images in the hero section.
 */
function initHeroSlideshow() {
    const slides = document.querySelectorAll('.hero-image-right .slide');
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, 4000);
}
