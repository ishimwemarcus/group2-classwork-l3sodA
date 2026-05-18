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
    initMenuFilters();
    initShoppingCart();
    initDiscoverSlideshow();
    initDeliverySlideshow();
    initTypewriterOnScroll();
    initGroupInfo();
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
    const modalTriggers = [
        { btnId: 'btn-opening', targetId: 'modal-opening' },
        { btnId: 'btn-findus', targetId: 'modal-findus' }
    ];

    // Setup modals
    modalTriggers.forEach(item => {
        const btn = document.getElementById(item.btnId);
        const overlay = document.getElementById(item.targetId);
        if (!btn || !overlay) return;

        const backdrop = overlay.querySelector('.modal-backdrop');
        const content = overlay.querySelector('.modal-content');
        const closeBtn = overlay.querySelector('.close-modal');

        const tl = gsap.timeline({ paused: true });
        tl.to(backdrop, { opacity: 1, duration: 0.4 })
          .to(content, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.5)" }, "-=0.2");

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

    // Setup order sidebar for ALL order links
    const sidebar = document.getElementById('sidebar-order');
    if (sidebar) {
        const backdrop = sidebar.querySelector('.sidebar-backdrop');
        const content = sidebar.querySelector('.sidebar-content');
        const closeBtn = sidebar.querySelector('.close-sidebar');

        const tl = gsap.timeline({ paused: true });
        tl.to(backdrop, { opacity: 1, duration: 0.4 })
          .to(content, { x: 0, duration: 0.6, ease: "power3.out" }, "-=0.3");

        const openSidebar = (e) => {
            e.preventDefault();
            sidebar.style.pointerEvents = 'auto';
            tl.play();
            document.body.style.overflow = 'hidden';
        };

        const closeSidebar = () => {
            tl.reverse().then(() => {
                sidebar.style.pointerEvents = 'none';
            });
            document.body.style.overflow = '';
        };

        // Find all elements with href="#sidebar-order"
        const orderLinks = document.querySelectorAll('a[href="#sidebar-order"]');
        orderLinks.forEach(link => {
            link.addEventListener('click', openSidebar);
        });

        if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
        if (backdrop) backdrop.addEventListener('click', closeSidebar);
    }
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

/**
 * Menu Category Filters: Smooth opacity filtering.
 */
function initMenuFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const menuCards = document.querySelectorAll('.menu-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            menuCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                // Opacity transition logic
                card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95)';
                
                setTimeout(() => {
                    if (filterValue === 'all' || category === filterValue) {
                        card.style.display = 'flex';
                        // Small delay to allow display:flex to apply before animating opacity back
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        card.style.display = 'none';
                    }
                }, 400); // Wait for fade out
            });
        });
    });
}

/**
 * Shopping Cart: Handle cart additions, UI updates, and side cart logic.
 */
