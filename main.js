/* ========================================
   WUNDERKIND XALQARO MAKTABI — JAVASCRIPT
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ========== NAVBAR SCROLL ==========
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        // Navbar background
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to top button
        if (scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        // Active nav link
        updateActiveNav();
    });

    // Back to top click
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ========== MOBILE NAV ==========
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        navToggle.classList.toggle('active');
    });

    // Close nav on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            navToggle.classList.remove('active');
        });
    });

    // Close nav on outside click
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('open');
            navToggle.classList.remove('active');
        }
    });

    // ========== ACTIVE NAV LINK ==========
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

            if (navLink) {
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
                    navLink.classList.add('active');
                }
            }
        });
    }

    // ========== COUNTER ANIMATION ==========
    const counters = document.querySelectorAll('.stat-number');
    let counterAnimated = false;

    function animateCounters() {
        if (counterAnimated) return;

        const heroStats = document.querySelector('.hero-stats');
        if (!heroStats) return;

        const rect = heroStats.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            counterAnimated = true;

            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000;
                const start = performance.now();

                function updateCounter(currentTime) {
                    const elapsed = currentTime - start;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    // Easing function
                    const easeOut = 1 - Math.pow(1 - progress, 3);
                    const current = Math.floor(easeOut * target);
                    
                    counter.textContent = current;

                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                }

                requestAnimationFrame(updateCounter);
            });
        }
    }

    window.addEventListener('scroll', animateCounters);
    animateCounters(); // Check on load

    // ========== SCROLL ANIMATIONS ==========
    function initScrollAnimations() {
        const elements = document.querySelectorAll(
            '.about-card, .program-card, .advantage-item, .teacher-card, .testimonial-card, .gallery-item, .contact-item'
        );

        elements.forEach(el => {
            el.classList.add('animate-on-scroll');
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animated');
                    }, index * 80);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        elements.forEach(el => observer.observe(el));
    }

    initScrollAnimations();

    // ========== CONTACT FORM ==========
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const parentName = document.getElementById('parentName').value;
        const childName = document.getElementById('childName').value;
        const phone = document.getElementById('phone').value;
        const grade = document.getElementById('grade').value;

        if (!parentName || !childName || !phone || !grade) {
            showNotification('Iltimos, barcha majburiy maydonlarni to\'ldiring!', 'error');
            return;
        }

        // Show success modal
        showSuccessModal();
        contactForm.reset();
    });

    // ========== SUCCESS MODAL ==========
    function showSuccessModal() {
        // Create modal
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay active';
        overlay.innerHTML = `
            <div class="modal">
                <div class="modal-icon">
                    <i class="fas fa-check"></i>
                </div>
                <h3>Arizangiz qabul qilindi!</h3>
                <p>Rahmat! Biz siz bilan tez orada bog'lanamiz. Ish kunlari ichida 24 soat davomida javob beramiz.</p>
                <button class="btn btn-primary" onclick="this.closest('.modal-overlay').remove()">
                    <i class="fas fa-thumbs-up"></i> Tushunarli
                </button>
            </div>
        `;

        document.body.appendChild(overlay);

        // Close on overlay click
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.remove();
            }
        });

        // Auto-close after 5 seconds
        setTimeout(() => {
            if (document.body.contains(overlay)) {
                overlay.classList.remove('active');
                setTimeout(() => overlay.remove(), 300);
            }
        }, 5000);
    }

    // ========== NOTIFICATION ==========
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 90px;
            right: 24px;
            padding: 16px 24px;
            background: ${type === 'error' ? '#ef4444' : '#f59e0b'};
            color: ${type === 'error' ? '#ffffff' : '#0b0f19'};
            border-radius: 12px;
            font-weight: 700;
            font-size: 0.9rem;
            z-index: 3000;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            animation: fadeInRight 0.3s ease;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(20px)';
            notification.style.transition = 'all 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // ========== SMOOTH SCROLL FOR ALL ANCHOR LINKS ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ========== PHONE INPUT MASK ==========
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.startsWith('998')) {
                value = value.substring(3);
            }
            if (value.length > 0) {
                let formatted = '+998 ';
                if (value.length > 0) formatted += '(' + value.substring(0, 2);
                if (value.length >= 2) formatted += ') ';
                if (value.length > 2) formatted += value.substring(2, 5);
                if (value.length > 5) formatted += '-' + value.substring(5, 7);
                if (value.length > 7) formatted += '-' + value.substring(7, 9);
                e.target.value = formatted;
            }
        });
    }

});
