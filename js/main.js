// =============================================
// GETA Dekorasyon - Ana JavaScript Dosyası
// =============================================

document.addEventListener('DOMContentLoaded', function() {

    // =============================================
    // Mobile Menu Toggle
    // =============================================
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');

            // Hamburger animation
            const spans = menuToggle.querySelectorAll('span');
            spans.forEach((span, index) => {
                span.style.transform = mainNav.classList.contains('active')
                    ? index === 0 ? 'rotate(45deg) translate(5px, 6px)'
                    : index === 1 ? 'opacity: 0'
                    : 'rotate(-45deg) translate(5px, -6px)'
                    : '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!menuToggle.contains(e.target) && !mainNav.contains(e.target)) {
                mainNav.classList.remove('active');
            }
        });

        // Close menu when clicking on a link
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
            });
        });
    }

    // =============================================
    // Header Scroll Effect
    // =============================================
    const header = document.querySelector('header');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }

        lastScroll = currentScroll;
    });

    // =============================================
    // Scroll Reveal Animation
    // =============================================
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');

    const revealOnScroll = function() {
        scrollRevealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeight - 100) {
                element.classList.add('revealed');
            }
        });
    };

    // Initial check
    revealOnScroll();

    // Check on scroll
    window.addEventListener('scroll', revealOnScroll);

    // =============================================
    // Smooth Scroll for Anchor Links
    // =============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');

            if (targetId !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // =============================================
    // Contact Form Handling
    // =============================================
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            // Simple validation
            if (!formData.name || !formData.phone || !formData.message) {
                alert('Lütfen zorunlu alanları doldurunuz.');
                return;
            }

            // Create WhatsApp message
            const whatsappMessage = `*Yeni İletişim Formu*%0A%0A*Ad Soyad:* ${formData.name}%0A*Telefon:* ${formData.phone}%0A*E-posta:* ${formData.email || 'Belirtilmedi'}%0A*Konu:* ${formData.subject || 'Belirtilmedi'}%0A*Mesaj:* ${formData.message}`;

            // Open WhatsApp with pre-filled message
            const whatsappUrl = `https://wa.me/905516551560?text=${whatsappMessage}`;

            // Show success message
            alert('Mesajınız WhatsApp üzerinden iletilecektir.');

            // Open WhatsApp
            window.open(whatsappUrl, '_blank');

            // Reset form
            contactForm.reset();
        });
    }

    // =============================================
    // Phone Number Click to Call
    // =============================================
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
        link.addEventListener('click', function(e) {
            // Track phone calls if analytics is available
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    'event_category': 'Contact',
                    'event_label': 'Phone Call'
                });
            }
        });
    });

    // =============================================
    // Lazy Loading Images
    // =============================================
    const lazyImages = document.querySelectorAll('img[data-src]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }

    // =============================================
    // Back to Top Button (Optional)
    // =============================================
    const createBackToTop = function() {
        const button = document.createElement('button');
        button.innerHTML = '<i class="fas fa-arrow-up"></i>';
        button.className = 'back-to-top';
        button.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: var(--primary, #B22222);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 999;
            box-shadow: 0 5px 20px rgba(0,0,0,0.2);
            font-size: 18px;
        `;
        document.body.appendChild(button);

        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 500) {
                button.style.opacity = '1';
                button.style.visibility = 'visible';
            } else {
                button.style.opacity = '0';
                button.style.visibility = 'hidden';
            }
        });

        button.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.background = '#8B0000';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.background = '#B22222';
        });
    };

    createBackToTop();

    // =============================================
    // Stats Counter Animation
    // =============================================
    const animateCounters = function() {
        const counters = document.querySelectorAll('.brands h2, [data-counter]');

        counters.forEach(counter => {
            const text = counter.textContent;
            const match = text.match(/(\d+)/);

            if (match) {
                const target = parseInt(match[1]);
                const suffix = text.replace(match[1], '');
                let current = 0;
                const increment = target / 50;
                const duration = 2000;
                const stepTime = duration / 50;

                const updateCounter = function() {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current) + suffix;
                        setTimeout(updateCounter, stepTime);
                    } else {
                        counter.textContent = target + suffix;
                    }
                };

                // Start animation when element is in view
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            updateCounter();
                            observer.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.5 });

                observer.observe(counter);
            }
        });
    };

    animateCounters();

    // =============================================
    // Console Branding
    // =============================================
    console.log('%c GETA Alüminyum Doğrama Mobilya İnşaat ', 'background: #B22222; color: white; font-size: 16px; padding: 10px;');
    console.log('%c Website by GETA Team ', 'background: #1C1C1C; color: #C0C0C0; font-size: 12px; padding: 5px;');

    // =============================================
    // Lightbox Gallery
    // =============================================
    const createLightbox = function() {
        // Create lightbox HTML
        const lightboxHTML = `
            <div class="lightbox" id="lightbox">
                <div class="lightbox-content">
                    <span class="lightbox-close">&times;</span>
                    <span class="lightbox-nav lightbox-prev"><i class="fas fa-chevron-left"></i></span>
                    <img src="" alt="Gallery Image" id="lightbox-img">
                    <video src="" id="lightbox-video" controls playsinline style="display:none; max-width:90vw; max-height:80vh; border-radius:10px;"></video>
                    <span class="lightbox-nav lightbox-next"><i class="fas fa-chevron-right"></i></span>
                    <div class="lightbox-counter" id="lightbox-counter"></div>
                    <div class="lightbox-title" id="lightbox-title"></div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', lightboxHTML);

        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxVideo = document.getElementById('lightbox-video');
        const lightboxCounter = document.getElementById('lightbox-counter');
        const lightboxTitle = document.getElementById('lightbox-title');
        const closeBtn = lightbox.querySelector('.lightbox-close');
        const prevBtn = lightbox.querySelector('.lightbox-prev');
        const nextBtn = lightbox.querySelector('.lightbox-next');

        let currentGallery = [];
        let currentIndex = 0;

        const isVideo = function(src) {
            return /\.(mp4|webm|ogg|mov)$/i.test(src);
        };

        // Open lightbox
        window.openGallery = function(images, title, startIndex = 0) {
            currentGallery = images;
            currentIndex = startIndex;
            showImage();
            lightboxTitle.textContent = title;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        };

        // Show current image or video
        const showImage = function() {
            const src = currentGallery[currentIndex];
            if (isVideo(src)) {
                lightboxImg.style.display = 'none';
                lightboxVideo.style.display = 'block';
                lightboxVideo.src = src;
                lightboxVideo.play();
            } else {
                lightboxVideo.style.display = 'none';
                lightboxVideo.pause();
                lightboxImg.style.display = 'block';
                lightboxImg.src = src;
            }
            lightboxCounter.textContent = `${currentIndex + 1} / ${currentGallery.length}`;
        };

        // Next image
        const nextImage = function() {
            currentIndex = (currentIndex + 1) % currentGallery.length;
            showImage();
        };

        // Previous image
        const prevImage = function() {
            currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
            showImage();
        };

        // Close lightbox
        const closeLightbox = function() {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
            lightboxVideo.pause();
            lightboxVideo.src = '';
        };

        // Event listeners
        closeBtn.addEventListener('click', closeLightbox);
        nextBtn.addEventListener('click', nextImage);
        prevBtn.addEventListener('click', prevImage);

        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (!lightbox.classList.contains('active')) return;

            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
        });
    };

    createLightbox();

});