function initShoppingCart() {
    let cartItems = [];
    
    const floatingCart = document.getElementById('floating-cart');
    const cartBadge = document.getElementById('cart-badge');
    const sidebarCart = document.getElementById('sidebar-cart');
    const cartItemsList = document.getElementById('cart-items-list');
    const cartTotalPrice = document.getElementById('cart-total-price');

    if (!floatingCart || !sidebarCart) return;

    const backdrop = sidebarCart.querySelector('.sidebar-backdrop');
    const content = sidebarCart.querySelector('.sidebar-content');
    const closeBtn = sidebarCart.querySelector('.close-sidebar');

    const tlCart = gsap.timeline({ paused: true });
    tlCart.to(backdrop, { opacity: 1, duration: 0.4 })
          .to(content, { x: 0, duration: 0.6, ease: "power3.out" }, "-=0.3");

    const openCart = () => {
        sidebarCart.style.pointerEvents = 'auto';
        tlCart.play();
        document.body.style.overflow = 'hidden';
    };

    const closeCart = () => {
        tlCart.reverse().then(() => {
            sidebarCart.style.pointerEvents = 'none';
        });
        document.body.style.overflow = '';
    };

    floatingCart.addEventListener('click', openCart);
    if (closeBtn) closeBtn.addEventListener('click', closeCart);
    if (backdrop) backdrop.addEventListener('click', closeCart);

    function updateCartUI() {
        // Update badge count
        cartBadge.innerText = cartItems.length;
        
        // Trigger scale-pop animation
        cartBadge.classList.remove('scale-pop');
        void cartBadge.offsetWidth; // Trigger reflow
        cartBadge.classList.add('scale-pop');

        // Update side cart list
        cartItemsList.innerHTML = '';
        let total = 0;

        if (cartItems.length === 0) {
            cartItemsList.innerHTML = '<li><span style="opacity: 0.6;">Your cart is empty.</span></li>';
        }

        cartItems.forEach((item, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span class="cart-item-name">${item.name}</span>
                <span class="cart-item-price-group">
                    <span class="cart-item-price">${item.price.toLocaleString()} RWF</span>
                    <button class="delete-cart-item" data-index="${index}">&times;</button>
                </span>
            `;
            cartItemsList.appendChild(li);
            total += item.price;
        });

        cartTotalPrice.innerText = `${total.toLocaleString()} RWF`;
    }

    // Delete item handler (event delegation)
    cartItemsList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-cart-item')) {
            const index = parseInt(e.target.getAttribute('data-index'), 10);
            cartItems.splice(index, 1);
            updateCartUI();
        }
    });

    // Handle "Add to Order" from menu cards
    const orderBtns = document.querySelectorAll('.add-to-order-btn');
    orderBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const card = e.target.closest('.menu-card');
            const name = card.querySelector('.menu-card-title').innerText;
            const priceText = card.querySelector('.menu-card-price').innerText;
            const price = parseInt(priceText.replace(/[^0-9]/g, ''), 10);
            
            cartItems.push({ name, price });
            updateCartUI();
        });
    });

    // Handle "+" buttons from list items
    const plusBtns = document.querySelectorAll('.add-to-cart-plus');
    plusBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const li = e.target.closest('li');
            const name = li.querySelector('.item-name').innerText;
            const priceText = li.querySelector('.price-wrapper').innerText;
            const price = parseInt(priceText.replace(/[^0-9]/g, ''), 10);
            
            cartItems.push({ name, price });
            updateCartUI();
            openCart(); // Slide open side cart on list item add
        });
    });
    // --- Premium WhatsApp Checkout Integration ---
    const checkoutNowBtn = document.getElementById('checkout-now-btn');
    const modalCheckout = document.getElementById('modal-checkout');
    const checkoutForm = document.getElementById('checkout-form');

    if (checkoutNowBtn && modalCheckout && checkoutForm) {
        const checkoutBackdrop = modalCheckout.querySelector('.modal-backdrop');
        const checkoutContent = modalCheckout.querySelector('.modal-content');
        const checkoutCloseBtn = modalCheckout.querySelector('.close-modal');

        const tlCheckout = gsap.timeline({ paused: true });
        tlCheckout.to(checkoutBackdrop, { opacity: 1, duration: 0.4 })
                  .to(checkoutContent, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.5)" }, "-=0.2");

        const openCheckout = () => {
            if (cartItems.length === 0) {
                alert("Your cart is empty! Please add some delicious street flavors before checking out.");
                return;
            }
            closeCart(); // Slide out the cart panel
            modalCheckout.style.pointerEvents = 'auto';
            tlCheckout.play();
            document.body.style.overflow = 'hidden';
        };

        const closeCheckout = () => {
            tlCheckout.reverse().then(() => {
                modalCheckout.style.pointerEvents = 'none';
            });
            document.body.style.overflow = '';
        };

        checkoutNowBtn.addEventListener('click', openCheckout);
        if (checkoutCloseBtn) checkoutCloseBtn.addEventListener('click', closeCheckout);
        if (checkoutBackdrop) checkoutBackdrop.addEventListener('click', closeCheckout);

        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const senderName = document.getElementById('checkout-name').value.trim();
            const location = document.getElementById('checkout-location').value.trim();
            const contact = document.getElementById('checkout-phone').value.trim();
            const paymentName = document.getElementById('checkout-payment').value;

            // Calculate totals & item string
            let totalAmount = 0;
            let orderItemsString = '';

            cartItems.forEach((item) => {
                orderItemsString += `• ${item.name} — ${item.price.toLocaleString()} RWF\n`;
                totalAmount += item.price;
            });

            // Well-formatted WhatsApp payload
            const orderMessage = `🔥 *NEW ORDER - SACHA'S TASTE* 🔥\n` +
                                 `--------------------------------\n` +
                                 `👤 *Customer Name:* ${senderName}\n` +
                                 `📍 *Delivery Location:* ${location}\n` +
                                 `📞 *Contact Number:* ${contact}\n` +
                                 `💳 *Payment Method:* ${paymentName}\n` +
                                 `--------------------------------\n` +
                                 `🛒 *Ordered Products:*\n${orderItemsString}` +
                                 `--------------------------------\n` +
                                 `💰 *Total Amount:* ${totalAmount.toLocaleString()} RWF\n\n` +
                                 `Please confirm my order. Thank you!`;

            const encodedMsg = encodeURIComponent(orderMessage);
            const whatsappNumber = '250788436863'; // standard Rwanda format targeting 0788436863
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMsg}`;

            // Open WhatsApp in new tab
            window.open(whatsappUrl, '_blank');

            // Reset cart state & close modals
            cartItems = [];
            updateCartUI();
            closeCheckout();
            checkoutForm.reset();
        });
    }

    // Initialize empty cart
    updateCartUI();
}

/**
 * Discover Section Auto-Slideshow: Cycles through videos and images beautifully.
 */
function initDiscoverSlideshow() {
    const slides = document.querySelectorAll('.discover-slide');
    const dots = document.querySelectorAll('.slideshow-dots .dot');
    const prevBtn = document.querySelector('.prev-arrow');
    const nextBtn = document.querySelector('.next-arrow');

    if (slides.length === 0) return;

    let currentIndex = 0;
    const intervalTime = 8000; // 8 seconds per slide (slower pace)
    let slideInterval;

    function playActiveVideo(slide) {
        const video = slide.querySelector('video');
        if (video) {
            video.currentTime = 0;
            video.playbackRate = 1.0; // Play at normal speed
            video.play().catch(err => console.log("Video playback deferred:", err));
        }
    }

    function pauseVideo(slide) {
        const video = slide.querySelector('video');
        if (video) {
            video.pause();
        }
    }

    function showSlide(index) {
        const currentActive = slides[currentIndex];
        currentActive.classList.remove('active');
        pauseVideo(currentActive);
        
        if (dots.length > 0) {
            dots[currentIndex].classList.remove('active');
        }

        currentIndex = index;

        const nextActive = slides[currentIndex];
        nextActive.classList.add('active');
        playActiveVideo(nextActive);

        if (dots.length > 0) {
            dots[currentIndex].classList.add('active');
        }
    }

    function nextSlide() {
        const nextIndex = (currentIndex + 1) % slides.length;
        showSlide(nextIndex);
    }

    function prevSlide() {
        const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(prevIndex);
    }

    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, intervalTime);
    }

    // Set up arrow listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            prevSlide();
            resetInterval();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            nextSlide();
            resetInterval();
        });
    }

    // Set up dot listeners
    dots.forEach((dot, index) => {
        dot.addEventListener('click', (e) => {
            e.stopPropagation();
            showSlide(index);
            resetInterval();
        });
    });

    // Play the very first slide's video if applicable
    playActiveVideo(slides[0]);

    // Start auto-cycling
    slideInterval = setInterval(nextSlide, intervalTime);
}

/**
 * Delivery Section Auto-Slideshow: Cycles every 10 seconds, toggles text based on active image.
 * No user controls (user can't change it, it changes itself).
 */
function initDeliverySlideshow() {
    const slides = document.querySelectorAll('.delivery-slide');
    const header = document.querySelector('.delivery-content h2');
    const message = document.querySelector('.delivery-message');
    if (slides.length === 0 || !header || !message) return;

    let currentIndex = 0;
    const intervalTime = 10000; // 10 seconds

    // Define the dynamic premium long paragraphs
    const paragraphs = [
        "Hungry and can't wait? Sacha's Taste delivers Kigali's boldest and most authentic street food flavors directly to your doorstep with zero delivery fees! Our dedicated fleet of rapid-response riders ensures your orders arrive blazing hot and fresh, maintaining the premium quality and rich, fiery spices of our signature dishes. Enjoy hassle-free delivery from our grill straight to your location without any compromise on speed or taste.",
        "We saw a need for a better, more authentic food experience in Kigali. Inspired by vibrant markets and late-night street grills, we blend traditional spices, quality ingredients, and bold techniques to create meals that feel both nostalgic and new. This is fast food with its soul intact—crafted for those who refuse to compromise on flavor, quality, or authenticity. Sacha's is real taste, real fire, and real culinary passion."
    ];

    function cycle() {
        slides[currentIndex].classList.remove('active');
        
        currentIndex = (currentIndex + 1) % slides.length;
        
        slides[currentIndex].classList.add('active');

        // Update header and message paragraph dynamically
        if (currentIndex === 0) {
            header.innerHTML = 'Free Fast Delivery<br><span class="serif-italic text-orange">Delivery</span>';
            message.textContent = paragraphs[0];
        } else {
            header.innerHTML = 'Real Fast Food<br><span class="serif-italic text-orange">Delivery</span>';
            message.textContent = paragraphs[1];
        }
    }

    // Set initial state for active motari slide
    header.innerHTML = 'Free Fast Delivery<br><span class="serif-italic text-orange">Delivery</span>';
    message.textContent = paragraphs[0];

    // Start interval
    setInterval(cycle, intervalTime);
}

/**
 * Typewriter on Scroll: Animates typing text when element enters viewport.
 */
function initTypewriterOnScroll() {
    const typewriterElements = document.querySelectorAll('.typewrite');
    if (typewriterElements.length === 0) return;

    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };

    const typewriterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const text = element.getAttribute('data-text') || '';
                
                // Only animate once
                typewriterObserver.unobserve(element);
                
                // Clear element content
                element.textContent = '';
                element.style.opacity = '1';
                
                let charIndex = 0;
                function type() {
                    if (charIndex < text.length) {
                        element.textContent += text.charAt(charIndex);
                        charIndex++;
                        setTimeout(type, 60); // Clean, natural typing speed
                    }
                }
                type();
            }
        });
    }, observerOptions);

    typewriterElements.forEach(el => {
        // Initial setup: clear text so it is ready to be typed, set opacity to 0
        el.style.opacity = '0';
        typewriterObserver.observe(el);
    });
}

/**
 * Group Info Modal: Manages displaying and permanently editing group members via localStorage.
 */
function initGroupInfo() {
    const btnGroupInfo = document.getElementById('btn-group-info');
    const modalGroupInfo = document.getElementById('modal-group-info');
    const groupMembersList = document.getElementById('group-members-list');
    
    if (!btnGroupInfo || !modalGroupInfo || !groupMembersList) return;

    const backdrop = modalGroupInfo.querySelector('.modal-backdrop');
    const content = modalGroupInfo.querySelector('.modal-content');
    const closeBtn = modalGroupInfo.querySelector('.close-modal');

    const tlGroup = gsap.timeline({ paused: true });
    tlGroup.to(backdrop, { opacity: 1, duration: 0.4 })
           .to(content, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.5)" }, "-=0.2");

    const openModal = () => {
        modalGroupInfo.style.pointerEvents = 'auto';
        tlGroup.play();
        document.body.style.overflow = 'hidden';
        renderGroupMembers();
    };

    const closeModal = () => {
        tlGroup.reverse().then(() => {
            modalGroupInfo.style.pointerEvents = 'none';
        });
        document.body.style.overflow = '';
    };

    btnGroupInfo.addEventListener('click', openModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (backdrop) backdrop.addEventListener('click', closeModal);

    // Default 7 members
    const defaultMembers = [
        "Ishimwet Thierry",
        "Ishimwe Marcus Danny",
        "Ishimwe Andy Noble",
        "Gisa devis",
        "[Click + to add Name]",
        "[Click + to add Name]",
        "[Click + to add Name]"
    ];

    function getSavedMembers() {
        const saved = localStorage.getItem('sacha_group_members');
        if (saved) {
            return JSON.parse(saved);
        }
        return defaultMembers;
    }

    function saveMembers(members) {
        localStorage.setItem('sacha_group_members', JSON.stringify(members));
    }

    function renderGroupMembers() {
        const members = getSavedMembers();
        groupMembersList.innerHTML = '';
        
        members.forEach((member, index) => {
            const li = document.createElement('li');
            
            // If it's a placeholder, show PLUS icon. If edited, show PENCIL icon.
            const isPlaceholder = member === "[Click + to add Name]";
            const iconClass = isPlaceholder ? "fas fa-plus" : "fas fa-pencil-alt";
            const iconTitle = isPlaceholder ? "Add Name" : "Edit Name";

            li.innerHTML = `
                <span style="opacity: 0.6; margin-right: 1rem; font-weight: bold; width: 20px;">${index + 1}.</span>
                <span class="member-name" contenteditable="true" data-index="${index}">${member}</span>
                <i class="${iconClass} edit-action" data-index="${index}" title="${iconTitle}"></i>
            `;
            groupMembersList.appendChild(li);
        });

        // Event listeners for inline editing
        const nameSpans = groupMembersList.querySelectorAll('.member-name');
        const editIcons = groupMembersList.querySelectorAll('.edit-action');

        nameSpans.forEach(span => {
            // Save to localStorage immediately when focus is lost (blur)
            span.addEventListener('blur', (e) => {
                const idx = e.target.getAttribute('data-index');
                const newText = e.target.innerText.trim();
                const currentMembers = getSavedMembers();
                if (newText && newText !== "") {
                    currentMembers[idx] = newText;
                } else {
                    currentMembers[idx] = "[Click + to add Name]"; // fallback
                }
                saveMembers(currentMembers);
                renderGroupMembers(); // re-render to update icons and layout
            });

            // Handle Enter key to blur and save
            span.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    e.target.blur();
                }
            });
        });

        editIcons.forEach(icon => {
            icon.addEventListener('click', (e) => {
                const idx = e.target.getAttribute('data-index');
                const span = groupMembersList.querySelector(`.member-name[data-index="${idx}"]`);
                if (span) {
                    span.focus();
                    
                    // If it is placeholder, clear it for user
                    if (span.innerText === "[Click + to add Name]") {
                        span.innerText = "";
                    }
                    
                    // Create selection
                    const range = document.createRange();
                    range.selectNodeContents(span);
                    const sel = window.getSelection();
                    sel.removeAllRanges();
                    sel.addRange(range);
                }
            });
        });
    }
}
